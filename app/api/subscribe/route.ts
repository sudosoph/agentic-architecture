// The custom signup form on the site posts here. We forward to the existing
// Substack publication's free-tier signup so subscribers land on the list
// Sophia is broadcasting from. Resend (if configured) is used as a backup
// notification email so Sophia sees signups in real time.
const SUBSTACK_PUBLICATION = 'agenticarchitectai'
const SUBSTACK_SIGNUP_URL = `https://${SUBSTACK_PUBLICATION}.substack.com/api/v1/free`
const SUBSTACK_PUBLICATION_HOME = `https://${SUBSTACK_PUBLICATION}.substack.com/`

const NOTIFY_FROM = 'Agentic Architect <newsletter@agenticarchitect.ai>'
const NOTIFY_TO = 'sophia@agenticarchitect.ai'

export async function POST(request: Request) {
  let body: { email?: string; source?: string } = {}
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body.email ?? '').trim().toLowerCase()
  const source = (body.source ?? 'site').trim().slice(0, 60)

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Valid email required' }, { status: 400 })
  }

  // Browser-compatible headers so Substack accepts signup requests cleanly.
  const referer = request.headers.get('referer') ?? 'https://agenticarchitect.ai'
  const substackRes = await fetch(SUBSTACK_SIGNUP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Origin: SUBSTACK_PUBLICATION_HOME.replace(/\/$/, ''),
      Referer: SUBSTACK_PUBLICATION_HOME,
    },
    body: JSON.stringify({
      email,
      first_url: referer,
      first_referrer: referer,
      current_url: referer,
      current_referrer: referer,
      referral_code: '',
      source: 'embed',
    }),
  })

  // Substack returns 200 in two scenarios:
  //   - didSignup: true → email added directly, confirmation email sent
  //   - didSignup: false, prompt_to_login: true → email is associated with a
  //     Substack account, login link sent to confirm subscription
  // Both are success from the user's perspective: they receive an email.
  // Anything non-2xx is a real failure (bot protection rejection, 5xx, etc).
  if (!substackRes.ok) {
    const detail = await substackRes.text().catch(() => '')
    console.error('[subscribe] substack rejected', substackRes.status, detail.slice(0, 200))
    return Response.json(
      {
        error:
          'Could not subscribe. Try again, or visit agenticarchitectai.substack.com directly.',
      },
      { status: 502 },
    )
  }

  // Best-effort notification to Sophia (only if Resend is configured).
  // Cloudflare secrets live on getCloudflareContext().env, not process.env.
  const { getCloudflareContext } = await import('@opennextjs/cloudflare')
  const env = getCloudflareContext().env as { RESEND_API_KEY?: string }
  const resendKey = env.RESEND_API_KEY ?? process.env.RESEND_API_KEY
  if (resendKey) {
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: NOTIFY_TO,
        reply_to: email,
        subject: `New subscriber: ${email}`,
        text: [
          `New Agentic Architect subscriber via the site form.`,
          ``,
          `Email: ${email}`,
          `Source: ${source}`,
          `Referer: ${referer}`,
          `Date: ${new Date().toISOString()}`,
        ].join('\n'),
      }),
    }).catch(err => console.error('[subscribe] notify failed (non-fatal)', err))
  }

  return Response.json({ ok: true })
}

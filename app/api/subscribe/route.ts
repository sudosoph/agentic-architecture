import { getWorkerEnv, runInBackground } from '@/lib/cloudflare-env'

// The custom signup form on the site posts here. We forward to the existing
// Substack publication's free-tier signup so subscribers land on the list
// Sophia is broadcasting from. Resend (if configured) sends a real-time
// notification kept alive via Cloudflare ctx.waitUntil.
const SUBSTACK_PUBLICATION = 'agenticarchitectai'
const SUBSTACK_SIGNUP_URL = `https://${SUBSTACK_PUBLICATION}.substack.com/api/v1/free`
const SUBSTACK_PUBLICATION_HOME = `https://${SUBSTACK_PUBLICATION}.substack.com/`

const NOTIFY_FROM = 'Agentic Architect <hello@agenticarchitect.ai>'
const NOTIFY_TO = ['sophia@agenticarchitect.ai', 'sophiasteinco@gmail.com']

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

  const resendKey = getWorkerEnv('RESEND_API_KEY')
  if (resendKey) {
    const notifyPromise = fetch('https://api.resend.com/emails', {
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
    }).then(async res => {
      if (!res.ok) {
        console.error('[subscribe] notify status', res.status, await res.text().catch(() => ''))
      }
    })

    await runInBackground(notifyPromise)
  }

  return Response.json({ ok: true })
}

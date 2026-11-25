import { getCloudflareContext } from '@opennextjs/cloudflare'

const TO = 'sophia@agenticarchitect.ai'
const FROM = 'hello@agenticarchitect.ai'

export async function POST(request: Request) {
  // Cloudflare secrets are exposed via getCloudflareContext().env, not
  // process.env. Falls back to process.env for local dev where the secret
  // is set in .env.local.
  const env = getCloudflareContext().env as { RESEND_API_KEY?: string } | undefined
  const key = env?.RESEND_API_KEY ?? process.env.RESEND_API_KEY
  if (!key) {
    return Response.json(
      {
        error:
          'Contact form is being set up. Email Sophia directly at sophia@agenticarchitect.ai — your message is included below for easy copy-paste.',
        unconfigured: true,
      },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, subject, message } = body as Record<string, unknown>

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.includes('@') ||
    typeof message !== 'string' || !message.trim()
  ) {
    return Response.json({ error: 'Missing required fields' }, { status: 422 })
  }

  const subjectLine = typeof subject === 'string' && subject.trim()
    ? subject.trim()
    : `Contact form, ${name.trim()}`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: TO,
      reply_to: email.trim(),
      subject: subjectLine,
      text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
    }),
  })

  if (!res.ok) {
    console.error('[contact] resend error', res.status, await res.text().catch(() => ''))
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return Response.json({ ok: true })
}

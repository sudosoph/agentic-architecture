export const runtime = 'edge'

const TO = 'sophia@agenticarchitecture.ai'
const FROM = 'hello@agenticarchitecture.ai'

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    return Response.json({ error: 'Email service not configured' }, { status: 503 })
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
    : `Contact form — ${name.trim()}`

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

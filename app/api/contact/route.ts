import { Resend } from 'resend'

export const runtime = 'nodejs'

const TO = 'sophia@agenticarchitecture.ai'
const FROM = 'hello@agenticarchitecture.ai'

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: 'Email service not configured' }, { status: 503 })
  }
  const resend = new Resend(process.env.RESEND_API_KEY)
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

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email.trim(),
      subject: subjectLine,
      text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
    })
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[contact] resend error', err)
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

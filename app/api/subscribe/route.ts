export const runtime = 'edge'

const FROM = 'Architects Notebook <newsletter@agenticarchitecture.ai>'
const TO = 'sophia@agenticarchitecture.ai'

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    return Response.json({ error: 'Subscription service not configured' }, { status: 503 })
  }

  let body: { email?: string; source?: string } = {}
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body.email ?? '').trim()
  const source = (body.source ?? 'unknown').trim().slice(0, 60)

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Valid email required' }, { status: 400 })
  }

  // Notify the inbox. When Listmonk is deployed, swap this for a direct list
  // subscription call. For now this gives Sophia a manual queue she can review.
  const text = `New subscriber to The Architect's Notebook.\n\nEmail: ${email}\nSource: ${source}\nDate: ${new Date().toISOString()}`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: TO,
      reply_to: email,
      subject: `New subscriber: ${email}`,
      text,
    }),
  })

  if (!res.ok) {
    console.error('[subscribe] resend error', res.status, await res.text().catch(() => ''))
    return Response.json({ error: 'Could not record subscription. Try again later.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}

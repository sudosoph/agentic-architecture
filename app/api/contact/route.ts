import { getWorkerEnv } from '@/lib/cloudflare-env'

// Deliver to both Sophia's custom-domain inbox (forwarded via Cloudflare Email Routing)
// and her Antigravity-monitored workspace inbox so Weekday Engagement Radar picks up leads.
const TO = ['sophia@agenticarchitect.ai', 'sophiasteinco@gmail.com']
const FROM = 'Agentic Architect <hello@agenticarchitect.ai>'

export async function POST(request: Request) {
  const key = getWorkerEnv('RESEND_API_KEY')
  if (!key) {
    return Response.json(
      {
        error:
          'Contact form is being set up. Email Sophia directly at sophia@agenticarchitect.ai; your message is included below for easy copy-paste.',
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

  const { name, email, subject, message, website, attribution } = body as Record<string, unknown>

  // Honeypot trap: silently accept bot submissions without burning email quota.
  if (typeof website === 'string' && website.trim()) {
    return Response.json({ ok: true })
  }

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.includes('@') ||
    typeof message !== 'string' ||
    !message.trim()
  ) {
    return Response.json({ error: 'Missing required fields' }, { status: 422 })
  }

  const cleanName = name.trim().slice(0, 120)
  const cleanEmail = email.trim().slice(0, 160)
  const cleanMessage = message.trim().slice(0, 8000)
  const subjectLine =
    typeof subject === 'string' && subject.trim()
      ? subject.trim().slice(0, 160)
      : `Contact form: ${cleanName}`

  const attr = attribution as
    | {
        firstTouch?: { source?: string; medium?: string; campaign?: string; entryPath?: string } | null
        lastTouch?: { source?: string; medium?: string; campaign?: string; entryPath?: string } | null
      }
    | undefined
  const attributionFooter = attr?.firstTouch
    ? `\n\n---\nAttribution:\nFirst Touch: ${attr.firstTouch.source ?? 'direct'} / ${attr.firstTouch.medium ?? 'none'} (${attr.firstTouch.campaign || 'no-campaign'}) via ${attr.firstTouch.entryPath ?? '/'}\nLast Touch: ${attr.lastTouch?.source ?? 'direct'} / ${attr.lastTouch?.medium ?? 'none'} via ${attr.lastTouch?.entryPath ?? '/'}`
    : ''

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: TO,
      reply_to: cleanEmail,
      subject: subjectLine,
      text: `From: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}${attributionFooter}`,
    }),
  })

  if (!res.ok) {
    console.error('[contact] resend error', res.status, await res.text().catch(() => ''))
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return Response.json({ ok: true })
}

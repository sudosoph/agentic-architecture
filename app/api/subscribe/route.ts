import { getWorkerEnv, runInBackground } from '@/lib/cloudflare-env'
import fiveDayLessons from '@/content/courses/five-day-prompt-to-system.json'

const SUBSTACK_PUBLICATION = 'agenticarchitectai'
const SUBSTACK_SIGNUP_URL = `https://${SUBSTACK_PUBLICATION}.substack.com/api/v1/free`
const SUBSTACK_PUBLICATION_HOME = `https://${SUBSTACK_PUBLICATION}.substack.com/`

const NOTIFY_FROM = 'Agentic Architect <hello@agenticarchitect.ai>'
const LESSON_FROM = 'Sophia Stein <sophia@agenticarchitect.ai>'
const NOTIFY_TO = ['sophia@agenticarchitect.ai', 'sophiasteinco@gmail.com']
const DAY_MS = 24 * 60 * 60 * 1000

function cleanAttrField(val: unknown, fallback = ''): string {
  return typeof val === 'string' && val.trim() ? val.trim().slice(0, 160) : fallback
}

function formatLessonBody(lesson: (typeof fiveDayLessons)[number]): string {
  return [
    `Hi there,`,
    ``,
    `Welcome to Day ${lesson.day} of the 5-Day Applied AI Architecture Primer.`,
    `Today's focus: ${lesson.goal}`,
    ``,
    lesson.body,
    ``,
    `Open today's resource: ${lesson.ctaUrl}`,
    ``,
    `Explore more when ready:`,
    `- Agentic Architect Lab & Free Unlocked Lessons: https://agenticarchitect.ai/courses`,
    `- 20/80 Task Readiness Kit: https://agenticarchitect.ai/starter-kit`,
    `- Bespoke Systems, Speaking & Fractional Advisory: https://agenticarchitect.ai/work-with-me`,
    ``,
    `Best,`,
    `Sophia Stein`,
    `Agentic Architect · https://agenticarchitect.ai`,
  ].join('\n')
}

export async function POST(request: Request) {
  let body: {
    email?: string
    source?: string
    attribution?: {
      firstTouch?: { source?: string; medium?: string; campaign?: string; entryPath?: string } | null
      lastTouch?: { source?: string; medium?: string; campaign?: string; entryPath?: string } | null
    }
  } = {}
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
    const now = Date.now()
    const headers = {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    }

    const batchEmails = [
      {
        from: NOTIFY_FROM,
        to: NOTIFY_TO,
        reply_to: email,
        subject: `New subscriber (${source}): ${email}`,
        text: [
          `New Agentic Architect subscriber enrolled in the 5-Day Primer.`,
          ``,
          `Email: ${email}`,
          `Source: ${source}`,
          `Referer: ${referer}`,
          ...(body.attribution?.firstTouch && typeof body.attribution.firstTouch === 'object'
            ? [
                `First Touch: ${cleanAttrField(body.attribution.firstTouch.source, 'direct')} / ${cleanAttrField(body.attribution.firstTouch.medium, 'none')} (${cleanAttrField(body.attribution.firstTouch.campaign, 'no-campaign')}) via ${cleanAttrField(body.attribution.firstTouch.entryPath, '/')}`,
              ]
            : []),
          ...(body.attribution?.lastTouch && typeof body.attribution.lastTouch === 'object'
            ? [
                `Last Touch: ${cleanAttrField(body.attribution.lastTouch.source, 'direct')} / ${cleanAttrField(body.attribution.lastTouch.medium, 'none')} via ${cleanAttrField(body.attribution.lastTouch.entryPath, '/')}`,
              ]
            : []),
          `Date: ${new Date(now).toISOString()}`,
        ].join('\n'),
      },
      ...fiveDayLessons.map(lesson => {
        const scheduledIso =
          lesson.day > 1 ? new Date(now + (lesson.day - 1) * DAY_MS).toISOString() : undefined
        return {
          from: LESSON_FROM,
          to: [email],
          reply_to: 'sophia@agenticarchitect.ai',
          subject: lesson.subject,
          text: formatLessonBody(lesson),
          ...(scheduledIso ? { scheduled_at: scheduledIso } : {}),
        }
      }),
    ]

    const fulfillmentPromise = Promise.allSettled([
      fetch('https://api.resend.com/emails/batch', {
        method: 'POST',
        headers,
        body: JSON.stringify(batchEmails),
      }).then(async res => {
        if (!res.ok) {
          console.error('[subscribe] resend batch status', res.status, await res.text().catch(() => ''))
        }
      }),
      fetch('https://api.resend.com/contacts', {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, unsubscribed: false }),
      }).catch(() => undefined),
    ])

    await runInBackground(fulfillmentPromise)
  }

  return Response.json({ ok: true })
}

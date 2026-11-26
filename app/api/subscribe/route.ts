import { getWorkerEnv, runInBackground } from '@/lib/cloudflare-env'
import fiveDayLessons from '@/content/courses/five-day-prompt-to-system.json'

// Custom newsletter & 5-Day Prompt-to-System Challenge signup endpoint:
// 1. Subscribes the reader to Agentic Architect on Substack.
// 2. Uses verified Resend domain (agenticarchitect.ai) inside ctx.waitUntil to:
//    a) Notify Sophia's dual inboxes immediately
//    b) Send Day 1 immediately + schedule Days 2-5 (+24h..+96h) via Resend Batch API
//    c) Upsert the contact into Resend Contacts for owned CRM backup
const SUBSTACK_PUBLICATION = 'agenticarchitectai'
const SUBSTACK_SIGNUP_URL = `https://${SUBSTACK_PUBLICATION}.substack.com/api/v1/free`
const SUBSTACK_PUBLICATION_HOME = `https://${SUBSTACK_PUBLICATION}.substack.com/`

const NOTIFY_FROM = 'Agentic Architect <hello@agenticarchitect.ai>'
const LESSON_FROM = 'Sophia Stein <sophia@agenticarchitect.ai>'
const NOTIFY_TO = ['sophia@agenticarchitect.ai', 'sophiasteinco@gmail.com']
const DAY_MS = 24 * 60 * 60 * 1000

function formatLessonBody(lesson: (typeof fiveDayLessons)[number]): string {
  return [
    `Hi there,`,
    ``,
    `Welcome to Day ${lesson.day} of the 5-Day Prompt-to-System Business Challenge.`,
    `Today's goal: ${lesson.goal}`,
    ``,
    lesson.body,
    ``,
    `Next step: ${lesson.ctaUrl}`,
    ``,
    `Want all 5 Foundations modules (or our 4-Curriculum AI Architecture Pass) right now?`,
    `- Curriculum 01: Applied AI Foundations ($297, 100% creditable): https://agenticarchitect.ai/academy`,
    `- Explore All 4 Curricula & Free Unlocked Lessons: https://agenticarchitect.ai/courses`,
    `- Forward Deployed Builds, Fractional CAIO / AI CTO & Corporate Labs: https://agenticarchitect.ai/work-with-me`,
    ``,
    `Best,`,
    `Sophia Stein`,
    `Agentic Architect · https://agenticarchitect.ai`,
    `(Writing and teaching in a personal capacity; views my own. Reply anytime with your #1 bottleneck.)`,
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
        subject: `New subscriber + 5-Day Challenge started: ${email}`,
        text: [
          `New Agentic Architect subscriber enrolled in the 5-Day Prompt-to-System Challenge.`,
          ``,
          `Email: ${email}`,
          `Source: ${source}`,
          `Referer: ${referer}`,
          ...(body.attribution?.firstTouch
            ? [
                `First Touch: ${body.attribution.firstTouch.source ?? 'direct'} / ${body.attribution.firstTouch.medium ?? 'none'} (${body.attribution.firstTouch.campaign || 'no-campaign'}) via ${body.attribution.firstTouch.entryPath ?? '/'}`,
              ]
            : []),
          ...(body.attribution?.lastTouch
            ? [
                `Last Touch: ${body.attribution.lastTouch.source ?? 'direct'} / ${body.attribution.lastTouch.medium ?? 'none'} via ${body.attribution.lastTouch.entryPath ?? '/'}`,
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

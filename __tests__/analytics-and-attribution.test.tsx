import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  capturePageAttribution,
  getStoredAttribution,
  buildTaggedCampaignUrl,
  decorateOutboundHref,
  trackFunnelEvent,
} from '@/lib/attribution'
import { GET as ingestGet, POST as ingestPost } from '@/app/ingest/[...path]/route'
import { POST as contactPost } from '@/app/api/contact/route'
import nextConfig from '../next.config'
import { Analytics, buildPostHogInitSnippet } from '@/components/site/analytics'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { ContactForm } from '@/components/site/contact-form'

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('subject=Corporate+Workshop'),
  usePathname: () => '/courses',
}))

describe('First-Party PostHog Proxy, Persistent UTMs & Funnel Events', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    vi.restoreAllMocks()
  })

  afterEach(() => {
    delete (window as unknown as Record<string, unknown>).posthog
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY
  })

  it('builds PostHog init snippet pointing at /ingest, history_change pageviews, and site=agenticarchitect.ai', () => {
    expect(nextConfig.skipTrailingSlashRedirect).toBe(true)
    const snippet = buildPostHogInitSnippet('phc_test_key')
    expect(snippet).toContain('phc_test_key')
    expect(snippet).toContain('"/ingest"')
    expect(snippet).toContain('history_change')
    expect(snippet).toContain("site: 'agenticarchitect.ai'")
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test_key'
    expect(() => render(<Analytics />)).not.toThrow()
  })

  it('matches referrer domains on exact hostname boundaries (never misclassifying reddit.com or dropbox.com as x)', () => {
    const fromReddit = capturePageAttribution('https://agenticarchitect.ai/blog/post-1', 'https://www.reddit.com/r/AI_Agents/')
    expect(fromReddit.firstTouch?.source).toBe('reddit')

    window.localStorage.clear()
    const fromDropbox = capturePageAttribution('https://agenticarchitect.ai/courses', 'https://paper.dropbox.com/doc/123')
    expect(fromDropbox.firstTouch?.source).toBe('paper.dropbox.com')

    window.localStorage.clear()
    const fromTco = capturePageAttribution('https://agenticarchitect.ai/', 'https://t.co/abc123')
    expect(fromTco.firstTouch?.source).toBe('x')

    window.localStorage.clear()
    const fromLocal = capturePageAttribution('http://localhost:3000/courses', 'http://localhost:3000/')
    expect(fromLocal.firstTouch?.source).toBe('direct')
  })

  it('preserves first_touch UTMs across subsequent internal page navigations while updating last_touch', () => {
    const first = capturePageAttribution(
      'https://agenticarchitect.ai/blog/productive-friction-interview-ai?utm_source=linkedin&utm_medium=carousel&utm_campaign=launch-week&utm_content=slide-6',
      'https://www.linkedin.com/',
    )
    expect(first.firstTouch?.source).toBe('linkedin')
    expect(first.firstTouch?.medium).toBe('carousel')
    expect(first.firstTouch?.campaign).toBe('launch-week')
    expect(first.firstTouch?.entryPath).toBe('/blog/productive-friction-interview-ai')

    // Subsequent internal navigation with no UTMs keeps firstTouch intact
    const second = capturePageAttribution('https://agenticarchitect.ai/courses', '')
    expect(second.firstTouch?.source).toBe('linkedin')
    expect(second.firstTouch?.campaign).toBe('launch-week')
    expect(second.firstTouch?.entryPath).toBe('/blog/productive-friction-interview-ai')
    expect(second.lastTouch?.entryPath).toBe('/courses')

    // Later visit from Substack updates lastTouch while keeping firstTouch
    const third = capturePageAttribution(
      'https://agenticarchitect.ai/work-with-me?utm_source=substack&utm_medium=podcast&utm_campaign=ep-01',
      'https://agenticarchitectai.substack.com/',
    )
    expect(third.firstTouch?.source).toBe('linkedin')
    expect(third.lastTouch?.source).toBe('substack')
    expect(third.lastTouch?.medium).toBe('podcast')
    expect(getStoredAttribution().firstTouch?.campaign).toBe('launch-week')
  })

  it('builds tagged campaign URLs and decorates outbound Cal.com and Substack links with stored attribution', () => {
    capturePageAttribution(
      'https://agenticarchitect.ai/?utm_source=linkedin&utm_medium=ugc-video&utm_campaign=model-matrix',
      '',
    )
    const tagged = buildTaggedCampaignUrl('https://agenticarchitect.ai/courses', {
      source: 'youtube',
      medium: 'shorts',
      campaign: 'possibilities-01',
      content: 'hook-a',
    })
    expect(tagged).toBe(
      'https://agenticarchitect.ai/courses?utm_source=youtube&utm_medium=shorts&utm_campaign=possibilities-01&utm_content=hook-a',
    )

    const calDecorated = decorateOutboundHref('https://cal.com/sophia-stein/masterclass')
    expect(calDecorated).toContain('utm_source=linkedin')
    expect(calDecorated).toContain('utm_medium=ugc-video')
    expect(calDecorated).toContain('utm_campaign=model-matrix')
  })

  it('safely fires typed PostHog funnel events and never throws when PostHog is blocked', () => {
    expect(() => trackFunnelEvent('cta_clicked', { target: '/masterclass' })).not.toThrow()

    const captureSpy = vi.fn()
    ;(window as unknown as Record<string, unknown>).posthog = { capture: captureSpy }
    capturePageAttribution(
      'https://agenticarchitect.ai/academy?utm_source=substack&utm_medium=email&utm_campaign=issue-1',
      '',
    )
    trackFunnelEvent('ld_letter_downloaded', { page: '/academy' })
    expect(captureSpy).toHaveBeenCalledTimes(1)
    expect(captureSpy.mock.calls[0][0]).toBe('ld_letter_downloaded')
    expect(captureSpy.mock.calls[0][1]).toMatchObject({
      site: 'agenticarchitect.ai',
      page: '/academy',
      first_utm_source: 'substack',
    })
  })

  it('proxies /ingest/static/* to us-assets.i.posthog.com and /ingest/e/ to us.i.posthog.com without leaking cookies', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => new Response('ok', { status: 200 }))

    const staticReq = new Request('https://agenticarchitect.ai/ingest/static/array.js', {
      method: 'GET',
      headers: { cookie: 'secret=123', 'user-agent': 'TestBrowser' },
    })
    const staticRes = await ingestGet(staticReq, {
      params: Promise.resolve({ path: ['static', 'array.js'] }),
    })
    expect(staticRes.status).toBe(200)
    expect(fetchMock.mock.calls[0][0]).toBe('https://us-assets.i.posthog.com/static/array.js')
    const forwardedHeaders = new Headers((fetchMock.mock.calls[0][1] as RequestInit)?.headers)
    expect(forwardedHeaders.get('cookie')).toBeNull()

    const eventReq = new Request('https://agenticarchitect.ai/ingest/e/?ip=0', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: 'session=abc',
        'cf-ray': '12345',
        'accept-encoding': 'br',
      },
      body: JSON.stringify({ event: '$pageview' }),
    })
    const eventRes = await ingestPost(eventReq, {
      params: Promise.resolve({ path: ['e'] }),
    })
    expect(eventRes.status).toBe(200)
    expect(fetchMock.mock.calls[1][0]).toBe('https://us.i.posthog.com/e/?ip=0')
    const eventFwdHeaders = new Headers((fetchMock.mock.calls[1][1] as RequestInit)?.headers)
    expect(eventFwdHeaders.get('cf-ray')).toBeNull()
    expect(eventFwdHeaders.get('accept-encoding')).toBeNull()

    const arrayCfgRes = await ingestGet(
      new Request('https://agenticarchitect.ai/ingest/array/phc_abc/config.js'),
      { params: Promise.resolve({ path: ['array', 'phc_abc', 'config.js'] }) },
    )
    expect(arrayCfgRes.status).toBe(200)
    expect(fetchMock.mock.calls[2][0]).toBe('https://us-assets.i.posthog.com/array/phc_abc/config.js')

    const badTraversalRes = await ingestGet(
      new Request('https://agenticarchitect.ai/ingest/..'),
      { params: Promise.resolve({ path: ['..'] }) },
    )
    expect(badTraversalRes.status).toBe(400)
  })

  it('sanitizes malformed non-string attribution objects safely in /api/contact', async () => {
    process.env.RESEND_API_KEY = 're_test_123'
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      async () => Response.json({ id: 'email_1' }, { status: 200 }),
    )
    const req = new Request('https://agenticarchitect.ai/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Pat',
        email: 'pat@company.com',
        subject: 'Workshop',
        message: 'Interested in a half-day lab.',
        attribution: { firstTouch: { source: { bad: true }, campaign: 999 } },
      }),
    })
    const res = await contactPost(req)
    expect(res.status).toBe(200)
    delete process.env.RESEND_API_KEY
  })

  it('attaches stored first/last touch attribution to /api/subscribe and /api/contact submissions', async () => {
    capturePageAttribution(
      'https://agenticarchitect.ai/blog/forward-deployed-ai-engineering?utm_source=linkedin&utm_medium=carousel&utm_campaign=fde-post',
      'https://www.linkedin.com/',
    )
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => Response.json({ ok: true }, { status: 200 }))

    const { getByPlaceholderText, getByRole, unmount } = render(<NewsletterSignup source="blog-footer" />)
    fireEvent.change(getByPlaceholderText(/Enter your email/i), {
      target: { value: 'vp@midmarket.com' },
    })
    fireEvent.submit(getByPlaceholderText(/Enter your email/i).closest('form')!)

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    const subPayload = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body))
    expect(subPayload.attribution.firstTouch.source).toBe('linkedin')
    expect(subPayload.attribution.firstTouch.campaign).toBe('fde-post')
    unmount()

    const contactView = render(<ContactForm />)
    fireEvent.change(contactView.getByPlaceholderText('Your name'), {
      target: { value: 'Jordan Lee' },
    })
    fireEvent.change(contactView.getByPlaceholderText('you@company.com'), {
      target: { value: 'jordan@portco.com' },
    })
    fireEvent.change(contactView.getByPlaceholderText(/Share your goals/i), {
      target: { value: 'Looking for an executive AI workshop for 20 VPs.' },
    })
    fireEvent.submit(contactView.getByRole('button', { name: /Send Message/i }).closest('form')!)

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
    const contactPayload = JSON.parse(String((fetchMock.mock.calls[1][1] as RequestInit).body))
    expect(contactPayload.attribution.firstTouch.source).toBe('linkedin')
    expect(contactPayload.attribution.firstTouch.entryPath).toBe('/blog/forward-deployed-ai-engineering')
  })
})

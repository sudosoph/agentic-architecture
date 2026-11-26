export type FunnelEventName =
  | 'cta_clicked'
  | 'ui_link_clicked'
  | 'article_read_milestone'
  | 'cal_booking_clicked'
  | 'substack_outbound_clicked'
  | 'curriculum_preview_opened'
  | 'ld_letter_downloaded'
  | 'kit_downloaded'
  | 'demo_interacted'
  | 'newsletter_subscribed'
  | 'contact_inquiry_sent'

export interface TouchPoint {
  source: string
  medium: string
  campaign: string
  content: string
  term: string
  referrer: string
  entryPath: string
  capturedAt: string
}

export interface AttributionSnapshot {
  firstTouch: TouchPoint | null
  lastTouch: TouchPoint | null
}

const STORAGE_KEY = 'aa_attribution_v1'

function safeReadStorage(): AttributionSnapshot {
  if (typeof window === 'undefined') {
    return { firstTouch: null, lastTouch: null }
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { firstTouch: null, lastTouch: null }
    const parsed = JSON.parse(raw) as Partial<AttributionSnapshot>
    return {
      firstTouch: parsed.firstTouch ?? null,
      lastTouch: parsed.lastTouch ?? null,
    }
  } catch {
    return { firstTouch: null, lastTouch: null }
  }
}

function safeWriteStorage(snapshot: AttributionSnapshot): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

function matchesDomain(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`)
}

function inferSourceFromReferrer(referrer: string, currentHost = ''): string {
  if (!referrer) return ''
  try {
    const host = new URL(referrer).hostname.toLowerCase()
    if (
      !host ||
      host === currentHost.toLowerCase() ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      matchesDomain(host, 'agenticarchitect.ai')
    ) {
      return ''
    }
    if (matchesDomain(host, 'linkedin.com') || matchesDomain(host, 'lnkd.in')) return 'linkedin'
    if (matchesDomain(host, 'substack.com')) return 'substack'
    if (matchesDomain(host, 'reddit.com') || matchesDomain(host, 'redd.it')) return 'reddit'
    if (matchesDomain(host, 'ycombinator.com')) return 'hackernews'
    if (matchesDomain(host, 'chatgpt.com') || matchesDomain(host, 'openai.com')) return 'chatgpt'
    if (matchesDomain(host, 'perplexity.ai')) return 'perplexity'
    if (host.startsWith('www.google.') || host.startsWith('google.')) return 'google'
    if (matchesDomain(host, 'youtube.com') || matchesDomain(host, 'youtu.be')) return 'youtube'
    if (matchesDomain(host, 'x.com') || matchesDomain(host, 'twitter.com') || matchesDomain(host, 't.co')) {
      return 'x'
    }
    return host
  } catch {
    return ''
  }
}

export function getStoredAttribution(): AttributionSnapshot {
  return safeReadStorage()
}

export function capturePageAttribution(
  urlStr?: string,
  referrer?: string,
): AttributionSnapshot {
  const current = safeReadStorage()
  const rawUrl =
    urlStr ?? (typeof window !== 'undefined' ? window.location.href : 'https://agenticarchitect.ai/')
  const rawRef =
    referrer ?? (typeof document !== 'undefined' ? document.referrer : '')

  let parsedUrl: URL
  try {
    parsedUrl = new URL(rawUrl, 'https://agenticarchitect.ai')
  } catch {
    return current
  }

  const utmSource = (parsedUrl.searchParams.get('utm_source') ?? '').trim()
  const utmMedium = (parsedUrl.searchParams.get('utm_medium') ?? '').trim()
  const utmCampaign = (parsedUrl.searchParams.get('utm_campaign') ?? '').trim()
  const utmContent = (parsedUrl.searchParams.get('utm_content') ?? '').trim()
  const utmTerm = (parsedUrl.searchParams.get('utm_term') ?? '').trim()
  const inferredSource = utmSource || inferSourceFromReferrer(rawRef, parsedUrl.hostname)
  const hasNewChannelSignal = Boolean(inferredSource || utmMedium || utmCampaign)

  const nowIso = new Date().toISOString()
  const candidate: TouchPoint = {
    source: inferredSource || 'direct',
    medium: utmMedium || (inferredSource && !utmSource ? 'referral' : 'none'),
    campaign: utmCampaign,
    content: utmContent,
    term: utmTerm,
    referrer: rawRef,
    entryPath: parsedUrl.pathname || '/',
    capturedAt: nowIso,
  }

  const firstTouch = current.firstTouch ?? candidate
  let lastTouch: TouchPoint
  if (!current.lastTouch || hasNewChannelSignal) {
    lastTouch = candidate
  } else {
    lastTouch = {
      ...current.lastTouch,
      entryPath: parsedUrl.pathname || '/',
      capturedAt: nowIso,
    }
  }

  const next: AttributionSnapshot = { firstTouch, lastTouch }
  safeWriteStorage(next)
  return next
}

export function buildTaggedCampaignUrl(
  baseUrl: string,
  params: {
    source: string
    medium: string
    campaign: string
    content?: string
    term?: string
  },
): string {
  const url = new URL(baseUrl, 'https://agenticarchitect.ai')
  if (params.source) url.searchParams.set('utm_source', params.source)
  if (params.medium) url.searchParams.set('utm_medium', params.medium)
  if (params.campaign) url.searchParams.set('utm_campaign', params.campaign)
  if (params.content) url.searchParams.set('utm_content', params.content)
  if (params.term) url.searchParams.set('utm_term', params.term)
  return url.toString()
}

export function decorateOutboundHref(href: string, fallbackSource = 'agenticarchitect.ai'): string {
  try {
    const url = new URL(href)
    const snapshot = safeReadStorage()
    const active = snapshot.lastTouch ?? snapshot.firstTouch
    if (!url.searchParams.has('utm_source')) {
      url.searchParams.set('utm_source', active?.source || fallbackSource)
    }
    if (!url.searchParams.has('utm_medium') && active?.medium && active.medium !== 'none') {
      url.searchParams.set('utm_medium', active.medium)
    }
    if (!url.searchParams.has('utm_campaign') && active?.campaign) {
      url.searchParams.set('utm_campaign', active.campaign)
    }
    if (!url.searchParams.has('utm_content') && active?.entryPath) {
      url.searchParams.set('utm_content', active.entryPath)
    }
    return url.toString()
  } catch {
    return href
  }
}

export function trackFunnelEvent(
  event: FunnelEventName,
  props: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === 'undefined') return
  try {
    const ph = (window as unknown as { posthog?: { capture?: (n: string, p?: Record<string, unknown>) => void } }).posthog
    if (!ph || typeof ph.capture !== 'function') return
    const snapshot = safeReadStorage()
    ph.capture(event, {
      site: 'agenticarchitect.ai',
      first_utm_source: snapshot.firstTouch?.source ?? '',
      first_utm_medium: snapshot.firstTouch?.medium ?? '',
      first_utm_campaign: snapshot.firstTouch?.campaign ?? '',
      first_entry_path: snapshot.firstTouch?.entryPath ?? '',
      last_utm_source: snapshot.lastTouch?.source ?? '',
      last_entry_path: snapshot.lastTouch?.entryPath ?? '',
      ...props,
    })
  } catch {
    // Never let analytics block UX
  }
}

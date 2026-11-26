'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  capturePageAttribution,
  decorateOutboundHref,
  trackFunnelEvent,
  type FunnelEventName,
} from '@/lib/attribution'

const MIN_READ_DWELL_MS = 8000
const READ_MILESTONES = [50, 85] as const
const SENSITIVE_QUERY_KEYS = new Set(['email', 'body', 'message', 'name', 'token', 'key', 'code'])

function resolveUiSection(el: HTMLElement): string {
  if (el.closest('nav')) return 'header'
  if (el.closest('footer')) return 'footer'
  if (el.closest('aside')) return 'sidebar'
  if (el.closest('article')) return 'article'
  if (el.closest('header')) return 'header'
  if (el.closest('section')) return 'section'
  return 'main'
}

export function sanitizeAnalyticsHref(rawHref: string): string {
  const trimmed = rawHref.trim()
  if (!trimmed) return ''
  if (/^(mailto|tel):/i.test(trimmed)) {
    return trimmed.split('?')[0]
  }
  const qIdx = trimmed.indexOf('?')
  if (qIdx < 0) return trimmed

  const base = trimmed.slice(0, qIdx)
  const hashIdx = trimmed.indexOf('#', qIdx)
  const queryPart = hashIdx >= 0 ? trimmed.slice(qIdx + 1, hashIdx) : trimmed.slice(qIdx + 1)
  const params = new URLSearchParams(queryPart)
  for (const key of [...params.keys()]) {
    if (SENSITIVE_QUERY_KEYS.has(key.toLowerCase())) {
      params.delete(key)
    }
  }
  const serialized = params.toString()
  return serialized ? `${base}?${serialized}` : base
}

export function AttributionRuntime() {
  const pathname = usePathname()
  const isInitialMount = useRef(true)
  const enteredAtRef = useRef<number>(0)
  const firedMilestonesRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    enteredAtRef.current = Date.now()
    firedMilestonesRef.current.clear()
    if (isInitialMount.current) {
      isInitialMount.current = false
      capturePageAttribution()
    } else {
      capturePageAttribution(undefined, '')
    }
  }, [pathname])

  useEffect(() => {
    if (enteredAtRef.current === 0) {
      enteredAtRef.current = Date.now()
    }

    let lastScrollEvalAt = 0

    function evaluateReadMilestones() {
      if (Date.now() - enteredAtRef.current < MIN_READ_DWELL_MS) return
      const articleEl = document.querySelector<HTMLElement>('article[data-article-slug]')
      if (!articleEl) return

      const slug = articleEl.getAttribute('data-article-slug') || ''
      if (!slug) return
      const allDone = READ_MILESTONES.every(m => firedMilestonesRef.current.has(`${slug}:${m}`))
      if (allDone) return

      const readingMinutes = Number(articleEl.getAttribute('data-reading-minutes') || 0)
      const scrollHeight = Math.max(document.documentElement.scrollHeight, 1)
      const depthPct = ((window.scrollY + window.innerHeight) / scrollHeight) * 100

      for (const milestone of READ_MILESTONES) {
        const key = `${slug}:${milestone}`
        if (depthPct >= milestone && !firedMilestonesRef.current.has(key)) {
          firedMilestonesRef.current.add(key)
          trackFunnelEvent('article_read_milestone', {
            slug,
            milestone,
            depth_percent: milestone,
            reading_minutes: readingMinutes,
            page: window.location.pathname,
          })
        }
      }
    }

    function handleScroll() {
      const now = Date.now()
      if (now - enteredAtRef.current < MIN_READ_DWELL_MS) return
      if (now - lastScrollEvalAt < 120) return
      lastScrollEvalAt = now
      evaluateReadMilestones()
    }

    const dwellTimer = window.setTimeout(() => {
      evaluateReadMilestones()
    }, MIN_READ_DWELL_MS + 50)

    function handleDocumentClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.('a')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const rawHref = anchor.getAttribute('href') || ''
      const safeHref = sanitizeAnalyticsHref(rawHref)
      const label = (anchor.getAttribute('aria-label') || anchor.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 80)
      const section = resolveUiSection(anchor)
      const currentPage = window.location.pathname

      if (safeHref && !safeHref.startsWith('#')) {
        trackFunnelEvent('ui_link_clicked', {
          href: safeHref,
          label,
          section,
          page: currentPage,
        })
      }

      const customEvent = anchor.getAttribute('data-track-event') as FunnelEventName | null
      if (customEvent) {
        trackFunnelEvent(customEvent, { href: safeHref, page: currentPage })
      }

      if (anchor.hasAttribute('download') || rawHref.startsWith('/downloads/')) {
        const eventName: FunnelEventName = rawHref.includes('ld-stipend')
          ? 'ld_letter_downloaded'
          : 'kit_downloaded'
        trackFunnelEvent(eventName, { asset: safeHref, page: currentPage })
        return
      }

      if (rawHref.startsWith('/courses/') && rawHref !== '/courses') {
        trackFunnelEvent('curriculum_preview_opened', {
          module_path: safeHref,
          page: currentPage,
        })
        return
      }

      if (rawHref.includes('cal.com/')) {
        anchor.href = decorateOutboundHref(anchor.href)
        trackFunnelEvent('cal_booking_clicked', {
          destination: safeHref,
          page: currentPage,
        })
        return
      }

      if (rawHref.includes('substack.com')) {
        anchor.href = decorateOutboundHref(anchor.href)
        trackFunnelEvent('substack_outbound_clicked', {
          destination: safeHref,
          page: currentPage,
        })
      }
    }

    document.addEventListener('click', handleDocumentClick, { capture: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.clearTimeout(dwellTimer)
      document.removeEventListener('click', handleDocumentClick, { capture: true })
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}

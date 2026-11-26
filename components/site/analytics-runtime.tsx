'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  capturePageAttribution,
  decorateOutboundHref,
  trackFunnelEvent,
  type FunnelEventName,
} from '@/lib/attribution'

export function AttributionRuntime() {
  const pathname = usePathname()
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      capturePageAttribution()
    } else {
      capturePageAttribution(undefined, '')
    }
  }, [pathname])

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.('a')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const rawHref = anchor.getAttribute('href') || ''
      const customEvent = anchor.getAttribute('data-track-event') as FunnelEventName | null
      if (customEvent) {
        trackFunnelEvent(customEvent, { href: rawHref, page: window.location.pathname })
      }

      if (anchor.hasAttribute('download') || rawHref.startsWith('/downloads/')) {
        const eventName: FunnelEventName = rawHref.includes('ld-stipend')
          ? 'ld_letter_downloaded'
          : 'kit_downloaded'
        trackFunnelEvent(eventName, { asset: rawHref, page: window.location.pathname })
        return
      }

      if (rawHref.startsWith('/courses/') && rawHref !== '/courses') {
        trackFunnelEvent('curriculum_preview_opened', {
          module_path: rawHref,
          page: window.location.pathname,
        })
        return
      }

      if (rawHref.includes('cal.com/')) {
        anchor.href = decorateOutboundHref(anchor.href)
        trackFunnelEvent('cal_booking_clicked', {
          destination: rawHref,
          page: window.location.pathname,
        })
        return
      }

      if (rawHref.includes('substack.com')) {
        anchor.href = decorateOutboundHref(anchor.href)
        trackFunnelEvent('substack_outbound_clicked', {
          destination: rawHref,
          page: window.location.pathname,
        })
      }
    }

    document.addEventListener('click', handleDocumentClick, { capture: true })
    return () => document.removeEventListener('click', handleDocumentClick, { capture: true })
  }, [])

  return null
}

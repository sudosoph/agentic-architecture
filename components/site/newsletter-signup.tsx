'use client'

import { useState } from 'react'
import { SITE_CONFIG } from '@/lib/site-config'
import { decorateOutboundHref, getStoredAttribution, trackFunnelEvent } from '@/lib/attribution'

interface Props {
  source?: string
  headline?: string
  sub?: string
  buttonLabel?: string
  placeholder?: string
  successMessage?: string
  variant?: 'card' | 'inline'
  buttonVariant?: 'primary' | 'accent'
}

export function NewsletterSignup({
  source = 'site',
  headline = 'Weekly field notes on what new AI makes possible',
  sub = 'One concise dispatch each week bridging frontier capabilities, business implications, and systems you can actually run.',
  buttonLabel = 'Subscribe',
  placeholder = 'Enter your email...',
  successMessage = `Check your inbox to confirm your subscription to ${SITE_CONFIG.newsletterName}.`,
  variant = 'card',
  buttonVariant = 'accent',
}: Props) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'subscribed' | 'redirected'>('idle')

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    const clean = email.trim()
    if (!clean) return
    setState('loading')
    try {
      const attribution = getStoredAttribution()
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: clean, source, attribution }),
      })
      if (res.ok) {
        trackFunnelEvent('newsletter_subscribed', { source })
        setState('subscribed')
        setEmail('')
        return
      }
    } catch {
      // Fall back cleanly to Substack subscribe page
    }
    trackFunnelEvent('substack_outbound_clicked', { source })
    window.open(
      decorateOutboundHref(
        `${SITE_CONFIG.substackUrl}/subscribe?utm_source=${encodeURIComponent(source)}&email=${encodeURIComponent(clean)}`,
        source,
      ),
      '_blank',
      'noopener,noreferrer',
    )
    setState('redirected')
  }

  const formNode =
    state === 'subscribed' ? (
      <p className="rounded-md border border-border bg-surface-elevated px-3.5 py-2.5 text-xs font-medium text-fg">
        {successMessage}
      </p>
    ) : (
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
        <input
          type="email"
          aria-label="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 rounded-md border border-border bg-surface px-3.5 py-2 text-sm text-fg placeholder:text-muted/70 focus:outline-none focus:border-fg"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className={`press-scale rounded-md px-4 py-2 text-sm font-medium cursor-pointer shrink-0 ${
            buttonVariant === 'accent'
              ? 'bg-accent text-white hover:opacity-95'
              : 'bg-fg text-bg hover:opacity-90'
          }`}
        >
          {state === 'loading' ? 'Sending...' : buttonLabel}
        </button>
      </form>
    )

  if (variant === 'inline') {
    return <div className="pt-1">{formNode}</div>
  }

  return (
    <section
      aria-label="Newsletter signup"
      className="rounded-md border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      <div className="space-y-1.5 max-w-xl">
        <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.024em] text-fg">
          {headline}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{sub}</p>
      </div>
      <div className="w-full md:w-auto md:min-w-[340px]">{formNode}</div>
    </section>
  )
}

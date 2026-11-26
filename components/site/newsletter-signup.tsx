'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { getStoredAttribution, trackFunnelEvent } from '@/lib/attribution'

interface Props {
  source?: string
  headline?: string
  sub?: string
  variant?: 'card' | 'inline'
}

export function NewsletterSignup({
  source = 'site',
  headline = 'Get Weekly AI Workflow Blueprints + The Free Starter Kit',
  sub = 'Plain-English playbooks on small-business AI workflows, brand systems, and private setups you own. Published weekly on Substack.',
  variant = 'card',
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
    window.open(
      `${SITE_CONFIG.substackUrl}/subscribe?utm_source=${encodeURIComponent(source)}&email=${encodeURIComponent(clean)}`,
      '_blank',
      'noopener,noreferrer',
    )
    setState('redirected')
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-4">
        <p className="text-sm text-text font-medium flex-1 min-w-[220px]">
          Join <span className="font-semibold">{SITE_CONFIG.newsletterName}</span> for weekly workflow setups:
        </p>
        <a
          href={SITE_CONFIG.substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-accent text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Subscribe on Substack
        </a>
        <Link
          href={SITE_CONFIG.offers.starterKitUrl}
          className="inline-flex items-center justify-center rounded-lg border border-border bg-white text-text px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
        >
          Get Free Starter Kit
        </Link>
      </div>
    )
  }

  return (
    <section
      aria-label="Newsletter signup"
      className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-xs space-y-5"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            {SITE_CONFIG.newsletterName} · Free Weekly Dispatch
          </p>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-text">
            {headline}
          </h3>
          <p className="text-sm md:text-base text-muted leading-relaxed">
            {sub}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
          <a
            href={SITE_CONFIG.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-accent text-white px-5 py-3 text-sm font-semibold shadow-xs hover:bg-blue-700 transition-colors"
          >
            Subscribe Free on Substack →
          </a>
          <Link
            href={SITE_CONFIG.offers.starterKitUrl}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-white text-text px-5 py-3 text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
          >
            Get the Free Starter Kit
          </Link>
        </div>
      </div>

      {state === 'subscribed' ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800">
          Check your inbox to confirm your free subscription to {SITE_CONFIG.newsletterName}.
        </p>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-border">
          <input
            type="email"
            aria-label="Email address for weekly AI playbooks"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email for weekly playbooks..."
            required
            className="flex-1 rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-fg placeholder:text-slate-400 focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="rounded-lg bg-slate-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            {state === 'loading' ? 'Joining...' : 'Join Free by Email'}
          </button>
        </form>
      )}
    </section>
  )
}

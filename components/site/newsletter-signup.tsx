'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Status = 'idle' | 'sending' | 'success' | 'error'

type Props = {
  /** Origin of the signup (homepage / bsw / library / blog) for tracking. */
  source?: string
  /** Optional headline override. */
  headline?: string
  /** Optional sub-line override. */
  sub?: string
  /** Optional surface variant. */
  variant?: 'card' | 'inline'
}

export function NewsletterSignup({
  source = 'unknown',
  headline = "The Architect's Notebook",
  sub,
  variant = 'card',
}: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const json = await res.json().catch(() => ({}))
        setError((json as { error?: string }).error ?? 'Could not subscribe.')
        setStatus('error')
      }
    } catch {
      setError('Network error. Try again.')
      setStatus('error')
    }
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 bg-surface border border-border px-3 py-2 text-sm text-fg placeholder:text-muted font-mono focus:outline-none focus:border-accent"
        />
        <Button type="submit" variant="primary" size="md" disabled={status === 'sending'}>
          {status === 'sending' ? 'sending…' : status === 'success' ? 'subscribed ✓' : 'subscribe ›'}
        </Button>
        {status === 'error' && (
          <p className="font-mono text-xs text-pressure mt-1 sm:mt-0 sm:ml-2 self-center">{error}</p>
        )}
      </form>
    )
  }

  return (
    <section className="border border-border bg-surface p-6">
      <p className="font-mono text-xs text-bench uppercase tracking-widest mb-2">
        {headline}
      </p>
      {sub ? (
        <p className="font-mono text-sm text-fg leading-relaxed mb-1">{sub}</p>
      ) : (
        <p className="font-mono text-sm text-fg leading-relaxed mb-1">
          One email a week on agentic architecture and local AI for lean
          founders.
        </p>
      )}
      <p className="font-mono text-xs text-muted leading-relaxed mb-4">
        n8n templates, cost teardowns, and what is actually working in 2026.
        No drip sequences, no upsells. Reply to opt out.{' '}
        <span className="text-accent">Free for Boulder Startup Week attendees.</span>
      </p>
      {status === 'success' ? (
        <p className="font-mono text-sm text-online">
          Subscribed. The next issue lands in your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            aria-label="Email address"
            className="flex-1 bg-bg border border-border px-3 py-2 text-sm text-fg placeholder:text-muted font-mono focus:outline-none focus:border-accent"
          />
          <Button type="submit" variant="primary" size="md" disabled={status === 'sending'}>
            {status === 'sending' ? 'sending…' : 'subscribe ›'}
          </Button>
        </form>
      )}
      {status === 'error' && (
        <p className="font-mono text-xs text-pressure mt-2">{error}</p>
      )}
    </section>
  )
}

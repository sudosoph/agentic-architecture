'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { getStoredAttribution, trackFunnelEvent } from '@/lib/attribution'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'fallback'

export function ContactForm() {
  const params = useSearchParams()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [mailtoHref, setMailtoHref] = useState('')

  useEffect(() => {
    const s = params.get('subject')
    const m = params.get('message')
    if (s) setSubject(s)
    if (m) setMessage(m)
  }, [params])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      attribution: getStoredAttribution(),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        trackFunnelEvent('contact_inquiry_sent', { subject: data.subject || 'general' })
        setStatus('success')
        form.reset()
      } else {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string
          unconfigured?: boolean
        }
        if (res.status === 503 && json.unconfigured) {
          const subjectPart = data.subject?.trim() || `Note from ${data.name.trim()}`
          const bodyPart = `From: ${data.name.trim()} <${data.email.trim()}>\n\n${data.message.trim()}`
          const href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
            subjectPart,
          )}&body=${encodeURIComponent(bodyPart)}`
          setMailtoHref(href)
          setStatus('fallback')
        } else {
          setErrorMsg(json.error ?? 'Something went wrong.')
          setStatus('error')
        }
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-border bg-surface px-6 py-8 text-sm font-medium text-fg">
        Message received. I will reply within one to two business days.
      </div>
    )
  }

  if (status === 'fallback') {
    return (
      <div className="rounded-lg border border-border bg-surface px-6 py-8 space-y-4">
        <p className="text-sm text-fg leading-relaxed">
          Your message is ready to send directly. Click below to open it pre-filled in your email
          client:
        </p>
        <a
          href={mailtoHref}
          className="press-scale inline-flex items-center justify-center rounded-md bg-accent text-white px-4 py-2.5 text-sm font-medium hover:opacity-95"
        >
          Open in Email Client
        </a>
        <p className="text-xs text-muted leading-relaxed">
          Or email directly:{' '}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-fg font-medium underline underline-offset-3 decoration-border"
          >
            {SITE_CONFIG.email}
          </a>
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-xl rounded-lg border border-border bg-surface p-6 md:p-8"
    >
      <p className="text-xs font-semibold text-fg">Send a Written Inquiry</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" type="text" required placeholder="Your name" />
        <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-xs font-medium text-fg">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Advisory, corporate workshop, university lecture, or sponsorship"
          className="rounded-md bg-bg border border-border px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/70 focus:outline-none focus:border-fg"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium text-fg">
          Message <span className="text-pressure">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Share your goals, organization context, or timeline..."
          className="rounded-md bg-bg border border-border px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/70 focus:outline-none focus:border-fg resize-none"
        />
      </div>

      {status === 'error' && <p className="text-xs font-medium text-pressure">{errorMsg}</p>}

      <Button type="submit" variant="primary" size="md" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string
  name: string
  type: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-medium text-fg">
        {label} {required && <span className="text-pressure">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-md bg-bg border border-border px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/70 focus:outline-none focus:border-fg"
      />
    </div>
  )
}

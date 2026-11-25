'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

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
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string
          unconfigured?: boolean
        }
        if (res.status === 503 && json.unconfigured) {
          // Email service isn't wired up yet — give them a mailto fallback
          // pre-filled with the message so nothing's lost.
          const subjectPart = data.subject?.trim() || `Note from ${data.name.trim()}`
          const bodyPart = `From: ${data.name.trim()} <${data.email.trim()}>\n\n${data.message.trim()}`
          const href = `mailto:sophia@agenticarchitect.ai?subject=${encodeURIComponent(
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
      <div className="border border-online bg-surface px-6 py-8 font-mono text-sm text-online">
        Message sent. I'll get back to you within 1–2 business days.
      </div>
    )
  }

  if (status === 'fallback') {
    return (
      <div className="border border-border bg-surface px-6 py-8 space-y-4">
        <p className="font-mono text-sm text-fg leading-relaxed">
          The contact form is being wired up this week. In the meantime, your
          message has been packaged into an email to Sophia — one click below
          opens it in your default mail client.
        </p>
        <a
          href={mailtoHref}
          className="inline-block bg-fg text-bg px-4 py-2 font-mono text-sm hover:bg-accent transition-colors"
        >
          open mail client →
        </a>
        <p className="font-mono text-xs text-muted leading-relaxed">
          Or copy this address directly:{' '}
          <a href="mailto:sophia@agenticarchitect.ai" className="text-accent hover:underline">
            sophia@agenticarchitect.ai
          </a>
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-xl border border-border bg-surface p-6 md:p-8"
    >
      <p className="font-mono text-xs text-bench uppercase tracking-widest">
        Send a message
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" type="text" required placeholder="Your name" />
        <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="font-mono text-xs text-muted uppercase tracking-widest">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="What's this about?"
          className="bg-surface border border-border px-3 py-2 text-sm text-fg placeholder:text-muted font-sans focus:outline-none focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-mono text-xs text-muted uppercase tracking-widest">
          Message <span className="text-pressure">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Your message..."
          className="bg-surface border border-border px-3 py-2 text-sm text-fg placeholder:text-muted font-sans focus:outline-none focus:border-accent resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="font-mono text-xs text-pressure">{errorMsg}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'sending…' : 'send message ›'}
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
      <label htmlFor={name} className="font-mono text-xs text-muted uppercase tracking-widest">
        {label} {required && <span className="text-pressure">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="bg-surface border border-border px-3 py-2 text-sm text-fg placeholder:text-muted font-sans focus:outline-none focus:border-accent"
      />
    </div>
  )
}

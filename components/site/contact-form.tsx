'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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
        const json = await res.json().catch(() => ({}))
        setErrorMsg((json as { error?: string }).error ?? 'Something went wrong.')
        setStatus('error')
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" type="text" required placeholder="Your name" />
        <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <Field label="Subject" name="subject" type="text" placeholder="What's this about?" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-mono text-xs text-muted uppercase tracking-widest">
          Message <span className="text-pressure">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
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

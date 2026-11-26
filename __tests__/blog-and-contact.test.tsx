import fs from 'fs'
import path from 'path'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('subject=VIP%20Audit'),
  notFound: () => {
    throw new Error('NOT_FOUND')
  },
}))

import BlogPage from '@/app/(site)/blog/page'
import { ContactForm } from '@/components/site/contact-form'

describe('Blog query compatibility, ContactForm 503 fallback, and WCAG AA tokens', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('filters BlogPage cleanly for ?track=, legacy ?theme=local-models, ?tag=rocm, and repeated array params', async () => {
    const themeView = await BlogPage({
      searchParams: Promise.resolve({ theme: 'local-models' }),
    })
    const { container: c1, unmount: u1 } = render(themeView)
    expect(c1.textContent).toContain('Local models')
    expect(c1.querySelectorAll('a[href^="/blog/"]').length).toBeGreaterThanOrEqual(10)
    u1()

    const arrayTagView = await BlogPage({
      searchParams: Promise.resolve({
        tag: ['rocm', 'amd'] as unknown as string,
      }),
    })
    const { container: c2, unmount: u2 } = render(arrayTagView)
    expect(c2.querySelectorAll('a[href^="/blog/"]').length).toBeGreaterThanOrEqual(2)
    u2()

    const trackView = await BlogPage({
      searchParams: Promise.resolve({ track: 'small-business' }),
    })
    const { container: c3, unmount: u3 } = render(trackView)
    expect(c3.querySelectorAll('a[href^="/blog/"]').length).toBe(20)
    u3()
  })

  it('formats YYYY-MM-DD blog dates in UTC so Mountain Time never shifts dates a day early', async () => {
    const spy = vi.spyOn(Date.prototype, 'toLocaleDateString')
    const view = await BlogPage({ searchParams: Promise.resolve({ track: 'small-business' }) })
    render(view)
    const callsWithOptions = spy.mock.calls.filter(call => call[1] && typeof call[1] === 'object')
    expect(callsWithOptions.length).toBeGreaterThan(0)
    for (const [, opts] of callsWithOptions) {
      expect((opts as Intl.DateTimeFormatOptions).timeZone).toBe('UTC')
    }
  })

  it('renders high-contrast bg-accent text-white mailto fallback button when /api/contact returns 503 unconfigured', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ unconfigured: true, error: 'Not configured' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Alex Founder' } })
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'alex@example.com' } })
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'Interested in a corporate AI workshop.' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }))

    const fallbackLink = await waitFor(() =>
      screen.getByRole('link', { name: /Open in Email Client/i }),
    )
    expect(fallbackLink.className).toContain('bg-accent')
    expect(fallbackLink.className).toContain('text-white')
    expect(fallbackLink.getAttribute('href')).toContain('mailto:sophia@agenticarchitect.ai')
    expect(fallbackLink.getAttribute('href')).toContain('VIP%20Audit')
  })

  it('defines WCAG AA >= 4.5:1 tokens for --color-online and --color-rig in app/globals.css', () => {
    const css = fs.readFileSync(path.join(process.cwd(), 'app/globals.css'), 'utf8')
    expect(css).toMatch(/--color-online:\s*#047857/i)
    expect(css).toMatch(/--color-rig:\s*#b45309/i)
  })
})

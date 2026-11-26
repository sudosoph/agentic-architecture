import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/footer'

describe('Footer (Option A Monograph)', () => {
  it('renders three organized footer columns', () => {
    render(<Footer />)
    expect(screen.getByText('Writing & Frameworks')).toBeTruthy()
    expect(screen.getByText('Courses & Practice')).toBeTruthy()
    expect(screen.getByText('Connect')).toBeTruthy()
  })

  it('excludes retired sudosoph and X links cleanly', () => {
    const { container } = render(<Footer />)
    expect(container.innerHTML).not.toContain('sudosoph')
    expect(container.innerHTML).not.toContain('x.com')
    expect(container.innerHTML).not.toContain('twitter.com')
  })

  it('renders Substack, LinkedIn, Contact, and RSS links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /Substack Dispatch/i }).getAttribute('href')).toBe(
      'https://agenticarchitectai.substack.com',
    )
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /Contact/i }).getAttribute('href')).toBe('/contact')
    expect(screen.getByRole('link', { name: /RSS Feed/i }).getAttribute('href')).toBe('/rss.xml')
  })

  it('renders clean legal line with zero personal-capacity disclaimers or em-dashes', () => {
    const { container } = render(<Footer />)
    expect(screen.getByText(/2026 Agentic Architecture LLC/)).toBeTruthy()
    expect(container.textContent?.toLowerCase()).not.toContain('personal capacity')
    expect(container.textContent?.toLowerCase()).not.toContain('views my own')
    expect(container.textContent).not.toContain('\u2014')
  })
})

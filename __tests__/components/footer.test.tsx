import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/footer'

describe('Footer', () => {
  it('renders three organized footer columns', () => {
    render(<Footer />)
    expect(screen.getByText('Explore')).toBeTruthy()
    expect(screen.getByText('Programs & Advisory')).toBeTruthy()
    expect(screen.getByText('Connect')).toBeTruthy()
  })

  it('links X to x.com/sudosoph and never x.com/agenticarchitect', () => {
    const { container } = render(<Footer />)
    const xLink = screen.getByRole('link', { name: /^X/i })
    expect(xLink.getAttribute('href')).toBe('https://x.com/sudosoph')
    expect(container.innerHTML).not.toContain('x.com/agenticarchitect')
  })

  it('renders Substack, LinkedIn, GitHub, and RSS links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /Substack/i }).getAttribute('href')).toBe(
      'https://agenticarchitectai.substack.com',
    )
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /GitHub/i }).getAttribute('href')).toBe(
      'https://github.com/sudosoph',
    )
    expect(screen.getByRole('link', { name: /RSS/i }).getAttribute('href')).toBe('/rss.xml')
  })

  it('renders personal-capacity note and zero em-dashes', () => {
    const { container } = render(<Footer />)
    expect(screen.getByText(/2026 Agentic Architecture LLC/)).toBeTruthy()
    expect(screen.getByText(/personal capacity, views my own/i)).toBeTruthy()
    expect(container.textContent).not.toContain('\u2014')
  })
})

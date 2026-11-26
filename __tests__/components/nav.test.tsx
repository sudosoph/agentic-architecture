import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Nav } from '@/components/nav'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Nav (Logo 1 Mitered Architectural AA + Coherent Hierarchy)', () => {
  it('renders Logo 1 SVG mark and wordmark linking to /', () => {
    const { container } = render(<Nav />)
    const brand = screen.getByRole('link', { name: /Agentic Architect/i })
    expect(brand.getAttribute('href')).toBe('/')
    expect(brand.querySelector('svg')).not.toBeNull()
    expect(container.textContent).not.toContain('\u2014')
  })

  it('orders desktop navigation as About, Writing, Courses, Speaking & Teaching + single Work With Me CTA', () => {
    const { container } = render(<Nav />)
    const navLinks = Array.from(container.querySelectorAll('header a')).map(a => ({
      text: a.textContent?.trim(),
      href: a.getAttribute('href'),
    }))
    // Brand first, then About, Writing, Courses, Speaking & Teaching, then Work With Me
    expect(navLinks.map(l => l.href)).toEqual([
      '/',
      '/about',
      '/blog',
      '/courses',
      '/teaching',
      '/work-with-me',
    ])
  })

  it('opens and closes mobile drawer cleanly', () => {
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('button', { name: 'Close menu' })).toBeNull()
  })
})

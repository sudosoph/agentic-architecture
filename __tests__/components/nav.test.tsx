import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Nav } from '@/components/nav'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Nav', () => {
  it('renders wordmark linking to /', () => {
    render(<Nav />)
    const brand = screen.getByRole('link', { name: /Agentic Architect/i })
    expect(brand.getAttribute('href')).toBe('/')
  })

  it('renders Two-Room navigation separating Owner Playbooks & Bespoke Builds from Research & Teaching', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Owner Playbooks' }).getAttribute('href')).toBe('/blog')
    expect(screen.getByRole('link', { name: 'Courses & Cohort' }).getAttribute('href')).toBe('/courses')
    expect(screen.getByRole('link', { name: 'Bespoke AI Builds' }).getAttribute('href')).toBe('/work-with-me')
    expect(screen.getByRole('link', { name: 'Research & Teaching' }).getAttribute('href')).toBe('/research')
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/about')
    expect(screen.getByRole('link', { name: /Free Live Briefing/i }).getAttribute('href')).toBe('/masterclass')
  })

  it('opens and closes mobile drawer cleanly', () => {
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('button', { name: 'Close menu' })).toBeNull()
  })
})

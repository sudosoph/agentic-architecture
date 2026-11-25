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

  it('renders Crisp Operator V2 navigation links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Playbooks' }).getAttribute('href')).toBe('/blog')
    expect(screen.getByRole('link', { name: 'Kits & Courses' }).getAttribute('href')).toBe('/courses')
    expect(screen.getByRole('link', { name: 'Speaking & Teaching' }).getAttribute('href')).toBe('/teaching')
    expect(screen.getByRole('link', { name: 'Stack & Rigs' }).getAttribute('href')).toBe('/stack')
    expect(screen.getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/about')
    expect(screen.getByRole('link', { name: /Work With Me/i }).getAttribute('href')).toBe('/work-with-me')
  })

  it('opens and closes mobile drawer cleanly', () => {
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('button', { name: 'Close menu' })).toBeNull()
  })
})

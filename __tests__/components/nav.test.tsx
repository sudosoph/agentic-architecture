import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Nav } from '@/components/nav'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Nav', () => {
  it('renders wordmark text', () => {
    render(<Nav />)
    expect(screen.getByText('Agentic Architect')).toBeTruthy()
  })

  it('wordmark links to /', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Agentic Architect' }).getAttribute('href')).toBe('/')
  })

  it('renders about link', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'about' })).toBeTruthy()
  })

  it('renders blog link', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'blog' })).toBeTruthy()
  })

  it('renders contact link', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'contact' })).toBeTruthy()
  })

  it('renders work with me link', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'work with me ›' })).toBeTruthy()
  })

  it('renders hamburger button', () => {
    render(<Nav />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeTruthy()
  })

  it('opens drawer when hamburger is clicked', () => {
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeTruthy()
  })

  it('closes drawer when close button is clicked', () => {
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('button', { name: 'Close menu' })).toBeNull()
  })
})

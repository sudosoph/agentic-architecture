import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/footer'

describe('Footer', () => {
  it('renders Content column heading', () => {
    render(<Footer />)
    expect(screen.getByText('Content')).toBeTruthy()
  })

  it('renders Work column heading', () => {
    render(<Footer />)
    expect(screen.getByText('Work')).toBeTruthy()
  })

  it('renders Connect column heading', () => {
    render(<Footer />)
    expect(screen.getByText('Connect')).toBeTruthy()
  })

  it('renders about link in Content column', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'about' })).toBeTruthy()
  })

  it('renders work with me link in Work column', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'work with me' })).toBeTruthy()
  })

  it('renders X link in Connect column', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'X ↗' })).toBeTruthy()
  })

  it('RSS link has text-accent class', () => {
    render(<Footer />)
    const rssLink = screen.getByRole('link', { name: 'RSS ↗' })
    expect(rssLink.className).toContain('text-accent')
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/2026 Agentic Architecture LLC/)).toBeTruthy()
  })

  it('renders hardware tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/Framework 16/)).toBeTruthy()
  })
})

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/button'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))

describe('Button (Option A Editorial Monograph)', () => {
  it('renders children with tactile press-scale', () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: 'Click me' })
    expect(btn).toBeTruthy()
    expect(btn.className).toContain('press-scale')
  })

  it('primary variant applies ink bg-fg and text-bg classes', () => {
    render(<Button variant="primary">Go</Button>)
    const cls = screen.getByRole('button', { name: 'Go' }).className
    expect(cls).toContain('bg-fg')
    expect(cls).toContain('text-bg')
  })

  it('accent variant applies bg-accent and text-white classes', () => {
    render(<Button variant="accent">Go</Button>)
    const cls = screen.getByRole('button', { name: 'Go' }).className
    expect(cls).toContain('bg-accent')
    expect(cls).toContain('text-white')
  })

  it('outline variant applies border-border and hover:border-fg/45 classes', () => {
    render(<Button variant="outline">Go</Button>)
    const cls = screen.getByRole('button', { name: 'Go' }).className
    expect(cls).toContain('border-border')
    expect(cls).toContain('hover:border-fg/45')
  })

  it('ghost variant applies text-muted class and sm size applies text-xs class', () => {
    render(<Button variant="ghost" size="sm">Go</Button>)
    const cls = screen.getByRole('button', { name: 'Go' }).className
    expect(cls).toContain('text-muted')
    expect(cls).toContain('text-xs')
  })

  it('renders as anchor link when href provided', () => {
    render(<Button href="/work-with-me">Work With Me</Button>)
    const link = screen.getByRole('link', { name: 'Work With Me' })
    expect(link.getAttribute('href')).toBe('/work-with-me')
  })
})

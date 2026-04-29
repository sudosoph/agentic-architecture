import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/button'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeTruthy()
  })

  it('primary variant applies bg-accent class', () => {
    render(<Button variant="primary">Go</Button>)
    expect(screen.getByRole('button', { name: 'Go' }).className).toContain('bg-accent')
  })

  it('outline variant applies border-accent class', () => {
    render(<Button variant="outline">Go</Button>)
    expect(screen.getByRole('button', { name: 'Go' }).className).toContain('border-accent')
  })

  it('ghost variant applies text-muted class', () => {
    render(<Button variant="ghost">Go</Button>)
    expect(screen.getByRole('button', { name: 'Go' }).className).toContain('text-muted')
  })

  it('sm size applies text-xs class', () => {
    render(<Button size="sm">Go</Button>)
    expect(screen.getByRole('button', { name: 'Go' }).className).toContain('text-xs')
  })

  it('renders as anchor link when href provided', () => {
    render(<Button href="/consult">consult</Button>)
    const link = screen.getByRole('link', { name: 'consult' })
    expect(link).toBeTruthy()
    expect(link.getAttribute('href')).toBe('/consult')
  })
})

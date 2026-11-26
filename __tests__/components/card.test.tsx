import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from '@/components/ui/card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Hello</Card>)
    expect(screen.getByText('Hello')).toBeTruthy()
  })

  it('applies bg-surface and border-border classes', () => {
    render(<Card data-testid="card">content</Card>)
    const card = screen.getByTestId('card')
    expect(card.className).toContain('bg-surface')
    expect(card.className).toContain('border-border')
  })

  it('adds hairline hover:border-fg/35 when interactive prop is set', () => {
    render(<Card interactive data-testid="card">content</Card>)
    expect(screen.getByTestId('card').className).toContain('hover:border-fg/35')
  })

  it('does not add hover:border-fg/35 without interactive prop', () => {
    render(<Card data-testid="card">content</Card>)
    expect(screen.getByTestId('card').className).not.toContain('hover:border-fg/35')
  })
})

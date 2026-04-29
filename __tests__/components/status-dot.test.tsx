import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatusDot } from '@/components/ui/status-dot'

describe('StatusDot', () => {
  it('renders online state with green class', () => {
    render(<StatusDot state="online" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-green')
  })

  it('renders pending state with amber class', () => {
    render(<StatusDot state="pending" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-amber')
  })

  it('renders offline state with zinc class', () => {
    render(<StatusDot state="offline" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-zinc')
  })

  it('online state has animate-pulse class', () => {
    render(<StatusDot state="online" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('animate-pulse')
  })

  it('pending state does not have animate-pulse class', () => {
    render(<StatusDot state="pending" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).not.toContain('animate-pulse')
  })

  it('offline state does not have animate-pulse class', () => {
    render(<StatusDot state="offline" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).not.toContain('animate-pulse')
  })
})

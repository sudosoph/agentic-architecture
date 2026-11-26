import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from '@/components/ui/badge'

describe('Badge (Option A Editorial Monograph)', () => {
  it('renders tag variant with restrained border and zero pill radius', () => {
    render(<Badge variant="tag" data-testid="b">architecture</Badge>)
    const el = screen.getByTestId('b')
    expect(el.textContent).toBe('architecture')
    expect(el.className).toContain('rounded-md')
    expect(el.className).not.toContain('rounded-full')
    expect(el.className).toContain('bg-surface-elevated')
  })

  it('renders status, online, rig, and accent variants cleanly', () => {
    render(
      <>
        <Badge variant="status" data-testid="status">active</Badge>
        <Badge variant="online" data-testid="online">live</Badge>
        <Badge variant="rig" data-testid="rig">mesh</Badge>
        <Badge variant="accent" data-testid="accent">featured</Badge>
      </>,
    )
    expect(screen.getByTestId('status').className).toContain('text-fg')
    expect(screen.getByTestId('online').className).toContain('border-fg/20')
    expect(screen.getByTestId('rig').className).toContain('text-muted')
    expect(screen.getByTestId('accent').className).toContain('text-accent')
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeroBlueprintSwitcher } from '@/components/site/hero-blueprint'

describe('HeroBlueprintSwitcher', () => {
  it('separates Sales & Lead Ops, Executive Chief of Staff, and Fractional & Private AI blueprints with zero voice.md', () => {
    const { container } = render(<HeroBlueprintSwitcher />)
    expect(screen.getByRole('tab', { name: /Sales & Intake/i })).toBeTruthy()
    expect(container.textContent?.toLowerCase()).not.toContain('voice.md')

    fireEvent.click(screen.getByRole('tab', { name: /Back-Office Ops/i }))
    expect(screen.getByText(/Inbound Lead or Booking/i)).toBeTruthy()

    fireEvent.click(screen.getByRole('tab', { name: /Private AI/i }))
    expect(screen.getByText(/Encrypted Private Mesh/i)).toBeTruthy()
    expect(container.textContent).not.toContain('\u2014')
  })
})

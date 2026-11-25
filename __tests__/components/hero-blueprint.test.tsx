import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HeroBlueprintSwitcher } from '@/components/site/hero-blueprint'

describe('HeroBlueprintSwitcher', () => {
  it('defaults to Executive Voice Context Vault and switches across all 3 blueprints cleanly', () => {
    const { container } = render(<HeroBlueprintSwitcher />)
    expect(screen.getByRole('tab', { name: /Executive Voice/i })).toBeTruthy()
    expect(screen.getByText(/voice\.md \+ icp\.md Context Vault/i)).toBeTruthy()

    fireEvent.click(screen.getByRole('tab', { name: /Back-Office Ops/i }))
    expect(screen.getByText(/Inbound Lead or Booking/i)).toBeTruthy()

    fireEvent.click(screen.getByRole('tab', { name: /Private AI/i }))
    expect(screen.getByText(/Encrypted Private Mesh/i)).toBeTruthy()
    expect(container.textContent).not.toContain('\u2014')
  })
})

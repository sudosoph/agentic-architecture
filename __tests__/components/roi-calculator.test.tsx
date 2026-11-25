import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RoiCalculator } from '@/components/site/roi-calculator'

describe('RoiCalculator', () => {
  it('calculates default monthly hours reclaimed (teamSize=8, hoursPerWeek=6 -> 156 hrs) and updates on slider change', () => {
    const { container } = render(<RoiCalculator />)
    expect(screen.getByTestId('roi-hours').textContent).toContain('156')

    const teamSlider = screen.getByLabelText(/Team size/i)
    fireEvent.change(teamSlider, { target: { value: '12' } })
    // Math.round(12 * 6 * 4.33 * 0.75) = Math.round(233.82) = 234
    expect(screen.getByTestId('roi-hours').textContent).toContain('234')
    expect(container.textContent).toContain('$65,000')
    expect(container.textContent).not.toContain('\u2014')
  })
})

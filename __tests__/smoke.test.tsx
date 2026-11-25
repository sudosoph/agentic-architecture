import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '@/app/(site)/page'
import AboutPage from '@/app/(site)/about/page'

describe('HomePage & AboutPage Crisp Operator V2', () => {
  it('renders HomePage split hero, credential chips, and interactive blueprint switcher', () => {
    const { container } = render(<HomePage />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Build your AI org chart, automate busywork, and own your stack/i,
      }),
    ).toBeTruthy()
    expect(screen.getByText(/Columbia CS/i)).toBeTruthy()
    expect(screen.getByText(/ex-McKinsey/i)).toBeTruthy()
    expect(screen.getByText(/Women Who Code/i)).toBeTruthy()
    expect(container.textContent).not.toContain('Speaking next')
    expect(container.textContent).not.toContain('Lesbians Who Tech')
    expect(container.textContent).not.toContain('\u2014')
    expect(screen.getByTestId('hero-section').textContent).not.toMatch(/DeepSeek|Gemini/i)

    const privateTab = screen.getByRole('tab', { name: /Private AI/i })
    fireEvent.click(privateTab)
    expect(screen.getByText(/Encrypted Private Mesh/i)).toBeTruthy()
  })

  it('renders AboutPage scannable credentials, Women Who Code, and personal-capacity Google framing', () => {
    const { container } = render(<AboutPage />)
    expect(screen.getAllByText(/Columbia University/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/McKinsey/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/personal capacity[,;] views my own/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/patent-pending/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Women Who Code/i).length).toBeGreaterThan(0)
    expect(container.textContent).not.toContain('Lesbians Who Tech')
    expect(container.textContent).not.toContain('\u2014')
    expect(container.textContent).not.toMatch(/DeepSeek|Gemini/i)
  })
})

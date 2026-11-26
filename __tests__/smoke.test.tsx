import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '@/app/(site)/page'
import AboutPage from '@/app/(site)/about/page'

describe('HomePage & AboutPage (Option B Swiss Studio Grid)', () => {
  it('renders HomePage Swiss Studio grid hero, interactive blog categories & topic clusters, 3-surface ecosystem, and zero CV/bravado leaks', () => {
    const { container } = render(<HomePage />)
    const text = container.textContent ?? ''
    expect(screen.getByTestId('hero-section')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
    expect(text).toContain('Agentic Architect Lab')
    expect(text).toContain('Substack')
    expect(text).toContain('Strategy & Operations')
    expect(text).toContain('Models & Infrastructure')
    expect(text).toContain('Systems Architecture')
    expect(text).toContain('Local models')
    expect(text).toContain('Agent architecture')

    const modelsTab = screen.getByRole('tab', { name: /Models & Infrastructure/i })
    fireEvent.click(modelsTab)
    expect(modelsTab.getAttribute('aria-selected')).toBe('true')
    expect(container.textContent).toContain('Browse all')

    expect(text.toLowerCase()).not.toContain('columbia')
    expect(text.toLowerCase()).not.toContain('mckinsey')
    expect(text.toLowerCase()).not.toContain('sudosoph')
    expect(text.toLowerCase()).not.toContain('zero dropped leads')
    expect(text.toLowerCase()).not.toContain('ai org chart')
    expect(text.toLowerCase()).not.toContain('voice.md')
    expect(text).not.toContain('Lesbians Who Tech')
    expect(text).not.toContain('\u2014')
  })

  it('renders AboutPage 3-surface narrative, Boulder Startup Week, Women Who Code, and zero CV/employer disclaimers', () => {
    const { container } = render(<AboutPage />)
    const text = container.textContent ?? ''
    expect(screen.getByRole('heading', { level: 1, name: /Sophia Stein/i })).toBeTruthy()
    expect(text).toContain('Three surfaces, one coherent point of view')
    expect(text).toContain('Two tracks, one quality bar')
    expect(text).toContain('Boulder Startup Week')
    expect(text).toContain('Women Who Code')
    expect(text.toLowerCase()).not.toContain('columbia')
    expect(text.toLowerCase()).not.toContain('mckinsey')
    expect(text.toLowerCase()).not.toContain('personal capacity')
    expect(text.toLowerCase()).not.toContain('patent-pending')
    expect(text).not.toContain('Lesbians Who Tech')
    expect(text).not.toContain('\u2014')
  })
})

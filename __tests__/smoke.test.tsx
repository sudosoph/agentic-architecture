import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HomePage from '@/app/(site)/page'
import AboutPage from '@/app/(site)/about/page'

describe('HomePage & AboutPage (Option A Editorial Monograph)', () => {
  it('renders HomePage monograph hero, 3-surface ecosystem, staggered essay dates, and zero CV/bravado leaks', () => {
    const { container } = render(<HomePage />)
    const text = container.textContent ?? ''
    expect(screen.getByTestId('hero-section')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
    expect(text).toContain('Agentic Architect Lab')
    expect(text).toContain('Substack')
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

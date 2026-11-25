import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

describe('NewsletterSignup', () => {
  it('renders native Crisp Operator signup card with zero iframes and zero em-dashes', () => {
    const { container } = render(<NewsletterSignup />)
    expect(container.querySelectorAll('iframe').length).toBe(0)
    expect(container.textContent).not.toContain('\u2014')
    const substackLink = screen.getByRole('link', { name: /Subscribe Free on Substack/i })
    expect(substackLink.getAttribute('href')).toBe('https://agenticarchitectai.substack.com')
    const kitLink = screen.getByRole('link', { name: /Get the Free Starter Kit/i })
    expect(kitLink.getAttribute('href')).toBe('/starter-kit')
  })

  it('supports compact inline variant without iframes', () => {
    const { container } = render(<NewsletterSignup variant="inline" />)
    expect(container.querySelectorAll('iframe').length).toBe(0)
    expect(screen.getByRole('link', { name: /Subscribe on Substack/i }).getAttribute('href')).toBe(
      'https://agenticarchitectai.substack.com',
    )
  })
})

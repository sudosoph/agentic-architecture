import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

describe('NewsletterSignup (Single Clean CTA)', () => {
  it('renders single email input and single Subscribe button with zero iframes, zero competing buttons, and zero em-dashes', () => {
    const { container } = render(<NewsletterSignup />)
    expect(container.querySelectorAll('iframe').length).toBe(0)
    expect(container.textContent).not.toContain('\u2014')
    expect(screen.getByLabelText(/Email address/i)).toBeTruthy()
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeTruthy()
    expect(container.querySelectorAll('a').length).toBe(0)
  })

  it('supports compact inline variant and custom waitlist buttonLabel without iframes', () => {
    const { container } = render(
      <NewsletterSignup
        variant="inline"
        source="skool-waitlist"
        buttonLabel="Join Founding Waitlist"
      />,
    )
    expect(container.querySelectorAll('iframe').length).toBe(0)
    expect(screen.getByRole('button', { name: 'Join Founding Waitlist' })).toBeTruthy()
  })
})

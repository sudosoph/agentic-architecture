import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BespokeStackSelector } from '@/components/site/bespoke-stack-selector'
import WhatIsAgenticArchitectPage from '@/app/(site)/what-is-an-agentic-architect/page'

describe('Interactive Architecture Selector & Pillar Link Hygiene', () => {
  it('updates BespokeStackSelector across departments and privacy tiers with API + Vertical AI vs In-House guidance', () => {
    const { container } = render(<BespokeStackSelector />)
    fireEvent.click(screen.getByRole('button', { name: /Legal/i }))
    fireEvent.click(screen.getByRole('button', { name: /Private Open-Weight/i }))
    const text = container.textContent ?? ''
    expect(text).toMatch(/Open-Weight/i)
    expect(text).toMatch(/Build In-House/i)
    expect(text).not.toMatch(/gemini|deepseek/i)
    expect(text).not.toContain('\u2014')
    expect(text).not.toContain(' -- ')
  })

  it('resolves valid /blog/* links on WhatIsAgenticArchitectPage', () => {
    const { container } = render(<WhatIsAgenticArchitectPage />)
    const hrefs = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'))
    expect(hrefs).not.toContain('/blog/mcp-security-audit')
    expect(hrefs).not.toContain('/blog/agent-oauth')
    expect(hrefs).not.toContain('/blog/eval-harness')
    expect(hrefs).toContain('/blog/mcp-server-audit-2026')
    expect(hrefs).toContain('/blog/the-4-legged-identity')
    expect(hrefs).toContain('/blog/eval-harness-catches-regressions')
  })
})

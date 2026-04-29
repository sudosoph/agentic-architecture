import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PageHeader } from '@/components/ui/page-header'

describe('PageHeader', () => {
  it('renders title', () => {
    render(<PageHeader title="Blog" />)
    expect(screen.getByText('Blog')).toBeTruthy()
  })

  it('renders meta text when provided', () => {
    render(<PageHeader title="Blog" meta="2026-04-29" />)
    expect(screen.getByText('2026-04-29')).toBeTruthy()
  })

  it('does not render meta element when not provided', () => {
    render(<PageHeader title="Blog" />)
    expect(screen.queryByTestId('page-header-meta')).toBeNull()
  })

  it('renders description when provided', () => {
    render(<PageHeader title="Blog" description="Writing about agentic systems." />)
    expect(screen.getByText('Writing about agentic systems.')).toBeTruthy()
  })

  it('does not render description element when not provided', () => {
    render(<PageHeader title="Blog" />)
    expect(screen.queryByTestId('page-header-description')).toBeNull()
  })
})

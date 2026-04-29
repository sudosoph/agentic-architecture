import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HomePage from '@/app/(site)/page'

vi.mock('next/font/google', () => ({
  JetBrains_Mono: () => ({ variable: '--font-mono', className: 'mock-mono' }),
}))

describe('HomePage smoke test', () => {
  it('renders without crashing', () => {
    render(<HomePage />)
    expect(screen.getByRole('main')).toBeTruthy()
  })

  it('contains the brand name', () => {
    render(<HomePage />)
    expect(screen.getByText(/Agentic Architecture/i)).toBeTruthy()
  })
})

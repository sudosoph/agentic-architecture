import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders tag variant with text', () => {
    render(<Badge variant="tag">agent</Badge>)
    expect(screen.getByText('agent')).toBeTruthy()
  })

  it('tag variant applies font-mono class', () => {
    render(<Badge variant="tag" data-testid="b">agent</Badge>)
    expect(screen.getByTestId('b').className).toContain('font-mono')
  })

  it('renders status variant with text', () => {
    render(<Badge variant="status" color="green">online</Badge>)
    expect(screen.getByText('online')).toBeTruthy()
  })

  it('status variant with amber color applies text-amber class', () => {
    render(<Badge variant="status" color="amber" data-testid="b">warn</Badge>)
    expect(screen.getByTestId('b').className).toContain('text-amber')
  })

  it('status variant with green color applies text-green class', () => {
    render(<Badge variant="status" color="green" data-testid="b">ok</Badge>)
    expect(screen.getByTestId('b').className).toContain('text-green')
  })

  it('status variant with red color applies text-red class', () => {
    render(<Badge variant="status" color="red" data-testid="b">down</Badge>)
    expect(screen.getByTestId('b').className).toContain('text-red')
  })
})

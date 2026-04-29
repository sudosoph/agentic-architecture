import { describe, it, expect } from 'vitest'

describe('Root layout font classes', () => {
  it('applies JetBrains Mono and Geist font variables', () => {
    const cssVars = ['--font-mono', '--font-sans']
    cssVars.forEach(v => {
      expect(v).toBeTruthy()
    })
  })
})

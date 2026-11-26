import { describe, it, expect } from 'vitest'
import { runBrandQualityGate } from '../scripts/brand-quality-gate.mjs'

describe('Automated Brand, Privacy, Design & SEO/GEO Quality Gatekeeper', () => {
  it('enforces zero CV/employer/handle/salary/rate-card leaks, coherent nav, staggered dates, SVG diagrams, and >=3 internal links per essay', () => {
    const result = runBrandQualityGate()
    expect(result.violations, result.violations.join('\n')).toEqual([])
    expect(result.ok).toBe(true)
  })
})

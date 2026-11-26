import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND')
  },
}))

import CourseModulePage, {
  generateMetadata as genModuleMeta,
} from '@/app/(site)/courses/[slug]/page'
import StudentVaultPage, {
  generateMetadata as genVaultMeta,
} from '@/app/(site)/vault/[token]/page'
import { ALL_ACCESS_PASS } from '@/lib/curriculum'

describe('Public /courses/[slug] Reader & Unlisted /vault/[token] Portal', () => {
  it('renders full lesson HTML on unlocked x.1 modules and hides body HTML on paid x.2..x.5 modules', async () => {
    const openJsx = await CourseModulePage({
      params: Promise.resolve({ slug: '1-1-2026-ai-landscape-model-matrix' }),
    })
    const { container: openDom } = render(openJsx)
    expect(openDom.textContent).toContain('Unlocked Free Lesson')
    expect(openDom.querySelector('.prose')).not.toBeNull()

    const lockedJsx = await CourseModulePage({
      params: Promise.resolve({ slug: '1-2-privacy-shadow-ai-security' }),
    })
    const { container: lockedDom } = render(lockedJsx)
    expect(lockedDom.querySelector('.prose')).toBeNull()
    expect(lockedDom.textContent).toContain('Syllabus Preview')
    expect(lockedDom.innerHTML).toContain('https://cal.com/sophia-stein/')
  })

  it('enforces noindex on /vault/[token], renders full curriculum for valid tokens, and 404s on invalid tokens', async () => {
    const meta = await genVaultMeta({
      params: Promise.resolve({ token: ALL_ACCESS_PASS.vaultToken }),
    })
    expect(meta.robots).toEqual({ index: false, follow: false })

    const vaultJsx = await StudentVaultPage({
      params: Promise.resolve({ token: ALL_ACCESS_PASS.vaultToken }),
    })
    const { container } = render(vaultJsx)
    expect(container.querySelectorAll('.prose').length).toBe(20)

    await expect(
      StudentVaultPage({ params: Promise.resolve({ token: 'guessed-slug' }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND')

    const lockedMeta = await genModuleMeta({
      params: Promise.resolve({ slug: '2-3-finance-fpa-deterministic-harnesses' }),
    })
    expect(lockedMeta.robots).toEqual({ index: false, follow: true })
  })
})

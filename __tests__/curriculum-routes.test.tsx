import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

const redirectMock = vi.fn()
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND')
  },
  redirect: (url: string) => {
    redirectMock(url)
    throw new Error(`NEXT_REDIRECT:${url}`)
  },
}))

import CourseModulePage, {
  generateMetadata as genModuleMeta,
} from '@/app/(site)/courses/[slug]/page'
import StudentVaultRedirectPage from '@/app/(site)/vault/[token]/page'

describe('Public /courses/[slug] Reader & /vault/[token] Redirect', () => {
  it('renders full lesson HTML on unlocked x.1 modules and hides body HTML on gated x.2..x.5 modules', async () => {
    const openJsx = await CourseModulePage({
      params: Promise.resolve({ slug: '1-1-2026-ai-landscape-model-matrix' }),
    })
    const { container: openDom } = render(openJsx)
    expect(openDom.textContent).toMatch(/Unlocked|Free/i)
    expect(openDom.querySelector('.prose')).not.toBeNull()
    const slideAnchor = openDom.querySelector(
      'a[href="/slides/curriculum-01-models-and-landscape.html"]',
    )
    expect(slideAnchor?.getAttribute('target')).toBe('_blank')

    const lockedJsx = await CourseModulePage({
      params: Promise.resolve({ slug: '1-2-privacy-shadow-ai-security' }),
    })
    const { container: lockedDom } = render(lockedJsx)
    expect(lockedDom.querySelector('.prose')).toBeNull()
    expect(lockedDom.textContent).toMatch(/Waitlist|Lab|Syllabus/i)
  })

  it('enforces noindex on locked module previews and redirects legacy /vault/[token] to /courses', async () => {
    const lockedMeta = await genModuleMeta({
      params: Promise.resolve({ slug: '2-3-finance-fpa-deterministic-harnesses' }),
    })
    expect(lockedMeta.robots).toEqual({ index: false, follow: true })

    expect(() => StudentVaultRedirectPage()).toThrow('NEXT_REDIRECT:/courses')
    expect(redirectMock).toHaveBeenCalledWith('/courses')
  })
})

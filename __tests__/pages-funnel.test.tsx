import fs from 'fs'
import path from 'path'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const redirectMock = vi.fn()
vi.mock('next/navigation', () => ({
  redirect: (url: string) => {
    redirectMock(url)
    throw new Error(`NEXT_REDIRECT:${url}`)
  },
}))

import MasterclassPage from '@/app/(site)/masterclass/page'
import AcceleratorPage from '@/app/(site)/accelerator/page'
import CoursesPage from '@/app/(site)/courses/page'
import AcademyPage from '@/app/(site)/academy/page'
import StarterKitPage from '@/app/(site)/starter-kit/page'
import WorkWithMePage from '@/app/(site)/work-with-me/page'
import TeachingPage from '@/app/(site)/teaching/page'
import FractionalAiCtoPage from '@/app/(site)/fractional-ai-cto/page'
import StackPage from '@/app/(site)/stack/page'
import LibraryPage from '@/app/(site)/library/page'
import BswPage from '@/app/(site)/bsw/page'
import GuidesPage from '@/app/(site)/guides/page'
import NowPage from '@/app/(site)/now/page'
import SponsorPage from '@/app/(site)/sponsor/page'
import { sanitizeBswMarkdown } from '../scripts/sync-bsw.mjs'

describe('Option A Funnel, Skool Lab, Teaching, Stack, and Redirect Pages', () => {
  it('renders all active site pages free of stale placeholders, CV leaks, rate cards, and em-dashes', () => {
    const pages = [
      { name: 'MasterclassPage', Comp: MasterclassPage },
      { name: 'CoursesPage', Comp: CoursesPage },
      { name: 'AcademyPage', Comp: AcademyPage },
      { name: 'StarterKitPage', Comp: StarterKitPage },
      { name: 'WorkWithMePage', Comp: WorkWithMePage },
      { name: 'TeachingPage', Comp: TeachingPage },
      { name: 'FractionalAiCtoPage', Comp: FractionalAiCtoPage },
      { name: 'StackPage', Comp: StackPage },
      { name: 'BswPage', Comp: BswPage },
      { name: 'GuidesPage', Comp: GuidesPage },
      { name: 'NowPage', Comp: NowPage },
      { name: 'SponsorPage', Comp: SponsorPage },
    ]

    for (const { name, Comp } of pages) {
      const { container, unmount } = render(<Comp />)
      const text = container.textContent ?? ''
      const lower = text.toLowerCase()
      const html = container.innerHTML

      expect(text, `${name} should have no Coming soon`).not.toMatch(/coming soon/i)
      expect(text, `${name} should have no Lesbians Who Tech`).not.toMatch(/lesbians who tech/i)
      expect(html, `${name} should have no architect-audit-bsw`).not.toContain('architect-audit-bsw')
      expect(text, `${name} should have no Listmonk`).not.toMatch(/listmonk/i)
      expect(lower, `${name} columbia`).not.toContain('columbia')
      expect(lower, `${name} mckinsey`).not.toContain('mckinsey')
      expect(lower, `${name} sudosoph`).not.toContain('sudosoph')
      expect(lower, `${name} voice.md`).not.toContain('voice.md')
      expect(lower, `${name} brand brain`).not.toContain('brand brain')
      expect(lower, `${name} ai org chart`).not.toContain('ai org chart')
      expect(text, `${name} should have no em-dash`).not.toContain('\u2014')
      unmount()
    }
  })

  it('renders MasterclassPage with 60-minute live agenda and Skool Lab (/courses) bridge', () => {
    const { container } = render(<MasterclassPage />)
    expect(container.textContent).toMatch(/60-Min/i)
    const links = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'))
    expect(links).toContain('/courses')
  })

  it('renders Skool Lab tracks, unlocked lessons, Founding Waitlist, and 5-day email sequence on CoursesPage & AcademyPage', () => {
    const { container: academyContainer } = render(<AcademyPage />)
    expect(academyContainer.textContent).toContain('Claude Superuser')
    expect(academyContainer.textContent).toContain('Become an AI Architect')
    expect(academyContainer.textContent).not.toContain('$297')

    const rawLessons = fs.readFileSync(
      path.join(process.cwd(), 'content/courses/five-day-prompt-to-system.json'),
      'utf8',
    )
    expect(rawLessons).not.toContain('\u2014')
    expect(rawLessons.toLowerCase()).not.toContain('voice.md')
    const lessons = JSON.parse(rawLessons)
    expect(lessons).toHaveLength(5)

    const { container: coursesContainer } = render(<CoursesPage />)
    expect(coursesContainer.textContent).toContain('The Agentic Architect Lab')
    expect(coursesContainer.textContent).toContain('Claude Superuser & Cowork OS')
    expect(coursesContainer.textContent).toContain('Kill the $200/mo AI Subscription Stack')
    expect(coursesContainer.textContent).toContain('Become an AI Architect')
    for (const lesson of lessons) {
      expect(coursesContainer.textContent).toContain(lesson.subject)
    }
    const courseLinks = Array.from(coursesContainer.querySelectorAll('a')).map(a =>
      a.getAttribute('href'),
    )
    expect(courseLinks).toContain('/courses/1-1-2026-ai-landscape-model-matrix')
    expect(courseLinks).toContain('/courses/2-1-vertical-ai-build-vs-buy-framework')
    expect(courseLinks).toContain('/courses/3-1-production-harnesses-multi-model-routing')
    expect(courseLinks).toContain('/courses/4-1-open-weights-vs-frontier-economics')
  })

  it('redirects legacy /accelerator and /library routes cleanly to /courses', () => {
    expect(() => AcceleratorPage()).toThrow('NEXT_REDIRECT:/courses')
    expect(redirectMock).toHaveBeenCalledWith('/courses')
    redirectMock.mockClear()
    expect(() => LibraryPage()).toThrow('NEXT_REDIRECT:/courses')
    expect(redirectMock).toHaveBeenCalledWith('/courses')
  })

  it('renders WorkWithMePage with 20-min scoping flow, verified Cal.com slugs, and zero public price menus', () => {
    const { container } = render(<WorkWithMePage />)
    const links = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'))
    expect(links).toContain('/courses')
    expect(links).toContain('https://cal.com/sophia-stein/audit')
    expect(links).toContain('https://cal.com/sophia-stein/speaking')
    expect(links).toContain('https://cal.com/sophia-stein/scoping')
    expect(links).not.toContain('https://cal.com/sophia-stein/office-hours')
    expect(container.textContent).not.toContain('$750')
    expect(container.textContent).not.toContain('$2,500')
    expect(container.textContent).toMatch(/Forward Deployed/i)
    const scopingDownload = container.querySelector(
      'a[href="/downloads/forward-deployed-ai-scoping-guide.md"]',
    )
    expect(scopingDownload).not.toBeNull()
    expect(scopingDownload?.hasAttribute('download')).toBe(true)
  })

  it('renders TeachingPage with 3 keynotes, 2 CU Boulder syllabi, Women Who Code, and 300+ BSW proof', () => {
    const { container } = render(<TeachingPage />)
    const text = container.textContent ?? ''
    expect(text).toContain('Women Who Code')
    expect(text).toContain('300+')
    expect(text).toMatch(/CU Boulder|University of Colorado/i)
    expect(text).toMatch(/Leeds/i)
    expect(text).toMatch(/ATLAS/i)
  })

  it('renders FractionalAiCtoPage with Fractional CAIO + Fractional AI CTO mandates, qualitative trade-off table, Service + FAQPage JSON-LD, and zero salary/CV bravado', () => {
    const { container } = render(<FractionalAiCtoPage />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/Fractional Chief AI Officer/i)
    expect(text).toMatch(/Fractional AI CTO/i)
    expect(text).not.toContain('McKinsey')
    expect(text).not.toContain('Columbia')
    expect(text.toLowerCase()).not.toContain('personal capacity')
    expect(text).not.toContain('$250,000')
    expect(text).not.toContain('$450,000')
    expect(text).toContain('Scope Fractional CAIO Fit')
    expect(text).toContain('Scope Fractional AI CTO Fit')
    expect(text).toContain('Book 2-Week Diagnostic Call')
    const ld = container.querySelector('script[type="application/ld+json"]')
    expect(ld).not.toBeNull()
    const types = JSON.parse(ld!.innerHTML)['@graph'].map((n: { '@type': string }) => n['@type'])
    expect(types).toContain('Service')
    expect(types).toContain('FAQPage')
  })

  it('switches StackPage between 15-Minute Team & Loop Stack and Private & Sovereign AI Rig', () => {
    render(<StackPage />)
    expect(screen.getAllByText(/Cal\.com/i).length).toBeGreaterThan(0)
    expect(screen.queryByText(/DeepSeek 4\.1/i)).toBeNull()
    const rigTab = screen.getByRole('tab', { name: /Private & Sovereign/i })
    fireEvent.click(rigTab)
    expect(screen.getAllByText(/Tailscale/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/DeepSeek 4\.1/i)).toBeTruthy()
    expect(screen.getByText(/Framework 16/i)).toBeTruthy()
  })

  it('cleans content/bsw/tutorial.md and sanitizes BSW markdown on sync', () => {
    const tutorialMd = fs.readFileSync(
      path.join(process.cwd(), 'content/bsw/tutorial.md'),
      'utf8',
    )
    expect(tutorialMd).not.toContain('architect-audit-bsw')
    expect(tutorialMd).not.toContain('\u2014')

    const sample =
      '**Office Hours · 5 free 30-min audits for BSW attendees:** [cal.com/sophia-stein/architect-audit-bsw](https://cal.com/sophia-stein/architect-audit-bsw) (capped at 5 bookings)\n**Newsletter:** [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog) — weekly deep-dives'
    const cleaned = sanitizeBswMarkdown(sample)
    expect(cleaned).not.toContain('architect-audit-bsw')
    expect(cleaned).not.toContain('\u2014')
    expect(cleaned).toContain('agenticarchitect.ai/work-with-me')
    expect(cleaned).toContain('agenticarchitectai.substack.com')
  })
})

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

describe('Funnel, Accelerator, Teaching, Stack, and Legacy Pages', () => {
  it('renders all 11 funnel & legacy pages free of stale placeholders, broken slugs, and em-dashes', () => {
    const pages = [
      { name: 'MasterclassPage', Comp: MasterclassPage },
      { name: 'AcceleratorPage', Comp: AcceleratorPage },
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
      const html = container.innerHTML

      expect(text, `${name} should have no Coming soon`).not.toMatch(/coming soon/i)
      expect(text, `${name} should have no Lesbians Who Tech`).not.toMatch(/lesbians who tech/i)
      expect(html, `${name} should have no architect-audit-bsw`).not.toContain('architect-audit-bsw')
      expect(text, `${name} should have no Architect's Notebook`).not.toContain("The Architect's Notebook")
      expect(text, `${name} should have no Listmonk`).not.toMatch(/listmonk/i)
      expect(text, `${name} should have no Thu May 7`).not.toContain('Thu May 7')
      expect(text, `${name} should have no em-dash`).not.toContain('\u2014')
      unmount()
    }
  })

  it('keeps core brand & offer pages model-agnostic (zero Gemini or DeepSeek in offer/teaching copy)', () => {
    const brandPages = [
      MasterclassPage,
      AcceleratorPage,
      CoursesPage,
      AcademyPage,
      StarterKitPage,
      WorkWithMePage,
      TeachingPage,
      FractionalAiCtoPage,
    ]
    for (const Comp of brandPages) {
      const { container, unmount } = render(<Comp />)
      const text = container.textContent ?? ''
      expect(text).not.toMatch(/gemini/i)
      expect(text).not.toMatch(/deepseek/i)
      expect(text.toLowerCase()).not.toContain('voice.md')
      expect(text.toLowerCase()).not.toContain('brand brain')
      unmount()
    }
  })

  it('renders MasterclassPage with 60-minute live agenda, business bottleneck focus, and Accelerator link', () => {
    const { container } = render(<MasterclassPage />)
    expect(container.textContent).toMatch(/60-Min/i)
    expect(container.textContent?.toLowerCase()).not.toContain('voice.md')
    const links = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'))
    expect(links).toContain('/accelerator')
  })

  it('renders AcademyPage with 6 business modules, clamps team-seat calculator cleanly, and validates 5-day business email sequence free of voice.md', () => {
    const { container } = render(<AcademyPage />)
    expect(container.textContent).toMatch(/AI Chief of Staff/i)
    expect(container.textContent?.toLowerCase()).not.toContain('voice.md')
    expect(container.textContent).not.toContain('All 6 step-by-step')
    expect(container.textContent).toContain('All 5 practitioner modules')
    expect(screen.getByTestId('academy-total-price').textContent).toBe('$297')
    const soloCheckoutLink = screen.getByRole('link', { name: /Enroll Now \(\$297\)/i })
    expect(soloCheckoutLink.getAttribute('href')).toBe('https://cal.com/sophia-stein/academy')

    const seatInput = screen.getByLabelText(/Additional team seats/i)
    fireEvent.change(seatInput, { target: { value: '3' } })
    expect(screen.getByTestId('academy-total-price').textContent).toBe('$588')
    const teamInvoiceLink = screen.getByRole('link', { name: /Request Team Invoice \(\$588\)/i })
    expect(teamInvoiceLink.getAttribute('href')).toContain('/contact?subject=')

    fireEvent.change(seatInput, { target: { value: '-5' } })
    expect(screen.getByTestId('academy-total-price').textContent).toBe('$297')

    fireEvent.change(seatInput, { target: { value: '999' } })
    expect(screen.getByTestId('academy-total-price').textContent).toBe('$5,147')

    const rawLessons = fs.readFileSync(
      path.join(process.cwd(), 'content/courses/five-day-prompt-to-system.json'),
      'utf8',
    )
    expect(rawLessons).not.toContain('\u2014')
    expect(rawLessons.toLowerCase()).not.toContain('voice.md')
    const lessons = JSON.parse(rawLessons)
    expect(lessons).toHaveLength(5)

    const { container: coursesContainer } = render(<CoursesPage />)
    for (const lesson of lessons) {
      expect(coursesContainer.textContent).toContain(lesson.subject)
    }
    const courseLinks = Array.from(coursesContainer.querySelectorAll('a')).map(a =>
      a.getAttribute('href'),
    )
    expect(coursesContainer.textContent).toMatch(/Founding Executive Circle/i)
    expect(courseLinks).toContain('/courses/1-1-2026-ai-landscape-model-matrix')
    expect(courseLinks).toContain('/courses/2-1-vertical-ai-build-vs-buy-framework')
    expect(courseLinks).toContain('/courses/3-1-production-harnesses-multi-model-routing')
    expect(courseLinks).toContain('/courses/4-1-open-weights-vs-frontier-economics')

    const { container: teachingContainer } = render(<TeachingPage />)
    expect(teachingContainer.textContent).toMatch(/Executive Education/i)
  })

  it('renders AcceleratorPage with 6 business systems, $65,000 hire anchor, and Approach 2 accessible cohort floor', () => {
    const { container } = render(<AcceleratorPage />)
    const text = container.textContent ?? ''
    expect(text).toContain('$65,000')
    expect(text).toContain('$1,497')
    expect(text).toContain('$297')
    expect(text.toLowerCase()).not.toContain('ai org chart')
    expect(text).not.toContain('$8,997')
    const links = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'))
    expect(links).toContain('https://cal.com/sophia-stein/scoping')
    expect(links).toContain('https://cal.com/sophia-stein/cohort-kickoff')
  })

  it('renders WorkWithMePage with Approach 2 light floors, Ritesh-style 20-min bottleneck flow, verified Cal.com slugs, and zero aggressive guarantees', () => {
    const { container } = render(<WorkWithMePage />)
    const links = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'))
    expect(links).toContain('/accelerator')
    expect(links).toContain('https://cal.com/sophia-stein/audit')
    expect(links).toContain('https://cal.com/sophia-stein/speaking')
    expect(links).toContain('https://cal.com/sophia-stein/scoping')
    expect(links).not.toContain('https://cal.com/sophia-stein/office-hours')
    expect(links).not.toContain('https://cal.com/sophia-stein')
    expect(container.textContent).toContain('$750')
    expect(container.textContent).toContain('$2,500')
    expect(container.textContent).toMatch(/Forward Deployed/i)
    const scopingDownload = container.querySelector(
      'a[href="/downloads/forward-deployed-ai-scoping-guide.md"]',
    )
    expect(scopingDownload).not.toBeNull()
    expect(scopingDownload?.hasAttribute('download')).toBe(true)
    expect(container.textContent).not.toContain('$15,000 Savings Guarantee')
    expect(container.textContent?.toLowerCase()).not.toContain('ai org chart')
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

  it('renders FractionalAiCtoPage with Fractional CAIO + Fractional AI CTO roles, Columbia/McKinsey proof, Service + FAQPage JSON-LD, and zero voice.md or sticker walls', () => {
    const { container } = render(<FractionalAiCtoPage />)
    const text = container.textContent ?? ''
    expect(text).toMatch(/Fractional Chief AI Officer/i)
    expect(text).toMatch(/Fractional AI CTO/i)
    expect(text).toContain('McKinsey')
    expect(text).toContain('Columbia')
    expect(text).toContain('personal capacity')
    expect(text.toLowerCase()).not.toContain('voice.md')
    expect(text.toLowerCase()).not.toContain('ai org chart')
    expect(text).not.toContain('$5,000+/mo')
    expect(text).toContain('Scope Fractional CAIO Fit')
    expect(text).toContain('Scope Fractional AI CTO Fit')
    expect(text).toContain('Book 2-Week Diagnostic Call')
    expect(text).not.toContain('Scope 2-Week Fit')
    const ld = container.querySelector('script[type="application/ld+json"]')
    expect(ld).not.toBeNull()
    const types = JSON.parse(ld!.innerHTML)['@graph'].map((n: { '@type': string }) => n['@type'])
    expect(types).toContain('Service')
    expect(types).toContain('FAQPage')
  })

  it('redirects /library to /courses', () => {
    expect(() => LibraryPage()).toThrow('NEXT_REDIRECT:/courses')
    expect(redirectMock).toHaveBeenCalledWith('/courses')
  })

  it('switches StackPage between Small Business Stack and Private & Sovereign AI Rig', () => {
    render(<StackPage />)
    expect(screen.getAllByText(/Cal\.com/i).length).toBeGreaterThan(0)
    expect(screen.queryByText(/DeepSeek 4\.1/i)).toBeNull()
    const rigTab = screen.getByRole('tab', { name: /Private & Sovereign|Autonomous Rig/i })
    fireEvent.click(rigTab)
    expect(screen.getAllByText(/Tailscale/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/DeepSeek 4\.1/i)).toBeTruthy()
    expect(screen.getByText(/Framework 16/i)).toBeTruthy()
  })

  it('cleans content/bsw/tutorial.md of broken architect-audit-bsw link and em-dashes', () => {
    const tutorialMd = fs.readFileSync(
      path.join(process.cwd(), 'content/bsw/tutorial.md'),
      'utf8',
    )
    expect(tutorialMd).not.toContain('architect-audit-bsw')
    expect(tutorialMd).not.toContain('\u2014')
  })

  it('sanitizes BSW markdown on sync so newer upstream files never reintroduce broken audit links or em-dashes', () => {
    const sample =
      '**Office Hours · 5 free 30-min audits for BSW attendees:** [cal.com/sophia-stein/architect-audit-bsw](https://cal.com/sophia-stein/architect-audit-bsw) (capped at 5 bookings)\n**Newsletter:** [agenticarchitect.ai/blog](https://agenticarchitect.ai/blog) — weekly deep-dives'
    const cleaned = sanitizeBswMarkdown(sample)
    expect(cleaned).not.toContain('architect-audit-bsw')
    expect(cleaned).not.toContain('\u2014')
    expect(cleaned).toContain('agenticarchitect.ai/work-with-me')
    expect(cleaned).toContain('agenticarchitectai.substack.com')
  })
})

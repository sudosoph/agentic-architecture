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
import StarterKitPage from '@/app/(site)/starter-kit/page'
import WorkWithMePage from '@/app/(site)/work-with-me/page'
import TeachingPage from '@/app/(site)/teaching/page'
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
      { name: 'StarterKitPage', Comp: StarterKitPage },
      { name: 'WorkWithMePage', Comp: WorkWithMePage },
      { name: 'TeachingPage', Comp: TeachingPage },
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
      StarterKitPage,
      WorkWithMePage,
      TeachingPage,
    ]
    for (const Comp of brandPages) {
      const { container, unmount } = render(<Comp />)
      const text = container.textContent ?? ''
      expect(text).not.toMatch(/gemini/i)
      expect(text).not.toMatch(/deepseek/i)
      unmount()
    }
  })

  it('renders MasterclassPage with 60-minute live agenda, voice.md workbook step, and Accelerator link', () => {
    const { container } = render(<MasterclassPage />)
    expect(container.textContent).toMatch(/60-Min/i)
    expect(container.textContent).toMatch(/voice\.md/i)
    const links = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'))
    expect(links).toContain('/accelerator')
  })

  it('renders AcceleratorPage with 6 business systems, $65,000 hire anchor, and cohort pricing', () => {
    const { container } = render(<AcceleratorPage />)
    const text = container.textContent ?? ''
    expect(text).toContain('$65,000')
    expect(text).toContain('$5,997')
    expect(text).toContain('$8,997')
    expect(text).toContain('$1,500')
    const links = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'))
    expect(links).toContain('https://cal.com/sophia-stein/scoping')
  })

  it('renders WorkWithMePage with ROI calculator, verified Cal.com slugs, and no bare cal.com root link', () => {
    const { container } = render(<WorkWithMePage />)
    const links = Array.from(container.querySelectorAll('a')).map(a => a.getAttribute('href'))
    expect(links).toContain('/accelerator')
    expect(links).toContain('https://cal.com/sophia-stein/audit')
    expect(links).toContain('https://cal.com/sophia-stein/office-hours')
    expect(links).toContain('https://cal.com/sophia-stein/speaking')
    expect(links).toContain('https://cal.com/sophia-stein/scoping')
    expect(links).not.toContain('https://cal.com/sophia-stein')
    expect(container.textContent).toContain('$1,500')
    expect(container.textContent).toContain('$500')
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

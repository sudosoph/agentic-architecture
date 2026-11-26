import fs from 'fs'
import path from 'path'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { convertMdxToSubstackPayload } from '../scripts/mdx-to-substack.mjs'
import { buildOutreachCampaignPack } from '../scripts/outreach-engine.mjs'
import { StarterKitBuilder } from '@/components/site/starter-kit-builder'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import BoulderPage from '@/app/(site)/boulder/page'
import OpenGraphImage from '@/app/opengraph-image'
import BlogPostOpenGraphImage from '@/app/(site)/blog/[slug]/opengraph-image'

describe('MDX-to-Substack converter, Downloadable Products, and Interactive Lead Tools', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('converts MDX blog posts into valid Substack ProseMirror JSON with absolute links and funnel footer free of voice.md', () => {
    const payload = convertMdxToSubstackPayload('ai-back-office')
    expect(payload.draft_title.length).toBeGreaterThan(15)
    expect(payload.draft_subtitle.length).toBeGreaterThan(20)
    expect(payload.draft_body).not.toContain('\u2014')
    expect(payload.draft_body.toLowerCase()).not.toContain('voice.md')
    expect(payload.draft_body).not.toContain('8-Week Accelerator')

    const doc = JSON.parse(payload.draft_body)
    expect(doc.type).toBe('doc')
    expect(Array.isArray(doc.content)).toBe(true)
    expect(doc.content.length).toBeGreaterThan(8)
    expect(payload.draft_body).toContain('https://agenticarchitect.ai/starter-kit')
  })

  it('ships clean business Starter Kit & Corporate Workshop download files free of voice.md, icp.md, Brand Brain, price tags, and em-dashes', () => {
    const cleanBusinessFiles = [
      'public/downloads/company-operating-rules-template.md',
      'public/downloads/buyer-qualification-criteria.md',
      'public/downloads/20-80-ai-task-audit-scorecard.csv',
      'public/downloads/pre-call-lead-dossier-n8n.json',
      'public/downloads/corporate-ai-workshop-sheet.md',
    ]

    for (const rel of cleanBusinessFiles) {
      const full = path.join(process.cwd(), rel)
      expect(fs.existsSync(full), `${rel} should exist`).toBe(true)
      const content = fs.readFileSync(full, 'utf8')
      expect(content.length).toBeGreaterThan(100)
      expect(content, `${rel} em-dash`).not.toContain('\u2014')
      expect(content.toLowerCase(), `${rel} voice.md`).not.toContain('voice.md')
      expect(content.toLowerCase(), `${rel} icp.md`).not.toContain('icp.md')
      expect(content.toLowerCase(), `${rel} brand brain`).not.toContain('brand brain')
      if (rel.endsWith('.json')) {
        const parsed = JSON.parse(content)
        expect(Array.isArray(parsed.nodes)).toBe(true)
      }
    }
  })

  it('renders StarterKitBuilder with 4 clean business download cards and updates 20/80 readiness score interactively', () => {
    const { container } = render(<StarterKitBuilder />)
    expect(screen.getByTestId('readiness-score').textContent).toContain('21')
    expect(container.textContent).toContain('Ship Now')

    const safetySlider = screen.getByLabelText(/3\. Safety/i)
    const volumeSlider = screen.getByLabelText(/1\. Weekly Volume/i)
    fireEvent.change(volumeSlider, { target: { value: '2' } })
    fireEvent.change(safetySlider, { target: { value: '1' } })
    expect(screen.getByTestId('readiness-score').textContent).toContain('13')
    expect(container.textContent).toContain('Decompose Into 2 Steps')

    const downloadLinks = Array.from(container.querySelectorAll('a[download]')).map(a =>
      a.getAttribute('href'),
    )
    expect(downloadLinks).toHaveLength(4)
    expect(downloadLinks).toContain('/downloads/company-operating-rules-template.md')
    expect(downloadLinks).toContain('/downloads/buyer-qualification-criteria.md')
    expect(downloadLinks).not.toContain('/downloads/voice-md-brand-brain-template.md')
    expect(downloadLinks).not.toContain('/downloads/icp-and-offer-positioning.md')
  })

  it('submits single-CTA email signup in NewsletterSignup to /api/subscribe and shows confirmation', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    render(<NewsletterSignup source="test-widget" />)
    const input = screen.getByLabelText(/Email address/i)
    fireEvent.change(input, { target: { value: 'founder@company.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

    await waitFor(() => {
      expect(screen.getByText(/Check your inbox|recorded/i)).toBeTruthy()
    })
    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/subscribe',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('renders BoulderPage regional corporate training hub free of rate cards and em-dashes', () => {
    const { container: bContainer } = render(<BoulderPage />)
    expect(bContainer.textContent).toContain('Boulder & Denver Corporate AI Training')
    expect(bContainer.textContent).toContain('300+ Attendees')
    expect(bContainer.textContent).not.toContain('$7,500')
    expect(bContainer.textContent).not.toContain('$15,000')
    expect(bContainer.textContent).not.toContain('$750')
    expect(bContainer.textContent).not.toContain('\u2014')
  })

  it('generates personalized zero-em-dash outreach sequences across all 5 segments free of CV leaks and builds Logo 1 OG ImageResponses', async () => {
    for (const seg of [
      'warm-founder',
      'corporate-ld',
      'fractional-cto',
      'podcast-partner',
      'university',
    ] as const) {
      const pack = buildOutreachCampaignPack({
        segment: seg,
        prospectName: 'Jordan',
        company: 'Boulder Labs',
        signal: 'expanding operations across Colorado',
      })
      expect(pack.segment).toBe(seg)
      expect(pack.emailTouch1).toContain('Jordan')
      expect(pack.emailTouch1).not.toContain('\u2014')
      expect(pack.emailTouch1.toLowerCase()).not.toContain('columbia')
      expect(pack.emailTouch1.toLowerCase()).not.toContain('mckinsey')
      expect(pack.emailTouch1.toLowerCase()).not.toContain('voice.md')
      expect(pack.emailTouch1.toLowerCase()).not.toContain('brand brain')
      expect(pack.linkedinDm).not.toContain('\u2014')
      expect(pack.followUpDay5).not.toContain('\u2014')
      if (seg === 'fractional-cto') {
        expect(pack.emailTouch1).toContain('/fractional-ai-cto')
      }
    }

    const rootOg = OpenGraphImage()
    expect(rootOg.headers.get('content-type')).toContain('image/png')

    const postOg = await BlogPostOpenGraphImage({
      params: Promise.resolve({ slug: 'easy-ai-brand-and-workflow-setup' }),
    })
    expect(postOg.headers.get('content-type')).toContain('image/png')
  })
})

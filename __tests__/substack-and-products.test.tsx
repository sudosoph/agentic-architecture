import fs from 'fs'
import path from 'path'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { convertMdxToSubstackPayload } from '../scripts/mdx-to-substack.mjs'
import { StarterKitBuilder } from '@/components/site/starter-kit-builder'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

describe('MDX-to-Substack converter, Downloadable Products, and Interactive Lead Tools', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('converts MDX blog posts into valid Substack ProseMirror JSON with absolute links and funnel footer', () => {
    const payload = convertMdxToSubstackPayload('easy-ai-brand-and-workflow-setup')
    expect(payload.draft_title).toContain('How Small Businesses Can Hook Up an AI Brand Brain')
    expect(payload.draft_subtitle.length).toBeGreaterThan(20)
    expect(payload.draft_body).not.toContain('\u2014')

    const doc = JSON.parse(payload.draft_body)
    expect(doc.type).toBe('doc')
    expect(Array.isArray(doc.content)).toBe(true)
    expect(doc.content.length).toBeGreaterThan(10)
    expect(payload.draft_body).toContain('https://agenticarchitect.ai/starter-kit')
    expect(payload.draft_body).toContain('https://cal.com/sophia-stein/masterclass')
  })

  it('ships all 4 downloadable Starter Kit files in public/downloads free of em-dashes', () => {
    const files = [
      'public/downloads/voice-md-brand-brain-template.md',
      'public/downloads/icp-and-offer-positioning.md',
      'public/downloads/20-80-ai-task-audit-scorecard.csv',
      'public/downloads/pre-call-lead-dossier-n8n.json',
    ]

    for (const rel of files) {
      const full = path.join(process.cwd(), rel)
      expect(fs.existsSync(full), `${rel} should exist`).toBe(true)
      const content = fs.readFileSync(full, 'utf8')
      expect(content.length).toBeGreaterThan(100)
      expect(content, `${rel} em-dash`).not.toContain('\u2014')
      if (rel.endsWith('.json')) {
        const parsed = JSON.parse(content)
        expect(Array.isArray(parsed.nodes)).toBe(true)
      }
    }
  })

  it('renders StarterKitBuilder with 4 download cards and updates 20/80 readiness score interactively', () => {
    const { container } = render(<StarterKitBuilder />)
    // Default: (4 * 2) + 4 + 5 + 4 = 21 -> Ship Now
    expect(screen.getByTestId('readiness-score').textContent).toContain('21')
    expect(container.textContent).toContain('Ship Now')

    const safetySlider = screen.getByLabelText(/3\. Safety/i)
    const volumeSlider = screen.getByLabelText(/1\. Weekly Volume/i)
    fireEvent.change(volumeSlider, { target: { value: '2' } })
    fireEvent.change(safetySlider, { target: { value: '1' } })
    // (2 * 2) + 4 + 1 + 4 = 13 -> Decompose Into 2 Steps
    expect(screen.getByTestId('readiness-score').textContent).toContain('13')
    expect(container.textContent).toContain('Decompose Into 2 Steps')

    const downloadLinks = Array.from(container.querySelectorAll('a[download]')).map(a =>
      a.getAttribute('href'),
    )
    expect(downloadLinks).toHaveLength(4)
  })

  it('submits inline email signup in NewsletterSignup to /api/subscribe and shows confirmation', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    render(<NewsletterSignup source="test-widget" />)
    const input = screen.getByLabelText(/Email address for weekly AI playbooks/i)
    fireEvent.change(input, { target: { value: 'founder@company.com' } })
    fireEvent.click(screen.getByRole('button', { name: /Join Free by Email/i }))

    await waitFor(() => {
      expect(screen.getByText(/Check your inbox to confirm/i)).toBeTruthy()
    })
    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/subscribe',
      expect.objectContaining({ method: 'POST' }),
    )
  })
})

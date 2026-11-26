import fs from 'fs'
import path from 'path'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  JetBrains_Mono: () => ({ variable: '--font-jetbrains-mono' }),
  Plus_Jakarta_Sans: () => ({ variable: '--font-plus-jakarta' }),
}))
vi.mock('geist/font/sans', () => ({
  GeistSans: { variable: '--font-geist-sans' },
}))

import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import nextConfig from '@/next.config'
import { metadata as rootMetadata } from '@/app/layout'
import HomePage, { metadata as homeMetadata } from '@/app/(site)/page'
import { metadata as blogMetadata } from '@/app/(site)/blog/page'
import { generateMetadata as generateBlogPostMetadata } from '@/app/(site)/blog/[slug]/page'
import WhatIsAgenticArchitectPage, {
  metadata as pillarMetadata,
} from '@/app/(site)/what-is-an-agentic-architect/page'
import { buildSeoGeoOpportunity } from '../scripts/brand-radar.mjs'
import { draftHumanReply } from '../scripts/comment-copilot.mjs'
import SovereignStackPage from '@/app/(site)/sovereign-stack/page'
import AboutPage from '@/app/(site)/about/page'
import StudioPage from '@/app/(site)/studio/page'
import MasterclassPage from '@/app/(site)/masterclass/page'
import WorkWithMePage from '@/app/(site)/work-with-me/page'
import { GET as getKeystaticApi } from '@/app/api/keystatic/[...params]/route'
import { SOVEREIGN_STACK_PARTS } from '../scripts/compile-book-and-freebies.mjs'
import { getAllPosts } from '@/lib/mdx'

describe('Google Discoverability, Technical SEO & Exact-Match Brand Authority', () => {
  it('allows Next.js static assets in robots.txt and only disallows /api/ and /keystatic/', () => {
    const config = robots()
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules]
    for (const rule of rules) {
      const disallowed = Array.isArray(rule.disallow)
        ? rule.disallow
        : rule.disallow
          ? [rule.disallow]
          : []
      expect(disallowed).not.toContain('/_next/')
      expect(disallowed).toContain('/api/')
    }
    expect(config.sitemap).toBe('https://agenticarchitect.ai/sitemap.xml')
    expect(config.host).toBe('https://agenticarchitect.ai')
  })

  it('permanently redirects www to apex and maps all retired blog & funnel slugs cleanly in next.config.ts', async () => {
    expect(typeof nextConfig.redirects).toBe('function')
    const redirects = await nextConfig.redirects!()
    const wwwRoot = redirects.find(
      r =>
        r.source === '/' &&
        r.has?.some(h => h.type === 'host' && h.value === 'www.agenticarchitect.ai'),
    )
    const wwwSubpath = redirects.find(
      r =>
        r.source === '/:path+' &&
        r.has?.some(h => h.type === 'host' && h.value === 'www.agenticarchitect.ai'),
    )
    expect(wwwRoot?.permanent).toBe(true)
    expect(wwwRoot?.destination).toBe('https://agenticarchitect.ai')
    expect(wwwSubpath?.permanent).toBe(true)
    expect(wwwSubpath?.destination).toBe('https://agenticarchitect.ai/:path+')

    for (const [oldSlug, newDest] of [
      ['ai-org-chart-for-small-business-founders', '/blog/ai-back-office'],
      ['ai-org-chart', '/blog/ai-back-office'],
      ['how-to-build-an-ai-chief-of-staff-2026', '/blog/ai-chief-of-staff'],
      ['ai-implementation-program-vs-agency-vs-diy-guide', '/blog/hire-ai-agency-vs-in-house'],
      ['512gb-unified-memory-mini-pcs-local-llm-2026', '/blog/mac-studio-512gb-vs-dgx-spark'],
      ['loop-engineering-production-guide-2026', '/blog/loop-engineering'],
      ['google-latest-models-vs-deepseek-4-1-business-guide', '/blog/gemini-4-neon-vs-deepseek-v4'],
      ['productive-friction-interview-ai', '/blog/easy-ai-brand-and-workflow-setup'],
      ['personal-ai-agent-weekend', '/blog/instinct-ai-vs-tab-review'],
      ['boulders-ai-frontier', '/blog/ai-chief-of-staff'],
      ['self-hosting-ai-stack-hetzner', '/blog/autonomous-ai-rig-tailscale-guide'],
    ]) {
      const rule = redirects.find(r => r.source === `/blog/${oldSlug}`)
      expect(rule?.permanent, `${oldSlug} 308 redirect`).toBe(true)
      expect(rule?.destination).toBe(newDest)
    }
  })

  it('includes Google Search Console verification tag, HTML verification file, and IndexNow key', () => {
    expect(rootMetadata.verification?.google).toBe(
      'sxLhGeSJ39fP2CLT8JatFpqv9mKIZHfODoeGb24ocK8',
    )
    expect(rootMetadata.applicationName).toBe('Agentic Architect')

    const gscHtmlPath = path.join(process.cwd(), 'public/google845ad7e32bbc62e5.html')
    expect(fs.existsSync(gscHtmlPath)).toBe(true)
    expect(fs.readFileSync(gscHtmlPath, 'utf8')).toContain(
      'google-site-verification: google845ad7e32bbc62e5.html',
    )

    const indexNowPath = path.join(
      process.cwd(),
      'public/aa8f4d2e9c1b7e6a5d3f0c8b4e2a1d9f.txt',
    )
    expect(fs.existsSync(indexNowPath)).toBe(true)
    expect(fs.readFileSync(indexNowPath, 'utf8').trim()).toBe(
      'aa8f4d2e9c1b7e6a5d3f0c8b4e2a1d9f',
    )
  })

  it('declares canonical URLs across homepage, blog hub, blog posts, and pillar page', async () => {
    expect(homeMetadata.alternates?.canonical).toBe('https://agenticarchitect.ai')
    expect(blogMetadata.alternates?.canonical).toBe('/blog')
    expect(pillarMetadata.alternates?.canonical).toBe(
      'https://agenticarchitect.ai/what-is-an-agentic-architect',
    )

    const postMeta = await generateBlogPostMetadata({
      params: Promise.resolve({ slug: 'easy-ai-brand-and-workflow-setup' }),
    })
    expect(postMeta.alternates?.canonical).toBe('/blog/easy-ai-brand-and-workflow-setup')
  })

  it('renders Homepage with linked @graph JSON-LD and zero sudosoph handles', () => {
    const { container } = render(<HomePage />)
    expect(container.textContent).not.toContain('\u2014')

    const ldScript = container.querySelector('script[type="application/ld+json"]')
    expect(ldScript).not.toBeNull()
    const parsed = JSON.parse(ldScript!.innerHTML)
    expect(Array.isArray(parsed['@graph'])).toBe(true)

    const types = parsed['@graph'].map((node: { '@type': string }) => node['@type'])
    expect(types).toContain('WebSite')
    expect(types).toContain('ProfessionalService')
    expect(types).toContain('Person')

    const org = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'ProfessionalService',
    )
    expect(org.sameAs).toContain('https://agenticarchitectai.substack.com')
    expect(org.sameAs).toContain('https://www.linkedin.com/in/sophiastein')
    expect(JSON.stringify(parsed)).not.toContain('sudosoph')
  })

  it('renders /what-is-an-agentic-architect pillar page with 4-layer stack, comparison table, schema, and sitemap entry', () => {
    const { container } = render(<WhatIsAgenticArchitectPage />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /What Is an Agentic Architect/i,
      }),
    ).toBeTruthy()
    expect(container.textContent).toContain('4-Layer')
    expect(container.textContent?.toLowerCase()).not.toContain('voice.md')
    expect(container.textContent).not.toContain('\u2014')

    const ldScript = container.querySelector('script[type="application/ld+json"]')
    expect(ldScript).not.toBeNull()
    const parsed = JSON.parse(ldScript!.innerHTML)
    expect(Array.isArray(parsed['@graph'])).toBe(true)

    const urls = new Set(sitemap().map(e => e.url))
    expect(urls.has('https://agenticarchitect.ai/what-is-an-agentic-architect')).toBe(true)
  })

  it('builds anti-cannibalization SEO/GEO briefs and human-in-the-loop comment replies free of em-dashes', () => {
    const opp = buildSeoGeoOpportunity({
      title: 'MCP Browser Connectors vs API Workflows',
      points: 150,
    })
    expect(opp.seoBlogTitle).not.toBe(opp.substackStoryTitle)
    expect(opp.mediumDevtoFrontmatter).toContain(`canonical_url: "${opp.canonicalUrl}"`)
    expect(opp.seoBlogTitle).not.toContain('\u2014')
    expect(opp.substackStoryTitle).not.toContain('\u2014')
    expect(opp.linkedinHook).not.toContain('\u2014')

    const reply = draftHumanReply({
      commenterName: 'Joshua Miller',
      commentBody: 'People stop reading what they approve when volume is high.',
    })
    expect(reply).toContain('Joshua')
    expect(reply).not.toContain('\u2014')
  })

  it('compiles all 12 Sovereign Stack chapters and 3 OSS/hardware freebies cleanly and renders interactive 512GB sizer', () => {
    const validSlugs = new Set(getAllPosts().map(p => p.slug))
    const allChapters = SOVEREIGN_STACK_PARTS.flatMap(p => p.chapters)
    expect(allChapters).toHaveLength(12)
    for (const ch of allChapters) {
      expect(validSlugs.has(ch.slug), `missing chapter post ${ch.slug}`).toBe(true)
    }

    const { container } = render(<SovereignStackPage />)
    expect(container.textContent).not.toContain('\u2014')
    expect(screen.getByTestId('oss-annual-savings').textContent).toBe('$1,392/yr')

    fireEvent.click(screen.getByRole('tab', { name: /512GB Unified Memory/i }))
    expect(screen.getByTestId('oss-annual-savings').textContent).toBe('$25,200/yr')

    for (const rel of [
      'content/book/the-sovereign-stack-manuscript.md',
      'public/downloads/cut-your-ai-bill-84-percent-manual.md',
      'public/downloads/private-hardware-and-tailscale-rig-guide.md',
      'public/downloads/trusted-mcp-and-eval-checklist.md',
    ]) {
      const full = path.join(process.cwd(), rel)
      expect(fs.existsSync(full), `${rel} should exist`).toBe(true)
      const text = fs.readFileSync(full, 'utf8')
      expect(text.length).toBeGreaterThan(400)
      expect(text, `${rel} em-dash`).not.toContain('\u2014')
    }
  })

  it('renders 3-surface positioning on AboutPage, Course/Service/FAQ JSON-LD across funnel pages, and restricted Owner Studio', async () => {
    const { container: aboutContainer } = render(<AboutPage />)
    expect(aboutContainer.textContent).toContain('Three surfaces, one coherent point of view')
    expect(aboutContainer.textContent).toContain('Two tracks, one quality bar')
    expect(aboutContainer.textContent?.toLowerCase()).not.toContain('ai org chart')
    expect(aboutContainer.textContent).not.toContain('\u2014')

    for (const [label, Comp, expectedType] of [
      ['MasterclassPage', MasterclassPage, 'Course'],
      ['WorkWithMePage', WorkWithMePage, 'Service'],
    ] as const) {
      const { container: fContainer, unmount } = render(<Comp />)
      const ld = fContainer.querySelector('script[type="application/ld+json"]')
      expect(ld, `${label} missing JSON-LD`).not.toBeNull()
      const parsed = JSON.parse(ld!.innerHTML)
      const types = parsed['@graph'].map((n: { '@type': string }) => n['@type'])
      expect(types).toContain(expectedType)
      expect(types).toContain('FAQPage')
      expect(fContainer.textContent).not.toContain('\u2014')
      unmount()
    }

    const { container: studioContainer } = render(<StudioPage />)
    expect(studioContainer.textContent).toContain('Agentic Architect Owner Studio')
    expect(studioContainer.textContent?.toLowerCase()).not.toContain('voice.md')
    expect(studioContainer.textContent).not.toContain('\u2014')

    const ksRes = await getKeystaticApi(
      new Request('https://agenticarchitect.ai/api/keystatic/github/login'),
    )
    expect(ksRes.status).toBe(503)
    const ksHtml = await ksRes.text()
    expect(ksHtml).toContain('/studio')
    expect(ksHtml).toContain('KEYSTATIC_GITHUB_CLIENT_ID')
  })
})

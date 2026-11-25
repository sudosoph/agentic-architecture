import fs from 'fs'
import path from 'path'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/font/google', () => ({
  JetBrains_Mono: () => ({ variable: '--font-mono' }),
}))
vi.mock('geist/font/sans', () => ({
  GeistSans: { variable: '--font-sans' },
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

  it('permanently redirects www.agenticarchitect.ai to apex https://agenticarchitect.ai in next.config.ts', async () => {
    expect(typeof nextConfig.redirects).toBe('function')
    const redirects = await nextConfig.redirects!()
    const wwwRedirect = redirects.find(r =>
      r.has?.some(h => h.type === 'host' && h.value === 'www.agenticarchitect.ai'),
    )
    expect(wwwRedirect).toBeDefined()
    expect(wwwRedirect?.permanent).toBe(true)
    expect(wwwRedirect?.destination).toBe('https://agenticarchitect.ai/:path*')
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

  it('renders Homepage with visible exact-match Agentic Architect identity and linked @graph JSON-LD', () => {
    const { container } = render(<HomePage />)
    expect(screen.getByTestId('hero-section').textContent).toContain('Agentic Architect')
    expect(container.textContent).not.toContain('\u2014')

    const ldScript = container.querySelector('script[type="application/ld+json"]')
    expect(ldScript).not.toBeNull()
    const parsed = JSON.parse(ldScript!.innerHTML)
    expect(Array.isArray(parsed['@graph'])).toBe(true)

    const types = parsed['@graph'].map((node: { '@type': string }) => node['@type'])
    expect(types).toContain('WebSite')
    expect(types).toContain('ProfessionalService')
    expect(types).toContain('Person')

    const website = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'WebSite',
    )
    expect(website.name).toBe('Agentic Architect')
    expect(website.url).toBe('https://agenticarchitect.ai/')

    const org = parsed['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'ProfessionalService',
    )
    expect(org.sameAs).toContain('https://agenticarchitectai.substack.com')
    expect(org.sameAs).toContain('https://github.com/sudosoph')
    expect(org.sameAs).toContain('https://www.linkedin.com/in/sophiastein')
    expect(org.sameAs).toContain('https://x.com/sudosoph')
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
    expect(container.textContent).toContain('voice.md')
    expect(container.textContent).not.toContain('\u2014')
    expect(container.textContent).not.toMatch(/DeepSeek|Gemini/i)

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
})

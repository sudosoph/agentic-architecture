import fs from 'fs'
import path from 'path'
import { describe, it, expect } from 'vitest'
import { getAllPosts, getPost } from '@/lib/mdx'
import { getGuide } from '@/lib/guides'
import sitemap from '@/app/sitemap'
import { GET as getRss } from '@/app/rss.xml/route'
import { collectCanonicalUrls } from '../scripts/ping-search-engines.mjs'

const KNOWN_STATIC_PATHS = new Set([
  '/',
  '/what-is-an-agentic-architect',
  '/sovereign-stack',
  '/about',
  '/boulder',
  '/blog',
  '/courses',
  '/courses/1-1-2026-ai-landscape-model-matrix',
  '/courses/2-1-vertical-ai-build-vs-buy-framework',
  '/courses/3-1-production-harnesses-multi-model-routing',
  '/courses/4-1-open-weights-vs-frontier-economics',
  '/academy',
  '/masterclass',
  '/accelerator',
  '/starter-kit',
  '/teaching',
  '/fractional-ai-cto',
  '/research',
  '/stack',
  '/work-with-me',
  '/contact',
  '/bsw',
  '/bsw/tutorial',
  '/bsw/setup',
  '/bsw/templates',
  '/bsw/handouts',
  '/guides',
  '/guides/booking-agent',
  '/now',
  '/sponsor',
  '/rss.xml',
])

describe('November 2026 Flagship Posts & SEO / GEO Assets', () => {
  it('includes the latest November 2026 buyer, Productive Friction, Bespoke API, and FDE flagship posts at the top of the 50-post archive', () => {
    const posts = getAllPosts()
    expect(posts).toHaveLength(50)
    const topSevenSlugs = new Set(posts.slice(0, 7).map(p => p.slug))
    for (const slug of [
      'productive-friction-interview-ai',
      'vertical-ai-vs-bespoke-api-harnesses',
      'forward-deployed-ai-engineering',
      'ai-back-office',
      'ai-chief-of-staff',
      'hire-ai-agency-vs-in-house',
      'loop-engineering',
    ]) {
      expect(topSevenSlugs.has(slug), `missing ${slug} in top 7`).toBe(true)
    }
  })

  it('resolves every internal /... link across all 47 blog posts without broken slugs or em-dashes', () => {
    const posts = getAllPosts()
    const validSlugs = new Set(posts.map(p => p.slug))

    for (const meta of posts) {
      const full = getPost(meta.slug)
      expect(full).not.toBeNull()
      expect(full!.html, `${meta.slug} em-dash`).not.toContain('\u2014')

      const hrefMatches = [...full!.html.matchAll(/href="(\/[^"#?]*)/g)]
      for (const [, rawHref] of hrefMatches) {
        const cleanHref = rawHref.endsWith('/') && rawHref !== '/' ? rawHref.slice(0, -1) : rawHref
        if (cleanHref.startsWith('/blog/')) {
          const targetSlug = cleanHref.slice('/blog/'.length)
          expect(
            validSlugs.has(targetSlug),
            `${meta.slug} links to missing post ${cleanHref}`,
          ).toBe(true)
        } else {
          expect(
            KNOWN_STATIC_PATHS.has(cleanHref),
            `${meta.slug} links to unknown route ${cleanHref}`,
          ).toBe(true)
        }
      }
    }
  })

  it('keeps llms.txt, AGENTS.md, and humans.txt clean, accurate, and free of em-dashes or dead routes', () => {
    const llms = fs.readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8')
    const agents = fs.readFileSync(path.join(process.cwd(), 'public/AGENTS.md'), 'utf8')
    const humans = fs.readFileSync(path.join(process.cwd(), 'public/humans.txt'), 'utf8')

    for (const [name, content] of [
      ['llms.txt', llms],
      ['AGENTS.md', agents],
      ['humans.txt', humans],
    ] as const) {
      expect(content, `${name} em-dash`).not.toContain('\u2014')
      expect(content, `${name} dead X handle`).not.toContain('x.com/agenticarchitect')
      expect(content, `${name} dead /benchmarks`).not.toContain('/benchmarks')
      expect(content, `${name} dead /open`).not.toContain('/open')
    }

    expect(llms).toContain('https://x.com/sudosoph')
    expect(llms).toContain('https://agenticarchitectai.substack.com')
    expect(llms).toContain('Women Who Code')
    expect(llms).not.toMatch(/Listmonk/i)
  })

  it('generates sitemap with all funnel, teaching, BSW, and 41 blog post URLs', () => {
    const entries = sitemap()
    const urls = new Set(entries.map(e => e.url))

    for (const route of [
      'https://agenticarchitect.ai',
      'https://agenticarchitect.ai/masterclass',
      'https://agenticarchitect.ai/accelerator',
      'https://agenticarchitect.ai/courses',
      'https://agenticarchitect.ai/academy',
      'https://agenticarchitect.ai/starter-kit',
      'https://agenticarchitect.ai/teaching',
      'https://agenticarchitect.ai/fractional-ai-cto',
      'https://agenticarchitect.ai/work-with-me',
      'https://agenticarchitect.ai/stack',
      'https://agenticarchitect.ai/bsw',
      'https://agenticarchitect.ai/sponsor',
    ]) {
      expect(urls.has(route), `sitemap missing ${route}`).toBe(true)
    }

    expect(urls.has('https://agenticarchitect.ai/library')).toBe(false)
    expect(urls.has('https://agenticarchitect.ai/courses/1-1-2026-ai-landscape-model-matrix')).toBe(true)
    expect(urls.has('https://agenticarchitect.ai/courses/2-1-vertical-ai-build-vs-buy-framework')).toBe(true)
    expect(urls.has('https://agenticarchitect.ai/courses/3-1-production-harnesses-multi-model-routing')).toBe(true)
    expect(urls.has('https://agenticarchitect.ai/courses/4-1-open-weights-vs-frontier-economics')).toBe(true)
    expect(urls.has('https://agenticarchitect.ai/courses/1-2-privacy-shadow-ai-security')).toBe(false)
    expect([...urls].some(u => u.includes('/vault/'))).toBe(false)

    for (const p of getAllPosts()) {
      expect(urls.has(`https://agenticarchitect.ai/blog/${p.slug}`)).toBe(true)
    }

    const indexNowUrls = new Set(collectCanonicalUrls())
    expect(indexNowUrls.has('https://agenticarchitect.ai/academy')).toBe(true)
    expect(indexNowUrls.has('https://agenticarchitect.ai/fractional-ai-cto')).toBe(true)
    expect(indexNowUrls.has('https://agenticarchitect.ai/research')).toBe(true)
  })

  it('serves updated Atom feed at /rss.xml with Agentic Architect branding and 50 entries', async () => {
    const res = await getRss()
    const xml = await res.text()
    expect(xml).toContain('<title>Agentic Architect</title>')
    expect(xml).not.toContain('Local-First AI')
    expect(xml).not.toContain('\u2014')
    expect((xml.match(/<entry>/g) ?? []).length).toBe(50)
  })

  it('keeps all guides free of retired localfirstai Substack branding', () => {
    const guide = getGuide('booking-agent')
    expect(guide).not.toBeNull()
    expect(guide!.html).toContain('agenticarchitectai.substack.com')
    expect(guide!.html).not.toContain('localfirstai')
  })
})

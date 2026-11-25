import fs from 'fs'
import path from 'path'
import { describe, it, expect } from 'vitest'
import { getAllPosts, getPost } from '@/lib/mdx'
import { getGuide } from '@/lib/guides'
import sitemap from '@/app/sitemap'
import { GET as getRss } from '@/app/rss.xml/route'

const KNOWN_STATIC_PATHS = new Set([
  '/',
  '/what-is-an-agentic-architect',
  '/about',
  '/boulder',
  '/blog',
  '/courses',
  '/masterclass',
  '/accelerator',
  '/starter-kit',
  '/teaching',
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
  it('includes the 3 new November 2026 anchor posts at the top of the 41-post archive', () => {
    const posts = getAllPosts()
    expect(posts).toHaveLength(41)
    expect(posts[0].slug).toBe('easy-ai-brand-and-workflow-setup')
    expect(posts[0].track).toBe('small-business')
    expect(posts[1].slug).toBe('google-latest-models-vs-deepseek-4-1-business-guide')
    expect(posts[1].track).toBe('models-rigs')
    expect(posts[2].slug).toBe('autonomous-ai-rig-tailscale-guide')
    expect(posts[2].track).toBe('models-rigs')
  })

  it('resolves every internal /... link across all 41 blog posts without broken slugs or em-dashes', () => {
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
      'https://agenticarchitect.ai/starter-kit',
      'https://agenticarchitect.ai/teaching',
      'https://agenticarchitect.ai/work-with-me',
      'https://agenticarchitect.ai/stack',
      'https://agenticarchitect.ai/bsw',
      'https://agenticarchitect.ai/sponsor',
    ]) {
      expect(urls.has(route), `sitemap missing ${route}`).toBe(true)
    }

    expect(urls.has('https://agenticarchitect.ai/library')).toBe(false)

    for (const p of getAllPosts()) {
      expect(urls.has(`https://agenticarchitect.ai/blog/${p.slug}`)).toBe(true)
    }
  })

  it('serves updated Atom feed at /rss.xml with Agentic Architect branding and 41 entries', async () => {
    const res = await getRss()
    const xml = await res.text()
    expect(xml).toContain('<title>Agentic Architect</title>')
    expect(xml).not.toContain('Local-First AI')
    expect(xml).not.toContain('\u2014')
    expect((xml.match(/<entry>/g) ?? []).length).toBe(41)
  })

  it('keeps all guides free of retired localfirstai Substack branding', () => {
    const guide = getGuide('booking-agent')
    expect(guide).not.toBeNull()
    expect(guide!.html).toContain('agenticarchitectai.substack.com')
    expect(guide!.html).not.toContain('localfirstai')
  })
})

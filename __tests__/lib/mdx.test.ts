import { describe, it, expect } from 'vitest'
import { getAllPosts, getPost, getPostsByTrack } from '@/lib/mdx'

const VALID_TRACKS = new Set(['small-business', 'models-rigs', 'engineering'])

describe('Blog manifest, 3-track taxonomy, staggered dates, and 34-essay SVG hygiene', () => {
  it('returns 34 sorted non-draft essays with unique staggered dates, readingMinutes >= 1, and valid 3-track assignment', () => {
    const posts = getAllPosts()
    expect(posts).toHaveLength(34)

    const uniqueDates = new Set(posts.map(p => p.publishedDate))
    expect(uniqueDates.size).toBe(34)

    for (let i = 0; i < posts.length; i++) {
      const p = posts[i]
      expect(p.readingMinutes, `${p.slug} readingMinutes`).toBeTypeOf('number')
      expect(p.readingMinutes ?? 0).toBeGreaterThanOrEqual(1)
      expect(VALID_TRACKS.has(p.track ?? ''), `${p.slug} track=${p.track}`).toBe(true)

      if (i > 0) {
        const prev = new Date(posts[i - 1].publishedDate).getTime()
        const curr = new Date(p.publishedDate).getTime()
        expect(prev).toBeGreaterThan(curr)
      }
    }
  })

  it('filters posts cleanly via getPostsByTrack', () => {
    const all = getAllPosts()
    const sb = getPostsByTrack('small-business')
    const mr = getPostsByTrack('models-rigs')
    const eng = getPostsByTrack('engineering')

    expect(sb.length).toBeGreaterThanOrEqual(10)
    expect(mr.length).toBeGreaterThanOrEqual(8)
    expect(eng.length).toBeGreaterThanOrEqual(8)
    expect(sb.length + mr.length + eng.length).toBe(all.length)
    expect(getPostsByTrack()).toHaveLength(all.length)
  })

  it('embeds custom inline SVG schematics across at least 8 flagship essays', () => {
    const posts = getAllPosts()
    let svgPosts = 0
    for (const meta of posts) {
      const full = getPost(meta.slug)
      if (full?.html.includes('<svg')) svgPosts++
    }
    expect(svgPosts).toBeGreaterThanOrEqual(8)
  })

  it('keeps agent-ready-tasks consequence scale additive and aligned with starter-kit', () => {
    const post = getPost('agent-ready-tasks')
    expect(post).not.toBeNull()
    expect(post!.html).not.toContain("Wait, that's the same")
    expect(post!.html).toContain('= 19')
    expect(post!.html).toContain('consequence 5')
  })

  it('returns null for nonexistent or retired post slug', () => {
    expect(getPost('does-not-exist-anywhere')).toBeNull()
    expect(getPost('productive-friction-interview-ai')).toBeNull()
  })

  it('enforces zero em-dashes, zero TL;DR openers, and clean H2s across every post', () => {
    const posts = getAllPosts()
    for (const meta of posts) {
      expect(meta.title, `${meta.slug} title em-dash`).not.toContain('\u2014')
      expect(meta.description, `${meta.slug} description em-dash`).not.toContain('\u2014')

      const full = getPost(meta.slug)
      expect(full, `${meta.slug} full post`).not.toBeNull()
      expect(full!.html, `${meta.slug} html em-dash`).not.toContain('\u2014')
      expect(full!.html, `${meta.slug} TL;DR opener`).not.toMatch(/<strong>TL;DR\.?<\/strong>/i)
    }
  })
})

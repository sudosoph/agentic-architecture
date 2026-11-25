import fs from 'fs'
import os from 'os'
import path from 'path'
import { describe, it, expect } from 'vitest'
// @ts-expect-error ESM mjs helper imported directly in Vitest
import { buildContentPackTemplates } from '../scripts/new-content-pack.mjs'

describe('Omnichannel Content Pack Generator & Brand Engine Plugin', () => {
  it('generates zero-em-dash MDX, Substack, LinkedIn/X, and Reddit/HN templates with valid frontmatter', () => {
    const pack = buildContentPackTemplates({
      slug: 'weekly-client-brief-setup',
      title: 'How Lean Teams Save 8 Hours: Automated Pre-Call Briefs',
      track: 'small-business',
      date: '2026-11-25',
    })

    expect(pack.mdx).toContain('title: "How Lean Teams Save 8 Hours: Automated Pre-Call Briefs"')
    expect(pack.mdx).toContain('slug: weekly-client-brief-setup')
    expect(pack.mdx).toContain('publishedDate: "2026-11-25"')
    expect(pack.mdx).toContain('track: "small-business"')
    expect(pack.mdx).not.toContain('**TL;DR.**')

    expect(pack.substack).toContain('https://agenticarchitectai.substack.com')
    expect(pack.substack).toContain('https://agenticarchitect.ai/masterclass')

    expect(pack.linkedinX).toContain('LinkedIn')
    expect(pack.linkedinX).toContain('@sudosoph')

    expect(pack.redditHn).toContain('r/smallbusiness')
    expect(pack.redditHn).toContain('9:1')

    for (const [key, value] of Object.entries(pack)) {
      expect(String(value), `${key} should contain zero em-dashes`).not.toContain('\u2014')
    }
  })

  it('routes models-rigs track Reddit targets to technical/self-hosted communities', () => {
    const pack = buildContentPackTemplates({
      slug: 'private-mesh-node',
      title: 'Running Quantized Models Over Encrypted Mesh',
      track: 'models-rigs',
      date: '2026-11-25',
    })
    expect(pack.mdx).toContain('track: "models-rigs"')
    expect(pack.redditHn).toContain('r/LocalLLaMA')
  })

  it('validates installed global agentic-brand-engine plugin manifest', () => {
    const pluginDir = path.join(os.homedir(), '.gemini/config/plugins/agentic-brand-engine')
    const manifestPath = path.join(pluginDir, 'plugin.json')
    if (fs.existsSync(manifestPath)) {
      const raw = fs.readFileSync(manifestPath, 'utf8')
      const parsed = JSON.parse(raw)
      expect(parsed.name).toBe('agentic-brand-engine')
      expect(raw).not.toContain('\u2014')
    }
  })
})

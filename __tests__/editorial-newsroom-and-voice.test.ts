import fs from 'node:fs'
import path from 'node:path'
import { describe, it, expect } from 'vitest'
import { convertMarkdownBodyToProseMirror } from '../scripts/mdx-to-substack.mjs'
import {
  buildFourFormatEditorialPack,
  extractVoiceDiffLesson,
  buildWeeklyGrowthScorecard,
} from '../scripts/editorial-newsroom.mjs'

describe('Editorial Newsroom, Substack Images, Voice-Diff Calibrator & LinkedIn Launch Kit', () => {
  it('converts Markdown inline and linked images into Substack captionedImage ProseMirror blocks with absolute URLs and MIME types', () => {
    const md = [
      '## The Frontier Capability Shift',
      '',
      '![2026 Business AI Capability Cheat Sheet](/images/blog/capability-matrix.png)',
      '',
      '[![Explore Courses](/images/blog/cta-card.webp)](/courses)',
      '',
      'Plain paragraph following the schematic.',
    ].join('\n')

    const blocks = convertMarkdownBodyToProseMirror(md)
    const imageBlocks = blocks.filter((b: { type: string }) => b.type === 'captionedImage')
    expect(imageBlocks).toHaveLength(2)
    expect(JSON.stringify(imageBlocks[0])).toContain(
      'https://agenticarchitect.ai/images/blog/capability-matrix.png',
    )
    expect(JSON.stringify(imageBlocks[1])).toContain('image/webp')
    expect(JSON.stringify(imageBlocks[1])).toContain('https://agenticarchitect.ai/courses')
  })

  it('generates a complete 4-format Possibilities & Implications pack free of em-dashes with UTM attribution links', () => {
    const pack = buildFourFormatEditorialPack({
      slug: 'local-enterprise-connectors-implications',
      headline: 'Enterprise AI Just Connected Directly to Local Workspaces: What Unlocks Now',
      sourceTitle: 'Unified Desktop + Cloud Workspace Connectors Ship to Enterprise Teams',
      sourceUrl: 'https://example.com/release',
      killerFormat: 'possibility-stress-test',
      opportunityLane: 'corporate-workshops-and-courses',
      unlockSummary:
        'Non-technical strategy, finance, and GTM leads can point frontier reasoning directly at local spreadsheets, call transcripts, and deck folders without uploading zip archives.',
      implicationSummary:
        'Teams still treating AI like a browser search bar fall 5x behind peers turning raw project folders into client-ready prototypes and pricing wargames in 15 minutes.',
      maximizeSteps: [
        'Point a scoped workspace folder at your top 20 customer call transcripts and Q4 pricing sheet.',
        'Run a 3-rival competitive wargame before Monday pipeline review.',
        'Keep external emails and proposals at Level-2 Draft-First human sign-off.',
      ],
    })

    expect(pack.writtenMdx).not.toContain('\u2014')
    expect(pack.writtenMdx).not.toContain(' -- ')
    expect(pack.podcastScript).toContain('7-Minute Audio Briefing')
    expect(pack.podcastScript).not.toContain('\u2014')
    expect(pack.carouselSlides).toHaveLength(6)
    expect(pack.verticalReactionScript).toContain('45-Second Vertical')
    expect(pack.utmLinks.linkedinCarousel).toContain('utm_source=linkedin')
    expect(pack.utmLinks.linkedinCarousel).toContain('utm_medium=carousel')
    expect(pack.utmLinks.substackPodcast).toContain('utm_medium=podcast')
  })

  it('extracts concrete before/after voice rules from Sophia edits and comments, returning null when unchanged', () => {
    const unchanged = extractVoiceDiffLesson({
      originalText: 'Keep hooks direct and concrete.',
      editedText: 'Keep hooks direct and concrete.',
      reviewerComments: [],
    })
    expect(unchanged).toBeNull()

    const lesson = extractVoiceDiffLesson({
      originalText: [
        'Organizations can leverage synergistic AI methodologies to optimize cross-functional paradigms.',
        'Second line stays identical.',
        'Third line also stays identical.',
      ].join('\n'),
      editedText: [
        'Watched two VPs hit this exact wall on Tuesday.',
        'Smart teams use this release to ship a full client pitch prototype before lunch.',
        'Second line stays identical.',
        'Third line also stays identical.',
      ].join('\n'),
      reviewerComments: ['Way too stiff and consultant-heavy: lead with the concrete outcome.'],
    })
    expect(lesson).not.toBeNull()
    expect(lesson!.replacements).toHaveLength(1)
    expect(lesson!.replacements[0].before).toContain('Organizations can leverage')
    expect(lesson!.replacements[0].after).toContain('Smart teams use this release')
    expect(lesson!.commentNotes[0]).toContain('Way too stiff')
  })

  it('ranks weekly format performance into Double Down vs Trim recommendations', () => {
    const report = buildWeeklyGrowthScorecard([
      {
        slug: 'capability-cheat-sheet',
        format: 'cheat-sheet-carousel',
        views: 1400,
        subscribersWon: 42,
        buyerIntentActions: 9,
      },
      {
        slug: 'generic-roundup',
        format: 'plain-text-note',
        views: 500,
        subscribersWon: 2,
        buyerIntentActions: 0,
      },
    ])
    expect(report.topPerformer.slug).toBe('capability-cheat-sheet')
    expect(report.markdown).toContain('Double Down')
    expect(report.markdown).not.toContain('\u2014')
  })

  it('ships a complete Blank LinkedIn Launch Kit free of em-dashes and retired terms', () => {
    const kitPath = path.join(process.cwd(), 'content/linkedin/launch-kit.md')
    expect(fs.existsSync(kitPath)).toBe(true)
    const raw = fs.readFileSync(kitPath, 'utf8')
    expect(raw).not.toContain('\u2014')
    expect(raw).not.toContain(' -- ')
    expect(raw.toLowerCase()).not.toContain('voice.md')
    expect(raw.toLowerCase()).not.toContain('brand brain')
    expect(raw).toContain('utm_source=linkedin')
    expect(raw).toContain('Post 1')
    expect(raw).toContain('Post 5')
  })
})

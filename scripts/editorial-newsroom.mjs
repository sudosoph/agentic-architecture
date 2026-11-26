// Live-Signal Editorial Newsroom, 4-Format Pack Generator & Voice-Diff Calibrator
// Powers Sophia's Notion Newsroom across Website + Substack (Written + 7m Podcast) + LinkedIn (Carousels + 45s UGC).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const SITE_URL = 'https://agenticarchitect.ai'

export function cleanVoiceText(str) {
  return String(str || '')
    .replace(/\s*\u2014\s*/g, ': ')
    .replace(/\s+--\s+/g, ': ')
    .replace(/Brand Brain/gi, 'Company Context Vault')
    .replace(/`?voice\.md`?/gi, 'company operating rules')
    .replace(/`?icp\.md`?/gi, 'buyer qualification criteria')
}

function singleLineYaml(str) {
  return cleanVoiceText(str).replace(/\s+/g, ' ').trim().replace(/"/g, "'")
}

export function buildCampaignUtm(pathname, { source, medium, campaign, content }) {
  const url = new URL(pathname, SITE_URL)
  if (source) url.searchParams.set('utm_source', source)
  if (medium) url.searchParams.set('utm_medium', medium)
  if (campaign) url.searchParams.set('utm_campaign', campaign)
  if (content) url.searchParams.set('utm_content', content)
  return url.toString()
}

/**
 * @param {{
 *   slug: string,
 *   headline: string,
 *   sourceTitle: string,
 *   sourceUrl: string,
 *   killerFormat?: string,
 *   opportunityLane?: string,
 *   unlockSummary: string,
 *   implicationSummary: string,
 *   maximizeSteps?: string[],
 *   date?: string
 * }} opts
 */
export function buildFourFormatEditorialPack({
  slug,
  headline,
  sourceTitle,
  sourceUrl,
  killerFormat = 'possibility-stress-test',
  opportunityLane = 'corporate-workshops-and-courses',
  unlockSummary,
  implicationSummary,
  maximizeSteps = [],
  date = new Date().toISOString().slice(0, 10),
}) {
  const cleanHeadline = cleanVoiceText(headline)
  const cleanUnlock = cleanVoiceText(unlockSummary)
  const cleanImplication = cleanVoiceText(implicationSummary)
  const steps = maximizeSteps.map(cleanVoiceText)

  const canonicalPath = `/blog/${slug}`
  const utmLinks = {
    linkedinCarousel: buildCampaignUtm(canonicalPath, {
      source: 'linkedin',
      medium: 'carousel',
      campaign: slug,
    }),
    linkedinUgc: buildCampaignUtm(canonicalPath, {
      source: 'linkedin',
      medium: 'ugc-video',
      campaign: slug,
    }),
    substackPodcast: buildCampaignUtm('/courses', {
      source: 'substack',
      medium: 'podcast',
      campaign: slug,
    }),
    substackNote: buildCampaignUtm(canonicalPath, {
      source: 'substack',
      medium: 'note',
      campaign: slug,
    }),
  }

  const writtenMdx = cleanVoiceText(
    [
      '---',
      `title: "${singleLineYaml(cleanHeadline)}"`,
      `slug: ${slug}`,
      `publishedDate: "${date}"`,
      `description: "${singleLineYaml(cleanUnlock).slice(0, 155)}"`,
      'track: "small-business"',
      `tags: ["possibilities", "${killerFormat}", "${opportunityLane}"]`,
      'draft: true',
      '---',
      '',
      '> [SOPHIA 3-LINE COLD OPEN: Add your personal take or client observation before flipping draft: false]',
      '',
      `## 1. What Just Unlocked (${singleLineYaml(sourceTitle)})`,
      '',
      `${cleanUnlock} ([Primary release source](${sourceUrl}))`,
      '',
      `![${singleLineYaml(cleanHeadline).replace(/[[\]]/g, '')}](/images/blog/${slug}-matrix.png)`,
      '',
      '## 2. Strategic Implications for Your Business & Moat',
      '',
      cleanImplication,
      '',
      '## 3. How to Maximize This Starting Monday',
      '',
      ...steps.map((s, idx) => `${idx + 1}. ${s}`),
      '',
      '---',
      '',
      '### 3 Ways to Work With Sophia',
      `- **Automate Your Role & Ship 5x Faster:** Explore the 4 Applied AI Curricula (or join the Founding Executive Circle on Substack): [Explore Courses](/courses)`,
      `- **Upskill Your Leadership, GTM, or Functional Team:** Corporate Workshops, Keynotes & Executive Education: [Speaking & Corporate Labs](/teaching)`,
      `- **Commission a Custom System or Fractional AI CTO:** Done-For-You Multi-API & Sovereign Builds: [Work With Sophia](/work-with-me)`,
    ].join('\n'),
  )

  const podcastScript = cleanVoiceText(
    [
      `# 7-Minute Audio Briefing (Substack Podcast -> Apple Podcasts & Spotify): ${cleanHeadline}`,
      '',
      `- **0:00 - 0:45 (Cold Hook):** Skip the launch hype around ${cleanVoiceText(sourceTitle)}. Here is the concrete business capability that was impossible six months ago and works right now.`,
      `- **0:45 - 2:45 (The Possibility Demo):** ${cleanUnlock}`,
      `- **2:45 - 4:45 (Boardroom & Career Implications):** ${cleanImplication}`,
      `- **4:45 - 6:30 (Monday Playbook):** ${steps.join(' Next: ')}`,
      `- **6:30 - 7:00 (Clean Sign-Off):** Show notes, cheat sheet, and our Applied AI Curricula are linked right below at ${utmLinks.substackPodcast}`,
    ].join('\n'),
  )

  const carouselSlides = [
    {
      slide: 1,
      title: cleanHeadline,
      body: 'What just unlocked, what changes for your market, and how to capture the upside this week.',
    },
    {
      slide: 2,
      title: 'The Unlock Most Teams Missed',
      body: cleanUnlock,
    },
    {
      slide: 3,
      title: 'Search-Bar Mindset vs. Co-Intelligent Setup',
      body: '90% of teams paste one-line prompts into a chat tab. High-output teams point structured workflows directly at real business context.',
    },
    {
      slide: 4,
      title: 'The Second-Order Strategic Implication',
      body: cleanImplication,
    },
    {
      slide: 5,
      title: '3 Steps to Maximize It on Monday',
      body: steps.map((s, i) => `${i + 1}. ${s}`).join('\n'),
    },
    {
      slide: 6,
      title: 'Save This Cheat Sheet + Go Deeper',
      body: 'Follow Sophia Stein for twice-weekly AI possibilities & implications, or start Module 1.1 free at agenticarchitect.ai/courses',
    },
  ]

  const verticalReactionScript = cleanVoiceText(
    [
      `# 45-Second Vertical (4:5 / 9:16) Green-Screen Possibility Reaction`,
      `- **Visual Backdrop:** Screenshot of ${cleanVoiceText(sourceTitle)} + output preview`,
      `- **0-5s (Pattern Interrupt):** Everyone saw ${cleanVoiceText(sourceTitle)} drop, and almost nobody noticed what it actually unlocks for a real business.`,
      `- **5-22s (The Possibility):** ${cleanUnlock}`,
      `- **22-37s (The Implication):** ${cleanImplication}`,
      `- **37-45s (CTA):** Full Monday setup and cheat sheet in the first comment (${utmLinks.linkedinUgc}).`,
    ].join('\n'),
  )

  return {
    slug,
    writtenMdx,
    podcastScript,
    carouselSlides,
    verticalReactionScript,
    utmLinks,
  }
}

/**
 * @param {{
 *   originalText?: string,
 *   editedText?: string,
 *   reviewerComments?: string[]
 * }} opts
 */
export function extractVoiceDiffLesson({
  originalText = '',
  editedText = '',
  reviewerComments = [],
}) {
  const origLines = String(originalText)
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
  const editLines = String(editedText)
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
  const cleanComments = (reviewerComments || []).map(c => cleanVoiceText(c).trim()).filter(Boolean)

  const n = origLines.length
  const m = editLines.length
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (origLines[i] === editLines[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1]
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1])
      }
    }
  }

  const anchors = []
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (origLines[i] === editLines[j]) {
      anchors.push([i, j])
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++
    } else {
      j++
    }
  }
  anchors.push([n, m])

  const replacements = []
  let prevI = 0
  let prevJ = 0
  for (const [ancI, ancJ] of anchors) {
    const removed = origLines.slice(prevI, ancI)
    const added = editLines.slice(prevJ, ancJ).map(cleanVoiceText)
    if (removed.length > 0 && added.length > 0) {
      // Pair modified lines from the end of the hunk so prepended cold-open lines do not swallow the replacement
      const pairCount = Math.min(removed.length, added.length)
      for (let k = 0; k < pairCount; k++) {
        const before = removed[removed.length - pairCount + k]
        const after = added[added.length - pairCount + k]
        if (before !== after) {
          replacements.push({ before, after })
        }
      }
    }
    prevI = ancI + 1
    prevJ = ancJ + 1
  }

  if (replacements.length === 0 && cleanComments.length === 0) {
    return null
  }

  return {
    capturedAt: new Date().toISOString(),
    replacements,
    commentNotes: cleanComments,
    ruleSummary:
      cleanComments[0] ||
      `Prefer phrasing like "${replacements[0]?.after.slice(0, 80)}" over "${replacements[0]?.before.slice(0, 80)}".`,
  }
}

/**
 * @param {Array<{ slug: string, format: string, views: number, subscribersWon: number, buyerIntentActions: number }>} items
 */
export function buildWeeklyGrowthScorecard(items = []) {
  const scored = items
    .map(item => {
      const views = Math.max(Number(item.views) || 0, 1)
      const subs = Number(item.subscribersWon) || 0
      const buyerActions = Number(item.buyerIntentActions) || 0
      const subRatePct = Math.round((subs / views) * 1000) / 10
      const smoothedRatePct = (subs / Math.max(views, 50)) * 100
      const compositeScore = subs * 3 + buyerActions * 10 + smoothedRatePct * 5
      return { ...item, subRatePct, compositeScore }
    })
    .sort((a, b) => b.compositeScore - a.compositeScore)

  const topPerformer = scored[0] || null
  const weakestPerformer = scored.length > 1 ? scored[scored.length - 1] : null

  const rows = scored.map(
    r =>
      `| ${r.slug} | ${r.format} | ${r.views} | ${r.subscribersWon} (${r.subRatePct}%) | ${r.buyerIntentActions} |`,
  )

  const markdown = cleanVoiceText(
    [
      '# Weekly Audience & Buyer Conversion Scorecard',
      '',
      '| Piece | Format | Views | Subscribers Won | Buyer Intent Actions |',
      '| :--- | :--- | ---: | ---: | ---: |',
      ...rows,
      '',
      '## Next Week Iteration Calls',
      topPerformer
        ? `- **Double Down:** \`${topPerformer.format}\` led conversion via \`${topPerformer.slug}\` (${topPerformer.subscribersWon} subscribers, ${topPerformer.buyerIntentActions} buyer actions). Allocate 2 slots next week to this format.`
        : '- **Double Down:** Collect first full week of PostHog + Substack baseline data.',
      weakestPerformer
        ? `- **Trim or Reframe:** \`${weakestPerformer.format}\` (\`${weakestPerformer.slug}\`) trailed on subscriber and buyer intent; test a sharper Possibility or Cheat-Sheet hook.`
        : '',
    ]
      .filter(Boolean)
      .join('\n'),
  )

  return {
    scored,
    topPerformer,
    weakestPerformer,
    markdown,
  }
}

export async function fetchLivePossibilitySignals() {
  try {
    const res = await fetch(
      'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=10',
      { headers: { Accept: 'application/json' } },
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return (data.hits || []).slice(0, 5).map(h => ({
      title: cleanVoiceText(h.title),
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      points: h.points,
      comments: h.num_comments,
    }))
  } catch {
    return []
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  fetchLivePossibilitySignals().then(signals => {
    const outPath = path.join(ROOT, 'content/queue/live-newsroom-signals.json')
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, JSON.stringify({ fetchedAt: new Date().toISOString(), signals }, null, 2))
    console.log(`[newsroom] saved ${signals.length} live front-page signals -> ${outPath}`)
  })
}

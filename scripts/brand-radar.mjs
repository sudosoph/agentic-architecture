#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

function stripEmDashes(str) {
  return String(str)
    .replace(/\u2014/g, ': ')
    .replace(/\s+--\s+/g, ': ')
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 56)
}

export function buildSeoGeoOpportunity(rawItem) {
  const cleanTitle = stripEmDashes(rawItem.title || 'New AI Workflow Tool')
  const lower = cleanTitle.toLowerCase()

  let format = 'tool-review'
  if (/vs\b|compare|benchmark|cost|pricing/.test(lower)) {
    format = 'cost-comparison'
  } else if (/launch|release|announc|protocol|mcp|agent/.test(lower)) {
    format = 'trend-teardown'
  }

  const slug = slugify(`${cleanTitle}-${format === 'tool-review' ? 'review' : 'guide'}`)

  const seoBlogTitle =
    format === 'tool-review'
      ? `${cleanTitle}: Hands-On Review, Real Cost, and Who Should Skip It`
      : format === 'cost-comparison'
        ? `${cleanTitle}: Real Monthly Cost, Latency, and Team Fit Compared`
        : `${cleanTitle}: What Actually Changes for Lean Teams in 2026`

  // Distinct conversational headline for Substack so Substack never cannibalizes the blog's Google SERP title
  const substackStoryTitle =
    format === 'tool-review'
      ? `I tested "${cleanTitle}" on a real Monday workflow. Here is what held up.`
      : format === 'cost-comparison'
        ? `The spreadsheet math behind "${cleanTitle}" (and where teams overpay)`
        : `Everyone is posting about "${cleanTitle}" this week. Here is the 10-minute version.`

  const geoCitationAngle =
    'Includes a 5-row measured comparison table (setup minutes, monthly cost at 1k runs, failure mode, data boundary, verdict) so ChatGPT, Perplexity, and Google AI Overviews can cite exact structured facts.'

  const canonicalUrl = `https://agenticarchitect.ai/blog/${slug}`

  const mediumDevtoFrontmatter = [
    '---',
    `title: "${seoBlogTitle.replace(/"/g, "'")}"`,
    'published: false',
    `canonical_url: "${canonicalUrl}"`,
    'tags: ai, automation, productivity, architecture',
    '---',
  ].join('\n')

  return {
    id: rawItem.id || slug,
    source: rawItem.source || 'HN / Community Signal',
    sourceUrl: rawItem.url || 'https://news.ycombinator.com',
    points: rawItem.points ?? 100,
    format,
    slug,
    seoBlogTitle: stripEmDashes(seoBlogTitle),
    substackStoryTitle: stripEmDashes(substackStoryTitle),
    geoCitationAngle: stripEmDashes(geoCitationAngle),
    canonicalUrl,
    mediumDevtoFrontmatter,
    linkedinHook: stripEmDashes(
      `Tested ${cleanTitle} against a plain 15-minute workflow setup this week.\n\nThree things stood out once you look past the launch demo:\n1. Setup friction vs. keeping state in plain markdown (voice.md)\n2. Monthly cost at 1,000 runs\n3. Where a human checkpoint is still non-negotiable\n\nFull notes and scorecard in the first comment.`,
    ),
  }
}

export async function fetchLiveRadarItems() {
  try {
    const url =
      'https://hn.algolia.com/api/v1/search?query=MCP%20OR%20AI%20agent%20OR%20workflow%20automation&tags=story&numericFilters=points>30&hitsPerPage=6'
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const hits = Array.isArray(data.hits) ? data.hits : []
    if (hits.length > 0) {
      return hits.slice(0, 5).map(h =>
        buildSeoGeoOpportunity({
          id: `hn-${h.objectID}`,
          source: `Hacker News (${h.points} pts · ${h.num_comments} comments)`,
          title: h.title,
          url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
          points: h.points,
        }),
      )
    }
  } catch {
    // Fall back to curated seed below when offline
  }

  return [
    buildSeoGeoOpportunity({
      id: 'seed-mcp-browser-agents',
      source: 'Builder & Operator Trend Signal',
      title: 'Browser Agents vs API Workflows for Small Business Ops',
      url: 'https://agenticarchitect.ai/stack',
      points: 184,
    }),
    buildSeoGeoOpportunity({
      id: 'seed-n8n-vs-zapier-2026',
      source: 'Founder Cost Teardown Request',
      title: 'n8n Self-Hosted vs Zapier in 2026',
      url: 'https://agenticarchitect.ai/starter-kit',
      points: 142,
    }),
  ]
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outPath = path.join(process.cwd(), 'content/queue/radar-latest.json')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fetchLiveRadarItems().then(items => {
    fs.writeFileSync(
      outPath,
      JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2),
      'utf8',
    )
    console.log(`Saved ${items.length} scored SEO/GEO & review opportunities -> content/queue/radar-latest.json`)
  })
}

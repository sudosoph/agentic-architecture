#!/usr/bin/env node
// Substack Buyer-Room Engagement Radar & Bot-vs-Buyer Interaction Classifier
//
// Why this exists:
// 1. Automated comment bots destroy executive trust and trigger Substack's anti-slop suppression.
// 2. Engaging on peer AI-consultant newsletters only attracts other AI consultants and their bots.
// 3. This script automates 100% of the *discovery, filtering, and prep*:
//    - Pulls live RSS posts from 10 curated Buyer Substacks separated across Audience 1 (Non-Technical
//      Business Owners, SMB M&A, Chiefs of Staff) and Audience 2 (CTOs, VPs of Eng, Enterprise Leaders).
//    - Classifies inbound Substack commenters to separate 5-second cron brand bots from real buyers.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const CURATED_BUYER_SUBSTACKS = [
  // Audience 1: Non-Technical Business Owners, SMB Acquirers, Agencies & Chiefs of Staff
  {
    id: 346823,
    name: 'Big Deal Small Business',
    author: 'Kaustubh Deo',
    audience: 'non-technical-owners',
    feedUrl: 'https://bigdealsmallbusiness.substack.com/feed',
    readerProfile: '$1M to $10M SMB acquirers and owner-operators focused on EBITDA and staff leverage',
    commentAngle:
      'Connect post-acquisition or owner-operator margin bottlenecks to draft-first back-office workflows before adding $65K admin headcount.',
  },
  {
    id: 125007,
    name: 'The Business Inquirer',
    author: 'Roman Beylin',
    audience: 'non-technical-owners',
    feedUrl: 'https://thebusinessinquirer.substack.com/feed',
    readerProfile: 'Lower-middle-market SMB owners, searchers, and deal operators',
    commentAngle:
      'Highlight how documenting plain-English operating and qualification rules reduces owner-dependence and de-risks handoffs.',
  },
  {
    id: 687402,
    name: 'Ask a Chief of Staff',
    author: 'Clara Ma',
    audience: 'non-technical-owners',
    feedUrl: 'https://askachiefofstaff.substack.com/feed',
    readerProfile: 'Chiefs of Staff, EAs, and VPs of Operations supporting founders and CEOs',
    commentAngle:
      'Share practical Rung-2 patterns (pre-call dossiers 30m ahead + commitment tracking in Drafts) that make a CoS 3x faster.',
  },
  {
    id: 7398645,
    name: 'A Chief of Staff',
    author: 'David Nebinski',
    audience: 'non-technical-owners',
    feedUrl: 'https://achiefofstaff.substack.com/feed',
    readerProfile: 'Operating leaders and right-hand executives inside scaling firms',
    commentAngle:
      'Share concrete rhythms for Friday open-loop audits and keeping pricing/relationship sign-off strictly human.',
  },
  {
    id: 10845,
    name: "Lenny's Newsletter",
    author: 'Lenny Rachitsky',
    audience: 'non-technical-owners',
    feedUrl: 'https://www.lennysnewsletter.com/feed',
    readerProfile: 'Founders, GMs, and product/ops leaders scaling lean teams',
    commentAngle:
      'Contrast ad-hoc blank-box prompting with repeatable 4-axis task scoring (volume, variability, safety, structured trigger).',
  },

  // Audience 2: Mid-Market CEOs/COOs, Corporate L&D, CTOs & Engineering Leaders
  {
    id: 458709,
    name: 'The Pragmatic Engineer',
    author: 'Gergely Orosz',
    audience: 'fractional-caio-cto',
    feedUrl: 'https://newsletter.pragmaticengineer.com/feed',
    readerProfile: 'CTOs, VPs of Engineering, and Staff+ Engineers',
    commentAngle:
      'Add production verification perspective: deterministic eval gates, least-privilege OAuth/MCP scopes, and 60 to 85% tiered routing savings.',
  },
  {
    id: 64099,
    name: 'Refactoring',
    author: 'Luca Rossi',
    audience: 'fractional-caio-cto',
    feedUrl: 'https://refactoring.substack.com/feed',
    readerProfile: 'VPs of Engineering and startup/mid-market CTOs',
    commentAngle:
      'Bridge engineering architecture with commercial OpEx discipline when moving teams past AI demos into governed production.',
  },
  {
    id: 1180644,
    name: 'One Useful Thing',
    author: 'Ethan Mollick',
    audience: 'fractional-caio-cto',
    feedUrl: 'https://www.oneusefulthing.org/feed',
    readerProfile: 'Enterprise executives, L&D directors, university leaders, and board members',
    commentAngle:
      'Share field data from training 250+ healthcare/enterprise leaders and 300+ founders: why department SOP labs beat generic prompt trainings.',
  },
  {
    id: 1173386,
    name: "Simon Willison's Newsletter",
    author: 'Simon Willison',
    audience: 'fractional-caio-cto',
    feedUrl: 'https://simonw.substack.com/feed',
    readerProfile: 'Principal engineers, security-conscious builders, and technical CTOs',
    commentAngle:
      'Contribute concrete prompt-injection / OAuth blast-radius controls (draft-only scopes and air-gapped verification boundaries).',
  },
  {
    id: 2252,
    name: 'Exponential View',
    author: 'Azeem Azhar',
    audience: 'fractional-caio-cto',
    feedUrl: 'https://www.exponentialview.co/feed',
    readerProfile: 'CEOs, COOs, investors, and board-level strategy leaders',
    commentAngle:
      'Frame enterprise AI adoption through unit economics, vendor lock-in avoidance, and Fractional CAIO governance.',
  },
]

function sanitizeText(input) {
  return String(input || '')
    .replace(/\u2014/g, ': ')
    .replace(/\s+--\s+/g, ': ')
    .trim()
}

export function classifySubstackInteraction({
  commenterName = '',
  commentBody = '',
  bio = '',
  commentTimestampIso = null,
  likeTimestampIso = null,
  recentNotesIn24h = 0,
  hasAiGeneratedFlag = false,
} = {}) {
  const signals = []
  let deltaSeconds = null

  if (commentTimestampIso && likeTimestampIso) {
    const diffMs = Math.abs(Date.parse(commentTimestampIso) - Date.parse(likeTimestampIso))
    if (!Number.isNaN(diffMs)) {
      deltaSeconds = Math.round(diffMs / 1000)
      if (deltaSeconds <= 15) {
        signals.push(`Robotic comment/like delta (${deltaSeconds}s apart)`)
      }
    }
  }

  if (recentNotesIn24h >= 6) {
    signals.push(`High-frequency cron cadence (${recentNotesIn24h} Notes/24h)`)
  }

  if (hasAiGeneratedFlag) {
    signals.push('Substack is_ai_generated_text flag true on recent feed')
  }

  if (/which of the .* would you|which repeated .* this week\?$/i.test(commentBody.trim())) {
    signals.push('Formulaic 2-sentence LLM engagement question')
  }

  const isCompetingAiCreator =
    /ai for operators|ai consultant|ai implementation|prompt|automation agency/i.test(bio)
  const isExecutiveOrOwnerBuyer =
    /\b(ceo|coo|cto|cfo|chief of staff|founder|owner|managing partner|vp |director|clinic|agency|private equity|searcher)\b/i.test(
      bio,
    )

  if (signals.length >= 2 || (deltaSeconds !== null && deltaSeconds <= 10)) {
    return {
      commenterName: sanitizeText(commenterName),
      classification: 'PEER_AI_BRAND_AGENT',
      confidence: signals.length >= 3 ? 'high' : 'medium',
      signals,
      recommendedAction: sanitizeText(
        'Optional 20-second 1-sentence reply on your post to boost Substack comment velocity; skip visiting or pitching their profile.',
      ),
    }
  }

  if (isExecutiveOrOwnerBuyer && !isCompetingAiCreator) {
    return {
      commenterName: sanitizeText(commenterName),
      classification: 'HIGH_VALUE_BUYER_OR_PARTNER',
      confidence: 'high',
      signals: ['Bio matches target Owner / Executive / Referral Partner ICP'],
      recommendedAction: sanitizeText(
        'Reply personally with a concrete practitioner insight, follow their profile, and leave 1 thoughtful note on their work.',
      ),
    }
  }

  return {
    commenterName: sanitizeText(commenterName),
    classification: 'ORGANIC_READER_OR_PEER',
    confidence: 'medium',
    signals,
    recommendedAction: sanitizeText(
      'Reply warmly in 2 plain sentences and invite them to share what workflow bottleneck they are tackling.',
    ),
  }
}

export function parseRssLatestItem(xmlText) {
  const itemMatch = String(xmlText || '').match(/<item>([\s\S]*?)<\/item>/i)
  if (!itemMatch) return null
  const block = itemMatch[1]
  const extract = tag => {
    const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
    return m ? sanitizeText((m[1] ?? m[2] ?? '').replace(/<[^>]+>/g, '')) : ''
  }
  return {
    title: extract('title'),
    link: extract('link'),
    pubDate: extract('pubDate'),
  }
}

export async function fetchFreshBuyerThreads({
  limitPerAudience = 2,
  fetchImpl = globalThis.fetch,
} = {}) {
  const picks = { 'non-technical-owners': [], 'fractional-caio-cto': [] }

  for (const pub of CURATED_BUYER_SUBSTACKS) {
    if (picks[pub.audience].length >= limitPerAudience) continue
    try {
      const res = await fetchImpl(pub.feedUrl, {
        headers: { 'User-Agent': 'AgenticArchitectBuyerRadar/1.0' },
      })
      if (!res.ok) continue
      const xml = await res.text()
      const latest = parseRssLatestItem(xml)
      if (latest && latest.title && latest.link) {
        picks[pub.audience].push({
          publication: pub.name,
          author: pub.author,
          audience: pub.audience,
          readerProfile: pub.readerProfile,
          latestTitle: latest.title,
          latestUrl: latest.link,
          pubDate: latest.pubDate,
          practitionerAngle: sanitizeText(pub.commentAngle),
        })
      }
    } catch {
      // Skip unreachable feed gracefully
    }
  }

  return picks
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  fetchFreshBuyerThreads({ limitPerAudience: 3 }).then(picks => {
    const outPath = path.join(process.cwd(), 'content/queue/substack-buyer-radar.json')
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(
      outPath,
      JSON.stringify({ generatedAt: new Date().toISOString(), picks }, null, 2),
      'utf8',
    )
    console.log(
      `[radar:substack] Saved ${picks['non-technical-owners'].length} Owner threads + ${picks['fractional-caio-cto'].length} Executive/CTO threads -> content/queue/substack-buyer-radar.json`,
    )
  })
}

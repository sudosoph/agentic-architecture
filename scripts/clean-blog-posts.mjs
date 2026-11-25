// Idempotent editorial cleanup across all MDX posts in content/blog/.
// 1. Assigns `track` ('small-business' | 'models-rigs' | 'engineering').
// 2. Applies exact reworded business-buyer titles (safely double-quoted for YAML).
// 3. Strips leading `**TL;DR.**` / `**TL;DR:**` openers while keeping the lead paragraph.
// 4. Replaces all U+2014 em-dashes cleanly in frontmatter and prose.
// 5. Applies targeted factual/math updates on agent-ready-tasks, eu-ai-act-deadline,
//    boulders-ai-frontier, mcp-server-audit-2026, and self-hosting-ai-stack-hetzner.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')

const SMALL_BUSINESS_TITLES = {
  'agent-ready-tasks':
    'How to Find the 20% of Your Work AI Should Actually Handle (In 90 Minutes)',
  'the-zero-inbox-agent':
    'Stop Summarizing Your Inbox: The 4-Bucket System That Drafts Your Replies',
  'the-hitl-standard':
    'The 5 Levels of AI Autonomy: How Smart Teams Automate Without Embarrassing Mistakes',
  'cold-email-agent':
    'Research-First Outreach: How to Use AI for Sales and Partnerships Without Sounding Like a Bot',
  'automated-competitive-intelligence':
    'Replace Google Alerts: Build a Weekly Competitor Briefing in One Afternoon',
  'solo-founder-1m-arr':
    'What Lean $1M Businesses Actually Automate (And the 5 Jobs Humans Still Own)',
  'document-ocr-for-agents':
    'Getting Reliable Business Data Out of Messy PDFs, Invoices, and Contracts',
  'token-budgeting-for-startups':
    'Why AI Bills Spike Overnight (And 6 Simple Controls Every Team Needs)',
  'death-of-the-junior-dev':
    'How AI Workflows Are Reshaping Hiring, Management, and Early-Career Roles',
  'vibe-coding-for-founders':
    'How Non-Technical Founders Build Software Prototypes Safely With AI',
  'boulders-ai-frontier':
    "Inside Boulder's Applied AI Scene: Startups, CU Research, and Give First",
  'ai-agent-conf-nyc-takeaways':
    '10 Lessons for Business & Tech Leaders From AI Agent Conference NYC',
  'ai-dev-sf-takeaways':
    'What Actually Works in Production AI: 10 Takeaways From AI Dev SF',
}

const MODELS_RIGS_SLUGS = new Set([
  'local-vs-cloud-inference',
  'eu-ai-act-deadline',
  'three-ways-to-run-open-weight-models',
  'mixing-and-matching-open-weight-models',
  'mcp-101',
  'self-hosting-ai-stack-hetzner',
  '96gb-ram-thesis',
  'framework-laptop-thesis',
  'personal-ai-agent-weekend',
  'cost-quality-pareto-coding-agents',
  // New Nov 2026 posts if already present:
  'gemini-4-neon-vs-deepseek-v4',
  'autonomous-ai-rig-tailscale-guide',
])

const EXTRA_TITLE_OVERRIDES = {
  'self-hosting-ai-stack-hetzner':
    'How to Replace $150/mo of Creator & Ops SaaS on a $5 Server (Reference Blueprint)',
  'eu-ai-act-deadline':
    'Data Privacy, Compliance, and the EU AI Act: 4 Questions Every Business Must Ask',
}

function getTrackForSlug(slug) {
  if (slug in SMALL_BUSINESS_TITLES || slug === 'easy-ai-brand-and-workflow-setup') {
    return 'small-business'
  }
  if (MODELS_RIGS_SLUGS.has(slug)) {
    return 'models-rigs'
  }
  return 'engineering'
}

function stripEmDashes(text) {
  return text
    .replace(/ \u2014 /g, ', ')
    .replace(/\u2014 /g, ', ')
    .replace(/ \u2014/g, ',')
    .replace(/(\d)\u2014(\d)/g, '$1-$2')
    .replace(/([A-Za-z0-9)"'])\u2014([A-Za-z0-9("'])/g, '$1, $2')
    .replace(/\u2014/g, '-')
}

function updateFrontmatter(yaml, slug) {
  const track = getTrackForSlug(slug)
  const newTitle = SMALL_BUSINESS_TITLES[slug] || EXTRA_TITLE_OVERRIDES[slug] || null

  const lines = yaml.split('\n')
  const out = []
  let sawTrack = false

  for (let line of lines) {
    if (line.startsWith('title:') && newTitle) {
      out.push(`title: "${newTitle.replace(/"/g, '\\"')}"`)
      continue
    }
    if (line.startsWith('title:')) {
      const rawVal = line.slice('title:'.length).trim().replace(/^["']|["']$/g, '')
      const cleaned = stripEmDashes(rawVal).replace(/"/g, '\\"')
      out.push(`title: "${cleaned}"`)
      continue
    }
    if (line.startsWith('description:')) {
      const rawVal = line.slice('description:'.length).trim().replace(/^["']|["']$/g, '')
      const cleaned = stripEmDashes(rawVal).replace(/"/g, '\\"')
      out.push(`description: "${cleaned}"`)
      continue
    }
    if (line.startsWith('track:')) {
      out.push(`track: "${track}"`)
      sawTrack = true
      continue
    }
    out.push(stripEmDashes(line))
  }

  if (!sawTrack) {
    // Insert track right after description or publishedDate
    const descIdx = out.findIndex(l => l.startsWith('description:'))
    const insertAt = descIdx >= 0 ? descIdx + 1 : out.length
    out.splice(insertAt, 0, `track: "${track}"`)
  }

  return out.join('\n')
}

function applyPostSpecificFixes(slug, body) {
  let out = body

  if (slug === 'agent-ready-tasks') {
    out = out
      .replace(
        'agent_readiness = (volume × 2) + variability + (6 − consequence) + structured_signal',
        'agent_readiness = (volume × 2) + variability + consequence + structured_signal',
      )
      .replace(
        '- Consequence is *inverted* (`6 − consequence`). Lower consequence is better for early agents.',
        '- Consequence is scored for safety (`1` = catastrophic if wrong, `5` = internal draft / nobody notices), so lower-risk tasks earn higher readiness points directly.',
      )
      .replace(
        /Total: `\(4 × 2\) \+ (?:2 \+ \(6 [−-] 3\)|2 \+ 3) \+ 2 = 15`\.[\s\S]*?keep a human click on the send\.|Total: `\(4 × 2\) \+ 2 \+ \(6 [−-] 3\) \+ 2 = 15`\. Borderline\.[\s\S]*?Keep the human on send\./,
        'Total: `(4 × 2) + 2 + 3 + 2 = 15`. Borderline as a single end-to-end agent.\n\nNow decompose that workflow into two separate steps: **Prospect Research Dossier** and **Outbound Send**. Scored on its own, the **Prospect Research Dossier** step has volume 4, bounded variability 4 (repeatable five-field company snapshot), consequence 5 (internal brief only, zero external relationship risk), and structured signal 2: `(4 × 2) + 4 + 5 + 2 = 19`. Decomposing moves the research step cleanly from `15` (Borderline) to `19` (**Ship with HITL**). Automate the research dossier today, and keep a human click on the send.',
      )
  }

  if (slug === 'mcp-server-audit-2026') {
    out = out
      .replace('## Top 5 picks for HN-flavored devs', '## Top 5 picks for production teams')
      .replace('This is the HN-bait pick and it deserves the paragraph.', 'This is the standout architecture pick in the catalog.')
  }

  if (slug === 'eu-ai-act-deadline') {
    out = out
      .replace(
        'The August 2 2026 EU AI Act deadline for high-risk agentic systems is real and the [Digital Omnibus trilogue failed to delay it on April 28](https://www.kennedyslaw.com/en/thought-leadership/article/2026/the-eu-ai-act-implementation-timeline-understanding-the-next-deadline-for-compliance/).',
        'Since the August 2, 2026 EU AI Act enforcement milestone took effect following the [April 28 Digital Omnibus trilogue](https://www.kennedyslaw.com/en/thought-leadership/article/2026/the-eu-ai-act-implementation-timeline-understanding-the-next-deadline-for-compliance/), high-risk agentic governance is active operational reality.',
      )
      .replace(
        'A delay is still possible but no longer the default. Plan for the August date.',
        'With the August 2026 milestone now in force, organizations serving EU users are expected to demonstrate documented controls.',
      )
      .replace(
        'Three actions that move the needle in May-July 2026, before the August deadline.',
        'Three actions that close the compliance gap immediately under late-2026 enforcement.',
      )
      .replace(
        'The teams that have not are about to spend the summer catching up.',
        'The teams that delayed are now spending late 2026 retrofitting controls under active customer procurement audits.',
      )
  }

  if (slug === 'boulders-ai-frontier') {
    out = out
      .replace(
        'This is the May 2026 dispatch: who is shipping, what to attend, and the Give First culture that makes this scene work.',
        'Looking back from late 2026 after training 300+ founders and operators live during Boulder Startup Week ([open lab archive](/bsw)), here is who is shipping, where builders meet, and why the Give First culture works.',
      )
      .replace(
        'I run Agentic Architecture out of Boulder, focused on local-first AI infrastructure for engineers and SMBs.',
        'I run Agentic Architect out of Boulder, helping founders, leadership teams, and builders wire practical AI workflows and private infrastructure.',
      )
      .replace(
        'Local-First AI (subscribe link on the homepage) is the weekly newsletter where longer-form analysis from these monthly Boulder dispatches lives. Free for BSW attendees.',
        'The Agentic Architect Newsletter on [Substack](https://agenticarchitectai.substack.com) is where weekly workflow playbooks and Boulder dispatches live.',
      )
      .replace('Looking ahead from May 2026:', 'Key recurring anchors on the Front Range calendar:')
      .replace(
        'This was the May 2026 dispatch. Next month: what shipped, who hired, and the new patterns surfacing out of the meetups.',
        'Explore the full open-source Boulder Startup Week slides and 17-step workflow tutorial anytime at [/bsw](/bsw).',
      )
  }

  if (slug === 'self-hosting-ai-stack-hetzner') {
    if (!out.includes('Reference architecture note:')) {
      out =
        '*Reference architecture note: On Agentic Architect today, I keep my newsletter on Substack and bookings on Cal.com + Stripe so 100% of my week goes to teaching and client systems. Below is the exact Docker Compose reference blueprint for technical operators who want to self-host the entire creator and ops stack on a single €3.79/mo Hetzner VPS.*\n\n' +
        out
    }
    out = out
      .replace('I run Resend.', 'Resend is the cleanest default at this scale.')
      .replace(
        'Honest numbers from running this stack across a few client deployments and my own.',
        'Honest numbers from deploying and maintaining this reference architecture in production environments.',
      )
  }

  return out
}

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx')).sort()
let updatedCount = 0

for (const filename of files) {
  const slug = filename.replace(/\.mdx$/, '')
  const fullPath = path.join(BLOG_DIR, filename)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) continue

  const [, yaml, rawBody] = match
  const nextYaml = updateFrontmatter(yaml, slug)

  let nextBody = rawBody
    // Strip leading **TL;DR.** or **TL;DR:** opener at start of post or paragraph
    .replace(/^\s*\*\*TL;DR[.:]?\*\*\s+/m, '')
    .replace(/\n\*\*TL;DR[.:]?\*\*\s+/g, '\n')
    .replace(/Lesbians Who Tech/gi, 'Women Who Code')

  nextBody = applyPostSpecificFixes(slug, nextBody)
  nextBody = stripEmDashes(nextBody)

  const nextFull = `---\n${nextYaml}\n---\n\n${nextBody.replace(/^\s+/, '')}`
  if (nextFull !== raw) {
    fs.writeFileSync(fullPath, nextFull)
    updatedCount++
  }
}

console.log(`[clean-blog-posts] processed ${files.length} post(s), updated ${updatedCount}`)

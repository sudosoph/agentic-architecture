// Scaffolds a canonical MDX playbook + zero-cost omnichannel distribution pack
// (Substack issue + Notes, LinkedIn + X thread, native Reddit markdown + HN brief).
// Usage: npm run new:pack -- <slug> "<title>" [small-business|models-rigs|engineering]

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const VALID_TRACKS = new Set(['small-business', 'models-rigs', 'engineering'])

const DEFAULT_TAGS = {
  'small-business': ['smb', 'founders', 'automation', 'operations'],
  'models-rigs': ['local-models', 'tailscale', 'hardware', 'economics'],
  engineering: ['agents', 'production', 'evals', 'architecture'],
}

const REDDIT_TARGETS = {
  'small-business': ['r/smallbusiness', 'r/Entrepreneur', 'r/AI_Agents', 'r/n8n'],
  'models-rigs': ['r/LocalLLaMA', 'r/SelfHosted', 'r/AI_Agents'],
  engineering: ['r/AI_Agents', 'r/LocalLLaMA', 'r/ExperiencedDevs'],
}

export function buildContentPackTemplates({
  slug,
  title,
  track = 'small-business',
  date = new Date().toISOString().slice(0, 10),
}) {
  const cleanTrack = VALID_TRACKS.has(track) ? track : 'small-business'
  const cleanTitle = String(title).replace(/\u2014/g, ',').replace(/"/g, '\\"')
  const tags = DEFAULT_TAGS[cleanTrack].map(t => `"${t}"`).join(', ')
  const subreddits = REDDIT_TARGETS[cleanTrack].join(', ')
  const canonicalUrl = `https://agenticarchitect.ai/blog/${slug}`

  const mdx = `---
title: "${cleanTitle}"
slug: ${slug}
publishedDate: "${date}"
description: "Practical blueprint and numbers for ${cleanTitle.toLowerCase()}."
track: "${cleanTrack}"
tags: [${tags}]
draft: false
---

Lead directly with the two-sentence business problem and measurable hours or dollars saved (never open with a TL;DR label or em-dashes).

## The bottleneck on your weekly calendar

Explain what goes wrong when operators try to solve this with ad-hoc chat prompts instead of a repeatable system.

## Architecture & decision table

| Step | Input Signal | Automated Action | Human Gate |
|---|---|---|---|
| 1. Operating Rules | Company SOP + Buyer Criteria | Grounds communication rules and scope boundaries | Written once by your team |
| 2. Workflow | Calendar / Inbox / CRM | Prepares structured pre-call brief or draft | Zero external auto-send |
| 3. Review | Drafts queue | 10-second approval tap | You click Send |

## Step-by-step setup

1. Score your highest-friction workflow with the [Free 20/80 Bottleneck Scorecard](/starter-kit).
2. Connect the calendar, form, or inbox trigger to your output draft queue.
3. Verify against the [90-minute readiness rubric](/blog/agent-ready-tasks) and keep a [human approval gate](/blog/the-hitl-standard).

## Next steps

Join the next [Free 60-Min Live Build](/masterclass) to watch these workflows built step by step, explore [Custom Sprints & Courses](/work-with-me), or review [Fractional CAIO & AI CTO Advisory](/fractional-ai-cto).
`

  const substack = `# Substack Edition + 2 Notes: ${title}

- **Publication:** https://agenticarchitectai.substack.com
- **Canonical URL:** ${canonicalUrl}

## Email Subject Options
1. ${title}
2. The 20-minute workflow that saved hours this week

## Newsletter Body
Open with a 3-line personal story from a recent workshop or client build, paste the core framework and table from \`content/blog/${slug}.mdx\`, and close with one clean invitation:

- Save a free seat for the next 60-minute live build: https://agenticarchitect.ai/masterclass
- Or run the unlocked 20/80 Bottleneck Scorecard & SOP Kit: https://agenticarchitect.ai/starter-kit

## Substack Note #1 (Framework Hook)
Most teams lose hours every week re-explaining their business to a blank chat box instead of automating a real operational handoff.

Here is the 3-step fix we just published on Agentic Architect:
1. Document 1 page of company communication rules and buyer qualification criteria.
2. Trigger pre-call briefs and follow-ups automatically into Gmail Drafts.
3. Keep a 10-second human review click before anything goes out.

Full breakdown: ${canonicalUrl}

## Substack Note #2 (Contrarian / Numbers Take)
Before adding another SaaS subscription or $65,000 coordinator hire, score your top 5 weekly chores on volume, bounded variability, reversibility, and structured signal. Anything 18+ out of 25 ships in an afternoon.
`

  const linkedinX = `# LinkedIn & X (@sudosoph) Queue: ${title}

- **Zero-Cost Queue Options:** Buffer Free Tier, Postiz (GitHub OSS), or Zapier Free Tier

## LinkedIn Post #1 (Practitioner Story + Framework)
${title}

After training 300+ founders, executives, and operators, the pattern is remarkably consistent: companies do not stall because they picked the wrong AI model. They stall because every employee prompts from scratch with zero shared SOP rules or workflow triggers.

Three changes fix 80% of the friction:
1. Standardize a 1-page Company Operating Rules & Buyer Qualification sheet.
2. Route repetitive lead research, inbox triage, and proposal prep into a draft queue.
3. Keep a strict human-in-the-loop click before external sends.

(Link to the full step-by-step guide and unlocked scorecard in the first comment: ${canonicalUrl})

## LinkedIn 7-Slide PDF Carousel Outline
- Slide 1: ${title}
- Slide 2: Why blank-box prompting burns 6+ hours/week per team member
- Slide 3: Step 1 - 1-page Company Operating & Qualification Rules
- Slide 4: Step 2 - Connecting existing workspace tools at $0 software bloat
- Slide 5: Step 3 - The 10-second human approval gate
- Slide 6: Real weekly hours & margin math
- Slide 7: Run the free 20/80 Bottleneck Scorer at agenticarchitect.ai/starter-kit

## X (@sudosoph) 4-Post Thread
1/ ${title}

Here is the exact blueprint and cost math (0 fluff):

2/ Step 1: Stop re-prompting from scratch. Standardize 5 approved company examples + escalation boundaries so every workflow stays on-policy.

3/ Step 2: Wire calendar and inbox triggers to stage drafts, never blind auto-sends. Ten seconds of human review protects client trust while reclaiming hours.

4/ Full writeup + copy-paste templates from @sudosoph: ${canonicalUrl}
`

  const redditHn = `# Native Reddit Post & Hacker News Checklist: ${title}

## Reddit Native Value Post
- **Target Communities:** ${subreddits}
- **Anti-Ban Rule:** Paste 100% of the actionable tutorial, steps, and numbers natively as a text post. Zero tracking links, zero sales pitch; share ${canonicalUrl} only if asked in comments.

### Title
I documented our exact setup for ${title.toLowerCase()} (step-by-step + what broke)

### Body
Sharing the exact setup and numbers in case it saves someone else an afternoon:

1. Operating rules & qualification inputs: ...
2. Trigger + draft queue: ...
3. Guardrails and cost per run: ...

Happy to answer questions on the setup or share the raw JSON/templates if helpful.

---

## Hacker News Submission Checklist (Technical / Sovereign Tracks Only)
- **9:1 Ratio Check:** Confirm 9 genuine external engineering comments/submissions since last self-submission.
- **Factual Title (No Hype):** ${title}
- **URL:** ${canonicalUrl}
- **First-Comment Technical Context:** Summarize exact hardware/runtime specs, trade-offs, and reproducible cost numbers in 4 plain sentences.
`

  return { mdx, substack, linkedinX, redditHn }
}

function runCli() {
  const [, , rawSlug, rawTitle, rawTrack] = process.argv
  if (!rawSlug || !rawTitle) {
    console.error('Usage: npm run new:pack -- <slug> "<title>" [small-business|models-rigs|engineering]')
    process.exit(1)
  }

  const slug = rawSlug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const pack = buildContentPackTemplates({
    slug,
    title: rawTitle,
    track: rawTrack || 'small-business',
  })

  const mdxPath = path.join(ROOT, 'content', 'blog', `${slug}.mdx`)
  const socialDir = path.join(ROOT, 'content', 'social', slug)
  fs.mkdirSync(socialDir, { recursive: true })

  if (!fs.existsSync(mdxPath)) {
    fs.writeFileSync(mdxPath, pack.mdx)
  }
  fs.writeFileSync(path.join(socialDir, 'substack.md'), pack.substack)
  fs.writeFileSync(path.join(socialDir, 'linkedin-x.md'), pack.linkedinX)
  fs.writeFileSync(path.join(socialDir, 'reddit-hn.md'), pack.redditHn)

  console.log(`[new:pack] scaffolded ${mdxPath} and ${socialDir}/`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli()
}

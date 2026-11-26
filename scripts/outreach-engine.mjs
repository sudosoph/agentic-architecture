// Generates research-first, human-reviewed multi-channel outreach packs
// cleanly separated across two buyer audiences:
// 1. Non-Technical Business Owners (warm-founder, podcast-partner)
// 2. Mid-Market Executives, Corporate L&D, Fractional CAIO/AI CTO & Universities (fractional-cto, corporate-ld, university)
//
// Usage:
//   npm run outreach:pack: <warm-founder|corporate-ld|fractional-cto|podcast-partner|university> "<Name>" "<Organization>" "<Specific Signal>"

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const SEGMENTS = new Set([
  'warm-founder',
  'corporate-ld',
  'fractional-cto',
  'podcast-partner',
  'university',
])

export function buildOutreachCampaignPack({
  segment = 'warm-founder',
  prospectName = 'Alex',
  company = 'Acme Co',
  signal = 'scaling operations with a lean team',
}) {
  const cleanSegment = SEGMENTS.has(segment) ? segment : 'warm-founder'
  const cleanSignal = String(signal).replace(/\u2014/g, ',')

  if (cleanSegment === 'fractional-cto') {
    return {
      segment: cleanSegment,
      offerTarget: '20-Min Executive Scoping Call -> 2-Week Diagnostic or Fractional CAIO / AI CTO',
      emailTouch1: `Subject: Moving ${company} past AI pilots into governed production

Hi ${prospectName},

Saw that ${company} is ${cleanSignal}.

75% of mid-market and scaling companies have AI chat seats right now, yet most stall between isolated demos and governed, cost-predictable production workflows across Sales, Intake, Operations, or product engineering.

Through Agentic Architect, I partner 2 to 4 days a month as a Fractional Chief AI Officer or Fractional AI CTO, starting with a contained 2-week architecture, security, and ROI diagnostic:
https://agenticarchitect.ai/fractional-ai-cto

Open to a brief 20-minute scoping call next week to compare notes on ${company}'s priorities?
https://cal.com/sophia-stein/speaking

Sophia Stein
Boulder, CO`,
      linkedinDm: `Hi ${prospectName}, noticed ${company} is ${cleanSignal}. I partner with mid-market executives and CTOs on governed production AI architecture (https://agenticarchitect.ai/fractional-ai-cto). Happy to compare notes if helpful as you map priorities.`,
      followUpDay5: `Subject: Re: Moving ${company} past AI pilots into governed production

Hi ${prospectName},

Quick follow-up in case a contained starting step is cleaner for ${company}: many leadership teams start with our 2-week Architecture, Security & ROI Diagnostic or a single half-day department rollout before any ongoing cadence.

Overview and direct 20-minute calendar here if useful: https://agenticarchitect.ai/fractional-ai-cto

Sophia`,
    }
  }

  if (cleanSegment === 'corporate-ld') {
    return {
      segment: cleanSegment,
      offerTarget: '20-Min Corporate Scoping Call -> Hands-On Department AI Workshop',
      emailTouch1: `Subject: Practical AI workflow lab for ${company}

Hi ${prospectName},

Noticed ${company} is ${cleanSignal}.

Most leadership teams I speak with have plenty of chat seats, yet lose 6+ hours per person a week because nobody has standardized departmental SOP rules or human-in-the-loop workflow gates.

After training 300+ operators live at Boulder Startup Week, I lead focused half-day and full-day Applied AI Workflow Labs where non-technical and technical staff leave with working automations on tools you already use.

Would a brief 20-minute scoping call next week be useful, or should I send over the 1-page workshop sheet first?

Calendar if easiest: https://cal.com/sophia-stein/speaking
Overview: https://agenticarchitect.ai/boulder

Sophia Stein
Boulder, CO`,
      linkedinDm: `Hi ${prospectName}, loved seeing how ${company} is ${cleanSignal}. I run hands-on corporate AI workflow labs out of Boulder (300+ trained at Boulder Startup Week). Happy to share our unlocked 20/80 Bottleneck Readiness Calculator if useful as your team maps priorities: https://agenticarchitect.ai/starter-kit`,
      followUpDay5: `Subject: Re: Practical AI workflow lab for ${company}

Hi ${prospectName},

Quick follow-up in case a single diagnostic session is cleaner for ${company} first: many COOs and VPs start with a 90-minute Workflow & Cost Roadmap or explore Fractional CAIO support on https://agenticarchitect.ai/fractional-ai-cto.

Calendar here if helpful: https://cal.com/sophia-stein/speaking

Sophia`,
    }
  }

  if (cleanSegment === 'podcast-partner') {
    return {
      segment: cleanSegment,
      offerTarget: 'Guest Live Screen-Share / Podcast -> Free Bottleneck Scorer & 60-Min Workshop',
      emailTouch1: `Subject: Guest workshop / episode idea for ${company}: Why 90% of businesses need clean automations, not fragile AI agents

Hi ${prospectName},

Big fan of how ${company} serves ${cleanSignal}.

Most AI interviews stay abstract. After training 300+ founders at Boulder Startup Week and speaking for Women Who Code, I would love to bring your audience a concrete, zero-jargon walkthrough they can run the same afternoon:

1. Why 90% of growing businesses do not need hallucinating autonomous agents, and which 6 back-office workflows actually stick.
2. The 4-axis Bottleneck Readiness Scorecard for spotting what to automate before adding admin headcount.
3. How to build an AI Chief of Staff with draft-first inbox gates so nothing reckless ever auto-sends.

Every listener gets immediate ungated access to the calculator and templates at https://agenticarchitect.ai/starter-kit.

Open to a 30-to-45 minute episode or live community workshop next month?

Sophia Stein
Boulder, CO`,
      linkedinDm: `Hi ${prospectName}, really enjoy ${company}. Put together an ungated 20/80 AI Bottleneck Readiness Calculator after training 300+ founders at Boulder Startup Week, and thought a practical live teardown could be a great fit for your audience. Happy to send 3 topic bullets if you are booking guests.`,
      followUpDay5: `Subject: Re: Guest workshop / episode idea for ${company}

Hi ${prospectName},

Sharing the live interactive bottleneck calculator we give attendees so you can see the exact format: https://agenticarchitect.ai/starter-kit

Let me know if an episode or live Q&A would be valuable for ${company} this quarter.

Sophia`,
    }
  }

  if (cleanSegment === 'university') {
    return {
      segment: cleanSegment,
      offerTarget: '90-Min Guest Lecture / Studio Lab -> University Lecturer Roster',
      emailTouch1: `Subject: Guest lecture offer for ${company}: Applied AI Workflows & Governance

Dear ${prospectName},

I am an AI systems architect and educator based here in Boulder (300+ founders trained live at Boulder Startup Week, with open-source lab materials at https://agenticarchitect.ai/bsw).

Seeing your work around ${cleanSignal} at ${company}, I would love to offer a practical 60-to-90 minute guest lecture or hands-on student studio lab this semester on either:
- Applied AI Workflows, Unit Economics & Human-in-the-Loop Governance for Business Leaders
- Architecting Practical & Sovereign Agentic Systems (with forkable MIT-licensed repos)

Full draft syllabi and teaching portfolio are posted at https://agenticarchitect.ai/teaching.

Would you have 15 minutes for a coffee in Boulder or a quick call to see if a guest session could be helpful to your students?

Warmly,
Sophia Stein
Boulder, CO`,
      linkedinDm: `Hi ${prospectName}, I am based here in Boulder (300+ trained at Boulder Startup Week) and put together two applied AI workflow syllabi + open-source student labs at https://agenticarchitect.ai/teaching. Would love to offer a guest lecture for your students at ${company} if ever helpful.`,
      followUpDay5: `Subject: Re: Guest lecture offer for ${company}

Dear ${prospectName},

Sharing our open-source 50-slide deck and 17-step student lab from Boulder Startup Week in case it is a useful reference for ${company}: https://agenticarchitect.ai/bsw

Always happy to guest-teach a session whenever your schedule has a slot.

Sophia`,
    }
  }

  // Default: warm-founder (Non-Technical Business Owner Track)
  return {
    segment: 'warm-founder',
    offerTarget: 'Free 60-Min Live Build -> Agentic Architect Lab or Custom Bottleneck Sprint',
    emailTouch1: `Subject: Quick workflow idea for ${company}

Hi ${prospectName},

Saw that ${company} is ${cleanSignal}.

I just unlocked our interactive 20/80 Bottleneck Readiness Calculator and Pre-Call Lead Dossier blueprint that we use to help business owners recover 8 to 15 hours a week across lead intake, pre-call research, and draft-first inbox follow-up without hiring or coding:
https://agenticarchitect.ai/starter-kit

I am also hosting a free live 60-minute screen-share build walking through how to wire a working AI Chief of Staff workflow step by step. Save a free seat (or grab the replay) here:
https://cal.com/sophia-stein/masterclass

Sophia`,
    linkedinDm: `Hi ${prospectName}, loved seeing ${company} ${cleanSignal}. Unlocked our interactive 20/80 AI Bottleneck Calculator free at https://agenticarchitect.ai/starter-kit and running a free 60-min live non-coder build soon (https://cal.com/sophia-stein/masterclass) if you want to join.`,
    followUpDay5: `Subject: Re: Quick workflow idea for ${company}

Hi ${prospectName},

If you already have a specific operational bottleneck at ${company} you want solved without trial-and-error, you can explore the Agentic Architect Lab (https://agenticarchitect.ai/courses) or book a 20-minute 1-Bottleneck Discovery Call here:
https://cal.com/sophia-stein/scoping

Sophia`,
  }
}

function runCli() {
  const [
    ,
    ,
    segment = 'warm-founder',
    prospectName = 'Alex',
    company = 'Acme Co',
    signal = 'scaling lean operations',
  ] = process.argv
  const pack = buildOutreachCampaignPack({ segment, prospectName, company, signal })
  const safeSlug = `${pack.segment}-${company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const outDir = path.join(ROOT, 'content', 'outreach')
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, `${safeSlug}.md`)

  const md = `# Outreach Pack: ${prospectName} (${company})
- **Segment:** ${pack.segment}
- **Target Funnel Path:** ${pack.offerTarget}

## Email Touch 1 (Day 1 · Drop in Gmail Drafts, Review & Send)
\`\`\`
${pack.emailTouch1}
\`\`\`

## LinkedIn Connection / DM Touch (Day 2)
\`\`\`
${pack.linkedinDm}
\`\`\`

## Polite 5-Day Follow-Up (Day 6 · Only If No Reply)
\`\`\`
${pack.followUpDay5}
\`\`\`
`
  fs.writeFileSync(outPath, md)
  console.log(`[outreach:pack] wrote personalized sequence -> ${outPath}`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli()
}

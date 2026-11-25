// Generates research-first, human-reviewed multi-channel outreach packs
// across Sophia's 4 highest-ROI monetization segments (zero em-dashes, zero bot cliches).
//
// Usage:
//   npm run outreach:pack -- <warm-founder|corporate-ld|podcast-partner|university> "<Name>" "<Organization>" "<Specific Signal>"

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const SEGMENTS = new Set(['warm-founder', 'corporate-ld', 'podcast-partner', 'university'])

export function buildOutreachCampaignPack({
  segment = 'warm-founder',
  prospectName = 'Alex',
  company = 'Acme Co',
  signal = 'scaling operations with a lean team',
}) {
  const cleanSegment = SEGMENTS.has(segment) ? segment : 'warm-founder'
  const cleanSignal = String(signal).replace(/\u2014/g, ',')

  if (cleanSegment === 'corporate-ld') {
    return {
      segment: cleanSegment,
      offerTarget: '$1,500 Creditable VIP Audit -> $7,500 to $15,000 Corporate AI Intensive',
      emailTouch1: `Subject: Practical AI workflow lab for ${company}

Hi ${prospectName},

Noticed ${company} is ${cleanSignal}.

Most leadership teams I speak with here in Colorado and across tech/healthcare have plenty of chat seats, yet lose 6+ hours per person a week because nobody has codified a shared company Brand & SOP Brain or human-in-the-loop workflow gates.

After advising enterprise teams at McKinsey and training 300+ operators live at Boulder Startup Week, I run focused half-day ($7,500) and full-day ($15,000) Applied AI Workflow Intensives where non-technical and technical staff leave with working automations on tools you already use.

Would a brief 20-minute intake next week be useful, or should I send over the 1-page workshop sheet first?

Calendar if easiest: https://cal.com/sophia-stein/speaking
1-page overview: https://agenticarchitect.ai/boulder

Sophia Stein
Columbia CS · ex-McKinsey
*(Note: I also work in AI Systems & Enablement at Google; all external workshops and advisory work are conducted strictly in my personal capacity, views my own.)*`,
      linkedinDm: `Hi ${prospectName}, loved seeing how ${company} is ${cleanSignal}. I run hands-on corporate AI workflow labs out of Boulder (Columbia CS, ex-McKinsey, 300+ trained at BSW). Happy to share our unlocked 20/80 Task Readiness Scorecard if useful as your team maps Q1 priorities: https://agenticarchitect.ai/starter-kit`,
      followUpDay5: `Subject: Re: Practical AI workflow lab for ${company}

Hi ${prospectName},

Quick follow-up in case a smaller first step is cleaner for ${company}: many COOs and VPs start with a 90-minute VIP Workflow & Cost Audit ($1,500, 100% credited if you book a team workshop within 30 days).

Details and direct calendar here if helpful: https://cal.com/sophia-stein/audit

Sophia`,
    }
  }

  if (cleanSegment === 'podcast-partner') {
    return {
      segment: cleanSegment,
      offerTarget: 'Guest Live Screen-Share / Podcast -> Free Starter Kit & 60-Min Masterclass Registrations',
      emailTouch1: `Subject: Guest workshop / episode idea for ${company}: The 90-Minute AI Task Audit

Hi ${prospectName},

Big fan of how ${company} serves ${cleanSignal}.

Most AI interviews stay abstract. After training 300+ founders at Boulder Startup Week and speaking for Women Who Code, I would love to bring your audience a concrete, zero-jargon walkthrough they can run the same afternoon:

1. Why blank-box prompting wastes 6 hours/week (and how a 1-page voice.md Brand Brain fixes it in 20 minutes).
2. The 4-axis Task Readiness Scorecard for spotting which 20% of business chores to automate before hiring a $65k/yr coordinator.
3. How to keep software bills near zero while protecting client data.

Every listener gets immediate ungated access to the templates at https://agenticarchitect.ai/starter-kit.

Open to a 30-to-45 minute episode or live community workshop next month?

Sophia Stein
Columbia CS · ex-McKinsey · Boulder, CO
*(Personal capacity; all views my own.)*`,
      linkedinDm: `Hi ${prospectName}, really enjoy ${company}. Put together an ungated Brand Brain + 20/80 AI Task Scorecard after training 300+ founders at Boulder Startup Week, and thought a practical live teardown could be a great fit for your audience. Happy to send 3 topic bullets if you are booking guests!`,
      followUpDay5: `Subject: Re: Guest workshop / episode idea for ${company}

Hi ${prospectName},

Sharing the live interactive scorecard we give attendees so you can see the exact format: https://agenticarchitect.ai/starter-kit

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

I am an AI systems architect and educator based here in Boulder (Columbia B.S. in Computer Science, ex-McKinsey, and 300+ founders trained live at Boulder Startup Week, with open-source lab materials at https://agenticarchitect.ai/bsw).

Seeing your work around ${cleanSignal} at ${company}, I would love to offer a practical 60-to-90 minute guest lecture or hands-on student studio lab this semester on either:
- Applied AI Workflows, Unit Economics & Human-in-the-Loop Governance for Business Leaders
- Architecting Practical & Sovereign Agentic Systems (with forkable MIT-licensed repos)

Full draft syllabi and teaching portfolio are posted at https://agenticarchitect.ai/teaching.

Would you have 15 minutes for a coffee in Boulder or a quick call to see if a guest session could be helpful to your students?

Warmly,
Sophia Stein
*(Writing and teaching in my personal capacity; all views and materials are my own.)*`,
      linkedinDm: `Hi ${prospectName}, I am based here in Boulder (Columbia CS, ex-McKinsey, 300+ trained at BSW) and put together two applied AI workflow syllabi + open-source student labs at https://agenticarchitect.ai/teaching. Would love to offer a guest lecture for your students at ${company} if ever helpful!`,
      followUpDay5: `Subject: Re: Guest lecture offer for ${company}

Dear ${prospectName},

Sharing our open-source 50-slide deck and 17-step student lab from Boulder Startup Week in case it is a useful reference for ${company}: https://agenticarchitect.ai/bsw

Always happy to guest-teach a session whenever your schedule has a slot.

Sophia`,
    }
  }

  // Default: warm-founder
  return {
    segment: 'warm-founder',
    offerTarget: 'Free 60-Min Live Masterclass -> $5,997 Founding Cohort Accelerator',
    emailTouch1: `Subject: Quick workflow idea for ${company} (+ free Brand Brain kit)

Hi ${prospectName},

Saw that ${company} is ${cleanSignal}.

I just published the exact 20-minute Brand Brain (\`voice.md\`) template and interactive 20/80 Task Readiness Calculator we use to help lean businesses reclaim 8 to 12 hours a week across inbox triage, pre-call research, and content without hiring or coding:
https://agenticarchitect.ai/starter-kit

I am also hosting a free live 60-minute screen-share Masterclass walking through all six business workflows step by step. If you want to join live (or grab the replay), you can save a free seat directly here:
https://cal.com/sophia-stein/masterclass

Sophia`,
    linkedinDm: `Hi ${prospectName}! Loved seeing ${company} ${cleanSignal}. Just unlocked our 20-minute Brand Brain (voice.md) + interactive AI Task Readiness Calculator free at https://agenticarchitect.ai/starter-kit and running a free 60-min live walkthrough soon (https://cal.com/sophia-stein/masterclass) if you want to join!`,
    followUpDay5: `Subject: Re: Quick workflow idea for ${company}

Hi ${prospectName},

If you already know you want hands-on help installing all six AI systems across ${company} over 8 weeks (for a fraction of a $65k/yr ops hire), Founding Cohort spots are open for The Agentic Business Accelerator:
https://agenticarchitect.ai/accelerator

Happy to jump on a 20-minute fit call anytime: https://cal.com/sophia-stein/accelerator

Sophia`,
  }
}

function runCli() {
  const [, , segment = 'warm-founder', prospectName = 'Alex', company = 'Acme Co', signal = 'scaling lean operations'] =
    process.argv
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

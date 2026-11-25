import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Free Live 60-Min AI Workflow Masterclass',
  description:
    'How lean businesses hook up a 1-page Brand Brain and 6 time-saving AI workflows without hiring or coding. Free 60-minute live training with Sophia Stein.',
  alternates: { canonical: '/masterclass' },
}

const AGENDA = [
  {
    window: 'Minutes 00 to 20',
    title: 'The 1-Page Brand Brain (voice.md + icp.md)',
    detail:
      'Stop prompting from a blank chat window. Build a portable voice and customer context file so every draft email, proposal, and post sounds like you on your best day.',
    outcome: 'Live screen demo + copy-paste template',
  },
  {
    window: 'Minutes 20 to 40',
    title: 'Automated Operations & Lead Follow-Up Flow',
    detail:
      'Watch how inbox triage, pre-call research briefs, and meeting follow-ups connect to your existing calendar and docs with a safe human-approval step.',
    outcome: 'Reclaims 6 to 10 hrs/week per operator',
  },
  {
    window: 'Minutes 40 to 60',
    title: 'Smart Cost Control, Data Privacy & Live Q&A',
    detail:
      'How to keep monthly software spend near zero using open and free-tier tools, protect sensitive client files, and pick the right 6 workflows for your business.',
    outcome: '90-day implementation roadmap + open Q&A',
  },
]

const WHO_ITS_FOR = [
  'Founders and small business owners tired of drowning in inbox, scheduling, and content busywork',
  'COOs, agency leads, and operators who want repeatable SOPs before adding another $65,000/yr hire',
  'Consultants and service businesses ready to turn one weekly idea into consistent multi-channel visibility',
]

export default function MasterclassPage() {
  return (
    <div className="space-y-14">
      {/* Split Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="online">Free Live 60-Min Masterclass</Badge>
            <span className="font-mono text-xs text-muted">
              Live Screen Walkthrough + Templates Included
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-fg leading-tight">
            How Lean Businesses Hook Up a Brand Brain &amp; 6 Time-Saving AI Workflows Without Hiring or Coding
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed">
            In 60 practical minutes, you will see the exact systems I teach founders and corporate
            teams to reclaim 10+ hours a week using tools you already own. Zero fluff, zero complex
            code, and immediate templates you keep.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              variant="primary"
              size="lg"
              href={SITE_CONFIG.cal.masterclass}
            >
              Save My Free Masterclass Seat →
            </Button>
            <Button variant="outline" size="lg" href="/starter-kit">
              Open Pre-Workshop Workbook (voice.md)
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {SITE_CONFIG.credentials.map(cred => (
              <span
                key={cred}
                className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
              >
                {cred}
              </span>
            ))}
          </div>
        </div>

        <Card className="lg:col-span-5 p-6 space-y-5 bg-surface">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Your 2-Step Onboarding
            </span>
            <span className="font-mono text-xs text-online font-semibold">$0 Cost</span>
          </div>

          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white font-mono text-xs font-bold">
                1
              </span>
              <div>
                <p className="font-semibold text-fg">Reserve your live seat &amp; calendar invite</p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  Request the next live Zoom link and join the {SITE_CONFIG.newsletterName} list so
                  you receive the slide deck and replay automatically.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-mono text-xs font-bold">
                2
              </span>
              <div>
                <p className="font-semibold text-fg">
                  Complete your 10-minute Pre-Masterclass Brand Brain Workbook (`voice.md`)
                </p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  Open the unlocked Starter Kit before the call so you can plug your real business
                  into the live exercises as we build together.
                </p>
                <Link
                  href="/starter-kit"
                  className="inline-block mt-1.5 text-xs font-semibold text-accent hover:underline"
                >
                  Open Step 2 Workbook →
                </Link>
              </div>
            </li>
          </ol>

          <div className="rounded-xl border border-border bg-white p-4 space-y-1.5">
            <p className="text-xs font-semibold text-fg">Taught live by Sophia Stein</p>
            <p className="text-xs text-muted leading-relaxed">
              Columbia CS, ex-McKinsey, 300+ founders trained live at Boulder Startup Week, and{' '}
              {SITE_CONFIG.personalCapacityNote}
            </p>
          </div>
        </Card>
      </section>

      {/* 60-Min Live Screen Demo Breakdown */}
      <section className="space-y-5">
        <PageHeader
          meta="60-Min Live Agenda"
          title="Three Live Demos, Zero Slide Filler"
          description="Every block shows a real working system you can copy the same afternoon."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AGENDA.map(item => (
            <Card key={item.window} className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                  {item.window}
                </span>
                <h2 className="text-lg font-bold text-fg">{item.title}</h2>
                <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
              </div>
              <p className="font-mono text-xs font-medium text-online pt-3 border-t border-border">
                ✓ {item.outcome}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Who Should Attend + Bridge to Accelerator */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <Card className="lg:col-span-7 p-6 md:p-8 space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Built For Operators
          </p>
          <h2 className="text-2xl font-bold text-fg">Who Gets the Most Out of This Session</h2>
          <ul className="space-y-3 text-sm text-muted leading-relaxed">
            {WHO_ITS_FOR.map(point => (
              <li key={point} className="flex items-start gap-2.5">
                <span className="text-online font-bold mt-0.5">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-5 p-6 md:p-8 bg-surface flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-rig">
              Want Done-With-You Implementation?
            </span>
            <h2 className="text-xl font-bold text-fg">Skip Straight to the 8-Week Accelerator</h2>
            <p className="text-sm text-muted leading-relaxed">
              If you already know you want Sophia to help you and your ops lead install all 6
              business AI systems directly into your company over 8 weeks, explore the flagship
              cohort now.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="md" href="/accelerator">
              Explore the Accelerator →
            </Button>
            <Button variant="outline" size="md" href={SITE_CONFIG.cal.scoping}>
              Book a Cohort Fit Call
            </Button>
          </div>
        </Card>
      </section>

      <NewsletterSignup
        source="masterclass"
        headline="Get Masterclass Dates & Weekly Workflow Blueprints"
        sub="Subscribe free on Substack to get notified of the next live 60-minute session plus copy-paste business automations every week."
      />
    </div>
  )
}

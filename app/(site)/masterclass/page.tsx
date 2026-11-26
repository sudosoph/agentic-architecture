import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { AiOrgChartMapper } from '@/components/site/ai-org-chart-mapper'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Free 60-Min Live AI Workflow Workshop + 5-Day Prompt-to-System Challenge',
  description:
    'Go from ChatGPT prompting to a working business automation without writing code. Join Sophia Stein live for 60 minutes plus our free 5-day Prompt-to-System walkthrough.',
  alternates: { canonical: '/masterclass' },
}

const AGENDA = [
  {
    window: 'Minutes 00 to 20',
    title: '2026 Model Matrix & Productive Friction Over Ad-Hoc Chat',
    detail:
      'Where frontier and open-weight models actually stand today, why lazy 1-line prompts manufacture hallucinations, and how Socratic interview Skills extract tribal SOPs first.',
    outcome: 'Unlocked Module 1.1 + Socratic SKILL.md Template',
  },
  {
    window: 'Minutes 20 to 40',
    title: 'Live Architecture Build: Bespoke Harnesses & Draft Gates',
    detail:
      'Watch a live walkthrough connecting folder-based workspaces, best-of-breed Search/OCR/Calendar connectors, and Level-2 Draft-First approval gates without vendor lock-in.',
    outcome: 'Working Blueprint + HTML Presentation Deck (/slides/masterclass-2026.html)',
  },
  {
    window: 'Minutes 40 to 60',
    title: 'Department Build-vs-Buy, Privacy Tiers & Rollout Roadmap',
    detail:
      'Evaluating vertical AI vs. bespoke builds across Marketing, Finance, Legal, and Ops, setting Green/Amber/Red data boundaries, and Q&A on cohorts, corporate labs, and custom builds.',
    outcome: '5-Day Applied AI Architecture Primer + Live Q&A',
  },
]

const WHO_ITS_FOR = [
  'Non-technical founders, agency owners, and service businesses tired of manual follow-ups, proposals, and inbox busywork',
  'COOs, Chiefs of Staff, and operators who want dependable automations running before adding another $65,000/yr coordinator hire',
  'Clinics, advisory firms, and leadership teams that want human approval gates and clear data boundaries rather than fragile bots',
]

const MASTERCLASS_FAQS = [
  {
    q: 'Do I need to know how to code to build the workflows shown in this session?',
    a: 'No. Every build uses plain-English SOP rules and visual workspace connectors that non-technical owners, EAs, and Ops Managers can run and edit themselves.',
  },
  {
    q: 'What happens after the free 60-minute workshop and 5-day challenge?',
    a: 'Most attendees take the templates and ship their first automation solo. If you want to go deeper, you can join our self-paced AI Workflow Academy ($297), enroll with your operator in our guided 6-System Cohort (from $1,497), or book a free 20-minute 1-Bottleneck Call to have us build a custom workflow for you.',
  },
  {
    q: 'What if I already have a specific bottleneck I want scoped right away?',
    a: 'Skip the wait: open the unlocked Bottleneck & SOP Kit immediately, book a free 20-minute 1-Bottleneck Discovery Call, or schedule a 90-minute Workflow & Cost Roadmap session (from $750, credited toward any custom build).',
  },
]

export default function MasterclassPage() {
  const masterclassLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_CONFIG.siteUrl}/masterclass#course`,
        name: 'Prompt-to-System: Free 60-Min Live AI Workflow Workshop & 5-Day Challenge',
        description:
          'Free 60-minute live build and 5-day Prompt-to-System challenge for non-technical business owners and operators automating inbox, lead prep, and operations without coding.',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
          url: SITE_CONFIG.siteUrl,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${SITE_CONFIG.siteUrl}/masterclass`,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: MASTERCLASS_FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(masterclassLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-14">
        {/* Split Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="online">Free 60-Min Live Workshop + 5-Day Challenge</Badge>
              <span className="font-mono text-xs text-muted">
                Every Click Shown · Zero Coding Required
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-fg leading-tight">
              Beyond Ad-Hoc Prompting: Productive Friction, Bespoke AI Harnesses &amp; Running Your Org on AI (60-Min Live Briefing)
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Most teams buy AI chat seats and stall before measurable production ROI. In 60
              minutes, learn our late-2026 model and privacy matrix, see how Interview-First Skills
              eliminate hallucinations, and inspect when to buy vertical AI versus composing your
              own bespoke stack.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="primary" size="lg" href={SITE_CONFIG.cal.masterclass}>
                Save My Free Live Seat →
              </Button>
              <Button variant="outline" size="lg" href="/slides/masterclass-2026.html">
                Preview 2026 Briefing Deck ↗
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
                What You Get Free
              </span>
              <span className="font-mono text-xs text-online font-semibold">$0 Cost</span>
            </div>

            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white font-mono text-xs font-bold">
                  1
                </span>
                <div>
                  <p className="font-semibold text-fg">60-minute live build + replay</p>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">
                    Grab the next live session invite and receive the 5-day Prompt-to-System lessons
                    and replay via {SITE_CONFIG.newsletterName}.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-mono text-xs font-bold">
                  2
                </span>
                <div>
                  <p className="font-semibold text-fg">
                    Unlocked 20/80 Bottleneck Scorecard &amp; Lead Dossier Blueprint
                  </p>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">
                    Score your single biggest operational bottleneck in 10 minutes before the live
                    build starts.
                  </p>
                  <Link
                    href="/starter-kit"
                    className="inline-block mt-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    Open Workbook Now →
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

        {/* Interactive Back-Office Bottleneck Map */}
        <AiOrgChartMapper />

        {/* 60-Min Live Screen Demo Breakdown */}
        <section className="space-y-5">
          <PageHeader
            meta="60-Min Live Agenda"
            title="Three Live Builds, Zero Slide Filler"
            description="Every 20-minute block shows a practical business automation you can put to work the same week."
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

        {/* Don't Wait Bridge + Who Should Attend */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <Card className="lg:col-span-7 p-6 md:p-8 space-y-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Built For Non-Technical Operators
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
                Want Guided Implementation or a Custom Build?
              </span>
              <h2 className="text-xl font-bold text-fg">
                Explore Courses, Cohort, or a Free 20-Min Bottleneck Call
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                Move at your own pace in our self-paced Academy ($297), bring your EA or Ops Lead
                into our guided 6-System Cohort, or book a free 20-minute call to scope a custom
                workflow sprint.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="md" href="/accelerator">
                See 6-System Cohort →
              </Button>
              <Button variant="outline" size="md" href={SITE_CONFIG.cal.scoping}>
                Free 20-Min Bottleneck Call
              </Button>
            </div>
          </Card>
        </section>

        {/* Buyer FAQ for Search & AI Answer Engines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-fg">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MASTERCLASS_FAQS.map(faq => (
              <Card key={faq.q} className="p-6 space-y-2">
                <h3 className="text-sm font-bold text-fg leading-snug">{faq.q}</h3>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>

        <NewsletterSignup
          source="masterclass"
          headline="Get Workshop Dates & Weekly Prompt-to-System Playbooks"
          sub="Subscribe free on Substack to receive the 5-day starter walkthrough plus practical automation blueprints every week."
        />
      </div>
    </>
  )
}

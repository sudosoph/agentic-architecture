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
  title: 'Free Live 60-Min AI Org Chart Briefing for Business Owners',
  description:
    'See how $1M to $50M owners map an AI Org Chart, set up a 1-page Company Context Vault (voice.md), and delegate 6 back-office roles to AI workflows without hiring or coding.',
  alternates: { canonical: '/masterclass' },
}

const AGENDA = [
  {
    window: 'Minutes 00 to 20',
    title: 'The AI Org Chart & Company Context Vault (voice.md + icp.md)',
    detail:
      'Stop prompting from a blank chat window. Map which jobs in your firm belong to humans vs. AI workflows, and build a 1-page Context Vault so every draft sounds like you.',
    outcome: 'Live AI Org Chart + copy-paste voice.md template',
  },
  {
    window: 'Minutes 20 to 40',
    title: 'AI Chief of Staff: Inbox, Calendar & Pre-Call Dossiers',
    detail:
      'Watch how inbound lead research, meeting prep briefs, and follow-up drafts connect to your existing workspace with a 10-second human approval gate.',
    outcome: 'Reclaims 10 to 15 hrs/week of founder & ops admin',
  },
  {
    window: 'Minutes 40 to 60',
    title: 'Data Privacy, Cost Guardrails & Live Q&A',
    detail:
      'How to keep sensitive client files off public training pipelines, avoid bloated agency retainers, and choose the first 2 workflows to ship this week.',
    outcome: '90-day implementation roadmap + open Q&A',
  },
]

const WHO_ITS_FOR = [
  'Founders, agency owners, and service businesses tired of carrying repetitive follow-ups and content busywork in their heads',
  'COOs, Chiefs of Staff, and operators who want repeatable AI workflows running before adding another $65,000/yr coordinator hire',
  'Clinics, advisory firms, and leadership teams that care about real data privacy and human sign-off rather than black-box bots',
]

const MASTERCLASS_FAQS = [
  {
    q: 'Do I need to know how to code to build the workflows in this Masterclass?',
    a: 'No. Every build in the 60-minute session uses plain-English markdown files (voice.md and icp.md) and visual workspace connectors your team or Executive Assistant can maintain without writing software.',
  },
  {
    q: 'What is the difference between this free Masterclass and the Agentic Business Accelerator?',
    a: 'The free 60-minute Masterclass shows the complete AI Org Chart framework live and gives you the Starter Kit templates to build your first workflow solo. The Agentic Business Accelerator ($5,997 Founding / $8,997 Standard) is our 8-week Done-With-You implementation program where Sophia helps you and your Ops Lead/EA install all 6 systems directly inside your business.',
  },
  {
    q: 'What if I cannot wait for the next live session?',
    a: 'You can open the unlocked Starter Kit workbook immediately after registering, book a $1,500 VIP 90-Minute Workflow & Cost Audit (100% credited toward the Accelerator within 30 days), or schedule a 20-minute Cohort Fit Call today.',
  },
]

export default function MasterclassPage() {
  const masterclassLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_CONFIG.siteUrl}/masterclass#course`,
        name: 'The AI Org Chart Masterclass: Brand Brain & 6 Business Workflows',
        description:
          'Free 60-minute live training for founders and operators on mapping an AI Org Chart, building a portable Brand Brain (voice.md), and automating inbox, lead prep, and operations without coding.',
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
              <Badge variant="online">Free Live 60-Min Masterclass</Badge>
              <span className="font-mono text-xs text-muted">
                Live Screen Walkthrough + AI Org Chart Workbook
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-fg leading-tight">
              The AI Org Chart Briefing: How Business Owners Install 6 Back-Office AI Roles Without Adding Payroll or Coding
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Humans belong on high-trust client work, dealmaking, and leadership. In 60 live
              minutes, see the exact AI Org Chart and back-office workflows we install for $1M to
              $50M owners and firms to reclaim 10 to 15 hours a week.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="primary" size="lg" href={SITE_CONFIG.cal.masterclass}>
                Save My Free Briefing Seat →
              </Button>
              <Button variant="outline" size="lg" href="/starter-kit">
                Start Now: Open Context Vault (voice.md)
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
                    Grab the next live session link and join the {SITE_CONFIG.newsletterName} list so
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
                    Open the unlocked Starter Kit before we meet so you can map your own business
                    roles live during the walkthrough.
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

        {/* Interactive AI Org Chart Mapper */}
        <AiOrgChartMapper />

        {/* 60-Min Live Screen Demo Breakdown */}
        <section className="space-y-5">
          <PageHeader
            meta="60-Min Live Agenda"
            title="Three Live Builds, Zero Slide Filler"
            description="Every 20-minute block shows a real working business workflow you can deploy the same week."
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
              Built For Busy Decision-Makers
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
                Do Not Want to Wait for the Next Live Date?
              </span>
              <h2 className="text-xl font-bold text-fg">
                Skip Straight to the 8-Week Accelerator
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                Ready for Sophia to work directly with you and your Ops Lead or EA to install all 6
                AI systems across your business? Explore the cohort or book a 100%-creditable $1,500
                VIP Audit this week.
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
          headline="Get Masterclass Dates & Weekly AI Org Chart Blueprints"
          sub="Subscribe free on Substack to get notified of the next live 60-minute session plus copy-paste business workflows every week."
        />
      </div>
    </>
  )
}

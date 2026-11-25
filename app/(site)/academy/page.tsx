import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AcademySeatCalculator } from '@/components/site/academy-seat-calculator'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Practical AI Workflow Academy ($297) · Build Your AI Chief of Staff Without Code',
  description:
    'Self-paced business automation course for non-technical founders, EAs, and ops managers: wire your AI Chief of Staff, pre-call dossiers, inbox triage, and client onboarding in under 5 hours.',
  alternates: { canonical: '/academy' },
}

const MODULES = [
  {
    num: 'Module 01',
    title: 'Bottleneck Audit & Company Operating Rules',
    duration: '35 mins',
    body: 'Score your weekly bottlenecks so you never automate the wrong task, and document your pricing, qualification, and communication rules once.',
  },
  {
    num: 'Module 02',
    title: 'Your AI Chief of Staff & Calendar Prep Pipeline',
    duration: '50 mins',
    body: 'Connect calendar bookings and meeting notes so every external call triggers an account dossier 30 minutes ahead and logs open commitments afterward.',
  },
  {
    num: 'Module 03',
    title: 'Draft-First Inbox Triage & 5-Day Deal Follow-Ups',
    duration: '50 mins',
    body: 'Sort repetitive inquiries, stage accurate replies in Drafts, and automate polite Day-2 and Day-5 follow-ups with a 10-second human approval click.',
  },
  {
    num: 'Module 04',
    title: 'Discovery-to-Proposal & Client Onboarding Automation',
    duration: '55 mins',
    body: 'Turn call recordings and intake forms into scoped client proposals, welcome packets, and internal delivery checklists the same afternoon.',
  },
  {
    num: 'Module 05',
    title: 'No-Code Workspace Connectors & Internal SOP Search',
    duration: '50 mins',
    body: 'Every click shown across modern workspace connectors and automation workflows so staff can answer policy and SOP questions without pinging the owner.',
  },
  {
    num: 'Module 06',
    title: 'Client Data Privacy, Scoped Permissions & Cost Ceilings',
    duration: '35 mins',
    body: 'Lock down tool permissions, keep confidential client records off public model training, and eliminate overlapping monthly software subscriptions.',
  },
]

const ACADEMY_FAQS = [
  {
    q: 'Is this built for non-technical business owners and assistants?',
    a: 'Yes. Zero Python or software engineering is required. Every lesson shares the screen click-by-click on everyday business tools so you, your Executive Assistant, or your Ops Manager can build and maintain each workflow confidently.',
  },
  {
    q: 'What if I buy the $297 Academy and decide I want Sophia to build a workflow for us instead?',
    a: 'Every dollar of your $297 Academy enrollment credits directly toward our Guided 6-System Cohort (from $1,497) or a Done-For-You Custom Bottleneck Sprint (from $2,500) whenever you want hands-on help.',
  },
  {
    q: 'Are you looking for corporate department training or a Fractional Chief AI Officer instead?',
    a: 'For organizations with 25 to 500+ staff or engineering teams seeking a Fractional CAIO, Fractional AI CTO, or private corporate workshop, visit our dedicated Enterprise & Fractional hub at /fractional-ai-cto.',
  },
]

export default function AcademyPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_CONFIG.siteUrl}/academy#course`,
        name: 'Practical AI Workflow Academy: Build Your AI Chief of Staff & 6 Business Automations',
        description:
          'Self-paced 6-module business automation course for non-technical owners, EAs, and operations leads.',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
          url: SITE_CONFIG.siteUrl,
        },
        offers: {
          '@type': 'Offer',
          price: '297',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: SITE_CONFIG.cal.academy,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: ACADEMY_FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ld).replace(/</g, '\\u003c'),
        }}
      />
      <div className="space-y-14">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="online">Non-Technical Business Owner Track · Self-Paced Course</Badge>
            <Link href="/fractional-ai-cto" className="font-mono text-xs text-accent hover:underline">
              Mid-market executive or CTO looking for Fractional AI Leadership? Go here →
            </Link>
          </div>

          <PageHeader
            meta="6 Practical Modules · Under 5 Hours · Every Click Shown"
            title="Build Your AI Chief of Staff &amp; First 6 Business Automations"
            description="The practical, zero-coding implementation course for business owners, Executive Assistants, and Ops Leads who want dependable automations running this week without paying a $20,000 agency."
          />
        </div>

        {/* Split Curriculum + Interactive Team Seat Calculator */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-bold text-fg">Inside the 6-Module Curriculum</h2>
            <div className="grid grid-cols-1 gap-4">
              {MODULES.map(mod => (
                <Card key={mod.num} className="p-5 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="font-bold text-accent">{mod.num}</span>
                    <span className="text-muted">{mod.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-fg">{mod.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{mod.body}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <AcademySeatCalculator />
          </div>
        </section>

        {/* Clean Upsell Bridge to Done-For-You Sprint */}
        <Card className="p-6 md:p-8 bg-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-rig">
              Short on Time? Have Us Build 1 Bottleneck For You Instead
            </p>
            <h2 className="text-xl font-bold text-fg">
              Prefer a Done-For-You Automation Sprint Inside Your Accounts?
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Book a free 20-minute 1-Bottleneck Discovery Call to scope a custom build (from
              $2,500) or schedule a single-session $750 Workflow &amp; Cost Roadmap.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="md" href={SITE_CONFIG.cal.scoping}>
              Free 20-Min Bottleneck Call →
            </Button>
            <Button variant="outline" size="md" href="/work-with-me">
              Compare Custom Sprints
            </Button>
          </div>
        </Card>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-fg">Academy &amp; Team Seat FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ACADEMY_FAQS.map(faq => (
              <Card key={faq.q} className="p-6 space-y-2">
                <h3 className="text-sm font-bold text-fg leading-snug">{faq.q}</h3>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Work With Sophia · Custom Automation Sprints, Corporate Training & Advisory',
  description:
    'Book a free 20-minute 1-Bottleneck Audit Call, schedule a $750 single-session Workflow Roadmap, or scope a corporate AI workshop or technical advisory engagement.',
  alternates: { canonical: '/work-with-me' },
}

const PROCESS_STEPS = [
  {
    step: '01 · Intake',
    title: 'Share 1 Bottleneck',
    body: 'Answer 3 short questions when booking so we know what manual task is slowing your team down before we meet.',
  },
  {
    step: '02 · Discovery (20 Mins)',
    title: 'Free 1-Process Audit Call',
    body: 'We inspect one workflow together on Zoom. You leave knowing candidly whether it is worth automating and what to build first.',
  },
  {
    step: '03 · Clear Proposal',
    title: 'Fixed Scope & Timeline',
    body: 'No open-ended hourly billing or surprise retainers. You receive a 1-page milestone scope tailored to your workflow or team size.',
  },
  {
    step: '04 · Ship & Handoff',
    title: 'Built Inside Your Accounts',
    body: 'We ship cleanly inside your own workspace with recorded SOPs and live staff handoff so you own 100% of the system.',
  },
]

const PATH_CARDS = [
  {
    badge: 'Single Session · 100% Credited Toward a Sprint',
    badgeVariant: 'online' as const,
    title: '90-Minute Workflow & Cost Roadmap',
    price: 'From $750 (One-Time Session + 48-Hr Written Plan)',
    detail:
      'Want a concrete architecture and ROI plan before committing to a build? In one 90-minute teardown we audit your repetitive workflows, cut overlapping SaaS spend, and hand you a step-by-step build blueprint within 48 hours.',
    standard:
      'Scope Standard: Includes recorded session, written priority roadmap, and 100% fee credit if you commission a custom sprint within 30 days.',
    href: SITE_CONFIG.cal.audit,
    cta: 'Book 90-Min Roadmap ($750) →',
  },
  {
    badge: 'Done-For-You · One Bottleneck First',
    badgeVariant: 'rig' as const,
    title: 'Custom Bottleneck Automation Sprint',
    price: 'Custom-Scoped from $2,500 (After 20-Min Call)',
    detail:
      'Solve one high-friction bottleneck costing your team 5 to 20+ hours a week: client intake, pre-call dossiers, draft-first inbox triage, document extraction, or CRM follow-up. Engineered cleanly with human sign-off gates.',
    standard:
      'Ownership Standard: Built inside your own accounts (zero contractor lock-in) with recorded walkthroughs and post-launch tuning.',
    href: SITE_CONFIG.cal.scoping,
    cta: 'Book Free 20-Min Bottleneck Call →',
  },
  {
    badge: 'Executive & Enterprise Track · Mid-Market & Funded Teams',
    badgeVariant: 'tag' as const,
    title: 'Fractional CAIO, Fractional AI CTO & Corporate Training',
    price: 'Custom-Scoped Monthly Cadence, 2-Wk Diagnostic, or Team Lab',
    detail:
      'For organizations past the demo and stuck before production: part-time Fractional Chief AI Officer or Fractional AI CTO leadership (2 to 4 days/mo), plus hands-on department workshops in Boulder, Denver, and nationwide.',
    standard:
      'Quality Bar: Strategy and production architecture in one seat (Columbia CS + ex-McKinsey), tailored to HIPAA, SOC2, and enterprise security rules.',
    href: '/fractional-ai-cto',
    cta: 'Explore Fractional CAIO & AI CTO →',
    secondaryHref: SITE_CONFIG.cal.speaking,
    secondaryCta: 'Book 20-Min Executive Call',
  },
  {
    badge: 'DIY & Guided Learning · Not Ready for Custom Builds?',
    badgeVariant: 'online' as const,
    title: 'Courses & 6-System Implementation Cohort',
    price: 'Free Challenge · $297 Academy · Cohort from $1,497',
    detail:
      'Prefer to learn the workflows yourself or train an in-house EA or Ops Manager? Start free in our 60-minute live workshop, grab our self-paced AI Workflow Academy ($297), or join our next small-group cohort.',
    standard:
      'Team Friendly: Cohort enrollment includes a free second seat for your Executive Assistant, Chief of Staff, or Ops Lead.',
    href: '/accelerator',
    cta: 'Explore Cohort & Courses →',
    secondaryHref: '/courses',
    secondaryCta: 'See $297 Self-Paced Academy',
  },
]

const WORK_FAQS = [
  {
    q: 'Why does the calendar book a 20-minute scoping call instead of a multi-month package?',
    a: 'Every serious automation build or corporate workshop depends on your existing tools, data sensitivity, and workflow volume. A focused 20-minute discovery call lets us verify ROI first and send a clean, fixed-scope proposal with zero pressure.',
  },
  {
    q: 'Do I need a developer on payroll to maintain what you build?',
    a: 'No. We avoid over-engineered autonomous agents when a clean, auditable workflow solves the job reliably at 10x lower cost. Every sprint ships inside your own accounts with clear SOP documentation and short video walkthroughs your existing team can edit.',
  },
  {
    q: 'Where can our engineering leader or L&D committee inspect your technical depth?',
    a: 'Visit our Research & Teaching hub (/research) to review 30+ published systems and hardware benchmarks, all 18 chapters of The Sovereign Stack, our CU Boulder syllabi, and open-source workshop labs.',
  },
]

export default function WorkWithMePage() {
  const workLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_CONFIG.siteUrl}/work-with-me#service`,
        name: 'Custom AI Workflow Automation Sprints, Corporate Workshops & Technical Advisory',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
        },
        areaServed: ['Boulder, CO', 'Denver, CO', 'United States'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Agentic Architect Services & Courses',
          itemListElement: [
            {
              '@type': 'Offer',
              name: '90-Minute Workflow & Cost Roadmap',
              price: '750',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              name: 'Custom Bottleneck Automation Sprint (Starting Floor)',
              price: '2500',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              name: '6-System Back-Office Implementation Cohort',
              price: '1497',
              priceCurrency: 'USD',
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: WORK_FAQS.map(f => ({
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
          __html: JSON.stringify(workLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="space-y-14">
        <PageHeader
          meta="Free 20-Min Bottleneck Audit · Fixed-Scope Sprints · Corporate Enablement"
          title="Automate One Bottleneck First. Keep the Growth."
          description="Book a free 20-minute call to look at one manual bottleneck in your business, schedule a single-session $750 Roadmap, or scope corporate training for a team stuck between AI demos and production."
        />

        {/* Ritesh-Style 4-Step How It Works */}
        <section className="space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            How Custom Engagements Work (No Blind Retainers)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map(item => (
              <Card key={item.step} className="p-5 space-y-2 bg-surface">
                <p className="font-mono text-xs font-semibold text-online">{item.step}</p>
                <h2 className="text-base font-bold text-fg">{item.title}</h2>
                <p className="text-xs text-muted leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Bottleneck Cost Calculator */}
        <section className="space-y-4">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Quantify the Cost of Manual Busywork
            </p>
            <h2 className="text-2xl font-bold text-fg mt-1">
              Adding $65,000+ Headcount vs. Automating the Bottleneck
            </h2>
          </div>
          <RoiCalculator />
        </section>

        {/* 2x2 Clean Approach-2 Offer Grid */}
        <section id="offers" className="space-y-5 scroll-mt-20">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Choose Your Path
            </p>
            <h2 className="text-2xl font-bold text-fg mt-1">
              Single-Session Roadmap, Custom Sprint, Corporate Training, or DIY Courses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PATH_CARDS.map(offer => (
              <Card key={offer.title} className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <Badge variant={offer.badgeVariant}>{offer.badge}</Badge>
                  <h3 className="text-xl font-bold text-fg">{offer.title}</h3>
                  <p className="font-mono text-sm font-semibold text-accent">{offer.price}</p>
                  <p className="text-sm text-muted leading-relaxed">{offer.detail}</p>
                  <div className="rounded-lg border border-border bg-surface p-3 text-xs text-fg leading-relaxed">
                    {offer.standard}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Button variant="primary" size="md" href={offer.href}>
                    {offer.cta}
                  </Button>
                  {'secondaryHref' in offer && offer.secondaryHref && (
                    <Button variant="outline" size="md" href={offer.secondaryHref}>
                      {offer.secondaryCta}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Wing Bridge */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-7 p-6 bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
                Single Discrete Calendar Call · $0
              </p>
              <h3 className="text-lg font-bold text-fg">
                Not Sure Which Path Fits? Book a 20-Minute Bottleneck &amp; Fit Call
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Bring one process costing your team hours each week. You leave knowing whether to
                automate it solo in our courses or have us scope a custom build.
              </p>
            </div>
            <div className="shrink-0">
              <Button variant="outline" size="md" href={SITE_CONFIG.cal.scoping}>
                Book 20-Min Call →
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-fg">University, Keynotes &amp; CTO Research?</h3>
              <p className="text-sm text-muted leading-relaxed">
                Inspect our CU Boulder syllabi, 18-chapter Sovereign Stack book, and 30+ benchmarks
                in{' '}
                <Link href="/research" className="text-accent font-medium hover:underline">
                  Research &amp; Teaching
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" href="/contact">
                Send a Written Inquiry
              </Button>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-fg">Engagement &amp; Scoping FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WORK_FAQS.map(faq => (
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

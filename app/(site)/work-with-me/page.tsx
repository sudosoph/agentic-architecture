import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Work With Sophia · Forward Deployed AI Builds, Corporate Training & Advisory',
  description:
    'Commission a Forward Deployed Build-For-You AI system (bespoke API harnesses, multi-model routing, codified department skills), schedule a $750 Architecture Roadmap, or book corporate AI training.',
  alternates: { canonical: '/work-with-me' },
}

const PROCESS_STEPS = [
  {
    step: '01 · Shadow & Scope',
    title: 'Inspect Real Workflows',
    body: 'Answer 3 short questions on booking so we inspect your actual tools, data sensitivity, and integration bottlenecks.',
  },
  {
    step: '02 · Discovery (20 Mins)',
    title: 'Architecture & Fit Call',
    body: 'We evaluate Vertical AI vs. bespoke build economics live on Zoom and tell you candidly what to buy, skip, or engineer.',
  },
  {
    step: '03 · Milestone Charter',
    title: 'Fixed Scope or Multi-Week FDE',
    body: 'Start with a focused pilot sprint (from $2,500) or scope a multi-week Forward Deployed build across Marketing, Finance, Legal, and Ops.',
  },
  {
    step: '04 · Ship, Eval & Transfer',
    title: '100% Owned Inside Your Stack',
    body: 'Engineered inside your own cloud/accounts with 25-case binary Golden Evals, SKILL.md playbooks, and internal champion handoff.',
  },
]

const PATH_CARDS = [
  {
    badge: 'Single Session · 100% Credited Toward Any Build',
    badgeVariant: 'online' as const,
    title: '90-Minute Architecture, Model & Build-vs-Buy Roadmap',
    price: 'From $750 (One-Time Session + 48-Hr Written Blueprint)',
    detail:
      'Want a rigorous build-vs-buy, privacy boundary, and SaaS FinOps plan before committing to engineering? In 90 minutes we audit your stack, map Frontier vs. Open-Weights and best-of-breed APIs, and deliver a written 90-day charter within 48 hours.',
    standard:
      'Scope Standard: Includes recorded teardown, written architecture roadmap, and 100% fee credit toward a Forward Deployed build or Corporate Lab within 30 days.',
    href: SITE_CONFIG.cal.audit,
    cta: 'Book 90-Min Roadmap ($750) →',
  },
  {
    badge: 'Build-For-You · Pilot Sprint to Multi-Month Embedded Engineering',
    badgeVariant: 'rig' as const,
    title: 'Forward Deployed AI Systems & Bespoke API Integration',
    price: 'Pilot Sprints from $2,500 · Multi-System Department Builds Custom-Scoped',
    detail:
      'Embed Forward Deployed AI engineering directly alongside your team to wire bespoke multi-model harnesses, best-of-breed APIs (Search, OCR, Voice, Sandboxes, MCP), Productive-Friction interview Skills, and 25-case Golden Eval gates across your CRM, ERP, and workspace.',
    standard:
      'Ownership Standard: Zero black-box agency lock-in. 100% of code, schemas, and SKILL.md repositories ship inside your own infrastructure.',
    href: SITE_CONFIG.cal.scoping,
    cta: 'Scope a Forward Deployed Build →',
    secondaryHref: '/downloads/forward-deployed-ai-scoping-guide.md',
    secondaryCta: 'Download Scoping Guide ↓',
  },
  {
    badge: 'Executive & Enterprise Track · Mid-Market & Funded Teams',
    badgeVariant: 'tag' as const,
    title: 'Fractional CAIO, Fractional AI CTO & Corporate Department Labs',
    price: '2-Wk Diagnostic, Half/Full-Day Functional Labs ($7.5K to $15K+), or Monthly Cadence',
    detail:
      'For organizations scaling beyond chat seats: part-time Fractional Chief AI Officer or Fractional AI CTO leadership, plus hands-on corporate trainings with tailored tracks for Marketing, Finance, Legal, Operations, and internal Forward Deployed champions.',
    standard:
      'Quality Bar: Strategy and production architecture in one seat (Columbia CS + ex-McKinsey), aligned to ZDR, HIPAA, SOC2, and sovereign open-weight boundaries.',
    href: '/fractional-ai-cto',
    cta: 'Explore Fractional CAIO & AI CTO →',
    secondaryHref: SITE_CONFIG.cal.speaking,
    secondaryCta: 'Corporate Training & Speaking Call',
  },
  {
    badge: 'Self-Paced & Live Group Learning · L&D Stipend Eligible',
    badgeVariant: 'online' as const,
    title: '4-Curriculum AI Architecture Academy & Guided Cohort',
    price: 'Curricula from $297 ($997 All-Access) · Guided Cohort from $1,497',
    detail:
      'Train yourself or upskill internal leads across our 20-module Academy (Foundations & Productive Friction, Department Build-vs-Buy, Bespoke APIs & FDEs, and Sovereign Open-Weight Rigs), with 100% tuition credit toward live builds.',
    standard:
      'Team Friendly: Guided Cohort includes a free second seat for an operator or PM, plus a 1-page L&D Stipend Approval Letter.',
    href: '/accelerator',
    cta: 'Explore Guided Cohort →',
    secondaryHref: '/courses',
    secondaryCta: 'Browse All 4 Curricula',
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
          meta="Forward Deployed Engineering · Bespoke API Harnesses · Corporate & Fractional AI"
          title="Engineer Bespoke AI Systems Your Organization Actually Owns."
          description="Scope a multi-week Forward Deployed AI build connecting best-of-breed APIs and codified department Skills, start with a $750 90-Minute Architecture Roadmap, or book corporate department training."
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
                  {'secondaryHref' in offer &&
                    offer.secondaryHref &&
                    (offer.secondaryHref.startsWith('/downloads/') ? (
                      <a
                        href={offer.secondaryHref}
                        download
                        className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-fg hover:border-accent hover:text-accent transition-colors"
                      >
                        {offer.secondaryCta}
                      </a>
                    ) : (
                      <Button variant="outline" size="md" href={offer.secondaryHref}>
                        {offer.secondaryCta}
                      </Button>
                    ))}
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

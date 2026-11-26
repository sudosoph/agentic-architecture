import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Work With Sophia · Bespoke AI Systems, Advisory & Corporate Training',
  description:
    'Inquire about Forward Deployed AI workflow builds, architecture and build-vs-buy diagnostics, Fractional CAIO / AI CTO leadership, or corporate team training.',
  alternates: { canonical: '/work-with-me' },
}

const PROCESS_STEPS = [
  {
    step: '01 · Context',
    title: 'Share Your Bottleneck',
    body: 'Answer three short intake questions when booking so we review your current stack, data boundaries, and operational goals beforehand.',
  },
  {
    step: '02 · Fit Call (20 Mins)',
    title: 'Candid Architecture Review',
    body: 'We evaluate off-the-shelf platforms versus lightweight custom workflows live and recommend what to buy, skip, or build.',
  },
  {
    step: '03 · Charter',
    title: 'Defined Milestones',
    body: 'Every engagement begins with a clearly bounded diagnostic, team workshop, or focused implementation sprint.',
  },
  {
    step: '04 · Transfer',
    title: 'Owned Inside Your Stack',
    body: 'Workflows, schemas, evaluation suites, and SOP documentation ship directly inside your own infrastructure with full team handoff.',
  },
]

const ENGAGEMENT_PATHS = [
  {
    tag: 'Diagnostic & Roadmap',
    title: 'Architecture, Model & Build-vs-Buy Diagnostic',
    detail:
      'A focused teardown of your current software stack, manual bottlenecks, data privacy boundaries, and model routing options, delivered with a written implementation charter.',
    standard:
      'Deliverable: Recorded architecture review, prioritized build-vs-buy matrix, and 90-day execution roadmap.',
    href: SITE_CONFIG.cal.audit,
    cta: 'Schedule Diagnostic Call',
  },
  {
    tag: 'Forward Deployed Engineering',
    title: 'Bespoke AI Systems & Workflow Integration',
    detail:
      'Embed Forward Deployed engineering alongside your team to connect search, OCR, voice, calendar, and CRM primitives with tiered model routing, draft-first gates, and 25-case evaluation suites.',
    standard:
      'Ownership standard: Zero black-box agency lock-in. Every repository, workflow, and SOP lives inside your own accounts.',
    href: SITE_CONFIG.cal.scoping,
    cta: 'Scope a Bespoke Build',
    secondaryHref: '/downloads/forward-deployed-ai-scoping-guide.md',
    secondaryCta: 'Download Scoping Guide',
  },
  {
    tag: 'Executive & Organizational Track',
    title: 'Fractional CAIO, Fractional AI CTO & Team Labs',
    detail:
      'Part-time executive AI leadership, governance and security oversight, and hands-on functional workshops tailored for Marketing, Finance, Legal, Operations, and Engineering teams.',
    standard:
      'Designed for organizations moving past scattered chat seats into governed, measurable production.',
    href: '/fractional-ai-cto',
    cta: 'Explore Fractional Leadership',
    secondaryHref: SITE_CONFIG.cal.speaking,
    secondaryCta: 'Workshop & Speaking Inquiry',
  },
  {
    tag: 'Self-Paced & Cohort Upskilling',
    title: 'The Agentic Architect Lab & Open Starter Kit',
    detail:
      'Upskill yourself or internal champions through our hands-on Skool Lab tracks, free unlocked cornerstone lessons, and interactive 20/80 Task Readiness Scorecard.',
    standard:
      'Start immediately with unlocked lessons and downloadable SOP templates.',
    href: '/courses',
    cta: 'Explore the Lab & Courses',
    secondaryHref: '/starter-kit',
    secondaryCta: 'Open Free 20/80 Kit',
  },
]

const WORK_FAQS = [
  {
    q: 'Why start with a 20-minute scoping call instead of a fixed menu?',
    a: 'Every serious workflow build or executive engagement depends on your existing systems, compliance boundaries, and process volume. Twenty minutes lets us verify fit first and scope clean, bounded milestones.',
  },
  {
    q: 'Do we need dedicated AI engineers on staff to maintain what gets built?',
    a: 'No. We avoid over-engineered autonomous loops when an auditable, deterministic workflow solves the problem cleanly. Every engagement includes plain-English SOPs, regression checks, and live walkthroughs for your team.',
  },
  {
    q: 'Where can our technical lead or L&D committee inspect your published work?',
    a: 'Browse our systems benchmarks, 12-chapter Sovereign Stack monograph, and university syllabi on /research and /teaching.',
  },
]

export default function WorkWithMePage() {
  const workLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_CONFIG.siteUrl}/work-with-me#service`,
        name: 'Bespoke AI Workflow Architecture, Corporate Workshops & Fractional Advisory',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
        },
        areaServed: ['Boulder, CO', 'Denver, CO', 'United States'],
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
      <div className="space-y-16">
        <PageHeader
          meta="Forward Deployed Systems · Executive Advisory · Corporate Enablement"
          title="Architect AI systems your organization actually owns."
          description="Scope a bespoke workflow sprint, schedule an architecture and build-vs-buy diagnostic, or inquire about Fractional CAIO / AI CTO leadership and team workshops."
        />

        {/* 4-Step Process */}
        <section className="space-y-4">
          <p className="text-xs font-medium text-muted">How Engagements Work</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map(item => (
              <Card key={item.step} className="p-5 space-y-2">
                <p className="text-xs font-medium text-muted tabular-nums">{item.step}</p>
                <h2 className="text-base font-semibold text-fg">{item.title}</h2>
                <p className="text-xs text-muted leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 2x2 Engagement Grid */}
        <section id="offers" className="space-y-5 scroll-mt-20">
          <div>
            <p className="text-xs font-medium text-muted">Engagement Models</p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
              Diagnostics, bespoke builds, fractional leadership, and team training
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENGAGEMENT_PATHS.map(offer => (
              <Card key={offer.title} className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <Badge variant="tag">{offer.tag}</Badge>
                  <h3 className="font-serif text-2xl font-normal text-fg leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{offer.detail}</p>
                  <div className="rounded-md border border-border bg-bg p-3 text-xs text-fg/90 leading-relaxed">
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
                        className="press-scale inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg hover:border-fg/45"
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

        {/* Direct Written Note + Research Bridge */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-7 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted">20-Minute Scoping Call</p>
              <h3 className="font-serif text-xl font-normal text-fg">
                Not sure which path fits? Start with one concrete bottleneck.
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Bring one recurring workflow or organizational question. You leave with a clear
                recommendation on whether to tackle it internally or scope a project together.
              </p>
            </div>
            <div className="shrink-0">
              <Button variant="outline" size="md" href={SITE_CONFIG.cal.scoping}>
                Book 20-Min Call
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-fg">Prefer to send a written brief?</h3>
              <p className="text-sm text-muted leading-relaxed">
                Inspect published benchmarks and syllabi in{' '}
                <Link
                  href="/research"
                  className="text-fg underline underline-offset-3 decoration-border"
                >
                  Research
                </Link>{' '}
                or send a written inquiry directly.
              </p>
            </div>
            <div>
              <Button variant="outline" size="sm" href="/contact">
                Send Written Inquiry
              </Button>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
            Engagement &amp; scoping FAQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WORK_FAQS.map(faq => (
              <Card key={faq.q} className="p-6 space-y-2">
                <h3 className="text-sm font-semibold text-fg leading-snug">{faq.q}</h3>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

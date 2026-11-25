import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'AI Automation Courses for Non-Technical Owners, Cohort & Custom Sprints',
  description:
    'Start free in our 5-Day Prompt-to-System Challenge and 60-Min Live Build, learn step-by-step in our $297 Self-Paced Academy, or train your operator in our guided cohort.',
  alternates: { canonical: '/courses' },
}

const LADDER = [
  {
    step: 'Step 01 · Start Free',
    badge: 'Every Click Shown',
    badgeVariant: 'online' as const,
    title: '5-Day Prompt-to-System Challenge & 60-Min Live Build',
    price: '$0',
    body: 'Score your #1 operational bottleneck with our 20/80 Readiness Calculator and watch a working lead-prep and inbox workflow built live without code.',
    primaryHref: '/masterclass',
    primaryCta: 'Join Free Live Workshop →',
    secondaryHref: '/starter-kit',
    secondaryCta: 'Run Free Bottleneck Scorer',
  },
  {
    step: 'Step 02 · Self-Paced Course',
    badge: '+$97 Per Team Seat',
    badgeVariant: 'rig' as const,
    title: 'Practical AI Workflow Academy (For Non-Coders)',
    price: 'From $297 (Lifetime Access)',
    body: 'Six concise modules showing non-technical founders, EAs, and ops leads how to wire an AI Chief of Staff, pre-call dossiers, draft-first inbox triage, and client onboarding.',
    primaryHref: '/academy',
    primaryCta: 'Explore $297 Academy →',
    secondaryHref: '/guides',
    secondaryCta: 'Preview Free Sample Build',
  },
  {
    step: 'Step 03 · Guided Cohort or Custom',
    badge: 'Includes Free Operator Seat',
    badgeVariant: 'tag' as const,
    title: '6-System Back-Office Cohort & Custom Sprints',
    price: 'Cohort from $1,497 · Sprints from $2,500',
    body: 'Want live feedback alongside your EA/Ops Manager over 6 weeks, or want Sophia to ship a custom bottleneck automation inside your workspace? Book a quick 20-minute fit call.',
    primaryHref: '/accelerator',
    primaryCta: 'Explore Guided Cohort →',
    secondaryHref: SITE_CONFIG.cal.scoping,
    secondaryCta: 'Free 20-Min Fit Call',
  },
]

export default function CoursesPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Free 5-Day Challenge · $297 Self-Paced Academy · Guided Cohort"
        title="Where Are You With AI Right Now?"
        description="Practical, zero-jargon automation training built for non-technical business owners and operators, backed by Columbia CS and ex-McKinsey engineering standards."
      />

      {/* 3-Step Value Ladder */}
      <section id="starter-kit" className="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-mt-20">
        {LADDER.map(tier => (
          <Card key={tier.title} className="p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  {tier.step}
                </span>
                <Badge variant={tier.badgeVariant}>{tier.badge}</Badge>
              </div>
              <h2 className="text-xl font-bold text-fg leading-snug">{tier.title}</h2>
              <p className="text-lg font-extrabold text-fg">{tier.price}</p>
              <p className="text-sm text-muted leading-relaxed">{tier.body}</p>
            </div>

            <div className="flex flex-col gap-2.5 pt-3 border-t border-border">
              <Button variant="primary" size="md" href={tier.primaryHref}>
                {tier.primaryCta}
              </Button>
              <Button variant="outline" size="md" href={tier.secondaryHref}>
                {tier.secondaryCta}
              </Button>
            </div>
          </Card>
        ))}
      </section>

      {/* Open-Source Workshop & Guides Strip */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
            Open-Source Lab Archives
          </p>
          <h2 className="text-xl font-bold text-fg">
            Prefer Self-Paced Technical Labs &amp; Forkable GitHub Workflows?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Explore the full 17-step Boulder Startup Week Discovery Engine lab at{' '}
            <Link href="/bsw" className="text-accent font-medium hover:underline">
              /bsw
            </Link>{' '}
            and beginner step-by-step builds at{' '}
            <Link href="/guides" className="text-accent font-medium hover:underline">
              /guides
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="outline" size="md" href="/bsw">
            BSW Workshop Archive →
          </Button>
          <Button variant="ghost" size="md" href="/guides">
            Step-by-Step Guides →
          </Button>
        </div>
      </section>

      {/* The Book Section (#book) */}
      <section id="book" className="scroll-mt-20">
        <Card className="p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="tag">Executive &amp; Builder Field Guide</Badge>
            <span className="font-mono text-xs text-muted">
              18 Live Chapters + 3 Free Downloadable Manuals
            </span>
          </div>
          <h2 className="text-2xl font-bold text-fg">
            The Sovereign Stack: Practical Workflows, Cost Strategy &amp; Private AI You Actually Own
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-3xl">
            Our open field manual for founders, operators, and engineering leaders on designing
            portable context vaults, scoring automation-ready tasks, keeping cloud spend
            predictable, and owning your workflows and private infrastructure.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="primary" size="md" href="/sovereign-stack">
              Read All 18 Live Chapters &amp; Download 3 OSS Manuals →
            </Button>
            <Button
              variant="outline"
              size="md"
              href="/contact?subject=Sovereign%20Stack%20Corporate%20Workshop%20Copies"
            >
              Request Team / Event Copies
            </Button>
          </div>
        </Card>
      </section>

      <NewsletterSignup source="courses" />
    </div>
  )
}

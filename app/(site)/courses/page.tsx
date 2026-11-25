import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Executive AI Courses, Free Briefing & 8-Week Cohort',
  description:
    'Start free with the 20-Minute Company Context Kit and 60-Min Live AI Org Chart Briefing, train your EA/Ops Lead free inside our 8-week Cohort, or request a Bespoke Build.',
  alternates: { canonical: '/courses' },
}

const LADDER = [
  {
    step: 'Step 01 · Free Today',
    badge: 'Unlocked & Live',
    badgeVariant: 'online' as const,
    title: 'Context Kit & Free 60-Min AI Org Chart Briefing',
    price: '$0',
    body: 'Download the portable voice.md + icp.md Company Context Vault immediately, then watch 6 back-office AI roles running live on screen.',
    primaryHref: '/masterclass',
    primaryCta: 'Save Free Briefing Seat →',
    secondaryHref: '/starter-kit',
    secondaryCta: 'Open Context Kit Now',
  },
  {
    step: 'Step 02 · Done-With-You Cohort',
    badge: 'Free Operator Seat Included',
    badgeVariant: 'rig' as const,
    title: '8-Week Executive AI Operating System Cohort',
    price: '$5,997 Founding ($8,997 Standard)',
    body: 'Install all 6 revenue and operations AI workflows in 8 weeks. Includes a FREE seat ($2,500 value) for your EA, COO, or Ops Manager + our 14-Day Live-System Guarantee.',
    primaryHref: '/accelerator',
    primaryCta: 'See Cohort & Value Stack →',
    secondaryHref: SITE_CONFIG.cal.scoping,
    secondaryCta: 'Book 15-Min Fit Call',
  },
  {
    step: 'Step 03 · Done-For-You Bespoke',
    badge: '$15K Savings Guarantee',
    badgeVariant: 'tag' as const,
    title: '48-Hour AI Blueprint & 30-Day Bespoke Sprints',
    price: '$1,500 Blueprint · $12.5K+ Custom Build',
    body: 'Prefer white-glove execution? Start with a guaranteed $1,500 48-Hour Custom AI Blueprint (100% credited) or have Sophia build your workflows custom in 30 days.',
    primaryHref: '/work-with-me',
    primaryCta: 'Explore Bespoke Builds →',
    secondaryHref: SITE_CONFIG.cal.audit,
    secondaryCta: 'Book $1,500 Blueprint',
  },
]

export default function CoursesPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Free Live Briefing · 8-Week Owner + Operator Cohort · Bespoke Builds"
        title="Courses, Cohort & Custom Builds"
        description="Built for non-technical $1M to $50M business owners: train your right-hand operator in our 8-week Cohort, or have Sophia custom-build your AI workflows for you."
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
            Prefer Self-Paced Code-Alongs &amp; Forkable GitHub Repos?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Explore the full 17-step Boulder Startup Week Discovery Engine lab at{' '}
            <Link href="/bsw" className="text-accent font-medium hover:underline">
              /bsw
            </Link>{' '}
            and beginner copy-paste builds at{' '}
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
            Beginner Guides →
          </Button>
        </div>
      </section>

      {/* The Book Section (#book) */}
      <section id="book" className="scroll-mt-20">
        <Card className="p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="tag">Executive &amp; Operator Field Guide</Badge>
            <span className="font-mono text-xs text-muted">Serializing on Substack + Corporate Bulk Editions</span>
          </div>
          <h2 className="text-2xl font-bold text-fg">
            The Sovereign Stack: Practical Workflows, Cost Strategy &amp; Private AI You Actually Own
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-3xl">
            A concise handbook for founders, operators, and engineering leaders on designing portable
            Brand Brains, auditing agent-ready tasks, keeping cloud spend predictable, and owning
            your prompts, SOPs, and private infrastructure.
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Kits, Live Masterclass & Accelerator',
  description:
    'Start free with the 20-Minute Brand Brain Starter Kit and Live 60-Min Masterclass, or install 6 business AI systems inside the 8-week Agentic Business Accelerator.',
}

const LADDER = [
  {
    step: 'Step 01 · Free Today',
    badge: 'Unlocked & Live',
    badgeVariant: 'online' as const,
    title: 'Starter Kit & Free Live 60-Min Masterclass',
    price: '$0',
    body: 'Copy the portable voice.md Brand Brain template and 20/80 Task Scorecard immediately, then join the next live 60-minute screen walkthrough.',
    primaryHref: '/masterclass',
    primaryCta: 'Save Free Masterclass Seat →',
    secondaryHref: '/starter-kit',
    secondaryCta: 'Open Starter Kit Now',
  },
  {
    step: 'Step 02 · Flagship 8-Week Cohort',
    badge: 'Founding Cohort Open',
    badgeVariant: 'rig' as const,
    title: 'The Agentic Business Accelerator',
    price: '$5,997 Founding ($8,997 Standard)',
    body: 'Done-With-You implementation program installing all 6 revenue, content, and operations AI workflows for a fraction of a $65,000/yr hire. Optional +$1,500 Ops/EA seat.',
    primaryHref: '/accelerator',
    primaryCta: 'Explore the Accelerator →',
    secondaryHref: SITE_CONFIG.cal.scoping,
    secondaryCta: 'Book 20-Min Fit Call',
  },
  {
    step: 'Step 03 · 1:1 & Private Teams',
    badge: 'Direct Booking',
    badgeVariant: 'tag' as const,
    title: 'VIP Workflow Audits & Corporate Rollouts',
    price: 'From $500 to $15,000',
    body: 'Book a focused 60-minute 1:1 Strategy Session ($500), a 90-minute VIP Workflow & Cost Audit ($1,500, 100% creditable toward the Accelerator), or a private corporate workshop.',
    primaryHref: '/work-with-me',
    primaryCta: 'See 1:1 & Team Options →',
    secondaryHref: SITE_CONFIG.cal.audit,
    secondaryCta: 'Book $1,500 VIP Audit',
  },
]

export default function CoursesPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Templates · Live Training · Done-With-You Implementation"
        title="Kits, Masterclass & Accelerator"
        description="Start free in 20 minutes with portable Brand Brain templates, or work directly with Sophia to wire repeatable AI systems across your business."
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
            <Button variant="primary" size="md" href={SITE_CONFIG.substackUrl}>
              Read Serialized Chapters Free on Substack →
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

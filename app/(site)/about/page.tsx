import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'About Sophia Stein',
  description:
    'AI systems architect, educator, and advisor in Boulder, CO writing executive architecture essays, weekly Substack field notes, and hands-on courses inside the Agentic Architect Lab.',
  alternates: {
    canonical: '/about',
  },
}

const THREE_SURFACES = [
  {
    number: '01 · Monograph & Benchmarks',
    title: 'Agentic Architect (This Site)',
    detail:
      'Long-form architecture notes, vendor-neutral model and hardware benchmarks, university syllabi, and advisory blueprints for executives, COOs, CTOs, and technical builders.',
    href: '/blog',
    linkLabel: 'Browse essays & research',
  },
  {
    number: '02 · Weekly Synthesis',
    title: 'Substack Dispatch',
    detail:
      'A clear weekly briefing translating frontier model releases, capability shifts, and real workflow experiments into plain-spoken implications for your work and organization.',
    href: SITE_CONFIG.substackUrl,
    linkLabel: 'Read on Substack',
    external: true,
  },
  {
    number: '03 · Hands-On Upskilling',
    title: 'The Agentic Architect Lab',
    detail:
      'Practical courses and community labs built for non-technical operators, founders, and aspiring AI architects mastering Claude workspaces, smart open-weight routing, and durable workflows.',
    href: '/courses',
    linkLabel: 'Explore the Lab tracks',
  },
]

const PRINCIPLES = [
  {
    title: 'Systems over prompt tricks',
    detail:
      'One-line chat prompts force models to guess your business context. Reliable results come from versioned operating rules, structured inputs, scoped tool permissions, and explicit human review gates.',
  },
  {
    title: 'Vendor-neutral unit economics',
    detail:
      'Most teams overpay for overlapping SaaS wrappers while under-investing in evaluation. Routing routine work to fast workhorse or open-weight models keeps margins predictable and portable.',
  },
  {
    title: 'Capability transfer, never lock-in',
    detail:
      'Whether in a self-paced course, a university seminar, or an embedded advisory sprint, every workflow is built inside accounts and plain-text documentation your own team can inspect and evolve.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Boulder, Colorado · Essays, Courses & Systems Advisory"
        title="Sophia Stein"
        description="I study what new AI capabilities actually unlock, design reliable workflow systems that organizations own, and teach both non-technical operators and technical teams how to build with rigor."
      />

      {/* Editorial Narrative */}
      <section className="max-w-2xl space-y-5 text-base text-muted leading-relaxed">
        <p className="text-fg text-lg leading-relaxed">
          Every major model release creates the same gap inside organizations: leadership knows the
          ground is shifting, teams collect scattered chat subscriptions, and very few workflows
          ever become dependable enough to trust on real client or operational work.
        </p>
        <p>
          <strong>Agentic Architect</strong> exists to close that gap without hype or vendor
          lock-in. My work sits at the intersection of systems architecture, unit economics, and
          hands-on teaching: stress-testing frontier models and open-weight stacks the week they
          ship, documenting what breaks under real load, and distilling repeatable patterns anyone
          willing to think clearly can apply.
        </p>
        <p>
          Based in Boulder, Colorado, I have trained more than 300 founders and operators live at{' '}
          <Link href="/bsw" className="text-fg underline underline-offset-3 decoration-border hover:decoration-fg">
            Boulder Startup Week
          </Link>
          , spoken for Women Who Code, developed applied business and studio syllabi on{' '}
          <Link href="/teaching" className="text-fg underline underline-offset-3 decoration-border hover:decoration-fg">
            Speaking &amp; Teaching
          </Link>
          , and compiled our open hardware and loop-verification benchmarks in{' '}
          <Link href="/sovereign-stack" className="text-fg underline underline-offset-3 decoration-border hover:decoration-fg">
            The Sovereign Stack
          </Link>
          .
        </p>
      </section>

      {/* How the Three Surfaces Fit Together */}
      <section className="space-y-5 pt-4 border-t border-border">
        <div>
          <p className="text-xs font-medium text-muted">How to Read &amp; Participate</p>
          <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
            Three surfaces, one coherent point of view
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {THREE_SURFACES.map(surface => (
            <Card key={surface.title} className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted tabular-nums">{surface.number}</p>
                <h3 className="font-serif text-xl font-normal text-fg">{surface.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{surface.detail}</p>
              </div>
              <div className="pt-3 border-t border-border">
                {surface.external ? (
                  <a
                    href={surface.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-fg hover:text-accent transition-colors"
                  >
                    {surface.linkLabel}
                  </a>
                ) : (
                  <Link
                    href={surface.href}
                    className="text-xs font-medium text-fg hover:text-accent transition-colors"
                  >
                    {surface.linkLabel}
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Operating Principles */}
      <section className="space-y-5 pt-4 border-t border-border">
        <div>
          <p className="text-xs font-medium text-muted">Methodology</p>
          <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
            Two tracks, one quality bar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRINCIPLES.map(item => (
            <Card key={item.title} className="p-6 space-y-2">
              <h3 className="text-base font-semibold text-fg">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Inquiry Bridge */}
      <section className="rounded-lg border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h2 className="font-serif text-2xl font-normal text-fg">
            Exploring courses, speaking, or bespoke advisory?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Start with unlocked lessons in{' '}
            <Link href="/courses" className="text-fg underline underline-offset-3 decoration-border">
              Courses
            </Link>
            , review workshop and university topics on{' '}
            <Link href="/teaching" className="text-fg underline underline-offset-3 decoration-border">
              Speaking &amp; Teaching
            </Link>
            , or inquire directly about an architecture engagement.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="md" href="/work-with-me">
            Work With Me
          </Button>
          <Button variant="outline" size="md" href="/courses">
            Explore Courses
          </Button>
        </div>
      </section>

      <NewsletterSignup source="about" />
    </div>
  )
}

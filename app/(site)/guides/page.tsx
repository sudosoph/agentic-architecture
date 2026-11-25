import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllGuides } from '@/lib/guides'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Step-by-Step AI Workflow Guides',
  description:
    'Beginner-friendly, copy-paste tutorials for building practical AI workflows and agents. Every live guide ships with templates or a forkable GitHub repo.',
  alternates: { canonical: '/guides' },
}

const WORKSHOPS = [
  {
    slug: 'bsw-2026',
    title: 'Boulder Startup Week 2026: Architecting Agentic Workflows for the Lean Startup',
    description:
      'Delivered live to 300+ founders and operators at RegenHub. Full 50-slide deck, n8n JSON templates, 17-step tutorial, and printable handouts.',
    meta: 'Open Lab Archive',
    href: '/bsw',
  },
  {
    slug: 'starter-kit',
    title: 'The 20-Minute AI Brand Brain & Task Scorecard Kit',
    description:
      'Unlocked copy-paste voice.md template and 20/80 Task Readiness Scorecard to choose and wire your highest-ROI workflow today.',
    meta: '20-Min Setup',
    href: '/starter-kit',
  },
]

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default function GuidesPage() {
  const liveGuides = getAllGuides()

  return (
    <div className="space-y-12">
      <PageHeader
        meta="Self-Paced Tutorials · Forkable Repos"
        title="Step-by-Step Workflow Guides"
        description="Beginner-friendly, copy-paste builds designed for founders and operators who want practical automations running without software engineering overhead."
      />

      {/* Live Step-by-Step Guides */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-fg">Self-Paced Builds</h2>
        <div className="grid grid-cols-1 gap-5">
          {liveGuides.map(guide => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block group">
              <Card className="p-6 space-y-2 hover:border-accent transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-fg group-hover:text-accent transition-colors">
                    {guide.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted">~{guide.estimatedTime}</span>
                    <Badge variant="online">
                      {DIFFICULTY_LABELS[guide.difficulty] ?? guide.difficulty}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">{guide.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Open Lab Kits & Workshops */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-fg">Open Workshop Labs &amp; Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WORKSHOPS.map(item => (
            <Link key={item.slug} href={item.href} className="block group">
              <Card className="p-6 h-full flex flex-col justify-between space-y-3 hover:border-accent transition-colors">
                <div className="space-y-2">
                  <Badge variant="tag">{item.meta}</Badge>
                  <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
                <span className="font-mono text-xs font-semibold text-accent">Open lab →</span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Masterclass & Team Training CTA */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <h2 className="text-xl font-bold text-fg">Want a Live Walkthrough Instead?</h2>
          <p className="text-sm text-muted leading-relaxed">
            Join the next free 60-minute live masterclass, subscribe free to{' '}
            <a
              href={SITE_CONFIG.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-medium hover:underline"
            >
              {SITE_CONFIG.newsletterName}
            </a>{' '}
            on Substack, or bring Sophia in for a private team workshop.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="md" href="/masterclass">
            Free 60-Min Masterclass →
          </Button>
          <Button variant="outline" size="md" href="/work-with-me">
            Team Workshops &amp; Audits
          </Button>
        </div>
      </section>
    </div>
  )
}

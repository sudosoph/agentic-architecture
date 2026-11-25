import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllGuides } from '@/lib/guides'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Workflow Templates & Step-by-Step AI Guides',
  description:
    'Copy-paste 2026 AI workflow templates, Brand Brain files, lead dossier blueprints, and beginner-friendly build guides by Sophia Stein.',
  alternates: { canonical: '/guides' },
}

const TEMPLATES_2026 = [
  {
    slug: 'starter-kit',
    title: '20-Minute Brand Brain (voice.md + icp.md) & Task Scorecard',
    description:
      'Portable context files and interactive 20/80 Task Readiness Scorer so every AI tool and workflow sounds like you without re-prompting.',
    meta: '2026 Core Kit · Markdown + CSV',
    href: '/starter-kit',
  },
  {
    slug: 'lead-dossier',
    title: 'Automated Pre-Call Lead Dossier & Gmail Draft Blueprint',
    description:
      'Importable n8n JSON workflow that enriches new Cal.com bookings and stages a human-approved pre-call brief in Gmail Drafts.',
    meta: 'Importable n8n JSON',
    href: '/downloads/pre-call-lead-dossier-n8n.json',
  },
  {
    slug: 'trend-radar',
    title: 'Weekly AI Trend, Tool Review & SEO/GEO Brief Radar',
    description:
      'Importable n8n JSON template pulling top technical releases and operator questions into a weekly scored content and review queue.',
    meta: 'Importable n8n JSON',
    href: '/downloads/trend-research-and-review-n8n.json',
  },
  {
    slug: 'reference-stack',
    title: 'The 4-Layer Agentic Architect Reference Blueprint',
    description:
      'Vendor-neutral guide to structuring portable context, least-privilege tool scopes, evaluation loops, and human approval checkpoints.',
    meta: 'Architecture Guide',
    href: '/what-is-an-agentic-architect',
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
        meta="Updated November 2026 · Zero-Bloat Templates"
        title="Workflow Templates & Step-by-Step Guides"
        description="Ready-to-import 2026 workflow blueprints and plain-English tutorials for founders and teams."
      />

      {/* Current 2026 Templates */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-fg">2026 Workflow Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TEMPLATES_2026.map(item => (
            <Link key={item.slug} href={item.href} className="block group">
              <Card className="p-6 h-full flex flex-col justify-between space-y-3 hover:border-accent transition-colors">
                <div className="space-y-2">
                  <Badge variant="tag">{item.meta}</Badge>
                  <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
                <span className="font-mono text-xs font-semibold text-accent">Open resource →</span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

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
        <p className="text-xs text-muted pt-1">
          Looking for slides or handouts from the May 2026 conference session? Visit the{' '}
          <Link href="/bsw" className="text-accent hover:underline">
            past workshop archive
          </Link>
          .
        </p>
      </section>

      {/* Live Masterclass CTA */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <h2 className="text-xl font-bold text-fg">Want a Live Walkthrough Instead?</h2>
          <p className="text-sm text-muted leading-relaxed">
            Join the next free 60-minute live session, subscribe free to{' '}
            <a
              href={SITE_CONFIG.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-medium hover:underline"
            >
              {SITE_CONFIG.newsletterName}
            </a>{' '}
            on Substack, or book a 1:1 workflow teardown.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="md" href="/masterclass">
            Free 60-Min Masterclass →
          </Button>
          <Button variant="outline" size="md" href="/work-with-me">
            Ways to Work Together
          </Button>
        </div>
      </section>
    </div>
  )
}

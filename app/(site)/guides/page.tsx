import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllGuides } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Step-by-step tutorials for building your first AI agents. Beginner-friendly, no assumed knowledge, every guide ships with a GitHub repo you can fork.',
}

// Workshops are separate from guides — different format (talk + slides +
// templates), different commitment (live or recorded), different audience.
type Workshop = {
  slug: string
  title: string
  description: string
  meta: string
  href: string
}

const WORKSHOPS: Workshop[] = [
  {
    slug: 'bsw-2026',
    title: 'Boulder Startup Week 2026 — Architecting Agentic Workflows for the Lean 2026 Startup',
    description:
      'Live workshop on May 7, 2026 at RegenHub. Slides, n8n templates, full 17-step tutorial, and handouts are open at /bsw — fork the repo and ship your own version.',
    meta: 'May 7, 2026',
    href: '/bsw',
  },
]

// "Coming soon" placeholders for guides in active drafting. Real published
// guides come from the MDX pipeline (getAllGuides).
type ComingSoon = {
  slug: string
  title: string
  description: string
}

const COMING_SOON: ComingSoon[] = [
  {
    slug: 'meeting-notes-agent',
    title: 'A Meeting Notes Agent That Drafts the Follow-Up',
    description:
      'Paste your meeting transcript or notes. Get back action items with owners and deadlines, plus a draft follow-up email per attendee — ready for you to review and send. Pairs naturally with the booking-agent.',
  },
  {
    slug: 'weekly-planner-agent',
    title: 'A Weekly Planner Agent That Tracks Meetings, Notes, and Work',
    description:
      'Reads your calendar, your notes, and your task list. Produces a Monday-morning brief and a Friday wrap. Beginner-friendly, no code beyond copy-paste.',
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
      {/* Hero + audience framing — at the top so visitors know if they're in the right place */}
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">guides</h1>
        <p className="text-sm text-muted leading-relaxed mb-4">
          Step-by-step tutorials for building your first AI agents. Where the
          blog argues the patterns, the guides walk you through the setup. Every
          live guide ships with a GitHub repo you can fork and customize.
        </p>
        <div className="border border-border bg-surface p-5 ">
          <p className="font-mono text-xs text-bench uppercase tracking-widest mb-2">
            Who these are for
          </p>
          <p className="text-sm text-muted leading-relaxed">
            The blog assumes you already build software. The guides do not. If
            you have ever lost an afternoon to back-and-forth scheduling emails,
            or wished a small piece of your operations would just run itself,
            start here.
          </p>
        </div>
      </section>

      {/* Beginner guides — live + coming-soon under one heading */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          Beginner guides
        </h2>
        <p className="font-mono text-xs text-muted mb-6">
          Self-paced. Copy-paste friendly. Forkable.
        </p>
        <div className="divide-y divide-border">
          {liveGuides.map(guide => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block py-6 first:pt-0 last:pb-0 group"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                  {guide.title}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-muted">
                    ~{guide.estimatedTime}
                  </span>
                  <Badge variant="tag">
                    {DIFFICULTY_LABELS[guide.difficulty] ?? guide.difficulty}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed">{guide.description}</p>
            </Link>
          ))}
          {COMING_SOON.map(({ slug, title, description }) => (
            <div key={slug} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-mono text-sm text-fg">{title}</h3>
                <Badge variant="tag">Coming soon</Badge>
              </div>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workshops — separate section because they're a different shape */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          Workshops
        </h2>
        <p className="font-mono text-xs text-muted mb-6">
          Live or recorded. Slides, templates, handouts, code.
        </p>
        <div className="divide-y divide-border">
          {WORKSHOPS.map(({ slug, title, description, meta, href }) => (
            <Link
              key={slug}
              href={href}
              className="block py-6 first:pt-0 last:pb-0 group"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                  {title}
                </h3>
                <span className="font-mono text-xs text-muted shrink-0">{meta}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA: book a session — moved below the catalog, where intent is highest */}
      <section className="border border-border bg-surface p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <p className="font-mono text-sm text-fg mb-1">
              Want a live walkthrough for your team?
            </p>
            <p className="font-mono text-xs text-muted leading-relaxed">
              I run workshops and corporate trainings on local AI setup,
              agentic patterns, and the cost economics of running open weights
              in 2026. Most projects are a half or full day.
            </p>
          </div>
          <Button variant="primary" size="md" href="/work-with-me">
            see options ›
          </Button>
        </div>
      </section>

      <section className="border-t border-border pt-6">
        <p className="font-mono text-xs text-muted">
          Want a heads-up when each new guide lands?{' '}
          <Link
            href="/contact?subject=Guides%20notify&message=Notify%20me%20when%20new%20guides%20publish."
            className="text-accent hover:underline"
          >
            ask to be notified
          </Link>
          , or subscribe to{' '}
          <a
            href="https://localfirstai.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Local-First AI
          </a>{' '}
          for weekly updates.
        </p>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CAL_BASE = 'https://cal.com/sophia-stein'

export const metadata: Metadata = {
  title: 'Book a Call',
  description:
    'Book a call with Sophia Stein. Scoping calls, workflow audits, hourly architecture sessions, and speaking inquiries. All bookings on cal.com.',
}

type Event = {
  slug: string
  title: string
  duration: string
  body: string
}

// Event slugs map to cal.com/sophia-stein/<slug>. Create the matching event
// types on cal.com to make the links resolve. Until they exist, cal.com
// returns its own 404 (clean) rather than embedding a broken iframe here.
const EVENTS: Event[] = [
  {
    slug: '30min',
    title: '30-min Scoping Call',
    duration: '30 min · free',
    body: 'For founders, CTOs, and engineers thinking about a project. Bring the workflow you want to make agentic, the constraint you cannot move, and the question you want answered. No deck, no pitch.',
  },
  {
    slug: 'audit',
    title: 'Agentic Workflow Audit',
    duration: '90 min · productized',
    body: 'The deep look at one workflow. We map your current process, identify the agent-ready tasks, spec the architecture, and end with a written punch list and a seeded reference repo.',
  },
  {
    slug: 'hour',
    title: 'Hour with the AI Architect',
    duration: '60 min · hourly',
    body: 'For teams already building. Bring the ROCm error, the eval harness question, the orchestration design, the cost teardown. We solve the thing in an hour or I tell you what to read and who to call.',
  },
  {
    slug: 'speaking',
    title: 'Workshop & Speaking Inquiry',
    duration: '30 min · free intake',
    body: 'For event organizers, university programs, corporate L&D teams, and conference tracks. Send the audience profile and the outcome you need; we scope on the call.',
  },
]

export default function BookPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">book a call</h1>
        <p className="text-sm text-muted leading-relaxed">
          Pick the call below that matches what you want to do. Each one opens
          cal.com directly. Reply same day, usually.
        </p>
      </section>

      {/* Event type cards */}
      <section className="divide-y divide-border">
        {EVENTS.map(({ slug, title, duration, body }) => (
          <Link
            key={slug}
            href={`${CAL_BASE}/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group py-5 first:pt-0 last:pb-0"
          >
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                {title}
              </h3>
              <span className="font-mono text-xs text-bench shrink-0">
                {duration}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-2">{body}</p>
            <p className="font-mono text-xs text-accent group-hover:underline">
              open on cal.com ↗
            </p>
          </Link>
        ))}
      </section>

      {/* Fallback / external open */}
      <section className="border-t border-border pt-6 flex flex-wrap items-center gap-3">
        <Button variant="outline" size="md" href={CAL_BASE}>
          see all on cal.com →
        </Button>
        <Button variant="ghost" size="md" href="/contact">
          or email instead
        </Button>
      </section>

      {/* Context */}
      <section className="pt-4 border-t border-border">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
          What to expect
        </h2>
        <ul className="space-y-2 text-sm text-muted leading-relaxed">
          <li>1. You describe the situation. Honest is better than polished.</li>
          <li>2. I ask the questions I would ask any new project.</li>
          <li>3. We figure out if it is a good fit. If yes, I send a proposal within 48 hours.</li>
          <li>4. If not, you leave with a one-page action plan you can take to anyone.</li>
        </ul>
      </section>
    </div>
  )
}

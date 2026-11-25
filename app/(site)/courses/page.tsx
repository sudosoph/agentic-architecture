import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Cohort and self-paced courses on local AI, agentic workflows, and AI-native shipping. Join the waitlist to be notified when each one opens. Suggest a track that is missing.',
}

const TRACKS = [
  {
    name: 'Local AI from scratch',
    outcome: 'Ship a working local AI stack on a Framework 16 (or comparable). End the course with a live agent.',
    audience: 'Engineers and technical founders',
  },
  {
    name: 'Agentic workflows with n8n + Ollama',
    outcome: 'Build three production-shaped agentic workflows from your own backlog. Reusable templates included.',
    audience: 'Developers, ops, technical founders',
  },
  {
    name: 'AI-native web development',
    outcome: 'Ship a production web product using the same stack that runs this site: Next.js plus agent loops.',
    audience: 'Solo founders, small teams',
  },
  {
    name: 'Build Your AI Consultancy',
    outcome: 'Position, price, and deliver agentic-AI projects that compound. From first audit to retainer.',
    audience: 'Engineers going independent',
  },
]

export default function CoursesPage() {
  return (
    <div className="space-y-10">
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">courses</h1>
        <p className="text-sm text-muted leading-relaxed">
          Self-paced and cohort-based courses on local AI infrastructure and
          agentic workflows. Built from real projects, not generic
          curriculum. The first cohort opens this summer.
        </p>
      </section>

      {/* Waitlist — uses the real newsletter signup, sourced as courses-waitlist */}
      <NewsletterSignup
        source="courses-waitlist"
        headline="Courses waitlist"
        sub="One email when enrollment opens. Reply to the welcome email with the track you're most interested in — that's how I prioritize what gets built first."
      />

      {/* Tracks in development — with the suggest-a-track CTA pinned at the bottom of the same section */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Tracks in development
        </h2>
        <div className="divide-y divide-border">
          {TRACKS.map(({ name, outcome, audience }) => (
            <div key={name} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-bench shrink-0 mt-0.5">›</span>
                <h3 className="font-mono text-sm text-fg">{name}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed pl-5">{outcome}</p>
              <p className="font-mono text-xs text-muted mt-1 pl-5">For: {audience}</p>
            </div>
          ))}
        </div>

        {/* Pinned CTA at the bottom of the tracks list */}
        <div className="mt-6 border border-border bg-surface p-6">
          <p className="font-mono text-sm text-fg mb-1">
            Don&apos;t see your track? Suggest one.
          </p>
          <p className="font-mono text-xs text-muted leading-relaxed mb-4">
            The next cohort gets shaped by what people actually request. If you
            are running into a problem you wish someone would teach a course
            for, tell me about it. The best ones become the next track.
          </p>
          <Button
            variant="outline"
            size="md"
            href="/contact?subject=Course%20track%20request&message=I%27d%20like%20to%20see%20a%20course%20on%3A%20%0A%0AHere%27s%20what%20I%27m%20trying%20to%20learn%2Fbuild%3A%20%0A%0AHere%27s%20what%20I%27ve%20already%20tried%3A%20"
          >
            suggest a track ›
          </Button>
        </div>
      </section>

      {/* For teams */}
      <section className="pt-4 border-t border-border">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          For teams
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-3">
          If you need 50 engineers ramped on agentic tooling without sending
          them to a generic bootcamp, the right product is custom course
          creation, built around your stack, your codebase, and your workflows.
        </p>
        <Button variant="ghost" size="md" href="/work-with-me">
          see corporate training and custom course creation ›
        </Button>
      </section>
    </div>
  )
}

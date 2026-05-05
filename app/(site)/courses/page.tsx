import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Cohort and self-paced courses on local AI, agentic workflows, and AI-native shipping. Join the waitlist to be notified when each one opens.',
}

const TRACKS = [
  'Local AI from scratch (Framework 16, ROCm, Ollama, MCP)',
  'Agentic workflows with n8n + Ollama',
  'AI-native web development (Next.js + agent loops)',
  'Build your AI Architect practice',
]

export default function CoursesPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">courses</h1>
        <p className="text-sm text-muted leading-relaxed">
          Self-paced and cohort-based courses on local AI infrastructure and
          agentic workflows. Built from real engagements, not generic
          curriculum. The first cohort opens this summer.
        </p>
      </section>

      {/* Waitlist */}
      <section className="border border-border bg-surface p-6">
        <p className="font-mono text-xs text-bench uppercase tracking-widest mb-2">
          Waitlist
        </p>
        <p className="font-mono text-sm text-fg mb-1">
          Get one email when enrollment opens.
        </p>
        <p className="font-mono text-xs text-muted leading-relaxed mb-4">
          No drip sequence, no upsells. One email per course launch with the
          dates, format, and price. Reply to opt out.
        </p>
        <Button
          variant="primary"
          size="md"
          href="/contact?subject=Courses%20waitlist&message=Add%20me%20to%20the%20courses%20waitlist.%20I%27m%20most%20interested%20in%3A%20"
        >
          join the waitlist ›
        </Button>
      </section>

      {/* What is on the way */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Tracks in development
        </h2>
        <ul className="divide-y divide-border">
          {TRACKS.map(track => (
            <li key={track} className="py-3 text-sm text-muted leading-relaxed flex gap-3">
              <span className="text-bench shrink-0 mt-0.5">›</span>
              <span>{track}</span>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs text-muted mt-4 leading-relaxed">
          Joining the waitlist is also the right way to suggest a track that
          is not on the list yet.
        </p>
      </section>
    </div>
  )
}

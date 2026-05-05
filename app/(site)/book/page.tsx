import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Replace this with your real Cal.com username when you sign up.
// Format: 'username' OR 'username/event-type' (e.g. 'sophiastein/30min').
const CAL_USERNAME = 'sophiastein'
const CAL_URL = `https://cal.com/${CAL_USERNAME}`

export const metadata: Metadata = {
  title: 'Book a Call',
  description:
    'Book a 30-minute scoping call with Sophia Stein. Engagements include workflow audits, agentic system design, and corporate AI training.',
}

export default function BookPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">book a call</h1>
        <p className="text-sm text-muted leading-relaxed">
          A 30-minute scoping call. Tell me what you are trying to ship,
          where you are stuck, and what would make a useful next 30 days.
          No prep needed.
        </p>
      </section>

      {/* Cal.com inline embed */}
      <section className="border border-border bg-surface p-1">
        <iframe
          src={`${CAL_URL}/30min?embed=true&theme=dark`}
          width="100%"
          height="640"
          frameBorder="0"
          title="Schedule a call with Sophia"
          className="block w-full"
        />
      </section>

      {/* Fallback / external open */}
      <section className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="md" href={CAL_URL}>
          open in cal.com →
        </Button>
        <Button variant="ghost" size="md" href="/contact">
          email instead
        </Button>
      </section>

      {/* Context */}
      <section className="pt-4 border-t border-border">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
          What to expect
        </h2>
        <ul className="space-y-2 text-sm text-muted leading-relaxed">
          <li>1. You describe the situation. Honest is better than polished.</li>
          <li>2. I ask the questions I would ask any new engagement.</li>
          <li>3. We figure out if it is a good fit. If yes, I send a proposal within 48 hours.</li>
          <li>4. If not, you leave with a one-page action plan you can take to anyone.</li>
        </ul>
      </section>
    </div>
  )
}

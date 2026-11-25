import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What I am working on right now. Updated monthly. The Derek Sivers /now-page pattern applied to a sovereign-compute consultancy in Boulder, CO.',
}

const LAST_UPDATED = '2026-05-06'

export default function NowPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="now"
        meta={`Last updated ${new Date(LAST_UPDATED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
        description="What I am actually working on this month. The /now page pattern from nownownow.com — updated whenever the focus shifts."
      />

      <section>
        <h2 className="font-mono text-xs text-bench uppercase tracking-widest mb-4">
          Active projects
        </h2>
        <ul className="space-y-4 text-sm text-fg leading-relaxed">
          <li>
            <strong className="font-mono">Boulder Startup Week 2026</strong> — speaking
            Thursday May 7 at RegenHub on agentic workflows for the lean 2026
            startup. Slides, n8n template, and the 17-step build are all open at{' '}
            <Link href="/bsw" className="text-accent hover:underline">/bsw</Link>.
          </li>
          <li>
            <strong className="font-mono">The Sovereign Stack</strong> — the
            flagship e-book on production agents on hardware you own. Active
            drafting through summer 2026.{' '}
            <Link href="/library" className="text-accent hover:underline">/library</Link>{' '}
            for the table of contents.
          </li>
          <li>
            <strong className="font-mono">Local-First AI</strong> — the weekly
            newsletter that links to fresh posts on the{' '}
            <Link href="/blog" className="text-accent hover:underline">blog</Link>.
            Distributed on{' '}
            <a href="https://localfirstai.substack.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Substack</a>{' '}
            for now — migrating to self-hosted Listmonk on Hetzner this summer.
            That migration story becomes a blog post on the way.
          </li>
          <li>
            <strong className="font-mono">Beginner guides series</strong> —
            short, copy-paste-friendly tutorials for non-coders who want to
            run a useful AI agent on their own machine. Booking-agent live
            (with{' '}
            <a href="https://github.com/sudosoph/booking-agent" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">forkable repo</a>).
            Meeting-notes-agent and weekly-planner-agent next.{' '}
            <Link href="/guides" className="text-accent hover:underline">/guides</Link>.
          </li>
        </ul>
      </section>

      <section className="border-t border-border pt-8">
        <h2 className="font-mono text-xs text-bench uppercase tracking-widest mb-4">
          What I am reading
        </h2>
        <ul className="space-y-2 text-sm text-fg leading-relaxed">
          <li>
            <a href="https://www.anthropic.com/engineering" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Anthropic Engineering
            </a>{' '}
            — the prompt caching and effective-agents posts in particular
          </li>
          <li>
            <a href="https://simonwillison.net/tags/llms/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Simon Willison&apos;s LLM tag
            </a>{' '}
            — top to bottom
          </li>
          <li>
            <a href="https://karpathy.github.io/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Andrej Karpathy
            </a>{' '}
            on LLM training mechanics
          </li>
          <li>
            <a href="https://lilianweng.github.io/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Lilian Weng
            </a>{' '}
            on agent design patterns
          </li>
        </ul>
      </section>

      <section className="border-t border-border pt-8">
        <h2 className="font-mono text-xs text-bench uppercase tracking-widest mb-4">
          Open to
        </h2>
        <ul className="space-y-2 text-sm text-fg leading-relaxed">
          <li>
            One or two more <Link href="/work-with-me" className="text-accent hover:underline">consulting projects</Link> for Q2 2026
          </li>
          <li>
            <Link
              href="/work-with-me#organizations"
              className="text-accent hover:underline"
            >
              Speaking engagements
            </Link>{' '}
            — technical conferences, university programs, corporate L&amp;D
          </li>
          <li>
            Guest essays for HN-flavored publications on sovereign compute or
            agentic architecture —{' '}
            <Link
              href="/contact?subject=Guest%20essay%20collab&message=I%27d%20like%20to%20commission%2Fcollab%20on%20a%20guest%20essay.%20Outlet%3A%20%0AAudience%3A%20%0ATopic%20I%27m%20thinking%3A%20"
              className="text-accent hover:underline"
            >
              write me to collab
            </Link>
          </li>
        </ul>
      </section>

      <section className="border-t border-border pt-8">
        <p className="font-mono text-xs text-muted leading-relaxed">
          The /now page pattern was started by{' '}
          <a href="https://sive.rs/now" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Derek Sivers
          </a>
          . There&apos;s a directory of others at{' '}
          <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            nownownow.com
          </a>
          . If you have a /now page too, send it over.
        </p>
      </section>
    </div>
  )
}

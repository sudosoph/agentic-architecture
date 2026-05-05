import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CAL_URL = 'https://cal.com/sophiastein/30min'
const REPO_URL = 'https://github.com/sudosoph/bsw26-agentic-workflows'

export const metadata: Metadata = {
  title: 'Boulder Startup Week 2026',
  description:
    'BSW 2026: Agentic workflows for lean teams. Slides, n8n templates, tutorial, and demo repo from the talk.',
}

const RESOURCES = [
  {
    label: 'Slides',
    body: 'The deck I presented at BSW. Local-first agentic patterns for two-person teams.',
    href: `${REPO_URL}/blob/main/slides/index.html`,
  },
  {
    label: 'Tutorial',
    body: 'Build your first agentic workflow with n8n + Ollama in 90 minutes. Step-by-step, copy-pasteable.',
    href: `${REPO_URL}/blob/main/TUTORIAL.md`,
  },
  {
    label: 'n8n templates',
    body: 'Importable workflow JSONs covering inbox triage, competitive monitoring, and a research agent.',
    href: `${REPO_URL}/tree/main/n8n`,
  },
  {
    label: 'Setup guide',
    body: 'Configuration, env vars, and the dependency list for the workshop demo.',
    href: `${REPO_URL}/blob/main/CONFIGURATION.md`,
  },
  {
    label: 'Handouts',
    body: 'One-page references handed out at the talk. Worth printing.',
    href: `${REPO_URL}/tree/main/handouts`,
  },
]

export default function BswPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <section className="pt-2">
        <p className="font-mono text-xs text-bench uppercase tracking-widest mb-2">
          Boulder Startup Week 2026
        </p>
        <h1 className="font-mono text-2xl text-fg mb-3">
          Agentic Workflows for Lean Teams
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          The talk and workshop materials in one place. Everything is open and
          on GitHub. If you came from the QR code at the venue, you are in the
          right spot.
        </p>
      </section>

      {/* Quick links: book + repo */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button variant="primary" size="md" href={CAL_URL}>
          book a 30-min call ›
        </Button>
        <Button variant="outline" size="md" href={REPO_URL}>
          github repo →
        </Button>
      </section>

      {/* Resources */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Talk resources
        </h2>
        <div className="divide-y divide-border">
          {RESOURCES.map(({ label, body, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block group py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                  {label}
                </h3>
                <span className="font-mono text-xs text-muted shrink-0">↗</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter pull */}
      <section className="border border-border bg-surface p-6">
        <p className="font-mono text-sm text-fg mb-1">
          Want the writeup of the talk?
        </p>
        <p className="font-mono text-xs text-muted leading-relaxed mb-4">
          The Architect&apos;s Notebook is the weekly companion to this work.{' '}
          <span className="text-accent">Free for BSW attendees.</span>
        </p>
        <Button
          variant="primary"
          size="md"
          href="/contact?subject=Newsletter%20signup%20-%20BSW%202026&message=Add%20me%20to%20The%20Architect%27s%20Notebook.%20I%20heard%20the%20BSW%20talk."
        >
          subscribe ›
        </Button>
      </section>

      {/* Related reading */}
      <section className="pt-4 border-t border-border">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Related on the blog
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/three-ways-to-run-open-weight-models" className="text-accent hover:underline">
              Three Ways to Run Open Weights for Pennies
            </Link>
          </li>
          <li>
            <Link href="/blog/the-agentic-audit" className="text-accent hover:underline">
              Find Your Agent-Ready Tasks in 90 Minutes
            </Link>
          </li>
          <li>
            <Link href="/blog/local-vs-cloud-inference" className="text-accent hover:underline">
              When to Run Locally and When to Pay Anthropic
            </Link>
          </li>
          <li>
            <Link href="/blog?theme=local-models" className="text-accent hover:underline">
              All local-models posts →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

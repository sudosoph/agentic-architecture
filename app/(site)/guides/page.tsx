import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Step-by-step tutorials, workshop materials, and slide decks. Local AI setup, agentic workflow patterns, and the talks I give in person.',
}

type Guide = {
  slug: string
  title: string
  status: 'live' | 'draft' | 'workshop' | 'talk'
  description: string
  href?: string
  meta?: string
}

const GUIDES: Guide[] = [
  {
    slug: 'bsw-2026',
    title: 'Boulder Startup Week 2026: Agentic Architecture for Lean Teams',
    status: 'talk',
    description:
      'Slides, demo repo, and the workshop materials from my BSW 2026 session. The talk: how a two-person team ships agentic systems that compound. The workshop: build your first local-first agent in 90 minutes.',
    meta: 'May 2026',
  },
  {
    slug: 'local-ai-from-scratch',
    title: 'Local AI From Scratch on a Framework 16',
    status: 'draft',
    description:
      'The full setup: Ubuntu 26.04, ROCm 7.3, GART config, llama.cpp HIP build, Ollama, and the first useful agent. Reproducible, copy-pasteable, ~90 minutes start to finish.',
  },
  {
    slug: 'first-agentic-workflow',
    title: 'Your First Agentic Workflow with n8n + Ollama',
    status: 'draft',
    description:
      'A guided walkthrough: pick a real task, decompose it, wire it through n8n with a local model, ship the human-in-the-loop approval interface. Ends with a working production-shaped agent.',
  },
  {
    slug: 'mcp-bridge-for-ollama',
    title: 'Running MCP Servers Against a Local Model',
    status: 'draft',
    description:
      'Closing the gap: Ollama does not speak MCP natively. The bridge client setup, the config, the security implications, and what works today.',
  },
]

const STATUS_LABELS: Record<Guide['status'], string> = {
  live: 'Live',
  draft: 'Coming soon',
  workshop: 'Workshop',
  talk: 'Talk',
}

export default function GuidesPage() {
  return (
    <div className="space-y-12">
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">guides</h1>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          Hands-on walkthroughs, workshop materials, and slide decks. Where the
          blog explains the patterns, the guides walk you through the setup.
        </p>
      </section>

      {/* CTA: book a session */}
      <section className="border border-border bg-surface p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <p className="font-mono text-sm text-fg mb-1">
              Want a live walkthrough for your team?
            </p>
            <p className="font-mono text-xs text-muted leading-relaxed">
              I run workshops and corporate trainings on local AI setup,
              agentic patterns, and the cost economics of running open weights
              in 2026. Most engagements are a half or full day.
            </p>
          </div>
          <Button variant="primary" size="md" href="/work-with-me">
            see workshop options ›
          </Button>
        </div>
      </section>

      {/* Guide list */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
          Catalog
        </h2>
        <div className="divide-y divide-border">
          {GUIDES.map(({ slug, title, status, description, meta }) => (
            <div key={slug} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-mono text-sm text-fg">{title}</h3>
                <div className="flex items-center gap-2 shrink-0">
                  {meta && (
                    <span className="font-mono text-xs text-muted">{meta}</span>
                  )}
                  <Badge variant="tag">{STATUS_LABELS[status]}</Badge>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is on the way */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          On the way
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-4 max-w-2xl">
          The first batch of guides drops in May and June. Every published
          guide gets cross-linked from the related blog posts so you can move
          between background and step-by-step without losing your place.
        </p>
        <p className="font-mono text-xs text-muted">
          Want a heads-up when each one lands?{' '}
          <Link
            href="/contact?subject=Guides%20notify&message=Notify%20me%20when%20new%20guides%20publish."
            className="text-accent hover:underline"
          >
            ask to be notified
          </Link>
          .
        </p>
      </section>
    </div>
  )
}

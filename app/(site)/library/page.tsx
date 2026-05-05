import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

export const metadata: Metadata = {
  title: 'Library',
  description:
    'Books, field guides, templates, and reference material on local AI infrastructure and agentic workflows. Pre-order forthcoming books, grab free resources, and download workshop materials.',
}

type Book = {
  title: string
  subtitle: string
  audience: string
  format: string
  status: 'free' | 'pre-order' | 'published'
  outcome: string
  intent: string // url-encoded message for /contact
}

// One pre-order (the flagship), four free guides. The flagship funds the time
// to write the others. Everything else stays free as the brand's credibility
// engine.
const BOOKS: Book[] = [
  {
    title: 'The Sovereign Stack',
    subtitle: 'Production agents on hardware you own. Cost teardowns, eval harnesses, and the architecture that ships.',
    audience: 'Engineers, technical founders, anyone tired of the OpenAI bill',
    format: 'PDF + EPUB · ~220 pages · Fall 2026',
    status: 'pre-order',
    outcome:
      'The book the audience asked for. Real dollar amounts on every page. Hardware selection across Framework, Mac Studio, and dual-GPU servers. ROCm and Metal setup that does not waste a weekend. Model picks across Qwen, Gemma, Kimi, DeepSeek with the benchmark numbers I actually ran. Agent harness design with eval harnesses you can paste. n8n and MCP orchestration patterns from production systems. The cost discipline that decides whether you ship in fall or burn through the runway. Pre-order locks in early-bird pricing and the full source repo.',
    intent: 'Pre-order%20The%20Sovereign%20Stack',
  },
  {
    title: 'Cut Your AI Bill to Zero',
    subtitle: 'A short field guide for founders bleeding money to OpenAI',
    audience: 'Founders, ops, finance leads',
    format: 'PDF · ~30 pages',
    status: 'free',
    outcome:
      'A repeatable framework for finding the 60–80% of your AI spend you can move to local inference or cheaper providers without losing quality. Worked examples, decision tree, model-selection table.',
    intent: 'Send%20me%20Cut%20Your%20AI%20Bill%20to%20Zero',
  },
  {
    title: 'Agentic Workflows for Lean Founders',
    subtitle: 'The companion guide to the BSW 2026 workshop',
    audience: 'Early-stage founders, lean growth teams',
    format: 'PDF · ~80 pages',
    status: 'free',
    outcome:
      'Identify your agent-ready tasks, design the workflow, ship the build-along agent, scale with HITL. Includes the Growth Agent template from the BSW talk.',
    intent: 'Send%20me%20Agentic%20Workflows%20for%20Lean%20Founders',
  },
  {
    title: 'The Token Budget Field Manual',
    subtitle: 'Engineering the cost discipline most agentic teams skip',
    audience: 'Engineers, CTOs, finance partners',
    format: 'PDF · ~50 pages',
    status: 'free',
    outcome:
      'Per-loop math, prompt caching tactics, the four cost vectors that compound, the six controls that bound them. Real prices, real worked examples.',
    intent: 'Send%20me%20The%20Token%20Budget%20Field%20Manual',
  },
  {
    title: 'Local LLMs in Regulated Industries',
    subtitle: 'HIPAA, GDPR, EU AI Act, and the architecture that survives audit',
    audience: 'Healthcare, legal, finance, regulated SMBs',
    format: 'PDF · ~70 pages',
    status: 'free',
    outcome:
      'The compliance-first version of the local AI playbook. What auditors look for, the architectural patterns that hold up, and the August 2026 EU AI Act deadline mapped to engineering decisions.',
    intent: 'Send%20me%20Local%20LLMs%20in%20Regulated%20Industries',
  },
]

type Resource = {
  title: string
  body: string
  format: string
  href?: string
  intent?: string
}

const RESOURCES: Resource[] = [
  {
    title: 'BSW 2026 workshop materials',
    body: 'Slides, n8n templates, tutorial, and handouts from "Architecting Agentic Workflows for the Lean 2026 Startup."',
    format: 'GitHub repo',
    href: 'https://github.com/sudosoph/bsw26-agentic-workflows',
  },
  {
    title: 'n8n template library',
    body: 'Importable workflow JSONs for inbox triage, competitive monitoring, the research-first SDR, and the documentation-update agent. Free, MIT-licensed.',
    format: 'JSON · GitHub',
    href: 'https://github.com/sudosoph/bsw26-agentic-workflows/tree/main/n8n',
  },
  {
    title: 'Open-weight model comparison sheet',
    body: 'May 2026 snapshot: Qwen 3.6, Gemma 4, Kimi K2.6, DeepSeek V4, plus benchmarks (SWE-bench, AIME, GPQA), pricing on Together / Fireworks, and the local-fit-on-Strix-Point column.',
    format: 'CSV + web table',
    intent: 'Send%20me%20the%20open-weight%20model%20comparison%20sheet',
  },
  {
    title: 'AI cost calculator',
    body: 'Plug in your monthly token volume, model mix, and team size. Outputs cloud-vs-local-vs-rented break-even, payback period, and the right deployment path. Coming soon.',
    format: 'Web tool',
    intent: 'Notify%20me%20when%20the%20AI%20cost%20calculator%20launches',
  },
  {
    title: 'ROCm 7.3 + Strix Point setup cheatsheet',
    body: 'The kernel params, GART config, llama.cpp build flags, and verification commands on one printable page.',
    format: 'PDF · 1 page',
    intent: 'Send%20me%20the%20ROCm%207.3%20cheatsheet',
  },
]

const STATUS_LABELS: Record<Book['status'], string> = {
  free: 'Free',
  'pre-order': 'Pre-order',
  published: 'Published',
}

export default function LibraryPage() {
  return (
    <div className="space-y-12 max-w-2xl">
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">library</h1>
        <p className="text-sm text-muted leading-relaxed">
          Books, field guides, templates, and reference material. The free
          ones are lead-magnets for the work I do. The pre-orders are how I
          fund the time to write the next book. The repos are public, MIT,
          and forkable.
        </p>
      </section>

      {/* Books */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Books
        </h2>
        <div className="divide-y divide-border">
          {BOOKS.map(({ title, subtitle, audience, format, status, outcome, intent }) => (
            <div key={title} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="font-mono text-sm text-fg">{title}</h3>
                <Badge variant="tag">{STATUS_LABELS[status]}</Badge>
              </div>
              <p className="font-mono text-xs text-bench mb-2">{subtitle}</p>
              <p className="text-sm text-muted leading-relaxed mb-2">{outcome}</p>
              <p className="font-mono text-xs text-muted mb-3">
                {audience} · {format}
              </p>
              <Button
                variant={status === 'free' ? 'primary' : 'outline'}
                size="sm"
                href={`/contact?subject=${
                  status === 'free' ? 'Free%20resource' : 'Pre-order'
                }&message=${intent}`}
              >
                {status === 'free' ? 'send me the PDF ›' : 'notify me on launch ›'}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Free resources */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Free resources
        </h2>
        <div className="divide-y divide-border">
          {RESOURCES.map(({ title, body, format, href, intent }) => (
            <div key={title} className="py-5 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="font-mono text-sm text-fg">{title}</h3>
                <span className="font-mono text-xs text-muted shrink-0">{format}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-2">{body}</p>
              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:underline"
                >
                  open ↗
                </Link>
              ) : (
                <Link
                  href={`/contact?subject=Resource&message=${intent}`}
                  className="font-mono text-xs text-accent hover:underline"
                >
                  request access →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <NewsletterSignup
        source="library"
        sub="One email when each guide drops, and when The Sovereign Stack ships in fall 2026."
      />
    </div>
  )
}

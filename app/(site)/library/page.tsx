import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

export const metadata: Metadata = {
  title: 'Library',
  description:
    'E-books, field guides, templates, and reference material on local-first AI infrastructure and agentic workflows. New material lands here as it ships — subscribe to Local-First AI for notifications.',
}

type Book = {
  title: string
  subtitle: string
  audience: string
  format: string
  /** Price tier — what it costs. */
  price: 'free' | 'pre-order' | 'paid'
  /** Availability — whether you can get it today. */
  availability: 'available' | 'coming-soon'
  outcome: string
}

// One pre-order (the flagship), four free guides. The flagship funds the time
// to write the others. Everything else stays free as the brand's credibility
// engine.
const BOOKS: Book[] = [
  {
    title: 'The Sovereign Stack',
    subtitle: 'An interactive e-book on production agents on hardware you own. Cost teardowns, eval harnesses, and the architecture that ships.',
    audience: 'Engineers, technical founders, anyone tired of the OpenAI bill',
    format: 'Interactive e-book · PDF + EPUB + web · ~220 pages · Fall 2026',
    price: 'pre-order',
    availability: 'coming-soon',
    outcome:
      'The flagship — built as an interactive e-book, not a static PDF, because the local-AI stack changes monthly. Pre-order locks in lifetime free updates, including major version revisions every time models or hardware shift the math. Available for offline reading in the format you actually use: high-fidelity PDF, EPUB for e-readers, and a browsable web version with live benchmarks. Real dollar amounts on every page. Hardware selection across Framework, Mac Studio, and dual-GPU servers. ROCm and Metal setup that does not waste a weekend. Model picks across Qwen, Gemma, Kimi, DeepSeek with the benchmark numbers I actually ran. Agent harness design with eval harnesses you can paste. n8n and MCP orchestration patterns from production systems. The cost discipline that decides whether you ship in fall or burn through the runway.',
  },
  {
    title: 'Cut Your AI Bill to Zero',
    subtitle: 'A short field guide for founders bleeding money to OpenAI',
    audience: 'Founders, ops, finance leads',
    format: 'PDF · ~30 pages',
    price: 'free',
    availability: 'coming-soon',
    outcome:
      'A repeatable framework for finding the 60–80% of your AI spend you can move to local inference or cheaper providers without losing quality. Worked examples, decision tree, model-selection table.',
  },
  {
    title: 'Agentic Workflows for Lean Founders',
    subtitle: 'The companion guide to the BSW 2026 workshop',
    audience: 'Early-stage founders, lean growth teams',
    format: 'PDF · ~80 pages',
    price: 'free',
    availability: 'coming-soon',
    outcome:
      'Identify your agent-ready tasks, design the workflow, ship the build-along agent, scale with HITL. Includes the Growth Agent template from the BSW talk.',
  },
  {
    title: 'The Token Budget Field Manual',
    subtitle: 'Engineering the cost discipline most agentic teams skip',
    audience: 'Engineers, CTOs, finance partners',
    format: 'PDF · ~50 pages',
    price: 'free',
    availability: 'coming-soon',
    outcome:
      'Per-loop math, prompt caching tactics, the four cost vectors that compound, the six controls that bound them. Real prices, real worked examples.',
  },
  {
    title: 'Local LLMs in Regulated Industries',
    subtitle: 'HIPAA, GDPR, EU AI Act, and the architecture that survives audit',
    audience: 'Healthcare, legal, finance, regulated SMBs',
    format: 'PDF · ~70 pages',
    price: 'free',
    availability: 'coming-soon',
    outcome:
      'The compliance-first version of the local AI playbook. What auditors look for, the architectural patterns that hold up, and the August 2026 EU AI Act deadline mapped to engineering decisions.',
  },
]

type Resource = {
  title: string
  body: string
  format: string
  href?: string
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
    body: 'A standalone repo of importable workflow JSONs (inbox triage, competitive monitoring, research-first SDR, documentation-update agent). Today the BSW Growth Agent template is the only one published — more land here as guides ship. Free, MIT-licensed.',
    format: 'JSON · GitHub',
  },
  {
    title: 'Open-weight model comparison sheet',
    body: 'May 2026 snapshot: Qwen 3.6, Gemma 4, Kimi K2.6, DeepSeek V4, plus benchmarks (SWE-bench, AIME, GPQA), pricing on Together / Fireworks, and the local-fit-on-Strix-Point column.',
    format: 'CSV + web table',
  },
  {
    title: 'AI cost calculator',
    body: 'Plug in your monthly token volume, model mix, and team size. Outputs cloud-vs-local-vs-rented break-even, payback period, and the right deployment path. Coming soon.',
    format: 'Web tool',
  },
  {
    title: 'ROCm 7.3 + Strix Point setup cheatsheet',
    body: 'The kernel params, GART config, llama.cpp build flags, and verification commands on one printable page.',
    format: 'PDF · 1 page',
  },
]

const PRICE_LABELS: Record<Book['price'], string> = {
  free: 'Free',
  'pre-order': 'Pre-order',
  paid: 'Paid',
}

const AVAILABILITY_LABELS: Record<Book['availability'], string> = {
  available: 'Available',
  'coming-soon': 'Coming soon',
}

const SECTIONS = [
  { id: 'ebooks', label: 'E-books' },
  { id: 'free-resources', label: 'Free resources' },
  { id: 'newsletter', label: 'Newsletter' },
]

export default function LibraryPage() {
  return (
    <div className="space-y-12">
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">library</h1>
        <p className="text-sm text-muted leading-relaxed ">
          E-books, field guides, templates, and reference material in active
          drafting. Most are free; the flagship is pre-order. New material
          lands here as it ships. The companion repos are public, MIT, and
          forkable.
        </p>

        {/* Section quick-nav */}
        <nav className="mt-6 flex flex-wrap gap-2">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="font-mono text-xs px-3 py-1.5 border border-border text-muted hover:text-fg hover:border-fg transition-colors"
            >
              {label} ↓
            </a>
          ))}
        </nav>
      </section>

      {/* E-books */}
      <section id="ebooks" className="scroll-mt-20">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          E-books
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-6 ">
          Four free guides paid for by one flagship pre-order. Each one is in
          active drafting. Subscribe below to get notified the moment one
          ships.
        </p>
        <div className="divide-y divide-border">
          {BOOKS.map(({ title, subtitle, audience, format, price, availability, outcome }) => (
            <div key={title} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="font-mono text-sm text-fg">{title}</h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Badge variant="tag">{PRICE_LABELS[price]}</Badge>
                  {availability !== 'available' && (
                    <Badge variant="tag">{AVAILABILITY_LABELS[availability]}</Badge>
                  )}
                </div>
              </div>
              <p className="font-mono text-xs text-bench mb-2">{subtitle}</p>
              <p className="text-sm text-muted leading-relaxed mb-2">{outcome}</p>
              <p className="font-mono text-xs text-muted">
                {audience} · {format}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Free resources */}
      <section id="free-resources" className="border-t border-border pt-10 scroll-mt-20">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Free resources
        </h2>
        <div className="divide-y divide-border">
          {RESOURCES.map(({ title, body, format, href }) => (
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
                <span className="font-mono text-xs text-bench">
                  Coming soon
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="newsletter" className="scroll-mt-20">
        <NewsletterSignup
          source="library"
          sub="One email when each guide drops, and when The Sovereign Stack ships in fall 2026."
        />
      </section>
    </div>
  )
}

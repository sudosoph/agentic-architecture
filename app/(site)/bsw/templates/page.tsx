import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'n8n Workflow Templates',
  description:
    'Importable n8n workflow JSONs from the BSW 2026 workshop. Two paths: full version with Anthropic + Firecrawl, or the lite version with Groq + Jina (free tier).',
}

type Template = {
  slug: string
  title: string
  cost: string
  body: string
  filename: string
}

const TEMPLATES: Template[] = [
  {
    slug: 'lite',
    title: 'BSW Growth Agent · Lite (free tier path)',
    cost: '$0/month · 14-day Groq + Jina trial',
    body:
      'Same architecture as the full version, swapped onto free providers. Groq Llama 3.3 70B for drafting, Groq Llama 3.3 8B for routing, Jina Reader for extraction (no key required), n8n.cloud trial for orchestration. Built so workshop attendees can finish the build without entering a credit card.',
    filename: 'bsw-growth-agent-lite.json',
  },
  {
    slug: 'full',
    title: 'BSW Growth Agent · Full',
    cost: '~$8 to $15/month at workshop scale',
    body:
      'The production version. Claude Sonnet 4.6 for drafting, Claude Haiku 4.5 for routing and classification, Firecrawl Cloud for web extraction, Anthropic native web_search tool. Better voice match, better multilingual handling, more reliable on hard pages.',
    filename: 'bsw-growth-agent.json',
  },
]

const SEED_FILES = [
  {
    name: 'Google Sheet seed',
    body: 'Pre-filled config sheet with the columns the workflow expects (ICP description, signal keywords, daily cap, exclusion list).',
    filename: 'google-sheet-seed.csv',
  },
  {
    name: 'Do-not-contact list',
    body: 'Starter exclusion list. Add domains and email patterns the agent should never contact.',
    filename: 'do-not-contact-template.csv',
  },
]

export default function BswTemplatesPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <section className="pt-2">
        <Link href="/bsw" className="font-mono text-xs text-accent hover:underline">
          ← back to workshop
        </Link>
        <h1 className="font-mono text-2xl text-fg mt-3 mb-2">workflow templates</h1>
        <p className="text-sm text-muted leading-relaxed">
          Two ready-to-import n8n workflow JSONs. Pick the lite version to try
          the build for free, or the full version when you are ready to pay
          for better quality. Same workflow shape; different vendors plugged
          in.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          n8n workflows
        </h2>
        <div className="divide-y divide-border">
          {TEMPLATES.map(({ slug, title, cost, body, filename }) => (
            <div key={slug} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-mono text-sm text-fg">{title}</h3>
                <span className="font-mono text-xs text-bench shrink-0">{cost}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-3">{body}</p>
              <Link
                href={`/bsw/templates/${filename}`}
                download
                className="font-mono text-xs text-accent hover:underline"
              >
                download {filename} ↓
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-8">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Seed files
        </h2>
        <div className="divide-y divide-border">
          {SEED_FILES.map(({ name, body, filename }) => (
            <div key={filename} className="py-5 first:pt-0 last:pb-0">
              <h3 className="font-mono text-sm text-fg mb-1">{name}</h3>
              <p className="text-sm text-muted leading-relaxed mb-2">{body}</p>
              <Link
                href={`/bsw/templates/${filename}`}
                download
                className="font-mono text-xs text-accent hover:underline"
              >
                download {filename} ↓
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-8 space-y-3">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
          How to use these
        </h2>
        <ol className="space-y-2 text-sm text-muted leading-relaxed list-decimal list-inside">
          <li>
            Download the template you want above.
          </li>
          <li>
            Open n8n (cloud trial or self-hosted), click <span className="font-mono text-fg">Import from File</span>, drop the JSON in.
          </li>
          <li>
            The workflow loads with <span className="font-mono text-fg">REPLACE_ME</span> placeholders for credentials. Open n8n Credentials and add your real keys (never paste them into the workflow file).
          </li>
          <li>
            Read the <Link href="/bsw/setup" className="text-accent hover:underline">setup guide</Link> for the per-recipe details.
          </li>
          <li>
            For the full step-by-step, the <Link href="/bsw/tutorial" className="text-accent hover:underline">90-minute tutorial</Link> walks through every node.
          </li>
        </ol>
      </section>

      <section className="border-t border-border pt-8">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
          Other workshop materials
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/bsw/tutorial" className="text-accent hover:underline">
              90-min build-along tutorial →
            </Link>
          </li>
          <li>
            <Link href="/bsw/setup" className="text-accent hover:underline">
              Setup guide / provider swap-ins →
            </Link>
          </li>
          <li>
            <Link href="/bsw/handouts" className="text-accent hover:underline">
              Handouts (templates and references) →
            </Link>
          </li>
          <li>
            <Link href="/slides/bsw26.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Slide deck ↗
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

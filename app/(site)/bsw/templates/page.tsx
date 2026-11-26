import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'

export const metadata: Metadata = {
  title: 'n8n Workflow Templates',
  description:
    'Importable n8n workflow JSONs from the Boulder Startup Week workshop: full version with Claude + Firecrawl, or free-tier lite version with Groq + Jina.',
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
    title: 'BSW Growth Agent · Lite (Free-Tier Path)',
    cost: 'Free-tier trial providers',
    body:
      'Same architecture as the full version, swapped onto free-tier providers: Groq Llama 3.3 70B for drafting, Groq Llama 3.3 8B for routing, Jina Reader for extraction, and n8n orchestration.',
    filename: 'bsw-growth-agent-lite.json',
  },
  {
    slug: 'full',
    title: 'BSW Growth Agent · Production Path',
    cost: 'Usage-metered APIs',
    body:
      'Production configuration pairing Claude Sonnet for drafting, Claude Haiku for routing and classification, and Firecrawl for clean Markdown extraction.',
    filename: 'bsw-growth-agent.json',
  },
]

const SEED_FILES = [
  {
    name: 'Google Sheets configuration seed',
    body: 'Pre-filled configuration sheet with the columns the workflow expects (ICP description, signal keywords, daily cap, exclusion list).',
    filename: 'google-sheet-seed.csv',
  },
  {
    name: 'Do-not-contact list',
    body: 'Starter exclusion list for domains and email patterns the workflow should never contact.',
    filename: 'do-not-contact-template.csv',
  },
]

export default function BswTemplatesPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <div className="space-y-3">
        <Link href="/bsw" className="text-xs font-medium text-muted hover:text-fg">
          Back to workshop archive
        </Link>
        <PageHeader
          title="Workflow Templates"
          description="Two ready-to-import n8n workflow JSONs: start with the free-tier configuration or step up to the production API path."
        />
      </div>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-normal text-fg">n8n workflows</h2>
        <div className="divide-y divide-border border-t border-b border-border">
          {TEMPLATES.map(({ slug, title, cost, body, filename }) => (
            <div key={slug} className="py-5">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-base font-semibold text-fg">{title}</h3>
                <span className="text-xs text-muted shrink-0">{cost}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-3">{body}</p>
              <Link
                href={`/bsw/templates/${filename}`}
                download
                className="text-xs font-medium text-fg hover:text-accent underline underline-offset-3 decoration-border"
              >
                Download {filename}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-normal text-fg">Seed files</h2>
        <div className="divide-y divide-border border-t border-b border-border">
          {SEED_FILES.map(({ name, body, filename }) => (
            <div key={filename} className="py-5">
              <h3 className="text-base font-semibold text-fg mb-1">{name}</h3>
              <p className="text-sm text-muted leading-relaxed mb-2">{body}</p>
              <Link
                href={`/bsw/templates/${filename}`}
                download
                className="text-xs font-medium text-fg hover:text-accent underline underline-offset-3 decoration-border"
              >
                Download {filename}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

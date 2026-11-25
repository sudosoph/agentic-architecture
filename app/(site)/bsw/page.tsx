import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

const REPO_URL = 'https://github.com/sudosoph/bsw26-agentic-workflows'
const SLIDES_URL = '/slides/bsw26.html'

export const metadata: Metadata = {
  title: 'Boulder Startup Week 2026 Workshop Archive',
  description:
    'Open-source slides, 17-step n8n tutorial, and printable handouts delivered May 7, 2026 to 300+ founders and operators at Boulder Startup Week.',
}

type Material = {
  label: string
  body: string
  href: string
  external: boolean
  cta: string
}

const MATERIALS: Material[] = [
  {
    label: 'Workshop Slide Deck (50 Slides)',
    body: 'Full presentation deck from the RegenHub session. Opens in a new tab; press F for fullscreen and use arrow keys to navigate.',
    href: SLIDES_URL,
    external: true,
    cta: 'Open the deck ↗',
  },
  {
    label: '17-Step Tutorial: Build the Discovery Engine',
    body: 'Copy-paste step-by-step build walkthrough so you can stand up the exact customer-discovery workflow on your own schedule.',
    href: '/bsw/tutorial',
    external: false,
    cta: 'Read the tutorial →',
  },
  {
    label: 'Provider Swap & Setup Guide',
    body: 'How to swap LLM and scraping providers cleanly without rewriting your workflow logic.',
    href: '/bsw/setup',
    external: false,
    cta: 'Read the setup guide →',
  },
  {
    label: 'n8n Workflow JSON Templates',
    body: 'Ready-to-import workflow JSON files for both free-tier testing and daily production runs.',
    href: '/bsw/templates',
    external: false,
    cta: 'Download templates →',
  },
  {
    label: 'Printable Handouts & voice.md Worksheets',
    body: 'Brand voice template, ICP template, JSON schemas, and the 20/80 task readiness worksheet.',
    href: '/bsw/handouts',
    external: false,
    cta: 'Open handouts →',
  },
  {
    label: 'MIT-Licensed Source Repository',
    body: 'Clone or fork the complete workshop code, templates, and slide deck on GitHub.',
    href: REPO_URL,
    external: true,
    cta: 'Open repo on GitHub ↗',
  },
]

const TAKEAWAYS = [
  {
    title: 'Spot your 20% agent-ready tasks',
    body: 'Use a simple scoring rubric to separate repetitive high-volume chores from the 80% of relationship and judgment work that stays human.',
  },
  {
    title: 'Ship a working discovery workflow',
    body: 'Connect Google Sheets, your portable voice.md file, and n8n to draft personalized outreach into Gmail Drafts automatically.',
  },
  {
    title: 'Keep a strict human-in-the-loop gate',
    body: 'Drafts wait for your eyes before anything leaves your inbox, keeping brand voice and accuracy intact.',
  },
]

export default function BswPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="online">Delivered May 7, 2026 · 300+ Attendees</Badge>
          <span className="font-mono text-xs text-muted">Boulder Startup Week · RegenHub</span>
        </div>
        <PageHeader
          title="Architecting Agentic Workflows for the Lean Startup"
          description="Complete open-source slides, 17-step code-along tutorial, n8n JSON workflows, and handouts from Sophia Stein’s standing-room Boulder Startup Week workshop."
        />
      </div>

      {/* Materials Bento */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-fg">Open Workshop Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MATERIALS.map(({ label, body, href, external, cta }) => {
            const inner = (
              <Card className="p-6 h-full flex flex-col justify-between space-y-3 hover:border-accent transition-colors">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-fg">{label}</h3>
                  <p className="text-sm text-muted leading-relaxed">{body}</p>
                </div>
                <p className="font-mono text-xs font-semibold text-accent">{cta}</p>
              </Card>
            )
            return external ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block">
                {inner}
              </a>
            ) : (
              <Link key={label} href={href} className="block">
                {inner}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Core Takeaways */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-fg">Three Core Patterns From the Lab</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TAKEAWAYS.map(({ title, body }) => (
            <Card key={title} className="p-6 space-y-2 bg-surface">
              <h3 className="text-base font-bold text-fg">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h2 className="text-xl font-bold text-fg">
            Missed the Live Boulder Session or Ready to Go Deeper?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Join the next free 60-minute live online masterclass, bring this workshop privately to
            your company, or book a 1:1 workflow audit with Sophia.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="md" href="/masterclass">
            Free 60-Min Live Masterclass →
          </Button>
          <Button variant="outline" size="md" href="/work-with-me">
            Work With Sophia
          </Button>
          <Button variant="ghost" size="md" href={SITE_CONFIG.cal.speaking}>
            Book for Your Event
          </Button>
        </div>
      </section>

      <NewsletterSignup source="bsw" />
    </div>
  )
}

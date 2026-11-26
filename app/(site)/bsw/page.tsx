import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

const SLIDES_URL = '/slides/bsw26.html'

export const metadata: Metadata = {
  title: 'Boulder Startup Week Workshop Archive',
  description:
    'Open-source slides, 17-step n8n tutorial, and printable handouts delivered to 300+ founders and operators at Boulder Startup Week.',
  alternates: { canonical: '/bsw' },
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
    body: 'Complete presentation deck from the RegenHub session. Opens in a new tab; press F for fullscreen and use arrow keys to navigate.',
    href: SLIDES_URL,
    external: true,
    cta: 'Open slide deck',
  },
  {
    label: '17-Step Tutorial: Build the Discovery Engine',
    body: 'Step-by-step build walkthrough so you can stand up the customer-discovery workflow on your own schedule.',
    href: '/bsw/tutorial',
    external: false,
    cta: 'Read the tutorial',
  },
  {
    label: 'Provider Swap & Setup Guide',
    body: 'How to swap model and search providers cleanly without rewriting your workflow logic.',
    href: '/bsw/setup',
    external: false,
    cta: 'Read setup guide',
  },
  {
    label: 'n8n Workflow JSON Templates',
    body: 'Ready-to-import workflow JSON files for both free-tier testing and daily production runs.',
    href: '/bsw/templates',
    external: false,
    cta: 'Download templates',
  },
  {
    label: 'Printable SOP & Qualification Handouts',
    body: 'Plain-English SOP sheet, buyer qualification criteria, JSON schemas, and the 20/80 task readiness worksheet.',
    href: '/bsw/handouts',
    external: false,
    cta: 'Open handouts',
  },
  {
    label: '20/80 Interactive Readiness Scorer',
    body: 'Score your own recurring bottlenecks directly in the browser and download the updated templates.',
    href: '/starter-kit',
    external: false,
    cta: 'Open interactive scorer',
  },
]

const TAKEAWAYS = [
  {
    title: 'Spot your 20% agent-ready tasks',
    body: 'Use a clear scoring rubric to separate repetitive high-volume chores from the 80% of relationship and judgment work that stays human.',
  },
  {
    title: 'Ship a working discovery workflow',
    body: 'Connect Google Sheets, your plain-English SOP and qualification criteria, and n8n to stage personalized outreach drafts automatically.',
  },
  {
    title: 'Keep a strict human-in-the-loop gate',
    body: 'Drafts wait for human review before anything leaves your inbox, keeping brand voice and accuracy intact.',
  },
]

export default function BswPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Boulder Startup Week · RegenHub · 300+ Attendees"
        title="Architecting Agentic Workflows for the Lean Startup"
        description="Open-source slides, 17-step build tutorial, n8n JSON workflows, and printable handouts from Sophia Stein’s standing-room Boulder Startup Week workshop."
      />

      {/* Materials Grid */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
          Open workshop materials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MATERIALS.map(({ label, body, href, external, cta }) => {
            const inner = (
              <Card
                interactive
                className="p-6 h-full flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-fg">{label}</h3>
                  <p className="text-sm text-muted leading-relaxed">{body}</p>
                </div>
                <p className="text-xs font-medium text-fg">{cta}</p>
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
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
          Three core patterns from the lab
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TAKEAWAYS.map(({ title, body }) => (
            <Card key={title} className="p-6 space-y-2">
              <h3 className="text-base font-semibold text-fg">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="rounded-lg border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h2 className="font-serif text-2xl font-normal text-fg">
            Missed the live Boulder session or ready to go deeper?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Explore the Agentic Architect Lab tracks, bring this workshop privately to your
            organization, or inquire about bespoke advisory.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="md" href="/courses">
            Explore Courses &amp; Lab
          </Button>
          <Button variant="outline" size="md" href="/work-with-me">
            Work With Me
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

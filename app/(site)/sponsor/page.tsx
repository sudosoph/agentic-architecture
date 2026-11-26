import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Sponsor Agentic Architect',
  description:
    'Partner with Agentic Architect across essays and the weekly Substack dispatch. Single partner per issue, full editorial independence.',
  alternates: { canonical: '/sponsor' },
}

const FORMATS = [
  {
    tag: 'Weekly Dispatch',
    name: 'Single Newsletter & Essay Issue',
    spec: 'Exclusive top-of-issue partner note · permanent web edition',
    body: 'One clearly labeled partner placement in a weekly Substack edition paired with its permanent essay on agenticarchitect.ai.',
  },
  {
    tag: 'Monthly Series',
    name: 'Four-Issue Category Exclusivity',
    spec: 'Four consecutive weekly editions · exclusive category slot',
    body: 'Reserved placement across four weekly dispatches with category exclusivity so no competing product appears alongside yours.',
  },
  {
    tag: 'Evergreen Resource',
    name: 'Open Guide or Field Manual Patron',
    spec: 'Long-term placement on an unlocked tutorial or benchmark hub',
    body: 'Sustained visibility on step-by-step workflow tutorials and reference guides read by founders, operators, and technical leaders.',
  },
]

const AUDIENCE_FACTS = [
  {
    label: 'Readership',
    value: 'Founders, COOs, operators, and technical builders implementing real AI workflows',
  },
  {
    label: 'Distribution',
    value: `${SITE_CONFIG.newsletterName} weekly dispatch on Substack + search-canonical essays`,
  },
  {
    label: 'Best-Fit Partners',
    value: 'Workspace software, developer & API infrastructure, analytics, and privacy-first hardware',
  },
  {
    label: 'Editorial Policy',
    value: 'Single partner per issue, transparent disclosure, zero tracking pixels, full editorial independence',
  },
]

export default function SponsorPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Partnerships · Full Editorial Independence"
        title="Sponsor Agentic Architect"
        description="Introduce developer tools, workflow platforms, and privacy-first infrastructure to founders, operators, and technical decision-makers."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FORMATS.map(tier => (
          <Card key={tier.name} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <Badge variant="tag">{tier.tag}</Badge>
              <h2 className="font-serif text-xl font-normal text-fg">{tier.name}</h2>
              <p className="text-xs font-medium text-fg/80">{tier.spec}</p>
              <p className="text-sm text-muted leading-relaxed">{tier.body}</p>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AUDIENCE_FACTS.map(fact => (
          <Card key={fact.label} className="p-5 space-y-1">
            <p className="text-xs font-medium text-muted">{fact.label}</p>
            <p className="text-sm font-medium text-fg">{fact.value}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-normal text-fg">
            Request availability &amp; media kit
          </h2>
          <p className="text-sm text-muted">
            Share your product URL and preferred placement window; we reply within two business
            days.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="md" href="/contact">
            Send Sponsorship Inquiry
          </Button>
          <Button variant="outline" size="md" href="/stack">
            View Reference Stack
          </Button>
        </div>
      </section>
    </div>
  )
}

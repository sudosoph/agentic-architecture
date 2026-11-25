import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Sponsor Agentic Architect',
  description:
    'Partner with Agentic Architect across weekly playbooks and the Substack newsletter. Single sponsor per issue, full editorial independence.',
  alternates: { canonical: '/sponsor' },
}

const TIERS = [
  {
    name: 'Single Playbook & Newsletter Issue',
    spec: 'Exclusive top-of-issue partner callout · permanent web archive',
    starting: '$500',
    body: 'One clearly labeled partner block in a weekly Substack edition and its matching permanent playbook on agenticarchitect.ai.',
  },
  {
    name: '4-Issue Monthly Partner Package',
    spec: 'Four consecutive weekly editions · category exclusivity',
    starting: '$1,800',
    body: 'Reserved placement across four weekly issues with category exclusivity so no competing product runs during your month.',
  },
  {
    name: 'Open Guide or Starter Kit Patron',
    spec: '12-month placement on a flagship guide or lab archive',
    starting: '$2,500',
    body: 'Long-tail placement on a high-intent step-by-step tutorial or open workshop archive read by founders and technical decision-makers.',
  },
]

const AUDIENCE_FACTS = [
  {
    label: 'Readership',
    value: 'Business owners, COOs, founders, and AI builders implementing practical workflows',
  },
  {
    label: 'Newsletter',
    value: `${SITE_CONFIG.newsletterName} published weekly on Substack`,
  },
  {
    label: 'Best-Fit Partners',
    value: 'Workflow tools, workspace software, developer infrastructure, and privacy-first hardware',
  },
  {
    label: 'Editorial Policy',
    value: 'Single partner per issue, clear disclosure, zero tracking pixels, full editorial independence',
  },
]

export default function SponsorPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        meta="Partnerships · Full Editorial Firewall"
        title="Sponsor Agentic Architect"
        description="Reach founders, operators, and technical leaders who actively buy workflow software, infrastructure, and enablement tools."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TIERS.map(tier => (
          <Card key={tier.name} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <Badge variant="tag">Starting at {tier.starting}</Badge>
              <h2 className="text-lg font-bold text-fg">{tier.name}</h2>
              <p className="font-mono text-xs text-accent">{tier.spec}</p>
              <p className="text-sm text-muted leading-relaxed">{tier.body}</p>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AUDIENCE_FACTS.map(fact => (
          <Card key={fact.label} className="p-5 bg-surface space-y-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              {fact.label}
            </p>
            <p className="text-sm font-medium text-fg">{fact.value}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-fg">Request Current Availability &amp; Media Kit</h2>
          <p className="text-sm text-muted">
            Share your product URL and preferred tier; replies go out within two business days.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            href="/contact?subject=Sponsorship%20Inquiry"
          >
            Send Sponsorship Inquiry →
          </Button>
          <Button variant="outline" size="md" href="/stack">
            View Current Stack →
          </Button>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Boulder & Denver Corporate AI Training, Workshops & Advisory',
  description:
    'In-person and hybrid corporate AI workshops, executive workflow diagnostics, and keynotes across Boulder, Denver, and the Colorado Front Range by Sophia Stein.',
  alternates: { canonical: '/boulder' },
}

const COLORADO_PROGRAMS = [
  {
    badge: 'On-Site or Hybrid · Half-Day Intensive',
    title: 'Leadership & Operations AI Workflow Lab',
    body: 'Hands-on 3.5-hour session for Boulder, Denver, and Front Range teams (10 to 40 participants). Standardize departmental operating context, score operational bottlenecks, and build human-reviewed workflows across Sales, Intake, and Operations.',
  },
  {
    badge: 'On-Site · Full-Day Enablement',
    title: 'Organization-Wide AI Enablement & Governance Lab',
    body: 'Morning executive build-vs-buy, data privacy, and cost-governance briefing paired with afternoon functional build tracks across Operations, GTM, Finance, and Client Delivery.',
  },
  {
    badge: 'Executive Diagnostic',
    title: 'Front Range Founder & COO Architecture Roadmap',
    body: 'Focused 1:1 teardown of your team’s recurring manual bottlenecks and overlapping AI subscriptions, delivered with a written implementation charter.',
  },
  {
    badge: 'Conferences, Offsites & Universities',
    title: 'Colorado Keynotes & Campus Seminars',
    body: 'Practical keynotes and applied university guest lectures backed by open-source lab curricula, following a standing-room 300+ attendee workshop at Boulder Startup Week.',
  },
]

export default function BoulderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${SITE_CONFIG.siteName} · Colorado Corporate AI Training & Advisory`,
    url: `${SITE_CONFIG.siteUrl}/boulder`,
    areaServed: ['Boulder, CO', 'Denver, CO', 'Broomfield, CO', 'Fort Collins, CO', 'Colorado'],
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.authorName,
    },
    description:
      'Hands-on corporate AI enablement workshops, executive workflow diagnostics, keynotes, and private AI advisory across Boulder, Denver, and the Colorado Front Range.',
  }

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-4">
        <PageHeader
          meta="Based in Boulder, CO · Serving Denver & the Colorado Front Range"
          title="Boulder & Denver Corporate AI Training, Workshops & Advisory"
          description="Practical, in-person AI enablement and architecture advisory for Colorado leadership teams, regulated groups, founders, and university programs."
        />
        <div className="flex flex-wrap gap-3 pt-1">
          <Button variant="primary" size="lg" href={SITE_CONFIG.cal.speaking}>
            Schedule Colorado Workshop Intake
          </Button>
          <Button variant="outline" size="lg" href={SITE_CONFIG.cal.audit}>
            Schedule Diagnostic Call
          </Button>
          <a
            href="/downloads/corporate-ai-workshop-sheet.md"
            download
            className="press-scale inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-fg hover:border-fg/45"
          >
            Download 1-Page Workshop Sheet
          </a>
        </div>
      </div>

      {/* Local Credibility Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 space-y-1">
          <p className="font-serif text-2xl text-fg tabular-nums">300+ Attendees</p>
          <p className="text-xs font-medium text-fg">Boulder Startup Week</p>
          <p className="text-xs text-muted">Standing-room workflow build lab at RegenHub</p>
        </Card>
        <Card className="p-5 space-y-1">
          <p className="font-serif text-2xl text-fg">In-Person Across CO</p>
          <p className="text-xs font-medium text-fg">Boulder, Denver &amp; Front Range</p>
          <p className="text-xs text-muted">Zero travel overhead for local offsites and office labs</p>
        </Card>
        <Card className="p-5 space-y-1">
          <p className="font-serif text-2xl text-fg">Owned Workflows</p>
          <p className="text-xs font-medium text-fg">Built Inside Your Stack</p>
          <p className="text-xs text-muted">Plain-English SOPs, privacy tiers, and human review gates</p>
        </Card>
      </section>

      {/* Programs Grid */}
      <section className="space-y-5">
        <h2 className="font-serif text-3xl font-normal text-fg">
          Front Range training &amp; advisory formats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {COLORADO_PROGRAMS.map(item => (
            <Card key={item.title} className="p-6 space-y-3">
              <Badge variant="tag">{item.badge}</Badge>
              <h3 className="font-serif text-xl font-normal text-fg">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Local Links */}
      <section className="rounded-lg border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h2 className="font-serif text-2xl font-normal text-fg">
            Inspect our Boulder Startup Week lab or university syllabi
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Browse the open-source slides and 17-step build from Boulder Startup Week at{' '}
            <Link href="/bsw" className="text-fg underline underline-offset-3 decoration-border">
              /bsw
            </Link>{' '}
            or view university syllabi on{' '}
            <Link
              href="/teaching"
              className="text-fg underline underline-offset-3 decoration-border"
            >
              /teaching
            </Link>
            .
          </p>
        </div>
        <Button variant="primary" size="md" href={SITE_CONFIG.cal.speaking}>
          Schedule Front Range Intake
        </Button>
      </section>
    </div>
  )
}

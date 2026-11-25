import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Boulder & Denver Corporate AI Training, Workshops & Advisory',
  description:
    'On-site and virtual corporate AI workshops, executive workflow audits, and keynotes in Boulder, Denver, and the Colorado Front Range by Sophia Stein (Columbia CS, ex-McKinsey).',
  alternates: { canonical: '/boulder' },
}

const COLORADO_PROGRAMS = [
  {
    badge: 'On-Site or Hybrid · Half Day ($7,500)',
    title: 'Leadership & Operations AI Workflow Intensive',
    body: '3.5-hour hands-on lab for Boulder, Denver, and Front Range teams (10 to 40 staff). Build a shared company Brand & SOP Brain (voice.md), score departmental bottlenecks, and wire human-approved operational workflows.',
  },
  {
    badge: 'On-Site · Full Day ($15,000)',
    title: 'Organization-Wide AI Enablement & Roadmap Lab',
    body: 'Morning executive ROI, data privacy, and cost-governance session paired with afternoon department build tracks across Operations, Sales/Marketing, and Client Delivery.',
  },
  {
    badge: '90-Min Executive Session ($1,500 · 100% Creditable)',
    title: 'Front Range Founder & COO Workflow Audit',
    body: 'Rapid 1:1 teardown of your team’s weekly busywork and software spend, delivered with a written 90-day implementation roadmap. 100% credited toward a Half-Day or Full-Day Intensive.',
  },
  {
    badge: 'Conferences, Offsites & Universities',
    title: 'Colorado Keynotes & CU Boulder Guest Lectures',
    body: 'High-energy keynotes and applied seminars backed by open-source lab curricula, following a standing-room 300+ attendee workshop at Boulder Startup Week.',
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
      alumniOf: 'Columbia University',
    },
    description:
      'Hands-on corporate AI enablement workshops, executive workflow audits, keynotes, and private AI advisory across Boulder, Denver, and the Colorado Front Range.',
  }

  return (
    <div className="space-y-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="online">Based in Boulder, CO · Serving Denver &amp; the Front Range</Badge>
          <span className="font-mono text-xs text-muted">Zero Travel Overhead for Front Range On-Sites</span>
        </div>
        <PageHeader
          title="Boulder & Denver Corporate AI Training, Workshops & Advisory"
          description="Practical, in-person AI enablement for Colorado founders, leadership teams, healthcare and enterprise groups, and university programs."
        />
        <div className="flex flex-wrap gap-3 pt-1">
          <Button variant="primary" size="lg" href={SITE_CONFIG.cal.speaking}>
            Book a 20-Min Colorado Workshop Intake →
          </Button>
          <Button variant="outline" size="lg" href={SITE_CONFIG.cal.audit}>
            Book a $1,500 VIP 90-Min Audit
          </Button>
          <a
            href="/downloads/corporate-ai-workshop-sheet.md"
            download
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-accent hover:underline"
          >
            Download 1-Page Workshop Sheet ↓
          </a>
        </div>
      </div>

      {/* Local Credibility Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-surface space-y-1">
          <p className="text-2xl font-extrabold text-accent">300+</p>
          <p className="text-xs font-semibold text-fg">Colorado Founders &amp; Operators Trained</p>
          <p className="text-xs text-muted">Standing-room Boulder Startup Week lab at RegenHub</p>
        </Card>
        <Card className="p-5 bg-surface space-y-1">
          <p className="text-2xl font-extrabold text-online">Ex-McKinsey</p>
          <p className="text-xs font-semibold text-fg">Boardroom-Ready ROI &amp; Governance</p>
          <p className="text-xs text-muted">250+ enterprise &amp; healthcare leaders enabled (79 NPS)</p>
        </Card>
        <Card className="p-5 bg-surface space-y-1">
          <p className="text-2xl font-extrabold text-fg">Columbia CS</p>
          <p className="text-xs font-semibold text-fg">Real Systems Engineering Depth</p>
          <p className="text-xs text-muted">Translating architecture into plain-English SOPs</p>
        </Card>
        <Card className="p-5 bg-surface space-y-1">
          <p className="text-2xl font-extrabold text-rig">$0 Travel</p>
          <p className="text-xs font-semibold text-fg">Local Across Boulder &amp; Denver</p>
          <p className="text-xs text-muted">In-person offsites, office labs, and campus lectures</p>
        </Card>
      </section>

      {/* Programs Grid */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-fg">Front Range Training &amp; Advisory Formats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {COLORADO_PROGRAMS.map(item => (
            <Card key={item.title} className="p-6 space-y-3">
              <Badge variant="tag">{item.badge}</Badge>
              <h3 className="text-lg font-bold text-fg">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Team ROI Calculator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-fg">
          Calculate Your Team’s Reclaimed Capacity Before Booking
        </h2>
        <RoiCalculator />
      </section>

      {/* Local Links */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h2 className="text-xl font-bold text-fg">
            Inspect Our Boulder Startup Week Lab or University Syllabi
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Browse the open-source slides and 17-step build from Boulder Startup Week at{' '}
            <Link href="/bsw" className="text-accent font-medium hover:underline">
              /bsw
            </Link>{' '}
            or view university syllabi on{' '}
            <Link href="/teaching" className="text-accent font-medium hover:underline">
              /teaching
            </Link>
            .
          </p>
        </div>
        <Button variant="primary" size="md" href={SITE_CONFIG.cal.speaking}>
          Schedule Front Range Intake →
        </Button>
      </section>

      <p className="text-xs text-muted border-t border-border pt-6">
        {SITE_CONFIG.personalCapacityNote}
      </p>
    </div>
  )
}

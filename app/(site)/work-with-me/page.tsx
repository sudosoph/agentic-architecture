import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Bespoke AI Builds, $1,500 Blueprint & Executive Rollouts',
  description:
    'Have Sophia Stein custom-build AI workflows inside your business in 30 days, start with a guaranteed $1,500 48-Hour AI Blueprint, or book a private leadership team intensive.',
  alternates: { canonical: '/work-with-me' },
}

const GRAND_SLAM_OFFERS = [
  {
    badge: 'Step 1 Diagnostic · $15,000 Savings Guarantee',
    badgeVariant: 'online' as const,
    title: '48-Hour Custom AI Blueprint & Margin Audit',
    price: '$1,500 (100% Credited Toward Any Build or Cohort)',
    detail:
      'Replaces open-ended hourly consulting with a concrete asset in 48 hours: your custom 6-Role AI Org Chart, SaaS/payroll waste teardown, and private data boundary plan.',
    guarantee:
      'The $15,000 Savings Guarantee: If we do not identify at least $15,000/yr in recoverable payroll/software spend and 10+ hrs/week of executive capacity on our 90-minute teardown, I refund 100% on the spot.',
    href: SITE_CONFIG.cal.audit,
    cta: 'Book 48-Hour AI Blueprint ($1,500) →',
  },
  {
    badge: 'Done-For-You White-Glove Sprint · 30 Days',
    badgeVariant: 'rig' as const,
    title: 'Bespoke AI Automation Build (We Build It For You)',
    price: '$12,500 to $25,000 (Fixed Scope)',
    detail:
      'For $1M to $50M owners who have more capital than free hours. We custom-build 3 to 6 production AI workflows directly inside your inbox, calendar, CRM, and docs, complete with video SOPs and live handoff training for your staff.',
    guarantee:
      '30-Day Zero-Break Warranty: Every workflow ships inside your own accounts (zero agency lock-in) with 30 days of post-launch tuning and operator support included.',
    href: SITE_CONFIG.cal.scoping,
    cta: 'Apply for a Bespoke Build Call →',
  },
  {
    badge: 'Done-With-You Cohort · EA / COO Seat Included FREE',
    badgeVariant: 'online' as const,
    title: '8-Week Executive AI Operating System Cohort',
    price: '$5,997 Founding · $8,997 Standard',
    detail:
      'Want your in-house team to master the workflows permanently? Attend Week 1 strategy while we train your EA, Chief of Staff, or Ops Manager (included FREE, $2,500 value) over 8 weeks to wire and maintain all 6 systems.',
    guarantee:
      '14-Day Live-System Promise: At least 2 AI workflows live and saving 8+ hrs/week by Day 14, or we keep coaching your operator free until they run.',
    href: '/accelerator',
    cta: 'Explore the 8-Week Cohort →',
    secondaryHref: SITE_CONFIG.cal.acceleratorFounding,
    secondaryCta: 'Claim Founding Seat ($5,997)',
  },
  {
    badge: 'Private Leadership & Staff Intensive (10 to 100+ Staff)',
    badgeVariant: 'tag' as const,
    title: 'Executive & Team AI Deployment Lab',
    price: '$9,500 Half-Day · $15,000 Full-Day',
    detail:
      'On-site (zero travel fee in Boulder & Denver) or virtual build day for established companies, clinics, and advisory firms. Includes pre-workshop department audit and 30-day champion check-in.',
    guarantee:
      'Same-Day Output Standard: Every department leaves with shared company context files and 2 live, human-approved workflows running before 5 PM.',
    href: SITE_CONFIG.cal.speaking,
    cta: 'Scope a Private Team Lab →',
  },
]

const WORK_FAQS = [
  {
    q: 'Should I choose the Bespoke AI Build ($12.5K+) or the 8-Week Cohort ($5,997)?',
    a: 'Choose the 30-Day Bespoke Build if you want Sophia to engineer your custom workflows directly inside your company workspace and hand the keys to your staff. Choose the 8-Week Cohort if you want your EA, COO, or Ops Manager trained step-by-step (their seat is included free) to build and expand workflows in-house.',
  },
  {
    q: 'Why is there no $500 1-hour consultation on this page?',
    a: 'Selling an isolated hour of advice leaves busy owners with a to-do list instead of a result. New clients either join our free 60-minute live AI Org Chart Briefing, apply via a 15-minute Executive Fit Call ($500K+ revenue or 5+ team size), or book the $1,500 48-Hour Custom AI Blueprint backed by our $15,000 Savings Guarantee.',
  },
  {
    q: 'What if I am a CTO or investor looking for technical architecture advisory?',
    a: 'Sophia reserves two monthly technical advisory seats ($5,000+/mo) for engineering leaders and boards. Visit our Research & Teaching hub (/research) or book an Executive Fit Call to check availability.',
  },
]

export default function WorkWithMePage() {
  const workLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_CONFIG.siteUrl}/work-with-me#service`,
        name: 'Bespoke AI Automation Builds, Custom AI Blueprints & Executive Rollouts',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
        },
        areaServed: ['Boulder, CO', 'Denver, CO', 'United States'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Agentic Architect Owner & Enterprise Offers',
          itemListElement: [
            { '@type': 'Offer', name: '48-Hour Custom AI Blueprint & Margin Audit', price: '1500', priceCurrency: 'USD' },
            { '@type': 'Offer', name: '8-Week Executive AI Operating System Cohort (Includes Free Operator Seat)', price: '5997', priceCurrency: 'USD' },
            { '@type': 'Offer', name: 'Executive & Team AI Deployment Lab (Half-Day)', price: '9500', priceCurrency: 'USD' },
            { '@type': 'Offer', name: '30-Day Bespoke AI Automation Build', price: '12500', priceCurrency: 'USD' },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: WORK_FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="space-y-14">
        <PageHeader
          meta="Done-For-You Bespoke Sprints · Guaranteed Blueprints · Team Labs"
          title="Bespoke AI Builds & Advisory"
          description="Outcome-guaranteed AI engagements for $1M to $50M business owners, firm principals, and leadership teams who want working systems instead of hourly advice."
        />

        {/* Interactive ROI Calculator */}
        <section className="space-y-4">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Run the Payroll vs. Automation Math First
            </p>
            <h2 className="text-2xl font-bold text-fg mt-1">
              Adding $65,000+ Headcount vs. Installing Owned AI Workflows
            </h2>
          </div>
          <RoiCalculator />
        </section>

        {/* 2x2 Hormozi Grand Slam Offer Grid */}
        <section id="offers" className="space-y-5 scroll-mt-20">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Outcome-Backed Offers (Zero Hourly Billing)
            </p>
            <h2 className="text-2xl font-bold text-fg mt-1">
              Have Us Build It Custom, Or Train Your Operator In-House
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GRAND_SLAM_OFFERS.map(offer => (
              <Card key={offer.title} className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <Badge variant={offer.badgeVariant}>{offer.badge}</Badge>
                  <h3 className="text-xl font-bold text-fg">{offer.title}</h3>
                  <p className="font-mono text-sm font-semibold text-accent">{offer.price}</p>
                  <p className="text-sm text-muted leading-relaxed">{offer.detail}</p>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-xs text-fg leading-relaxed">
                    <strong className="text-online">Guarantee:</strong> {offer.guarantee}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Button variant="primary" size="md" href={offer.href}>
                    {offer.cta}
                  </Button>
                  {'secondaryHref' in offer && offer.secondaryHref && (
                    <Button variant="outline" size="md" href={offer.secondaryHref}>
                      {offer.secondaryCta}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Qualified 15-Min Executive Fit Call + Technical Wing Bridge */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-7 p-6 bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
                For $500K+ Revenue Owners &amp; 5+ Person Teams · $0
              </p>
              <h3 className="text-lg font-bold text-fg">15-Minute Executive Fit &amp; Scoping Call</h3>
              <p className="text-sm text-muted leading-relaxed">
                Deciding between a 30-Day Bespoke AI Build, the 8-Week Cohort, or a Private Team Lab?
                Book a quick 15-minute fit check to pick the highest-return path.
              </p>
            </div>
            <div className="shrink-0">
              <Button variant="outline" size="md" href={SITE_CONFIG.cal.scoping}>
                Book 15-Min Fit Call →
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-fg">University, Keynotes &amp; CTO Research?</h3>
              <p className="text-sm text-muted leading-relaxed">
                Explore our CU Boulder syllabi, 18-chapter Sovereign Stack book, and CTO advisory in{' '}
                <Link href="/research" className="text-accent font-medium hover:underline">
                  Research &amp; Teaching
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" href="/contact">
                Send a Note
              </Button>
              <Button variant="ghost" size="sm" href="/sponsor">
                Sponsorships →
              </Button>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-fg">Bespoke Build &amp; Guarantee FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WORK_FAQS.map(faq => (
              <Card key={faq.q} className="p-6 space-y-2">
                <h3 className="text-sm font-bold text-fg leading-snug">{faq.q}</h3>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

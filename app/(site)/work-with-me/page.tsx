import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Book a VIP 90-Min AI Workflow Audit, 1:1 Strategy Session, 8-week Agentic Business Accelerator seat, Private Corporate AI Workshop, or Executive Advisory.',
  alternates: { canonical: '/work-with-me' },
}

const PRIMARY_OFFERS = [
  {
    badge: 'Flagship 8-Week Cohort',
    badgeVariant: 'online' as const,
    title: 'Agentic Business Accelerator',
    price: '$5,997 Founding · $8,997 Standard',
    detail:
      'Done-With-You implementation installing 6 revenue, content, and operations AI workflows inside your business over 8 weeks. Optional +$1,500 seat for your Ops Lead or EA.',
    href: '/accelerator',
    cta: 'Explore the Accelerator →',
    secondaryHref: SITE_CONFIG.cal.acceleratorFounding,
    secondaryCta: 'Instant Founding Seat ($5,997)',
  },
  {
    badge: '90-Min Deep Dive · 100% Creditable',
    badgeVariant: 'rig' as const,
    title: 'VIP 90-Min AI Workflow & Cost Audit',
    price: '$1,500 (Paid on Booking via Stripe)',
    detail:
      '1:1 executive teardown of your team’s weekly bottlenecks, SaaS spend, and highest-ROI automation opportunities. Includes a written 90-day roadmap and 100% fee credit toward the Accelerator or Corporate Training.',
    href: SITE_CONFIG.cal.audit,
    cta: 'Book VIP 90-Min Audit →',
  },
  {
    badge: 'Half-Day or Full-Day Team Lab',
    badgeVariant: 'tag' as const,
    title: 'Private Corporate AI Intensive & Enablement',
    price: '$7,500 to $15,000',
    detail:
      'Hands-on on-site or remote training rolling out portable Brand Brains, human-approved operational workflows, and AI governance across 10 to 100+ staff.',
    href: SITE_CONFIG.cal.speaking,
    cta: 'Book Corporate Workshop Intake →',
  },
  {
    badge: 'Monthly Retainer',
    badgeVariant: 'tag' as const,
    title: 'Executive AI Advisory / Fractional Architect',
    price: '$5,000+/mo',
    detail:
      'Ongoing architectural guidance, vendor/cost governance, internal curriculum design, and private infrastructure oversight for leadership teams.',
    href: SITE_CONFIG.cal.scoping,
    cta: 'Book Advisory Scoping Call →',
  },
]

const WORK_FAQS = [
  {
    q: 'What happens inside the $1,500 VIP 90-Minute AI Workflow & Cost Audit?',
    a: 'Before we meet, we review your current tool stack and team bottlenecks. Live on the 90-minute call, we map your AI Org Chart, identify the top 3 workflows with immediate payback, cut overlapping SaaS/API spend, and deliver a written 90-day roadmap. 100% of the $1,500 fee credits toward the Accelerator or a Corporate Intensive within 30 days.',
  },
  {
    q: 'What is included in a $7,500 to $15,000 Private Corporate AI Intensive?',
    a: 'A tailored half-day ($7,500) or full-day ($15,000) hands-on lab for 10 to 100+ executives and staff, building shared Brand & SOP context files, human-approved department workflows, and clear data-privacy governance.',
  },
  {
    q: 'Do you travel or host on-site corporate workshops in Colorado and nationwide?',
    a: 'Yes. Sophia is based in Boulder, CO (zero travel fees across Boulder, Denver, and the Front Range) and delivers virtual and on-site executive workshops nationwide.',
  },
]

export default function WorkWithMePage() {
  const workLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_CONFIG.siteUrl}/work-with-me#service`,
        name: 'Executive AI Workflow Audits, Implementation Cohort & Corporate Workshops',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
        },
        areaServed: ['Boulder, CO', 'Denver, CO', 'United States'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Agentic Architect Advisory & Training Tiers',
          itemListElement: [
            { '@type': 'Offer', name: '1:1 AI Strategy Session (60 Min)', price: '500', priceCurrency: 'USD' },
            { '@type': 'Offer', name: 'VIP 90-Min AI Workflow & Cost Audit', price: '1500', priceCurrency: 'USD' },
            { '@type': 'Offer', name: 'Agentic Business Accelerator (8 Weeks)', price: '5997', priceCurrency: 'USD' },
            { '@type': 'Offer', name: 'Private Corporate AI Intensive (Half-Day)', price: '7500', priceCurrency: 'USD' },
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
          meta="Boulder, CO & Worldwide · Direct Calendar Booking"
          title="Work With Sophia"
          description="Done-with-you AI Org Chart implementation, 90-minute executive workflow & cost audits, and live corporate enablement built for founders, COOs, and leadership teams."
        />

      {/* Interactive ROI Calculator */}
      <section className="space-y-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Estimate Your Return First
          </p>
          <h2 className="text-2xl font-bold text-fg mt-1">
            Hiring Headcount vs. Automating Repetitive Workflows
          </h2>
        </div>
        <RoiCalculator />
      </section>

      {/* 2x2 High-Margin Offer Grid */}
      <section id="offers" className="space-y-5 scroll-mt-20">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Core Ways to Work Together
          </p>
          <h2 className="text-2xl font-bold text-fg mt-1">
            Choose the Right Engagement Model
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRIMARY_OFFERS.map(offer => (
            <Card key={offer.title} className="p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-2.5">
                <Badge variant={offer.badgeVariant}>{offer.badge}</Badge>
                <h3 className="text-xl font-bold text-fg">{offer.title}</h3>
                <p className="font-mono text-sm font-semibold text-accent">{offer.price}</p>
                <p className="text-sm text-muted leading-relaxed">{offer.detail}</p>
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

      {/* Focused 1:1 Single Session + Contact Fallback */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7 p-6 bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
              Single 60-Minute Session · $500
            </p>
            <h3 className="text-lg font-bold text-fg">1:1 AI Strategy &amp; Systems Session</h3>
            <p className="text-sm text-muted leading-relaxed">
              Have one specific workflow, tool stack decision, or architecture bottleneck? Book a
              focused 60-minute working session directly on Cal.com with Stripe checkout.
            </p>
          </div>
          <div className="shrink-0">
            <Button variant="outline" size="md" href={SITE_CONFIG.cal.officeHours}>
              Book 60-Min Session ($500) →
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-5 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-fg">Questions, Custom Scope, or Sponsorships?</h3>
            <p className="text-sm text-muted leading-relaxed">
              Send a short note with your team size and goals, or view newsletter sponsorship tiers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" href="/contact">
              Send a Message
            </Button>
            <Button variant="ghost" size="sm" href="/sponsor">
              Sponsorship Tiers →
            </Button>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-fg">Advisory, Audit &amp; Corporate Workshop FAQ</h2>
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

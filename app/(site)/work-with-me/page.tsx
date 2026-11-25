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

export default function WorkWithMePage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Boulder, CO & Worldwide · Direct Calendar Booking"
        title="Work With Sophia"
        description="Practical AI workflow implementation, executive audits, and live corporate enablement built to return real hours and protect your data."
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
              <div>
                <Button variant="primary" size="md" href={offer.href}>
                  {offer.cta}
                </Button>
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
    </div>
  )
}

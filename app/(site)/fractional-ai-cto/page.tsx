import type { Metadata } from 'next'
import NextLink from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Fractional Chief AI Officer (CAIO) & Fractional AI CTO · Sophia Stein',
  description:
    'Part-time executive AI leadership, production architecture oversight, and governance for mid-market organizations, regulated groups, and engineering teams.',
  alternates: { canonical: '/fractional-ai-cto' },
}

const FRACTIONAL_ROLES = [
  {
    badge: 'Executive & Operational Mandate',
    title: 'Fractional Chief AI Officer (CAIO)',
    audience: 'For CEOs, COOs, Regulated Practices & Multi-Department Firms',
    body: 'Most organizations have purchased chat licenses while fewer than five percent have governed workflows moving operating margin. As your Fractional CAIO, I guide departmental build-vs-buy strategy across Sales, Operations, Finance, and Delivery, rationalize overlapping vendor spend, set clear privacy tiers, and upskill internal champions.',
    deliverables: [
      'Department build-vs-buy & software rationalization across GTM, Finance, Legal & Ops',
      'Zero-retention data policies, compliance boundaries & L1-L5 human approval gates',
      'Enabling internal AI champions and establishing measurable workflow telemetry',
    ],
    ctaLabel: 'Scope Fractional CAIO Fit',
  },
  {
    badge: 'Engineering & Product Mandate',
    title: 'Fractional AI CTO & Architecture Advisor',
    audience: 'For CTOs, VPs of Engineering, Scaling Product Teams & Investors',
    body: 'Slide-only consultancies rarely verify production code, while dev shops build whatever is requested regardless of unit economics. I partner with leadership and engineering leads to review harness architecture, build binary evaluation suites, harden OAuth/MCP scopes, and cut inference spend through tiered model routing.',
    deliverables: [
      'Architecture design reviews, threat modeling & least-privilege MCP/OAuth boundaries',
      'Deterministic regression harnesses & per-run cost/latency circuit breakers',
      'Vendor-neutral model routing and technical AI due diligence for leadership & boards',
    ],
    ctaLabel: 'Scope Fractional AI CTO Fit',
  },
  {
    badge: 'Bounded Starting Engagement',
    title: '2-Week AI Architecture Diagnostic & Leadership Lab',
    audience: 'Begin With a Defined Deliverable Before Any Ongoing Cadence',
    body: 'Every fractional relationship can start with a contained two-week engagement: an end-to-end architecture, security, and workflow audit across your stack, paired with a leadership alignment lab.',
    deliverables: [
      'Written 90-day build-vs-buy charter & subscription spend teardown',
      'Data-boundary & permission audit across workspace and API integrations',
      'Optional transition into ongoing monthly Fractional CAIO or AI CTO oversight',
    ],
    ctaLabel: 'Book 2-Week Diagnostic Call',
  },
]

const COMPARISON_ROWS = [
  {
    path: 'Full-Time Executive Search',
    cadence: 'Multi-quarter search & onboarding',
    fit: 'High fixed overhead before your organization has validated which workflows merit permanent headcount',
  },
  {
    path: 'Slide-Only Strategy Consultancy',
    cadence: 'Multi-week deck engagement',
    fit: 'High-level recommendations disconnected from real model routing, tool permissions, and eval rigor',
  },
  {
    path: 'Black-Box Automation Vendor',
    cadence: 'Project outsourcing',
    fit: 'Delivers brittle workflows your internal team cannot audit, maintain, or adapt as models evolve',
  },
  {
    path: 'Fractional CAIO / AI CTO (Agentic Architect)',
    cadence: '2-Week Diagnostic or Monthly Advisory Cadence',
    fit: 'Commercial governance and production systems architecture in one seat, transferring capability directly to your staff',
  },
]

const FRACTIONAL_FAQS = [
  {
    q: 'Should our company engage a Fractional Chief AI Officer (CAIO) or a Fractional AI CTO?',
    a: 'Choose Fractional CAIO when your priority is operational execution across business functions (Operations, GTM, Intake, Finance, Compliance). Choose Fractional AI CTO when your engineering team is shipping AI product features or internal agent pipelines that require architecture, evaluation, security, and inference-cost oversight.',
  },
  {
    q: 'How does this relate to your self-paced courses and single-workflow sprints?',
    a: 'Individual operators and founders upskilling hands-on start in the Agentic Architect Lab (/courses), while focused project builds live on /work-with-me. Fractional CAIO and Fractional AI CTO engagements are dedicated executive partnerships for multi-department and scaling organizations.',
  },
  {
    q: 'How do we explore fit without an open-ended commitment?',
    a: 'Schedule a 20-minute Executive Scoping Call. We review your stack, team structure, and governance requirements, and typically begin with a bounded 2-week diagnostic or leadership intensive.',
  },
]

export default function FractionalAiCtoPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_CONFIG.siteUrl}/fractional-ai-cto#service`,
        name: 'Fractional Chief AI Officer (CAIO), Fractional AI CTO & Enterprise AI Advisory',
        serviceType: [
          'Fractional Chief AI Officer',
          'Fractional AI CTO',
          'AI Architecture & Governance Advisory',
          'Corporate AI Enablement Workshops',
        ],
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
        },
        areaServed: ['Boulder, CO', 'Denver, CO', 'United States'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FRACTIONAL_FAQS.map(f => ({
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
          __html: JSON.stringify(ld).replace(/</g, '\\u003c'),
        }}
      />
      <div className="space-y-16">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
            <span>Executive &amp; Organizational Advisory · Boulder, CO &amp; Remote</span>
            <NextLink href="/courses" className="hover:text-fg underline underline-offset-3">
              Looking for hands-on courses instead? Visit the Lab
            </NextLink>
          </div>

          <PageHeader
            title="Fractional Chief AI Officer & Fractional AI CTO"
            description="Commercial governance and production systems architecture in one seat: helping organizations move past scattered AI pilots into secure, measurable operations."
          />

          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="primary" size="lg" href={SITE_CONFIG.cal.speaking}>
              Book Executive Scoping Call
            </Button>
            <Button variant="outline" size="lg" href="/research">
              Inspect Benchmarks &amp; Sovereign Stack
            </Button>
            <Button variant="ghost" size="lg" href="/teaching">
              Corporate Workshops &amp; Syllabi
            </Button>
          </div>
        </div>

        {/* 3 Mandates */}
        <section className="space-y-5">
          <div>
            <p className="text-xs font-medium text-muted">Advisory Mandates</p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
              Executive strategy, systems rigor, or a bounded diagnostic
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {FRACTIONAL_ROLES.map(role => (
              <Card key={role.title} className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <Badge variant="tag">{role.badge}</Badge>
                  <h3 className="font-serif text-2xl font-normal text-fg leading-snug">
                    {role.title}
                  </h3>
                  <p className="text-xs font-medium text-fg/80">{role.audience}</p>
                  <p className="text-sm text-muted leading-relaxed">{role.body}</p>
                  <ul className="space-y-1.5 pt-3 border-t border-border text-xs text-fg/90">
                    {role.deliverables.map(d => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="text-muted select-none">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" size="sm" href={SITE_CONFIG.cal.speaking}>
                  {role.ctaLabel}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Qualitative Trade-Off Matrix (Zero Salary Numbers) */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
            Why scaling organizations choose fractional AI leadership
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-elevated border-b border-border text-xs text-muted">
                <tr>
                  <th className="p-4 font-semibold text-fg">Approach</th>
                  <th className="p-4 font-semibold text-fg">Engagement Shape</th>
                  <th className="p-4 font-semibold text-fg">Architectural &amp; Operational Reality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={row.path}
                    className={
                      idx === COMPARISON_ROWS.length - 1 ? 'bg-surface-elevated/60 font-medium' : ''
                    }
                  >
                    <td className="p-4 font-medium text-fg">{row.path}</td>
                    <td className="p-4 text-xs text-muted">{row.cadence}</td>
                    <td className="p-4 text-muted">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
            Fractional leadership &amp; governance FAQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FRACTIONAL_FAQS.map(faq => (
              <Card key={faq.q} className="p-6 space-y-2">
                <h3 className="text-sm font-semibold text-fg leading-snug">{faq.q}</h3>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

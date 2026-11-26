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
    'Part-time executive AI leadership, production architecture oversight, and corporate governance for mid-market companies, healthcare groups, and engineering teams by Sophia Stein (Columbia CS, ex-McKinsey).',
  alternates: { canonical: '/fractional-ai-cto' },
}

const FRACTIONAL_ROLES = [
  {
    badge: 'Executive & Operational Mandate · 2 to 4 Days / Month',
    badgeVariant: 'online' as const,
    title: 'Fractional Chief AI Officer (CAIO)',
    audience: 'For $3M to $50M+ CEOs, COOs, Healthcare Groups & Multi-Location Firms',
    body: '75% of organizations have bought AI chat seats, yet fewer than 5% have repeatable, governed workflows moving EBITDA. As your Fractional CAIO, I own the AI roadmap across Sales, Operations, Finance, and Client Delivery, cut overlapping SaaS spend, set compliance guardrails, and upskill internal champions without the $300K+ overhead of a full-time executive hire.',
    deliverables: [
      'Department build-vs-buy & AI FinOps rationalization across Marketing, Finance, Legal & Ops',
      'Data privacy (ZDR, 3P VPC, open-weight boundaries), HIPAA/SOC2 policies & L1-L5 approval gates',
      'Training internal Forward Deployed AI champions and board-level throughput reporting',
    ],
    ctaLabel: 'Scope Fractional CAIO Fit →',
  },
  {
    badge: 'Engineering & Product Mandate · Architecture + Eval Rigor',
    badgeVariant: 'rig' as const,
    title: 'Fractional AI CTO & Architecture Advisor',
    audience: 'For CTOs, VPs of Engineering, Seed-to-Series B Startups & Investors',
    body: 'Most management consultants write slide decks and leave engineering to figure it out; most dev shops write brittle code with zero commercial discipline. I sit with your leadership and engineering leads to review system design, build evaluation harnesses, harden tool/OAuth boundaries, and cut inference bills by 60 to 85% through tiered routing.',
    deliverables: [
      'Architecture design reviews, threat models & scoped MCP/OAuth permissions',
      'Deterministic evaluation harnesses & cost/latency circuit breakers',
      'Build-vs-buy matrices and technical AI due diligence for boards & investors',
    ],
    ctaLabel: 'Scope Fractional AI CTO Fit →',
  },
  {
    badge: 'Time-Boxed Starting Wedge · Fixed Scope',
    badgeVariant: 'tag' as const,
    title: '2-Week AI Architecture Diagnostic & Team Rollout Lab',
    audience: 'Start With a Defined Deliverable Before Any Ongoing Retainer',
    body: 'Every fractional partnership can begin with a contained, fixed-scope engagement: either a 2-week architecture, security, and ROI audit across your stack, or a hands-on half-day / full-day corporate training lab where leadership and staff ship live workflows.',
    deliverables: [
      'Written 90-day build-vs-buy roadmap & software cost teardown',
      'Security & data-boundary audit across workspace and vendor integrations',
      'Optional transition into light monthly Fractional CAIO or AI CTO oversight',
    ],
    ctaLabel: 'Book 2-Week Diagnostic Call →',
  },
]

const COMPARISON_ROWS = [
  {
    path: 'Full-Time Chief AI Officer / VP of AI',
    cost: '$250,000 to $450,000/yr + equity',
    fit: '4 to 6 months to recruit; overkill for 10 to 250-person organizations',
  },
  {
    path: 'Traditional Strategy Consultancy',
    cost: '$50,000+ slide deck',
    fit: 'Advises from 30,000 feet; leaves nobody able to verify production architecture',
  },
  {
    path: 'Outsourced Dev / Automation Shop',
    cost: '$20,000+ black-box build',
    fit: 'Builds whatever you ask for, even when simpler native workflows cost 10x less',
  },
  {
    path: 'Fractional CAIO / AI CTO (Sophia Stein)',
    cost: 'Scoped Monthly Cadence or 2-Week Diagnostic',
    fit: 'Columbia CS engineering + ex-McKinsey OpEx rigor in the same seat; transfers capability to your team',
  },
]

const FRACTIONAL_FAQS = [
  {
    q: 'Should our company engage a Fractional Chief AI Officer (CAIO) or a Fractional AI CTO?',
    a: 'Choose Fractional CAIO if your primary goal is operational margin across non-technical departments (Operations, Sales, Intake, Finance, Compliance) without overloading your existing COO or IT lead. Choose Fractional AI CTO if you have an internal engineering team building AI-powered product features or internal agent pipelines that need architecture, evaluation, security, and inference-cost leadership.',
  },
  {
    q: 'How is this separated from your courses and sprints for smaller business owners?',
    a: 'Non-technical founders and lean service firms looking for self-paced training ($297 Academy) or a single Done-For-You workflow sprint work through our Courses and Bottleneck Sprint track (/courses and /work-with-me). Fractional CAIO, Fractional AI CTO, and Corporate Enablement are dedicated executive engagements for multi-department companies, regulated groups, and funded tech teams.',
  },
  {
    q: 'How do we scope an engagement without an open-ended commitment?',
    a: 'Book a 20-minute Executive & Advisory Scoping Call on Cal.com. We review your current stack, team structure, and compliance requirements, and if there is a strong fit we start with a fixed-scope 2-week diagnostic or leadership workshop before deciding on a monthly cadence.',
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
      <div className="space-y-14">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="rig">Executive &amp; Enterprise Track · Fractional AI Leadership</Badge>
            <NextLink href="/courses" className="font-mono text-xs text-accent hover:underline">
              Non-technical owner looking for DIY courses or a 1-workflow sprint? Go here →
            </NextLink>
          </div>

          <PageHeader
            meta="Columbia CS · Ex-McKinsey ($70M SaaS OpEx + 250+ Clinical Leaders) · Boulder, CO"
            title="Fractional Chief AI Officer &amp; Fractional AI CTO"
            description="Strategy and production architecture in one person: helping mid-market companies, healthcare and advisory groups, and engineering teams move past scattered AI demos into governed, measurable production."
          />

          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="primary" size="lg" href={SITE_CONFIG.cal.speaking}>
              Book 20-Min Executive Scoping Call →
            </Button>
            <Button variant="outline" size="lg" href="/research">
              Inspect 29 Benchmarks &amp; Sovereign Stack Book
            </Button>
            <Button variant="ghost" size="lg" href="/teaching">
              Corporate Workshops &amp; Syllabi
            </Button>
          </div>
        </div>

        {/* 3 Fractional & Enterprise Mandates */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Three Ways Organizations Engage Us
            </p>
            <h2 className="text-2xl font-bold text-fg mt-1">
              Executive AI Strategy, Production Systems Rigor, or a Time-Boxed Diagnostic
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {FRACTIONAL_ROLES.map(role => (
              <Card key={role.title} className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <Badge variant={role.badgeVariant}>{role.badge}</Badge>
                  <h3 className="text-xl font-bold text-fg">{role.title}</h3>
                  <p className="font-mono text-xs font-semibold text-accent">{role.audience}</p>
                  <p className="text-sm text-muted leading-relaxed">{role.body}</p>
                  <ul className="space-y-1.5 pt-2 border-t border-border text-xs text-fg">
                    {role.deliverables.map(d => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="text-online font-bold">✓</span>
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

        {/* Executive Comparison Matrix */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-fg">
            Why Mid-Market &amp; Scaling Teams Choose Fractional AI Leadership
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface border-b border-border font-mono text-xs uppercase text-muted">
                <tr>
                  <th className="p-4">Model</th>
                  <th className="p-4">Typical Commitment</th>
                  <th className="p-4">Strategic &amp; Technical Trade-Off</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={row.path}
                    className={idx === COMPARISON_ROWS.length - 1 ? 'bg-blue-50/40 font-medium' : ''}
                  >
                    <td className="p-4 font-bold text-fg">{row.path}</td>
                    <td className="p-4 font-mono text-xs text-accent">{row.cost}</td>
                    <td className="p-4 text-muted">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Track Record Proof Strip */}
        <Card className="p-6 md:p-8 bg-surface space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
            Why Boards, COOs &amp; CTOs Trust Our Judgment
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
            <div>
              <p className="font-bold text-fg">Commercial &amp; Clinical Rollouts (McKinsey)</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Restructured enterprise SaaS spend to save $70M in annual sales OpEx and rolled out
                clinical software across 250+ healthcare leaders at a 79 NPS.
              </p>
            </div>
            <div>
              <p className="font-bold text-fg">Systems Engineering (Columbia CS, Meta, Section.io)</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Production systems engineering, patent-pending multimodal QA architecture, and 29
                reproducible hardware and evaluation benchmarks published openly on /research.
              </p>
            </div>
            <div>
              <p className="font-bold text-fg">Executive &amp; Technical Classrooms</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                300+ founders and operators trained live at Boulder Startup Week, Women Who Code
                speaker, and applied university syllabi developed for CU Boulder (Leeds &amp; ATLAS).
              </p>
            </div>
          </div>
          <p className="text-xs text-muted pt-3 border-t border-border">
            Personal capacity note: {SITE_CONFIG.personalCapacityNote} All advisory and training
            engagements are independent through {SITE_CONFIG.legalName} with zero employer conflicts.
          </p>
        </Card>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-fg">Fractional Leadership &amp; Governance FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FRACTIONAL_FAQS.map(faq => (
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

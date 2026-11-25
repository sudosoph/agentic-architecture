import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

export const metadata: Metadata = {
  title: 'About Sophia Stein · AI Org Chart, Workflows & Corporate Enablement',
  description:
    'Columbia CS engineer, ex-McKinsey operator, and 7x angel investor in Boulder, CO helping founders and leadership teams install practical AI org charts and workflows.',
  alternates: {
    canonical: '/about',
  },
}

const ICP_LAYERS = [
  {
    eyebrow: '1. Founders, Agency & Service Business Owners ($300K to $20M)',
    title: 'Done-With-You AI Org Charts & 6 Installed Business Systems',
    detail:
      'Owners tired of carrying operational busywork in their heads or spending $65,000+ on another coordinator hire. Start in the free 60-minute live Masterclass, then install your Brand Brain, AI Chief of Staff, inbox triage, and pre-call dossiers inside our 8-week Accelerator ($5,997 Founding / $8,997 Standard).',
  },
  {
    eyebrow: '2. COOs, Chiefs of Staff & Corporate L&D Leaders (25 to 500+ Staff)',
    title: 'On-Site & Virtual Team Enablement Labs ($7,500 to $15,000) & VIP Audits',
    detail:
      'Executive teams across healthcare, professional services, and technology who want real adoption across non-technical departments backed by McKinsey-grade ROI math and Columbia CS data-security guardrails.',
  },
]

const SNAPSHOTS = [
  {
    label: 'Applied AI Engineering & Teaching',
    title: 'Google (Boulder, CO)',
    detail:
      'Build internal AI investigation tools (cutting complex triage from 15 minutes to 2), co-invented a patent-pending multimodal QA engine, and lead internal workshops. Everything on this site is strictly in my personal capacity, views my own.',
  },
  {
    label: 'Commercial Strategy & Rollouts',
    title: 'McKinsey & Company',
    detail:
      'Restructured enterprise SaaS contracts to cut $70M in annual sales OpEx and led clinical software rollouts across 250+ healthcare leaders at a 79 NPS.',
  },
  {
    label: 'Systems & Performance Engineering',
    title: 'Columbia University, Section.io & Meta',
    detail:
      'B.S. in Computer Science at Columbia (Dean’s List), edge performance engineering at Section.io ahead of its Webscale acquisition (+30% conversion lift, -40% support tickets), and Mobile Engineering Fellow at Meta.',
  },
  {
    label: 'Live Classrooms & Frontier Investing',
    title: '300+ Trained Live & 7x Angel Investor',
    detail:
      'Trained 300+ founders and operators live at Boulder Startup Week, spoke for Women Who Code, and angel invest across seven quantum hardware, medtech, microgrid, and supply-chain companies.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        meta="Boulder, CO · Columbia CS · Ex-McKinsey · 7x Angel Investor"
        title="Sophia Stein"
        description="I help founders and leadership teams redesign their org chart around humans on the front end and reliable, owned AI workflows on the back end."
      />

      {/* Crisp, Real-Person Positioning */}
      <section className="max-w-3xl space-y-4 text-base text-muted leading-relaxed">
        <p className="text-fg font-medium text-lg leading-relaxed">
          Most business owners looking for AI help run into a frustrating split: business coaches
          who have never shipped software selling fragile prompt packs, or hardcore infrastructure
          engineers speaking in jargon that never helps you close a client or clear your inbox.
        </p>
        <p>
          My career was built across both rooms. I studied computer science at Columbia, wrote
          production software at Meta and Section.io, spent two years at McKinsey restructuring
          enterprise software spend and rolling out clinical tools to hundreds of healthcare
          leaders, and now build applied AI systems in Boulder.
        </p>
        <p>
          At <strong>Agentic Architect</strong>, we start with your org chart rather than a tool
          list: which decisions require human judgment, which repetitive back-office roles belong
          to connected AI workflows, and how to own your context files (
          <code className="font-mono text-fg">voice.md</code>,{' '}
          <code className="font-mono text-fg">icp.md</code>) and data boundaries so you never get
          locked into a $20,000 agency black box. (And if your engineering team wants our raw
          hardware and model benchmarks, we publish all 18 chapters openly in{' '}
          <Link href="/sovereign-stack" className="text-accent font-medium hover:underline">
            The Sovereign Stack
          </Link>
          .)
        </p>
        <p className="text-xs text-muted bg-surface border border-border rounded-lg p-3.5">
          Personal capacity note: My day job is at Google. Everything published, taught, or advised
          through Agentic Architecture LLC (<code className="font-mono">agenticarchitect.ai</code>)
          is independent, uses zero employer resources, and reflects my own views.
        </p>
      </section>

      {/* Who I Work With */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-fg">Who I Work With</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ICP_LAYERS.map(layer => (
            <Card key={layer.title} className="p-6 space-y-2 bg-surface">
              <p className="font-mono text-xs font-semibold text-online uppercase tracking-wider">
                {layer.eyebrow}
              </p>
              <h3 className="text-base font-bold text-fg">{layer.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{layer.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Crisp 4-Card Track Record */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-fg">Track Record</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SNAPSHOTS.map(item => (
            <Card key={item.title} className="p-6 space-y-2">
              <p className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                {item.label}
              </p>
              <h3 className="text-base font-bold text-fg">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Clear Funnel CTA */}
      <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-fg">Start With the Free Live AI Org Chart Masterclass</h2>
          <p className="text-sm text-muted">
            Watch the live 60-minute build on{' '}
            <Link href="/masterclass" className="text-accent font-medium hover:underline">
              /masterclass
            </Link>
            , grab the{' '}
            <Link href="/starter-kit" className="text-accent font-medium hover:underline">
              20-Minute Starter Kit
            </Link>
            , or book a 1:1 audit or team workshop.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="sm" href="/masterclass">
            Free 60-Min Masterclass
          </Button>
          <Button variant="outline" size="sm" href="/work-with-me">
            Audits &amp; Workshops
          </Button>
        </div>
      </section>

      <NewsletterSignup source="about" />
    </div>
  )
}

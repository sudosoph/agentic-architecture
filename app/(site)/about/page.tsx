import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

export const metadata: Metadata = {
  title: 'About Sophia Stein',
  description:
    'Software engineer, ex-McKinsey operator, and 7x angel investor in Boulder, CO. Columbia CS, applied AI at Google (personal capacity, views my own), and Women Who Code speaker.',
  alternates: {
    canonical: '/about',
  },
}

const ICP_LAYERS = [
  {
    eyebrow: 'Primary Advisory & Audit Buyers',
    title: 'Seed-to-Series B Technical Founders, CTOs & Operating Leaders',
    detail:
      '10 to 250-person organizations where agent loops are failing silently in production or API and SaaS spend is eating gross margin. We fix model-routing unit economics, build deterministic verification harnesses, and train engineering and ops teams.',
  },
  {
    eyebrow: 'Technical Reader & Referral Flywheel',
    title: 'Pragmatic AI Engineers & Systems Builders',
    detail:
      'Engineers benchmarking 512 GB unified-memory desk nodes against cloud APIs, auditing personal agent permissions and MCP servers, and designing isolated worktree and test-verifier loops.',
  },
]

const SNAPSHOTS = [
  {
    label: 'Applied AI Engineering',
    title: 'Google (Boulder, CO)',
    detail:
      'Build internal AI investigation tooling (cutting root-cause triage from 15 minutes to 2), co-invented a patent-pending multimodal QA engine, and run internal engineering workshops. Everything on this site is strictly in my personal capacity; views my own.',
  },
  {
    label: 'Unit Economics & Enterprise Rollouts',
    title: 'McKinsey & Company',
    detail:
      'Restructured enterprise SaaS contracts to cut $70M in annual sales OpEx and led clinical workflow deployments across 250+ healthcare leaders (79 NPS).',
  },
  {
    label: 'Systems & Performance Engineering',
    title: 'Columbia University, Section.io & Meta',
    detail:
      'B.S. in Computer Science at Columbia (Dean’s List), edge performance engineering at Section.io prior to its Webscale acquisition (+30% conversion lift, -40% support ticket load), and Mobile Engineering Fellow at Meta.',
  },
  {
    label: 'Investing & Technical Community',
    title: '7x Angel Investor & Boulder Classrooms',
    detail:
      'Angel investor across seven quantum hardware, medtech, microgrid, and supply-chain startups. Trained 300+ founders and engineers live at Boulder Startup Week and spoke for Women Who Code.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        meta="Boulder, CO · Engineer, Operator & 7x Angel Investor"
        title="Sophia Stein"
        description="I work on agent loop reliability, inference unit economics, and private AI infrastructure for technical founders, engineering leaders, and lean operating teams."
      />

      {/* Plain, Understated Bio */}
      <section className="max-w-3xl space-y-4 text-base text-muted leading-relaxed">
        <p className="text-fg font-medium text-lg leading-relaxed">
          Most teams shipping AI hit one of two walls: unverified agent loops that quietly break
          in production, or unrouted frontier API and SaaS bills that wreck gross margins as usage
          scales.
        </p>
        <p>
          My work sits at the intersection of systems engineering and unit economics. I studied
          computer science at Columbia, shipped production web and mobile code at Meta and
          Section.io, spent two years at McKinsey restructuring enterprise software spend and
          clinical rollouts, and now build applied AI and multimodal QA tooling in Boulder. Outside
          of software, I speak four languages and angel invest in early hardware, biotech, and
          energy companies.
        </p>
        <p>
          <strong>Agentic Architect</strong> is my independent lab notebook and advisory practice.
          Every benchmark, hardware teardown, and architecture playbook here follows one bias:
          keep context in plain versioned files (<code className="font-mono text-fg">voice.md</code>
          , <code className="font-mono text-fg">AGENTS.md</code>), gate autonomous loops behind
          deterministic verifiers, and own the substrate once recurring cloud rent stops making
          math sense.
        </p>
        <p className="text-xs text-muted bg-surface border border-border rounded-lg p-3.5">
          Personal capacity note: My day job is at Google. Everything published, taught, or advised
          through Agentic Architecture LLC (<code className="font-mono">agenticarchitect.ai</code>)
          is independent, uses zero employer resources, and reflects my own views.
        </p>
      </section>

      {/* Explicit ICP Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-fg">Who This Work Is Built For</h2>
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

      {/* Direct Next Step */}
      <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-fg">Audits, Team Labs &amp; Field Manuals</h2>
          <p className="text-sm text-muted">
            Explore the{' '}
            <Link href="/sovereign-stack" className="text-accent font-medium hover:underline">
              Sovereign Stack book &amp; hardware sizer
            </Link>
            , download the{' '}
            <Link href="/starter-kit" className="text-accent font-medium hover:underline">
              portable context kit
            </Link>
            , or book an architecture teardown.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="sm" href="/work-with-me">
            Work With Sophia
          </Button>
          <Button variant="outline" size="sm" href="/contact">
            Send a Note
          </Button>
        </div>
      </section>

      <NewsletterSignup source="about" />
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'

const CAL_BASE = 'https://cal.com/sophia-stein'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Agentic-architecture projects for founders, operators, and organizations. Workflow audits, done-for-you builds, corporate AI training, custom course creation, and speaking. All booking on cal.com. Boulder, CO.',
}

const STEPS = [
  'Pick the project that fits, or book a free 30-minute scoping call if you are not sure.',
  'I reply within 1 to 2 business days with a fit assessment.',
  'If it is a match, we walk through the work together. No sales.',
  'Proposal, deposit, work starts. Most projects close within a week.',
]

type Service = {
  name: string
  duration: string
  description: string
  /** cal.com event slug (cal.com/sophia-stein/<slug>) */
  calSlug: string
  /** Optional human label for the booking CTA. */
  cta?: string
}

const BUILDER_SERVICES: Service[] = [
  {
    name: 'Agentic Workflow Audit',
    duration: '90 min · productized',
    description:
      'We map your current AI spend, identify the 20% of your tasks that are agent-ready, and you leave with a concrete action plan. The fastest way to find out whether agents can actually save you money.',
    calSlug: 'audit',
    cta: 'book the audit',
  },
  {
    name: 'Done-for-You Build',
    duration: 'project · 2–4 weeks',
    description:
      'End-to-end agentic workflow implementation. Local-first where it makes sense, n8n + MCP for orchestration, your existing tools wired in. Delivered, documented, and running on your infrastructure. Starts with a free scoping call.',
    calSlug: 'scoping',
    cta: 'book a free scoping call',
  },
  {
    name: 'Office Hours · Hourly Consulting',
    duration: '60 min · hourly',
    description:
      'For teams already building. Bring the ROCm error, the eval-harness question, the orchestration design, the cost teardown. We solve the thing in an hour or I tell you what to read and who to call. Available by the hour or on retainer.',
    calSlug: 'office-hours',
    cta: 'book office hours',
  },
]

const ORG_SERVICES: Service[] = [
  {
    name: 'Corporate AI Training',
    duration: 'half / full day',
    description:
      'On-site or remote workshops for engineering and ops teams. Hands-on labs covering local inference, agentic workflow design, MCP, and the cost math behind moving off frontier APIs. Materials and recordings included.',
    calSlug: 'speaking',
    cta: 'book a 30-min intake',
  },
  {
    name: 'Custom Course Creation',
    duration: 'project',
    description:
      'Built-for-you internal courses for engineering orgs. Curriculum design, recorded modules, hands-on exercises, assessment. Useful when you need to ramp 50+ engineers on agentic tooling without sending them to a generic bootcamp.',
    calSlug: 'scoping',
    cta: 'book a free scoping call',
  },
  {
    name: 'Speaking & Workshops',
    duration: 'keynote · talk · podcast',
    description:
      'Recent topics: how 96GB of RAM changed my mind about local AI, MCP as a driver layer, the $0.01 micro-agent, agentic workflows for lean founders. Boulder Startup Week alum.',
    calSlug: 'speaking',
    cta: 'book a 30-min intake',
  },
]

function ServiceCard({ name, duration, description, calSlug, cta }: Service) {
  return (
    <Link
      href={`${CAL_BASE}/${calSlug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group border border-border bg-surface p-6 hover:border-accent hover:bg-bg transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
          {name}
        </h3>
        <span className="font-mono text-xs text-bench shrink-0">{duration}</span>
      </div>
      <p className="text-sm text-muted leading-relaxed mb-4">{description}</p>
      <p className="font-mono text-xs text-accent group-hover:underline">
        {cta ?? 'book on cal.com'} →
      </p>
    </Link>
  )
}

const SECTIONS = [
  { id: 'what-to-expect', label: 'What to expect' },
  { id: 'builders', label: 'For founders & builders' },
  { id: 'organizations', label: 'For orgs & speaking' },
  { id: 'sponsor', label: 'Sponsor' },
]

export default function WorkWithMePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="work with me"
        description="I take a small number of projects at a time. If you are serious about reducing cloud AI costs, building agentic infrastructure that actually works, or rolling out AI to your team — let's talk. Every service below opens cal.com directly when you click it."
      />

      {/* Section quick-nav */}
      <nav className="flex flex-wrap gap-2">
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="font-mono text-xs px-3 py-1.5 border border-border text-muted hover:text-fg hover:border-fg transition-colors"
          >
            {label} ↓
          </a>
        ))}
      </nav>

      {/* What to expect — primary CTA above the fold */}
      <section id="what-to-expect" className="border border-border bg-surface p-6 scroll-mt-20">
        <h2 className="font-mono text-xs text-bench uppercase tracking-widest mb-3">
          What to expect
        </h2>
        <ol className="space-y-2 text-sm text-fg leading-relaxed mb-5">
          {STEPS.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-muted font-mono shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" href={`${CAL_BASE}/scoping`}>
            book a free 30-min call ›
          </Button>
          <Button variant="ghost" size="md" href="/contact">
            email instead
          </Button>
        </div>
      </section>

      {/* For founders & builders */}
      <section id="builders" className="scroll-mt-20">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          For founders &amp; builders
        </h2>
        <p className="font-mono text-xs text-muted mb-6">
          Productized projects. Click any card to schedule directly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUILDER_SERVICES.map(service => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>
      </section>

      {/* For organizations */}
      <section id="organizations" className="border-t border-border pt-10 scroll-mt-20">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          For organizations
        </h2>
        <p className="font-mono text-xs text-muted mb-6">
          Scoped per project. Click any card to start a conversation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ORG_SERVICES.map(service => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>
      </section>

      {/* Fallback */}
      <section className="border-t border-border pt-6 flex flex-wrap items-center gap-3">
        <Button variant="outline" size="md" href={CAL_BASE}>
          see all on cal.com →
        </Button>
        <Button variant="ghost" size="md" href="/contact">
          or email instead
        </Button>
      </section>

      {/* Sponsor — different motion from consulting, but lives in the same neighborhood */}
      <section id="sponsor" className="border-t border-border pt-10 scroll-mt-20">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          Sponsor the newsletter or a post
        </h2>
        <p className="font-mono text-xs text-muted mb-4">
          Different from consulting — for companies who want exposure to the
          Local-First AI audience.
        </p>
        <p className="text-sm text-muted leading-relaxed mb-4">
          Single sponsorship slot in a newsletter issue, quarterly recurring,
          or a sponsored field guide. Pricing and tiers on the sponsor page.
        </p>
        <Button variant="outline" size="md" href="/sponsor">
          see sponsorship tiers →
        </Button>
      </section>
    </div>
  )
}

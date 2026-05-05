import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Agentic-architecture projects for founders, operators, and organizations. Workflow audits, done-for-you builds, corporate AI training, custom course creation, and speaking. Boulder, CO.',
}

const STEPS = [
  'Pick the project that fits, or book a free 30-minute call if you are not sure.',
  'I reply within 1 to 2 business days with a fit assessment.',
  'If it is a match, we schedule a free 30 minutes to walk through the work together. No sales.',
  'Proposal, deposit, work starts. Most projects close within a week.',
]

const BUILDER_SERVICES = [
  {
    name: 'Agentic Workflow Audit',
    duration: '90 min · productized',
    description:
      'We map your current AI spend, identify the 20% of your tasks that are agent-ready, and you leave with a concrete action plan. The fastest way to find out whether agents can actually save you money.',
  },
  {
    name: 'Done-for-You Build',
    duration: 'project · 2–4 weeks',
    description:
      'End-to-end agentic workflow implementation. Local-first where it makes sense, n8n + MCP for orchestration, your existing tools wired in. Delivered, documented, and running on your infrastructure.',
  },
  {
    name: 'Consulting · Hourly or Retainer',
    duration: 'flexible',
    description:
      'Architecture reviews, debugging sessions, ongoing async access. The retainer is built for SMBs who want a phone-a-friend for AI decisions and a living automation roadmap they actually use.',
  },
]

const ORG_SERVICES = [
  {
    name: 'Corporate AI Training',
    duration: 'half / full day',
    description:
      'On-site or remote workshops for engineering and ops teams. Hands-on labs covering local inference, agentic workflow design, MCP, and the cost math behind moving off frontier APIs. Materials and recordings included.',
  },
  {
    name: 'Custom Course Creation',
    duration: 'project',
    description:
      'Built-for-you internal courses for engineering orgs. Curriculum design, recorded modules, hands-on exercises, assessment. Useful when you need to ramp 50+ engineers on agentic tooling without sending them to a generic bootcamp.',
  },
  {
    name: 'Speaking & Workshops',
    duration: 'keynote · talk · podcast',
    description:
      'Recent topics: how 96GB of RAM changed my mind about local AI, MCP as a driver layer, the $0.01 micro-agent, agentic workflows for lean founders. Boulder Startup Week alum.',
  },
]

export default function WorkWithMePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="work with me"
        description="I take a small number of projects at a time. If you are serious about reducing cloud AI costs, building agentic infrastructure that actually works, or rolling out AI to your team, let us talk."
      />

      {/* How it works · comes first */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
          How it works
        </h2>
        <ol className="space-y-4 font-mono text-sm">
          {STEPS.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-muted shrink-0">{String(i + 1).padStart(2, '0')}.</span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" size="md" href="/book">
            book a free 30-min call ›
          </Button>
          <Button variant="ghost" size="md" href="/contact">
            send a message
          </Button>
        </div>
      </section>

      {/* Builders */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          For founders &amp; builders
        </h2>
        <p className="font-mono text-xs text-muted mb-6">
          Productized projects. Fixed scope.
        </p>
        <div className="divide-y divide-border">
          {BUILDER_SERVICES.map(({ name, duration, description }) => (
            <div key={name} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-mono text-sm text-fg">{name}</h3>
                <span className="font-mono text-xs text-muted shrink-0">{duration}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Organizations */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          For organizations
        </h2>
        <p className="font-mono text-xs text-muted mb-6">
          Scoped per project.
        </p>
        <div className="divide-y divide-border">
          {ORG_SERVICES.map(({ name, duration, description }) => (
            <div key={name} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-mono text-sm text-fg">{name}</h3>
                <span className="font-mono text-xs text-muted shrink-0">{duration}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Corporate AI training, speaking engagements, custom course creation, and agentic-architecture engagements. Book a discovery call.',
}

type Service = {
  name: string
  description: string
  price?: string
  duration?: string
}

const ORG_SERVICES: Service[] = [
  {
    name: 'Corporate AI Training',
    description:
      'On-site or remote workshops for engineering and ops teams. Hands-on labs covering local inference, agentic workflow design, MCP, and the cost math behind moving off frontier APIs. Materials and recordings included.',
  },
  {
    name: 'Speaking Engagements',
    description:
      'Keynotes, conference talks, and podcast appearances on sovereign AI, agentic architecture, and the economics of local-first inference. Recent topics: the 96GB RAM thesis, MCP as an OS layer, the $0.01 micro-agent.',
  },
  {
    name: 'Custom Course Creation',
    description:
      'Built-for-you internal courses for engineering orgs. Curriculum design, recorded modules, hands-on exercises, assessment. Useful when you need to ramp 50+ engineers on agentic tooling without sending them to a generic bootcamp.',
  },
]

const BUILDER_SERVICES: Service[] = [
  {
    name: 'Agentic Workflow Audit',
    price: '$499',
    duration: '90 min',
    description:
      'We map your current AI spend, identify the 20% of your tasks that are agent-ready, and you leave with a concrete action plan. The SMB entry point.',
  },
  {
    name: 'Done-for-You Build',
    price: '$2k–$5k',
    duration: 'project',
    description:
      'End-to-end agentic workflow implementation. Local-first where it makes sense, n8n + MCP for orchestration, and your existing tools wired in. Delivered, documented, and running.',
  },
  {
    name: 'Hourly / Retainer',
    price: '$299–$500/hr · $500/mo',
    duration: 'flexible',
    description:
      'Architecture reviews, debugging sessions, or ongoing async access. The retainer is built for SMBs who want a phone-a-friend for AI decisions and a living automation roadmap.',
  },
]

export default function WorkWithMePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="work with me"
        description="I take a small number of engagements at a time. If you're serious about reducing cloud AI costs or building agentic infrastructure that actually works, let's talk."
      />

      {/* For organizations */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          For organizations
        </h2>
        <p className="font-mono text-xs text-muted mb-6">
          Scoped per engagement — get in touch for a quote.
        </p>
        <div className="divide-y divide-border">
          {ORG_SERVICES.map(({ name, description }) => (
            <div key={name} className="py-6 first:pt-0 last:pb-0">
              <h3 className="font-mono text-sm text-fg mb-2">{name}</h3>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For founders & builders */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
          For founders &amp; builders
        </h2>
        <p className="font-mono text-xs text-muted mb-6">
          Productized — fixed scope, fixed price.
        </p>
        <div className="divide-y divide-border">
          {BUILDER_SERVICES.map(({ name, price, duration, description }) => (
            <div key={name} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-mono text-sm text-fg">{name}</h3>
                <div className="text-right shrink-0">
                  <span className="font-mono text-sm text-accent">{price}</span>
                  {duration && (
                    <span className="font-mono text-xs text-muted ml-2">· {duration}</span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
          How it works
        </h2>
        <ol className="space-y-4 font-mono text-sm">
          {[
            'Send a brief description of what you need.',
            'I reply within 1–2 business days with a fit assessment.',
            'If it\'s a match, we schedule a scoping call (30 min, free).',
            'Proposal → deposit → work starts.',
          ].map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-muted shrink-0">{String(i + 1).padStart(2, '0')}.</span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="border border-border bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-fg">Ready to start?</p>
          <p className="font-mono text-xs text-muted mt-1">
            Describe your situation and what you need.
          </p>
        </div>
        <Button variant="primary" size="md" href="/contact">
          get in touch ›
        </Button>
      </section>
    </div>
  )
}

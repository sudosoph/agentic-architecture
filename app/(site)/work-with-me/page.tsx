import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Work With Me',
  description:
    'Consulting on local LLM infrastructure, agentic workflow automation, and AI cost reduction. From $299/hr.',
}

const SERVICES = [
  {
    name: 'Workflow Automation Audit',
    price: '$499',
    duration: '90 min',
    description:
      'We map your current AI spend, identify the highest-ROI automation targets, and you leave with a concrete action plan. SMB entry point.',
  },
  {
    name: 'Local LLM Setup',
    price: '$1,500–$3,000',
    duration: 'project',
    description:
      'Full local inference stack: hardware selection or audit, ROCm/CUDA tuning, model selection, Ollama/Open WebUI config, benchmarking report.',
  },
  {
    name: 'Done-for-You Workflow Build',
    price: '$2,000–$5,000',
    duration: 'project',
    description:
      'End-to-end agentic workflow implementation using n8n, local LLMs, and your existing tools. Delivered, documented, and running.',
  },
  {
    name: 'Hourly Consulting',
    price: '$299–$500/hr',
    duration: 'flexible',
    description:
      'Architecture reviews, debugging sessions, code reviews, or strategic calls. Book a block and use it as needed.',
  },
  {
    name: 'Monthly Retainer',
    price: '$500/mo',
    duration: 'ongoing',
    description:
      'For SMBs who want ongoing access: async Q&A, monthly office hours call, priority response, and a living automation roadmap.',
  },
]

export default function WorkWithMePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="work with me"
        description="I take a small number of engagements at a time. If you're serious about reducing cloud AI costs or building agentic infrastructure that actually works, let's talk."
      />

      {/* Services */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
          Services
        </h2>
        <div className="divide-y divide-border">
          {SERVICES.map(({ name, price, duration, description }) => (
            <div key={name} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-mono text-sm text-fg">{name}</h3>
                <div className="text-right shrink-0">
                  <span className="font-mono text-sm text-accent">{price}</span>
                  <span className="font-mono text-xs text-muted ml-2">· {duration}</span>
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

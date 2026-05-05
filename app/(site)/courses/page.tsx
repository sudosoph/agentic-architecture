import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Self-paced and live cohort courses on local LLM infrastructure, agentic workflows, and AI-native development. Get notified when each one opens.',
}

type Course = {
  name: string
  audience: string
  format: string
  description: string
  status: 'Open' | 'Coming soon' | 'Cohort'
}

const COURSES: Course[] = [
  {
    name: 'Local AI Foundations',
    audience: 'Engineers + technical founders',
    format: 'Self-paced · 4 hrs',
    description:
      'The honest version of "set up local AI." Hardware selection, ROCm/CUDA tuning, model selection, and the tradeoffs nobody puts in their YouTube tutorial.',
    status: 'Coming soon',
  },
  {
    name: 'AMD APU Optimization Masterclass',
    audience: 'Hardware-curious engineers',
    format: 'Live cohort · 4 weeks',
    description:
      'Deep dive on Strix Point, GART configuration, ROCm 7.3, and getting frontier-class tokens/sec out of the iGPU you already own. Small cohort, high intent.',
    status: 'Coming soon',
  },
  {
    name: 'Private Context Engineering',
    audience: 'Developers',
    format: 'Project-based · 6 hrs',
    description:
      'Standard RAG is dead in 2026 — it has been replaced by agentic retrieval, context engineering, and bifurcated reasoning loops. Ship a working private-knowledge agent on your own hardware that does it right. PDFs in, grounded answers out, zero cloud dependency.',
    status: 'Coming soon',
  },
  {
    name: 'AI Automation for Small Business',
    audience: 'SMB owners and ops',
    format: 'Self-paced · 3 hrs',
    description:
      'For the operator who wants the agentic-workflow ROI without the AI Twitter hype. Costed examples, real templates, no jargon.',
    status: 'Coming soon',
  },
  {
    name: 'Agentic Workflows with n8n + Ollama',
    audience: 'Developers + ops',
    format: 'Self-paced · 5 hrs',
    description:
      'The full local-first automation stack. Building reusable workflows that survive model upgrades and don\'t leak data to vendors.',
    status: 'Coming soon',
  },
  {
    name: 'AI-Native Web Development',
    audience: 'Solo founders + small teams',
    format: 'Live cohort · 4 weeks',
    description:
      'Ship a production web product using the same stack that runs this site: Next.js + Cloudflare Workers + agentic dev loops. Intent-led, not slop-led.',
    status: 'Coming soon',
  },
  {
    name: 'Build Your AI Consulting Practice',
    audience: 'Engineers going independent',
    format: 'Live cohort · 4 weeks',
    description:
      'How to position, price, and deliver agentic-AI engagements that compound. From first $499 audit to $50k retainer. Built from real engagements.',
    status: 'Coming soon',
  },
  {
    name: 'Local LLM for Regulated Industries',
    audience: 'Healthcare, legal, finance',
    format: 'Self-paced · 6 hrs',
    description:
      'HIPAA, GDPR, and the architecture choices that keep auditors happy. The reason regulated SMBs run this stack is not vibes — it\'s compliance arithmetic.',
    status: 'Coming soon',
  },
  {
    name: 'Build an AI Product in 30 Days',
    audience: 'Solo builders',
    format: 'Live · 30 days',
    description:
      'A 30-day cohort that ships something. Twitch-recorded, accountability-driven, agent-assisted. The Pieter Levels arc, with a real production checklist.',
    status: 'Coming soon',
  },
  {
    name: 'From Zero to Local AI Stack',
    audience: 'Complete beginners',
    format: 'Self-paced · 3 hrs',
    description:
      'For the SMB owner whose IT person retired in 2019 and now needs to run an AI agent. Pick a laptop, install three things, never touch the cloud.',
    status: 'Coming soon',
  },
]

export default function CoursesPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="courses"
        description="Self-paced and live cohort courses on local LLM infrastructure, agentic workflows, and AI-native development. Built from real engagements, not generic curriculum."
      />

      {/* Waitlist CTA */}
      <section className="border border-border bg-surface p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-fg">First cohort opens this summer.</p>
            <p className="font-mono text-xs text-muted mt-1">
              Get notified when enrollment goes live — no spam, no upsells, just one email when each course opens.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            href="/contact?subject=Courses%20waitlist&message=Add%20me%20to%20the%20waitlist%20for%20courses.%20I%27m%20most%20interested%20in%3A%20"
          >
            join the waitlist ›
          </Button>
        </div>
      </section>

      {/* Course list */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
          The catalog
        </h2>
        <div className="divide-y divide-border">
          {COURSES.map(({ name, audience, format, description, status }) => (
            <div key={name} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-mono text-sm text-fg">{name}</h3>
                <Badge variant="tag">{status}</Badge>
              </div>
              <p className="font-mono text-xs text-muted mb-2">
                {audience} · {format}
              </p>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom training */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Need it for your team instead?
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-6">
          If you need 50 engineers ramped on agentic tooling without sending them to a generic bootcamp, the
          right product is custom course creation — built around your stack, your codebase, and your workflows.
        </p>
        <Link href="/work-with-me" className="font-mono text-sm text-accent hover:underline">
          see corporate training and custom course creation →
        </Link>
      </section>
    </div>
  )
}

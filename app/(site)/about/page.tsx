import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sophia Stein — AI Architect. Local-first LLM infrastructure, agentic systems, and OSS tools from Boulder, CO.',
}

const NOW = [
  { label: 'Now writing', body: 'The Agentic Audit — a 20% / 80% framework for finding agent-ready tasks in any business.' },
  { label: 'Now shipping', body: 'apu-config — one-command AMD APU optimizer for ROCm 7.3, GART tuning, and llama.cpp HIP builds.' },
  { label: 'Now reading', body: 'Conference notes from AI Agent Conference NYC and AI Dev SF, parsed into the next ten posts.' },
  { label: 'Now speaking', body: 'Boulder Startup Week 2026 · agentic architecture for lean teams.' },
]

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="about"
        meta="Sophia Stein · Boulder, CO"
        description="I design and ship local-first AI infrastructure. Same agents I build for clients run my business — booking, payments, content, triage."
      />

      {/* Bio */}
      <section className="space-y-4 text-sm text-muted leading-relaxed max-w-2xl">
        <p>
          I'm an AI architect. Not a researcher, not a hype merchant, not a
          consultant who reads about AI on flights — a builder who designs
          agentic systems for lean teams and ships them on hardware they own.
          The benchmarks on this site are real numbers from this laptop. The
          OSS projects are the same tools I use to run my business.
        </p>
        <p>
          The work falls into three audiences. <strong className="text-fg">Engineers and
          technical founders</strong> who want depth — reproducible benchmarks, real
          configurations, the protocols underneath the marketing. <strong className="text-fg">Operating
          businesses</strong> who want a different answer than another monthly bill from
          OpenAI — automated workflows on local infrastructure that get cheaper
          as the models get better. <strong className="text-fg">Organizations</strong> that need
          their engineers ramped on agentic tooling without sending them to a
          generic bootcamp.
        </p>
        <p>
          The thing I find most interesting, and the practice that informs everything
          I write: this business runs on the same agents I build for clients. Booking,
          payments, content syndication, inbox triage, community moderation — all
          agentic, all local where local makes sense. I'm not available 24/7. My
          agents are. Every workflow I automate for myself becomes a blog post,
          then an OSS tool, then an engagement.
        </p>
      </section>

      {/* Now */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
          Now
        </h2>
        <div className="divide-y divide-border">
          {NOW.map(({ label, body }) => (
            <div key={label} className="py-4 first:pt-0 last:pb-0 flex items-baseline gap-4">
              <span className="font-mono text-xs text-bench uppercase tracking-wider shrink-0 w-32">
                {label}
              </span>
              <span className="text-sm text-muted leading-relaxed">{body}</span>
            </div>
          ))}
        </div>
        <p className="font-mono text-xs text-muted mt-4">
          For the full hardware + software + models I run, see{' '}
          <Link href="/stack" className="text-accent hover:underline">/stack</Link>.
        </p>
      </section>

      {/* Philosophy */}
      <section className="border-l-2 border-accent pl-5">
        <p className="font-mono text-sm text-fg leading-relaxed">
          "Sovereign compute is not a philosophy. It is the cheapest, fastest, and
          most defensible substrate for running agentic systems in 2026 — and the
          only one that compounds in your favor."
        </p>
      </section>

      {/* CTA */}
      <section className="flex flex-wrap gap-3 pt-2">
        <Button variant="primary" href="/work-with-me">
          work with me ›
        </Button>
        <Button variant="outline" href="https://github.com/sudosoph">
          github →
        </Button>
        <Button variant="ghost" href="/contact">
          get in touch
        </Button>
      </section>

      {/* Elsewhere */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Elsewhere
        </h2>
        <div className="space-y-2 font-mono text-xs text-muted">
          <div>
            <span className="text-fg">GitHub</span>
            {' — '}
            <Link href="https://github.com/sudosoph" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              github.com/sudosoph
            </Link>
          </div>
          <div>
            <span className="text-fg">Email</span>
            {' — '}
            <Link href="mailto:sophia@agenticarchitecture.ai" className="text-accent hover:underline">
              sophia@agenticarchitecture.ai
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

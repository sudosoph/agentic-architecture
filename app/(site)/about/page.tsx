import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sophia Stein — Sovereign AI Architect. Local-first LLM infrastructure, consulting, and open-source tools from Boulder, CO.',
}

const STACK = [
  { label: 'Hardware', items: ['Framework 16', 'Ryzen AI 9 HX 370 (Strix Point)', 'Radeon 890M / RX 7700S', '96GB DDR5'] },
  { label: 'Inference', items: ['ROCm 7.3', 'llama.cpp (HIP)', '90GB GART pool', '28.4 t/s GLM-4 9B Q8_0'] },
  { label: 'OS / Tools', items: ['Ubuntu 26.04', 'Ollama', 'Open WebUI', 'n8n', 'OpenClaw'] },
  { label: 'Site Stack', items: ['Next.js 16', 'Tailwind 4', 'Cloudflare Workers', 'Keystatic CMS'] },
]

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="about"
        meta="Sophia Stein · Boulder, CO"
        description="I build local-first AI infrastructure and help engineers and businesses stop depending on cloud APIs."
      />

      {/* Bio */}
      <section className="space-y-4 text-sm text-muted leading-relaxed max-w-2xl">
        <p>
          I'm an AI engineer and consultant focused on one thing: making powerful language
          models run locally, reliably, and fast. Not as a philosophical stance — as a practical
          advantage. Local inference is cheaper, faster for latency-sensitive workloads, and
          gives you data ownership that no cloud provider can match.
        </p>
        <p>
          My current workstation runs{' '}
          <span className="font-mono text-bench">28.4 t/s</span> on GLM-4 9B Q8_0 using ROCm 7.3
          with a 90GB GART pool on an AMD Strix Point APU. That's production-grade throughput on
          a laptop form factor. The benchmark matters because it's the proof of concept — every
          client I work with gets a setup that actually performs.
        </p>
        <p>
          I work across two audiences. Engineers who want depth: reproducible benchmarks,
          open-source tooling, the real configuration behind the numbers. And SMBs who want a
          different answer: stop sending $500/month to OpenAI, run the equivalent model locally,
          automate the workflows that are eating your team's time.
        </p>
        <p>
          The third thing, and the one I find most interesting: this business runs on the same
          agents I build for clients. Booking, payments, content syndication, inbox triage,
          community management — all agentic, all local where possible. I'm not available 24/7.
          My agents are. Every workflow I automate for myself becomes a blog post, then an OSS
          tool, then a consulting offering.
        </p>
      </section>

      {/* Stack */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
          Current Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
          {STACK.map(({ label, items }) => (
            <div key={label} className="bg-bg p-5">
              <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
                {label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map(item => (
                  <Badge key={item} variant="tag">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-l-2 border-accent pl-5">
        <p className="font-mono text-sm text-fg leading-relaxed">
          "The goal is sovereign compute — infrastructure you control, that improves
          continuously, and that compounds into an unfair advantage."
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

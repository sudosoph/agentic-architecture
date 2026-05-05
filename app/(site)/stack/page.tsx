import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Stack',
  description:
    'The exact hardware, OSS tools, and models powering Agentic Architecture. Reproducible, auditable, local-first.',
}

const HARDWARE = [
  {
    name: 'Framework 16 (AMD)',
    spec: 'Ryzen AI 9 HX 370 · Strix Point · Zen 5 + RDNA 3.5 + XDNA 2',
    note: 'Repairable, upgradeable, the only laptop I trust to still be running this stack in 2030.',
  },
  {
    name: 'Radeon RX 7700S',
    spec: '8GB GDDR6 · 100W TGP · Navi 33',
    note: 'Discrete GPU module for cold starts and bursty image/video workloads.',
  },
  {
    name: 'Memory',
    spec: '96GB DDR5-5600 (2 × 48GB SO-DIMM)',
    note: 'The number that matters. 90GB carved as GART feeds the iGPU.',
  },
  {
    name: 'Storage',
    spec: '4TB primary + 2TB secondary (NVMe Gen 4)',
    note: 'Models, datasets, vector indexes, and the inevitable swap when you push the loop too hard.',
  },
  {
    name: 'Audio',
    spec: 'AIAIAI TMA-2 Studio Wireless+',
    note: 'Modular, repairable headphones from a Danish industrial-design house. Same philosophy as Framework.',
  },
]

const SOFTWARE = [
  {
    name: 'Ubuntu 24.04 + kernel 6.11',
    note: 'Boring on purpose. ROCm and DKMS are happy here.',
  },
  {
    name: 'ROCm 7.3',
    note: 'First release where Strix Point + RDNA 3.5 is genuinely supported.',
  },
  {
    name: 'llama.cpp (HIP backend)',
    note: 'Built from source against gfx1150 + gfx1102. The single most-used binary on this machine.',
  },
  {
    name: 'Ollama',
    note: 'Model server. Wrapped by an MCP bridge for tool-using agents.',
  },
  {
    name: 'n8n (self-hosted)',
    note: 'The factory floor for every recurring agentic workflow.',
  },
  {
    name: 'Claude Code · Codex · OpenClaw',
    note: 'Coding agents, in that order of daily use.',
  },
  {
    name: 'Postgres + pgvector',
    note: 'Default for vector storage when a use case outgrows flat files.',
  },
  {
    name: 'Caddy + Tailscale',
    note: 'TLS and access. Everything sensitive sits on a tailnet, not the public internet.',
  },
]

const MODELS = [
  { name: 'GLM-4 9B Q8_0', use: 'Default agentic loop. Best instruction-following under 10B in my testing.' },
  { name: 'Qwen 3 8B / 32B', use: 'Tool-calling and structured output. The 32B at Q4_K_M is the smartest model that still fits comfortably.' },
  { name: 'Llama 3.3 8B', use: 'Tied with Qwen for fastest tool-heavy loops. Honest baseline.' },
  { name: 'Gemma 3 27B Q4_K_M', use: 'When I want a slower, more thoughtful single-shot answer.' },
  { name: 'Frontier APIs (Claude / GPT-5)', use: 'Reserved for the ~5% of turns where I genuinely need the smartest model in the world. A well-designed loop calls the frontier ~once per session.' },
]

export default function StackPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="stack"
        description="The exact hardware, software, and models powering this site, my agents, and every consulting engagement. Reproducible, auditable, local-first."
      />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            Hardware
          </h2>
          <Badge variant="tag">Framework 16 · maxed</Badge>
        </div>
        <div className="divide-y divide-border">
          {HARDWARE.map(({ name, spec, note }) => (
            <div key={name} className="py-5 first:pt-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-mono text-sm text-fg">{name}</h3>
                <span className="font-mono text-xs text-accent shrink-0">{spec}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Software
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {SOFTWARE.map(({ name, note }) => (
            <div key={name} className="bg-bg p-5">
              <h3 className="font-mono text-sm text-fg mb-1">{name}</h3>
              <p className="text-xs text-muted leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Models I actually use
        </h2>
        <div className="divide-y divide-border">
          {MODELS.map(({ name, use }) => (
            <div key={name} className="py-5 first:pt-0 last:pb-0">
              <h3 className="font-mono text-sm text-fg mb-1">{name}</h3>
              <p className="text-sm text-muted leading-relaxed">{use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Configs &amp; dotfiles
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          The ROCm install commands, GART kernel parameters, llama.cpp build flags, and n8n workflow templates
          will land on{' '}
          <a
            href="https://github.com/sudosoph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            github.com/sudosoph
          </a>{' '}
          as <span className="font-mono text-fg">apu-config</span> — a one-command optimizer that detects your
          AMD APU and outputs the right configuration. Nothing here is gatekept.
        </p>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Stack',
  description:
    'The exact hardware, software, and open-weight models I run. Reproducible, auditable, local-first. May 2026.',
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
    note: 'Discrete GPU module for cold starts and bursty image / video workloads.',
  },
  {
    name: 'Memory',
    spec: '96GB DDR5-5600 (2 × 48GB SO-DIMM)',
    note: 'The number that matters. 90GB carved as GART feeds the iGPU directly out of system RAM.',
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
    name: 'Ubuntu 26.04 LTS (Resolute Raccoon)',
    note: 'GNOME 50 on Wayland-only, memory-safe Rust coreutils, systemd 259, TPM-backed disk encryption. Boring on purpose.',
  },
  {
    name: 'ROCm 7.3',
    note: 'First release where Strix Point + RDNA 3.5 is genuinely supported as a pair, not a science project.',
  },
  {
    name: 'llama.cpp (HIP backend)',
    note: 'Built from source against gfx1150 + gfx1102. The single most-used binary on this machine.',
  },
  {
    name: 'Ollama',
    note: 'Model server. Wrapped by an MCP bridge for tool-using agents (because Ollama still does not speak MCP natively).',
  },
  {
    name: 'n8n (self-hosted)',
    note: 'The factory floor for every recurring agentic workflow. Templates ship with the newsletter.',
  },
  {
    name: 'Claude Code · Codex · OpenClaw',
    note: 'Coding agents, in that order of daily use. Each one rotates through depending on the task.',
  },
  {
    name: 'Postgres + pgvector',
    note: 'Default for vector storage when a use case outgrows flat files. Boring, fast, audit-friendly.',
  },
  {
    name: 'Caddy + Tailscale',
    note: 'TLS and access. Everything sensitive sits on a tailnet, not the public internet.',
  },
]

const MODELS_LOCAL = [
  {
    name: 'Qwen 3.6 27B Dense',
    use: 'My default for agentic coding loops. Hits 77.2% on SWE-bench Verified — the 27B Dense actually beats Qwen\'s own 397B MoE flagship on coding tasks. Apache 2.0. Runs at Q5_K_M with room for full context.',
  },
  {
    name: 'Gemma 4 31B Dense',
    use: 'Default for UI generation with Tailwind. Google trained the family heavily on frontend code; the 31B Dense lands #3 on the open Arena leaderboard, ahead of every other open model with weights you can actually download. Apache 2.0.',
  },
  {
    name: 'Gemma 4 26B MoE (3.8B active)',
    use: 'Same family, MoE variant. Activates 3.8B of 26B per token, so latency feels like a small model with the quality of a big one. The right pick when I am running parallel agents and want throughput.',
  },
  {
    name: 'Gemma 4 E4B',
    use: 'On-device variant (~4.5B effective). The fast one. Tool routing, classification, structured-output extraction — anything that does not need depth.',
  },
]

const MODELS_API = [
  {
    name: 'Kimi K2.6 (Moonshot AI)',
    use: 'Best open-weights model I have found for natural-language → Awwwards-grade UI. Coding-driven design — ships React + Tailwind production code with animations, not mockups. 1T MoE / 32B active / 256K context / Modified MIT. Too big for local; I call it via API for interface work.',
  },
  {
    name: 'DeepSeek V4 (Flash + Pro)',
    use: 'Multimodal and spatial reasoning. V4 vision uses ~10× fewer KV-cache entries than Claude vision and beats GPT-5.4 on maze navigation 67% to 50%. Diagram parsing, screenshot-to-code, document extraction. 1M context, MIT. API for now; the 284B Flash might fit local at heavy quantization eventually.',
  },
  {
    name: 'Frontier API (Claude / GPT-5)',
    use: 'Reserved for the ~5% of agentic turns that genuinely need the smartest model in the world. A well-designed loop calls the frontier ~once per session, not eighty times.',
  },
]

export default function StackPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="stack"
        meta="May 2026 · subject to drift"
        description="The exact hardware, software, and open-weight models I run. Reproducible, auditable, local-first. Prices and pretty diagrams not included."
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            Open-weight models I run locally
          </h2>
          <Badge variant="tag">Apache 2.0</Badge>
        </div>
        <p className="text-xs text-muted mb-4 leading-relaxed">
          I do not run Llama. The 2026 open-weight frontier shifted decisively to Qwen, Gemma, Kimi, and DeepSeek.
        </p>
        <div className="divide-y divide-border">
          {MODELS_LOCAL.map(({ name, use }) => (
            <div key={name} className="py-5 first:pt-0 last:pb-0">
              <h3 className="font-mono text-sm text-fg mb-1">{name}</h3>
              <p className="text-sm text-muted leading-relaxed">{use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            Models I call via API
          </h2>
          <Badge variant="tag">when local won't cut it</Badge>
        </div>
        <p className="text-xs text-muted mb-4 leading-relaxed">
          A 1T-parameter MoE does not fit on a laptop. For the tasks where it earns the bill, I pay the bill.
        </p>
        <div className="divide-y divide-border">
          {MODELS_API.map(({ name, use }) => (
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
          The ROCm install commands, GART kernel parameters, llama.cpp HIP build flags, n8n workflow templates,
          and the MCP bridge config for Ollama will land on{' '}
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

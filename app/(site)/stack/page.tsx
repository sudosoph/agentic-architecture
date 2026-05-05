import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Stack',
  description:
    'The exact hardware, AI tooling, open-weight models, and web stack I run. Reproducible, auditable, local-first. May 2026.',
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

const AI_STACK = [
  {
    name: 'Ubuntu 26.04 LTS',
    note: 'Resolute Raccoon. GNOME 50 on Wayland-only, Rust coreutils, systemd 259, TPM-backed disk encryption. Boring on purpose.',
  },
  {
    name: 'ROCm 7.3',
    note: 'First release where Strix Point + RDNA 3.5 is genuinely supported as a pair. Local AMD inference is a real thing now.',
  },
  {
    name: 'llama.cpp',
    note: 'Built from source against gfx1150 + gfx1102. The single most-used binary on this machine.',
  },
  {
    name: 'Vulkan backend',
    note: 'Cross-platform GPU acceleration. The fallback when a model or quant misbehaves on HIP — and increasingly competitive on AMD for inference.',
  },
  {
    name: 'Ollama',
    note: 'Model server + REST API. Wrapped by an MCP bridge for tool-using agents (Ollama still does not speak MCP natively).',
  },
  {
    name: 'CrewAI',
    note: 'Open-source orchestrator for role-based multi-agent crews. The framework I reach for when a workflow is decomposable into specialists.',
  },
  {
    name: 'Aider',
    note: 'Terminal-native pair-programmer. The honest middle ground between vibe-coding and writing every line.',
  },
  {
    name: 'Chroma',
    note: 'Vector store + agentic-search tooling. Their context-rot research is required reading before you reach for a million-token window.',
  },
  {
    name: 'n8n (self-hosted)',
    note: 'The factory floor for every recurring agentic workflow. Templates ship with the newsletter.',
  },
]

const CODING_AGENTS = [
  {
    name: 'Claude Code',
    note: 'Daily driver. Skills + hooks + project memory. The harness most of this site was built in.',
  },
  {
    name: 'OpenAI Codex',
    note: 'Second-string daily driver. Better at long detail-oriented refactors; worse at the snappy interactive loop.',
  },
  {
    name: 'OpenClaw',
    note: 'Terminal-resident agent that lives across sessions. The CEO interface on top of n8n.',
  },
]

const LOCAL_MODELS = [
  {
    name: 'Qwen 3.6 27B Dense (coder)',
    use: 'Daily driver for agentic coding loops. Hits 77.2% on SWE-bench Verified — the 27B Dense actually beats Qwen\'s own 397B MoE flagship on coding tasks. Apache 2.0.',
  },
  {
    name: 'Qwen 3.6 35B-A3B (mixture)',
    use: 'The MoE variant in the same family. Same Apache 2.0 release. I rotate it in for fan-out turns where I want throughput over peak intelligence.',
  },
  {
    name: 'Gemma 4 31B Dense',
    use: 'Default for UI generation with Tailwind. Google trained the family heavily on frontend code; the 31B Dense lands #3 on the open Arena leaderboard. Apache 2.0.',
  },
  {
    name: 'Kimi K2.6 (quantized GGUF)',
    use: 'Moonshot AI\'s 1T-parameter MoE, run aggressively quantized via llama.cpp\'s INT4 path. Strongest local model I have for natural-language → Awwwards-grade UI. Quality scales with how much VRAM you can throw at it; 96GB unified gets a usable subset.',
  },
  {
    name: 'DeepSeek V4 Lite',
    use: 'The ~200B parameter local-friendly variant of V4. Multimodal + spatial reasoning — diagram parsing, screenshot-to-code, document extraction. MIT. The model that proved sub-frontier multimodal could happen on a laptop.',
  },
]

const FRONTIER_APIS = [
  {
    name: 'Claude (Sonnet 4.5 / Opus 4.x)',
    use: 'My pick for the ~5% of agentic turns that genuinely need the smartest model in the world. Skills, hooks, and the harness around Claude Code are the best in class as of May 2026.',
  },
  {
    name: 'GPT-5',
    use: 'Second frontier option. I rotate between the two when one regresses (it happens — Anthropic publicly acknowledged a two-month silent quality drop in early 2026). Two providers, one harness, no lock-in.',
  },
]

const WEB_STACK = [
  { name: 'Next.js', note: 'App Router, Turbopack, RSC. The framework every coding agent has read enough of to be genuinely useful in.' },
  { name: 'Tailwind CSS', note: 'Utility-first CSS that LLMs were trained on so heavily it almost generates itself. Pairs with Gemma 4 / Kimi for instant UI.' },
  { name: 'Cloudflare Workers', note: 'The site you are reading runs on a single worker via @opennextjs/cloudflare. Free tier handles real traffic.' },
  { name: 'Postgres + pgvector', note: 'Boring, fast, audit-friendly. Default for relational + vector storage when a use case outgrows flat files.' },
  { name: 'Keystatic', note: 'Git-backed CMS. Content lives in MDX in the repo, not in someone else\'s database.' },
  { name: 'Resend', note: 'Transactional email. Direct API, edge-friendly, no SDK needed.' },
  { name: 'PostHog (self-hosted)', note: 'Product analytics, session replay, feature flags, error tracking, surveys — all in one. Replaces ~$300/month of SaaS at zero marginal cost.' },
  { name: 'GlitchTip (self-hosted)', note: 'Sentry-compatible error tracking. ~5–6× cheaper than Sentry at scale, MIT-licensed, runs on the same Hetzner box as everything else.' },
  { name: 'Listmonk (self-hosted)', note: 'Newsletter platform. Sends The Architect\'s Notebook. Replaces Buttondown/Substack at near-zero marginal cost.' },
  { name: 'Umami (self-hosted)', note: 'Privacy-friendly web analytics for the public site. Lighter touch than PostHog where session replay is overkill.' },
]

export default function StackPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="stack"
        meta="May 2026 · subject to drift"
        description="The exact hardware, AI tooling, open-weight models, and web stack I run. Reproducible, auditable, local-first wherever local-first works."
      />

      {/* Hardware */}
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

      {/* AI Stack */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          AI Stack — Open Source
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {AI_STACK.map(({ name, note }) => (
            <div key={name} className="bg-bg p-5">
              <h3 className="font-mono text-sm text-fg mb-1">{name}</h3>
              <p className="text-xs text-muted leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coding Agents */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Coding Agents
        </h2>
        <p className="text-xs text-muted mb-4 leading-relaxed">
          The daily harnesses I rotate through. Different strengths; same project memory file.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {CODING_AGENTS.map(({ name, note }) => (
            <div key={name} className="bg-bg p-5">
              <h3 className="font-mono text-sm text-fg mb-1">{name}</h3>
              <p className="text-xs text-muted leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Local Models */}
      <section className="border-t border-border pt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            Models I run locally
          </h2>
          <Badge variant="tag">downloaded · running on this laptop</Badge>
        </div>
        <p className="text-xs text-muted mb-4 leading-relaxed">
          I do not run Llama. The 2026 open-weight frontier shifted decisively to Qwen, Gemma, Kimi, and DeepSeek — and these are all sitting on the NVMe in this laptop, not behind a third-party API.
        </p>
        <div className="divide-y divide-border">
          {LOCAL_MODELS.map(({ name, use }) => (
            <div key={name} className="py-5 first:pt-0 last:pb-0">
              <h3 className="font-mono text-sm text-fg mb-1">{name}</h3>
              <p className="text-sm text-muted leading-relaxed">{use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Frontier APIs */}
      <section className="border-t border-border pt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            Frontier APIs (the only things I call by network)
          </h2>
          <Badge variant="tag">~5% of turns</Badge>
        </div>
        <p className="text-xs text-muted mb-4 leading-relaxed">
          Reserved for when local genuinely cannot do the job. Two providers, by design — no single-vendor lock-in.
        </p>
        <div className="divide-y divide-border">
          {FRONTIER_APIS.map(({ name, use }) => (
            <div key={name} className="py-5 first:pt-0 last:pb-0">
              <h3 className="font-mono text-sm text-fg mb-1">{name}</h3>
              <p className="text-sm text-muted leading-relaxed">{use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Web / Dev Stack */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Web &amp; Dev Stack
        </h2>
        <p className="text-xs text-muted mb-4 leading-relaxed">
          The toolkit I build sites and businesses on. Picked deliberately for two reasons: (1) every coding agent has read enough of these to be genuinely useful in them, and (2) the self-hosted ones replace ~$700/year of SaaS at near-zero marginal cost.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {WEB_STACK.map(({ name, note }) => (
            <div key={name} className="bg-bg p-5">
              <h3 className="font-mono text-sm text-fg mb-1">{name}</h3>
              <p className="text-xs text-muted leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Configs */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Configs &amp; dotfiles
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          The ROCm install commands, GART kernel parameters, llama.cpp HIP build flags, n8n workflow templates,
          MCP bridge config for Ollama, and the docker-compose for the self-hosted PostHog / GlitchTip / Listmonk
          / Umami stack will all land on{' '}
          <a
            href="https://github.com/sudosoph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            github.com/sudosoph
          </a>{' '}
          as <span className="font-mono text-fg">apu-config</span> and <span className="font-mono text-fg">solo-stack</span>. Nothing here is gatekept.
        </p>
      </section>
    </div>
  )
}

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
    href: 'https://frame.work/products/laptop16-diy-amd-aimax300',
  },
  {
    name: 'Radeon RX 7700S',
    spec: '8GB GDDR6 · 100W TGP · Navi 33',
    note: 'Discrete GPU module for cold starts and bursty image / video workloads.',
    href: 'https://frame.work/products/rx-7700s-graphics-module',
  },
  {
    name: 'Memory',
    spec: '96GB DDR5-5600 (2 × 48GB SO-DIMM)',
    note: 'The number that matters. 90GB carved as GART feeds the iGPU directly out of system RAM.',
    href: 'https://frame.work/products/memory-ddr5-5600',
  },
  {
    name: 'Storage',
    spec: '4TB primary + 2TB secondary (NVMe Gen 4)',
    note: 'Models, datasets, vector indexes, and the inevitable swap when you push the loop too hard.',
    href: 'https://frame.work/products/wd_black-sn850x-nvme-m-2-2280',
  },
  {
    name: 'Audio',
    spec: 'AIAIAI TMA-2 Studio Wireless+',
    note: 'Modular, repairable headphones from a Danish industrial-design house. Same philosophy as Framework.',
    href: 'https://aiaiai.audio/products/tma-2-studio-wireless-plus',
  },
]

const INFERENCE = [
  { name: 'ROCm 7.3', note: 'AMD GPU runtime. First release where Strix Point + RDNA 3.5 is genuinely supported as a pair.', href: 'https://rocm.docs.amd.com' },
  { name: 'Vulkan', note: 'Cross-platform GPU runtime. The fallback when a model or quant misbehaves on HIP, and increasingly competitive on AMD for inference.', href: 'https://www.vulkan.org' },
  { name: 'llama.cpp', note: 'LLM inference engine. Built from source against gfx1150 + gfx1102. The most-used binary on this machine.', href: 'https://github.com/ggml-org/llama.cpp' },
  { name: 'Ollama', note: 'Model server with REST API. Wrapped by an MCP bridge for tool-using agents (Ollama still does not speak MCP natively).', href: 'https://ollama.com' },
]

const DATA_LAYER = [
  { name: 'Apify', note: 'Web scraping and data acquisition. Marketplace of 25K+ tools agents can call without rolling your own scrapers. The way external data gets into the loop.', href: 'https://apify.com' },
  { name: 'LlamaIndex', note: 'Document parsing and ingest. PDFs, scans, tables, charts in. Structured agent-ready output out. The OCR plus reasoning pipeline most agentic doc workloads need.', href: 'https://www.llamaindex.ai' },
  { name: 'Pydantic', note: 'Schemas and validation. The reason structured-output extraction works. Used under the hood by FastMCP, CrewAI, and most production agent frameworks.', href: 'https://pydantic.dev' },
  { name: 'Chroma', note: 'Vector store and agentic-search tooling. Their context-rot research is required reading before you reach for a million-token window.', href: 'https://www.trychroma.com' },
  { name: 'Neo4j', note: 'Property graph database. The substrate for knowledge graphs agents traverse. GraphRAG patterns run here.', href: 'https://neo4j.com' },
  { name: 'Postgres + pgvector', note: 'Boring, fast, audit-friendly. Default for relational plus vector storage when a use case outgrows flat files.', href: 'https://github.com/pgvector/pgvector' },
]

const ORCHESTRATION = [
  { name: 'n8n (self-hosted)', note: 'Low-code workflow automation. The factory floor for every recurring agentic workflow on this site and business.', href: 'https://n8n.io' },
  { name: 'Temporal', note: 'Durable distributed execution. Used when an agentic workflow has to survive process restarts, deploys, and the kind of failures that do not happen on demos.', href: 'https://temporal.io' },
  { name: 'CrewAI', note: 'Multi-agent orchestrator for role-based crews. The framework I reach for when a workflow decomposes into specialists.', href: 'https://www.crewai.com' },
  { name: 'LangGraph', note: 'Graph-shaped agent execution. The architecture the Bain HR Services payroll agent uses (8 subgraphs, 98% accuracy on 3K live emails per day).', href: 'https://www.langchain.com/langgraph' },
]

const CODING_AGENTS = [
  { name: 'Claude Code', note: 'Daily driver. Skills + hooks + project memory. The harness most of this site was built in.', href: 'https://claude.com/code' },
  { name: 'OpenAI Codex', note: 'Second-string daily driver. Better at long detail-oriented refactors. Worse at the snappy interactive loop.', href: 'https://openai.com/codex' },
  { name: 'Aider', note: 'Terminal-native pair-programmer. The honest middle ground between vibe-coding and writing every line.', href: 'https://aider.chat' },
  { name: 'OpenClaw', note: 'Persistent terminal-resident agent that lives across sessions. The CEO interface on top of n8n.', href: 'https://openclaw.ai' },
]

const LOCAL_MODELS = [
  {
    name: 'Qwen 3.6 27B Dense (coder)',
    use: 'Daily driver for agentic coding loops. 77.2% on SWE-bench Verified. The 27B Dense actually beats Qwen\'s own 397B MoE flagship on coding tasks. Apache 2.0.',
  },
  {
    name: 'Qwen 3.6 35B-A3B (mixture)',
    use: 'The MoE variant in the same family. I rotate it in for fan-out turns where I want throughput over peak intelligence. Apache 2.0.',
  },
  {
    name: 'Gemma 4 31B Dense',
    use: 'Default for UI generation with Tailwind. Google trained the family heavily on frontend code. The 31B Dense lands #3 on the open Arena leaderboard. Apache 2.0.',
  },
  {
    name: 'Kimi K2.6 (quantized GGUF)',
    use: 'Moonshot AI\'s 1T-parameter MoE, run aggressively quantized via llama.cpp\'s INT4 path. Strongest local model I have for natural-language to Awwwards-grade UI.',
  },
  {
    name: 'DeepSeek V4 Lite',
    use: 'The ~200B parameter local-friendly variant of V4. Multimodal plus spatial reasoning: diagram parsing, screenshot-to-code, document extraction. MIT.',
  },
]

const FRONTIER_APIS = [
  {
    name: 'Claude (Sonnet 4.5 / Opus 4.x)',
    use: 'My pick for the ~5% of agentic turns that genuinely need the smartest model in the world. Skills, hooks, and the harness around Claude Code are the best in class as of May 2026.',
  },
  {
    name: 'GPT-5',
    use: 'Second frontier option. I rotate between the two when one regresses. Two providers, one harness, no lock-in.',
  },
]

const WEB_STACK = [
  { name: 'Next.js', note: 'App Router, Turbopack, RSC. The framework every coding agent has read enough of to be genuinely useful in.', href: 'https://nextjs.org' },
  { name: 'Tailwind CSS', note: 'Utility-first CSS that LLMs were trained on so heavily it almost generates itself. Pairs with Gemma 4 / Kimi for instant UI.', href: 'https://tailwindcss.com' },
  { name: 'Cloudflare Workers', note: 'The site you are reading runs on a single Worker via @opennextjs/cloudflare. Free tier handles real traffic.', href: 'https://workers.cloudflare.com' },
  { name: 'Keystatic', note: 'Git-backed CMS. Content lives in MDX in the repo, not in someone else\'s database.', href: 'https://keystatic.com' },
]

const COMMS = [
  { name: 'Stalwart Mail (self-hosted)', note: 'Open-source mail server. The Fastmail / Google Workspace alternative when you want to own the inbox the agent reads.', href: 'https://stalw.art' },
  { name: 'Plunk (self-hosted)', note: 'Open-source transactional email, MIT-licensed. The Resend alternative when you want to own deliverability. Resend is the managed fallback.', href: 'https://www.useplunk.com' },
  { name: 'Listmonk (self-hosted)', note: 'Newsletter platform. Sends The Architect\'s Notebook. Replaces Buttondown / Substack at near-zero marginal cost.', href: 'https://listmonk.app' },
  { name: 'Chatwoot (self-hosted)', note: 'Customer service plus live chat widget. Inbound conversations route through the triage agent before reaching me.', href: 'https://www.chatwoot.com' },
]

const BIZOPS = [
  {
    label: 'Sales & money',
    items: [
      { name: 'Cal.com (self-hosted)', note: 'Open-source booking. Calendly replacement. Routes inbound calls through n8n with agent-prepared context before the meeting.', href: 'https://cal.com' },
      { name: 'EspoCRM (self-hosted)', note: 'Open-source CRM. The HubSpot alternative when you want the agent to read and write customer state without sending everything to a vendor.', href: 'https://www.espocrm.com' },
      { name: 'Stripe + Lago', note: 'Stripe for the payment processor (no real OSS for moving money, banking is regulated). Lago for the billing infrastructure on top: usage metering, invoicing, plan management. MIT-licensed.', href: 'https://stripe.com' },
      { name: 'Mercury · Relay · Bunq', note: 'Founder-friendly business banking. Mercury and Relay (US) for free no-fee operating accounts. Bunq Business (EU) for all-in-one. Wise for multi-currency.', href: 'https://mercury.com' },
    ],
  },
  {
    label: 'Ops & knowledge',
    items: [
      { name: 'Plane (self-hosted)', note: 'Open-source issue tracking. The Linear alternative when you want the polish without the per-seat tax. AGPL-licensed.', href: 'https://plane.so' },
      { name: 'PostHog (self-hosted)', note: 'Product analytics, session replay, feature flags, surveys. Replaces ~$300/month of SaaS at zero marginal cost.', href: 'https://posthog.com' },
      { name: 'Umami (self-hosted)', note: 'Privacy-friendly web analytics for the public site. Lighter touch than PostHog where session replay is overkill.', href: 'https://umami.is' },
      { name: 'GlitchTip (self-hosted)', note: 'Sentry-compatible error tracking. ~5x cheaper than Sentry at scale, MIT-licensed.', href: 'https://glitchtip.com' },
      { name: 'Outline (self-hosted)', note: 'Team knowledge base. Notion alternative. Stores skills, runbooks, and the docs the coding agents read alongside the codebase.', href: 'https://www.getoutline.com' },
      { name: 'Vaultwarden (self-hosted)', note: 'Password manager. Bitwarden-compatible server, Rust rewrite. Where every API key the agent needs to rotate actually lives.', href: 'https://github.com/dani-garcia/vaultwarden' },
      { name: 'Hetzner Cloud', note: 'The $5/mo VPS that hosts the self-hosted half of this stack. EU-based, frugal, predictable.', href: 'https://www.hetzner.com/cloud' },
    ],
  },
]

const LAYER_NAV = [
  { id: 'l0', label: 'L0', title: 'Hardware' },
  { id: 'l1', label: 'L1', title: 'OS' },
  { id: 'l2', label: 'L2', title: 'Inference' },
  { id: 'l3', label: 'L3', title: 'Models · local' },
  { id: 'l4', label: 'L4', title: 'Models · frontier' },
  { id: 'l5', label: 'L5', title: 'Data' },
  { id: 'l6', label: 'L6', title: 'Orchestration' },
  { id: 'l7', label: 'L7', title: 'Coding agents' },
  { id: 'l8', label: 'L8', title: 'Web stack' },
  { id: 'l9', label: 'L9', title: 'Comms' },
  { id: 'l10', label: 'L10', title: 'Bizops' },
]

type Item = { name: string; note?: string; spec?: string; use?: string; href?: string }

function ItemCard({ item }: { item: Item }) {
  const inner = (
    <>
      <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors mb-1 flex items-baseline gap-1.5">
        <span>{item.name}</span>
        {item.href && <span className="text-muted text-xs">↗</span>}
      </h3>
      {item.spec && <p className="font-mono text-xs text-accent mb-1">{item.spec}</p>}
      <p className="text-xs text-muted leading-relaxed">{item.note ?? item.use}</p>
    </>
  )
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="bg-bg p-5 group block hover:bg-surface transition-colors"
      >
        {inner}
      </a>
    )
  }
  return <div className="bg-bg p-5">{inner}</div>
}

function Section({
  id,
  label,
  title,
  desc,
  items,
  badge,
  cols = 2,
}: {
  id?: string
  label?: string
  title: string
  desc?: string
  items: Item[]
  badge?: string
  cols?: 1 | 2 | 3 | 4
}) {
  const gridCols = cols === 1 ? 'grid-cols-1' : cols === 2 ? 'md:grid-cols-2' : cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'
  return (
    <section id={id} className="border-t border-border pt-10 scroll-mt-20">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
          {label && <span className="text-bench mr-2">{label}</span>}
          {title}
        </h2>
        {badge && <Badge variant="tag">{badge}</Badge>}
      </div>
      {desc && <p className="text-xs text-muted mb-4 leading-relaxed">{desc}</p>}
      <div className={`grid ${gridCols} gap-px bg-border`}>
        {items.map(item => (
          <ItemCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}

export default function StackPage() {
  return (
    <div className="lg:grid lg:grid-cols-[1fr_180px] lg:gap-12">
      <div className="min-w-0 space-y-2">
      <PageHeader
        title="stack"
        meta="May 2026 · subject to drift"
        description="The exact hardware, AI tooling, open-weight models, and web stack I run. Reproducible, auditable, local-first wherever local-first works."
      />

      {/* Mobile jump nav */}
      <details className="lg:hidden mt-6 border border-border bg-surface p-4">
        <summary className="font-mono text-xs text-muted uppercase tracking-widest cursor-pointer">
          Jump to layer
        </summary>
        <ul className="mt-3 grid grid-cols-2 gap-1.5">
          {LAYER_NAV.map(({ id, label, title }) => (
            <li key={id}>
              <a href={`#${id}`} className="font-mono text-xs text-muted hover:text-accent">
                <span className="text-bench mr-1">{label}</span>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </details>

      {/* Affiliate disclosure */}
      <section className="mt-6 border border-border bg-surface px-4 py-3">
        <p className="font-mono text-xs text-muted leading-relaxed">
          <span className="text-bench uppercase tracking-widest mr-2">disclosure</span>
          Every link goes to the official product page. I only list things I actually use. As I sign up for referral programs, those will replace the direct links. The disclosure stays here either way.
        </p>
      </section>

      {/* Hardware */}
      <section id="l0" className="pt-8 scroll-mt-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            <span className="text-bench mr-2">L0</span>
            Hardware
          </h2>
          <Badge variant="tag">Framework 16 · maxed</Badge>
        </div>
        <div className="divide-y divide-border">
          {HARDWARE.map(({ name, spec, note, href }) => {
            const inner = (
              <>
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors flex items-baseline gap-1.5">
                    <span>{name}</span>
                    {href && <span className="text-muted text-xs">↗</span>}
                  </h3>
                  <span className="font-mono text-xs text-accent shrink-0">{spec}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{note}</p>
              </>
            )
            return href ? (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block py-5 first:pt-0 last:pb-0 group"
              >
                {inner}
              </a>
            ) : (
              <div key={name} className="py-5 first:pt-0 last:pb-0">
                {inner}
              </div>
            )
          })}
        </div>
      </section>

      {/* OS */}
      <section id="l1" className="border-t border-border pt-10 scroll-mt-20">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          <span className="text-bench mr-2">L1</span>
          OS
        </h2>
        <div className="bg-bg border border-border p-5">
          <h3 className="font-mono text-sm text-fg mb-1">Ubuntu 26.04 LTS · Resolute Raccoon</h3>
          <p className="text-xs text-muted leading-relaxed">
            GNOME 50 on Wayland-only, memory-safe Rust coreutils, systemd 259 with mandatory cgroup v2,
            TPM-backed full-disk encryption out of the box. AMDGPU support for Strix Point ships in the GA
            tree. Boring on purpose.
          </p>
        </div>
      </section>

      <Section
        id="l2"
        label="L2"
        title="Inference (GPU + model serving)"
        items={INFERENCE}
        cols={2}
      />

      {/* Models I run locally */}
      <section id="l3" className="border-t border-border pt-10 scroll-mt-20">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            <span className="text-bench mr-2">L3</span>
            Models · local
          </h2>
          <Badge variant="tag">downloaded · running on this laptop</Badge>
        </div>
        <p className="text-xs text-muted mb-4 leading-relaxed">
          I do not run Llama. The 2026 open-weight frontier shifted decisively to Qwen, Gemma, Kimi, and
          DeepSeek, and these are all sitting on the NVMe in this laptop, not behind a third-party API.
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
      <section id="l4" className="border-t border-border pt-10 scroll-mt-20">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            <span className="text-bench mr-2">L4</span>
            Models · frontier APIs
          </h2>
          <Badge variant="tag">~5% of turns</Badge>
        </div>
        <p className="text-xs text-muted mb-4 leading-relaxed">
          The only things I call by network. Reserved for when local genuinely cannot do the job. Two
          providers by design, no single-vendor lock-in.
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

      <Section
        id="l5"
        label="L5"
        title="Data: ingest, validate, store, retrieve"
        desc="The full data path: get it in (Apify), parse documents (LlamaIndex), shape and validate (Pydantic), store it where it belongs (Chroma for vectors, Neo4j for graph, Postgres for everything else)."
        items={DATA_LAYER}
        cols={2}
      />

      <Section
        id="l6"
        label="L6"
        title="Orchestration"
        desc="Workflow runtimes that turn a one-off prompt into a recurring, governed, durable system."
        items={ORCHESTRATION}
        cols={2}
      />

      <Section
        id="l7"
        label="L7"
        title="Coding agents"
        desc="The daily harnesses I rotate through. Different strengths, same project memory file."
        items={CODING_AGENTS}
        cols={2}
      />

      <Section
        id="l8"
        label="L8"
        title="Web stack"
        desc="The framework, deployment, and CMS the site runs on. Picked because every coding agent has read enough of these to be genuinely useful in them."
        items={WEB_STACK}
        cols={2}
      />

      <Section
        id="l9"
        label="L9"
        title="Comms"
        desc="The four pieces that handle every inbound and outbound message: mail server, transactional email, newsletter, customer chat."
        items={COMMS}
        cols={2}
      />

      <section id="l10" className="border-t border-border pt-10 scroll-mt-20">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            <span className="text-bench mr-2">L10</span>
            Bizops
          </h2>
        </div>
        <p className="text-xs text-muted mb-6 leading-relaxed">
          Sales, money, and operations. Replaces ~$1,500/month of managed SaaS at the cost of one VPS.
        </p>
        <div className="space-y-8">
          {BIZOPS.map(group => (
            <div key={group.label}>
              <h3 className="font-mono text-xs text-bench uppercase tracking-wider mb-3">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {group.items.map(item => (
                  <ItemCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Configs
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          The ROCm install commands, GART kernel parameters, llama.cpp HIP build flags, n8n workflow
          templates, MCP bridge config for Ollama, and the docker-compose for the self-hosted PostHog /
          GlitchTip / Listmonk / Umami stack land on{' '}
          <a
            href="https://github.com/sudosoph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            github.com/sudosoph
          </a>{' '}
          as <span className="font-mono text-fg">apu-config</span> and{' '}
          <span className="font-mono text-fg">solo-stack</span>.
        </p>
      </section>
      </div>

      {/* Desktop sticky layer nav */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
            Layers
          </p>
          <ul className="space-y-2 border-l border-border">
            {LAYER_NAV.map(({ id, label, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block pl-4 -ml-px border-l border-transparent hover:border-accent font-mono text-xs text-muted hover:text-accent leading-snug py-0.5 transition-colors"
                >
                  <span className="text-bench mr-2">{label}</span>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

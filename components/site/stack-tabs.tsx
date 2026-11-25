'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ToolItem = {
  category: string
  name: string
  cost: string
  summary: string
  href?: string
}

const BUSINESS_STACK: ToolItem[] = [
  {
    category: 'Portable Repo & Org Context',
    name: 'AGENTS.md + voice.md + icp.md',
    cost: '$0 (Versioned Markdown)',
    summary:
      'Keep engineering rules, buyer positioning, and calibration examples in plain Git-tracked files so switching models takes five minutes.',
  },
  {
    category: 'Bookings & Paid Audits',
    name: 'Cal.com + Stripe',
    cost: '$0/mo fixed (or Docker self-hosted)',
    summary:
      'Direct calendar routing for scoping calls and Stripe-backed architecture teardowns without scheduling ping-pong.',
    href: 'https://cal.com',
  },
  {
    category: 'Workflow & Loop Orchestration',
    name: 'n8n (Self-Hosted) + GitHub Actions',
    cost: '$0 OSS / included CI minutes',
    summary:
      'Event-driven pipelines with isolated git worktrees, deterministic verifier steps, and Rung 2 human approval gates.',
    href: 'https://n8n.io',
  },
  {
    category: 'Self-Hosted Personal & Browser Agents',
    name: 'OpenInstinct + OpenClaw (MIT)',
    cost: 'Open source (MIT)',
    summary:
      'Keep OAuth tokens and browser credentials locked inside an encrypted vault or per-user microVM outside the LLM context window.',
    href: 'https://github.com/Merit-Systems/OpenInstinct',
  },
  {
    category: 'Newsletter & Owned Distribution',
    name: 'Canonical MDX Blog + Substack',
    cost: '$0/mo fixed',
    summary:
      'Publish search-canonical benchmark tables on your own domain first, then syndicate distinct story headlines to Substack subscribers.',
    href: 'https://agenticarchitectai.substack.com',
  },
  {
    category: 'Search & Telemetry',
    name: 'Google Search Console + IndexNow',
    cost: '$0',
    summary:
      'Instant canonical URL submission on deploy paired with query-level impression tracking and structured JSON-LD entities.',
  },
]

const SOVEREIGN_STACK: ToolItem[] = [
  {
    category: '512GB Sparse-MoE Desk Nodes',
    name: 'M5 Ultra Mac Studio (512GB · 1.2 TB/s) or DGX Spark',
    cost: '$5,499 to $9,500 capex',
    summary:
      'Vendor-neutral desk compute: M5 Ultra leads quiet token decode for 300GB+ sparse MoE weights (MiniMax M3.1 Flash, Nemotron 3 Ultra); NVIDIA DGX Spark (128GB) leads CUDA prompt prefill.',
  },
  {
    category: '128GB x86 Halo Mini-PCs & 96GB Mobile Linux',
    name: 'HP Z2 Mini G1a / EVO-X2 (128GB) & Framework 16 (96GB)',
    cost: '$1,899 to $3,200 capex',
    summary:
      'Compact 128GB Ryzen AI Max+ (Strix Halo) mini-PCs for best price-per-GB Ubuntu serving at a desk, paired with a repairable 96GB Linux laptop or M5 Max on the road.',
  },
  {
    category: 'Late-2026 Open-Weight Workhorses',
    name: 'DeepSeek 4.1 Flash, Kimi K3.1 Pro & Qwen 3.8-27B',
    cost: '$0 marginal token cost locally',
    summary:
      'Apache 2.0 Qwen 3.8-27B (17GB 4-bit) for fast local coding and vision; MIT DeepSeek V4.1 Flash and Kimi K3.1 Pro for long-context private VPC or cluster trajectories.',
  },
  {
    category: 'Encrypted Zero-Port Mesh',
    name: 'Tailscale Serve',
    cost: 'Free personal / small team tier',
    summary:
      'WireGuard mesh exposing localhost llama-server or vLLM endpoints strictly to authenticated team devices with zero open router ports.',
    href: 'https://tailscale.com',
  },
  {
    category: 'Inference & IDE Next-Edit Runtime',
    name: 'llama.cpp + MLX + Continue Instinct + Audited MCP',
    cost: 'Open source (MIT / Apache 2.0)',
    summary:
      'Native CUDA, HIP, and Apple MLX model serving paired with local IDE Tab edit-trajectory models and pinned, least-privilege MCP servers.',
    href: 'https://github.com/ggml-org/llama.cpp',
  },
  {
    category: 'Edge Web & Cloud Approval Pipeline',
    name: 'Next.js 16 + Cloudflare Workers + GitHub PR CMS',
    cost: '$0 to $5/mo edge hosting',
    summary:
      'Browser-native editing via /studio and /keystatic committing straight to GitHub PRs with automatic Worker deploys.',
    href: 'https://workers.cloudflare.com',
  },
]

export function StackTabs() {
  const [activeTab, setActiveTab] = useState<'business' | 'sovereign'>('business')
  const items = activeTab === 'business' ? BUSINESS_STACK : SOVEREIGN_STACK

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Stack architecture views"
        className="inline-flex flex-wrap gap-2 rounded-xl border border-border bg-surface p-1.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'business'}
          onClick={() => setActiveTab('business')}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'business'
              ? 'bg-accent text-white shadow-xs'
              : 'text-muted hover:text-fg'
          }`}
        >
          15-Minute Team &amp; Loop Stack
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'sovereign'}
          onClick={() => setActiveTab('sovereign')}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'sovereign'
              ? 'bg-accent text-white shadow-xs'
              : 'text-muted hover:text-fg'
          }`}
        >
          Private &amp; Sovereign AI Rig
        </button>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 flex flex-wrap items-center justify-between gap-2">
        {activeTab === 'business' ? (
          <>
            <p className="text-sm text-fg font-medium">
              Portable markdown context, deterministic GitHub/n8n loops, and MIT credential isolation with zero SaaS bloat.
            </p>
            <Badge variant="online">Open-Source &amp; Free-Tier First</Badge>
          </>
        ) : (
          <>
            <p className="text-sm text-fg font-medium">
              Vendor-neutral November 2026 local compute across 512GB M5 Ultra, 128GB DGX Spark, Ryzen AI Halo mini-PCs, and Tailscale.
            </p>
            <Badge variant="rig">512GB / 128GB Nodes + Mesh</Badge>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map(item => (
          <Card key={item.name} className="p-6 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  {item.category}
                </span>
                <span className="font-mono text-xs text-online font-medium">{item.cost}</span>
              </div>
              <h3 className="text-lg font-bold text-fg">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {item.name} ↗
                  </a>
                ) : (
                  item.name
                )}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{item.summary}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

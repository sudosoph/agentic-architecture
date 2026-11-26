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
    category: 'Portable Repo & Org Rules',
    name: 'AGENTS.md + Department SOP Checklists',
    cost: 'Versioned Markdown',
    summary:
      'Keep operating rules, buyer qualification criteria, and calibration examples in plain files so switching models takes five minutes.',
  },
  {
    category: 'Scheduling & Webhooks',
    name: 'Cal.com',
    cost: 'Free tier or Docker self-hosted',
    summary:
      'Direct calendar routing and webhook triggers for pre-call research dossiers without scheduling ping-pong.',
    href: 'https://cal.com',
  },
  {
    category: 'Workflow & Loop Orchestration',
    name: 'n8n + GitHub Actions',
    cost: 'Open source / included CI',
    summary:
      'Event-driven pipelines with isolated git worktrees, deterministic verification steps, and Draft-First human approval gates.',
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
    name: 'Canonical MDX Monograph + Substack',
    cost: 'Zero platform lock-in',
    summary:
      'Publish search-canonical essays and architecture diagrams on your own domain, paired with weekly synthesis on Substack.',
    href: 'https://agenticarchitectai.substack.com',
  },
  {
    category: 'Search & Telemetry',
    name: 'Google Search Console + PostHog + IndexNow',
    cost: 'Free tiers',
    summary:
      'Instant canonical URL submission on deploy paired with query-level impression tracking and first-party funnel attribution.',
  },
]

const SOVEREIGN_STACK: ToolItem[] = [
  {
    category: '512GB Sparse-MoE Desk Nodes',
    name: 'M5 Ultra Mac Studio (512GB · 1.2 TB/s) or DGX Spark',
    cost: 'Unified-memory desk compute',
    summary:
      'Vendor-neutral desk compute: M5 Ultra leads quiet token decode for 300GB+ sparse MoE weights (MiniMax M3.1 Flash, Nemotron 3 Ultra); NVIDIA DGX Spark (128GB) leads CUDA prompt prefill.',
  },
  {
    category: '128GB x86 Halo Mini-PCs & 96GB Mobile Linux',
    name: 'HP Z2 Mini G1a / EVO-X2 (128GB) & Framework 16 (96GB)',
    cost: 'High memory-per-watt Linux nodes',
    summary:
      'Compact 128GB Ryzen AI Max+ (Strix Halo) mini-PCs for Ubuntu serving at a desk, paired with a repairable 96GB Linux laptop or M5 Max on the road.',
  },
  {
    category: 'Open-Weight Workhorses',
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
    name: 'llama.cpp + MLX + Audited MCP',
    cost: 'Open source (MIT / Apache 2.0)',
    summary:
      'Native CUDA, HIP, and Apple MLX model serving paired with pinned, least-privilege MCP servers.',
    href: 'https://github.com/ggml-org/llama.cpp',
  },
  {
    category: 'Edge Web & Cloud Pipeline',
    name: 'Next.js 16 + Cloudflare Workers',
    cost: 'Edge deployment',
    summary:
      'Static build-time MDX manifests served at the edge via Cloudflare Workers with instant GitHub Actions CI.',
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
        className="inline-flex flex-wrap gap-1.5 rounded-md border border-border bg-surface p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'business'}
          onClick={() => setActiveTab('business')}
          className={`press-scale rounded-md px-4 py-2 text-sm font-medium cursor-pointer ${
            activeTab === 'business' ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
          }`}
        >
          15-Minute Team &amp; Loop Stack
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'sovereign'}
          onClick={() => setActiveTab('sovereign')}
          className={`press-scale rounded-md px-4 py-2 text-sm font-medium cursor-pointer ${
            activeTab === 'sovereign' ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
          }`}
        >
          Private &amp; Sovereign AI Rig
        </button>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4 flex flex-wrap items-center justify-between gap-2">
        {activeTab === 'business' ? (
          <>
            <p className="text-sm text-fg">
              Portable markdown context, deterministic GitHub/n8n loops, and MIT credential
              isolation without SaaS bloat.
            </p>
            <Badge variant="tag">Open-Source &amp; Free-Tier First</Badge>
          </>
        ) : (
          <>
            <p className="text-sm text-fg">
              Vendor-neutral local compute across 512GB M5 Ultra, 128GB DGX Spark, Ryzen AI Halo
              mini-PCs, and Tailscale.
            </p>
            <Badge variant="tag">512GB / 128GB Nodes + Mesh</Badge>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map(item => (
          <Card key={item.name} className="p-6 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-xs text-muted">
                <span className="font-medium text-fg">{item.category}</span>
                <span>{item.cost}</span>
              </div>
              <h3 className="font-serif text-xl font-normal text-fg">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {item.name}
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

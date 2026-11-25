'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ProfileKey = 'saas-collapse' | 'local-workhorse' | 'heavy-rig'

const PROFILES: Record<
  ProfileKey,
  {
    label: string
    subtitle: string
    ossStack: string
    hardwareSpec: string
    typicalSaasMonthly: number
    sovereignMonthly: number
    chapterHref: string
    chapterTitle: string
    freebieHref: string
    freebieLabel: string
  }
> = {
  'saas-collapse': {
    label: '1. Lean Ops & Creator SaaS Collapse',
    subtitle: 'Newsletter, bookings, analytics, uptime, and draft-first inbox/agent webhooks',
    ossStack: 'Caddy 2 + Postgres 16 + Listmonk + Cal.com Docker + Umami + Uptime Kuma + n8n / OpenInstinct',
    hardwareSpec: '4 GB RAM Linux VPS (Hetzner CX22) + daily Restic backup box',
    typicalSaasMonthly: 125,
    sovereignMonthly: 9,
    chapterHref: '/blog/self-hosting-ai-stack-hetzner',
    chapterTitle: 'Chapter 4: Self-Hosting the Full Stack on Hetzner',
    freebieHref: '/downloads/cut-your-ai-bill-84-percent-manual.md',
    freebieLabel: 'Download 84% Cost-Cut Manual ↓',
  },
  'local-workhorse': {
    label: '2. 128GB Team Node + 3-Tier Loop Routing',
    subtitle: 'Worktree CI loops, Qwen 3.8-27B / DeepSeek V4.1 routing, ~150M tokens/mo',
    ossStack: 'llama.cpp (HIP/CUDA/MLX) + Qwen 3.8-27B + Frontier Escalation + Tailscale Serve',
    hardwareSpec: '128 GB M5 Max Studio, HP Z2 Mini G1a / GMKtec EVO-X2 (Ryzen AI Halo), or 96GB Linux Rig',
    typicalSaasMonthly: 890,
    sovereignMonthly: 135,
    chapterHref: '/blog/loop-engineering-production-guide-2026',
    chapterTitle: 'Chapter 16: Loop Engineering & Token Circuit Breakers',
    freebieHref: '/downloads/private-hardware-and-tailscale-rig-guide.md',
    freebieLabel: 'Download Nov 2026 Hardware Guide ↓',
  },
  'heavy-rig': {
    label: '3. 512GB Unified Memory Sparse-MoE Desk Node',
    subtitle: 'Regulated orgs, 500B sparse MoE (MiniMax M3.1 / Nemotron 3) + multi-agent KV caches',
    ossStack: 'MLX / vLLM / llama-server + Tailscale Mesh + Deterministic Pytest/Vitest Verifier Harness',
    hardwareSpec: 'Apple M5 Ultra Mac Studio (512GB @ 1.2 TB/s) or Dual-Node NVIDIA DGX Spark (~$350/mo amortized)',
    typicalSaasMonthly: 2450,
    sovereignMonthly: 350,
    chapterHref: '/blog/512gb-unified-memory-mini-pcs-local-llm-2026',
    chapterTitle: 'Chapter 8: 512GB M5 Ultra vs. DGX Spark vs. Ryzen Halo',
    freebieHref: '/downloads/trusted-mcp-and-eval-checklist.md',
    freebieLabel: 'Download MCP & Loop Verifier Checklist ↓',
  },
}

export function OssHardwareSizer() {
  const [selected, setSelected] = useState<ProfileKey>('saas-collapse')
  const profile = PROFILES[selected]
  const annualSavings = (profile.typicalSaasMonthly - profile.sovereignMonthly) * 12
  const pctSaved = Math.round(
    ((profile.typicalSaasMonthly - profile.sovereignMonthly) / profile.typicalSaasMonthly) * 100,
  )

  return (
    <Card className="p-6 md:p-8 space-y-6 bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Interactive Stack &amp; Hardware Sizer (Nov 2026 Specs)
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-fg mt-1">
            Pick Your Workload: Vendor-Neutral Hardware Physics &amp; Margin Math
          </h2>
        </div>
        <Badge variant="online">Saves {pctSaved}% ({`$${annualSavings.toLocaleString('en-US')}/yr`})</Badge>
      </div>

      <div role="tablist" aria-label="OSS and Hardware Profiles" className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(Object.keys(PROFILES) as ProfileKey[]).map(key => {
          const item = PROFILES[key]
          const active = key === selected
          return (
            <button
              key={key}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setSelected(key)}
              className={`text-left rounded-xl border p-4 transition-all cursor-pointer ${
                active
                  ? 'border-accent bg-white shadow-xs'
                  : 'border-border bg-white/60 hover:border-accent/60'
              }`}
            >
              <p className="text-sm font-bold text-fg">{item.label}</p>
              <p className="text-xs text-muted mt-1 leading-snug">{item.subtitle}</p>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8 rounded-xl border border-border bg-white p-5 space-y-3">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-accent">
              Recommended Open-Source Software Stack
            </p>
            <p className="text-sm font-semibold text-fg mt-0.5">{profile.ossStack}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase text-muted">
              Vendor-Neutral Compute Footprint
            </p>
            <p className="text-sm text-fg mt-0.5">{profile.hardwareSpec}</p>
          </div>
          <div className="pt-2 flex flex-wrap items-center gap-4 border-t border-border">
            <Link href={profile.chapterHref} className="text-xs font-semibold text-accent hover:underline">
              Read {profile.chapterTitle} →
            </Link>
            <a
              href={profile.freebieHref}
              download
              className="text-xs font-semibold text-online hover:underline"
            >
              {profile.freebieLabel}
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-xl border border-blue-200 bg-blue-50/60 p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <p className="font-mono text-[11px] font-semibold uppercase text-accent">
              Monthly Run-Rate Delta
            </p>
            <div className="flex items-baseline justify-between text-xs text-muted">
              <span>Unrouted Cloud / VPC GPU:</span>
              <span className="line-through font-mono">${profile.typicalSaasMonthly}/mo</span>
            </div>
            <div className="flex items-baseline justify-between text-sm font-bold text-fg">
              <span>Sovereign Hybrid Setup:</span>
              <span className="font-mono text-online">${profile.sovereignMonthly}/mo</span>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-blue-200">
            <p className="text-xs text-muted">Estimated 12-Month Savings</p>
            <p data-testid="oss-annual-savings" className="text-2xl font-extrabold text-fg">
              ${annualSavings.toLocaleString('en-US')}/yr
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

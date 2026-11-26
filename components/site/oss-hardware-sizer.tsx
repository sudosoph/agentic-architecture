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
    label: '1. Lean Ops & Subscription Consolidation',
    subtitle: 'Scheduling, analytics, uptime, and draft-first inbox/agent webhooks',
    ossStack:
      'Caddy 2 + Postgres 16 + Cal.com Docker + Umami + Uptime Kuma + n8n + OpenInstinct',
    hardwareSpec: '4 GB RAM Linux VPS + daily encrypted Restic backup',
    typicalSaasMonthly: 125,
    sovereignMonthly: 9,
    chapterHref: '/blog/instinct-ai-vs-tab-review',
    chapterTitle: 'Chapter 4: Auditing Personal & Workspace Agents',
    freebieHref: '/downloads/cut-your-ai-bill-84-percent-manual.md',
    freebieLabel: 'Download 84% Cost-Cut Manual',
  },
  'local-workhorse': {
    label: '2. 128GB Team Node + 3-Tier Loop Routing',
    subtitle: 'Worktree CI loops, Qwen 3.8-27B / DeepSeek V4.1 routing, ~150M tokens/mo',
    ossStack: 'llama.cpp (HIP/CUDA/MLX) + Qwen 3.8-27B + Frontier Escalation + Tailscale Serve',
    hardwareSpec:
      '128 GB M5 Max Studio, HP Z2 Mini G1a / GMKtec EVO-X2 (Ryzen AI Halo), or 96GB Linux Rig',
    typicalSaasMonthly: 890,
    sovereignMonthly: 135,
    chapterHref: '/blog/loop-engineering',
    chapterTitle: 'Chapter 10: Loop Engineering & Token Circuit Breakers',
    freebieHref: '/downloads/private-hardware-and-tailscale-rig-guide.md',
    freebieLabel: 'Download Hardware & Tailscale Guide',
  },
  'heavy-rig': {
    label: '3. 512GB Unified Memory Sparse-MoE Desk Node',
    subtitle: 'Regulated orgs, 500B sparse MoE (MiniMax M3.1 / Nemotron 3) + multi-agent KV caches',
    ossStack:
      'MLX / vLLM / llama-server + Tailscale Mesh + Deterministic Pytest/Vitest Verifier Harness',
    hardwareSpec:
      'Apple M5 Ultra Mac Studio (512GB @ 1.2 TB/s) or Dual-Node NVIDIA DGX Spark (~$350/mo amortized)',
    typicalSaasMonthly: 2450,
    sovereignMonthly: 350,
    chapterHref: '/blog/mac-studio-512gb-vs-dgx-spark',
    chapterTitle: 'Chapter 7: 512GB M5 Ultra vs. DGX Spark vs. Ryzen Halo',
    freebieHref: '/downloads/trusted-mcp-and-eval-checklist.md',
    freebieLabel: 'Download MCP & Loop Verifier Checklist',
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
    <Card className="p-6 md:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-muted">Interactive Stack &amp; Hardware Sizer</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg mt-1">
            Pick your workload: vendor-neutral hardware physics &amp; margin math
          </h2>
        </div>
        <Badge variant="online">
          Saves {pctSaved}% ({`$${annualSavings.toLocaleString('en-US')}/yr`})
        </Badge>
      </div>

      <div
        role="tablist"
        aria-label="OSS and Hardware Profiles"
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
      >
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
              className={`press-scale text-left rounded-md border p-4 cursor-pointer ${
                active ? 'border-fg bg-bg' : 'border-border bg-surface hover:border-fg/40'
              }`}
            >
              <p className="text-sm font-semibold text-fg">{item.label}</p>
              <p className="text-xs text-muted mt-1 leading-snug">{item.subtitle}</p>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8 rounded-md border border-border bg-bg p-5 space-y-3">
          <div>
            <p className="text-xs font-medium text-muted">Recommended Open-Source Software Stack</p>
            <p className="text-sm font-semibold text-fg mt-0.5">{profile.ossStack}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted">Vendor-Neutral Compute Footprint</p>
            <p className="text-sm text-fg mt-0.5">{profile.hardwareSpec}</p>
          </div>
          <div className="pt-2 flex flex-wrap items-center gap-4 border-t border-border">
            <Link
              href={profile.chapterHref}
              className="text-xs font-medium text-fg hover:text-accent underline underline-offset-3 decoration-border"
            >
              Read {profile.chapterTitle}
            </Link>
            <a
              href={profile.freebieHref}
              download
              className="text-xs font-medium text-muted hover:text-fg"
            >
              {profile.freebieLabel}
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-md border border-border bg-bg p-5 flex flex-col justify-between tabular-nums">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted">Monthly Run-Rate Delta</p>
            <div className="flex items-baseline justify-between text-xs text-muted">
              <span>Unrouted Cloud / SaaS:</span>
              <span className="line-through font-mono">${profile.typicalSaasMonthly}/mo</span>
            </div>
            <div className="flex items-baseline justify-between text-sm font-semibold text-fg">
              <span>Sovereign Hybrid Setup:</span>
              <span className="font-mono">${profile.sovereignMonthly}/mo</span>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-border">
            <p className="text-xs text-muted">Estimated 12-Month Savings</p>
            <p data-testid="oss-annual-savings" className="font-serif text-3xl text-fg mt-0.5">
              ${annualSavings.toLocaleString('en-US')}/yr
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

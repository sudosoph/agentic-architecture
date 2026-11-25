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
    label: '1. Solo / Lean Business SaaS Collapse',
    subtitle: 'Newsletter, bookings, analytics, uptime, and webhook automations',
    ossStack: 'Caddy 2 + Postgres 16 + Listmonk + Cal.com Docker + Umami + Uptime Kuma + n8n',
    hardwareSpec: '4 GB RAM Linux VPS (Hetzner CX22) + daily Restic backup box',
    typicalSaasMonthly: 125,
    sovereignMonthly: 9,
    chapterHref: '/blog/self-hosting-ai-stack-hetzner',
    chapterTitle: 'Chapter 4: Self-Hosting the Full Stack on Hetzner',
    freebieHref: '/downloads/cut-your-ai-bill-84-percent-manual.md',
    freebieLabel: 'Download 84% Cost-Cut Manual ↓',
  },
  'local-workhorse': {
    label: '2. Three-Tier Model Routing + 27B Local Node',
    subtitle: 'Coding agents, JSON extraction, and support triage at ~100M tokens/mo',
    ossStack: 'llama.cpp (native HIP/CUDA) or vLLM + 4B Router + 27B/35B Open-Weight + Tailscale',
    hardwareSpec: '24 GB VRAM GPU or 48 GB Unified Memory + zero-port Tailscale Serve',
    typicalSaasMonthly: 680,
    sovereignMonthly: 115,
    chapterHref: '/blog/mixing-and-matching-open-weight-models',
    chapterTitle: 'Chapter 10: Three-Tier Open-Weight Routing',
    freebieHref: '/downloads/private-hardware-and-tailscale-rig-guide.md',
    freebieLabel: 'Download Hardware & Tailscale Guide ↓',
  },
  'heavy-rig': {
    label: '3. 96GB Unified Memory Private Workstation',
    subtitle: 'Regulated data, concurrent 70B / vision / long-context agents, mobile mesh access',
    ossStack: 'Ubuntu + llama-server + Tailscale Mesh + 6-Layer pytest/DeepEval Regression Net',
    hardwareSpec: 'Framework Laptop 16 or 96 GB DDR5 / Strix Halo Desk Node (~$2,100 amortized)',
    typicalSaasMonthly: 1150,
    sovereignMonthly: 165,
    chapterHref: '/blog/96gb-ram-thesis',
    chapterTitle: 'Chapter 8: Why 96GB Unified Memory Changes Everything',
    freebieHref: '/downloads/trusted-mcp-and-eval-checklist.md',
    freebieLabel: 'Download MCP & Eval Checklist ↓',
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
            Interactive Stack &amp; Hardware Sizer
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-fg mt-1">
            Pick Your Workload: Get the Exact OSS Build &amp; Savings Math
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
              Hardware / Compute Footprint
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
              <span>Typical Cloud / SaaS:</span>
              <span className="line-through font-mono">${profile.typicalSaasMonthly}/mo</span>
            </div>
            <div className="flex items-baseline justify-between text-sm font-bold text-fg">
              <span>Sovereign OSS Setup:</span>
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

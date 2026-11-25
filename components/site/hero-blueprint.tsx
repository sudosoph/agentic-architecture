'use client'

import { useState } from 'react'
import Link from 'next/link'

type BlueprintId = 'brand' | 'ops' | 'private'

type Blueprint = {
  id: BlueprintId
  tabLabel: string
  badge: string
  badgeColor: string
  impact: string
  steps: { step: string; title: string; detail: string }[]
  ctaLabel: string
  ctaHref: string
}

const BLUEPRINTS: Blueprint[] = [
  {
    id: 'brand',
    tabLabel: 'Brand & Content',
    badge: 'Most Popular Setup',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    impact: 'Reclaims ~6 hrs/week',
    steps: [
      {
        step: '01',
        title: '5-Min Voice Memo or Rough Notes',
        detail: 'Capture one client insight, workshop story, or business lesson.',
      },
      {
        step: '02',
        title: 'voice.md Brand Brain + Rules',
        detail: 'Applies your exact tone, audience positioning, and zero-fluff guardrails.',
      },
      {
        step: '03',
        title: 'Blog + Substack + LinkedIn + X Pack',
        detail: 'Outputs ready-to-review assets across every channel in 10 minutes.',
      },
    ],
    ctaLabel: 'Grab the Free Brand Brain Kit',
    ctaHref: '/starter-kit',
  },
  {
    id: 'ops',
    tabLabel: 'Small Business Ops',
    badge: '15-Minute Workflow',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    impact: 'Saves $65k/yr hire overhead',
    steps: [
      {
        step: '01',
        title: 'Inbound Lead or Email Arrives',
        detail: 'Triggers automatically from Gmail, forms, or calendar bookings.',
      },
      {
        step: '02',
        title: 'AI Workflow Router + SOP Check',
        detail: 'Enriches company context, scores urgency, and drafts a tailored reply.',
      },
      {
        step: '03',
        title: '1-Click Human Approval & Send',
        detail: 'Nothing leaves without your sign-off; updates your tracker automatically.',
      },
    ],
    ctaLabel: 'Join the Free 60-Min Masterclass',
    ctaHref: '/masterclass',
  },
  {
    id: 'private',
    tabLabel: 'Private AI',
    badge: 'Sovereign Infrastructure',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    impact: '$0/mo per-seat SaaS creep',
    steps: [
      {
        step: '01',
        title: 'Laptop or Phone From Anywhere',
        detail: 'Work from client sites, home, or travel with zero exposed public ports.',
      },
      {
        step: '02',
        title: 'Encrypted Private Mesh Network',
        detail: 'Routes sensitive contracts, financials, and internal docs privately.',
      },
      {
        step: '03',
        title: 'Always-On Private AI Office Node',
        detail: 'Runs private automation and document search on hardware you control.',
      },
    ],
    ctaLabel: 'Explore the Sovereign Stack',
    ctaHref: '/stack',
  },
]

export function HeroBlueprintSwitcher() {
  const [activeId, setActiveId] = useState<BlueprintId>('brand')
  const active = BLUEPRINTS.find(b => b.id === activeId) ?? BLUEPRINTS[0]

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
          Interactive Workflow Blueprints
        </span>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${active.badgeColor}`}
        >
          {active.impact}
        </span>
      </div>

      <div
        role="tablist"
        aria-label="AI workflow blueprints"
        className="grid grid-cols-3 gap-1.5 rounded-xl bg-surface-elevated p-1 mb-5 border border-border"
      >
        {BLUEPRINTS.map(bp => {
          const selected = bp.id === active.id
          return (
            <button
              key={bp.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActiveId(bp.id)}
              className={`rounded-lg px-2.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                selected
                  ? 'bg-white text-accent shadow-xs border border-border'
                  : 'text-muted hover:text-fg'
              }`}
            >
              {bp.tabLabel}
            </button>
          )
        })}
      </div>

      <div className="space-y-3">
        {active.steps.map((item, idx) => (
          <div key={item.step} className="relative">
            <div className="rounded-xl border border-border bg-white p-3.5 flex items-start gap-3.5">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-mono text-xs font-bold text-accent">
                {item.step}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-fg leading-snug">{item.title}</p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">{item.detail}</p>
              </div>
            </div>
            {idx < active.steps.length - 1 && (
              <div aria-hidden="true" className="flex justify-center py-0.5 text-xs text-slate-400">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted">{active.badge}</span>
        <Link
          href={active.ctaHref}
          className="text-xs font-semibold text-accent hover:underline"
        >
          {active.ctaLabel} →
        </Link>
      </div>
    </div>
  )
}

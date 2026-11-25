'use client'

import { useState } from 'react'
import Link from 'next/link'

type BlueprintId = 'sales' | 'ops' | 'private'

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
    id: 'sales',
    tabLabel: 'Sales & Intake',
    badge: 'Zero Dropped Leads',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    impact: 'Reclaims 6 to 10 hrs/week',
    steps: [
      {
        step: '01',
        title: 'New Inquiry, Form or Call Transcript',
        detail: 'Captures inbound client inquiries, referral notes, and discovery call transcripts.',
      },
      {
        step: '02',
        title: 'Qualification, Scope & Proposal Prep',
        detail: 'Scores fit, researches the account, and drafts a clean proposal or intake packet.',
      },
      {
        step: '03',
        title: 'Day-2 & Day-5 Human-Approved Follow-Up',
        detail: 'Queues polite follow-ups for 1-click sign-off so warm deals never slip.',
      },
    ],
    ctaLabel: 'See Courses & Custom Sprints',
    ctaHref: '/courses',
  },
  {
    id: 'ops',
    tabLabel: 'Back-Office Ops',
    badge: 'Replaces $65K Admin Drag',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    impact: 'Saves 10 to 15 hrs/week',
    steps: [
      {
        step: '01',
        title: 'Inbound Lead or Booking Arrives',
        detail: 'Triggers automatically from Gmail, forms, CRM updates, or calendar bookings.',
      },
      {
        step: '02',
        title: 'AI Chief of Staff + Pre-Call Dossier',
        detail: 'Preps executive meeting briefs, extracts commitments, and triages routine email.',
      },
      {
        step: '03',
        title: '10-Second Human Sign-Off',
        detail: 'Nothing sends externally without you or your Ops Lead clicking approve.',
      },
    ],
    ctaLabel: 'Join Free 60-Min Live Build',
    ctaHref: '/masterclass',
  },
  {
    id: 'private',
    tabLabel: 'Private AI',
    badge: 'Enterprise & Fractional Rigor',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    impact: 'HIPAA / SOC2-Ready Control',
    steps: [
      {
        step: '01',
        title: 'Sensitive Contracts, Clinical or Board Docs',
        detail: 'Keeps regulated client records and proprietary data off public training pipelines.',
      },
      {
        step: '02',
        title: 'Encrypted Private Mesh Network',
        detail: 'Enforces scoped permissions, evaluation checks, and cost ceilings.',
      },
      {
        step: '03',
        title: 'Governed Production Operations',
        detail: 'Runs across approved enterprise cloud or private hardware your organization owns.',
      },
    ],
    ctaLabel: 'Explore Fractional CAIO / AI CTO',
    ctaHref: '/fractional-ai-cto',
  },
]

export function HeroBlueprintSwitcher() {
  const [activeId, setActiveId] = useState<BlueprintId>('sales')
  const active = BLUEPRINTS.find(b => b.id === activeId) ?? BLUEPRINTS[0]

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
          Interactive Business Blueprints
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

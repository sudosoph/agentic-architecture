'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type BusinessType = 'service' | 'practice' | 'scaleup'

const BACK_OFFICE_MODELS: Record<
  BusinessType,
  {
    label: string
    humanWork: string[]
    automations: Array<{ name: string; job: string }>
    hoursReclaimed: string
    hireAvoided: string
  }
> = {
  service: {
    label: 'Agencies, Consultants & Founders',
    humanWork: [
      'Founder / Principal: Discovery calls, pricing judgment, high-trust client relationships',
      'Ops Lead or EA: 10-minute daily review of staged drafts and edge cases',
    ],
    automations: [
      {
        name: 'Company Context Drafter',
        job: 'Turns 1 voice memo into newsletter, LinkedIn, and client notes using your voice.md',
      },
      {
        name: 'Pre-Call Dossier Pipeline',
        job: 'Builds prospect brief, bottleneck math, and call agenda on every calendar booking',
      },
      {
        name: 'Draft-First Inbox Triage',
        job: 'Sorts routine inquiries, stages replies in Drafts, and tracks 5-day follow-ups',
      },
      {
        name: 'Proposal & SOP Extractor',
        job: 'Converts call transcripts into scoped proposals and reusable staff checklists',
      },
    ],
    hoursReclaimed: '12 to 16 hrs/week',
    hireAvoided: '$65,000/yr Ops & Content Coordinator',
  },
  practice: {
    label: 'Clinics, Law, Finance & Advisory Firms',
    humanWork: [
      'Partners & Practitioners: High-trust client/patient judgment and final sign-off',
      'Practice Manager: Approves outgoing client summaries and billing flags',
    ],
    automations: [
      {
        name: 'Intake & Triage Screener',
        job: 'Qualifies inquiries, routes urgent requests, and preps structured intake packets',
      },
      {
        name: 'Private Document Summarizer',
        job: 'Extracts timelines and action items inside strict zero-training data boundaries',
      },
      {
        name: 'Follow-Up & Renewal Workflow',
        job: 'Queues check-in notes and renewal reminders for 1-click human approval',
      },
      {
        name: 'Internal SOP Search',
        job: 'Answers staff procedure questions directly from your approved firm handbook',
      },
    ],
    hoursReclaimed: '15 to 22 hrs/week across staff',
    hireAvoided: '$70,000/yr Admin & Intake Specialist',
  },
  scaleup: {
    label: '25 to 250-Person Leadership Teams',
    humanWork: [
      'CEO, COO & Department VPs: Quarterly priorities, hiring, enterprise deals',
      'Chief of Staff / Ops Leads: Owns cross-team rollouts and weekly scorecards',
    ],
    automations: [
      {
        name: 'AI Chief of Staff Loop',
        job: 'Compiles pre-meeting briefs, captures commitments, and tracks cross-team owners',
      },
      {
        name: 'Competitive & Market Signal Digest',
        job: 'Delivers a Monday executive brief on competitor pricing, RFPs, and buyer shifts',
      },
      {
        name: 'Sales Call Prep Pipeline',
        job: 'Generates account briefs and objection sheets from real CRM win/loss notes',
      },
      {
        name: 'SaaS & AI Spend Watchdog',
        job: 'Routes routine tasks to low-cost tiers and flags duplicate software spend',
      },
    ],
    hoursReclaimed: '8+ hrs/week per manager',
    hireAvoided: '$95,000+/yr Junior Ops Analyst',
  },
}

export function AiOrgChartMapper() {
  const [selected, setSelected] = useState<BusinessType>('service')
  const model = BACK_OFFICE_MODELS[selected]

  return (
    <Card className="p-6 md:p-8 bg-surface space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Interactive Back-Office Bottleneck Map
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-fg mt-1">
            Bulletproof Automations on the Repetitive Work, Humans on Judgment
          </h2>
        </div>
        <Badge variant="online">Reclaims {model.hoursReclaimed}</Badge>
      </div>

      <div
        role="tablist"
        aria-label="Business Automation Models"
        className="grid grid-cols-1 md:grid-cols-3 gap-2.5"
      >
        {(Object.keys(BACK_OFFICE_MODELS) as BusinessType[]).map(key => {
          const active = key === selected
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(key)}
              className={`rounded-xl border px-4 py-3 text-left text-xs font-bold transition-all cursor-pointer ${
                active
                  ? 'border-accent bg-white text-accent shadow-xs'
                  : 'border-border bg-white/60 text-fg hover:border-accent/60'
              }`}
            >
              {BACK_OFFICE_MODELS[key].label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 rounded-xl border border-border bg-white p-5 space-y-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
            Stays 100% Human (Trust, Deals &amp; Sign-Off)
          </p>
          <ul className="space-y-2.5 text-sm text-fg leading-relaxed">
            {model.humanWork.map(role => (
              <li key={role} className="flex items-start gap-2">
                <span className="text-online font-bold">•</span>
                <span>{role}</span>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-border text-xs text-muted">
            Removes the bottleneck before hiring a{' '}
            <strong className="text-fg">{model.hireAvoided}</strong>.
          </div>
        </div>

        <div className="lg:col-span-7 rounded-xl border border-blue-200 bg-blue-50/50 p-5 space-y-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Owned AI Back-Office Workflows (No Babysitting, Zero Lock-In)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {model.automations.map(item => (
              <div key={item.name} className="rounded-lg border border-border bg-white p-3 space-y-1">
                <p className="text-xs font-bold text-fg">{item.name}</p>
                <p className="text-xs text-muted leading-snug">{item.job}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

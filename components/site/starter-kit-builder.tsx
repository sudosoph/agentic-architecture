'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const SOP_TEMPLATE = `# Company Operating & Communication Rules

## Who We Serve & Core Bottleneck Solved
- Company / Practice: [One plain-English sentence]
- Ideal Buyer & Deal Size: [Who buys and what triggers urgency]
- Escalation Rule: [What always requires immediate human review]

## Communication Standards
- Direct, specific, and grounded in real numbers and timelines.
- Short paragraphs (2 to 4 sentences max). Lead with the answer or next step.
- Never auto-send external client or financial messages without human approval.

## 3 Approved Real Examples
1. [Paste a real client intake or follow-up email that converted well]
2. [Paste how your team scopes timelines or handles pushback]
3. [Paste a clear internal handoff summary]`

const DOWNLOADS = [
  {
    title: 'Company Operating & Communication Rules',
    meta: 'SOP Template · 10-Min Setup',
    desc: 'Standardizes company tone, escalation rules, and real examples across your team workflows.',
    href: '/downloads/company-operating-rules-template.md',
    cta: 'Download SOP Template ↓',
  },
  {
    title: 'Buyer Qualification & Offer Criteria',
    meta: 'Qualification Sheet · Sales & Intake',
    desc: 'Codifies ideal client criteria, green-flag signals, and scope boundaries for intake triage.',
    href: '/downloads/buyer-qualification-criteria.md',
    cta: 'Download Qualification Sheet ↓',
  },
  {
    title: '20/80 AI Task Readiness Scorecard',
    meta: 'CSV for Google Sheets / Excel',
    desc: 'Pre-built 7-row scoring sheet to rank your team’s weekly chores by ROI and safety.',
    href: '/downloads/20-80-ai-task-audit-scorecard.csv',
    cta: 'Download Scorecard CSV ↓',
  },
  {
    title: 'Pre-Call Lead Dossier Workflow',
    meta: 'Importable n8n JSON Blueprint',
    desc: 'Turns incoming Cal.com bookings into a company brief and human-reviewed Gmail draft.',
    href: '/downloads/pre-call-lead-dossier-n8n.json',
    cta: 'Download n8n JSON ↓',
  },
]

function getReadinessVerdict(score: number) {
  if (score >= 20) {
    return {
      bucket: 'Ship Now',
      badge: 'online' as const,
      advice:
        'High-ROI, low-risk candidate. Wire this workflow first with a quick draft review.',
    }
  }
  if (score >= 14) {
    return {
      bucket: 'Ship with HITL Gate',
      badge: 'accent' as const,
      advice:
        'Great automation target when paired with a 10-second human approval tap in Gmail Drafts or Slack.',
    }
  }
  if (score >= 9) {
    return {
      bucket: 'Decompose Into 2 Steps',
      badge: 'rig' as const,
      advice:
        'Split the risky external action from the internal research/drafting step; automate the research half first.',
    }
  }
  return {
    bucket: 'Keep Human',
    badge: 'tag' as const,
    advice:
      'Too rare or high-stakes for automation right now. Protect your human judgment here.',
  }
}

export function StarterKitBuilder() {
  const [copied, setCopied] = useState(false)
  const [taskName, setTaskName] = useState('Pre-call client research brief & agenda draft')
  const [volume, setVolume] = useState(4)
  const [variability, setVariability] = useState(4)
  const [safety, setSafety] = useState(5)
  const [signal, setSignal] = useState(4)

  const score = volume * 2 + variability + safety + signal
  const verdict = getReadinessVerdict(score)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SOP_TEMPLATE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Downloadable Product Vault */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-fg">
            1. Instant Download Pack (4 Ready-to-Use Files)
          </h2>
          <Badge variant="online">Free · Zero Gate</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DOWNLOADS.map(d => (
            <a
              key={d.href}
              href={d.href}
              download
              className="block group"
            >
              <Card className="p-5 h-full flex flex-col justify-between space-y-3 hover:border-accent transition-colors">
                <div className="space-y-1">
                  <p className="font-mono text-xs font-semibold text-accent">{d.meta}</p>
                  <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{d.desc}</p>
                </div>
                <span className="font-mono text-xs font-semibold text-accent">{d.cta}</span>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Copy-Ready Company Operating Rules */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-fg">
              2. Copy-Paste Company Operating &amp; Communication Rules
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Save in Google Docs, Notion, or your workspace project so every team workflow follows
              the same standards.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg bg-accent text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {copied ? 'Copied SOP Rules ✓' : 'Copy Operating Rules'}
          </button>
        </div>
        <pre className="rounded-xl border border-border bg-surface p-5 text-xs sm:text-sm font-mono text-fg overflow-x-auto leading-relaxed">
          {SOP_TEMPLATE}
        </pre>
      </section>

      {/* Interactive 20/80 Task Readiness Scorer */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Interactive Diagnostic Tool
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-fg">
            3. Score a Workflow With the 20/80 Readiness Calculator
          </h2>
          <p className="text-sm text-muted">
            Type any recurring chore on your calendar and slide the four axes to see whether to ship
            it now, add a draft gate, or split it into two steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label htmlFor="task-audit-name" className="block text-xs font-semibold text-fg mb-1">
                Recurring workflow or chore
              </label>
              <input
                id="task-audit-name"
                type="text"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3.5 py-2 text-sm text-fg focus:outline-none focus:border-accent"
              />
            </div>

            {[
              {
                id: 'axis-volume',
                label: '1. Weekly Volume (counted x2)',
                hint: '1 = quarterly · 3 = weekly · 5 = multiple times daily',
                val: volume,
                set: setVolume,
              },
              {
                id: 'axis-variability',
                label: '2. Bounded Variability',
                hint: '1 = totally unpredictable · 5 = repeatable 3 to 5 patterns',
                val: variability,
                set: setVariability,
              },
              {
                id: 'axis-safety',
                label: '3. Safety / Draft Gate Reversibility',
                hint: '1 = irreversible external risk · 5 = internal draft you review',
                val: safety,
                set: setSafety,
              },
              {
                id: 'axis-signal',
                label: '4. Structured Input Signal',
                hint: '1 = unstructured chat · 5 = calendar booking, form, or sheet',
                val: signal,
                set: setSignal,
              },
            ].map(axis => (
              <div key={axis.id}>
                <div className="flex justify-between text-xs font-semibold text-fg">
                  <label htmlFor={axis.id}>{axis.label}</label>
                  <span className="font-mono text-accent">{axis.val} / 5</span>
                </div>
                <p className="text-[11px] text-muted mb-1">{axis.hint}</p>
                <input
                  id={axis.id}
                  aria-label={axis.label}
                  type="range"
                  min={1}
                  max={5}
                  value={axis.val}
                  onChange={e => axis.set(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <Card className="lg:col-span-5 p-6 bg-white space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Readiness Score
              </span>
              <Badge variant={verdict.badge}>{verdict.bucket}</Badge>
            </div>

            <p data-testid="readiness-score" className="text-4xl font-extrabold text-fg">
              {score} <span className="text-lg font-medium text-muted">/ 25</span>
            </p>

            <p className="font-mono text-xs text-muted">
              Formula: ({volume} x 2) + {variability} + {safety} + {signal} = {score}
            </p>

            <p className="text-sm text-fg leading-relaxed pt-2 border-t border-border">
              {verdict.advice}
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}

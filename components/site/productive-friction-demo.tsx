'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type DomainKey = 'legal' | 'finance' | 'marketing' | 'operations'

interface Scenario {
  key: DomainKey
  tabLabel: string
  adHocPrompt: string
  adHocFailure: string
  interviewQuestions: string[]
  codifiedSkillRule: string
  verifiedOutput: string
  curriculumHref: string
  curriculumLabel: string
}

const SCENARIOS: Scenario[] = [
  {
    key: 'legal',
    tabLabel: 'Legal & Contracts',
    adHocPrompt: '"Review this vendor MSA and tell me if we can sign it."',
    adHocFailure:
      'Sycophantically flags generic governing-law boilerplate while missing an uncapped data-breach indemnity and a silent auto-renewal hike, because it never asked for your liability floor or data tier.',
    interviewQuestions: [
      '1. Are we the Customer or Vendor, and what is the annual contract value ($)?',
      '2. Does the vendor touch Green (public), Amber (internal), or Red (PII/PHI/IP) records?',
      '3. Should redlines enforce our standard 2x fee liability cap or require executive exception?',
    ],
    codifiedSkillRule:
      'skills/contract-redline/SKILL.md · Requires verbatim section quotes + ZDR/open-weight routing on Red-tier contracts.',
    verifiedOutput:
      'Halts Turn-1 guessing, confirms $180K Red-tier DPA scope, verifies verbatim Section 9.2 text in code, and stages 3 exact fallback redlines for counsel sign-off.',
    curriculumHref: '/courses/2-1-vertical-ai-build-vs-buy-framework',
    curriculumLabel: 'Inspect Department Legal & Build-vs-Buy Module →',
  },
  {
    key: 'finance',
    tabLabel: 'Finance & FP&A',
    adHocPrompt: '"Analyze this Q3 vendor CSV and calculate our net SaaS savings."',
    adHocFailure:
      'Computes sums inside raw token generation, silently drops 14 multi-currency rows mid-context, and invents an annualized figure off by $42,000.',
    interviewQuestions: [
      '1. Should multi-year prepaids be amortized monthly or counted on cash-outflow basis?',
      '2. Which SSO inactivity window (30, 60, or 90 days) defines a reclaimable seat?',
      '3. Which column holds the canonical contract renewal notice deadline?',
    ],
    codifiedSkillRule:
      'skills/finops-reconcile/SKILL.md · Zero naked LLM arithmetic; generates sandboxed SQL/Python + deterministic row-count check.',
    verifiedOutput:
      'Interviews controller on recognition rules, executes deterministic Python inside an isolated sandbox, reconciles 100% of rows to the cent, and flags 4 renewals due within 45 days.',
    curriculumHref: '/courses/3-1-production-harnesses-multi-model-routing',
    curriculumLabel: 'Inspect Deterministic Harnesses & Routing Module →',
  },
  {
    key: 'marketing',
    tabLabel: 'Marketing & Growth',
    adHocPrompt: '"Write a thought-leadership post and 3 LinkedIn updates on enterprise AI."',
    adHocFailure:
      'Emits generic median cliches indistinguishable from 10,000 AI content wrappers, eroding executive credibility and triggering platform anti-slop demotion.',
    interviewQuestions: [
      '1. What real buyer misconception did you hear on a live call this week?',
      '2. What specific number, benchmark, or trade-off from your own work disproves it?',
      '3. Which audience segment (COO/VP vs. Technical Builder) owns this decision?',
    ],
    codifiedSkillRule:
      'skills/socratic-brief/SKILL.md · Interviews subject-matter expert for 1 lived scar + 1 primary metric before staging drafts.',
    verifiedOutput:
      'Extracts your sharp point of view in 4 minutes, grounds claims against verified primary sources, and stages human-editable drafts free of robotic filler.',
    curriculumHref: '/courses/1-1-2026-ai-landscape-model-matrix',
    curriculumLabel: 'Inspect Curriculum 01 Foundations & Skills →',
  },
  {
    key: 'operations',
    tabLabel: 'Operations & SOPs',
    adHocPrompt: '"Automate our client onboarding and inbox handoffs."',
    adHocFailure:
      'Builds a brittle happy-path chain that fires unreviewed emails on edge-case VIP accounts because nobody extracted unwritten escalation rules first.',
    interviewQuestions: [
      '1. Walk through the last onboarding that went sideways: what field was missing at intake?',
      '2. Above what deal size or custom SLA must a human approve before kickoff triggers?',
      '3. Which systems hold canonical truth (CRM, Billing, Calendar, Workspace)?',
    ],
    codifiedSkillRule:
      'skills/process-extractor/SKILL.md · Turns a 20-min operator interview into a durable SOP + Level-2 Draft-First webhook spec.',
    verifiedOutput:
      'Codifies tribal exceptions into a versioned rule file, enforces create-draft over auto-send, and cuts onboarding turnaround from 3 days to 25 minutes.',
    curriculumHref: '/courses/1-1-2026-ai-landscape-model-matrix',
    curriculumLabel: 'Explore Productive-Friction Foundations →',
  },
]

export function ProductiveFrictionDemo() {
  const [activeKey, setActiveKey] = useState<DomainKey>('legal')
  const active = SCENARIOS.find(s => s.key === activeKey) ?? SCENARIOS[0]

  return (
    <Card className="p-6 md:p-8 space-y-6 bg-white border-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="online">Signature Methodology · Interactive Comparison</Badge>
            <span className="font-mono text-xs text-muted">
              SKILL.md + MCP Elicitation Over Ad-Hoc Chat
            </span>
          </div>
          <h2 className="text-2xl font-bold text-fg">
            Why Ad-Hoc Prompting Hallucinates vs. Productive-Friction Interview Harnesses
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Lazy 1-line prompts force models to guess the missing 85% of your business context.
            Productive Friction flips the loop: codified skills interview the human first, verify
            constraints, and execute inside deterministic guardrails.
          </p>
        </div>

        <div role="tablist" aria-label="Department scenario" className="flex flex-wrap gap-2">
          {SCENARIOS.map(item => {
            const selected = item.key === active.key
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveKey(item.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  selected
                    ? 'bg-accent text-white'
                    : 'border border-border bg-surface text-fg hover:border-accent'
                }`}
              >
                {item.tabLabel}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Ad-Hoc Failure */}
        <div className="rounded-xl border border-red-200 bg-red-50/40 p-5 space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-red-700">
            ✕ Naive Ad-Hoc Prompting (Zero Friction)
          </p>
          <p className="rounded-lg bg-white border border-red-100 p-3 font-mono text-xs text-fg">
            {active.adHocPrompt}
          </p>
          <div className="space-y-1">
            <p className="text-xs font-bold text-fg">What Breaks in Production:</p>
            <p className="text-xs text-muted leading-relaxed">{active.adHocFailure}</p>
          </div>
        </div>

        {/* Right: Productive Friction */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
            ✓ Productive-Friction Interview Harness
          </p>
          <p className="rounded-lg bg-white border border-blue-100 p-2.5 font-mono text-[11px] text-accent">
            {active.codifiedSkillRule}
          </p>
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-fg">Turn 1: Socratic Intake Questions</p>
            <ul className="space-y-1 text-xs text-fg">
              {active.interviewQuestions.map(q => (
                <li key={q} className="rounded bg-white/80 px-2.5 py-1.5 border border-border">
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-1">
            <p className="text-xs font-bold text-online">Turn 2: Grounded, Verified Execution</p>
            <p className="text-xs text-muted leading-relaxed mt-0.5">{active.verifiedOutput}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border text-xs">
        <span className="text-muted">
          Taught hands-on in Curriculum 01 (Codified Skills) and Corporate Department Labs.
        </span>
        <Link href={active.curriculumHref} className="font-semibold text-accent hover:underline">
          {active.curriculumLabel}
        </Link>
      </div>
    </Card>
  )
}

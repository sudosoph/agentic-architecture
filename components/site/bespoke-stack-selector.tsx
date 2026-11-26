'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type DeptKey = 'marketing' | 'finance' | 'legal' | 'operations' | 'engineering'
type PrivacyKey = 'standard' | 'zdr' | 'sovereign'

interface DeptSpec {
  label: string
  apis: string
  buyVertical: string
  buildInHouse: string
  moduleHref: string
  moduleLabel: string
}

const DEPTS: Record<DeptKey, DeptSpec> = {
  marketing: {
    label: 'Marketing & Growth',
    apis: 'Tavily / Exa (live web grounding), Firecrawl (clean Markdown), PostHog / Umami, Resend',
    buyVertical:
      'Primary search/SERP datasets (Semrush/Ahrefs) and analytics; skip generic one-click AI copy wrappers.',
    buildInHouse:
      'Build In-House: Structured brief-to-omnichannel workflow, buyer-signal radar, and style verification gates.',
    moduleHref: '/courses/2-1-vertical-ai-build-vs-buy-framework',
    moduleLabel: 'Syllabus 02: Department Build-vs-Buy',
  },
  finance: {
    label: 'Finance & FP&A',
    apis: 'Reducto / layout-aware Table OCR, E2B / sandboxed Python & SQL runner, Postgres ledger',
    buyVertical:
      'Corporate cards, receipt matching, and payment rails (Ramp-class spend platforms with vendor benchmarks).',
    buildInHouse:
      'Build In-House: Deterministic 3-way PO/invoice reconciliation, SaaS seat-bloat audits, and variance memos.',
    moduleHref: '/courses/2-1-vertical-ai-build-vs-buy-framework',
    moduleLabel: 'Syllabus 02: Finance & AI FinOps',
  },
  legal: {
    label: 'Legal & Contracts',
    apis: 'Span-verified Document OCR, MCP Elicitation intake gate, immutable hash audit store',
    buyVertical:
      'High-volume multi-jurisdiction suites (Harvey / Legora) when external legal research corpora and ISO 42001 transfer are required.',
    buildInHouse:
      'Build In-House: Company 25-clause NDA/MSA/DPA redline playbook harness with verbatim section-quote checks.',
    moduleHref: '/courses/2-1-vertical-ai-build-vs-buy-framework',
    moduleLabel: 'Syllabus 02: Legal & Compliance Systems',
  },
  operations: {
    label: 'Operations & RevOps',
    apis: 'Recall.ai / Deepgram (meeting capture), Tavily, Cal.com + CRM webhooks, n8n / Workers',
    buyVertical:
      'Enterprise search index (Glean-class) or customer Agent OS (Sierra-class) at multi-hundred employee scale.',
    buildInHouse:
      'Build In-House: Pre-call research dossiers, structured SOP extraction interviews, and Draft-First CRM/inbox loops.',
    moduleHref: '/courses/3-1-production-harnesses-multi-model-routing',
    moduleLabel: 'Syllabus 03: Bespoke API Harnesses',
  },
  engineering: {
    label: 'Product & Engineering',
    apis: 'MCP servers, OpenRouter / multi-model gateways, E2B sandboxes, trace evaluation suites',
    buyVertical:
      'Managed cloud VPC inference gateways (Bedrock / Vertex / Foundry) and CI observability plumbing.',
    buildInHouse:
      'Build In-House: Domain state-machine harnesses, 25-case binary Golden Eval suites, 4-legged OAuth scopes, and 3-tier model routers.',
    moduleHref: '/courses/3-1-production-harnesses-multi-model-routing',
    moduleLabel: 'Syllabus 03: Harnesses & Golden Evals',
  },
}

const PRIVACY_TIERS: Record<
  PrivacyKey,
  { label: string; modelStrategy: string; securityNote: string; curriculumNote: string }
> = {
  standard: {
    label: 'Amber: Enterprise Cloud',
    modelStrategy:
      '80% Fast Subagent Tier + 15% Enterprise Workhorse + 5% Frontier Deep Reasoning on hard escalations.',
    securityNote:
      'Use contractual no-training Enterprise plans (such as unified desktop Cowork + governed MCP extensions) with SSO and scoped folder mounts.',
    curriculumNote: 'Covered in Syllabus 01 (Model Matrix & Workspace Governance).',
  },
  zdr: {
    label: 'Regulated: Zero-Retention / 3P VPC',
    modelStrategy:
      'Direct Zero-Data-Retention (ZDR) APIs or 3P Cloud VPC Gateways with cross-family verification checks.',
    securityNote:
      'Zero vendor abuse-log retention; conversation history and audit hashes stay inside your own VPC and covered BAA/DPA.',
    curriculumNote: 'Covered in Syllabus 02 & 03 (Regulated Harnesses & 4-Legged OAuth).',
  },
  sovereign: {
    label: 'Red: Private Open-Weight Rig',
    modelStrategy:
      'Permissive Open-Weight MoE & Dense Models (Apache 2.0 / MIT tiers) served via vLLM or llama.cpp on private unified-memory nodes.',
    securityNote:
      'Zero external packet egress over encrypted Tailscale Serve; scripts never silently fall back to public APIs.',
    curriculumNote: 'Covered in Syllabus 04 (The Sovereign AI Stack & Rig Setup).',
  },
}

export function BespokeStackSelector() {
  const [dept, setDept] = useState<DeptKey>('operations')
  const [privacy, setPrivacy] = useState<PrivacyKey>('zdr')

  const d = DEPTS[dept]
  const p = PRIVACY_TIERS[privacy]

  return (
    <Card className="p-6 md:p-8 space-y-6">
      <div className="space-y-1.5 max-w-3xl">
        <p className="text-xs font-medium text-muted">Interactive Architecture Matrix</p>
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
          Model routing, API primitives &amp; Vertical AI build-vs-buy selector
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          Select a business function and data boundary to inspect which model tier to route to,
          which APIs compose a clean workflow, and when off-the-shelf vertical AI beats building
          in-house.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 space-y-2">
          <p className="text-xs font-medium text-muted">1. Select Function</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(DEPTS) as DeptKey[]).map(key => (
              <button
                key={key}
                type="button"
                onClick={() => setDept(key)}
                className={`press-scale rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer ${
                  dept === key
                    ? 'bg-fg text-bg'
                    : 'border border-border bg-bg text-fg hover:border-fg/40'
                }`}
              >
                {DEPTS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-2">
          <p className="text-xs font-medium text-muted">2. Select Data Boundary</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PRIVACY_TIERS) as PrivacyKey[]).map(key => (
              <button
                key={key}
                type="button"
                onClick={() => setPrivacy(key)}
                className={`press-scale rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer ${
                  privacy === key
                    ? 'bg-fg text-bg'
                    : 'border border-border bg-bg text-fg hover:border-fg/40'
                }`}
              >
                {PRIVACY_TIERS[key].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-md border border-border bg-bg p-5 space-y-2">
          <p className="text-xs font-semibold text-fg">Model Routing &amp; Boundary</p>
          <p className="text-sm text-fg/90 leading-relaxed">{p.modelStrategy}</p>
          <p className="text-xs text-muted leading-relaxed pt-2 border-t border-border">
            {p.securityNote}
          </p>
        </div>

        <div className="rounded-md border border-border bg-bg p-5 space-y-2">
          <p className="text-xs font-semibold text-fg">Best-of-Breed APIs to Connect</p>
          <p className="text-sm text-fg/90 leading-relaxed">{d.apis}</p>
          <p className="text-xs text-muted leading-relaxed pt-2 border-t border-border">
            {p.curriculumNote}
          </p>
        </div>

        <div className="rounded-md border border-border bg-bg p-5 space-y-2">
          <p className="text-xs font-semibold text-muted">When Off-the-Shelf Vertical AI Wins</p>
          <p className="text-xs text-muted leading-relaxed">{d.buyVertical}</p>
        </div>

        <div className="rounded-md border border-fg/25 bg-surface p-5 space-y-2">
          <p className="text-xs font-semibold text-fg">What to Compose &amp; Own In-House</p>
          <p className="text-xs text-fg leading-relaxed">{d.buildInHouse}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
        <Link
          href={d.moduleHref}
          className="text-xs font-medium text-fg hover:text-accent underline underline-offset-3 decoration-border"
        >
          Read Unlocked Lesson ({d.moduleLabel})
        </Link>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="outline" size="sm" href="/courses#waitlist">
            Join Lab Waitlist
          </Button>
          <Button variant="primary" size="sm" href="/work-with-me">
            Scope Bespoke Build
          </Button>
        </div>
      </div>
    </Card>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
      'Primary search/SERP datasets (Semrush/Ahrefs) and analytics; skip generic $99/mo "1-click AI blog" copy wrappers.',
    buildInHouse:
      'Build In-House: Interview-first SME brief-to-omnichannel harness, buyer-room radar, and anti-slop style verifiers.',
    moduleHref: '/courses/2-1-vertical-ai-build-vs-buy-framework',
    moduleLabel: 'Curriculum 02: Department Build-vs-Buy',
  },
  finance: {
    label: 'Finance & FP&A',
    apis: 'Reducto / layout-aware Table OCR, E2B / sandboxed Python & SQL runner, Postgres ledger',
    buyVertical:
      'Corporate cards, receipt matching, and payment rails (Ramp-class spend platforms with vendor benchmarks).',
    buildInHouse:
      'Build In-House: Deterministic 3-way PO/invoice reconciliation, SaaS SSO seat-bloat audits, and board variance packs.',
    moduleHref: '/courses/2-1-vertical-ai-build-vs-buy-framework',
    moduleLabel: 'Curriculum 02: Finance & AI FinOps',
  },
  legal: {
    label: 'Legal & Contracts',
    apis: 'Span-verified Document OCR, MCP Elicitation intake gate, immutable hash audit store',
    buyVertical:
      'Am Law / high-volume multi-jurisdiction suites (Harvey / Legora) when external legal research corpora + ISO 42001 transfer are required.',
    buildInHouse:
      'Build In-House: Company 25-clause NDA/MSA/DPA redline playbook harness with mandatory verbatim section-quote checks.',
    moduleHref: '/courses/2-1-vertical-ai-build-vs-buy-framework',
    moduleLabel: 'Curriculum 02: Legal & Compliance Systems',
  },
  operations: {
    label: 'Operations & RevOps',
    apis: 'Recall.ai / Deepgram (meeting capture), Tavily, Cal.com + CRM webhooks, n8n / Workers',
    buyVertical:
      'Enterprise search index (Glean-class) or "Build-With" customer Agent OS (Sierra-class) at 500+ employee scale.',
    buildInHouse:
      'Build In-House: Pre-call research dossiers, Socratic SOP extraction interviews, and Level-2 Draft-First CRM/inbox loops.',
    moduleHref: '/courses/3-1-production-harnesses-multi-model-routing',
    moduleLabel: 'Curriculum 03: Bespoke API Harnesses',
  },
  engineering: {
    label: 'Product & Engineering',
    apis: 'Linux Foundation MCP servers, OpenRouter / multi-model gateways, E2B sandboxes, Arize / trace evals',
    buyVertical:
      'Managed cloudVPC inference gateways (Bedrock / Vertex / Foundry) and CI observability plumbing.',
    buildInHouse:
      'Build In-House: Custom domain harnesses, 25-case binary Golden Eval suites, 4-legged OAuth scopes, and 3-tier model routers.',
    moduleHref: '/courses/3-1-production-harnesses-multi-model-routing',
    moduleLabel: 'Curriculum 03: Harnesses & Golden Evals',
  },
}

const PRIVACY_TIERS: Record<
  PrivacyKey,
  { label: string; modelStrategy: string; securityNote: string; curriculumNote: string }
> = {
  standard: {
    label: 'Amber: Enterprise Cloud',
    modelStrategy:
      '80% Fast Subagent Tier ($0.10 to $1/1M) + 15% Enterprise Workhorse + 5% Frontier Deep Reasoning on hard escalations.',
    securityNote:
      'Use contractual no-training Enterprise plans (such as unified desktop Cowork + governed .mcpb extensions) with SSO and scoped folder mounts.',
    curriculumNote: 'Covered in Curriculum 01 (Model Matrix & Workspace Governance).',
  },
  zdr: {
    label: 'Regulated: Zero-Retention / 3P VPC',
    modelStrategy:
      'Direct Zero-Data-Retention (ZDR) APIs or 3P Cloud VPC Gateways (Bedrock / Cloud Agent Platform / Foundry) with cross-family judge checks.',
    securityNote:
      'Zero vendor abuse-log retention; conversation history and audit hashes stay strictly inside your own VPC and covered BAA/DPA.',
    curriculumNote: 'Covered in Curriculum 02 & 03 (Regulated Harnesses & 4-Legged OAuth).',
  },
  sovereign: {
    label: 'Red: Private Open-Weight Rig',
    modelStrategy:
      'Permissive Open-Weight MoE & Dense Models (Apache 2.0 / MIT 27B to 1T MoE tiers) served via vLLM or llama.cpp on 96GB to 512GB nodes.',
    securityNote:
      'Zero external packet egress over encrypted Tailscale Serve; harden OpenCode / local harnesses so scripts never silently fall back to public APIs.',
    curriculumNote: 'Covered in Curriculum 04 (The Sovereign AI Stack & Full Rig Setup).',
  },
}

export function BespokeStackSelector() {
  const [dept, setDept] = useState<DeptKey>('operations')
  const [privacy, setPrivacy] = useState<PrivacyKey>('zdr')

  const d = DEPTS[dept]
  const p = PRIVACY_TIERS[privacy]

  return (
    <Card className="p-6 md:p-8 space-y-6 bg-surface border-border">
      <div className="space-y-1.5 max-w-3xl">
        <Badge variant="rig">Interactive Architecture Matrix · Late-2026 Stack</Badge>
        <h2 className="text-2xl font-bold text-fg">
          Model Routing, Best-of-Breed APIs &amp; Vertical AI Build-vs-Buy Selector
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          Pick a business function and data boundary to inspect which model tier to route to, which
          APIs compose a bespoke system, and what off-the-shelf vertical AI is worth buying versus
          building in-house.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            1. Select Function
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(DEPTS) as DeptKey[]).map(key => (
              <button
                key={key}
                type="button"
                onClick={() => setDept(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  dept === key
                    ? 'bg-accent text-white'
                    : 'border border-border bg-white text-fg hover:border-accent'
                }`}
              >
                {DEPTS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            2. Select Data &amp; Privacy Boundary
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PRIVACY_TIERS) as PrivacyKey[]).map(key => (
              <button
                key={key}
                type="button"
                onClick={() => setPrivacy(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  privacy === key
                    ? 'bg-fg text-white'
                    : 'border border-border bg-white text-fg hover:border-fg'
                }`}
              >
                {PRIVACY_TIERS[key].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-white p-5 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Model Routing &amp; Boundary
          </p>
          <p className="text-sm font-medium text-fg leading-relaxed">{p.modelStrategy}</p>
          <p className="text-xs text-muted leading-relaxed pt-1 border-t border-border">
            {p.securityNote}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
            Best-of-Breed APIs to Connect
          </p>
          <p className="text-sm font-medium text-fg leading-relaxed">{d.apis}</p>
          <p className="text-xs text-muted leading-relaxed pt-1 border-t border-border">
            {p.curriculumNote}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            When Off-the-Shelf Vertical AI Wins
          </p>
          <p className="text-xs text-muted leading-relaxed">{d.buyVertical}</p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            What to Compose &amp; Own In-House
          </p>
          <p className="text-xs text-fg font-medium leading-relaxed">{d.buildInHouse}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
        <Link href={d.moduleHref} className="text-xs font-semibold text-accent hover:underline">
          Read Free Unlocked Lesson ({d.moduleLabel}) →
        </Link>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="outline" size="sm" href="/courses">
            Explore All 4 Curricula
          </Button>
          <Button variant="primary" size="sm" href="/work-with-me">
            Have Us Build This Bespoke Stack →
          </Button>
        </div>
      </div>
    </Card>
  )
}

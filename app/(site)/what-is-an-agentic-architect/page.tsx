import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

const CANONICAL_URL = `${SITE_CONFIG.siteUrl}/what-is-an-agentic-architect`

export const metadata: Metadata = {
  title: 'What Is an Agentic Architect? Role & 4-Layer Stack',
  description:
    'What an Agentic Architect actually designs: the vendor-neutral 4-layer stack, governance rules, role vs. prompt engineering, and runnable workflows by Sophia Stein.',
  alternates: {
    canonical: CANONICAL_URL,
  },
}

const COMPARISON_ROWS = [
  {
    dimension: 'Primary Unit of Work',
    prompting: 'Single manual chat turn in a browser tab',
    automation: 'Rigid if-this-then-that rule over fixed fields',
    agentic: 'Goal-directed workflow combining portable context, scoped tools, and approval gates',
  },
  {
    dimension: 'Context & Organizational Memory',
    prompting: 'Re-typed or pasted manually each morning',
    automation: 'Hardcoded string templates inside one SaaS app',
    agentic: 'Shared SOPs, qualification rules, and compliance guardrails read across workflows',
  },
  {
    dimension: 'Handling Edge Cases',
    prompting: 'Human notices and re-prompts manually',
    automation: 'Pipeline breaks silently or writes bad records',
    agentic: 'Confidence scoring + automatic routing to a human review queue when uncertain',
  },
  {
    dimension: 'Security & Permissions',
    prompting: 'Broad copy-paste of sensitive company text',
    automation: 'Often over-scoped admin API keys',
    agentic: 'Least-privilege tool scopes, read/draft separation, and audit logs',
  },
  {
    dimension: 'Cost & Vendor Lock-In',
    prompting: 'Per-seat subscriptions multiplying across staff',
    automation: 'Per-task SaaS markups that spike at scale',
    agentic: '80% fast low-cost routing, 20% frontier reasoning, portable across cloud or private rigs',
  },
]

const FOUR_LAYERS = [
  {
    layer: 'Layer 01 · Shared SOPs, Business Rules & Context',
    badge: 'Foundation',
    summary:
      'Before choosing models or orchestration frameworks, an Agentic Architect codifies how the organization operates: qualification criteria, escalation boundaries, and plain-text SOP checklists.',
    linkHref: '/starter-kit',
    linkLabel: 'Open the 20/80 Task Readiness Kit',
    secondaryHref: '/blog/ai-back-office',
    secondaryLabel: 'Read the 6-Workflow Back-Office Guide',
  },
  {
    layer: 'Layer 02 · Scoped Tooling & Capability Boundaries',
    badge: 'Execution Hands',
    summary:
      'Agents become useful when connected to calendars, inboxes, docs, and databases, and dangerous when given unrestricted write access. This layer enforces scoped OAuth tokens, MCP tool boundaries, and draft-only defaults for external actions.',
    linkHref: '/blog/mcp-server-audit-2026',
    linkLabel: 'Read the MCP Security Audit',
    secondaryHref: '/blog/the-4-legged-identity',
    secondaryLabel: 'Scoped OAuth for Agents',
  },
  {
    layer: 'Layer 03 · Task Decomposition, Routing & Eval Loops',
    badge: 'Unit Economics',
    summary:
      'Not every bottleneck should be an autonomous loop. An Agentic Architect scores candidate workflows across volume, variability, reversibility, and verification signal, then pairs deterministic steps with evaluation suites.',
    linkHref: '/blog/agent-ready-tasks',
    linkLabel: 'Run the Task Readiness Scorecard',
    secondaryHref: '/blog/eval-harness-catches-regressions',
    secondaryLabel: 'Build a Regression Eval Harness',
  },
  {
    layer: 'Layer 04 · Human-in-the-Loop Governance & Sovereign Data',
    badge: 'Trust & Control',
    summary:
      'Production agentic architecture defines explicit autonomy tiers (L1 Assist through L5 Scoped Autonomous), blast-radius caps, audit trails, and private compute paths when sensitive data cannot leave your perimeter.',
    linkHref: '/blog/the-hitl-standard',
    linkLabel: 'Read the 5-Level HITL Standard',
    secondaryHref: '/stack',
    secondaryLabel: 'Inspect Reference & Private AI Stacks',
  },
]

const COMMON_QUESTIONS = [
  {
    q: 'How is an Agentic Architect different from a Prompt Engineer or traditional Solutions Architect?',
    a: 'A prompt engineer optimizes phrasing inside a single model call; a traditional solutions architect designs deterministic request-response services. An Agentic Architect designs the complete socio-technical loop: portable context files, probabilistic model routing, deterministic tool guardrails, evaluation suites, cost ceilings, and human approval checkpoints.',
  },
  {
    q: 'Does practicing agentic architecture require a large engineering team or cloud vendor lock-in?',
    a: 'No. Lean teams apply the exact same four architectural layers using versioned Markdown or workspace folders, Cal.com webhooks, and open-source n8n workflows at near-zero monthly software cost, while larger technical organizations implement the same boundaries in TypeScript or Python.',
  },
  {
    q: 'When should an Agentic Architect say NO to building an autonomous agent?',
    a: 'Whenever a deterministic script or simple webhook solves the job, or when error consequences are high and objective verification signals do not exist yet. Good architecture decomposes messy processes so AI handles the 80% research, extraction, and drafting work while humans approve external actions.',
  },
  {
    q: 'What skills compound fastest for aspiring Agentic Architects?',
    a: 'Four capabilities stand out: (1) process decomposition (turning vague operational pain into scored inputs and outputs), (2) context engineering (writing crisp schemas and intake rules), (3) security and unit-economics discipline (least-privilege tool scopes and tiered routing), and (4) clear team enablement.',
  },
]

const PILLAR_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': `${CANONICAL_URL}#article`,
      headline: 'What Is an Agentic Architect? The Role, 4-Layer Stack, and Practical Playbook',
      description:
        'A vendor-neutral practitioner guide to what an Agentic Architect designs: portable context, scoped tool boundaries, task readiness scoring, evaluation harnesses, and human-in-the-loop governance.',
      url: CANONICAL_URL,
      mainEntityOfPage: CANONICAL_URL,
      datePublished: '2026-11-18',
      dateModified: '2026-11-18',
      author: {
        '@type': 'Person',
        '@id': `${SITE_CONFIG.siteUrl}/#person`,
        name: SITE_CONFIG.authorName,
        url: `${SITE_CONFIG.siteUrl}/about`,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.siteUrl}/#organization`,
        name: SITE_CONFIG.siteName,
        url: SITE_CONFIG.siteUrl,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: SITE_CONFIG.siteName,
          item: SITE_CONFIG.siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'What Is an Agentic Architect?',
          item: CANONICAL_URL,
        },
      ],
    },
  ],
}

export default function WhatIsAgenticArchitectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PILLAR_JSON_LD).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-16">
        <PageHeader
          meta="Cornerstone Reference Guide · By Sophia Stein"
          title="What Is an Agentic Architect? The Role, 4-Layer Stack, and Practical Playbook"
          description="An Agentic Architect designs reliable systems where AI models reason over structured context, invoke scoped tools, and collaborate with humans under clear cost, privacy, and verification guardrails."
        />

        {/* Definition Briefing */}
        <section className="briefing-box space-y-3">
          <p className="text-xs font-semibold text-fg">Plain-English Definition</p>
          <p className="text-base md:text-lg text-fg leading-relaxed">
            An <strong>Agentic Architect</strong> bridges the gap between raw language models and
            dependable business or engineering operations. Instead of treating AI as a browser chat
            box or locking an organization into one vendor&apos;s proprietary wrapper, an Agentic
            Architect structures <strong>portable context</strong>,{' '}
            <strong>least-privilege tool connections</strong>, <strong>evaluation loops</strong>,
            and <strong>human-in-the-loop approval gates</strong> so workflows run safely every
            week.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="space-y-5">
          <div>
            <p className="text-xs font-medium text-muted">Why the Discipline Emerged</p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
              Ad-hoc prompting vs. rigid automation vs. agentic architecture
            </h2>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-elevated">
                  <th className="p-4 font-semibold text-fg">Architectural Dimension</th>
                  <th className="p-4 font-semibold text-muted">Ad-Hoc Prompting</th>
                  <th className="p-4 font-semibold text-muted">Legacy Rule Automation</th>
                  <th className="p-4 font-semibold text-fg">Agentic Architecture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON_ROWS.map(row => (
                  <tr key={row.dimension} className="align-top">
                    <td className="p-4 font-medium text-fg">{row.dimension}</td>
                    <td className="p-4 text-muted">{row.prompting}</td>
                    <td className="p-4 text-muted">{row.automation}</td>
                    <td className="p-4 text-fg font-medium bg-bg">{row.agentic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The 4-Layer Stack */}
        <section className="space-y-6">
          <div>
            <p className="text-xs font-medium text-muted">Core Reference Blueprint</p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
              The 4-Layer Stack every Agentic Architect designs
            </h2>
            <p className="text-sm md:text-base text-muted mt-2 max-w-3xl leading-relaxed">
              Whether you are automating a lean advisory firm or governing production pipelines
              across an enterprise engineering org, durable systems share four distinct layers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FOUR_LAYERS.map(item => (
              <Card key={item.layer} className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-fg">{item.layer}</span>
                    <Badge variant="tag">{item.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.summary}</p>
                </div>
                <div className="pt-4 border-t border-border flex flex-col gap-1.5">
                  <Link
                    href={item.linkHref}
                    className="text-sm font-medium text-fg hover:text-accent"
                  >
                    {item.linkLabel}
                  </Link>
                  <Link
                    href={item.secondaryHref}
                    className="text-xs text-muted hover:text-fg"
                  >
                    Related essay: {item.secondaryLabel}
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Two Tracks */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 md:p-7 space-y-4">
            <Badge variant="tag">Track 01 · Operators, Founders &amp; Aspiring Architects</Badge>
            <h2 className="font-serif text-2xl font-normal text-fg">
              Hands-on courses inside the Agentic Architect Lab
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              You do not need custom microservices to think like an Agentic Architect. Score your
              recurring bottlenecks with the 20/80 Scorecard, master Claude Cowork folders and
              reusable Skills, and wire human-approved workflows.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primary" size="sm" href="/courses">
                Explore the Lab &amp; Courses
              </Button>
              <Button variant="outline" size="sm" href="/starter-kit">
                Open Free 20/80 Kit
              </Button>
            </div>
          </Card>

          <Card className="p-6 md:p-7 space-y-4">
            <Badge variant="tag">Track 02 · Executives, CTOs &amp; Organizations</Badge>
            <h2 className="font-serif text-2xl font-normal text-fg">
              Fractional CAIO / AI CTO, Governance &amp; Team Labs
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              For multi-department, regulated, and technical organizations, we partner on
              architecture diagnostics, Fractional Chief AI Officer or AI CTO oversight, evaluation
              harnesses, and department workshops.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primary" size="sm" href="/fractional-ai-cto">
                Fractional CAIO &amp; AI CTO
              </Button>
              <Button variant="outline" size="sm" href="/teaching">
                Speaking &amp; Workshops
              </Button>
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <h2 className="font-serif text-3xl font-normal text-fg">
            Common questions about the Agentic Architect role
          </h2>

          <div className="space-y-4">
            {COMMON_QUESTIONS.map(item => (
              <Card key={item.q} className="p-6 space-y-2">
                <h3 className="text-base font-semibold text-fg">{item.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.a}</p>
              </Card>
            ))}
          </div>
        </section>

        <NewsletterSignup source="pillar-what-is-agentic-architect" />
      </div>
    </>
  )
}

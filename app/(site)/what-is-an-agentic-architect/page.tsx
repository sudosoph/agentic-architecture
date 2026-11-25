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
  title: 'What Is an Agentic Architect? 2026 Role & 4-Layer Stack',
  description:
    'What an Agentic Architect actually builds: the 4-layer stack, governance rules, role vs. prompt engineering, and runnable workflows by Sophia Stein.',
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
    dimension: 'Context & Brand Memory',
    prompting: 'Re-typed or pasted manually each morning',
    automation: 'Hardcoded string templates inside one SaaS app',
    agentic: 'Portable files (voice.md, icp.md, SOPs) shared across every workflow and model',
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
    agentic: '90% fast low-cost routing, 10% frontier reasoning, portable across cloud or private rigs',
  },
]

const FOUR_LAYERS = [
  {
    layer: 'Layer 01 · Portable Context & Brand Brain',
    badge: 'Foundation',
    badgeVariant: 'online' as const,
    summary:
      'Before choosing models or orchestration frameworks, an Agentic Architect codifies organizational context into plain, version-controlled files: voice.md (tone and real examples), icp.md (customer problems, tiers, objections), and structured SOP checklists.',
    linkHref: '/starter-kit',
    linkLabel: 'Download the voice.md & icp.md Starter Kit →',
    secondaryHref: '/blog/easy-ai-brand-and-workflow-setup',
    secondaryLabel: 'Read the Afternoon Setup Playbook',
  },
  {
    layer: 'Layer 02 · Scoped Tooling & Capability Boundaries',
    badge: 'Execution Hands',
    badgeVariant: 'tag' as const,
    summary:
      'Agents become useful when connected to calendars, inboxes, docs, and databases, and dangerous when given unrestricted write access. This layer enforces scoped OAuth tokens, Model Context Protocol (MCP) tool boundaries, and draft-only defaults for external actions.',
    linkHref: '/blog/mcp-security-audit',
    linkLabel: 'Read the MCP Security Audit →',
    secondaryHref: '/blog/agent-oauth',
    secondaryLabel: 'Scoped OAuth for Agents',
  },
  {
    layer: 'Layer 03 · Task Decomposition, Routing & Eval Loops',
    badge: 'Unit Economics',
    badgeVariant: 'rig' as const,
    summary:
      'Not every bottleneck should be an autonomous loop. An Agentic Architect scores candidate workflows across volume, variability, error safety, and verification signal, then pairs deterministic steps with lightweight evaluation harnesses so regressions get caught before customers see them.',
    linkHref: '/blog/agent-ready-tasks',
    linkLabel: 'Run the 90-Min Task Readiness Scorecard →',
    secondaryHref: '/blog/eval-harness',
    secondaryLabel: 'Build a Production Eval Harness',
  },
  {
    layer: 'Layer 04 · Human-in-the-Loop Governance & Sovereign Data',
    badge: 'Trust & Control',
    badgeVariant: 'online' as const,
    summary:
      'Production agentic architecture defines explicit autonomy tiers (L1 Assist through L5 Scoped Autonomous), dollar and blast-radius caps, regulatory audit trails, and private compute paths when sensitive client or healthcare data cannot leave your perimeter.',
    linkHref: '/blog/the-hitl-standard',
    linkLabel: 'Read the 5-Level HITL Standard →',
    secondaryHref: '/stack',
    secondaryLabel: 'Inspect Small Business & Private AI Stacks',
  },
]

const COMMON_QUESTIONS = [
  {
    q: 'How is an Agentic Architect different from a Prompt Engineer or traditional Solutions Architect?',
    a: 'A prompt engineer optimizes phrasing inside a single model call; a traditional solutions architect designs deterministic request-response services. An Agentic Architect designs the complete socio-technical loop: portable context files, probabilistic model routing, deterministic tool guardrails, evaluation harnesses, cost ceilings, and human approval checkpoints.',
  },
  {
    q: 'Does practicing agentic architecture require a large engineering team or cloud vendor lock-in?',
    a: 'No. That is one of the biggest myths in current enterprise marketing. Lean 2-to-25 person businesses apply the exact same four architectural layers using Google Docs or Markdown files, Cal.com webhooks, and open-source n8n workflows at near-zero monthly software cost, while larger technical teams implement the same boundaries in TypeScript or Python.',
  },
  {
    q: 'When should an Agentic Architect say NO to building an autonomous agent?',
    a: 'Whenever a deterministic 5-line script or simple webhook solves the job, or when error consequences are high and objective verification signals do not exist yet. Good architecture means decomposing messy processes so AI handles the 80% draft, research, and extraction work while humans approve high-stakes outbound actions.',
  },
  {
    q: 'What skills separate top Agentic Architects in 2026?',
    a: 'Four capabilities compound fastest: (1) process decomposition (turning vague team pain into scored inputs and outputs), (2) context engineering (writing crisp schemas and Brand Brains), (3) security and unit-economics discipline (least-privilege tool scopes and token cost control), and (4) clear executive enablement so non-technical teammates actually adopt what gets built.',
  },
]

const PILLAR_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': `${CANONICAL_URL}#article`,
      headline: 'What Is an Agentic Architect? The 2026 Role, 4-Layer Stack, and Practical Playbook',
      description:
        'A vendor-neutral practitioner guide to what an Agentic Architect designs: portable context, scoped tool boundaries, task readiness scoring, evaluation harnesses, and human-in-the-loop governance.',
      url: CANONICAL_URL,
      mainEntityOfPage: CANONICAL_URL,
      datePublished: '2026-11-25',
      dateModified: '2026-11-25',
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

      <div className="space-y-14">
        <div className="space-y-4">
          <Badge variant="online">Cornerstone Guide · Vendor-Neutral Systems Framework</Badge>
          <PageHeader
            meta="By Sophia Stein · Columbia CS · ex-McKinsey · Updated November 2026"
            title="What Is an Agentic Architect? The Role, 4-Layer Stack, and Practical Playbook"
            description="An Agentic Architect designs reliable systems where AI models reason over structured context, invoke scoped tools, and collaborate with humans under strict cost, privacy, and quality guardrails."
          />
        </div>

        {/* Direct Definition Box (Featured Snippet & Executive Summary) */}
        <section className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6 md:p-8 space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Plain-English Definition
          </p>
          <p className="text-base md:text-lg text-fg font-medium leading-relaxed">
            An <strong>Agentic Architect</strong> bridges the gap between raw language models and
            dependable business or engineering operations. Instead of treating AI as a chat box or
            locking an organization into one vendor&apos;s proprietary cloud, an Agentic Architect
            structures <strong>portable context</strong>, <strong>least-privilege tool connections</strong>,{' '}
            <strong>evaluation loops</strong>, and <strong>human-in-the-loop approval gates</strong>{' '}
            so workflows run safely every week with measurable ROI.
          </p>
          <p className="text-xs text-muted">
            Published on <strong>Agentic Architect</strong> (<code className="font-mono">agenticarchitect.ai</code>) by
            Sophia Stein in Boulder, CO. All writing, frameworks, and advisory here are strictly
            vendor-neutral and shared in a personal capacity; views my own.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Why the Discipline Emerged
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-1">
              Ad-Hoc Prompting vs. Rigid Automation vs. Agentic Architecture
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="p-4 font-semibold text-fg">Architectural Dimension</th>
                  <th className="p-4 font-semibold text-muted">Ad-Hoc Prompting</th>
                  <th className="p-4 font-semibold text-muted">Legacy Rule Automation</th>
                  <th className="p-4 font-semibold text-accent">Agentic Architecture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON_ROWS.map(row => (
                  <tr key={row.dimension} className="align-top">
                    <td className="p-4 font-semibold text-fg">{row.dimension}</td>
                    <td className="p-4 text-muted">{row.prompting}</td>
                    <td className="p-4 text-muted">{row.automation}</td>
                    <td className="p-4 text-fg font-medium bg-blue-50/30">{row.agentic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The 4-Layer Agentic Architecture Stack */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Core Reference Blueprint
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-1">
              The 4-Layer Stack Every Agentic Architect Designs
            </h2>
            <p className="text-sm md:text-base text-muted mt-2 max-w-3xl leading-relaxed">
              Whether you are automating a 5-person service firm or governing production agents
              across an enterprise engineering org, durable systems share four distinct layers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FOUR_LAYERS.map(item => (
              <Card key={item.layer} className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {item.layer}
                    </span>
                    <Badge variant={item.badgeVariant}>{item.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.summary}</p>
                </div>
                <div className="pt-4 border-t border-border flex flex-col gap-1.5">
                  <Link
                    href={item.linkHref}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    {item.linkLabel}
                  </Link>
                  <Link
                    href={item.secondaryHref}
                    className="text-xs text-muted hover:text-fg hover:underline"
                  >
                    Deep dive: {item.secondaryLabel} →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Two Tracks: Business Operators vs Technical Builders */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 md:p-7 space-y-4 bg-surface">
            <Badge variant="online">Track 1 · Founders, COOs &amp; Non-Technical Teams</Badge>
            <h2 className="text-xl font-bold text-fg">
              Business &amp; Operations Agentic Architecture
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              You do not need custom microservices to think like an Agentic Architect. Start by
              writing your 1-page <code className="font-mono text-fg">voice.md</code> Brand Brain,
              scoring your weekly busywork with the 20/80 Scorecard, and wiring three human-approved
              workflows across inbox triage, pre-call research dossiers, and omnichannel publishing.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primary" size="sm" href="/masterclass">
                Join Free 60-Min Masterclass
              </Button>
              <Button variant="outline" size="sm" href="/accelerator">
                Explore 8-Week Accelerator
              </Button>
            </div>
          </Card>

          <Card className="p-6 md:p-7 space-y-4 bg-surface">
            <Badge variant="rig">Track 2 · Engineering Leaders, Enterprises &amp; Universities</Badge>
            <h2 className="text-xl font-bold text-fg">
              Production Systems, Governance &amp; Private Infrastructure
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              For technical and regulated organizations, the priority shifts to evaluation
              harnesses, context-window economics, scoped tool identity, corporate enablement labs,
              and encrypted private compute rigs where proprietary data stays inside your network.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primary" size="sm" href="/work-with-me">
                Book VIP 90-Min Audit
              </Button>
              <Button variant="outline" size="sm" href="/teaching">
                Corporate Workshops &amp; Syllabi
              </Button>
            </div>
          </Card>
        </section>

        {/* Common Questions */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Practitioner FAQ
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-1">
              Common Questions About the Agentic Architect Role
            </h2>
          </div>

          <div className="space-y-4">
            {COMMON_QUESTIONS.map(item => (
              <Card key={item.q} className="p-6 space-y-2">
                <h3 className="text-base font-bold text-fg">{item.q}</h3>
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

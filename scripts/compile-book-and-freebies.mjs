#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

export const SOVEREIGN_STACK_PARTS = [
  {
    part: 'Part I · Portable Context & Human-in-the-Loop Design',
    summary: 'Separating organizational memory (voice.md, icp.md) from models and enforcing explicit autonomy gates.',
    chapters: [
      { num: 1, slug: 'easy-ai-brand-and-workflow-setup', title: 'Portable Context Files Over Prompt Silos' },
      { num: 2, slug: 'agent-ready-tasks', title: 'The 20/80 Task Readiness Scorecard' },
      { num: 3, slug: 'the-hitl-standard', title: 'The 5 Levels of Autonomy and Human Checkpoints' },
    ],
  },
  {
    part: 'Part II · The $9/Month Self-Hosted OSS Business Stack',
    summary: 'Collapsing $120+/mo of creator and consulting SaaS onto a single Linux VPS with Docker, Caddy, and Postgres.',
    chapters: [
      { num: 4, slug: 'self-hosting-ai-stack-hetzner', title: 'Self-Hosting Listmonk, Cal.com, Umami, and Uptime Kuma on Hetzner' },
      { num: 5, slug: 'the-zero-inbox-agent', title: 'Draft-First Inbox Triage Without Handing Over Send Keys' },
      { num: 6, slug: 'automated-competitive-intelligence', title: 'Scheduled OSS Research and Signal Pipelines' },
    ],
  },
  {
    part: 'Part III · Private Hardware, Unified Memory & Mesh Networking',
    summary: 'Choosing sustainable local compute, sizing VRAM vs unified RAM, and reaching your home rig safely from anywhere.',
    chapters: [
      { num: 7, slug: 'framework-laptop-thesis', title: 'The Modular Hardware Thesis (Framework 16 & Repairable Compute)' },
      { num: 8, slug: '96gb-ram-thesis', title: 'Why 96GB of Unified Memory Changes What Runs at Your Desk' },
      { num: 9, slug: 'autonomous-ai-rig-tailscale-guide', title: 'Zero-Exposed-Port Private AI Rigs Over Tailscale' },
    ],
  },
  {
    part: 'Part IV · Three-Tier Model Routing & 84% Margin Protection',
    summary: 'Routing 85% of routine turns to fast open-weight workhorses while reserving frontier APIs for the hardest 10%.',
    chapters: [
      { num: 10, slug: 'mixing-and-matching-open-weight-models', title: 'The Three-Tier Open-Weight Routing Recipe Book' },
      { num: 11, slug: 'three-ways-to-run-open-weight-models', title: 'llama.cpp, vLLM, and Hosted Open-Weight Trade-Offs' },
      { num: 12, slug: 'cost-quality-pareto-coding-agents', title: 'The Cost-Quality Pareto Curve for Coding and Ops Agents' },
    ],
  },
  {
    part: 'Part V · Production Security, MCP Audits & Eval Harnesses',
    summary: 'Preventing shell injection, tool rug-pulls, silent regressions, and context degradation in production.',
    chapters: [
      { num: 13, slug: 'mcp-server-audit-2026', title: 'Auditing MCP Servers: Least Privilege and the Trusted Set' },
      { num: 14, slug: 'the-4-legged-identity', title: 'Scoped OAuth and 4-Legged Agent Delegation' },
      { num: 15, slug: 'eval-harness-catches-regressions', title: 'The 6-Layer Eval Harness That Catches Silent Regressions' },
    ],
  },
]

function sanitizeProse(text) {
  return String(text)
    .replace(/\u2014/g, ': ')
    .replace(/\s+--\s+/g, ': ')
}

function extractMdxBody(raw) {
  const stripped = raw.replace(/^---[\s\S]*?---\s*/, '')
  return sanitizeProse(stripped.trim())
}

export function compileBookAndFreebies(rootDir = process.cwd()) {
  const blogDir = path.join(rootDir, 'content/blog')
  const bookDir = path.join(rootDir, 'content/book')
  const downloadsDir = path.join(rootDir, 'public/downloads')

  fs.mkdirSync(bookDir, { recursive: true })
  fs.mkdirSync(downloadsDir, { recursive: true })

  const manuscriptSections = [
    '# The Sovereign Stack: OSS Workflows, Private Hardware Rigs, and AI Unit Economics',
    '',
    'By Sophia Stein (https://agenticarchitect.ai)',
    '',
    '> Compiled working manuscript generated from field-tested OSS builds, hardware benchmarks, and production architecture playbooks. Convertible to EPUB or PDF with `pandoc content/book/the-sovereign-stack-manuscript.md -o sovereign-stack.epub`.',
    '',
  ]

  let compiledChapters = 0
  for (const section of SOVEREIGN_STACK_PARTS) {
    manuscriptSections.push(`## ${section.part}`, '', section.summary, '')
    for (const ch of section.chapters) {
      const mdxPath = path.join(blogDir, `${ch.slug}.mdx`)
      if (fs.existsSync(mdxPath)) {
        const body = extractMdxBody(fs.readFileSync(mdxPath, 'utf8'))
        manuscriptSections.push(
          `### Chapter ${ch.num}: ${ch.title}`,
          '',
          `*Canonical web edition: https://agenticarchitect.ai/blog/${ch.slug}*`,
          '',
          body,
          '',
          '---',
          '',
        )
        compiledChapters += 1
      }
    }
  }

  const manuscriptText = sanitizeProse(manuscriptSections.join('\n'))
  const manuscriptPath = path.join(bookDir, 'the-sovereign-stack-manuscript.md')
  fs.writeFileSync(manuscriptPath, manuscriptText, 'utf8')

  // Freebie 1: Cut Your AI & SaaS Bill by 84%
  const freebieCost = sanitizeProse(`# Field Manual 01: Cut Your AI & SaaS Bill by 84%

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## 1. The $9/Month OSS Creator & Consultant VPS Stack

Instead of paying $100 to $150/month across separate newsletter, scheduling, analytics, and uptime SaaS subscriptions, a single 4GB Linux VPS (such as a Hetzner CX22) comfortably runs five open-source services behind Caddy 2 automatic TLS:

| Layer | Open-Source Tool | Approximate RAM | SaaS Replaced |
|---|---|---|---|
| Reverse Proxy & Auto-TLS | Caddy 2 | ~30 MB | Manual nginx / paid SSL |
| Newsletter & Campaigns | Listmonk (paired with Resend free SMTP) | ~150 MB | $29 to $79/mo email tiers |
| Scheduling & Bookings | Cal.com (Docker) | ~650 MB | $15/seat/mo scheduling |
| Privacy Web Analytics | Umami v2 | ~200 MB | Paid analytics suites |
| Uptime & Alerts | Uptime Kuma | ~80 MB | $9 to $20/mo monitors |
| Shared Database & Backups | Postgres 16 + daily Restic to Storage Box | ~400 MB | Managed DB markups |

Total RAM footprint sits near 1.5 GB out of 4 GB, leaving ~2.5 GB of headroom.

## 2. The Three-Tier Model Routing Pattern (84% to 97% API Savings)

Never send 100% of routine classification, extraction, or first-pass drafting to your most expensive frontier API:

1. **Tier 0 · Router & Classifier (<50ms):** A compact 1.7B to 4B classifier scores complexity, intent, and PII sensitivity for fractions of a cent.
2. **Tier 1 · Open-Weight Workhorse (80% to 90% of volume):** Mid-sized 27B to 35B open-weight models handle structured JSON extraction, routine code edits, and draft generation via an OpenAI-compatible \`/v1/chat/completions\` endpoint.
3. **Tier 2 · Frontier Escalation (5% to 15% of volume):** Reserved strictly for ambiguous multi-step synthesis, high-stakes customer disputes, or second-attempt schema recovery.

## 3. When NOT to Self-Host or Route

- Under 1M tokens/day or when your team has zero appetite for Linux patching: stay on free-tier cloud connectors first and self-host only once monthly bills cross $75 to $100.
- Full benchmarks and Docker configs: https://agenticarchitect.ai/blog/self-hosting-ai-stack-hetzner and https://agenticarchitect.ai/blog/mixing-and-matching-open-weight-models
`)

  // Freebie 2: Private Hardware & Tailscale Rig Guide
  const freebieHardware = sanitizeProse(`# Field Manual 02: The Private AI Hardware & Tailscale Rig Cheatsheet

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## 1. Quick Memory Sizing Rule of Thumb (Q4_K_M Quantization)

Memory capacity and memory bandwidth dictate what you can actually run locally without painful token-per-second stalls:

| Workload Tier | Target Model Class | Minimum VRAM / Unified RAM | Practical Hardware Pick |
|---|---|---|---|
| Fast Router + 8B-14B Drafts | 4B to 14B Q4_K_M | 12 GB to 16 GB | Existing laptop or entry desktop GPU |
| Daily Coding & 27B-35B Workhorse | 27B Dense or 35B-A3B MoE | 24 GB VRAM or 48 GB Unified | Single 24GB GPU or modular workstation |
| Heavy Multi-Agent + Long Context | 70B Q4 or multi-model concurrent | 64 GB to 96 GB Unified RAM | Framework 16 / Strix Halo / 96GB DDR5 rig |

## 2. Clean Software Stack (Zero Dependency Hell)

1. **Inference Server:** Use \`llama-server\` (from \`llama.cpp\`, including the lightweight native HIP backend on AMD GPUs without multi-gigabyte toolkit bloat) or \`vLLM\` exposing \`http://127.0.0.1:8080/v1\`.
2. **Bind Strictly to Localhost / Tailscale Interface:** Never port-forward \`8080\` or \`11434\` on your home router.
3. **Encrypted Mesh Access Everywhere:** Install Tailscale on both your home rig and your travel laptop or phone. Enable Tailscale Serve so your coding editor, n8n instance, or mobile client reaches \`https://my-rig.tailnet-name.ts.net/v1\` over WireGuard from coffee shops or hotels with zero public ports open.

Full setup walkthroughs:
- https://agenticarchitect.ai/blog/96gb-ram-thesis
- https://agenticarchitect.ai/blog/framework-laptop-thesis
- https://agenticarchitect.ai/blog/autonomous-ai-rig-tailscale-guide
`)

  // Freebie 3: Trusted MCP & 6-Layer Eval Checklist
  const freebieSecurity = sanitizeProse(`# Field Manual 03: Production MCP Security & 6-Layer Eval Checklist

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## Part A: 5-Point Pre-Install Audit Before Connecting Any MCP Server

1. **Check for Archived Reference Repos:** Never connect deprecated \`servers-archived\` packages from stale 2025 tutorials; use actively maintained vendor-official or audited servers.
2. **Grep for Shell Injection:** Reject any local server passing tool arguments into \`child_process.exec\` or \`subprocess.run(..., shell=True)\`.
3. **Pin Exact Versions & Hashes:** Avoid blind \`npx -y latest\` auto-updates in production configs to prevent registry rug-pulls.
4. **Enforce Read / Draft / Write Separation:** Grant read scopes freely, stage external communications as drafts (Gmail Drafts, PRs), and require human approval before destructive writes.
5. **Scoped OAuth 2.1 Delegation:** For remote team servers, verify Resource Indicators (RFC 8707) and per-user ACLs rather than sharing a single admin API key.

## Part B: The 6-Layer Agent Regression Harness

| Layer | What It Catches | Lightweight Starting Move |
|---|---|---|
| 1. Golden Set | Basic prompt or tool-schema regressions | 25 real past failures asserted in pytest |
| 2. Shadow Mode | Prod input edge cases before rollout | Run candidate model silently alongside current flow |
| 3. User Simulation | Multi-turn state bugs | 10 scripted adversarial customer scenarios |
| 4. Calibrated Judge | Tone, policy hedging, hallucinated numbers | Binary 0/1 rubric checked >90% against human labels |
| 5. Trajectory Check | Wrong tool order or runaway loops | Assert \`lookup_order\` ran before \`draft_refund\` |
| 6. Prod Sampling | Post-deploy drift | Async-audit 5% of weekly runs into a review sheet |

Full deep dives:
- https://agenticarchitect.ai/blog/mcp-server-audit-2026
- https://agenticarchitect.ai/blog/eval-harness-catches-regressions
`)

  fs.writeFileSync(path.join(downloadsDir, 'cut-your-ai-bill-84-percent-manual.md'), freebieCost, 'utf8')
  fs.writeFileSync(path.join(downloadsDir, 'private-hardware-and-tailscale-rig-guide.md'), freebieHardware, 'utf8')
  fs.writeFileSync(path.join(downloadsDir, 'trusted-mcp-and-eval-checklist.md'), freebieSecurity, 'utf8')

  return {
    compiledChapters,
    manuscriptWords: manuscriptText.split(/\s+/).length,
    manuscriptPath,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const res = compileBookAndFreebies()
  console.log(
    `Compiled ${res.compiledChapters} chapters (${res.manuscriptWords.toLocaleString('en-US')} words) -> content/book/the-sovereign-stack-manuscript.md + 3 OSS/Hardware freebies in public/downloads/`,
  )
}

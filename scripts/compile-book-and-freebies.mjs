#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

export const SOVEREIGN_STACK_PARTS = [
  {
    part: 'Part I · Portable Context & Human-in-the-Loop Governance',
    summary:
      'Separating organizational operating rules and qualification criteria from models and enforcing explicit autonomy gates.',
    chapters: [
      { num: 1, slug: 'easy-ai-brand-and-workflow-setup', title: 'Plain-English SOP Folders Over Isolated Chat Tabs' },
      { num: 2, slug: 'agent-ready-tasks', title: 'The 20/80 Task Readiness Scorecard' },
      { num: 3, slug: 'the-hitl-standard', title: 'The 5 Levels of Autonomy and Human Sign-Off Gates' },
    ],
  },
  {
    part: 'Part II · Audited Workspace Agents & Signal Pipelines',
    summary:
      'Isolating credentials outside LLM context windows, staging draft-first inbox workflows, and running scheduled intelligence.',
    chapters: [
      { num: 4, slug: 'instinct-ai-vs-tab-review', title: 'Auditing Personal & Browser Agents: OAuth Vaults vs. All-Access Scopes' },
      { num: 5, slug: 'the-zero-inbox-agent', title: 'Draft-First Inbox Triage Without Handing Over Send Keys' },
      { num: 6, slug: 'automated-competitive-intelligence', title: 'Scheduled Research and Market Signal Pipelines' },
    ],
  },
  {
    part: 'Part III · Unified Memory Physics, Open-Weight Routing & Tailscale',
    summary:
      'Vendor-neutral hardware benchmarks across 512GB M5 Ultra, 128GB DGX Spark, Ryzen AI Halo nodes, encrypted meshes, and 3-tier routing.',
    chapters: [
      { num: 7, slug: 'mac-studio-512gb-vs-dgx-spark', title: '512GB Desk Nodes: M5 Ultra vs. DGX Spark vs. Ryzen AI Halo' },
      { num: 8, slug: 'autonomous-ai-rig-tailscale-guide', title: 'Zero-Exposed-Port Private AI Rigs Over Tailscale' },
      { num: 9, slug: 'gemini-4-neon-vs-deepseek-v4', title: 'Three-Tier Frontier & Open-Weight Model Routing' },
    ],
  },
  {
    part: 'Part IV · Loop Engineering, MCP Security & Regression Suites',
    summary:
      'Isolated git worktrees, deterministic schema/test verifiers, token circuit breakers, and least-privilege MCP delegation.',
    chapters: [
      { num: 10, slug: 'loop-engineering', title: 'Loop Engineering in Production: Worktrees, Deterministic Verifiers & Cost Ceilings' },
      { num: 11, slug: 'mcp-server-audit-2026', title: 'Auditing MCP Servers: Least Privilege and the Trusted Set' },
      { num: 12, slug: 'eval-harness-catches-regressions', title: 'The 6-Layer Regression Eval Harness' },
    ],
  },
]

function sanitizeProse(text) {
  return String(text)
    .replace(/\u2014/g, ': ')
    .replace(/\s+--\s+/g, ': ')
}

function extractMdxBody(raw) {
  const stripped = raw
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
  return sanitizeProse(stripped.trim())
}

export function compileBookAndFreebies(rootDir = process.cwd()) {
  const blogDir = path.join(rootDir, 'content/blog')
  const bookDir = path.join(rootDir, 'content/book')
  const downloadsDir = path.join(rootDir, 'public/downloads')

  fs.mkdirSync(bookDir, { recursive: true })
  fs.mkdirSync(downloadsDir, { recursive: true })

  const manuscriptSections = [
    '# The Sovereign Stack: Loop Engineering, Private Unified-Memory Nodes, and AI Unit Economics',
    '',
    'By Sophia Stein (https://agenticarchitect.ai)',
    '',
    '> Working technical monograph compiled from vendor-neutral hardware benchmarks, tiered open-weight routing recipes, and deterministic loop-engineering playbooks.',
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

  const freebieCost = sanitizeProse(`# Field Manual 01: Cut Your AI & SaaS Bill by 84%

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## 1. Consolidating Overlapping SaaS Onto Clean Open-Source Primitives

Instead of paying recurring per-seat markups across disconnected scheduling, workflow, analytics, and monitoring wrappers, a single 4GB Linux VPS runs open-source services behind Caddy 2 automatic TLS:

| Layer | Open-Source Tool | Approximate RAM | Purpose |
|---|---|---|---|
| Reverse Proxy & Auto-TLS | Caddy 2 | ~30 MB | Automatic HTTPS & routing |
| Workflow Orchestration | n8n (Docker) | ~320 MB | Event webhooks & draft queues |
| Scheduling & Bookings | Cal.com (Docker) | ~650 MB | Direct calendar webhooks |
| Privacy Web Analytics | Umami v2 / PostHog Proxy | ~200 MB | First-party funnel telemetry |
| Uptime & Alerts | Uptime Kuma | ~80 MB | Health checks & alerts |
| Shared Database & Backups | Postgres 16 + daily Restic | ~400 MB | Encrypted state & off-site backups |

## 2. Three-Tier Model Routing Cascade (70% to 84% API Savings)

Never route 100% of background classification, schema extraction, or test scaffolding turns to your priciest reasoning model:

1. **Tier 0 · Fast Router / Subagent (~80% of volume):** Route triage, JSON extraction, and file scans to fast flash tiers, \`DeepSeek V4.1 Flash\` (MIT), or local \`Qwen 3.8-27B\` (Apache 2.0, \`17 GB\` @ 4-bit).
2. **Tier 1 · Loop Orchestrator (~15% of volume):** Use balanced workhorse models for multi-step coding and multimodal synthesis with capped output tokens.
3. **Tier 2 · Deliberate Escalation (~5% of volume):** Reserve deep reasoning models strictly for ambiguous cross-repository deadlocks and final synthesis paired with written SOP guardrails.

Full notes:
- https://agenticarchitect.ai/blog/gemini-4-neon-vs-deepseek-v4
- https://agenticarchitect.ai/blog/mixing-and-matching-open-weight-models
`)

  const freebieHardware = sanitizeProse(`# Field Manual 02: 512GB & 128GB Private AI Hardware + Tailscale Cheatsheet

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## 1. Vendor-Neutral Memory Bandwidth & Capacity Matrix

Autoregressive token decode is governed by **memory bandwidth divided by active parameters per token**. Do not buy 512 GB for giant dense models; buy 512 GB for **sparse MoE weights + large KV caches**:

| Node Class | Memory & Bandwidth | Best Model Fit | Hardware Options |
|---|---|---|---|
| **Entry Local / IDE** | 16 GB to 32 GB | Local edit models + \`8B-14B\` Q4 | Existing laptop or desktop GPU |
| **64GB-128GB Team Workhorse** | 64 GB to 128 GB (\`256-410+ GB/s\`) | \`Qwen 3.8-27B\` (Apache 2.0) + vision + embeddings | M5 Max Studio, HP Z2 Mini G1a, GMKtec EVO-X2, or 96GB Linux rig |
| **128GB CUDA Prefill Node** | 128 GB (\`273 GB/s\`) | Heavy CUDA prompt prefill (~1,700 tok/s), TensorRT | NVIDIA DGX Spark |
| **512GB Sparse-MoE Desk Node** | **512 GB (\`1.2 TB/s\`)** + TB5 RDMA | \`MiniMax M3.1 Flash\` (501B/23B active) & \`Nemotron 3 Ultra\` | Apple M5 Ultra Mac Studio (512 GB) |

## 2. Zero-Port Tailscale Mesh Standard

1. Serve models via \`llama-server\` (CUDA / HIP / Vulkan), Apple \`MLX\`, or \`vLLM\` bound strictly to \`127.0.0.1:8080\`.
2. Never port-forward \`8080\` or \`11434\` on your router.
3. Run \`tailscale serve --bg 8080\` so authenticated team devices reach \`https://desk-node.tailnet.ts.net/v1\` over WireGuard.

Full teardowns:
- https://agenticarchitect.ai/blog/mac-studio-512gb-vs-dgx-spark
- https://agenticarchitect.ai/blog/autonomous-ai-rig-tailscale-guide
`)

  const freebieSecurity = sanitizeProse(`# Field Manual 03: Loop Engineering Verifiers, Credential Vaults & MCP Audit

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## Part A: Closed-Loop Engineering Gate (Never Let a Model Grade Its Own Homework)

1. **Isolated Workspace:** Run every autonomous task inside a disposable \`git worktree\` or per-run microVM.
2. **Independent Deterministic Verifier:** Gate merges on \`tsc --noEmit\`, \`vitest\`/\`pytest\`, JSON Schema validation, and link checks rather than self-critique prompts.
3. **Hard Circuit Breakers:** Cap every unattended loop at \`maxIterations = 3\` and an explicit per-ticket token ceiling, escalating diagnostics to a human when tripped.

## Part B: Personal Agent & MCP Credential Hygiene

1. **Reject All-or-Nothing Workspace Scopes:** Keep consumer texting agents that demand full read/write inbox and Drive access strictly off organizational accounts.
2. **Isolate Secrets Outside LLM Context:** Use MIT \`OpenInstinct\` + \`OpenClaw\` inside per-user microVMs so OAuth tokens stay outside the prompt window.
3. **Pin & Audit MCP Servers:** Reject deprecated packages, audit against arbitrary shell execution, and pin exact package hashes.

Full deep dives:
- https://agenticarchitect.ai/blog/loop-engineering
- https://agenticarchitect.ai/blog/instinct-ai-vs-tab-review
- https://agenticarchitect.ai/blog/mcp-server-audit-2026
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

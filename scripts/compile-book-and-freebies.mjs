#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

export const SOVEREIGN_STACK_PARTS = [
  {
    part: 'Part I · Portable Context & Human-in-the-Loop Design',
    summary: 'Separating organizational memory (AGENTS.md, voice.md, icp.md) from models and enforcing explicit autonomy gates.',
    chapters: [
      { num: 1, slug: 'easy-ai-brand-and-workflow-setup', title: 'Portable Context Files Over Prompt Silos' },
      { num: 2, slug: 'agent-ready-tasks', title: 'The 20/80 Task Readiness Scorecard' },
      { num: 3, slug: 'the-hitl-standard', title: 'The 5 Levels of Autonomy and Human Checkpoints' },
    ],
  },
  {
    part: 'Part II · Self-Hosted OSS Business Stack & Sovereign Personal Agents',
    summary: 'Collapsing $125+/mo of SaaS onto a $9/mo Linux VPS and auditing personal texting/browser agents (OpenInstinct vs Instinct & Tab).',
    chapters: [
      { num: 4, slug: 'self-hosting-ai-stack-hetzner', title: 'Self-Hosting Listmonk, Cal.com, Umami, and Uptime Kuma on Hetzner' },
      { num: 5, slug: 'instinct-ai-vs-tab-review', title: 'Personal Texting & Browser Agents Audited: Instinct, Tab, and MIT OpenInstinct' },
      { num: 6, slug: 'the-zero-inbox-agent', title: 'Draft-First Inbox Triage Without Handing Over Send Keys' },
      { num: 7, slug: 'automated-competitive-intelligence', title: 'Scheduled OSS Research and Signal Pipelines' },
    ],
  },
  {
    part: 'Part III · 512GB Desk Nodes, Unified Memory Physics & Mesh Networking',
    summary: 'Vendor-neutral hardware benchmarks across 512GB M5 Ultra Mac Studio (1.2 TB/s), 128GB DGX Spark, Ryzen AI Halo mini-PCs, and Tailscale.',
    chapters: [
      { num: 8, slug: 'mac-studio-512gb-vs-dgx-spark', title: '512GB Mini Computers & Desk Nodes: M5 Ultra vs. DGX Spark vs. Ryzen AI Halo' },
      { num: 9, slug: '96gb-ram-thesis', title: '96GB Unified Memory on a Travel Rig: GART & Sustained Token Math' },
      { num: 10, slug: 'framework-laptop-thesis', title: 'Repairable Mobile Linux Compute vs. Stationary Desk Nodes' },
      { num: 11, slug: 'autonomous-ai-rig-tailscale-guide', title: 'Zero-Exposed-Port Private AI Rigs Over Tailscale' },
    ],
  },
  {
    part: 'Part IV · Late-2026 Model Routing (Neon, Carbon, DeepSeek V4.1, Kimi K3.1, Qwen 3.8)',
    summary: 'Routing 80% of routine turns to fast open-weight or subagent tiers while reserving deliberate frontier planners for the hardest 5%.',
    chapters: [
      { num: 12, slug: 'gemini-4-neon-vs-deepseek-v4', title: 'Gemini 4 Neon & Carbon vs. DeepSeek V4.1, Kimi K3.1 Pro & Qwen 3.8' },
      { num: 13, slug: 'mixing-and-matching-open-weight-models', title: 'The Three-Tier Open-Weight Routing Recipe Book' },
      { num: 14, slug: 'three-ways-to-run-open-weight-models', title: 'llama.cpp, MLX, vLLM, and Hosted Open-Weight Trade-Offs' },
      { num: 15, slug: 'cost-quality-pareto-coding-agents', title: 'The Cost-Quality Pareto Curve for Coding and Ops Agents' },
    ],
  },
  {
    part: 'Part V · Loop Engineering, MCP Security & Deterministic Verifiers',
    summary: 'Isolated git worktrees, deterministic test/schema verifiers, token circuit breakers, and least-privilege MCP delegation.',
    chapters: [
      { num: 16, slug: 'loop-engineering', title: 'Loop Engineering in Production: Worktrees, Deterministic Verifiers & Cost Ceilings' },
      { num: 17, slug: 'mcp-server-audit-2026', title: 'Auditing MCP Servers: Least Privilege and the Trusted Set' },
      { num: 18, slug: 'eval-harness-catches-regressions', title: 'The 6-Layer Eval Harness & Scoped OAuth Delegation' },
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
    '# The Sovereign Stack: Loop Engineering, 512GB Desk Nodes, and AI Unit Economics',
    '',
    'By Sophia Stein (https://agenticarchitect.ai)',
    '',
    '> Compiled November 2026 working manuscript generated from field-tested OSS builds, vendor-neutral hardware benchmarks, and deterministic loop-engineering playbooks. Convertible to EPUB or PDF with `pandoc content/book/the-sovereign-stack-manuscript.md -o sovereign-stack.epub`.',
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
  const freebieCost = sanitizeProse(`# Field Manual 01: Cut Your AI & SaaS Bill by 84% (Late-2026 Edition)

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## 1. The $9/Month OSS Business & Agent VPS Stack

Instead of paying $125+/month across fragmented newsletter, scheduling, analytics, and uptime SaaS subscriptions, a single 4GB Linux VPS (Hetzner CX22) runs five open-source services behind Caddy 2 automatic TLS:

| Layer | Open-Source Tool | Approximate RAM | SaaS Replaced |
|---|---|---|---|
| Reverse Proxy & Auto-TLS | Caddy 2 | ~30 MB | Manual nginx / paid SSL |
| Newsletter & Campaigns | Listmonk (paired with Resend free SMTP) | ~150 MB | $29 to $79/mo email tiers |
| Scheduling & Bookings | Cal.com (Docker) | ~650 MB | $15/seat/mo scheduling |
| Privacy Web Analytics | Umami v2 | ~200 MB | Paid analytics suites |
| Uptime & Alerts | Uptime Kuma | ~80 MB | $9 to $20/mo monitors |
| Shared Database & Backups | Postgres 16 + daily Restic to Storage Box | ~400 MB | Managed DB markups |

## 2. The November 2026 Three-Tier Model Routing Cascade (70% to 84% API Savings)

Never route 100% of background classification, test scaffolding, or extraction turns to your priciest deliberate model:

1. **Tier 0 · Fast Router / Subagent (<100ms, ~80% of volume):** Route triage, JSON extraction, and file scans to \`Gemini 4 Hydrogen\` (\`$1.50/$7.50\`), \`DeepSeek V4.1 Flash-1017\` (MIT), or local \`Qwen 3.8-27B\` (Apache 2.0, \`17 GB\` @ 4-bit).
2. **Tier 1 · Loop Orchestrator (~15% of volume):** Use \`Gemini 4 Neon\` (\`$3/$15\`, \`$0.15\` cached, ~100 tok/s) or \`Kimi K3.1 Pro\` (\`$2/$10\`, capped max output tokens) for multi-step coding and multimodal synthesis.
3. **Tier 2 · Deliberate Escalation (~5% of volume):** Reserve \`Gemini 4 Carbon\` or \`Neon\` \`xhigh\` strictly for ambiguous cross-repo deadlocks and final executive prose paired with \`voice.md\`.

Full benchmarks:
- https://agenticarchitect.ai/blog/self-hosting-ai-stack-hetzner
- https://agenticarchitect.ai/blog/gemini-4-neon-vs-deepseek-v4
`)

  // Freebie 2: Private Hardware & Tailscale Rig Guide
  const freebieHardware = sanitizeProse(`# Field Manual 02: 512GB & 128GB Private AI Hardware + Tailscale Cheatsheet (Nov 2026)

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## 1. Vendor-Neutral Memory Bandwidth & Capacity Matrix

Autoregressive token decode is governed by **memory bandwidth divided by active parameters per token**. Do not buy 512 GB for giant dense models (3 to 4 tok/s); buy 512 GB for **sparse MoE weights + huge KV caches**:

| Node Class | Memory & Bandwidth | Best Model Fit | Hardware Options |
|---|---|---|---|
| **Entry Local / IDE Tab** | 16 GB to 32 GB | Continue \`Instinct\` / \`Sweep 1.5B\` + \`8B–14B\` Q4 | Existing developer laptop or desktop GPU |
| **64GB–128GB Team Workhorse** | 64 GB to 128 GB (\`256–410+ GB/s\`) | \`Qwen 3.8-27B\` (Apache 2.0) + vision + embeddings | M5 Max Studio, M5 Pro Mac mini, HP Z2 Mini G1a, GMKtec EVO-X2, or 96GB Linux laptop |
| **128GB CUDA Prefill Node** | 128 GB (\`273 GB/s\`) | Heavy CUDA prompt prefill (~1,700 tok/s), TensorRT, ConnectX pair | NVIDIA DGX Spark (\`$6,950\` / \`$4,999\` 64GB OEM) |
| **512GB Sparse-MoE Desk Cluster** | **512 GB (\`1.2 TB/s\`)** + TB5 RDMA | \`MiniMax M3.1 Flash\` (501B/23B active, ~301 GB) & \`Nemotron 3 Ultra\` (550B/55B active) | Apple M5 Ultra Mac Studio (\`$5,499\` base -> ~\`$8,500+\` @ 512 GB) |

## 2. Zero-Port Tailscale Mesh Standard

1. Serve models via \`llama-server\` (CUDA / native AMD HIP / Vulkan), Apple \`MLX\`, or \`vLLM\` bound strictly to \`127.0.0.1:8080\`.
2. Never port-forward \`8080\` or \`11434\` on your router.
3. Run \`tailscale serve --bg 8080\` so authenticated laptops, phones, and CI runners reach \`https://desk-node.tailnet.ts.net/v1\` over WireGuard.

Full teardowns:
- https://agenticarchitect.ai/blog/mac-studio-512gb-vs-dgx-spark
- https://agenticarchitect.ai/blog/autonomous-ai-rig-tailscale-guide
`)

  // Freebie 3: Trusted MCP, OpenInstinct & Loop Engineering Verifier Checklist
  const freebieSecurity = sanitizeProse(`# Field Manual 03: Loop Engineering Verifiers, Personal Agent Vaults & MCP Audit

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## Part A: Closed-Loop Engineering Gate (Never Let a Model Grade Its Own Homework)

1. **Isolated Workspace:** Run every autonomous task inside a disposable \`git worktree\` or per-run microVM.
2. **Independent Deterministic Verifier:** Gate merges on \`tsc --noEmit\`, \`vitest\`/\`pytest\`, JSON Schema validation, and link/trajectory checks rather than self-critique prompts.
3. **Hard Circuit Breakers:** Cap every unattended loop at \`maxIterations = 3\` and an explicit dollar ceiling (e.g., \`$1.50/ticket\`), escalating diagnostics to a human when tripped.

## Part B: Personal Agent & MCP Credential Hygiene

1. **Reject All-or-Nothing Workspace Scopes:** Keep consumer texting agents that demand full read/write Gmail & Drive access (or default to training on user data, like consumer \`Instinct\`) strictly off corporate accounts.
2. **Isolate Secrets Outside LLM Context:** For self-hosted personal/browser automation, use MIT \`OpenInstinct\` (\`Merit-Systems/OpenInstinct\` or per-user microVMs) + \`OpenClaw\` so OAuth tokens and payment vaults stay outside the prompt window.
3. **Pin & Audit MCP Servers:** Reject deprecated \`servers-archived\` packages, grep against \`shell=True\` / \`child_process.exec\`, and pin exact package hashes.

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

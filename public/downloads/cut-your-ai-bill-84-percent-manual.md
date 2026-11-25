# Field Manual 01: Cut Your AI & SaaS Bill by 84% (Late-2026 Edition)

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

1. **Tier 0 · Fast Router / Subagent (<100ms, ~80% of volume):** Route triage, JSON extraction, and file scans to `Gemini 4 Hydrogen` (`$1.50/$7.50`), `DeepSeek V4.1 Flash-1017` (MIT), or local `Qwen 3.8-27B` (Apache 2.0, `17 GB` @ 4-bit).
2. **Tier 1 · Loop Orchestrator (~15% of volume):** Use `Gemini 4 Neon` (`$3/$15`, `$0.15` cached, ~100 tok/s) or `Kimi K3.1 Pro` (`$2/$10`, capped max output tokens) for multi-step coding and multimodal synthesis.
3. **Tier 2 · Deliberate Escalation (~5% of volume):** Reserve `Gemini 4 Carbon` or `Neon` `xhigh` strictly for ambiguous cross-repo deadlocks and final executive prose paired with `voice.md`.

Full benchmarks:
- https://agenticarchitect.ai/blog/self-hosting-ai-stack-hetzner
- https://agenticarchitect.ai/blog/gemini-4-neon-vs-deepseek-v4

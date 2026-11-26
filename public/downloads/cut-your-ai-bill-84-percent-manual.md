# Field Manual 01: Cut Your AI & SaaS Bill by 84%

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

1. **Tier 0 · Fast Router / Subagent (~80% of volume):** Route triage, JSON extraction, and file scans to fast flash tiers, `DeepSeek V4.1 Flash` (MIT), or local `Qwen 3.8-27B` (Apache 2.0, `17 GB` @ 4-bit).
2. **Tier 1 · Loop Orchestrator (~15% of volume):** Use balanced workhorse models for multi-step coding and multimodal synthesis with capped output tokens.
3. **Tier 2 · Deliberate Escalation (~5% of volume):** Reserve deep reasoning models strictly for ambiguous cross-repository deadlocks and final synthesis paired with written SOP guardrails.

Full notes:
- https://agenticarchitect.ai/blog/gemini-4-neon-vs-deepseek-v4
- https://agenticarchitect.ai/blog/mixing-and-matching-open-weight-models

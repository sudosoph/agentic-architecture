# Field Manual 01: Cut Your AI & SaaS Bill by 84%

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
2. **Tier 1 · Open-Weight Workhorse (80% to 90% of volume):** Mid-sized 27B to 35B open-weight models handle structured JSON extraction, routine code edits, and draft generation via an OpenAI-compatible `/v1/chat/completions` endpoint.
3. **Tier 2 · Frontier Escalation (5% to 15% of volume):** Reserved strictly for ambiguous multi-step synthesis, high-stakes customer disputes, or second-attempt schema recovery.

## 3. When NOT to Self-Host or Route

- Under 1M tokens/day or when your team has zero appetite for Linux patching: stay on free-tier cloud connectors first and self-host only once monthly bills cross $75 to $100.
- Full benchmarks and Docker configs: https://agenticarchitect.ai/blog/self-hosting-ai-stack-hetzner and https://agenticarchitect.ai/blog/mixing-and-matching-open-weight-models

# Article Dossier · Cost-Quality Pareto for Coding Agents (May 2026)

Status: research dossier (not yet written)
Last updated: 2026-05-07
Target: ~2,500 word HN/Reddit-tier deep dive + chart

---

## Hook + TL;DR

**The chart that shows: paying $5 per task no longer gets you the frontier — and paying nothing comes within 11 points of the leader.**

In May 2026, the cost-quality landscape for coding agents has bifurcated. Three things broke at once:
1. Anthropic shipped Mythos Preview at 93.9% SWE-bench Verified but kept Opus 4.7 the practical ceiling at 87.6%
2. DeepSeek V4-Pro and Kimi K2.6 hit ~80% Verified at 7-15x lower API cost
3. Qwen3.6-27B Dense made 77.2% Verified runnable on a Framework laptop

The Pareto frontier today is a step-function with five inflection points, not a smooth curve. The middle of the chart — proprietary models priced like frontier-tier but scoring Sonnet-tier — is dead weight.

**One-line takeaway:** If you're not on Opus 4.7, Kimi K2.6, DeepSeek V4-Pro, or local Qwen3.6-27B, you're paying for someone else's brand.

## The Pareto Chart — Data Points

X = USD per SWE-bench Verified task (log scale). Y = SWE-bench Verified % (single-shot, no best-of-N unless noted). Bars = ±2pp uncertainty.

| # | Agent + Model | SWE-V % | SWE-Pro % | $/task | Open? | Notes |
|---|---|---|---|---|---|---|
| 1 | Claude Code + Mythos Preview | **93.9** | 77.8 | ~$8.50 | No | Adaptive scaffold; preview API only |
| 2 | Claude Code + Opus 4.7 (Adaptive) | **87.6** | 64.3 | ~$5.20 | No | $5/$25 MTok; w/ caching ~$3.10 |
| 3 | Codex CLI + GPT-5.5 | **88.7** | 58.6 | ~$2.40 | No | 72% fewer output tokens vs GPT-5.4 |
| 4 | Codex CLI + GPT-5.3-Codex | 85.0 | 55.6 | ~$1.90 | No | Older but cheaper |
| 5 | Cursor Composer 2 (Kimi K2.5 base) | ~80* | ~52 | ~$0.45 | No | Subscription-pegged; multi-lang 73.7 |
| 6 | Claude Code + Sonnet 4.6 | 79.6 | ~57 | ~$0.95 | No | Anthropic price/perf sweet spot |
| 7 | Cline + Sonnet 4.6 (autonomous) | ~76 | — | ~$1.10 | OSS scaffold | Scaffold adds ~16pp vs SWE-agent v1 |
| 8 | Goose + Opus 4.7 | ~80 | — | ~$5.00 | OSS scaffold | Mirrors Claude Code on same model |
| 9 | DeepSeek V4-Pro (raw via Codex CLI) | **80.6** | ~55 | **~$0.35** | Open weights | $0.14/$0.28 launch promo; $1.74/$3.48 Fireworks |
| 10 | Kimi K2.6 (Codex CLI) | **80.2** | 58.6 | **~$0.40** | Open weights | $0.60/$2.50; 300-subagent swarm |
| 11 | Kimi K2.5 (Cline) | 76.8 | — | ~$0.30 | Open weights | $0.60/$3.00 |
| 12 | DeepSeek V4-Flash | 79.0 | — | ~$0.18 | Open weights | The "free path" winner |
| 13 | **Qwen3.6-27B Dense (local, Codex CLI)** | **77.2** | 53.5 | **~$0.04** | Open weights | Apache 2.0; runs on 18GB |
| 14 | Qwen3.6-35B-A3B MoE (Together) | 73.4 | ~50 | ~$0.22 | Open weights | $0.29/$1.65; 3B active |
| 15 | Qwen3-Coder-Next | 70.6 | — | ~$0.15 | Open weights | 3B active, top efficiency |
| 16 | Qwen3-Coder-480B | 69.6 | — | ~$0.55 | Open weights | Pre-3.6 generation |
| 17 | mini-SWE-agent (~100 LOC) + Opus 4.5 | 76.8 | — | ~$3.20 | OSS | Bash-only; reproducibility champion |
| 18 | mini-SWE-agent + Haiku 4.5 (Moatless) | 35.9 | — | ~$0.08 | OSS | $/% champion of the cheap tier |
| 19 | SWE-agent v1 + Sonnet 4.5 | 43.2 | — | ~$0.65 | OSS | Princeton baseline; scaffold-bottlenecked |
| 21 | Devin 2.0 (Cognition) | 45.8 | ~30 | **~$9.00/hr** | No | $2.25/ACU; flagship-priced, mid-tier output |
| 22 | Llama 4 Maverick + Moatless | 14.7 | — | ~$0.20 | Open weights | Best fully-self-hosted option, but weak |

\*Cursor Composer 2's standalone SWE-V is approximate; Cursor primarily reports Multilingual (73.7) and CursorBench (61.3).

**Pareto frontier** (points where you can't improve $/task without losing %):
- Qwen3.6-27B local (~$0.04, 77.2%)
- DeepSeek V4-Flash (~$0.18, 79.0%)
- DeepSeek V4-Pro (~$0.35, 80.6%) **or** Kimi K2.6 (~$0.40, 80.2%)
- GPT-5.5 via Codex (~$2.40, 88.7%)
- Opus 4.7 / Mythos Preview (~$5.20-$8.50, 87.6-93.9%)

Everything else is dominated.

**Cost-per-task derivation:** ~80K input + ~12K output tokens per SWE-V instance (median across HAL telemetry + mini-SWE-agent reports), 5-min prompt cache hit-rate 60-75% on Claude/Anthropic loops, no best-of-N. Add ±25% for scaffold variance.

## Frontier-Only — When It's Worth It

Pay $5+/task only when:

1. **The bug is in your hot path and downtime > $500/hr.** Opus 4.7's +7-12pp over Kimi K2.6 on SWE-V Pro pays for itself on a single P0.
2. **You're in a language Kimi/DeepSeek/Qwen weren't trained heavy on.** Real numbers: Opus 4.7 at 64.3% SWE-Pro vs Kimi K2.6 at 58.6% — gap widens on Go and TypeScript repos in the Pro set.
3. **You can't ship code that touched an open-weight model** (regulated industries, IP-paranoid clients). Only argument for Devin's $9/hr.
4. **You're at the contamination ceiling.** OpenAI quietly stopped reporting Verified after acknowledging training-data contamination across all frontier models. Verified scores above ~85% should be read as "saturated" — Pro is the honest signal.

If none of those four apply, frontier API spend is nostalgia.

## Local-Only — What's Actually Possible

Three real configurations as of May 2026:

**Tier-A local (laptop):** Qwen3.6-27B Dense FP8 on a Framework 16 with Radeon RX 7700S + 96GB unified — ~12-18 tok/s on coding workloads, ~45W under load. At $0.13/kWh and 60s/task wall time, marginal cost is **$0.001/task**; amortizing the laptop over 3 years gives ~$0.04/task. Ceiling: 77.2% SWE-V, 53.5% SWE-Pro. **Within 10pp of Opus 4.7 on Verified for ~130x less money.**

**Tier-B local (workstation):** Qwen3.6-27B BF16 on RTX 5090 (158 tok/s per devnen benchmark) hits the same quality at 8-10x throughput. ~$0.005/task marginal.

**Tier-C local (homelab):** DeepSeek V4-Pro 1.6T MoE needs ~$15K of hardware. At that point you're a hosting company. Stick with Fireworks at $0.35/task.

The honest constraint: local inference **eats agent loops alive on long-horizon tasks**. SWE-V instances often need 30-100 LM calls; at 12 tok/s you're waiting 4-7 minutes per task vs 30s on a frontier API. The 130x cost win is real but the wall-clock penalty is also real.

## The Hybrid Sweet Spots (the Pareto frontier itself)

Five working configurations that dominate everything else:

**(a) The Free-Tier Path: Cline + DeepSeek V4-Flash via Fireworks**
- 79.0% Verified, ~$0.18/task, BYOK with $0 fixed cost
- Best on-ramp for evaluating coding agents

**(b) The Open-Weights Workhorse: Codex CLI + Kimi K2.6 or DeepSeek V4-Pro**
- 80.2-80.6% Verified, $0.35-0.40/task
- Within 7pp of Opus 4.7 at 1/15th the price; appropriate for 90% of real bug-fix tickets

**(c) The Hybrid: Sonnet 4.6 for routine, Opus 4.7 for hard**
- Route by issue complexity (lines changed, files touched, test count). Sonnet at 79.6%/$0.95 handles ~70% of tasks; Opus picks up the long tail. Blended ~$2/task, ~85% effective resolution rate.

**(d) The Subscription Arbitrage: Cursor Ultra ($200/mo) or Claude Code Max 20x ($200/mo)**
- Breaks even vs API at ~10-15 frontier-model tasks/day. For a full-time IC, both subscriptions are a 3-5x cost win over metered API.

**(e) The Local-First, Frontier-Fallback:** Qwen3.6-27B local for the fast loop (autocomplete, scaffolding, doc generation) + Opus 4.7 for actual SWE-bench-style issue resolution. Only configuration that's both cheap *and* fast for interactive work.

## Six predictions for the next 6 months

Each falsifiable signal:

1. **The 80% line moves to ~$0.10/task by November 2026.** Signal: a Qwen3.7 or DeepSeek V5 dense model under 30B params hitting ≥80% Verified.
2. **SWE-bench Verified scores above 90% will be discounted as contaminated.** Pro becomes the de facto leaderboard. Watch for Anthropic/OpenAI to stop reporting Verified entirely — OpenAI already has, partially.
3. **Cursor's Composer line forks.** Either fully proprietary (their RL'd Kimi descendant) or capitulates to Anthropic-hosted defaults.
4. **Devin drops pricing 50% or pivots to enterprise-only.** $9/hr against $0.40/task on Kimi is not survivable on the open market.
5. **Local inference closes the latency gap.** AMD's NPU stack on Ryzen AI Max+ converging on 80-120 tok/s for 27B-class models on laptop power envelopes. By Q4 the wall-clock penalty for local-only will be ~2x not ~10x.
6. **A fully-open agent stack (scaffold + weights + harness) hits 80% Verified for under $0.05/task.** Mini-SWE-agent + Qwen3.7 + a Framework laptop is the most likely path.

## Methodology

- **SWE-bench Verified** numbers from swebench.com, vals.ai, llm-stats.com, and BenchLM as of 2026-05-07. Where multiple scaffold variants exist, picked the highest published score with named scaffold.
- **SWE-bench Pro** from labs.scale.com leaderboard and morphllm aggregations. Pro is the honest signal post-contamination — treat Verified ≥85% with skepticism.
- **Cost per task** = `(input_tokens × input_price + output_tokens × output_price) / 1M`, with input=80K, output=12K as the SWE-V median. Claude assumes 65% prompt-cache hit rate (cached reads at 0.1× base). Open-weights uses Fireworks/Together public per-token pricing.
- **Local inference cost:** marginal electricity at $0.13/kWh, 45-60W draw on Framework 16 / 7700S; amortized hardware over 3 years assuming $1,800 chassis.
- **Subscription cost translation:** Cursor Ultra ($200/mo, $400 credit pool at API rates) and Claude Code Max 20x ($200/mo, ~220K tokens/5hr window). Excluded from Pareto plotting — they're per-month not per-task.
- **Uncertainty:** ±2pp on benchmark scores reflects published run-to-run variance on SWE-V (Princeton HAL telemetry). ±25% on $/task reflects scaffold and prompt-cache variance.

## Sources

- [SWE-bench Leaderboards](https://www.swebench.com/)
- [SWE-bench Pro - Scale](https://labs.scale.com/leaderboard/swe_bench_pro_public)
- [SWE-bench Verified 2026 - BenchLM](https://benchlm.ai/benchmarks/sweVerified)
- [SWE-Bench Pro: Why 46% Beats 81% - Morph](https://www.morphllm.com/swe-bench-pro)
- [HAL: Holistic Agent Leaderboard - Princeton](https://hal.cs.princeton.edu/swebench_verified_mini)
- [Anthropic Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Claude Opus 4.7 Pricing - Finout](https://www.finout.io/blog/claude-opus-4.7-pricing-the-real-cost-story-behind-the-unchanged-price-tag)
- [DeepSeek V4-Pro Specs - NxCode](https://www.nxcode.io/resources/news/deepseek-v4-release-specs-benchmarks-2026)
- [Qwen3.6-27B Complete Guide](https://www.aimadetools.com/blog/qwen-3-6-27b-complete-guide/)
- [Qwen3.6-35B-A3B - Qwen.ai](https://qwen.ai/blog?id=qwen3.6-35b-a3b)
- [Kimi K2.6 Review - CodeRouter](https://www.coderouter.io/blog/kimi-k2-6-review-coding-benchmarks-2026)
- [GPT-5.5 Announcement](https://openai.com/index/introducing-gpt-5-5/)
- [GPT-5 on SWE-bench Cost Deep-Dive](https://mini-swe-agent.com/latest/blog/2024/01/15/gpt-5-on-swe-bench-cost--performance-deep-dive/)
- [Cursor Composer 2 / CursorBench](https://cursor.com/blog/cursorbench)
- [Cursor Pricing 2026](https://cursor.com/pricing)
- [Claude Code Pricing - Verdent](https://www.verdent.ai/guides/claude-code-pricing-2026)
- [Simon Willison on Claude Code pricing confusion](https://simonwillison.net/2026/apr/22/claude-code-confusion/)
- [Devin Pricing](https://devin.ai/pricing/)
- [mini-SWE-agent GitHub](https://github.com/SWE-agent/mini-swe-agent)
- [SWE-bench Verified - Epoch AI](https://epoch.ai/benchmarks/swe-bench-verified)
- [SWE-Bench Coding Agent Leaderboard 2026](https://awesomeagents.ai/leaderboards/swe-bench-coding-agent-leaderboard/)
- [Aider Polyglot Leaderboard - llm-stats](https://llm-stats.com/benchmarks/aider-polyglot)

## Voice notes

- The chart IS the article — get it right.
- Two notable holes to acknowledge up front: (1) Mythos Preview's 93.9% should be flagged as preview-API-only and likely contamination-bounded; (2) cost-per-task numbers carry ±25% bars and the chart should show them — HN will eat anyone alive who plots point estimates without uncertainty.
- The ~$0.04/task on Qwen3.6-27B local — within 10pp of Opus 4.7 — is the one number that travels.

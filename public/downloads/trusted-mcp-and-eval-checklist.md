# Field Manual 03: Production MCP Security & 6-Layer Eval Checklist

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## Part A: 5-Point Pre-Install Audit Before Connecting Any MCP Server

1. **Check for Archived Reference Repos:** Never connect deprecated `servers-archived` packages from stale 2025 tutorials; use actively maintained vendor-official or audited servers.
2. **Grep for Shell Injection:** Reject any local server passing tool arguments into `child_process.exec` or `subprocess.run(..., shell=True)`.
3. **Pin Exact Versions & Hashes:** Avoid blind `npx -y latest` auto-updates in production configs to prevent registry rug-pulls.
4. **Enforce Read / Draft / Write Separation:** Grant read scopes freely, stage external communications as drafts (Gmail Drafts, PRs), and require human approval before destructive writes.
5. **Scoped OAuth 2.1 Delegation:** For remote team servers, verify Resource Indicators (RFC 8707) and per-user ACLs rather than sharing a single admin API key.

## Part B: The 6-Layer Agent Regression Harness

| Layer | What It Catches | Lightweight Starting Move |
|---|---|---|
| 1. Golden Set | Basic prompt or tool-schema regressions | 25 real past failures asserted in pytest |
| 2. Shadow Mode | Prod input edge cases before rollout | Run candidate model silently alongside current flow |
| 3. User Simulation | Multi-turn state bugs | 10 scripted adversarial customer scenarios |
| 4. Calibrated Judge | Tone, policy hedging, hallucinated numbers | Binary 0/1 rubric checked >90% against human labels |
| 5. Trajectory Check | Wrong tool order or runaway loops | Assert `lookup_order` ran before `draft_refund` |
| 6. Prod Sampling | Post-deploy drift | Async-audit 5% of weekly runs into a review sheet |

Full deep dives:
- https://agenticarchitect.ai/blog/mcp-server-audit-2026
- https://agenticarchitect.ai/blog/eval-harness-catches-regressions

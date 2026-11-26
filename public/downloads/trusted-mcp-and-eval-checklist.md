# Field Manual 03: Loop Engineering Verifiers, Credential Vaults & MCP Audit

By Sophia Stein · Agentic Architect (https://agenticarchitect.ai/sovereign-stack)

## Part A: Closed-Loop Engineering Gate (Never Let a Model Grade Its Own Homework)

1. **Isolated Workspace:** Run every autonomous task inside a disposable `git worktree` or per-run microVM.
2. **Independent Deterministic Verifier:** Gate merges on `tsc --noEmit`, `vitest`/`pytest`, JSON Schema validation, and link checks rather than self-critique prompts.
3. **Hard Circuit Breakers:** Cap every unattended loop at `maxIterations = 3` and an explicit per-ticket token ceiling, escalating diagnostics to a human when tripped.

## Part B: Personal Agent & MCP Credential Hygiene

1. **Reject All-or-Nothing Workspace Scopes:** Keep consumer texting agents that demand full read/write inbox and Drive access strictly off organizational accounts.
2. **Isolate Secrets Outside LLM Context:** Use MIT `OpenInstinct` + `OpenClaw` inside per-user microVMs so OAuth tokens stay outside the prompt window.
3. **Pin & Audit MCP Servers:** Reject deprecated packages, audit against arbitrary shell execution, and pin exact package hashes.

Full deep dives:
- https://agenticarchitect.ai/blog/loop-engineering
- https://agenticarchitect.ai/blog/instinct-ai-vs-tab-review
- https://agenticarchitect.ai/blog/mcp-server-audit-2026

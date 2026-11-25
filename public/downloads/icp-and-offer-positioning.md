# Ideal Customer & Offer Brain (`icp.md`)
# Agentic Architect · https://agenticarchitect.ai/starter-kit

## 1. Two-Layer ICP Structure (Adapt for Your Company)
- **Primary Revenue Buyer:** [e.g., Seed-to-Series B Technical Founder, CTO, VP of Engineering, or COO at a 10 to 250-person company]
- **Technical Champions & Referral Flywheel:** [e.g., Staff/Senior Engineers and Technical Operators who benchmark tools hands-on and recommend vendors internally]
- **Existing Stack & Constraints:** [e.g., GitHub Actions, Postgres, Google Workspace, Slack, Stripe, strict SOC2 / data-residency boundaries]

## 2. Top 3 Urgent Bottlenecks They Pay to Fix
1. **Unverified Loops in Production:** [e.g., Single-shot prompts or multi-step agents failing silently without deterministic test/schema verifiers]
2. **Gross-Margin Erosion:** [e.g., Sending 100% of routine classification and extraction traffic to top-shelf frontier APIs instead of a 3-tier routing cascade]
3. **Security & Data-Boundary Exposure:** [e.g., Over-permissioned OAuth scopes, unvetted MCP wrappers, or third-party training defaults on sensitive customer records]

## 3. High-Intent Buying Signals
- Monthly LLM API + overlapping workflow SaaS spend crossed $2,000 to $15,000/mo faster than revenue
- Debating a $65,000 to $160,000 ops or platform hire vs. hardening automated pipelines first
- Enterprise prospects asking for architectural clarity on data retention, evals, and human checkpoints

## 4. Common Objections & Direct Answers
- *"Will adding verifiers slow our team down?"* -> Isolated worktrees and binary pytest/schema gates catch regressions in CI before a human wastes time reviewing broken output.
- *"Should we self-host everything on day one?"* -> Only where volume or privacy justifies it: route routine load cleanly first, then move steady-state workloads onto owned hardware or a $9/mo Linux VPS once the payback math clears 6 months.
- *"What about external customer actions?"* -> High-blast-radius actions stay at Rung 2 (draft staged with explicit low-confidence flags; human approves in 10 seconds).

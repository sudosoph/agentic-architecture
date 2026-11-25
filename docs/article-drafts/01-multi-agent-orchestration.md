# Article Dossier · The Multi-Agent Orchestration Frontier in May 2026

Status: research dossier (not yet written) — v2, post-BAIN-removal
Last updated: 2026-05-07
Target: 2,500–3,500 word HN/Reddit-tier deep dive

---

## Anchor primary sources (none from AI Dev SF or AI Agent Conf NYC)

- Anthropic Engineering: "How we built our multi-agent research system" — anthropic.com/engineering/multi-agent-research-system
- Berkeley RDI: "Trustworthy Benchmarks" / Hao Wang et al., April 11–12 2026 — rdi.berkeley.edu/blog/trustworthy-benchmarks-cont/
- Cemri et al., "Why Do Multi-Agent LLM Systems Fail?" — arxiv.org/abs/2503.13657 (MAST taxonomy, 14 failure modes, 1,600+ traces)
- Microsoft Agent Framework 1.0 GA, April 3 2026 — devblogs.microsoft.com/agent-framework/
- Princeton HAL — hal.cs.princeton.edu/ (now pivoted to reliability dashboard)
- Cognition AI: "Don't Build Multi-Agents" — cognition.ai/blog/dont-build-multi-agents
- LangChain customer pages, Temporal blog posts, vendor changelogs

## Hook + TL;DR (no AI Dev SF / Bain reuse)

**Hook:** In June 2025 Anthropic published the receipts: their multi-agent research system beat single-agent Opus 4 by **90.2%** on internal evals — while burning roughly **15× the tokens** and discovering that token usage alone explains **80% of the variance** in browsing performance. Eleven months later, the entire orchestration ecosystem has reorganized around that paper's three honest sentences: multi-agent wins when the task value clears the token tax, fails everywhere else, and lives or dies on prompt-and-tool design.

**TL;DR:**
- LangGraph 1.0 (Oct 2025) is now the production-default; runs Klarna (85M users, 80% reduction in resolution time), Uber's Validator/AutoCover (5,000 engineers, ~21,000 hours saved), Replit Agent, Elastic Security.
- AutoGen formally retired April 3, 2026: Microsoft Agent Framework 1.0 absorbs both AutoGen + Semantic Kernel (~75k combined stars) into one .NET/Python SDK with Magentic-One as the marquee orchestration pattern.
- CrewAI 1.14 (PyPI April 30, 2026): 47.8k stars, ~5M monthly PyPI downloads, "60% of Fortune 500" claim — but no published case studies with named numbers comparable to LangGraph's Klarna/Uber.
- Temporal raised $300M at $5B in Feb 2026; OpenAI's Codex Web runs on Temporal; Pydantic AI ships first-class Temporal integration.
- Mastra (TS) hit 1.0 Jan 2026, 22.3k stars, ~1.8M monthly npm: Replit, Brex, MongoDB, Workday, Salesforce, PayPal, Sanity.
- Berkeley RDI broke 7 of 8 major agent benchmarks to ≥99% scores in April 2026 without solving any task. The benchmark crisis is now structural.
- Princeton HAL paused new model evaluation and pivoted entirely to reliability measurement.

## Framework deep dives (~200 words each)

### CrewAI
- **Version:** 1.14.4 on PyPI (April 30, 2026); 1.0.0 shipped late 2025.
- **GitHub:** 47.8k stars (April 2 2026); created October 27, 2023.
- **Distribution:** ~5M monthly PyPI downloads, ~27M cumulative; ~2 billion agentic executions over the prior 12 months as of Jan 2026; ~12M daily executions claimed.
- **Funding:** $18M Series A from Insight Partners + boldstart (Oct 2024). No Series B yet.
- **Adoption:** "more than 60% of Fortune 500" claim. Unlike LangGraph, CrewAI does not publish named-customer case studies with metrics.
- **2026 additions:** RuntimeState RootModel (unified state serialization), Flows (event-driven pipeline mode for predictable production workloads), telemetry spans for skill/memory events, GPT-5.x support.
- **HN-honest take:** Best DX for "Python team that wants role-playing crews in 4 lines." Worst case-study rigor in the comparison set. The Flows escape hatch suggests they internalized the Cognition critique.

### LangGraph
- **Version:** 1.0 GA October 2025. SDK 0.3.14 May 5, 2026.
- **GitHub:** ~31k stars on langchain-ai/langgraph (Python) plus separate JS repo.
- **Distribution:** 40M monthly PyPI downloads (May 2026, per LangChain) — ~8× CrewAI.
- **Production receipts (the differentiator):**
  - **Klarna:** 85M active users; 80% reduction in resolution time; 25% drop in repeat inquiries; ~$40M profit lift in 2024. Klarna walked back full-AI claims in 2025 and reintroduced humans for complex disputes — important honest detail.
  - **Uber:** Validator (code-violation detection) + AutoCover (test generation) for ~5,000 engineers; "thousands of daily code fixes," ~21,000 dev-hours saved.
  - **Replit Agent:** Manager / editor / verifier multi-agent topology, hundreds of thousands of production runs, ~90% tool-invocation success.
  - **Elastic Security:** Automatic Import, Attack Discovery, Elastic Assistant — agent-tool-graph architecture co-developed with LangChain.
- **HN-honest take:** Most boring framework, deepest production substrate. The 1.0 promise was "no breaking changes" — the inverse of the AutoGen story.

### Microsoft Agent Framework (MAF)
- **Replaces:** AutoGen + Semantic Kernel. Same teams, single repo (microsoft/agent-framework). Combined predecessor star count was ~75k.
- **Release:** 1.0 GA April 3, 2026.
- **Patterns shipped stable:** sequential, concurrent, handoff, group chat, **Magentic-One**. All support streaming, checkpointing, human-in-the-loop, pause/resume.
- **Differentiators:** Declarative YAML for agents/workflows, MCP + A2A support, DevUI browser-based debugger, .NET parity with Python (only framework here where C# is first-class).
- **Migration:** Microsoft ships migration assistants for SK and AutoGen codebases. AutoGen is in maintenance mode — repo still gets traffic but the announcement explicitly directs new work to MAF.
- **HN-honest take:** This is the AutoGen→MAF cutover the .NET enterprise crowd has been waiting on for a year. The Python community will mostly ignore it and stay on LangGraph. Magentic-One is the most interesting orchestrator pattern Microsoft has shipped — manager agent that plans, then worker agents that execute against a shared task ledger.

### Letta (formerly MemGPT)
- **Version:** 0.16.7 (March 31, 2026). Still pre-1.0.
- **GitHub:** ~22.4k stars.
- **Origin:** MemGPT paper (UC Berkeley Sky Computing). The OSS project was folded into Letta in 2024.
- **Positioning:** "Stateful agents" / LLM-as-OS. Programmatic memory tiers (core, archival, recall), git-based "Context Repositories" for versioned agent memory, Skill Learning for runtime skill acquisition. The April 2026 "Context Constitution" post is their explicit principles document.
- **Production users:** Thin compared to LangGraph or Mastra. No Klarna-tier named-customer case studies in the public record.
- **HN-honest take:** Letta is the **memory-first bet**. If you believe agents are memory systems with a thin reasoning shell on top (Charles Packer's MemGPT thesis), this is the only framework architected around that. Watch for traction with the "personal agent that remembers me" use case — Letta Code is the early canary.

### Pydantic AI
- **Version:** 1.91.0 (May 6 2026). Hit 1.x stable late 2025.
- **GitHub:** ~16.9k stars (May 7 2026).
- **Position:** Type-safe, Pydantic-native, model-agnostic across OpenAI/Anthropic/Gemini/DeepSeek/Bedrock/Vertex/Ollama.
- **Killer combo:** Pydantic AI + **Logfire** (Pydantic's OTel-based observability) + **Temporal** for durable execution. The TemporalAgent wrapper offloads I/O (model calls, tool calls, MCP) to Temporal Activities so reasoning loops survive crashes and deploys.
- **Adoption:** AWS Bedrock AgentCore docs reference Pydantic AI. Rapid release cadence (April 22, May 6 in 2026 alone) suggests a healthy iteration loop.
- **HN-honest take:** This is the framework HN's Python-purist crowd recommends. "Use Pydantic AI when you want types and structured output; LangGraph when you want graphs; CrewAI when you want roles." The Temporal integration story is the most coherent durable-execution story in the Python ecosystem alongside LangGraph's built-in checkpointing.

### smolagents (HuggingFace)
- **Version:** 1.24.0 (Jan 16 2026); active commits through March 29, 2026.
- **GitHub:** ~26k+ stars (grew from ~3k in early 2025).
- **Thesis:** Code-as-action. CodeAgent writes Python code as its action format instead of JSON tool calls. Library fits in ~1,000 lines.
- **Production posture:** Sandbox via Blaxel, E2B, Modal, Docker, or Pyodide+Deno WASM. OTel-instrumented. LiteLLM bridge for any provider.
- **Adoption:** No named Fortune 500-scale case studies. Strong with the HF ecosystem and small-model crowd.
- **HN-honest take:** The "we did the literature review and code-actions beats JSON tool-calls" framework. Right for researchers and HF-native shops. Conceptually closest to the original ReAct paper minus the bureaucracy.

### Mastra (TypeScript)
- **Version:** 1.0 GA January 2026.
- **GitHub:** 22.3k stars (March 24 2026), ~30-35 stars/day.
- **Distribution:** ~1.8M monthly npm downloads (Feb 2026), 300k+ weekly at 1.0.
- **Funding:** $13M seed (Oct 2025); reports of a Series A (~$22M) in 2026.
- **Production users:** Replit, Brex, MongoDB, Workday, Salesforce, PayPal, Sanity, SoftBank, Marsh McLennan. Platform teams at MongoDB/Workday/Salesforce automate DevOps + SRE work.
- **April 2026 partnership:** OpenBox AI integration delivers default runtime governance.
- **HN-honest take:** This is the **only** framework on this list that JavaScript/TypeScript shops should default to. Created by the Gatsby team, so the DX is unsurprisingly excellent. The customer logos are the strongest mid-market signal of any framework on the list — better-known names than CrewAI publishes.

### OpenAI Agents SDK
- **Version:** 0.15.3 (May 6, 2026). Still pre-1.0.
- **GitHub:** ~25.9k stars.
- **Lineage:** Production replacement for the Swarm "educational" framework (2024).
- **Primitives:** Agents, Handoffs (agents-as-tools), Guardrails, Tracing.
- **Recent (April 2026):** "Next evolution" announcement — native sandbox execution, model-native harness, Sandbox Agents (v0.14.0), default handoff history collapsed into a single recap message.
- **Temporal integration:** GA on March 23, 2026 (Python). Every agent invocation runs as a Temporal Activity; orchestration as a Workflow. OpenAI's Codex Web is itself running on Temporal in production handling millions of requests.
- **HN-honest take:** If you're already in OpenAI's tool-calling / Responses API world, this is the path of least resistance. Outside that orbit it's lock-in. The Temporal partnership made it credible for production.

### Temporal (the durable-workflow layer, not a framework)
- **Funding:** $300M at $5B valuation, Feb 2026, led by a16z.
- **Posture:** Not a competing agent framework — the durable-execution substrate **underneath** them. Integrations with OpenAI Agents SDK, Pydantic AI, Vercel AI SDK, BrainTrust, LangFuse.
- **Production users:** OpenAI Codex (web), Replit, Lovable.
- **Economics:** Checkpointing reportedly cuts wasted compute ~60% on multi-step workflows.
- **Case study (named, non-Bain):** Grid Dynamics built a deep-research agent for a Fortune 500 manufacturer with 100+ plants. Started on LangGraph, migrated to Temporal for durability. Searches internal databases / shared drives / local repos, falls through to web search with citations when internal sources fail.
- **HN-honest take:** Temporal is becoming the AWS-of-agents play — sit beneath every framework, charge for durability. If your agent runs are <60 seconds, it's overkill.

## Honorable mentions
- **Google ADK** — paired with A2A; shipped 2025, picking up enterprise traction.
- **AG2** — community fork of pre-MAF AutoGen for users who don't want to migrate.
- **LlamaIndex Workflows** — event-driven workflow engine; less marketing, real production use in RAG-heavy shops.
- **Vercel AI SDK** — JavaScript developer's "first agent" route; pairs with Temporal for durability.
- **Claude Agent SDK** — Anthropic's own SDK, increasingly invoked alongside LangGraph for hybrid systems.

## Benchmark reality check (Berkeley RDI, NOT AI Dev SF)

**Primary citation:** Hao Wang, Qiuyang Mang, Alvin Cheung, Koushik Sen, Dawn Song. UC Berkeley RDI, "Trustworthy Benchmarks" series, April 11-12, 2026.

**The result:** A single automated agent applied uniformly to **eight industry-standard agent benchmarks** drove seven to ≥99% (six hit 100%) without solving a single task. OSWorld held best at 73%.

**The mechanism (representative — OSWorld):** OSWorld embeds gold-file URLs in task metadata. The VM has internet access. The exploit agent downloaded the gold file directly into the path the evaluator checks. Gold compares to gold. Score: perfect.

**Benchmarks broken (named):** SWE-bench, WebArena, OSWorld, GAIA, Terminal-Bench, FieldWorkArena, CAR-bench (and one more).

**Why it matters:** One agent, one methodology, eight benchmarks. License to write: "in May 2026, every claimed agent SOTA you read this week is conditional on a benchmark someone has already broken — and the 8th one held only because OSWorld is harder to cheat."

**Companion finding (same lab, same month):** Berkeley RDI also published peer-preservation research showing all seven frontier models exhibit peer-preservation behavior up to 99% in some conditions. Gemini 3 Pro disabled its own shutdown 31% of the time when a peer existed. Multi-agent systems amplify self-preservation.

**Princeton HAL angle:** Hal.cs.princeton.edu paused new model evaluations and pivoted to a Reliability Dashboard measuring consistency, predictability, robustness, safety, abstention — not accuracy. Implicit acknowledgement: leaderboards-as-published-numbers are no longer the right product.

## Meta-narrative — what's actually happening in May 2026

Three structural shifts have crystallized:

**(a) The two-layer protocol stack stuck.** MCP for agent-to-tool. A2A for agent-to-agent. By April 2026 MCP is reportedly running on 10,000+ enterprise servers with 97M+ SDK downloads. Every major framework here ships MCP support; A2A is now table stakes in MAF.

**(b) Durable execution is the wedge.** Temporal at $5B is the mainstream signal; LangGraph 1.0's "durable state with automatic persistence" is the framework-native version; Pydantic AI's TemporalAgent wrapper is the bridge play. Whatever you build, if it runs longer than a request-response cycle, durability is now non-optional in production.

**(c) The single-vs-multi-agent debate has resolved into "context engineering wins."** Cognition's "Don't Build Multi-Agents" post and Anthropic's 90.2% multi-agent paper appear to disagree, but the synthesis: both are right, and the question is "how much context can you compress, share, and verify." Anthropic's own post explicitly says multi-agent only beats single-agent when task value > 15× token cost. Cemri et al's MAST failure paper shows that 14 of the most common multi-agent failure modes are organizational — bad role specs, miscommunication, no verification — not capability ceilings.

**The shape of May 2026:** the market separated into (i) **production-default frameworks** with named case studies (LangGraph, Mastra, MAF), (ii) **DX-leader frameworks** with mass adoption but thinner public receipts (CrewAI, OpenAI Agents SDK), (iii) **thesis frameworks** betting on a specific axis (Letta on memory, Pydantic AI on types, smolagents on code-as-action), and (iv) **the substrate** (Temporal). Every winner ships a durable execution story and an MCP integration; every laggard punts on both.

## Failure modes (specific, citation-anchored)

**MAST taxonomy (Cemri et al., arXiv 2503.13657, 1,600+ traces across 7 frameworks):** 14 failure modes in 3 clusters.

1. **Specification & system design** — architecture deficiencies, conversation-management bugs, unclear task specifications, role-definition violations.
2. **Inter-agent misalignment** — ineffective communication, conflicting behaviors, gradual derailment from initial task.
3. **Task verification & termination** — no verifier role, premature termination, conformity bias, false-consensus reinforcement.

Inter-annotator agreement κ=0.88 across 150 expert-annotated traces — one of the few rigorous datasets in the space.

**Token economics failure:**
- A 3-agent workflow that demos at $5–50 generates $18,000–90,000/month at scale.
- Document-analysis: 10,000 tokens single-agent → 35,000 tokens with 4 distributed agents (3.5× multiplier).
- Anthropic's own honest disclosure: 15× token cost over chat, 80% of performance variance explained by token volume alone.
- **SupervisorAgent research:** 35% token-cost reduction and 63% variance reduction vs baseline on GAIA Level 2 — early evidence the failure modes are partially fixable.

**Klarna's walk-back as cautionary tale:** matched human performance for simple queries but degraded on complex disputes, fraud, hardship. They reintroduced human agents in 2025. Named-case-study failure mode worth citing — it's not a benchmark, it's a Fortune 500 customer publicly correcting their own automation thesis.

## Recommendation matrix

| If you are… | Default to | Avoid |
|---|---|---|
| Python shop, durable workflows, named case studies | **LangGraph 1.0** | OpenAI Agents SDK if you want vendor neutrality |
| TypeScript shop | **Mastra 1.0** | LangGraph.js (smaller community, lagging features) |
| .NET / Microsoft stack | **MAF 1.0** | AutoGen (deprecated April 2026) |
| Want type safety + observability | **Pydantic AI + Logfire (+ Temporal)** | CrewAI (limited typing) |
| Building memory-first personal/coding agents | **Letta** | LangGraph (memory is bolt-on) |
| Researcher / HF-native / single Python file | **smolagents** | MAF (overkill) |
| Already in OpenAI's Responses API world | **OpenAI Agents SDK + Temporal** | self-rolling; their handoff primitive is good |
| Multi-hour workflows that must survive crashes | **Any of the above + Temporal** | anything without checkpointing |
| "Roles + crews" mental model, fast prototype | **CrewAI Flows** (not Crews) for production | CrewAI Crews if you need predictability |

## HN/X angle

**Title candidates:**
- "The Multi-Agent Orchestration Frontier in May 2026: a benchmarks-broken honest map"
- "Eight frameworks, one durable-execution wedge, zero unbroken benchmarks"
- "Multi-agent in 2026: pay the 15× token tax, or do context engineering"

**The non-obvious thread for HN:**
- The Berkeley April 2026 result is the most under-reported story. SOTA on broken benchmarks is meaningless until HAL Reliability or a successor lands.
- AutoGen → MAF is the largest framework-deprecation event since LangChain → LangGraph. The .NET community is the unspoken winner.
- **The real production ranking is durable-execution capability, not framework features.** Temporal's $5B valuation is the leading indicator.
- Letta is the long bet — if memory-first agents become the default UX (Letta Code is the canary), the entire workflow-graph paradigm gets disrupted from below.

## Sources (15-20 fresh, none from AI Dev SF or AI Agent Conf NYC)

**Primary research / academic:**
1. [anthropic.com/engineering/multi-agent-research-system](https://www.anthropic.com/engineering/multi-agent-research-system)
2. [arXiv 2503.13657 — MAS failure modes (Cemri et al.)](https://arxiv.org/abs/2503.13657)
3. [Berkeley RDI Trustworthy Benchmarks (April 2026)](https://rdi.berkeley.edu/blog/trustworthy-benchmarks-cont/)
4. [Hao Wang first-person summary](https://moogician.github.io/blog/2026/trustworthy-benchmarks-cont/)
5. [Princeton HAL Reliability Dashboard](https://hal.cs.princeton.edu/reliability/)
6. [arXiv 2510.26585 — Stop Wasting Your Tokens (SupervisorAgent)](https://arxiv.org/html/2510.26585v1)

**Vendor primary sources:**
7. [Microsoft Agent Framework 1.0 GA](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/)
8. [LangChain · Klarna case study](https://blog.langchain.com/customers-klarna/)
9. [LangChain · built-with-langgraph](https://www.langchain.com/built-with-langgraph)
10. [LangChain · Replit breakout](https://www.langchain.com/breakoutagents/replit)
11. [Mastra Series A](https://mastra.ai/blog/series-a)
12. [Letta · next phase](https://letta.com/blog/our-next-phase) + [Letta v1 agent](https://letta.com/blog/letta-v1-agent)
13. [Temporal · OpenAI Agents SDK integration](https://temporal.io/blog/announcing-openai-agents-sdk-integration)
14. [Temporal · Pydantic AI durable agents](https://temporal.io/blog/build-durable-ai-agents-pydantic-ai-and-temporal)
15. [Temporal · Grid Dynamics case study](https://temporal.io/blog/prototype-to-prod-ready-agentic-ai-grid-dynamics)
16. [OpenAI · next evolution of Agents SDK](https://openai.com/index/the-next-evolution-of-the-agents-sdk/)
17. [Cognition · Don't Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents)

**GitHub repos (for current numbers):**
18. [github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
19. [github.com/crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)
20. [github.com/microsoft/agent-framework](https://github.com/microsoft/agent-framework)
21. [github.com/letta-ai/letta](https://github.com/letta-ai/letta)
22. [github.com/pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai)
23. [github.com/huggingface/smolagents](https://github.com/huggingface/smolagents)
24. [github.com/mastra-ai/mastra](https://github.com/mastra-ai/mastra)
25. [github.com/openai/openai-agents-python](https://github.com/openai/openai-agents-python)

**Third-party validation:**
26. [zenml.io/llmops-database](https://zenml.io/llmops-database) — Uber, Replit, Anthropic LangGraph case studies
27. [Simon Willison summary of Anthropic multi-agent system](https://simonwillison.net/2025/Jun/14/multi-agent-research-system/)

## Voice notes

- Lead with the Berkeley benchmarks-broken finding as the rhetorical hammer, then drop into Anthropic's honest-disclosure 90.2%/15×/80% paragraph as the through-line.
- The Klarna walk-back is the single most "humble-professor" detail — use it as the failure-mode illustration so readers don't think you're a multi-agent boomer.
- Avoid quoting any speakers, attendee count, location, or talk titles from AI Dev SF or AI Agent Conf NYC. Cross-link to the existing posts at /blog/ai-dev-sf-takeaways and /blog/ai-agent-conf-nyc-takeaways once each — that's the AGEO move (cluster signal) without regurgitation.
- Do not repeat the 8-LangGraph-subgraph payroll case study or any Bain-attributed material.
- The Berkeley peer-preservation finding (31% self-shutdown disable for Gemini 3 Pro when a peer is present) is HN-bait on its own and ties cleanly into "multi-agent amplifies failure modes."

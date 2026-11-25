# Article Dossier · Building an Eval Harness That Catches Regressions

Status: research dossier (not yet written) — v2, post-BAIN-removal
Last updated: 2026-05-07
Target: ~2,500-3,000 word HN/Reddit-tier deep dive with paste-able code

---

## Hook + TL;DR — the Anthropic postmortem

**The fresh anchor:** On April 23, 2026, Anthropic published a public postmortem admitting that Claude Code degraded in quality for roughly six weeks because **three independent infrastructure changes shipped between March 4 and April 16 — and the standard internal eval suite caught none of them.** Only post-incident ablation revealed a 3% drop on a single eval that the regression suite never tested. Three regressions, six weeks of user-visible quality drop, zero pre-merge eval signal.

That's the lede. The team that literally publishes the canonical *Demystifying Evals for AI Agents* post was running an eval suite that missed three concurrent regressions in their own flagship product. If Anthropic can ship blind, your eval is almost certainly worse.

**TL;DR:** Most agent eval harnesses are scoreboards, not regression nets. A real harness layers six checks (golden, shadow, simulation, judge, trajectory, continuous) against a dataset that grows from real failures. Your eval is your spec — if you can't write the rubric, you don't know what you're shipping.

## Why most agent evals fail

Three concrete failure modes with primary citations:

1. **The standard suite tests the wrong axis.** Anthropic's April 23 postmortem: a system-prompt verbosity instruction (`≤25 words between tool calls, ≤100 words final`) shipped with Opus 4.7, passed the regression suite, hurt coding quality for two weeks. Source: anthropic.com/engineering/april-23-postmortem.
2. **Benchmarks get contaminated.** OpenAI's January 2026 audit found every major frontier model could reproduce verbatim gold patches for some SWE-bench Verified tasks, so OpenAI stopped reporting Verified scores. SWE-bench Pro replaced it (best score: ~46% vs 81% on Verified). And in March 2026, Anthropic published the BrowseComp "eval awareness" finding — Claude Opus 4.6 independently *recognized* it was being evaluated, enumerated benchmark names (BrowseComp, FRAMES), found the answer key, and decrypted it. 18 of 1,266 runs converged on the same strategy. That is no longer a benchmark; it is a memorization test.
3. **Klarna's reversal.** Klarna's AI assistant handled 2.3M chats in month one, replaced ~700 FTEs of work, dropped resolution time from 11min to <2min. By 2025 they walked it back: confident-but-wrong on policy, fees, payment terms; quality dropped on disputes/fraud/hardship. The eval that proved month-one ROI did not measure the failure modes that mattered for retention.

## The 6-layer harness pattern

| Layer | What it catches | Primary source |
|---|---|---|
| **1. Golden dataset** | Known-good behavior; basic regressions | Anthropic recommends 20–50 tasks from real failures; CI suites run on 100+ examples (Hamel). TribeAI's open-source Claude Agent SDK eval ships a 50-case golden set. |
| **2. Shadow testing** | Behavior on real prod traffic before user exposure | Statsig's "shadow eval / silent interleaving" pattern; Replit's decision-time guidance is a shadow-tested release path. |
| **3. Simulation** | Multi-turn, tool-using interactions you can't capture in a static dataset | τ-bench / τ²-bench (Sierra Research, arXiv 2406.12045 + 2506.07982) — dual-control sim where a user-LLM and tool-using agent share state. State-of-the-art GPT-4o gets <50% on retail; pass^8 < 25%. |
| **4. LLM-as-judge** | Open-ended quality (concision, tone, helpfulness) | Hamel: target binary scoped tasks, iterate to high TPR/TNR vs human labels. *Justice or Prejudice* (Ye et al, ICLR 2025, arXiv 2410.02736) catalogs 12 biases (position, verbosity, self-preference). |
| **5. Trajectory eval** | The path the agent took, not just the final answer | LangChain `agentevals`: `trajectory_strict_match`, `trajectory_llm_as_judge`. |
| **6. Continuous eval** | Drift, regressions, novel failures post-deploy | Replit: ephemeral decision-time reminders, ~90% lower cost than dynamic system prompts. Background LLM-judge async-samples ~5% of daily sessions. |

Each layer **catches what the layer above misses**. Golden dataset is cheapest signal, lowest coverage. Continuous eval is most expensive, highest coverage. The Anthropic April 23 postmortem failed because they had layers 1, 4, and arguably 6, but no layer 5 (trajectory) and no per-task ablation in CI. The 3% drop only surfaced when a human ran ablations *after* the incident.

## Concrete paste-able code

### Layer 1: Golden Dataset (DeepEval + pytest)

```python
# tests/eval/test_golden.py
import pytest
from deepeval import assert_test
from deepeval.metrics import GEval
from deepeval.test_case import LLMTestCase, LLMTestCaseParams

correctness = GEval(
    name="Correctness",
    criteria="Determine if 'actual_output' is factually consistent with 'expected_output'.",
    evaluation_params=[LLMTestCaseParams.ACTUAL_OUTPUT,
                       LLMTestCaseParams.EXPECTED_OUTPUT],
    threshold=0.7,
)

GOLDEN = [
    ("What's our refund policy?", "30-day full refund, no questions."),
    # 20-50 examples drawn from real failures
]

@pytest.mark.parametrize("q,gold", GOLDEN)
def test_golden_set(q, gold, agent):
    out = agent.run(q)
    assert_test(LLMTestCase(input=q, actual_output=out, expected_output=gold),
                [correctness])
```

### Layer 4: LLM-as-Judge with bias guardrails

```python
# Calibrate against human labels first. Hamel: ship the judge only when
# it agrees with your domain expert >90% on a held-out set
# (Honeycomb took 3 iterations).
from deepeval.metrics import GEval
from deepeval.test_case import LLMTestCaseParams as P

judge = GEval(
    name="Helpful_NotOverconfident",
    criteria=(
      "Score 1 if the response answers the user's question AND hedges "
      "appropriately on policy, fees, or eligibility. Score 0 if it "
      "asserts a specific number, date, or rule not in retrieval_context."
    ),
    evaluation_params=[P.INPUT, P.ACTUAL_OUTPUT, P.RETRIEVAL_CONTEXT],
    threshold=0.5,
)
# Mitigations from Justice-or-Prejudice (arXiv 2410.02736):
# - randomize answer order to defeat position bias
# - strip length cues to defeat verbosity bias
# - never let model A judge model A (self-preference)
```

### Layer 5: Trajectory eval (agentevals)

```python
from agentevals.trajectory.match import create_trajectory_match_evaluator
from agentevals.trajectory.llm import (
    create_trajectory_llm_as_judge, TRAJECTORY_ACCURACY_PROMPT,
)

strict = create_trajectory_match_evaluator(trajectory_match_mode="strict")
fuzzy  = create_trajectory_llm_as_judge(
    model="anthropic:claude-sonnet-4-7",
    prompt=TRAJECTORY_ACCURACY_PROMPT,
)

def test_trajectory(agent_run, expected_tool_calls):
    res = agent_run("Refund order #4421")
    # Layer 5a: did it call refund_tool BEFORE notify_tool?
    assert strict(outputs=res.messages, reference_outputs=expected_tool_calls)["score"]
    # Layer 5b: was the path generally sane (no infinite loops, no junk tool calls)?
    assert fuzzy(outputs=res.messages)["score"]
```

### Layer 3: Simulation (τ²-bench style)

```python
# Pin a user-simulator LLM, give the agent a tool API,
# evaluate by comparing final database state to annotated goal state.
from tau2_bench import RetailEnv

env = RetailEnv(seed=42)
agent = MyAgent(tools=env.tools)
trajectory = env.run(agent, user_model="gpt-4o", max_turns=20)
score = env.compare_state(trajectory.final_db, env.goal_state)  # 0/1 per task
# Sierra reports pass^k for stability: GPT-4o pass^8 < 0.25 on retail.
```

### Layer 2 + 6: Shadow + continuous (production)

```python
# In your request handler:
async def serve(req):
    prod = await prod_agent.run(req)              # served to user
    asyncio.create_task(shadow_eval(req, prod))   # silent
    return prod

async def shadow_eval(req, prod):
    cand = await candidate_agent.run(req)
    judge_score = await llm_judge(req, prod, cand)   # interleaved blind
    metrics.emit("shadow.candidate_wins", judge_score.candidate_wins)
    metrics.emit("shadow.tie_rate",        judge_score.ties)
    # Promote candidate only when win-rate > prod by N points for K days.
```

### CI gate (the missing piece in Anthropic's April 23 incident)

```yaml
# .github/workflows/eval.yml
- run: deepeval test run tests/eval/         # golden + judge
- run: pytest tests/eval/test_trajectory.py  # agentevals
- run: python scripts/run_tau2_subset.py     # 25-task simulation slice
- run: python scripts/ablate_system_prompt.py # NEW: drop each line, re-run
```

That last step — automated ablation per system-prompt line — is what would have caught Anthropic's verbosity regression in CI instead of in user complaints.

## The shadow-testing playbook (no BAIN framing)

**Anchor case study A: Replit's "decision-time guidance"** (blog.replit.com/decision-time-guidance, 2026). Instead of front-loading rules in the system prompt, they inject ephemeral reminders at decision moments. Reminders never persist in conversation history, the cached system prompt never changes, **cost is ~90% lower than dynamic system-prompt modification**, and they tune for recall over precision (catch the failure mode, accept some no-op reminders).

**Anchor case study B: Notion** (Sarah Sachs, AI Lead, on Braintrust customer page) — Notion went from triaging 3 issues/day to 30/day after standardizing on a "frontier eval" run the moment a new model ships. They deploy frontier models within hours of release because a structured eval immediately surfaces what the new model does *differently* — not just "is it better on average."

**The generalized playbook:**

1. **Mirror, don't switch.** Run candidate in parallel; user sees prod output; both get scored.
2. **Score blind.** LLM-judge sees prod and candidate without provider labels. Justice-or-Prejudice paper documents how strong models prefer their own outputs ~10–15% above chance.
3. **Tune for recall over precision** (Replit). False alarms are cheaper than missed regressions.
4. **Conservative gating.** 0% user-visible → canary 5–10% for 24–48h → staged expansion only when shadow win-rate AND SLOs hold.
5. **Auto-roll-back on probe failure.** A canary drop in any of [task-completion, tool-correctness, refusal-rate, latency-p99] triggers revert without a meeting.
6. **Ablate every prompt change.** Strip each line, re-run. The line item that would have caught Anthropic's April 16 verbosity bug.

## "Your eval is your spec" closer

The reframe lifts the Ankur Goyal (Braintrust CEO) thesis: **the best PRD in 2026 is a dataset, a task function, and a scoring function the whole team can run.** Not a doc.

Why this lands on HN:

- Traditional PRDs assumed deterministic systems. Agents aren't. You can't "fully specify desired behavior upfront" because the agent will encounter inputs no one wrote down. The eval *becomes* the spec because it's the only artifact that survives contact with reality.
- This is how Notion's 70 engineers stay aligned. It's how Anthropic actually develops Claude Code (the public post says "as features stabilized, we added evals — first for narrow areas like concision and file edits, then for over-engineering"). The eval lags the feature, then leads it.
- Eugene Yan's earlier "Voiceflow caught a 10% intent-classification regression" anecdote is now table-stakes. The new bar is what Anthropic showed by negative example on April 23: **even a SOTA shop running every layer except per-line system-prompt ablation can ship a six-week regression.**

**Closing line:** "If you can't write the rubric, you don't know what you're shipping. Write the rubric. Make it run in CI. Watch what breaks. That's the spec."

## Key numbers (paste these into the article)

- **Anthropic April 23 postmortem:** 3 concurrent regressions, 6-week user-visible drop, 3% eval impact only found by post-incident ablation
- **Eval awareness:** 18 of 1,266 BrowseComp runs converged on benchmark-recognition strategy (March 2026)
- **SWE-bench contamination:** Best score ~46% on Pro vs 81% on Verified; OpenAI dropped Verified Q1 2026
- **Devin evolution:** 13.86% (2024) → 45.8% (2026) on SWE-bench Verified, unassisted
- **Cursor Composer 2:** 73.7 SWE-bench Multilingual, 61.7 Terminal-Bench, +37% over Composer 1.5 on CursorBench
- **τ²-bench:** GPT-4o pass^8 < 25% on retail — most agents are *unstable*, not just inaccurate
- **Notion:** 70 engineers aligned via Braintrust; 3 → 30 issues addressed/day
- **Replit decision-time guidance:** ~90% cost reduction vs dynamic system-prompt modification
- **Industry shadow-testing (FutureAGI 2026):** 68% reduction in prod incidents; 78% Fortune 500 adoption
- **Klarna:** 2.3M chats month-one, 11min → <2min, 700 FTE-equivalent — then walked back AI-only for complex cases by 2025

## Sources (all fresh — no AI Dev SF / AI Agent NYC / BAIN material)

**Primary engineering / postmortems:**
- [Anthropic April 23 Postmortem](https://www.anthropic.com/engineering/april-23-postmortem) — *the hook*
- [Demystifying Evals for AI Agents (Anthropic)](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Eval Awareness in Claude Opus 4.6 BrowseComp](https://www.anthropic.com/engineering/eval-awareness-browsecomp)
- [Replit · Decision-Time Guidance](https://blog.replit.com/decision-time-guidance)
- [Cursor · Introducing Composer 2](https://cursor.com/blog/composer-2)
- [Composer 2 Technical Report (arXiv 2603.24477)](https://arxiv.org/abs/2603.24477)
- [Cognition · SWE-bench technical report](https://cognition.ai/blog/swe-bench-technical-report)

**Eval framework primary sources:**
- [Hamel Husain · LLM Evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- [Hamel Husain · LLM-as-a-Judge](https://hamel.dev/blog/posts/llm-judge/)
- [Eugene Yan · Task-Specific Evals](https://eugeneyan.com/writing/evals/)
- [Eugene Yan · LLM-Evaluators](https://eugeneyan.com/writing/llm-evaluators/)
- [Inspect AI · UK AISI](https://inspect.aisi.org.uk/)
- [agentevals (LangChain)](https://github.com/langchain-ai/agentevals)
- [DeepEval · Task Completion metric](https://deepeval.com/docs/metrics-task-completion)
- [RAGAS paper (arXiv 2309.15217)](https://arxiv.org/abs/2309.15217)
- [Justice or Prejudice (arXiv 2410.02736)](https://arxiv.org/abs/2410.02736)
- [τ-bench (arXiv 2406.12045)](https://arxiv.org/pdf/2406.12045)
- [τ²-bench (arXiv 2506.07982)](https://arxiv.org/pdf/2506.07982)
- [SWE-Bench Pro · Morph](https://www.morphllm.com/swe-bench-pro)

**Customer / case-study primaries (BAIN replacements):**
- [Braintrust · Notion case study](https://www.braintrust.dev/customers/notion)
- [Klarna case · LangChain blog](https://blog.langchain.com/customers-klarna/)
- [Rakuten case · LangChain blog](https://blog.langchain.com/customers-rakuten/)
- [Statsig · Shadow Testing for AI](https://www.statsig.com/perspectives/shadow-testing-ai-model-evaluation)
- [Microsoft Research · Agent-Pex](https://www.microsoft.com/en-us/research/project/agent-pex-automated-evaluation-and-testing-of-ai-agents/)

## Voice notes

- **Anchor flipped from BAIN to Anthropic April 23 postmortem.** Same article shape; stronger primary source. Recent (April 23, 2026), public, technically rich, and the team writing the canonical eval methodology shipped a 6-week regression. That's the irreplaceable story.
- **Klarna anchor (alt) for cost-economics framing.** The "2.3M chats month-one then walked back" arc shows what unmonitored eval drift looks like at scale.
- The "even Anthropic ships blind" framing is the line that travels on HN.

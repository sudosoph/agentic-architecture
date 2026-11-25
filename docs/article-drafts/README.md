# Article Drafts — research dossiers, ready to write from

These six dossiers are the output of a deep-research pass on 2026-05-07. Each one is hooks + outline + benchmark tables + paste-able code + citation list, sized so you can turn it into a finished HN/Reddit post in a single 2-4 hour writing session.

Order is not commitment — pick whichever you want to write first.

| # | File | Title | Difficulty | Strongest hook |
|---|---|---|---|---|
| 1 | `01-multi-agent-orchestration.md` | The Multi-Agent Orchestration Frontier in May 2026 | Medium | "AutoGen is dead, OpenAI's SDK is a walled garden, CrewAI ships 12M agent runs a day — but nobody runs one framework anymore" |
| 2 | `02-mixing-and-matching-models.md` | Mixing and Matching Open-Weight Models: A Recipe Book | Medium | "Three-tier mix: 84% reduction vs frontier-only, with quality drop under 2 percentage points" |
| 3 | `03-self-hosting-on-hetzner.md` | Self-Hosting the Full AI Stack on $5/mo Hetzner | Medium | "The CX22 pays for itself in the first 24 hours of every month" |
| 4 | `04-mcp-server-audit.md` | MCP Server Audit: Which Ones Actually Work in 2026 | High | "30 of 14,000 MCP servers are demonstrably production-ready" |
| 5 | `05-cost-quality-pareto.md` | Cost-Quality Pareto for Coding Agents (May 2026) | Medium | "Paying $5/task no longer gets you the frontier — and paying nothing comes within 11 points of the leader" |
| 6 | `06-eval-harness.md` | Building an Eval Harness That Catches Regressions | Medium | "BAIN's payroll agent went from 70% to 98% accuracy in 4 weeks — without changing the model" |

## Suggested writing order

If you want maximum HN ranking impact compounded over 4-6 weeks:

1. **Self-hosting on Hetzner (#3)** — write this WHILE you do the migration. Dogfood proof. Most viral angle.
2. **Cost-Quality Pareto (#5)** — chart article, fast to write once data is plotted.
3. **Mixing-and-Matching Models (#2)** — fits your cost-economics core.
4. **Multi-agent orchestration (#1)** — bigger writing lift but lands in the conference-takeaway sweet spot.
5. **MCP Audit (#4)** — community service piece, evergreen.
6. **Eval harness (#6)** — anchors The Sovereign Stack book pre-orders.

## Notes on freshness

All numbers in these dossiers are as of 2026-05-07. Benchmark scores, model release dates, and pricing change weekly. Before publishing, re-verify:
- SWE-bench Verified / Pro leaderboard positions
- API pricing (Anthropic, OpenAI, Fireworks, Together, Groq)
- GitHub star counts on the named OSS projects
- MCP registry size

## Voice rules (apply to all six)

- Direct, technical, Simon Willison-flavored. No corporate-speak.
- Real numbers > marketing claims. Cite primary sources.
- Acknowledge uncertainty (±25% on cost estimates, ±2pp on benchmarks).
- No fragment-emphasis ("Not aspirational. Last week.") — use complete sentences with embedded contrast.
- No em-dashes (per project article rules).
- Include 1-3 first-hand observations from AI Dev SF (April 28-29) or AI Agent Conference NYC (May 4-5) where they fit — irreplaceable color.

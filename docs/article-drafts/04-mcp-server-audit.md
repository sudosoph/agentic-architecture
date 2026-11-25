# Article Dossier · MCP Server Audit: Which Ones Actually Work in 2026

Status: research dossier (not yet written)
Last updated: 2026-05-07
Target: ~3,500 word HN/Reddit-tier reference article

---

## Hook + TL;DR

The Model Context Protocol turned 18 months old in May 2026. The public registry went from ~1,200 servers (Q1 2025) to **9,400+ in the official registry** and **~14,000 in PulseMCP's hand-curated index** — long tail >20,000 (Glama indexes 21,586). Anthropic donated MCP to the Linux Foundation's Agentic AI Foundation (AAIF) in December 2025 alongside Block and OpenAI. Current spec: **2025-11-25**. **MCP Apps (SEP-1865)** formalized in early 2026; stateless HTTP transport + async Tasks primitive in review.

**The TL;DR claim:** of those 14,000+ servers, fewer than ~50 are demonstrably production-ready. By "production-ready" I mean: company-backed, OAuth 2.1 with the discovery-trifecta RFCs (9728/8414/7591), 2026 release cadence, published security disclosure path, license that survives an enterprise procurement review.

Between January and February 2026 alone, security researchers filed **30+ CVEs** against MCP servers and infrastructure, including a CVSS 9.6 RCE in a package with ~500K downloads. **43% of disclosed vulnerabilities involved exec/shell injection.** Researchers successfully poisoned **9 of 11 MCP registries** with a test payload in early 2026 and confirmed code execution on 6 production platforms with paying customers.

The thesis: most of the ecosystem is vapor. Here are the ~30 you can actually trust.

## The MCP Landscape Map

### Spec governance
- **Steward:** Linux Foundation / Agentic AI Foundation (AAIF) since Dec 2025. Co-founded by Anthropic, Block, OpenAI.
- **Current spec:** `2025-11-25`
- **Schema:** TypeScript, in `modelcontextprotocol/specification` repo
- **Key 2026 additions:** MCP Apps (SEP-1865, Q1 2026), stateless HTTP transport (in review), async Tasks primitive (in review), formalized OAuth 2.1 with RFC 9728/8414/7591/8707.

### Reference servers (the official 7)
The `modelcontextprotocol/servers` repo (85.2k stars, Apache-2.0, last release Jan 27 2026) now contains only **7 reference servers**: Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, Time. README explicitly states these are "intended as reference implementations… **not production-ready**."

### The archived servers (this is the headline)
On **May 29, 2025**, Anthropic moved 14 reference servers to `modelcontextprotocol/servers-archived` with the warning **"NO SECURITY GUARANTEES ARE PROVIDED FOR THESE ARCHIVED SERVERS."**

The archived list: AWS KB Retrieval, Brave Search, EverArt, Git, GitHub, GitLab, Google Drive, Google Maps, **PostgreSQL**, **Puppeteer**, **Redis**, **Sentry**, **Slack**, **SQLite**.

If your config points at any of these from an old tutorial, you're running unmaintained code. They were replaced by either (a) vendor-official remote servers or (b) better community forks.

### Major MCP host implementations
| Host | Stars / installs | Config root | Notable |
|---|---|---|---|
| Claude Desktop | (closed) | `mcpServers` | Reference host |
| Cursor | (closed) | `mcpServers` | Same shape as Claude Desktop |
| **Cline** (VS Code ext) | **61.2k stars · 5M+ installs** | `cline.mcpServers` | Built-in MCP marketplace |
| Continue.dev | 31k stars | `~/.continue/config.json` | Pivoted to CLI-first PR checks |
| Zed | (open, ~50k+) | `context_servers` | Different key |
| GitHub Copilot / VS Code | (closed) | per VS Code settings | Native MCP since 2025 |
| Windsurf | (closed) | `mcpServers` | **CVE-2026-30615 (zero-click prompt injection)** — patch >1.9544.26 required |

### Major directories
- **modelcontextprotocol Registry** — official, ~9,400 servers as of mid-April 2026
- **PulseMCP** — 14,000+ hand-reviewed; quality filter
- **Smithery** — install/manage gateway, CLI publish
- **Glama** — 21,586 servers indexed, **2,223 proxied through their gateway** with managed OAuth + per-tool ACL
- **mcp.so**, **awesome-mcp-servers** (wong2), **Apify Store** — secondary

## The "Trusted 30" Production-Ready MCP Servers

| # | Server | Maintainer | Stars | Auth | License | Production signal |
|---|---|---|---|---|---|---|
| 1 | **modelcontextprotocol/servers** (Filesystem, Fetch, Git, Memory, Sequential Thinking, Time, Everything) | Anthropic / AAIF | 85.2k | local | Apache-2.0/MIT | **Reference quality, NOT prod-ready** by their own README |
| 2 | **github/github-mcp-server** | GitHub (Microsoft) | 29.6k | OAuth + PAT | MIT | v1.0.3 (Apr 24 '26), 23+ toolsets, lockdown/read-only modes, Go |
| 3 | **microsoft/playwright-mcp** | Microsoft | 32.1k | local | Apache-2.0 | v0.0.74, accessibility-snapshot driven, GH Actions CI, Docker |
| 4 | **microsoft/mcp** (Azure, AKS, MSSQL, Foundry, Dev Box, M365, Fabric, Sentinel, Clarity) | Microsoft | 3.1k | OAuth (Entra ID) | MIT | ~20 first-party Microsoft servers |
| 5 | **awslabs/mcp** (AWS API, Bedrock AgentCore, Core, etc.) | AWS Labs | (large) | IAM / OAuth via AgentCore | Apache-2.0 | Official AWS catalog; AgentCore Gateway 2-leg + 3-leg OAuth |
| 6 | **cloudflare/mcp** (single binary, 2,500+ Cloudflare API endpoints) | Cloudflare | 432 | OAuth 2.1 | Apache-2.0 | "Code Mode" reduces 244k → ~1k tokens; OAuth Provider Library |
| 7 | **atlassian/atlassian-mcp-server** (Jira/Confluence/Compass) | Atlassian | (remote-hosted) | OAuth 2.1 | proprietary remote | GA Feb 2026; per-user ACL. **Old `/v1/sse` endpoint deprecated June 30 2026** |
| 8 | **Linear MCP** (`mcp.linear.app/mcp`) | Linear | (remote-hosted) | OAuth | proprietary remote | First-party authenticated remote spec |
| 9 | **makenotion/notion-mcp-server** | Notion | (official) | OAuth | MIT | v2.0.0 migrated to Notion API 2025-09-03 with "data sources" abstraction |
| 10 | **Slack official remote MCP** | Salesforce/Slack | (remote-hosted) | OAuth | proprietary remote | **Warning:** doesn't work with Claude Code or GH Copilot due to OAuth/DCR (RFC 7591) incompat |
| 11 | **getsentry/sentry-mcp** | Sentry | 677 | OAuth | OS | Deployed at `mcp.sentry.dev` |
| 12 | **datadog-labs/mcp-server** | Datadog | (official) | OAuth | proprietary remote | GA March 10 2026; 16+ core tools + APM/Errors/FF/DBM/Security/LLM-Obs toolsets |
| 13 | **crystaldba/postgres-mcp** | Crystal DBA | 2,000+ | local (DB creds) | OS | **Last commit Jan 2026, 25 open issues from Apr 2025** — slowing |
| 14 | **exa-labs/exa-mcp-server** | Exa | 4.4k | API key | MIT | `mcp.exa.ai/mcp`; semantic search + Exa Deep (revamped Mar 2026) |
| 15 | **Brave Search MCP** | Brave | (official) | API key | MIT | 6 tools (web/image/video/news/local) |
| 16 | **Tavily MCP** | Tavily | (official) | API key | OS | Multi-step research-mode |
| 17 | **Perplexity MCP** | Perplexity | (official) | API key | OS | Cited synthesized answers |
| 18 | **Mem0 mem0-mcp-server** | Mem0 | (official, PyPI v0.2.1) | API key | Apache-2.0 | 9 MCP tools + lifecycle hooks; managed cloud + Mem0g (graph) |
| 19 | **Letta** (memory-OS, Letta Code) | Letta | (open-core) | API key | Apache-2.0 | Letta Code Mar 2026; core/archival/recall memory tiers |
| 20 | **HubSpot MCP** | HubSpot | (official) | OAuth | proprietary remote | First-party CRM, GA late 2025 |
| 21 | **Stripe MCP** | Stripe | (official) | restricted key | MIT | Read-only mode default |
| 22 | **Square / Block Goose MCP** | Block | (official) | OAuth | OS | Block is AAIF founder |
| 23 | **Replicate MCP** | Replicate | (official) | API key | MIT | Run models; predictable rate limits |
| 24 | **Fly.io MCP** | Fly | (official) | API token | OS | App management |
| 25 | **Vercel MCP** | Vercel | (official) | OAuth | proprietary remote | Project ops, env management |
| 26 | **Supabase MCP** | Supabase | (official) | service-role | Apache-2.0 | DB + auth + storage; warn on service-role exposure |
| 27 | **Neon MCP** | Neon | (official) | OAuth | OS | Branch-aware Postgres ops |
| 28 | **modelcontextprotocol/everything** (test/demo) | AAIF | (in main repo) | local | Apache-2.0 | MCP host conformance test target |
| 29 | **spences10/mcp-omnisearch** | community | community | per-provider keys | MIT | Single interface across Tavily/Brave/Kagi/Exa/Firecrawl |
| 30 | **microsoft/mcp-gateway** (Kubernetes reverse proxy + Entra ID) | Microsoft | (official) | OAuth | MIT | The "in-front-of-everything-else" enterprise piece |

## Top 5 picks for HN-flavored devs

In order of how often I'd actually reach for them:

1. **`github/github-mcp-server`** — Go, 29.6k stars, dual auth (OAuth + PAT), 23+ toolsets you can subset to reduce surface area. The `read-only` and `lockdown` modes are the rare case of an MCP server taking least privilege seriously.
2. **`microsoft/playwright-mcp`** — 32.1k stars, accessibility-snapshot architecture (token-efficient vs screenshot-based), Apache-2.0, headless Chromium in a container. Beats every other browser MCP.
3. **`crystaldba/postgres-mcp` (Postgres MCP Pro)** — actually does index tuning and EXPLAIN-plan analysis. 2,000+ stars. Pin a version (cadence slowing). Run against a read-replica.
4. **`cloudflare/mcp` "Code Mode"** — instead of registering 2,500 tools, registers **two** (`search` and `execute`) and lets the model navigate the API spec. **244k tokens → 1k tokens** for the same coverage. Read the source, then steal the pattern.
5. **`exa-labs/exa-mcp-server`** — 4.4k stars, semantic-first search with structured deep-research output. Pair with Brave for keyword fallback.

## The 5 biggest gotchas

1. **Tool poisoning + rug pull.** Invariant Labs published PoCs that exfiltrate SSH keys via malicious tool descriptions. Server returns clean tool defs on first connect (user approves), then mutates on later sessions. Mitigation: ETDI proposal (arXiv 2506.01333) pins tool definition hashes via OAuth-enhanced tool definitions.
2. **Exec/shell injection.** **43% of MCP CVEs in early 2026 were shell injection** — args piped into `bash -c`. If a server's source has `subprocess.run(..., shell=True)` or `child_process.exec()`, walk away.
3. **Marketplace poisoning.** Researchers poisoned **9 of 11 MCP registries** with a test payload (early 2026). Pin server packages by exact version + hash; don't auto-update from a registry.
4. **OAuth/DCR incompatibility.** Slack's official remote MCP requires registered app + admin approval — **doesn't work with Claude Code or GitHub Copilot** because those hosts don't yet implement RFC 7591 Dynamic Client Registration the way Slack expects.
5. **Archived "official" servers still in tutorials.** The 14 `servers-archived` repos are linked from thousands of stale tutorials. **Unmaintained, no security guarantees.**

## The 4-legged identity problem

Classic OAuth: 3-legged (user → client → resource server, with auth server as broker). MCP introduces a fourth principal: the **agent** sitting between user and MCP server, which itself sits between agent and underlying API.

> **User → Agent (LLM) → MCP Server → Downstream API**

### What's been solved (May 2026)
- **Discovery Trifecta** — RFC **9728** (Protected Resource Metadata, Apr 2025), RFC **8414** (Authorization Server Metadata), RFC **7591** (Dynamic Client Registration). Required by MCP spec for remote servers.
- **RFC 8707 (Resource Indicators)** — required to bind a token to a specific MCP server.
- **RFC 8693 (Token Exchange)** — gateway pattern: user token in, scoped delegation token out. Implemented by Cloudflare's OAuth Provider Library, AWS AgentCore Gateway, Stacklok's ToolHive, MintMCP, Composio.
- **Anthropic Managed Agents Vault** — credentials in Anthropic's dev console; per-session credential injection via proxy.

### What hasn't
- **Cross-server delegation.** When MCP server A's tool description tells the agent "ask MCP server B for X," no protocol-level way to bind A's intent to B's authorization. Heart of the rug-pull / cross-prompt-injection class.
- **Agent identity attestation.** No production-grade scheme for "this is Claude Sonnet 4.6 in this specific runtime."
- **Token-exchange UX.** RFC 8693 works, but consent UX for "agent X is requesting a delegation token scoped to tool Y on your behalf" is essentially nonexistent in MCP hosts.
- **Self-hosted vault parity.** Anthropic's vault is good; self-hosted equivalents (Infisical Agent Vault, HashiCorp Vault + glue, Stacklok ToolHive) require wiring.

### The "7591 problem"
Many enterprise IdPs (Okta legacy, on-prem ADFS, parts of Entra) don't support RFC 7591 Dynamic Client Registration. The moment Claude Desktop tries to connect to an enterprise MCP server through the IdP, registration fails. Single most common production blocker.

## If you're shipping today (May 2026)

- **Host:** Claude Desktop or Cursor for individuals; Cline for VS Code teams (5M+ installs is meaningful).
- **Filesystem + Git + Fetch + Memory + Time + Sequential Thinking:** the official 7 from `modelcontextprotocol/servers`. Local-only, sandboxed.
- **GitHub:** `github/github-mcp-server` in `read-only` by default.
- **Browser:** `microsoft/playwright-mcp` in a Docker container with no host-network.
- **Database:** `crystaldba/postgres-mcp` against a read-replica. Pin version.
- **Search:** Brave (keyword) + Exa (semantic). Skip Tavily/Perplexity unless you need their synthesis modes.
- **Observability:** Sentry MCP if you use Sentry; Datadog MCP if you use Datadog.
- **Issues/docs:** Linear (remote OAuth) > Atlassian (watch June 30 endpoint deprecation) > Notion (watch v2.0 data-sources migration).
- **Cloud:** Cloudflare's single MCP if on Workers; AWS Labs catalog on AWS; `microsoft/mcp` on Azure.
- **Don't run in prod:** anything <100 stars without company backing; anything in `servers-archived`; any Slack server that isn't paired with a host that supports RFC 7591; any server whose README has no security disclosure section.
- **Gateway in front of everything:** Glama (managed), Cloudflare's OAuth Provider Library, Microsoft MCP Gateway, or Stacklok ToolHive. Pick one.

The single biggest production win in 2026: **moving from local stdio MCP servers to remote OAuth-authenticated servers behind a gateway.** Audit logs, per-user scopes, rate limits, rug-pull detection, and one place to revoke.

## Sources

- [Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
- [modelcontextprotocol/servers-archived](https://github.com/modelcontextprotocol/servers-archived)
- [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io/)
- [PulseMCP statistics](https://www.pulsemcp.com/statistics)
- [Bloomberry: I analyzed 1400 MCP servers](https://bloomberry.com/blog/we-analyzed-1400-mcp-servers-heres-what-we-learned/)
- [DEV.to: State of MCP Server Security 2026](https://dev.to/ecap0/the-state-of-mcp-server-security-in-2026-118-findings-across-68-packages-4fkd)
- [The Register: MCP design flaw 200k servers (Apr 16, 2026)](https://www.theregister.com/2026/04/16/anthropic_mcp_design_flaw/)
- [Stack Overflow Blog: MCP authentication and authorization](https://stackoverflow.blog/2026/01/21/is-that-allowed-authentication-and-authorization-in-model-context-protocol/)
- [Invariant Labs: tool poisoning](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [arXiv 2506.01333 — ETDI: Mitigating Tool Squatting and Rug Pulls](https://arxiv.org/html/2506.01333v1)
- [github/github-mcp-server](https://github.com/github/github-mcp-server)
- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)
- [microsoft/mcp catalog](https://github.com/microsoft/mcp)
- [awslabs/mcp](https://github.com/awslabs/mcp)
- [cloudflare/mcp](https://github.com/cloudflare/mcp)
- [Cloudflare Agents docs — MCP authorization](https://developers.cloudflare.com/agents/model-context-protocol/authorization/)
- [getsentry/sentry-mcp](https://github.com/getsentry/sentry-mcp)
- [Datadog MCP — investor announcement (Mar 10, 2026)](https://investors.datadoghq.com/news-releases/news-release-details/datadog-launches-mcp-server-provide-ai-agents-secure-real-time)
- [atlassian/atlassian-mcp-server](https://github.com/atlassian/atlassian-mcp-server)
- [Linear MCP docs](https://linear.app/docs/mcp)
- [makenotion/notion-mcp-server](https://github.com/makenotion/notion-mcp-server)
- [crystaldba/postgres-mcp](https://github.com/crystaldba/postgres-mcp)
- [Anthropic Managed Agents — vault docs](https://platform.claude.com/docs/en/managed-agents/vaults)
- [Maverics: Your MCP Server Is a Resource Server Now](https://www.maverics.ai/blog/agentic-identity/your-mcp-server-is-a-resource-server-now-act-like-it/)
- [Stacklok: Token Delegation and MCP server orchestration](https://dev.to/stacklok/token-delegation-and-mcp-server-orchestration-for-multi-user-ai-systems-3gbi)
- [Permit.io: The Ultimate Guide to MCP Auth](https://www.permit.io/blog/the-ultimate-guide-to-mcp-auth)
- [MCP Manager: 2026 adoption statistics](https://mcpmanager.ai/blog/mcp-adoption-statistics/)
- [Cline GitHub (61.2k stars, 5M+ installs)](https://github.com/cline)

## Voice notes

- The "30 of 14,000" framing is the strongest hook. PulseMCP's 14k as the "real" denominator (hand-curated).
- May 29 2025 archival is the under-told story — Anthropic walking away from 14 of their own reference servers and pointing to vendor-official replacements is the moment the ecosystem grew up. Lead with this.
- Cloudflare "Code Mode" 244k → 1k token reduction is exactly the HN-bait technical detail that travels.
- 4-legged identity section will be most-cited by enterprise readers. Worth 600+ words with a diagram.

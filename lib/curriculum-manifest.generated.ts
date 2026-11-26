// AUTO-GENERATED: regenerated on every build via scripts/generate-curriculum-manifest.mjs
import type { ModuleFrontmatter } from './curriculum'

export const curriculumModules: Array<{
  slug: string
  frontmatter: ModuleFrontmatter
  html: string
  toc: { id: string; text: string }[]
}> = [
  {
    "slug": "1-1-2026-ai-landscape-model-matrix",
    "frontmatter": {
      "slug": "1-1-2026-ai-landscape-model-matrix",
      "curriculumId": "foundations",
      "moduleCode": "1.1",
      "title": "Where AI Actually Is Now & The Late-2026 Model Matrix",
      "summary": "Cut through benchmark theater across late-2026 frontier reasoning releases, high-throughput workhorses, permissive vs. ecosystem open-weight contenders, and unified local/sandbox workspaces like Claude Cowork.",
      "durationMinutes": 45,
      "unlocked": true,
      "artifact": "2026 Task-to-Model Routing Matrix & Cost-Per-Verified-Task Calculator",
      "learningOutcomes": [
        "Separate reasoning, high-throughput workhorse, multimodal, and open-weight model classes by task fit rather than leaderboard hype",
        "Evaluate late-2026 workspace shifts including Claude Enterprise unified Chat + Cowork local folder execution and governed .mcpb extensions",
        "Price workflows on cost-per-completed-verified-task instead of raw input token rates"
      ],
      "upsellBridge": "Mapping model choices across an entire leadership team? Bring Curriculum 01 live to your organization or book a 90-Minute Architecture Roadmap."
    },
    "html": "<h2 id=\"why-model-selection-changed-completely-in-late-2026\">Why Model Selection Changed Completely in Late 2026</h2>\n<p>Most teams still buy AI as if it were 2024: they pick a single chat subscription, paste miscellaneous questions into a browser window, and wonder why complex analytical work hallucinates while routine tasks cost ten times too much.</p>\n<p>Two structural shifts in late 2026 rewrote the playbook:</p>\n<ol>\n<li><strong>Chat and agentic workspaces merged.</strong> With releases such as Anthropic's unified <strong>Chat + Cowork</strong> architecture inside Claude Enterprise (combining everyday conversation, isolated cloud sandboxes, local directory access via Desktop MCP hosts, and single-click <code>.mcpb</code> extensions) alongside terminal/repo harnesses like Claude Code, OpenAI Codex, and OpenCode, models no longer just emit paragraphs. They read folders, run scripts, query databases, and return finished artifacts.</li>\n<li><strong>Open-weight models closed the workhorse gap.</strong> While frontier deliberative models still hold an edge on novel cross-domain synthesis, permissive open-weight releases in late 2026 handle 80% of structured extraction, classification, and routine code/ops turns at a fraction of closed API cost, or inside private boundaries where third-party cloud egress is off the table.</li>\n</ol>\n<h2 id=\"the-four-functional-model-tiers-and-what-to-use-for-what\">The Four Functional Model Tiers (And What to Use for What)</h2>\n<p>Stop asking <em>\"Which model is smartest?\"</em> Instead, classify every step of a business or engineering workflow into one of four operational tiers and measure <strong>cost per verified completed task</strong>:</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Tier</th>\n<th align=\"left\">Representative Late-2026 Models</th>\n<th align=\"left\">Typical API Rate (In / Out per 1M)</th>\n<th align=\"left\">Where It Wins</th>\n<th align=\"left\">Where It Wastes Money or Fails</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align=\"left\"><strong>Tier 1: Frontier Deep Reasoning</strong></td>\n<td align=\"left\"><code>GPT-6.2 Astra</code>, <code>Claude Fable 5.2</code>, <code>Gemini 4 Carbon</code></td>\n<td align=\"left\"><code>$3</code> to <code>$8</code> / <code>$15</code> to <code>$40</code></td>\n<td align=\"left\">Ambiguous legal/financial edge cases, multi-repo architecture specs, root-cause synthesis, adversarial red-teaming</td>\n<td align=\"left\">Routine classification, high-volume triage, or ungrounded creative writing without context files</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Tier 2: High-Throughput Enterprise Workhorse</strong></td>\n<td align=\"left\"><code>GPT-6.2 Sol</code>, <code>Gemini 4 Neon</code>, <code>Qwen 4 Max</code></td>\n<td align=\"left\"><code>$1.50</code> to <code>$3</code> / <code>$4.50</code> to <code>$15</code></td>\n<td align=\"left\">Multi-step tool orchestration, document synthesis, daily operator Cowork tasks, coding loops</td>\n<td align=\"left\">Paying Tier-1 prices when a clear schema + Tier-2 model hits 99% parity</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Tier 3: Ultra-Fast Adaptive Subagent</strong></td>\n<td align=\"left\"><code>Claude Haiku 5.5</code> (1M ctx), <code>Gemini 4 Hydrogen</code>, <code>DeepSeek V4.1-Flash-1017</code></td>\n<td align=\"left\"><code>$0.10</code> to <code>$1.50</code> / <code>$0.50</code> to <code>$7.50</code></td>\n<td align=\"left\">High-volume inbox/ticket routing, JSON schema extraction, parallel map-reduce scans over 500 documents</td>\n<td align=\"left\">Open-ended strategic planning without explicit rubric constraints</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>Tier 4: Self-Hosted / VPC Open Weights</strong></td>\n<td align=\"left\"><code>Qwen 3.8</code> / <code>Qwen 3.6-27B</code> (Apache 2.0), <code>DeepSeek V4.1</code> (MIT), <code>Mistral Large 4</code> (1T MoE), <code>Kimi K3.1 Pro</code> (2.8T)</td>\n<td align=\"left\">Hardware amortization or <code>$0.15</code> to <code>$0.80</code> hosted</td>\n<td align=\"left\">Zero-egress PHI/legal/M&#x26;A workloads, predictable flat-cost batch pipelines, local <code>OpenCode</code> / <code>vLLM</code> loops</td>\n<td align=\"left\">Running unquantized 2T+ weights without sizing memory bandwidth first</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"licensing-literacy-leaders-cannot-ignore\">Licensing Literacy Leaders Cannot Ignore</h2>\n<p>Not every \"open\" model carries the same commercial rights. Before an engineering or legal team deploys weights internally or inside a customer-facing product, verify the exact license class:</p>\n<ul>\n<li><strong>True Permissive Open Source (<code>Apache 2.0</code> / <code>MIT</code>):</strong> Models such as <code>Qwen 3.6-27B</code> / <code>Qwen 3.8</code> (<code>Apache 2.0</code>) and <code>DeepSeek V4.1</code> (<code>MIT</code>) permit unrestricted commercial internal use, fine-tuning, and product embedding.</li>\n<li><strong>Ecosystem / Revenue-Capped Open Weights:</strong> Late-2026 giants like <code>Kimi K3.1 Pro</code> (<code>2.8T</code> parameters) ship downloadable weights for <code>vLLM</code> and <code>llama.cpp</code>, yet carry specific Model-as-a-Service (MaaS) and commercial revenue-threshold clauses. Similarly, <code>Mistral Large 4</code> uses the Mistral Ecosystem Open-Weight license. Always match legal terms to whether your workload is internal operations versus commercial resale.</li>\n</ul>\n<h2 id=\"lab-exercise-audit-five-weekly-workflows-against-the-matrix\">Lab Exercise: Audit Five Weekly Workflows Against the Matrix</h2>\n<p>Take five recurring workflows in your company today and assign each sub-step to its lowest-cost reliable tier:</p>\n<ol>\n<li><strong>Ingest &#x26; Parse</strong> (Tier 3 fast model or dedicated OCR API)</li>\n<li><strong>Draft &#x26; Cross-Reference Against Company Rules</strong> (Tier 2 workhorse inside a workspace harness)</li>\n<li><strong>High-Stakes Exception Escalation</strong> (Tier 1 deep reasoning triggered <em>only</em> when confidence drops or contract value exceeds your threshold)</li>\n</ol>\n<p>That three-step cascade routinely cuts token and seat spend by <strong>65% to 84%</strong> while improving accuracy because frontier reasoning budget is concentrated strictly on hard edge cases.</p>",
    "toc": [
      {
        "id": "why-model-selection-changed-completely-in-late-2026",
        "text": "Why Model Selection Changed Completely in Late 2026"
      },
      {
        "id": "the-four-functional-model-tiers-and-what-to-use-for-what",
        "text": "The Four Functional Model Tiers (And What to Use for What)"
      },
      {
        "id": "licensing-literacy-leaders-cannot-ignore",
        "text": "Licensing Literacy Leaders Cannot Ignore"
      },
      {
        "id": "lab-exercise-audit-five-weekly-workflows-against-the-matrix",
        "text": "Lab Exercise: Audit Five Weekly Workflows Against the Matrix"
      }
    ]
  },
  {
    "slug": "1-2-privacy-shadow-ai-security",
    "frontmatter": {
      "slug": "1-2-privacy-shadow-ai-security",
      "curriculumId": "foundations",
      "moduleCode": "1.2",
      "title": "Privacy, Shadow AI & Infrastructure Security Tradeoffs",
      "summary": "Understand exactly what happens to company data across consumer chat, Claude Enterprise / 3P cloud gateways, zero-data-retention APIs, and private open-weight nodes.",
      "durationMinutes": 40,
      "unlocked": false,
      "artifact": "Green / Amber / Red Data-Tiering Matrix & Enterprise AI Boundary Checklist",
      "learningOutcomes": [
        "Distinguish consumer opt-out toggles, Enterprise SaaS plans, 3P cloud inference (Bedrock/Vertex/Foundry), Zero-Data-Retention (ZDR) APIs, and local open-weight compute",
        "Eliminate Shadow AI leaks without blocking staff productivity",
        "Audit local MCP extensions (.mcpb) and cloud-synced folder access on employee machines"
      ],
      "upsellBridge": "Need a formal HIPAA, SOC2, or board-level AI boundary audit? Scope a 2-Week Architecture Diagnostic on /fractional-ai-cto."
    },
    "html": "<h2 id=\"five-very-different-data-boundaries-vendors-blur-together\">Five Very Different Data Boundaries Vendors Blur Together</h2>\n<p>When a vendor says <em>\"We don't train on your data,\"</em> security review is only 20% finished. Retention for abuse monitoring, conversation history residency, local filesystem scopes, and sub-processor logs vary dramatically across five deployment modes:</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Deployment Mode</th>\n<th align=\"left\">Training Opt-Out</th>\n<th align=\"left\">Abuse / Trust-Safety Retention</th>\n<th align=\"left\">History Residency</th>\n<th align=\"left\">Appropriate Data Tier</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align=\"left\"><strong>1. Free / Consumer Plus Plans</strong></td>\n<td align=\"left\">Often opt-in by default</td>\n<td align=\"left\">30+ days human-reviewable logs</td>\n<td align=\"left\">Vendor consumer cloud</td>\n<td align=\"left\"><strong>Green Only:</strong> Public marketing copy, synthetic examples</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>2. Team / Enterprise SaaS (<code>Claude Enterprise</code>, <code>ChatGPT Enterprise</code>)</strong></td>\n<td align=\"left\">Contractual no-training</td>\n<td align=\"left\">Configurable retention windows + SSO/SCIM + <code>.mcpb</code> extension admin controls</td>\n<td align=\"left\">Vendor enterprise tenant</td>\n<td align=\"left\"><strong>Amber:</strong> Internal ops, SOPs, standard commercial workflows</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>3. Desktop Client over 3P Cloud (<code>Bedrock</code>, <code>Google Cloud</code>, <code>Foundry</code>)</strong></td>\n<td align=\"left\">Covered by existing cloud BAA / DPA</td>\n<td align=\"left\">Zero vendor abuse-log retention when ZDR enabled</td>\n<td align=\"left\">Local managed device + your cloud VPC</td>\n<td align=\"left\"><strong>Amber / Regulated Red:</strong> Healthcare BAA, enterprise finance, legal</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>4. Direct API with Zero Data Retention (<code>ZDR</code>)</strong></td>\n<td align=\"left\">Contractual zero training</td>\n<td align=\"left\">Zero payload persistence past HTTP response</td>\n<td align=\"left\">Your own Postgres / audit store</td>\n<td align=\"left\"><strong>Regulated Red:</strong> Bespoke internal harnesses &#x26; customer apps</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>5. Sovereign Self-Hosted / Local Open Weights (<code>vLLM</code>, <code>llama.cpp</code> over Tailscale)</strong></td>\n<td align=\"left\">Mathematically zero external egress</td>\n<td align=\"left\">Zero third-party packets</td>\n<td align=\"left\">100% inside your physical node or private VPS</td>\n<td align=\"left\"><strong>Strict Red:</strong> M&#x26;A, trade secrets, unredacted PHI/privileged files</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"new-late-2026-attack-surface-local-cowork--desktop-mcp-hosts\">New Late-2026 Attack Surface: Local Cowork &#x26; Desktop MCP Hosts</h2>\n<p>Giving desktop AI apps direct access to local folders unlocked massive productivity for non-coders, while introducing three concrete operational risks IT and founders must govern:</p>\n<ol>\n<li><strong>Over-broad folder mounts:</strong> Never mount <code>~/</code> or an entire shared company Google Drive root. Create a dedicated workspace folder containing only the project's active context and working files.</li>\n<li><strong>Unhydrated cloud-sync hangs &#x26; accidental syncs:</strong> Mounting OneDrive or Google Drive virtual directories can either stall local <code>stdio</code> MCP servers during bulk reads or sync unreviewed AI scratch files straight into shared client folders.</li>\n<li><strong>Ungoverned MCP servers:</strong> Require vetted <code>.mcpb</code> packages or explicit admin allowlists rather than copy-pasting random community <code>npx</code> commands that inherit developer environment variables.</li>\n</ol>\n<h2 id=\"replacing-20-page-legal-pdfs-with-a-1-page-green--amber--red-rule\">Replacing 20-Page Legal PDFs With a 1-Page Green / Amber / Red Rule</h2>\n<p>Employees use \"Shadow AI\" (personal accounts on phones or personal tabs) when IT blocks everything without providing an approved path. Publish a single-page traffic-light table naming the exact approved tool for Green, Amber, and Red data so staff move fast inside safe walls.</p>",
    "toc": [
      {
        "id": "five-very-different-data-boundaries-vendors-blur-together",
        "text": "Five Very Different Data Boundaries Vendors Blur Together"
      },
      {
        "id": "new-late-2026-attack-surface-local-cowork--desktop-mcp-hosts",
        "text": "New Late-2026 Attack Surface: Local Cowork &#x26; Desktop MCP Hosts"
      },
      {
        "id": "replacing-20-page-legal-pdfs-with-a-1-page-green--amber--red-rule",
        "text": "Replacing 20-Page Legal PDFs With a 1-Page Green / Amber / Red Rule"
      }
    ]
  },
  {
    "slug": "1-3-productive-friction-interview-skills",
    "frontmatter": {
      "slug": "1-3-productive-friction-interview-skills",
      "curriculumId": "foundations",
      "moduleCode": "1.3",
      "title": "Productive Friction: Interview-First AI, Process Extraction & Codifying Skills",
      "summary": "Eliminate ad-hoc prompting hallucinations by engineering Socratic interview harnesses, MCP Elicitation flows, and reusable SKILL.md and Rule folders that extract unwritten expertise.",
      "durationMinutes": 55,
      "unlocked": false,
      "artifact": "Portable Interview-First SKILL.md Pack + Unwritten Process Extraction Protocol",
      "learningOutcomes": [
        "Replace lazy 1-line ad-hoc prompts with Intentional Productive Friction that interviews the user before generating",
        "Use Socratic AI interviews to extract tribal SOPs from senior operators in 20 minutes",
        "Package durable organizational instructions into open-standard SKILL.md folders and workspace rules"
      ],
      "upsellBridge": "Want your leadership and functional teams trained live to codify company-wide Skills? Explore Half-Day and Full-Day Corporate Labs on /teaching."
    },
    "html": "<h2 id=\"why-ad-hoc-prompting-manufactures-hallucinations\">Why Ad-Hoc Prompting Manufactures Hallucinations</h2>\n<p>Watch how most employees use AI at work: they type <em>\"Draft a Q4 vendor renewal negotiation memo for Acme\"</em> or <em>\"Scope a client onboarding plan\"</em> in twelve words.</p>\n<p>Because language models are trained to be helpful immediately, <strong>an under-specified prompt forces the model to invent the missing 85% of reality</strong>: your pricing floors, legal walk-away clauses, historical margin targets, and stakeholder politics. People call the result a \"hallucination,\" when in reality it is <strong>unconstrained guesswork caused by zero intake friction</strong>.</p>\n<h2 id=\"the-principle-of-productive-friction-interview-first-architecture\">The Principle of Productive Friction (Interview-First Architecture)</h2>\n<p>High-reliability AI systems flip the interaction pattern. Instead of generating on Turn 1, the system enforces <strong>Productive Friction</strong>:</p>\n<ol>\n<li><strong>Audit missing context against a required schema.</strong></li>\n<li><strong>Interview and prod the human first</strong> (3 to 5 sharp, multiple-choice or targeted Socratic questions, challenging vague assumptions).</li>\n<li><strong>Confirm constraints and edge cases explicitly.</strong></li>\n<li><strong>Only then execute against codified rules and templates.</strong></li>\n</ol>\n<p>In late 2026, this pattern became first-class across both open-standard <strong><code>SKILL.md</code> directories</strong> (portable instruction + script + reference folders) and protocol-level <strong>MCP <code>Elicitation</code></strong> (where an MCP server pauses tool execution to request structured clarification from the human operator).</p>\n<h2 id=\"copy-paste-template-the-socratic-intake--process-extraction-skill\">Copy-Paste Template: The Socratic Intake &#x26; Process Extraction Skill</h2>\n<p>Save this reusable <code>SKILL.md</code> inside any Claude Cowork, Claude Code, OpenCode, or workspace project folder to turn undocumented tribal knowledge into repeatable SOPs:</p>\n<pre><code class=\"language-markdown\">---\nname: socratic-process-architect\ndescription: Interviews a subject-matter expert before drafting any deliverable or SOP, surfacing edge cases, failure modes, and hard business boundaries.\n---\n\n# Socratic Process &#x26; Deliverable Architect\n\n## Hard Gate (Never Skip)\nDo NOT draft the final document, policy, contract memo, or workflow on your first turn.\n\n## Step 1: Diagnostic Interview (One Focused Round)\nInspect the user's request against existing workspace files, then ask 3 to 5 specific questions covering:\n1. **Success &#x26; Failure Definition:** What specific error would make this output unusable or embarrassing in front of a client, CFO, or regulator?\n2. **Hard Thresholds:** What dollar caps, timeline SLAs, or non-negotiable terms apply?\n3. **The 10% Edge Case:** Walk me through the last time this process went sideways in real life. What signal warned you?\n4. **Approval Boundary:** Which actions stay strictly draft-only for human sign-off?\n\n## Step 2: Play Back &#x26; Codify\nSummarize the extracted rules in 6 bullet points. Once confirmed, generate:\n1. The requested deliverable grounded strictly in stated facts (marking any unknown `[NEEDS VERIFICATION]`).\n2. A reusable `rules/&#x3C;workflow-name>.md` checklist so nobody has to re-explain these rules next week.\n</code></pre>\n<h2 id=\"using-interview-harnesses-to-document-your-company-in-one-week\">Using Interview Harnesses to Document Your Company in One Week</h2>\n<p>Have each department lead (Sales, Finance, Legal, Delivery) spend <strong>25 minutes</strong> being interviewed by this skill while walking through one recurring task. By Friday, your company owns documented, machine-readable operating playbooks that previously lived only inside senior employees' heads.</p>",
    "toc": [
      {
        "id": "why-ad-hoc-prompting-manufactures-hallucinations",
        "text": "Why Ad-Hoc Prompting Manufactures Hallucinations"
      },
      {
        "id": "the-principle-of-productive-friction-interview-first-architecture",
        "text": "The Principle of Productive Friction (Interview-First Architecture)"
      },
      {
        "id": "copy-paste-template-the-socratic-intake--process-extraction-skill",
        "text": "Copy-Paste Template: The Socratic Intake &#x26; Process Extraction Skill"
      },
      {
        "id": "using-interview-harnesses-to-document-your-company-in-one-week",
        "text": "Using Interview Harnesses to Document Your Company in One Week"
      }
    ]
  },
  {
    "slug": "1-4-agentic-workspaces-for-non-coders",
    "frontmatter": {
      "slug": "1-4-agentic-workspaces-for-non-coders",
      "curriculumId": "foundations",
      "moduleCode": "1.4",
      "title": "Agentic Workspaces & Process Automation Without Writing Code",
      "summary": "How non-engineers safely run file-and-folder agentic workspaces (Claude Cowork, Claude Code, Cursor, MCP connectors, and visual webhooks) over spreadsheets, docs, and calendars.",
      "durationMinutes": 50,
      "unlocked": false,
      "artifact": "Folder-Based Workspace Blueprint + 5-Level Human Approval Gate Spec",
      "learningOutcomes": [
        "Operate folder-native agentic workspaces without knowing Python or command-line plumbing",
        "Combine deterministic workspace connectors (Calendar, Docs, Sheets, Gmail Drafts) with codified Skills",
        "Enforce Level-2 Draft-First approval gates on every external communication or financial record"
      ],
      "upsellBridge": "Want live weekly feedback installing 6 workspace automations alongside your EA or Ops Lead? Join the $1,497 Guided Cohort on /accelerator."
    },
    "html": "<h2 id=\"the-biggest-secret-in-2026-ai-coding-agents-are-actually-general-work-engines\">The Biggest Secret in 2026 AI: \"Coding Agents\" Are Actually General Work Engines</h2>\n<p>For two years, non-technical founders, GMs, Chiefs of Staff, and analysts assumed tools like <code>Claude Code</code>, <code>Cursor</code>, and local MCP workspaces were strictly for software engineers.</p>\n<p>In late 2026, with unified <strong>Chat + Cowork</strong> desktop workspaces and visual folder workspaces, any operator who can organize files in a folder can run a multi-step agentic system. Why? Because business work <em>is</em> structured text and tables: CSV exports, vendor PDFs, meeting transcripts, Markdown policies, and email drafts.</p>\n<h2 id=\"folder-architecture-for-non-engineers\">Folder Architecture for Non-Engineers</h2>\n<p>Instead of scattering context across fifty browser tabs, structure a clean local or cloud-synced project directory:</p>\n<pre><code class=\"language-text\">company-ops-workspace/\n  AGENTS.md                  # Global ground rules, refusal boundaries, tone\n  skills/\n    socratic-intake/SKILL.md # Interviews user before drafting proposals\n    vendor-audit/SKILL.md    # Compares invoices against contracted rates\n  rules/\n    pricing-and-slas.md      # Approved tiers, discount floors, payment terms\n    data-classification.md   # Green / Amber / Red boundary rules\n  inbox-staging/             # Incoming transcripts, CSVs, or RFPs to process\n  deliverables-drafts/       # Human-reviewed outputs before sending\n</code></pre>\n<h2 id=\"enforcing-the-5-level-autonomy-standard\">Enforcing the 5-Level Autonomy Standard</h2>\n<p>Never jump from manual work straight to unattended execution. Assign an explicit autonomy level to every connected tool:</p>\n<ol>\n<li><strong>Level 1 (Read &#x26; Synthesize):</strong> Summarize, compare, and flag anomalies across files with zero external writes.</li>\n<li><strong>Level 2 (Stage in Drafts - The Default Sweet Spot):</strong> Prepare the full proposal, spreadsheet audit, or <code>create-draft</code> email reply, pausing for a 15-second human inspection and Send click.</li>\n<li><strong>Level 3 (Scoped Internal Write):</strong> Update internal CRM notes, Slack triage channels, or task boards automatically with full undo logs.</li>\n<li><strong>Level 4 (Threshold-Gated External Action):</strong> Auto-confirm routine scheduling or low-dollar renewals strictly below a hardcoded cap; route everything else to Level 2.</li>\n<li><strong>Level 5 (Closed-Loop Verified Execution):</strong> Reserved exclusively for pipelines backed by deterministic pass/fail verifiers and cost circuit breakers.</li>\n</ol>",
    "toc": [
      {
        "id": "the-biggest-secret-in-2026-ai-coding-agents-are-actually-general-work-engines",
        "text": "The Biggest Secret in 2026 AI: \"Coding Agents\" Are Actually General Work Engines"
      },
      {
        "id": "folder-architecture-for-non-engineers",
        "text": "Folder Architecture for Non-Engineers"
      },
      {
        "id": "enforcing-the-5-level-autonomy-standard",
        "text": "Enforcing the 5-Level Autonomy Standard"
      }
    ]
  },
  {
    "slug": "1-5-org-upskilling-ending-productivity-hoarding",
    "frontmatter": {
      "slug": "1-5-org-upskilling-ending-productivity-hoarding",
      "curriculumId": "foundations",
      "moduleCode": "1.5",
      "title": "Running More of Your Org on AI: Upskilling Strategy & Ending Productivity Hoarding",
      "summary": "Solve the #1 behavioral bottleneck in corporate AI adoption ('productivity hoarding'), redesign team incentives, and run a measurable 90-day upskilling operating rhythm.",
      "durationMinutes": 40,
      "unlocked": false,
      "artifact": "90-Day Organizational AI Upskilling & Incentive Charter",
      "learningOutcomes": [
        "Diagnose and eliminate employee 'productivity hoarding' caused by replacement anxiety",
        "Move teams from passive lunch-and-learns to shared departmental Skill libraries",
        "Run a monthly 45-minute AI Operating Review tracking throughput, error rates, and cycle times"
      ],
      "upsellBridge": "Rolling this charter out across 15 to 250+ employees? Book a Corporate Enablement Lab (/teaching) or Fractional CAIO call (/fractional-ai-cto)."
    },
    "html": "<h2 id=\"why-75-of-enterprise-seat-rollouts-stall-productivity-hoarding\">Why 75% of Enterprise Seat Rollouts Stall: \"Productivity Hoarding\"</h2>\n<p>Across mid-market and enterprise rollouts, leadership buys AI licenses, runs a 60-minute \"Intro to Prompting\" webinar, and sees flat P&#x26;L impact three months later.</p>\n<p>Often, individual employees <em>are</em> saving four hours a week, <strong>and deliberately hiding it</strong>. When workers fear that admitting a task now takes 15 minutes instead of 4 hours will trigger headcount cuts or piled-on busywork, they keep their prompts private. Organizational capability stays at zero.</p>\n<h2 id=\"three-structural-fixes-that-unlock-shared-adoption\">Three Structural Fixes That Unlock Shared Adoption</h2>\n<ol>\n<li><strong>Reward Contributed <code>Skills</code>, Not Secret Time Saved:</strong> Make promoting a tested workflow or <code>SKILL.md</code> into the team's shared repository a visible career and bonus multiplier, exactly like an engineer contributing reusable internal tooling.</li>\n<li><strong>Guarantee Capacity Reinvestment:</strong> State clearly from the CEO/COO seat what reclaimed hours fund: higher client touch, faster deal turnaround, eliminating weekend fire drills, or expanding revenue per team without burnout.</li>\n<li><strong>Replace Generic Training With Functional Build Sprints:</strong> Never put Legal, Finance, Marketing, and Engineering in the same generic \"ChatGPT 101\" lecture. Train shared core foundations (Modules 1.1 to 1.3) in 90 minutes, then split immediately into department-specific workflow labs where every participant ships one governed artifact on real work.</li>\n</ol>\n<h2 id=\"the-90-day-ai-operating-cadence\">The 90-Day AI Operating Cadence</h2>\n<ul>\n<li><strong>Days 1 to 30 (Audit &#x26; Guardrails):</strong> Publish the 1-page Green/Amber/Red data policy, select 1 flagship process per department, and run Socratic extraction interviews to document tribal rules.</li>\n<li><strong>Days 31 to 60 (Pilot &#x26; Golden Rubric):</strong> Wire Level-2 Draft-First workflows in each department and test against 25 historical cases before broadening access.</li>\n<li><strong>Days 61 to 90 (Shared Skill Repo &#x26; FinOps Review):</strong> Consolidate working <code>Skills</code> into a versioned company library, cancel redundant SaaS point tools, and track <strong>cycle-time compression</strong> (for example: <em>RFP turnaround cut from 4 days to 3 hours</em>) rather than self-reported time surveys.</li>\n</ul>",
    "toc": [
      {
        "id": "why-75-of-enterprise-seat-rollouts-stall-productivity-hoarding",
        "text": "Why 75% of Enterprise Seat Rollouts Stall: \"Productivity Hoarding\""
      },
      {
        "id": "three-structural-fixes-that-unlock-shared-adoption",
        "text": "Three Structural Fixes That Unlock Shared Adoption"
      },
      {
        "id": "the-90-day-ai-operating-cadence",
        "text": "The 90-Day AI Operating Cadence"
      }
    ]
  },
  {
    "slug": "2-1-vertical-ai-build-vs-buy-framework",
    "frontmatter": {
      "slug": "2-1-vertical-ai-build-vs-buy-framework",
      "curriculumId": "departments",
      "moduleCode": "2.1",
      "title": "The Vertical AI Build-vs-Buy Framework & Enterprise Interoperability",
      "summary": "How to evaluate multi-billion-dollar vertical AI platforms (Harvey, Legora, Sierra, Ramp, Glean) versus 'Build-With' SDKs versus lean bespoke API harnesses that keep your data layer unified.",
      "durationMinutes": 45,
      "unlocked": true,
      "artifact": "2026 Vertical AI vs. Build-With vs. Bespoke In-House Decision Scorecard",
      "learningOutcomes": [
        "Move beyond binary Build-vs-Buy into the 2026 3-tier model: Buy Vertical Compliance, Build-With Agent OS, or Compose Bespoke In-House",
        "Spot thin $50/seat SaaS wrappers before signing annual enterprise contracts",
        "Prevent the 'Six New AI Silos' trap where Marketing, Sales, Finance, and Legal bots cannot share context"
      ],
      "upsellBridge": "Evaluating vendor contracts or designing cross-department interoperability? Scope a 2-Week Architecture & FinOps Diagnostic on /fractional-ai-cto."
    },
    "html": "<h2 id=\"why-binary-build-vs-buy-broke-down-in-2026\">Why Binary \"Build vs. Buy\" Broke Down in 2026</h2>\n<p>Two forces collided across enterprise software in 2026:</p>\n<ol>\n<li>Frontier and open-weight inference prices fell precipitously while agentic coding harnesses made spinning up internal tools 5x faster.</li>\n<li>At the same time, mature vertical platforms (<code>Harvey</code> and <code>Legora</code> in legal, <code>Sierra</code> in customer operations, <code>Ramp</code> in spend/finance, <code>Glean</code> in enterprise search) proved that compliance certifications (<code>SOC2 Type II</code>, <code>ISO 42001</code>), domain-curated reference corpora, and embedded Forward Deployed support carry real value.</li>\n</ol>\n<p>Smart leaders no longer ask <em>\"Do we build everything or buy everything?\"</em> They segment every capability across <strong>three distinct tiers</strong>:</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Strategy</th>\n<th align=\"left\">When It Wins</th>\n<th align=\"left\">Canonical 2026 Examples</th>\n<th align=\"left\">Red Flag to Avoid</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align=\"left\"><strong>1. Buy Mature Vertical AI</strong></td>\n<td align=\"left\">Heavy regulatory/compliance transfer, proprietary external legal/tax/market databases, commodity back-office plumbing needed live this quarter</td>\n<td align=\"left\"><code>Ramp</code> (spend &#x26; AP audit), <code>Harvey</code> / <code>Legora</code> (Am Law &#x26; high-volume corporate legal), <code>Glean</code> (cross-app enterprise search index)</td>\n<td align=\"left\">Buying a \"vertical AI\" startup that has zero proprietary data moat and simply wraps a single frontier API prompt at a 10x per-seat markup</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>2. \"Build With\" Managed Agent OS</strong></td>\n<td align=\"left\">Customer-facing multi-turn agents where you want managed voice/guardrail/observability infrastructure while owning 100% of business logic &#x26; brand rules</td>\n<td align=\"left\"><code>Sierra</code> Agent OS + SDK, cloud enterprise gateways (<code>Bedrock</code> / <code>Vertex</code> + internal MCP servers)</td>\n<td align=\"left\">Letting vendor professional services lock your core domain rules inside proprietary visual flowcharts you cannot export</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>3. Build Bespoke In-House Harnesses</strong></td>\n<td align=\"left\">Workflows that encode your core competitive IP, cross multiple internal systems, or run 10x cheaper over direct APIs + open weights</td>\n<td align=\"left\">Custom <code>MCP</code> + <code>n8n</code>/TypeScript harnesses connecting CRM, Postgres, OCR, Search, and codified <code>SKILL.md</code> rules</td>\n<td align=\"left\">Building custom observability, SSO, or OCR parsers from scratch instead of snapping together best-of-breed primitives</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"avoiding-the-six-disconnected-ai-silos-trap\">Avoiding the \"Six Disconnected AI Silos\" Trap</h2>\n<p>The single costliest enterprise mistake in 2026 is letting Marketing buy 3 AI SaaS apps, Sales buy 2, Legal buy 1, and Finance buy 2, <strong>each trapping company context inside a walled garden that cannot talk to the others</strong>.</p>\n<p>Enforce <strong>two non-negotiable procurement rules</strong> before signing any vertical AI contract:</p>\n<ol>\n<li><strong>API &#x26; MCP Interoperability Required:</strong> Every vendor tool must expose clean webhooks/REST APIs (or an MCP server) so upstream and downstream systems can read structured outputs programmatically.</li>\n<li><strong>Portable Context &#x26; Zero Lock-In Exit Clause:</strong> Your prompts, evaluation rubrics, clause playbooks, and historical traces belong to your company in exportable JSON/Markdown, never held hostage on renewal day.</li>\n</ol>",
    "toc": [
      {
        "id": "why-binary-build-vs-buy-broke-down-in-2026",
        "text": "Why Binary \"Build vs. Buy\" Broke Down in 2026"
      },
      {
        "id": "avoiding-the-six-disconnected-ai-silos-trap",
        "text": "Avoiding the \"Six Disconnected AI Silos\" Trap"
      }
    ]
  },
  {
    "slug": "2-2-marketing-brand-growth-systems",
    "frontmatter": {
      "slug": "2-2-marketing-brand-growth-systems",
      "curriculumId": "departments",
      "moduleCode": "2.2",
      "title": "AI in Marketing, Brand & Revenue Growth Systems",
      "summary": "Separate thin AI copywriting wrappers from high-ROI research, SEO/GEO intelligence, interview-driven content engines, and multi-model creative pipelines.",
      "durationMinutes": 45,
      "unlocked": false,
      "artifact": "Marketing AI Stack Map + Interview-Driven Omnichannel Content Skill",
      "learningOutcomes": [
        "Identify which vertical marketing/SEO platforms justify their subscription versus thin wrappers that produce generic slop",
        "Engineer an Interview-First voice-note/brief-to-omnichannel harness grounded in real customer calls and primary research",
        "Detect AI-bot engagement noise and focus distribution on high-intent buyer channels"
      ],
      "upsellBridge": "Want a custom multi-channel research and content engine built inside your own workspace? Scope a Forward Deployed Build on /work-with-me."
    },
    "html": "<h2 id=\"why-90-of-ai-marketing-saas-hurts-brand-equity\">Why 90% of \"AI Marketing SaaS\" Hurts Brand Equity</h2>\n<p>Buying a <code>$99/month</code> \"1-click AI blog and LinkedIn generator\" produces the exact median phrasing your buyers have trained their eyes to skip, and triggers anti-slop classifiers across search engines and newsletter networks.</p>\n<h2 id=\"marketing-build-vs-buy-breakdown\">Marketing Build-vs-Buy Breakdown</h2>\n<ul>\n<li><strong>Worth Buying / Connecting:</strong> Primary search, SERP, and competitive intelligence data APIs (<code>Semrush</code>, <code>Ahrefs</code>, <code>Tavily</code> / <code>Exa</code> live research), design/video asset infrastructure where human art direction stays in control, and verified analytics/attribution (<code>PostHog</code>, <code>Umami</code>).</li>\n<li><strong>Skip &#x26; Build Bespoke In-House:</strong> Generic \"AI brand copywriters,\" automated social comment bots (which destroy executive trust in seconds), and rigid content-repurposing SaaS wrappers.</li>\n</ul>\n<h2 id=\"architecture-of-an-in-house-interview-driven-content-harness\">Architecture of an In-House Interview-Driven Content Harness</h2>\n<ol>\n<li><strong>Signal Ingestion:</strong> Pull real customer discovery questions from call transcripts, support tickets, and curated industry RSS/forum radars.</li>\n<li><strong>Productive-Friction Author Interview (10 Mins):</strong> Before drafting a word, an interview skill asks your subject-matter expert 4 sharp questions to extract one contrarian point of view, one real number or scar, and one concrete trade-off.</li>\n<li><strong>Multi-Format Compilation + Human Polish:</strong> Compile the long-form canonical essay, newsletter edition, and platform-native summaries against strict style rules (zero cliches, real citations), staging drafts for human cold-open writing and final approval.</li>\n</ol>",
    "toc": [
      {
        "id": "why-90-of-ai-marketing-saas-hurts-brand-equity",
        "text": "Why 90% of \"AI Marketing SaaS\" Hurts Brand Equity"
      },
      {
        "id": "marketing-build-vs-buy-breakdown",
        "text": "Marketing Build-vs-Buy Breakdown"
      },
      {
        "id": "architecture-of-an-in-house-interview-driven-content-harness",
        "text": "Architecture of an In-House Interview-Driven Content Harness"
      }
    ]
  },
  {
    "slug": "2-3-finance-fpa-deterministic-harnesses",
    "frontmatter": {
      "slug": "2-3-finance-fpa-deterministic-harnesses",
      "curriculumId": "departments",
      "moduleCode": "2.3",
      "title": "AI in Finance, FP&A & Procurement Operations",
      "summary": "Why naked LLMs must never compute financial numbers, how to pair deterministic Python/SQL/spreadsheet harnesses with OCR extraction, and where vertical tools like Ramp win.",
      "durationMinutes": 45,
      "unlocked": false,
      "artifact": "Deterministic Finance Reconciliation Harness Spec + Vendor Spend Audit Checklist",
      "learningOutcomes": [
        "Enforce the Golden Rule of Finance AI: models extract schemas and write queries; deterministic code executes every calculation",
        "Combine layout-aware OCR with contract/PO tables for 3-way invoice reconciliation",
        "Decide between vertical spend platforms (Ramp-class) and bespoke FP&A variance harnesses"
      ],
      "upsellBridge": "Need automated invoice/contract reconciliation or an enterprise SaaS OpEx teardown? Book an Executive Scoping Call on /fractional-ai-cto."
    },
    "html": "<h2 id=\"the-golden-rule-of-financial-ai-zero-naked-token-arithmetic\">The Golden Rule of Financial AI: Zero Naked Token Arithmetic</h2>\n<p>Never ask an LLM to sum 400 rows of an accounts-payable CSV or calculate cohort net revenue retention inside raw token generation. Even top reasoning models drop rows or round silently mid-context.</p>\n<p><strong>In Finance and FP&#x26;A, the model's job is strictly translation and anomaly interrogation, never arithmetic:</strong></p>\n<ul>\n<li><strong>Unstructured -> Structured:</strong> Layout-aware OCR + schema extraction turns messy vendor PDFs, MSAs, and SOWs into typed JSON rows with exact page/bounding-box citations.</li>\n<li><strong>Question -> Deterministic Code/Query:</strong> The agent writes a SQL query, Python <code>pandas</code>/<code>polars</code> script, or audited spreadsheet formula inside a sandboxed interpreter; the deterministic runtime computes the exact cent-accurate result.</li>\n<li><strong>Variance -> Socratic Investigation:</strong> Once deterministic code flags a <code>>8%</code> spend variance or duplicate billing line, the model cross-references the underlying contract terms and drafts an inquiry for controller review.</li>\n</ul>\n<h2 id=\"finance-vertical-ai-vs-bespoke-builds\">Finance Vertical AI vs. Bespoke Builds</h2>\n<ul>\n<li><strong>Buy Off-the-Shelf:</strong> Corporate card, automated receipt matching, bill-pay, and real-time spend controls (<code>Ramp</code>-class platforms where payment rails + vendor price benchmarks are bundled).</li>\n<li><strong>Build Bespoke In-House:</strong> Custom board-pack variance narratives tied to your ERP + CRM definitions, multi-entity revenue-recognition pre-checks, and quarterly SaaS license utilization audits comparing SSO login logs against contracted seat counts.</li>\n</ul>",
    "toc": [
      {
        "id": "the-golden-rule-of-financial-ai-zero-naked-token-arithmetic",
        "text": "The Golden Rule of Financial AI: Zero Naked Token Arithmetic"
      },
      {
        "id": "finance-vertical-ai-vs-bespoke-builds",
        "text": "Finance Vertical AI vs. Bespoke Builds"
      }
    ]
  },
  {
    "slug": "2-4-legal-contracts-confidential-redlining",
    "frontmatter": {
      "slug": "2-4-legal-contracts-confidential-redlining",
      "curriculumId": "departments",
      "moduleCode": "2.4",
      "title": "AI in Legal, Contracts & Compliance",
      "summary": "Deploy high-friction clause playbooks, mandatory source-span citations, zero-retention or private open-weight boundaries, and weigh Harvey/Legora against lean internal legal harnesses.",
      "durationMinutes": 50,
      "unlocked": false,
      "artifact": "Contract Redlining Clause Playbook & Mandatory Citation Harness",
      "learningOutcomes": [
        "Evaluate enterprise legal platforms (Harvey, Legora) versus bespoke clause-playbook harnesses for mid-market legal teams",
        "Eliminate fabricated citations and missed indemnity traps using span-grounded extraction and productive friction",
        "Configure zero-data-retention or private open-weight boundaries to preserve confidentiality and privilege"
      ],
      "upsellBridge": "Equipping a legal, healthcare, or regulated compliance team? Explore private workshops and sovereign architecture on /fractional-ai-cto."
    },
    "html": "<h2 id=\"legal-ais-real-value-consistency-against-your-playbook-not-freeform-lawyering\">Legal AI's Real Value: Consistency Against Your Playbook, Not Freeform Lawyering</h2>\n<p>General counsel and commercial legal teams get burned when staff ask a generic chatbot <em>\"Review this MSA for issues.\"</em> Without your company's exact fallback positions, liability caps, governing-law preferences, and IP ownership rules, a generic review flags harmless boilerplate while missing a toxic uncapped indemnification clause.</p>\n<h2 id=\"weighing-harvey--legora-against-bespoke-playbook-harnesses\">Weighing <code>Harvey</code> &#x26; <code>Legora</code> Against Bespoke Playbook Harnesses</h2>\n<ul>\n<li><strong>When <code>Harvey</code> or <code>Legora</code> Justifies Enterprise Spend:</strong> Large law firms and global legal departments processing thousands of multi-jurisdiction matters that need bundled authoritative legal research corpora, Word add-in redlining UX, <code>ISO 42001</code> / <code>SOC2 Type II</code> vendor risk transfer, and embedded vendor deployment support.</li>\n<li><strong>When a Bespoke Clause Harness Wins at 1/10th the Cost:</strong> In-house legal, procurement, and RevOps teams reviewing recurring NDAs, SaaS vendor DPAs, customer MSAs, and clinical/partner agreements against <strong>15 to 40 well-defined company positions</strong>.</li>\n</ul>\n<h2 id=\"designing-a-zero-hallucination-contract-triage-harness\">Designing a Zero-Hallucination Contract Triage Harness</h2>\n<ol>\n<li><strong>Privilege &#x26; Zero-Retention Boundary First:</strong> Route strictly over a Zero-Data-Retention (<code>ZDR</code>) enterprise endpoint, 3P VPC gateway, or private open-weight node (<code>Mistral Large 4</code> / <code>Qwen 3.8</code> on private compute).</li>\n<li><strong>Verbatim Span Citation Requirement:</strong> Every flagged risk must return <code>{ clause_type, verbatim_quote, section_number, playbook_standard, severity, proposed_redline }</code>. A deterministic post-check verifies <code>verbatim_quote</code> exists character-for-character inside the source document; if not, the check fails loudly instead of passing a hallucinated quote to counsel.</li>\n<li><strong>Productive-Friction Deal Context Check:</strong> Before generating redlines, the harness prompts the deal owner for three facts: <em>Counterparty role (vendor vs. customer), annual contract value, and whether Red-tier PII/PHI is touched.</em></li>\n</ol>",
    "toc": [
      {
        "id": "legal-ais-real-value-consistency-against-your-playbook-not-freeform-lawyering",
        "text": "Legal AI's Real Value: Consistency Against Your Playbook, Not Freeform Lawyering"
      },
      {
        "id": "weighing-harvey--legora-against-bespoke-playbook-harnesses",
        "text": "Weighing Harvey &#x26; Legora Against Bespoke Playbook Harnesses"
      },
      {
        "id": "designing-a-zero-hallucination-contract-triage-harness",
        "text": "Designing a Zero-Hallucination Contract Triage Harness"
      }
    ]
  },
  {
    "slug": "2-5-sales-hr-ops-ai-finops",
    "frontmatter": {
      "slug": "2-5-sales-hr-ops-ai-finops",
      "curriculumId": "departments",
      "moduleCode": "2.5",
      "title": "Sales/RevOps, HR/Operations & McKinsey-Grade AI FinOps",
      "summary": "Connect deal intelligence and internal SOP operations without SaaS sprawl, audit $30 to $100/seat wrapper bloat, and measure real capacity gains.",
      "durationMinutes": 45,
      "unlocked": false,
      "artifact": "Department SaaS Rationalization Workbook & Quarterly AI FinOps Dashboard",
      "learningOutcomes": [
        "Automate RevOps pre-call prep, MEDDPICC/qualification extraction, and post-call CRM hygiene without robotic outbound spam",
        "Build HR/Operations onboarding and policy Q&A over verified canonical docs",
        "Run a McKinsey-grade SaaS & AI FinOps audit to fund new builds out of canceled wrapper bloat"
      ],
      "upsellBridge": "Want Sophia to run a live SaaS & AI FinOps rationalization across your stack? Book a 20-Minute Executive Call on /fractional-ai-cto."
    },
    "html": "<h2 id=\"sales-revops--people-ops-automate-the-prep-and-hygiene-never-the-human-relationship\">Sales, RevOps &#x26; People Ops: Automate the Prep and Hygiene, Never the Human Relationship</h2>\n<p>In Revenue and People Operations, the fastest way to torch brand reputation is letting an unreviewed bot blast prospects or send canned HR brush-offs. Keep <strong>100% of external relationship touchpoints human</strong>, and automate the invisible 70% of administrative drag around them:</p>\n<ul>\n<li><strong>RevOps &#x26; Account Executives:</strong> Calendar webhook -> live company + SEC/news research -> structured pre-call brief 30 minutes prior -> post-call transcript extraction staging CRM field updates, mutual action plans, and draft follow-up notes in under 60 seconds.</li>\n<li><strong>HR &#x26; Internal Operations:</strong> Replace Slack shoulder-taps (<em>\"What is our L&#x26;D stipend rule?\"</em>, <em>\"How do we onboard a contractor?\"</em>) with a citation-locked internal handbook connector that refuses to answer whenever the source doc is out of date, flagging the exact doc owner to update it.</li>\n</ul>\n<h2 id=\"the-ai-finops-audit-funding-transformation-by-cutting-seat-sprawl\">The AI FinOps Audit: Funding Transformation by Cutting Seat Sprawl</h2>\n<p>In enterprise software restructurings, organizations routinely discover they are paying for <strong>four overlapping layers of AI markup</strong>:</p>\n<ol>\n<li>Workspace suite AI add-ons (<code>$20 to $30/user/mo</code>)</li>\n<li>Standalone frontier chat seats (<code>$25 to $60/user/mo</code>)</li>\n<li>Point-solution meeting-note, writing, and CRM summary wrappers (<code>$30 to $100/user/mo</code> each)</li>\n<li>Uncapped developer API keys running Tier-1 frontier models on Tier-3 background jobs</li>\n</ol>\n<p>Pull 90 days of SSO usage + invoice data, consolidate onto <strong>one governed workspace anchor + one direct multi-model API gateway</strong>, and reallocate the recovered 40% to 70% budget straight into high-leverage bespoke harnesses that your company permanently owns.</p>",
    "toc": [
      {
        "id": "sales-revops--people-ops-automate-the-prep-and-hygiene-never-the-human-relationship",
        "text": "Sales, RevOps &#x26; People Ops: Automate the Prep and Hygiene, Never the Human Relationship"
      },
      {
        "id": "the-ai-finops-audit-funding-transformation-by-cutting-seat-sprawl",
        "text": "The AI FinOps Audit: Funding Transformation by Cutting Seat Sprawl"
      }
    ]
  },
  {
    "slug": "3-1-production-harnesses-multi-model-routing",
    "frontmatter": {
      "slug": "3-1-production-harnesses-multi-model-routing",
      "curriculumId": "bespoke-systems",
      "moduleCode": "3.1",
      "title": "Inside Production Agent Harnesses & Multi-Model Routing",
      "summary": "Why the harness matters more than the base model in late 2026: state loops, deterministic verifiers, open vs. cloud harnesses (Claude Code/Codex vs. OpenCode/OpenHands), and multi-model arbitration.",
      "durationMinutes": 55,
      "unlocked": true,
      "artifact": "Production Harness State-Machine Spec + 3-Tier Multi-Model Router Config",
      "learningOutcomes": [
        "Deconstruct why identical models succeed or fail based on harness state management, context compaction, and verification gates",
        "Compare cloud-first harnesses (Claude Code, Codex, Cowork) against open-weight-friendly harnesses (OpenCode, OpenHands, Pi Harness)",
        "Implement multi-model task routing and cross-family judge arbitration"
      ],
      "upsellBridge": "Need a production harness and multi-model router engineered for your stack? Scope a Forward Deployed Build on /work-with-me."
    },
    "html": "<h2 id=\"why-the-harness-beats-the-base-model-in-late-2026\">Why the Harness Beats the Base Model in Late 2026</h2>\n<p>Across engineering teams and production deployments in late 2026, one lesson stands above every benchmark chart: <strong>swapping a model moves accuracy by 3% to 5%; fixing the surrounding harness moves end-to-end task completion by 30% to 50%.</strong></p>\n<p>A raw model call has no memory of prior failures, no permission boundaries, no budget awareness, and no way to check whether its output compiles or matches source records. <strong>The harness</strong> provides six surrounding mechanisms:</p>\n<ol>\n<li><strong>Context Assembly &#x26; Compaction:</strong> Injecting exact <code>AGENTS.md</code>, <code>SKILL.md</code>, and schema rules while summarizing stale tool logs before context degradation sets in around 40K to 80K active tokens.</li>\n<li><strong>Elicitation / Intake Gate:</strong> Pausing to interview the caller whenever required decision parameters are missing.</li>\n<li><strong>Scoped Tool Loop (<code>MCP</code> / Function Calling):</strong> Executing read, search, sandbox, and draft tools with strict timeout and retry semantics.</li>\n<li><strong>Deterministic Verifiers:</strong> Running schema validation, test suites, SQL/math checks, or verbatim citation matching <em>before</em> accepting a model turn.</li>\n<li><strong>Hill-Climbing &#x26; Bounded Recovery:</strong> Feeding exact compiler or verifier error messages back to the model for at most <code>N=3</code> bounded retries.</li>\n<li><strong>Token &#x26; Dollar Circuit Breakers:</strong> Halting runaway loops immediately when per-run spend or step count crosses a ceiling.</li>\n</ol>\n<h2 id=\"cloud-first-vs-open-weight-friendly-harnesses\">Cloud-First vs. Open-Weight-Friendly Harnesses</h2>\n<p>First-party harnesses (<code>Claude Code</code>, <code>OpenAI Codex</code>, <code>Claude Cowork</code>) set the UX bar for multi-step work, yet carry rigid system prompts tuned specifically for their parent lab's frontier models. When organizations route sensitive workloads to self-hosted <code>vLLM</code> or <code>llama.cpp</code> clusters running <code>Qwen 3.8</code>, <code>DeepSeek V4.1</code>, or <code>Mistral Large 4</code>, open-source harnesses (<strong><code>OpenCode</code></strong>, <strong><code>OpenHands</code></strong>, <strong><code>Pi Harness</code></strong>, <strong><code>Roo Code</code></strong>) let you tune tool-calling formats, system prompts, and <strong>disable silent cloud API fallbacks</strong> inside locked YAML/JSON configs.</p>\n<h2 id=\"multi-model-routing--cross-family-arbitration\">Multi-Model Routing &#x26; Cross-Family Arbitration</h2>\n<p>Never run a single model across every turn of a workflow:</p>\n<pre><code class=\"language-text\">[Incoming Task]\n   ├── 80% Routine Extraction / Triage ──> Fast Tier (Haiku 5.5 / Hydrogen / Qwen 3.6-27B)\n   ├── 15% Multi-Step Synthesis &#x26; Code ──> Workhorse Tier (GPT-6.2 Sol / Neon / Qwen 4 Max)\n   └──  5% High-Stakes / Low-Confidence ─> Frontier Dual-Family Check (Fable 5.2 + Astra Judge)\n</code></pre>\n<p>For high-consequence outputs (contract redlines, clinical/regulatory summaries, production migrations), generate with Family A and run a lightweight binary rubric check on Family B so correlated single-family blind spots get caught before human review.</p>",
    "toc": [
      {
        "id": "why-the-harness-beats-the-base-model-in-late-2026",
        "text": "Why the Harness Beats the Base Model in Late 2026"
      },
      {
        "id": "cloud-first-vs-open-weight-friendly-harnesses",
        "text": "Cloud-First vs. Open-Weight-Friendly Harnesses"
      },
      {
        "id": "multi-model-routing--cross-family-arbitration",
        "text": "Multi-Model Routing &#x26; Cross-Family Arbitration"
      }
    ]
  },
  {
    "slug": "3-2-bespoke-ai-api-stack",
    "frontmatter": {
      "slug": "3-2-bespoke-ai-api-stack",
      "curriculumId": "bespoke-systems",
      "moduleCode": "3.2",
      "title": "The Bespoke AI API Stack: Best-of-Breed Primitives to Connect",
      "summary": "Compose custom systems at 10x lower cost than bloated SaaS wrappers using the best 2026 APIs across Web Search/Grounding, Document OCR, Voice/Meetings, Code/Browser Sandboxes, and Transactional Ops.",
      "durationMinutes": 55,
      "unlocked": false,
      "artifact": "2026 Best-of-Breed AI API Reference Architecture & Cost Sheet",
      "learningOutcomes": [
        "Select proven APIs across all 6 bespoke system layers without building commodity parsers from scratch",
        "Avoid brittle HTML scrapers, naive PDF text dumps, and unisolated code execution",
        "Estimate monthly variable API costs before writing integration glue"
      ],
      "upsellBridge": "Want our engineering practice to wire these APIs directly into your CRM, ERP, and workspace? Explore Forward Deployed Builds on /work-with-me."
    },
    "html": "<h2 id=\"why-composing-six-primitives-beats-buying-ten-saas-wrappers\">Why Composing Six Primitives Beats Buying Ten SaaS Wrappers</h2>\n<p>Every overpriced <code>$2,000/month</code> AI SaaS wrapper in 2026 is secretly calling three or four public infrastructure APIs under the hood. Connecting those best-of-breed primitives directly gives your company full schema control, zero per-seat tax, and clean data ownership:</p>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Capability Layer</th>\n<th align=\"left\">Best-of-Breed 2026 APIs</th>\n<th align=\"left\">Why Architects Pick Them</th>\n<th align=\"left\">What They Replace</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align=\"left\"><strong>1. Search, Grounding &#x26; Clean Web Extraction</strong></td>\n<td align=\"left\"><code>Tavily</code> (<code>advanced</code> search + extract), <code>Exa</code> (neural/entity search), <code>Firecrawl</code> / <code>Jina Reader</code></td>\n<td align=\"left\">Returns clean LLM-ready Markdown, citations, and date-filtered passages without maintaining headless scraper proxies</td>\n<td align=\"left\">Manual Google research &#x26; <code>$300/mo</code> competitive-intel wrappers</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>2. Layout-Aware Document &#x26; Table OCR</strong></td>\n<td align=\"left\"><code>Reducto</code>, <code>Mistral OCR</code>, <code>LlamaParse</code>, native multimodal vision</td>\n<td align=\"left\">Preserves multi-column financial tables, checkboxes, and bounding-box page coordinates on messy scanned PDFs</td>\n<td align=\"left\">Broken <code>pdf-parse</code> scripts &#x26; manual AP/legal data entry</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>3. Voice, Transcription &#x26; Meeting Bots</strong></td>\n<td align=\"left\"><code>Deepgram</code> (STT), <code>Recall.ai</code> (Zoom/Meet/Teams bot API), <code>Cartesia</code> / <code>ElevenLabs</code> (low-latency TTS), WebRTC Live APIs</td>\n<td align=\"left\">Sub-300ms streaming latency + speaker-diarized call capture across every meeting platform via one unified webhook</td>\n<td align=\"left\"><code>$40/seat/mo</code> standalone AI note-taker subscriptions</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>4. Isolated Code &#x26; Browser Sandboxes</strong></td>\n<td align=\"left\"><code>E2B</code>, <code>Cloudflare Sandboxes</code>, <code>Modal</code>, <code>Browserbase</code> / <code>Stagehand</code></td>\n<td align=\"left\">Ephemeral microVMs and deterministic browser sessions so agent-written Python or UI steps never touch host servers</td>\n<td align=\"left\">Running untrusted generated scripts on production machines</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>5. Model &#x26; Open-Weight Inference Gateways</strong></td>\n<td align=\"left\">Direct lab APIs (<code>ZDR</code>), <code>OpenRouter</code>, <code>Fireworks</code> / <code>Together</code> / <code>Groq</code> / <code>Cerebras</code>, self-hosted <code>vLLM</code></td>\n<td align=\"left\">Unified failover, latency routing, and instant switching between frontier reasoning and fast open weights</td>\n<td align=\"left\">Hardcoding one vendor SDK across 40 microservices</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>6. State, Email, Scheduling &#x26; Workflow Spine</strong></td>\n<td align=\"left\"><code>Postgres</code> (<code>pgvector</code>), <code>Resend</code> (transactional + inbound webhooks), <code>Cal.com</code>, <code>n8n</code> / <code>Cloudflare Workers</code></td>\n<td align=\"left\">Auditable relational state, reliable event triggers, and zero-bloat human approval notifications</td>\n<td align=\"left\">Fragile 40-step spreadsheet zaps with zero version control</td>\n</tr>\n</tbody>\n</table>",
    "toc": [
      {
        "id": "why-composing-six-primitives-beats-buying-ten-saas-wrappers",
        "text": "Why Composing Six Primitives Beats Buying Ten SaaS Wrappers"
      }
    ]
  },
  {
    "slug": "3-3-enterprise-interoperability-webhooks-mcp",
    "frontmatter": {
      "slug": "3-3-enterprise-interoperability-webhooks-mcp",
      "curriculumId": "bespoke-systems",
      "moduleCode": "3.3",
      "title": "Making Enterprise Systems Speak Together: Webhooks, Canonical Schemas & MCP",
      "summary": "Connect CRMs, ERPs, ticketing tools, and document vaults cleanly using Linux Foundation MCP standards (Skills over MCP, Tasks, Elicitation), idempotent webhooks, and canonical JSON schemas.",
      "durationMinutes": 50,
      "unlocked": false,
      "artifact": "Cross-System Canonical Event Schema + MCP Server Integration Blueprint",
      "learningOutcomes": [
        "Use the 2026 MCP specification (Tools, Resources, Skills over MCP, async Tasks, and Elicitation) to standardize internal integrations",
        "Prevent duplicate writes and race conditions with idempotency keys and dead-letter queues",
        "Design canonical intermediate schemas so swapping a CRM or ERP never breaks downstream AI harnesses"
      ],
      "upsellBridge": "Stuck integrating legacy databases, Salesforce/HubSpot, NetSuite, or Slack? Scope a Forward Deployed Integration on /work-with-me."
    },
    "html": "<h2 id=\"why-point-to-point-glue-collapses-at-five-tools\">Why Point-to-Point Glue Collapses at Five Tools</h2>\n<p>Connecting <code>N</code> enterprise apps directly to <code>M</code> agent workflows creates <code>N x M</code> custom adapters. Whenever an API field renames or an auth token expires, workflows fail silently.</p>\n<h2 id=\"three-rules-of-durable-enterprise-interoperability\">Three Rules of Durable Enterprise Interoperability</h2>\n<ol>\n<li><strong>Standardize on Model Context Protocol (<code>MCP</code>) Under Neutral Governance:</strong> Now stewarded under the Linux Foundation's Agentic AI Foundation, MCP lets you expose an internal database, ERP, or policy repository <strong>once</strong>, complete with <strong>Skills over MCP</strong> (shipping exact usage instructions alongside tools), <strong>Tasks</strong> (for long-running background jobs), and <strong>Elicitation</strong> (structured human clarification prompts).</li>\n<li><strong>Define Canonical Business Entities:</strong> Translate vendor-specific payloads (HubSpot vs. Salesforce vs. Stripe) immediately at the edge into your own typed canonical schemas (<code>LeadBrief</code>, <code>ContractClauseRisk</code>, <code>InvoiceVariance</code>) validated with <code>Zod</code> or JSON Schema.</li>\n<li><strong>Enforce Idempotency on Every Webhook:</strong> Hash <code>(source_event_id + workflow_version)</code> in Postgres before running inference or staging a draft so webhook retries never double-bill tokens or create duplicate drafts.</li>\n</ol>",
    "toc": [
      {
        "id": "why-point-to-point-glue-collapses-at-five-tools",
        "text": "Why Point-to-Point Glue Collapses at Five Tools"
      },
      {
        "id": "three-rules-of-durable-enterprise-interoperability",
        "text": "Three Rules of Durable Enterprise Interoperability"
      }
    ]
  },
  {
    "slug": "3-4-forward-deployed-engineer-golden-evals",
    "frontmatter": {
      "slug": "3-4-forward-deployed-engineer-golden-evals",
      "curriculumId": "bespoke-systems",
      "moduleCode": "3.4",
      "title": "The Forward Deployed AI Engineer (FDE) Model & Practical Golden Evals",
      "summary": "Why embedded Forward Deployed Engineers outperform slide-deck consultants and isolated IT backlogs, and how to build 25-case binary Golden Eval harnesses in a single afternoon.",
      "durationMinutes": 55,
      "unlocked": false,
      "artifact": "Forward Deployed 2-Week Sprint Runbook + 25-Case Binary Golden Eval Harness",
      "learningOutcomes": [
        "Run the Forward Deployed AI Engineer operating cadence: shadow real operators, ship against messy live data in 72 hours, and iterate on failure traces",
        "Perform open-coding error analysis on 25 historical cases rather than guessing failure modes",
        "Replace noisy 1-to-5 LLM-as-a-Judge scores with crisp binary pass/fail code and rubric evaluators"
      ],
      "upsellBridge": "Want Sophia embedded as a Forward Deployed AI Architect or training your internal FDE champions? Visit /work-with-me or /fractional-ai-cto."
    },
    "html": "<h2 id=\"why-the-forward-deployed-engineer-fde-model-won-enterprise-ai\">Why the Forward Deployed Engineer (FDE) Model Won Enterprise AI</h2>\n<p>Traditional management consultancies spend eight weeks interviewing executives to deliver a 90-slide strategy deck that nobody in engineering can implement. Traditional IT queues ask business leaders to write rigid requirements up front for probabilistic workflows they have never seen run.</p>\n<p>Pioneered by Palantir and adopted across top 2026 enterprise AI deployments (<code>Harvey</code>, <code>Sierra</code>, frontier lab enterprise teams), the <strong>Forward Deployed AI Engineer (FDE)</strong> collapses strategy and engineering into one person sitting directly beside the operator:</p>\n<ol>\n<li><strong>Days 1 to 2 (Shadow &#x26; Extract):</strong> Watch 5 real transactions live (not how the org chart claims they happen, how staff actually click through spreadsheets and emails). Run Socratic extraction to capture unwritten exceptions.</li>\n<li><strong>Days 3 to 5 (Thin Vertical Slice on Real Data):</strong> Wire a minimal end-to-end Level-2 Draft-First harness connected to real staging data so operators react to concrete outputs by Friday.</li>\n<li><strong>Week 2 (Error Analysis &#x26; Golden Eval Lock-In):</strong> Harvest every correction operators make on those first 25 runs and turn them into an automated regression gate.</li>\n</ol>\n<h2 id=\"building-a-25-case-binary-golden-eval-suite-zero-guesswork\">Building a 25-Case Binary Golden Eval Suite (Zero Guesswork)</h2>\n<p>Never write evaluation metrics before looking at data:</p>\n<ol>\n<li><strong>Collect 25 real historical inputs</strong> (15 routine, 10 gnarly edge cases).</li>\n<li><strong>Open-code the failures:</strong> Inspect outputs yourself and write plain notes (<em>\"Missed renewal auto-escalation clause\"</em>, <em>\"Invented discount tier\"</em>).</li>\n<li><strong>Cluster into 3 to 5 Binary Pass/Fail Checks (<code>PASS</code> / <code>FAIL</code> only):</strong>\n<ul>\n<li>Prefer <strong>deterministic code checks</strong> first (valid JSON schema, verbatim quote present in source text, zero prohibited phrases, math totals match).</li>\n<li>Use a <strong>narrow binary LLM-Judge</strong> strictly for semantic checks (<em>\"Did the draft ask all 3 required intake questions before proposing scope? YES/NO\"</em>), calibrated against your own human labels until agreement exceeds <code>90%</code>.</li>\n</ul>\n</li>\n</ol>",
    "toc": [
      {
        "id": "why-the-forward-deployed-engineer-fde-model-won-enterprise-ai",
        "text": "Why the Forward Deployed Engineer (FDE) Model Won Enterprise AI"
      },
      {
        "id": "building-a-25-case-binary-golden-eval-suite-zero-guesswork",
        "text": "Building a 25-Case Binary Golden Eval Suite (Zero Guesswork)"
      }
    ]
  },
  {
    "slug": "3-5-prompt-injection-4-legged-oauth-breakers",
    "frontmatter": {
      "slug": "3-5-prompt-injection-4-legged-oauth-breakers",
      "curriculumId": "bespoke-systems",
      "moduleCode": "3.5",
      "title": "Agent Security: Prompt Injection, 4-Legged OAuth & Cost Circuit Breakers",
      "summary": "Harden connected harnesses against indirect prompt injection inside untrusted emails/PDFs/web pages, enforce 4-legged user-plus-agent OAuth scopes, and cap blast radius.",
      "durationMinutes": 45,
      "unlocked": false,
      "artifact": "Agent Threat-Model Checklist + Scoped OAuth & Spend Breaker Policy",
      "learningOutcomes": [
        "Defend against the Lethal Trifecta (private data access + untrusted external input + outbound network/write capability)",
        "Implement 4-legged delegated identity so agents never run with god-mode service-account keys",
        "Enforce per-run, per-user, and daily spend circuit breakers"
      ],
      "upsellBridge": "Need an adversarial security and MCP permission audit across your engineering org? Book a Fractional AI CTO review on /fractional-ai-cto."
    },
    "html": "<h2 id=\"breaking-the-lethal-trifecta-in-connected-agents\">Breaking the \"Lethal Trifecta\" in Connected Agents</h2>\n<p>Indirect prompt injection happens whenever an agent simultaneously holds <strong>all three</strong> of these capabilities in one turn:</p>\n<ol>\n<li><strong>Access to private data</strong> (inbox, CRM, internal docs)</li>\n<li><strong>Exposure to untrusted external input</strong> (an inbound vendor PDF, cold email, or scraped webpage containing hidden instructions)</li>\n<li><strong>Unapproved external egress or state mutation</strong> (<code>send_email</code>, <code>fetch(arbitrary_url)</code>, <code>transfer_funds</code>, markdown image URL exfiltration)</li>\n</ol>\n<p><strong>Architectural Fix:</strong> Break at least one leg of the triangle structurally in code, never via a polite system prompt saying <em>\"Ignore malicious instructions.\"</em> Parse untrusted documents inside an isolated zero-tool extraction call that emits strictly typed enum/numeric/citation fields, and require human Level-2 sign-off before any outbound write or external URL fetch.</p>\n<h2 id=\"4-legged-identity-resource-owner-client-service-and-agent\">4-Legged Identity: Resource Owner, Client, Service, and Agent</h2>\n<p>Traditional OAuth assumes three parties. Agentic systems introduce a fourth actor whose permissions must be <strong>strictly narrower than the human delegator's</strong>:</p>\n<ul>\n<li>Issue short-lived, task-scoped tokens (<code>gmail.compose</code> draft creation without <code>gmail.send</code>, read-only SQL views restricted to the caller's tenant row, zero destructive DDL).</li>\n<li>Log <code>actor_human_id</code> alongside <code>agent_run_id</code> on every audit record.</li>\n<li>Pair every loop with hard token/dollar circuit breakers (<code>max_steps: 12</code>, <code>max_cost_usd: 0.75</code>) so a malformed retry loop fails closed in seconds rather than burning <code>$800</code> overnight.</li>\n</ul>",
    "toc": [
      {
        "id": "breaking-the-lethal-trifecta-in-connected-agents",
        "text": "Breaking the \"Lethal Trifecta\" in Connected Agents"
      },
      {
        "id": "4-legged-identity-resource-owner-client-service-and-agent",
        "text": "4-Legged Identity: Resource Owner, Client, Service, and Agent"
      }
    ]
  },
  {
    "slug": "4-1-open-weights-vs-frontier-economics",
    "frontmatter": {
      "slug": "4-1-open-weights-vs-frontier-economics",
      "curriculumId": "sovereign-stack",
      "moduleCode": "4.1",
      "title": "Open-Weights vs. Frontier Physics, Licensing & Break-Even Economics",
      "summary": "Calculate exact memory-bandwidth tok/s physics and dollar break-even curves comparing closed frontier APIs against self-hosted Apache 2.0, MIT, and ecosystem open-weight models.",
      "durationMinutes": 50,
      "unlocked": true,
      "artifact": "Memory-Bandwidth & Sovereign Break-Even Calculator Spec",
      "learningOutcomes": [
        "Compute real token-generation speed from memory bandwidth and active MoE parameters before buying hardware",
        "Compare Apache 2.0/MIT weights (Qwen 3.8, DeepSeek V4.1) against ecosystem/revenue-capped licenses (Mistral Large 4, Kimi K3.1 Pro)",
        "Identify the exact volume and compliance thresholds where private compute beats cloud APIs"
      ],
      "upsellBridge": "Sizing private AI infrastructure or hybrid routing for a regulated organization? Book a Fractional AI CTO scoping call on /fractional-ai-cto."
    },
    "html": "<h2 id=\"memory-bandwidth-is-destiny-the-only-formula-hardware-buyers-need\">Memory Bandwidth Is Destiny: The Only Formula Hardware Buyers Need</h2>\n<p>Autoregressive token generation at low concurrency is <strong>memory-bandwidth bound</strong>, not FLOP bound. For every generated token, the GPU or unified-memory bus must read all <strong>active</strong> weights out of RAM:</p>\n<pre><code class=\"language-text\">Max Single-Stream tok/s ≈ (Effective Memory Bandwidth in GB/s) / (Active Model Footprint in GB)\n</code></pre>\n<p>That single equation explains why <strong>Mixture-of-Experts (<code>MoE</code>)</strong> architectures transformed private enterprise compute in 2026:</p>\n<ul>\n<li>A dense <code>70B</code> model at 4-bit quantization reads <code>~38 GB</code> on <em>every</em> token (<code>~20 tok/s</code> on an <code>800 GB/s</code> bus).</li>\n<li>A sparse MoE model with <code>35B</code> total parameters and <code>3B</code> active parameters (or <code>Mistral Large 4</code> with <code>52B</code> active out of <code>1T</code> total on multi-node / high-RAM rigs) activates only a fraction of its weights per token, delivering snappy interactive speeds once total weights fit cleanly inside unified memory or VRAM.</li>\n</ul>\n<h2 id=\"when-private-compute-wins-vs-when-zero-retention-apis-win\">When Private Compute Wins vs. When Zero-Retention APIs Win</h2>\n<p>Do not buy hardware out of ideology; buy it when physics, compliance, or utilization math favors ownership:</p>\n<ol>\n<li><strong>Zero-Data-Retention (<code>ZDR</code>) Cloud APIs Win When:</strong> Traffic is spiky, concurrency swings 20x during business hours, tasks require frontier Tier-1 synthesis (<code>GPT-6.2 Astra</code>, <code>Claude Fable 5.2</code>), and standard BAA/DPA terms satisfy legal.</li>\n<li><strong>Dedicated / Private Open-Weight Rigs Win When:</strong>\n<ul>\n<li><strong>Strict Zero-Egress Compliance:</strong> Unredacted PHI, privileged M&#x26;A files, defense/IP codebases, or sovereign client mandates forbid third-party packet egress altogether.</li>\n<li><strong>Sustained High-Duty-Cycle Loops:</strong> Continuous background extraction, repo indexing, or test-verification loops running 8+ hours daily amortize a <code>$4,500 to $12,000</code> desk node in <strong>4 to 9 months</strong> compared against uncapped cloud seats and API bills.</li>\n<li><strong>Hardened Local Harnesses:</strong> Pairing <code>OpenCode</code> or internal services directly against local <code>vLLM</code> / <code>llama.cpp</code> with cloud fallbacks disabled in config guarantees zero accidental leakage.</li>\n</ul>\n</li>\n</ol>",
    "toc": [
      {
        "id": "memory-bandwidth-is-destiny-the-only-formula-hardware-buyers-need",
        "text": "Memory Bandwidth Is Destiny: The Only Formula Hardware Buyers Need"
      },
      {
        "id": "when-private-compute-wins-vs-when-zero-retention-apis-win",
        "text": "When Private Compute Wins vs. When Zero-Retention APIs Win"
      }
    ]
  },
  {
    "slug": "4-2-nine-dollar-vps-oss-operations-stack",
    "frontmatter": {
      "slug": "4-2-nine-dollar-vps-oss-operations-stack",
      "curriculumId": "sovereign-stack",
      "moduleCode": "4.2",
      "title": "The $9 Linux VPS & Self-Hosted Open-Source Operations Stack",
      "summary": "Replace $150 to $400/month of fragmented SaaS tools on a single hardened 4GB to 8GB Linux VPS running Caddy 2 TLS, Postgres 16, n8n, Umami, Uptime Kuma, and encrypted Restic backups.",
      "durationMinutes": 45,
      "unlocked": false,
      "artifact": "Hardened Docker Compose + Caddyfile + Nightly Restic Backup Blueprint",
      "learningOutcomes": [
        "Deploy five core open-source business and orchestration services behind automatic Caddy 2 TLS in 45 minutes",
        "Harden SSH, UFW firewall rules, and container networks so databases never bind to 0.0.0.0",
        "Automate encrypted off-site Postgres backups with monthly restore verification"
      ],
      "upsellBridge": "Want a zero-bloat self-hosted orchestration spine deployed inside your own cloud account? Scope a Forward Deployed Build on /work-with-me."
    },
    "html": "<h2 id=\"owning-your-orchestration-spine-for-under-10month\">Owning Your Orchestration Spine for Under $10/Month</h2>\n<p>Before buying GPU hardware, reclaim control over your <strong>workflow, scheduling, analytics, and state layer</strong>. A single <code>4GB</code> to <code>8GB</code> Linux VPS (<code>Hetzner</code>, <code>DigitalOcean</code>, or your existing cloud VPC) comfortably runs:</p>\n<ul>\n<li><strong><code>Caddy 2</code> (~30 MB RAM):</strong> Automatic Let's Encrypt TLS termination and clean reverse-proxy headers.</li>\n<li><strong><code>Postgres 16</code> + <code>pgvector</code> (~400 MB RAM):</strong> Shared transactional state, idempotency ledger, and semantic memory store bound strictly to an internal Docker bridge network.</li>\n<li><strong><code>n8n</code> Community / Queue Mode (~450 MB RAM):</strong> Visual webhook and cron orchestrator calling your direct APIs and staging human-approved drafts.</li>\n<li><strong><code>Umami</code> (~200 MB RAM) + <code>Uptime Kuma</code> (~80 MB RAM):</strong> Cookie-free privacy analytics and instant webhook/email health alerts when any workflow or endpoint degrades.</li>\n</ul>\n<h2 id=\"non-negotiable-production-hardening-checklist\">Non-Negotiable Production Hardening Checklist</h2>\n<ol>\n<li>Disable password SSH authentication; allow Ed25519 keys or Tailscale SSH only.</li>\n<li>Remember Docker bypasses standard <code>ufw</code> chains if you publish <code>-p 5432:5432</code>; bind internal ports exclusively to <code>127.0.0.1</code> or internal Docker networks.</li>\n<li>Run nightly <code>pg_dump</code> -> <code>restic</code> encrypted snapshots to object storage and test a full restore into a scratch container once a month.</li>\n</ol>",
    "toc": [
      {
        "id": "owning-your-orchestration-spine-for-under-10month",
        "text": "Owning Your Orchestration Spine for Under $10/Month"
      },
      {
        "id": "non-negotiable-production-hardening-checklist",
        "text": "Non-Negotiable Production Hardening Checklist"
      }
    ]
  },
  {
    "slug": "4-3-sizing-building-96gb-128gb-512gb-nodes",
    "frontmatter": {
      "slug": "4-3-sizing-building-96gb-128gb-512gb-nodes",
      "curriculumId": "sovereign-stack",
      "moduleCode": "4.3",
      "title": "Sizing & Building 96GB, 128GB, and 512GB Private AI Nodes",
      "summary": "Vendor-neutral hardware blueprint comparing 96GB Linux mobile rigs, 128GB Ryzen AI Halo / DGX Spark desk nodes, 512GB M5 Ultra Mac Studios (1.2 TB/s), and multi-GPU vLLM servers.",
      "durationMinutes": 55,
      "unlocked": false,
      "artifact": "Private AI Node BOM + vLLM & llama.cpp Production Serving Configs",
      "learningOutcomes": [
        "Match hardware tier (96GB laptop, 128GB mini-node, 512GB unified-memory studio, or multi-GPU rack) to exact model quantizations and concurrency",
        "Configure llama.cpp, MLX, and vLLM with flash attention, KV-cache quantization, and OpenAI-compatible local APIs",
        "Lock OpenCode and IDE harnesses to local endpoints with zero cloud fallback"
      ],
      "upsellBridge": "Commissioning an on-premise or VPC open-weight cluster for your engineering or clinical team? Explore Fractional AI CTO advisory on /fractional-ai-cto."
    },
    "html": "<h2 id=\"four-proven-private-compute-form-factors-in-late-2026\">Four Proven Private Compute Form Factors in Late 2026</h2>\n<table>\n<thead>\n<tr>\n<th align=\"left\">Hardware Class</th>\n<th align=\"left\">Usable Model RAM / Bandwidth</th>\n<th align=\"left\">Sweet-Spot Open-Weight Models</th>\n<th align=\"left\">Ideal Workload</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align=\"left\"><strong>1. 96GB Unified Linux Mobile / Mini Rig</strong></td>\n<td align=\"left\"><code>~72 to 84 GB</code> GART allocation · <code>~120 to 256 GB/s</code></td>\n<td align=\"left\"><code>Qwen 3.6-27B</code> / <code>35B-A3B</code> (<code>Q4_K_M</code> / <code>Q6_K</code>)</td>\n<td align=\"left\">Sovereign travel workstation, offline document extraction, single-developer <code>OpenCode</code> harness</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>2. 128GB Desk Node (<code>Ryzen AI Halo</code> / <code>DGX Spark</code>)</strong></td>\n<td align=\"left\"><code>~110 GB</code> usable · <code>256 to 273 GB/s</code></td>\n<td align=\"left\"><code>70B</code> dense (<code>Q4</code>) or medium sparse MoE (<code>Qwen 3.8</code>) + local embeddings + OCR</td>\n<td align=\"left\">Quiet office appliance for a 3 to 10-person legal, clinic, or founder team</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>3. 512GB Unified-Memory Node (<code>M5 Ultra</code> Class)</strong></td>\n<td align=\"left\"><code>~440+ GB</code> usable · <code>~1.2 TB/s</code> bandwidth</td>\n<td align=\"left\">Large sparse MoE weights (<code>DeepSeek V4.1</code> quantized, <code>Mistral Large 4</code> MoE) with long KV caches at silent desk acoustics (<code>&#x3C;250W</code> typical)</td>\n<td align=\"left\">High-capacity R&#x26;D, confidential M&#x26;A/codebase reasoning without server-room cooling</td>\n</tr>\n<tr>\n<td align=\"left\"><strong>4. Multi-GPU Linux Server (<code>vLLM</code> / <code>SGLang</code>)</strong></td>\n<td align=\"left\"><code>96 to 640+ GB</code> HBM/GDDR7 · <code>1.8 to 8+ TB/s</code></td>\n<td align=\"left\">Continuous-batched <code>Qwen 3.8</code>, <code>Mistral Large 4</code>, <code>DeepSeek V4.1</code> serving 15 to 100+ concurrent internal seats</td>\n<td align=\"left\">Organization-wide private API gateway where multi-user time-to-first-token (<code>TTFT</code>) matters</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"hardening-local-serving--eliminating-silent-cloud-fallbacks\">Hardening Local Serving &#x26; Eliminating Silent Cloud Fallbacks</h2>\n<p>Serve an OpenAI-compatible local endpoint on loopback (<code>127.0.0.1:8000</code>) via <code>vLLM</code> or <code>llama-server</code> with explicit context limits and KV-cache quantization enabled, then audit every developer and workflow config (<code>OpenCode</code>, <code>Continue</code>, <code>n8n</code>) to confirm <strong>zero default fallback API keys</strong> exist in environment files. In regulated environments, block outbound traffic to public LLM domains at the DNS/firewall layer on the inference subnet so misconfigured scripts fail closed immediately.</p>",
    "toc": [
      {
        "id": "four-proven-private-compute-form-factors-in-late-2026",
        "text": "Four Proven Private Compute Form Factors in Late 2026"
      },
      {
        "id": "hardening-local-serving--eliminating-silent-cloud-fallbacks",
        "text": "Hardening Local Serving &#x26; Eliminating Silent Cloud Fallbacks"
      }
    ]
  },
  {
    "slug": "4-4-zero-port-tailscale-mesh-networking",
    "frontmatter": {
      "slug": "4-4-zero-port-tailscale-mesh-networking",
      "curriculumId": "sovereign-stack",
      "moduleCode": "4.4",
      "title": "Zero-Exposed-Port Networking Over Tailscale & Private Team Access",
      "summary": "Connect laptops, cloud webhooks, and office inference nodes over WireGuard-based Tailscale meshes with ACL tags, Tailscale Serve automatic HTTPS, and zero public firewall ports.",
      "durationMinutes": 40,
      "unlocked": false,
      "artifact": "Tailscale ACL Policy JSON + Zero-Port Private AI Gateway Config",
      "learningOutcomes": [
        "Expose local vLLM / llama.cpp and internal workspace UIs strictly to authenticated tailnet devices with zero public router port-forwarding",
        "Write least-privilege Tailscale ACL tags separating developer laptops, CI runners, and inference nodes",
        "Bridge cloud webhook receivers safely to private compute without opening inbound WAN ports"
      ],
      "upsellBridge": "Need zero-trust mesh networking and private inference wired cleanly for a distributed team? Book a scoping call on /work-with-me."
    },
    "html": "<h2 id=\"never-port-forward-8000-or-11434-to-the-public-internet\">Never Port-Forward <code>8000</code> or <code>11434</code> to the Public Internet</h2>\n<p>Tens of thousands of self-hosted inference servers sit exposed on Shodan because teams opened router ports or bound inference servers to <code>0.0.0.0</code> without authentication.</p>\n<p>With <strong>Tailscale Serve</strong> (built on WireGuard), your private inference node keeps <strong>zero inbound WAN ports open</strong>:</p>\n<ol>\n<li>Bind <code>vLLM</code> or <code>llama-server</code> strictly to <code>127.0.0.1:8000</code>.</li>\n<li>Publish it solely inside your encrypted tailnet with automatic TLS certificates (<code>tailscale serve --bg 8000</code>).</li>\n<li>Enforce <strong>Tailscale ACL tags</strong> (<code>tag:ai-node</code>, <code>tag:ops-worker</code>, <code>tag:staff-laptop</code>) so inference nodes can accept port <code>443</code> requests from authorized workers while being blocked from initiating lateral connections back into employee machines.</li>\n</ol>",
    "toc": [
      {
        "id": "never-port-forward-8000-or-11434-to-the-public-internet",
        "text": "Never Port-Forward 8000 or 11434 to the Public Internet"
      }
    ]
  },
  {
    "slug": "4-5-hybrid-routing-regulated-governance",
    "frontmatter": {
      "slug": "4-5-hybrid-routing-regulated-governance",
      "curriculumId": "sovereign-stack",
      "moduleCode": "4.5",
      "title": "Hybrid Cloud/Private Routing & Regulated Production Governance",
      "summary": "Combine fast cloud APIs for Green/Amber workloads with private zero-egress nodes for Red-tier PHI/legal/IP data behind a single policy-aware internal gateway.",
      "durationMinutes": 45,
      "unlocked": false,
      "artifact": "Policy-Aware Hybrid LLM Gateway Spec & Audit Trail Schema",
      "learningOutcomes": [
        "Route Green, Amber, and Red workloads automatically across public APIs, ZDR enterprise endpoints, and private open-weight nodes",
        "Maintain immutable audit logs (model version, prompt hash, data tier, human approver) without logging raw PII/PHI",
        "Deliver a complete Board & Security Committee Sovereign AI Readiness Pack"
      ],
      "upsellBridge": "Ready to put governed hybrid AI into production with executive oversight? Explore Fractional CAIO / AI CTO engagements on /fractional-ai-cto."
    },
    "html": "<h2 id=\"the-pragmatic-endgame-hybrid-policy-routing\">The Pragmatic Endgame: Hybrid Policy Routing</h2>\n<p>Almost no serious organization runs 100% public consumer cloud or 100% air-gapped local hardware. The highest-performing architecture in late 2026 is a <strong>Policy-Aware Hybrid Router</strong>:</p>\n<pre><code class=\"language-text\">[Workflow Request + Data Tier Tag]\n   ├── Tier = GREEN (Public web research, public copy)\n   │      └──> Fast / Workhorse Cloud API (lowest cost per verified task)\n   ├── Tier = AMBER (Internal SOPs, standard CRM/ERP ops)\n   │      └──> Contractual ZDR Enterprise API or 3P VPC Gateway (Bedrock / Vertex)\n   └── Tier = RED (Unredacted PHI, privileged M&#x26;A/contracts, core IP)\n          └──> Private Tailscale / VPC Open-Weight Node (Zero external egress)\n</code></pre>\n<h2 id=\"immutable-auditability-without-creating-a-toxic-data-honeypot\">Immutable Auditability Without Creating a Toxic Data Honeypot</h2>\n<p>Security and compliance committees (<code>HIPAA</code>, <code>SOC2 Type II</code>, <code>ISO 42001</code>, <code>EU AI Act</code>) need proof of governance without a central log database full of raw patient or client secrets. Log <strong>cryptographic content hashes, schema classification tags, model/harness git SHA, token cost, binary verifier outcome, and the approving human's identity</strong> so every automated and human-gated decision is 100% reconstructable during an audit.</p>",
    "toc": [
      {
        "id": "the-pragmatic-endgame-hybrid-policy-routing",
        "text": "The Pragmatic Endgame: Hybrid Policy Routing"
      },
      {
        "id": "immutable-auditability-without-creating-a-toxic-data-honeypot",
        "text": "Immutable Auditability Without Creating a Toxic Data Honeypot"
      }
    ]
  }
]

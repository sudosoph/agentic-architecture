---
name: editorial-and-site-qc
description: Use when drafting, editing, or reviewing any essay, playbook, landing page, offer card, navigation link, or social distribution pack for agenticarchitect.ai, Substack, or the Skool Lab, or before committing site and content changes.
---

# Swiss Studio Grid, 3-Surface Architecture & Site Quality Control

## Overview

**Core principle:** `agenticarchitect.ai` uses **Option B: Swiss Studio Grid** (Godly Swiss/architectural studio standard), backed by self-hosted `Plus Jakarta Sans` + `Inter` (`cv02, cv03, cv04, cv11`) + `JetBrains Mono` typography, a framed `max-w-5xl` structural `1px` hairline grid, a strict three-surface ecosystem, and an automated pre-commit quality gate (`npm run qc`).

Every essay, page, and component must pass **both** human editorial judgment and deterministic repository verification before completion.

## 1. The Three-Surface Ecosystem Contract

Never collapse all offers into a single SaaS-style pricing table. Route every piece of copy to its designated surface:

| Surface | Audience & Purpose | Conversion Mechanism |
|---|---|---|
| **01. `agenticarchitect.ai` (Monograph & Advisory)** | Executives, COOs, CTOs, technical leads, and conference/university organizers inspecting systems architecture, build-vs-buy strategy, benchmarks, and syllabi. | Single clean CTA: `Work With Me` (`/work-with-me`) or 20-minute fit call (`SITE_CONFIG.cal.audit` / `scoping` / `speaking`). Zero public rate cards or price slots. |
| **02. Substack (`agenticarchitectai.substack.com`)** | Weekly synthesis translating model releases and field experiments into practical operating decisions. | Single clean inline email input (`<NewsletterSignup />` with `Subscribe`). Never stack 3 competing subscribe/kit/Substack buttons. |
| **03. The Agentic Architect Lab (`/courses` · Skool)** | Non-technical operators, founders, and aspiring AI architects upskilling hands-on across **Track 01: Claude Superuser & Cowork OS**, **Track 02: Kill the $200/mo AI Subscription Stack**, and **Track 03: Become an AI Architect**. | Unlocked free `x.1` cornerstone lessons (`/courses/...`) + **Founding Lab Waitlist** (`<NewsletterSignup source="skool-waitlist" buttonLabel="Join Founding Waitlist" />`). Never invent or placeholder `$[XX]/mo` price tags. |

## 2. Essay & Playbook Recipe (`content/blog/*.mdx`)

Every active `.mdx` essay MUST match this exact structure:

```mdx
---
title: "Concrete Problem and Architectural Mechanism Under 85 Characters"
slug: kebab-case-slug
publishedDate: "YYYY-MM-DD"
description: "One-sentence summary (110 to 160 chars) stating the operational bottleneck and system outcome."
briefing:
  - "First scannable takeaway: why naive prompting or ad-hoc agents fail here."
  - "Second scannable takeaway: the specific 3-to-4 stage architecture or routing rule."
  - "Third scannable takeaway: measurable unit economics, safety gate, or verification check."
track: "small-business"
tags: ["workflows", "operations", "hitl"]
---

Open directly with a 2-to-3 sentence concrete operational failure mode and the architecture that fixes it (never open with `**TL;DR**`).

## Clear H2 section heading in sentence case

Keep prose between **600 and 1,600 words** (hard gate: `520..1,850` words excluding code/SVG blocks). Break dense explanations every 250 words with Markdown comparison tables, numbered checklists, or an inline architectural schematic:

<figure class="editorial-figure">
  <svg viewBox="0 0 720 200" role="img" aria-label="Descriptive diagram title">
    <!-- Crisp Swiss Studio SVG schematic with ZERO blank lines inside <figure> or <svg> -->
    <rect x="16" y="20" width="200" height="60" rx="5" fill="#F7F8FA" stroke="#DCE0E6" />
  </svg>
  <figcaption>Figure 1: Plain-English caption explaining the state boundary and human gate.</figcaption>
</figure>

## Next steps

Close with natural hub-and-spoke internal links (`>= 3` internal `/...` links across the essay) pointing to active peer essays, `/starter-kit`, `/courses`, `/sovereign-stack`, or `/work-with-me`.
```

### Required Essay Invariants
1. **`briefing` MUST be a 3-item YAML array** (never a single string) so `/blog/[slug]` renders the **30-Second Briefing** box cleanly.
2. **Unique staggered `publishedDate`:** Check existing `publishedDate` values in `content/blog/*.mdx` first. Never assign two essays the same calendar date.
3. **Inline `<svg>` schematics (zero internal blank lines):** Flagship architecture and benchmark essays include a clean `<figure class="editorial-figure"><svg ...>` schematic with no blank lines inside raw HTML blocks so `remark` never wraps child tags in `<pre><code>`.
4. **Preserve Blog Categories, Topic Clusters & Tags:** Both `/` (`HomeWritingExplorer`) and `/blog` expose the 3 primary categories (`Strategy & Operations`, `Models & Infrastructure`, `Systems Architecture`), 6 topic clusters, and `#tag` filters.
5. **Hub-and-spoke internal links (`>= 3`):** Every essay links to at least 3 valid internal routes or active `/blog/<slug>` essays. When retiring or renaming an essay, add a permanent `308` redirect in `next.config.ts` (`RENAMED_SLUGS`).

## 3. Option B Swiss Studio UI & Copy Rules

1. **Navigation Order:** Header navigation stays strictly `About` (`/about`) -> `Writing` (`/blog`) -> `Courses` (`/courses`) -> `Speaking & Teaching` (`/teaching`) with one right-aligned button: `Work With Me` (`/work-with-me`).
2. **Typography & Tokens:** Self-hosted `Plus_Jakarta_Sans` (`--font-plus-jakarta`, `font-display`, weight `600`, `-0.026em`..`-0.032em` tracking) for H1/H2/H3 display headings, `Inter` (`--font-inter` with OpenType `"cv02", "cv03", "cv04", "cv11"`) + `GeistSans` for UI/body (`65ch` prose measure), `JetBrains_Mono` (`font-mono`) strictly for metadata/tags/code, OKLCH Swiss Studio tokens (`--color-accent: oklch(0.42 0.115 165)`), and `prefers-reduced-motion: reduce` support.
3. **Zero Hero Urgency Pills or Slop Badges:** Never stack status/urgency pills at the top of a hero (`Q1 Charter Windows Open`, `Zero Dropped Leads`, `Reclaims 10+ hrs/wk`, `Live Cohort Filling Fast`). Use a single quiet metadata line (`PageHeader meta="..."`) when context is needed.
4. **Zero CV, Employer, Handle, Salary, or Rate-Card Leaks:**
   - **Never reference:** `Google` (as employer or `personal capacity` / `views my own`), `McKinsey`, `Columbia` (`Columbia CS`, `Columbia University`), `Meta` (employer), `Section.io`, `Webscale`, `patent-pending`, `angel investor`, `sudosoph` (X or GitHub), `Lesbians Who Tech`, `Listmonk`, `Productive Friction`, `voice.md`, `icp.md`, `Brand Brain`, or `AI Org Chart`.
   - **Never include:** Executive salary comparison numbers (`$250,000`, `$450,000`, `$300K`, `$65,000` coordinator anchor), public service/course/workshop price tags (`$297`, `$497`, `$750`, `$1,497`, `$2,500`, `$7,500`, `$15,000`), or placeholder price tokens (`$[XX]/mo`, `$[X,XXX]`). Note: referencing the industry *"Kill the $200/mo AI Subscription Stack"* course topic or open hardware component costs is allowed; pricing our own courses or advisory on-page is not.
   - **Verifiable practice proof allowed:** `300+` founders and operators trained live at Boulder Startup Week (`/bsw`), Women Who Code speaker, `20` curriculum modules with unlocked `x.1` lessons, and the `12-chapter` *Sovereign Stack* monograph.
5. **Zero Em-Dashes:** Never output Unicode `U+2014` or spaced double-hyphens in MDX, TSX, JSON, downloads, or social packs. Use colons, commas, parentheses, or periods.

## 4. Red Flags & Rationalization Counter-Table

Stop immediately if you catch yourself thinking any of the following under deadline or conversion pressure:

| Rationalization Under Pressure | Why It Violates the Standard & What to Do Instead |
|---|---|
| *"I'll put `$[XX]/mo` or `Scoped Charter` in a price row so the founder can fill it in before publish."* | **Violation:** Price rows and `$[XX]` placeholders turn an architectural studio monograph into a SaaS checkout template and risk shipping unapproved pricing. Omit price rows completely; use Founding Waitlist on `/courses` and 20-minute scoping on `/work-with-me`. |
| *"Adding subtle `Badge` pills like `'Q1 Advisory Windows Open'` avoids fake countdowns while creating urgency."* | **Violation:** Multi-badge hero headers are classic AI-generated landing-page slop. Use zero urgency pills; let clear typography and one primary button carry the hierarchy. |
| *"Putting Skool courses and Enterprise Advisory side-by-side in a 3-tier grid prevents bounce."* | **Violation:** Collapses the 3-surface architecture. Keep Skool tracks on `/courses` and executive diagnostics/Forward Deployed sprints on `/work-with-me` (with a quiet text bridge for the other audience). |
| *"`briefing: '...'` as a single string is faster and valid YAML."* | **Violation:** `briefing` in `PostFrontmatter` is `string[]` (3 concise bullets) to render a scannable briefing list, not a wall-of-text paragraph. |
| *"I'll set today's date in `publishedDate` and skip checking other posts."* | **Violation:** Duplicate `publishedDate` values fail `npm run qc` and make the archive look batch-generated. Inspect `content/blog/` dates first and assign a unique date. |
| *"The copy looks clean, so I don't need to run `npm run qc`."* | **Violation:** Manual reading misses subtle banned tokens, broken internal slugs, and word-count bounds. Running `node scripts/brand-quality-gate.mjs` is mandatory. |

## 5. Mandatory Verification Gate Before Completion

Before claiming any content, UI component, or page edit is ready, run:

```bash
node scripts/generate-blog-manifest.mjs && node scripts/brand-quality-gate.mjs && npx vitest run
```

All three commands must exit `0` with zero violations.

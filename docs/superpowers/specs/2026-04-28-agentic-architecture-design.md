# Agentic Architecture LLC — Site Design Spec
**Date:** 2026-04-28
**Status:** Approved — ready for implementation planning
**Repo:** sudosoph/agentic-architecture (public, new)
**Domain:** agenticarchitecture.ai

---

## 1. Identity & Goals

**Brand:** Sovereign AI Architect — local-first AI for engineers and SMBs  
**Positioning:** The person who runs 28.4 t/s locally, helps you stop paying OpenAI, and runs her own business entirely on local AI agents  
**Target revenue:** $1M / 12 months via parallel-tracking content + consulting + SaaS  

**Three pillars (all reinforce each other):**
1. **Technical authority** — HN engineers: depth, benchmarks, reproducible configs, OSS tools
2. **SMB value** — "stop paying $500/mo to OpenAI, I'll automate your workflows locally"
3. **Agentic proof-of-work** — this business itself runs on the same agents she builds for clients: inbox triage, booking, payments, newsletter, community — all agentic, all local where possible

The third pillar is the differentiator no other consultant can credibly claim. It's not a feature — it's the brand.

**Design north stars:** jxnl.co (structure), simonwillison.net (velocity), gwern.net (density), antirez (directness)

---

## 2. Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router + Turbopack | 16.2.4 |
| CSS | Tailwind CSS-first (no config file) | 4.2.4 |
| CMS | Keystatic GitHub mode | latest |
| MDX | next-mdx-remote + Shiki | latest |
| Fonts | JetBrains Mono + Geist Sans | — |
| Deployment | Cloudflare Pages + @cloudflare/next-on-pages | latest |
| Runtime | Edge (API routes where possible), Node (email only) | — |

---

## 3. Design System

### Tailwind @theme — globals.css

```css
@import "tailwindcss";

@theme {
  /* Palette */
  --color-bg:        var(--color-zinc-950);
  --color-surface:   var(--color-zinc-900);
  --color-border:    var(--color-zinc-800);
  --color-text:      var(--color-zinc-100);
  --color-muted:     var(--color-zinc-400);
  --color-accent:    var(--color-amber-400);
  --color-online:    var(--color-emerald-400);
  --color-bench:     var(--color-cyan-400);
  --color-pressure:  var(--color-rose-400);

  /* Shape */
  --radius: 0px;

  /* Typography */
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'Geist', sans-serif;
}
```

### Rules (no exceptions)
- Zero border radius everywhere
- 1px `border-zinc-800` borders for all surfaces
- No box shadows — use borders for depth
- Metrics, benchmarks, code, timestamps: JetBrains Mono + cyan-400
- Prose, body copy: Geist Sans + zinc-100
- Status: emerald-400 (online), amber-400 (processing/pending), rose-400 (offline/error)
- High-density — content fills space. Minimal decorative whitespace.

---

## 4. Directory Structure

```
/app
  /(site)/
    layout.tsx                    → Nav + Footer wrapper
    page.tsx                      → / Home
    about/page.tsx                → /about
    stack/page.tsx                → /stack (hardware + software manifest)
    benchmarks/page.tsx           → /benchmarks (live model perf table)
    open/page.tsx                 → /open (public metrics dashboard)
    changelog/page.tsx            → /changelog (public product + site changelog)
    speaking/page.tsx             → /speaking (topics, past talks, booking CTA)
    newsletter/page.tsx           → /newsletter (Substack archive embed + subscriber count)
    contact/page.tsx              → /contact
    consult/page.tsx              → /consult (Cal.com + Stripe, Phase 1)
    blog/
      page.tsx                    → /blog listing
      [slug]/page.tsx             → /blog/[slug] post
    not-found.tsx                 → /404 branded error page (links to blog + consult)
  /keystatic/[[...params]]/
    page.tsx                      → /keystatic CMS (no site layout)
  /api/
    system/route.ts               → telemetry bridge (edge)
    contact/route.ts              → Resend relay (node)
    og/route.tsx                  → Satori OG images (edge)
    waitlist/route.ts             → Resend Audiences capture (edge)
  /sitemap.ts                     → auto-generated sitemap
  /robots.ts                      → robots.txt

/components
  /ui/
    Button.tsx                    → amber-400 accent, 0px radius, variants: primary/ghost/outline
    Card.tsx                      → zinc-900 bg, zinc-800 border, 0px radius
    Badge.tsx                     → status/tag badges
    StatusDot.tsx                 → animated pulse (emerald/amber/rose)
    Input.tsx                     → zinc-800 border, zinc-950 bg, zinc-100 text
    CostCalculator.tsx            → interactive SMB ROI calculator (client component)
    SubstackEmbed.tsx             → newsletter signup widget (Substack embed)
    WaitlistForm.tsx              → SaaS waitlist capture → /api/waitlist → Resend Audiences
    Testimonial.tsx               → social proof card (name, role, quote, optional avatar)
    ReadingProgress.tsx           → sticky top bar showing scroll % on blog posts (client)
    RelatedPosts.tsx              → 2-3 related posts below article content
  /site/
    Nav.tsx                       → top nav, JetBrains Mono wordmark, zinc-950 bg, 1px bottom border
    Footer.tsx                    → links, social handles, Discord invite, RSS
    PageHeader.tsx                → title + meta block, 1px bottom border
    GiscusComments.tsx            → GitHub Discussions comments
  /system/
    SystemStatusCard.tsx          → client component, fetches /api/system, handles offline
    MetricBadge.tsx               → single metric (label + value, cyan-400)
    TelemetryGrid.tsx             → grid of MetricBadges

/content
  /blog/
    96gb-ram-thesis.mdx           → seed post (full article, pre-loaded)

/lib
  mdx.ts                          → MDX compiler + Shiki (tokyo-night theme)
  rss.ts                          → RSS/Atom feed generation
  keystatic.ts                    → Keystatic reader helpers

/public
  AGENTS.md                       → AI crawler manifest
  llms.txt                        → LLM crawler standard (llmstxt.org)
  og-default.png                  → static OG for homepage + about
  benchmarks.json                 → historical benchmark data for /benchmarks page

keystatic.config.ts
.gitignore                        → docs/superpowers/, .env*, .claude/
```

---

## 5. Routes & Pages

### 5.1 — / (Home)

Two entry points above the fold: one for engineers, one for SMBs. SaaS waitlist capture. Live hardware proof.

```
┌──────────────────────────────────────────────────────┐
│ NAV  Agentic Architecture    blog  stack  consult  › │
├────────────────────────┬─────────────────────────────┤
│ HERO                   │ SYSTEM STATUS               │
│                        │ [SystemStatusCard]           │
│ Sophia Stein           │                             │
│ Sovereign AI Architect │ ● ONLINE          [emerald] │
│ Boulder, CO            │ RAM    96 GB      [cyan]    │
│                        │ SPEED  28.4 t/s   [cyan]    │
│ [Book a System Audit]  │ MODEL  GLM-4 9B Q8_0        │
│ [Read the 96GB Thesis] │ GTT    90 GB / 90112 MB     │
│                        │ BACK   ROCm 7.3   [cyan]    │
├────────────────────────┴─────────────────────────────┤
│ COST CALCULATOR  [CostCalculator — client component]  │
│ "Your OpenAI bill: $___/mo → Local AI ROI: ___mo     │
│  payback on sovereign hardware"                       │
├──────────────────────────────────────────────────────┤
│ SAAS WAITLIST  [WaitlistForm]                        │
│ Building LocalFlow — local AI workflow automation.    │
│ Zero per-run cost. Join the waitlist.                 │
│ [email ________________] [Join →]                    │
├──────────────────────────────────────────────────────┤
│ LATEST THESIS  [featured blog post card, full width] │
├──────────────────────────────────────────────────────┤
│ SERVICES                                             │
│ [Card: Workstation Audit $499]                       │
│ [Card: Workflow Automation from $2,000]              │
│ [Card: Private RAG Build from $1,500]                │
├──────────────────────────────────────────────────────┤
│ SOCIAL PROOF  [3× Testimonial cards]                 │
│ 1px zinc-800 borders, name + role in mono            │
│ Add 2-3 real quotes as soon as first clients exist   │
│ Placeholder: GitHub star count + HN upvotes badge    │
├──────────────────────────────────────────────────────┤
│ OPEN SOURCE  [OSS project cards as repos launch]     │
│ Repo name · star count · one-line description        │
│ [View on GitHub →]                                   │
└──────────────────────────────────────────────────────┤
│ FOOTER                                               │
└──────────────────────────────────────────────────────┘
```

**SystemStatusCard:** client component, fetches `/api/system` on mount, 30s polling. Online: emerald-400 pulse + live metrics. Offline: rose-400 static + "Offline — node unreachable." Never breaks layout.

**CostCalculator:** single input (current $/mo on cloud AI), outputs estimated hardware ROI timeline and monthly savings. Shareable URL via query param (`?spend=500`). No backend — pure client math.

**WaitlistForm:** posts to `/api/waitlist` → Resend Audiences (`waitlist-localflow` list). Inline success state.

**JSON-LD:** ProfessionalService schema (name, description, areaServed: Boulder CO + Remote, offers list).

---

### 5.2 — /blog

High-density listing. Every post is an HN candidate.

- Pagefind search bar (post-build static index)
- Posts sorted newest-first
- Each entry: title (mono), date + reading time (muted mono), 2-sentence excerpt, tag badges (cyan-400 outline)
- 1px zinc-800 divider between posts
- RSS icon linking to /feed.xml
- No pagination for first 50 posts — flat list

---

### 5.3 — /blog/[slug]

Long-form technical theses. The core proof-of-work content.

- Max ~720px prose column
- PageHeader: title, date, reading time, tags
- MDX rendered with Shiki `tokyo-night` code blocks
- Benchmark/data tables: cyan-400 header row, mono values
- Inline `<Callout>` component for key insights (amber-400 left border)
- ReadingProgress bar (sticky top, cyan-400, client component)
- SubstackEmbed block mid-article ("Get the next thesis in your inbox")
- RelatedPosts section (2-3 posts, below article, before comments)
- GiscusComments below related posts
- Internal links: every post links to /consult and one related /stack or /benchmarks reference
- OG image: generated via `/api/og?title=...&metric=28.4+t/s` (branded card, Industrial Brutalism layout)
- JSON-LD: TechArticle (headline, author, datePublished, keywords, benchmarkData if present)
- SEO: each post targets one primary keyword (see §8 keyword strategy)

**Seed post frontmatter:**
```yaml
---
title: "Optimizing the Framework 16 for Local LLMs: The 96GB RAM Thesis"
slug: "96gb-ram-thesis"
publishedDate: "2026-04-28"
description: "28.4 t/s on GLM-4 9B Q8_0 via ROCm 7.3, 90GB GART override, and a unified Vulkan/ROCm strategy on Ryzen AI 9 Strix Point."
tags: ["local-llm", "amd", "rocm", "framework-16", "benchmarks"]
---
```

Brand Integration section uses approved names: Live Telemetry, Consulting Intake, Content Pipeline, Workstation Audits, Private RAG Builds, Cloud-to-Local Migration.

---

### 5.4 — /about

**Not a resume. A narrative.**

Structure:
1. **The hook** — one sharp sentence about a real frustration with cloud compute costs
2. **The experiment** — the Framework 16 decision, the 90GB GART override, what hitting 28.4 t/s on a portable machine actually means in 2026
3. **The conviction** — why this matters: SMBs spending $500/mo on API calls for automations that should cost zero
4. **The agentic operations statement** — this business runs on the same agents she builds for clients. Inbox triage, booking confirmations, payment flows, newsletter publishing, community pings — all automated with local models. She is not available 24/7; her agents are. This is not a feature, it's a philosophy.
5. **The work** — consulting, workshops, OSS projects, courses. 2-3 sentences each, no bullet lists
6. **The stack table** — JetBrains Mono table: hardware, OS, inference backend, models in rotation, tools
7. **Open source** — links to GitHub repos as they launch, brief descriptions
8. **Now** — what's being built currently, where to reach her (Discord, GitHub, Twitter — not LinkedIn)

**Tone:** Direct. First person. No "passionate about AI" language. Specific claims only ("28.4 t/s" not "blazing fast").

JSON-LD: Person schema (name, jobTitle, url, sameAs: Twitter, GitHub, LinkedIn).

---

### 5.5 — /stack

Dedicated hardware + software manifest. HN engineers link these independently. Submittable as its own HN post.

Sections:
- **Hardware:** Framework 16 specs (CPU, RAM, storage, display), why each choice
- **Operating System:** Ubuntu 26.04, kernel params, GRUB config
- **Inference:** Ollama version, ROCm 7.3, GART config, active env vars
- **Models in rotation:** Table of model × quantization × backend × t/s achieved
- **Development tools:** Editor, terminal, shell config, dotfiles link
- **Web stack:** Next.js 16, Tailwind 4, Cloudflare Pages — links to source repo
- **Self-hosted services:** n8n (what automations run), what's on Hetzner VPS

Updated manually when configs change. No live data — this is a curated manifest, not a dashboard.

---

### 5.6 — /benchmarks

**The hardware proof-of-work page. Unique to this site. Submittable as Show HN.**

Layout: live-updating table of model benchmark results from the Framework 16.

```
┌──────────────────────────────────────────────────────────────────┐
│ LIVE BENCHMARKS  ● ONLINE [emerald]  Last updated: 14s ago       │
├────────────────┬──────────┬─────────┬──────────┬────────────────┤
│ Model          │ Quant    │ Backend │ Speed    │ GTT Used       │
├────────────────┼──────────┼─────────┼──────────┼────────────────┤
│ GLM-4 9B       │ Q8_0     │ ROCm    │ 28.4 t/s │ 11.2 GB        │
│ GLM-4 9B       │ Q8_0     │ Vulkan  │ 19.5 t/s │ 11.2 GB        │
│ Qwen-2.5-72B   │ Q4_K_M   │ ROCm    │ 6.2 t/s  │ 48.3 GB        │
│ DeepSeek-Coder │ Q6_K     │ ROCm    │ 11.8 t/s │ 19.4 GB        │
│ ...            │ ...      │ ...     │ ...      │ ...            │
└────────────────┴──────────┴─────────┴──────────┴────────────────┘
```

Data source: `/api/system` for live status + `/public/benchmarks.json` for historical benchmark table (updated by Sophia manually or via automated benchmark run script committed to repo). Table is static + hydrated on load. Falls back gracefully when node is offline — shows last-known data with amber-400 "Cached" badge.

---

### 5.7 — /open

**Transparent metrics dashboard. Builds trust with SMBs, signals velocity to HN.**

Inspired by Ghost/Plausible/Baremetrics public dashboards. This becomes a recurring HN post: "Building an AI consulting practice in public — Month 6."

Sections (manually updated monthly via Keystatic):
- Newsletter subscribers (Substack)
- GitHub stars (total across repos)
- Consulting sessions booked (month)
- Course students (cumulative)
- SaaS waitlist signups
- Monthly revenue (rounded, no client detail)
- **Agent actions this month** (emails triaged, replies drafted, posts published, leads nurtured) — makes the agentic ops tangible and shareable
- What shipped this month
- What's next

Rendered from a `/content/open/` MDX collection in Keystatic. Each month is a new entry.

---

### 5.8 — /contact

Lead capture. Simple. No friction.

Fields: Name, Email, Company (optional), Type (Workstation Audit / Workflow Automation / Private RAG / Speaking / Other), Message.

Bot defense: Cloudflare Turnstile (free, invisible challenge).

Submission: POST `/api/contact` → Resend API → sophia@agenticarchitecture.ai with structured subject line.

Success: inline amber-400 badge "Message received — I'll reply within 24 hours." No redirect.

---

### 5.9 — /consult

**Live from day one. This is the revenue page.**

```
┌──────────────────────────────────────────────────────┐
│ CONSULTING                                            │
│ Sovereign AI infrastructure for engineers and teams  │
├──────────────────────────┬───────────────────────────┤
│ OFFERINGS                │ CAL.COM EMBED             │
│                          │                           │
│ ■ Workstation Audit      │ [Cal.com inline — shows   │
│   90 min · $499          │  availability + payment]  │
│   What you get: ...      │                           │
│   [Book & Pay →]         │                           │
│                          │                           │
│ ■ Workflow Automation    │                           │
│   Project · from $2,000  │                           │
│   What you get: ...      │                           │
│   [Inquire →]            │                           │
│                          │                           │
│ ■ Private RAG Build      │                           │
│   Project · from $1,500  │                           │
│   [Inquire →]            │                           │
│                          │                           │
│ ■ Monthly AI Office Hours│                           │
│   Retainer · $500/mo     │                           │
│   [Apply →]              │                           │
│                          │                           │
│ ■ Speaking / Workshops   │                           │
│   [Inquire →]            │                           │
└──────────────────────────┴───────────────────────────┘
│ LUMA EMBED — upcoming workshops + events             │
└──────────────────────────────────────────────────────┘
```

**Cal.com + Stripe integration:** The $499 Workstation Audit collects payment at booking via Cal.com's native Stripe integration. No separate payment step. No custom backend code. Configure in Cal.com dashboard: event type → payments → Stripe → $499.

**Stripe Payment Links** for retainer deposits and project deposits. These are generated in Stripe dashboard (no code) and linked as standard Button components. No Stripe SDK needed on the frontend at this stage.

**Luma embed:** Upcoming workshops, Boulder meetups, virtual office hours listed below offerings. Free. Zero maintenance.

---

### 5.10 — /keystatic (CMS Admin)

- GitHub OAuth via Keystatic (handles auth natively)
- Manages collections: `/content/blog/`, `/content/open/`
- Blog fields: title, slug, publishedDate, description, tags[], content (MDX)
- Open fields: month, subscribers, stars, sessions, students, waitlist, revenue, shipped, next, content (MDX)
- Sits outside `/(site)` route group — no shared Nav/Footer

---

## 6. API Routes

### /api/system — edge runtime

```typescript
// GET — fetches WORKSTATION_API_URL, returns normalized telemetry
// On failure: returns { online: false } — never 500s, never breaks frontend
// Cache-Control: s-maxage=30, stale-while-revalidate=60

Response shape:
{
  online: boolean
  ram_total_gb: number
  ram_used_gb: number
  ram_used_pct: number
  cpu_model: string
  inference_speed_tps: number
  model_loaded: string
  gtt_pool_mb: number
  gtt_used_mb: number
  backend: "rocm" | "vulkan" | "cpu"
  uptime_hours: number
  updated_at: string // ISO timestamp
}
```

### /api/contact — edge runtime

Validates Cloudflare Turnstile token → sends via Resend API. (Resend is HTTP-only, no Node.js deps — edge runtime works.)

```typescript
// POST { name, email, company, type, message, turnstileToken }
// Validates token with Cloudflare secret
// On success: Resend.emails.send() to sophia@agenticarchitecture.ai
// Subject: "[Contact] {type} — {name}"
// Returns: { success: true } | { error: string }
```

Env: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`

### /api/og — edge runtime

Generates branded OG images via Satori.

```typescript
// GET /api/og?title=...&date=...&metric=...&tag=...
// metric is optional (e.g. "28.4 t/s") — shown in cyan-400 if present
// Output: 1200×630 PNG
// Layout: zinc-950 bg, amber-400 post title, muted date/tag, cyan metric callout,
//         "agenticarchitecture.ai" wordmark in JetBrains Mono bottom-right
```

### /api/waitlist — edge runtime

Captures waitlist emails → Resend Audiences.

```typescript
// POST { email, product: "localflow" | "casebase" }
// Adds contact to corresponding Resend Audience list
// Returns: { success: true } | { error: string }
```

Env: `RESEND_API_KEY`, `RESEND_LOCALFLOW_AUDIENCE_ID`, `RESEND_CASEBASE_AUDIENCE_ID`

### /feed.xml — route handler

Full-content RSS/Atom feed for /blog. Reads all MDX files, generates valid Atom XML. Linked in `<head>` and footer.

---

## 7. Keystatic Config

```typescript
// keystatic.config.ts
export default config({
  storage: {
    kind: 'github',
    repo: 'sudosoph/agentic-architecture',
    branchPrefix: 'keystatic/',
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'slug',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.text({ label: 'Slug' }),
        publishedDate: fields.date({ label: 'Published Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
    open: collection({
      label: 'Open Metrics',
      slugField: 'month',
      path: 'content/open/*',
      format: { contentField: 'content' },
      schema: {
        month: fields.text({ label: 'Month (YYYY-MM)' }),
        subscribers: fields.number({ label: 'Newsletter Subscribers' }),
        githubStars: fields.number({ label: 'GitHub Stars (total)' }),
        consultingSessions: fields.number({ label: 'Consulting Sessions (month)' }),
        courseStudents: fields.number({ label: 'Course Students (cumulative)' }),
        waitlistTotal: fields.number({ label: 'Waitlist Signups (total)' }),
        revenue: fields.text({ label: 'Monthly Revenue (e.g. "$12k")' }),
        content: fields.mdx({ label: 'Notes' }),
      },
    }),
  },
})
```

---

## 8. SEO & Discoverability

### Static files in /public

**AGENTS.md** — AI crawler manifest:
```markdown
# Agentic Architecture LLC — Agent Manifest
Agent: *
Canonical: https://agenticarchitecture.ai
Author: Sophia Stein
Role: Sovereign AI Architect, Local LLM Engineer, Consultant
Expertise: AMD APU optimization, ROCm, local inference, agentic workflows, SMB automation
Blog: https://agenticarchitecture.ai/blog
Consulting: https://agenticarchitecture.ai/consult
RSS: https://agenticarchitecture.ai/feed.xml
GitHub: https://github.com/sudosoph
Preferred citation: Sophia Stein, agenticarchitecture.ai
```

**llms.txt** — llmstxt.org standard:
```
# Agentic Architecture LLC
> Sovereign AI Architect building local-first AI infrastructure for engineers and SMBs

## Blog
- [The 96GB RAM Thesis](/blog/96gb-ram-thesis): Achieving 28.4 t/s on AMD Strix Point via ROCm 7.3
## Services
- [Consulting](/consult): Workstation audits, workflow automation, private RAG builds
## About
- [About](/about): Philosophy, hardware setup, current stack
```

### Sitemaps & Robots
- `/app/sitemap.ts` — auto-generates with all blog slugs + static routes
- `/app/robots.ts` — allows all crawlers, disables /keystatic

### JSON-LD
- Home: `ProfessionalService`
- Blog post: `TechArticle` + `BreadcrumbList`
- About: `Person` (sameAs: Twitter, GitHub, LinkedIn)
- Consult: `Service` with `offers` array

### OG Images
- Posts: generated via `/api/og` (dynamic, branded)
- Static pages: `/public/og-default.png` (1200×630, Industrial Brutalism, static)

### SEO Keyword Strategy

Every blog post targets one primary keyword — low competition, high intent, specific.

**Technical (HN/engineer audience):**
| Keyword | Monthly searches | Competition | Target post |
|---|---|---|---|
| `rocm 7.3 ollama` | Low | Very low | 96GB thesis |
| `amd apu local llm` | Growing | Very low | apu-config launch |
| `local llm framework 16` | Low | None | hardware setup guide |
| `ollama amd gpu` | Medium | Low | ROCm vs Vulkan comparison |
| `gguf q8 amd rdna` | Low | None | quantization deep dive |
| `gartsize amdgpu linux` | Very low | None | kernel override guide |

**Commercial (SMB audience):**
| Keyword | Monthly searches | Competition | Target post |
|---|---|---|---|
| `replace openai api local` | Medium | Low | migration guide post |
| `local ai for small business` | Medium | Medium | SMB automation post |
| `ollama business automation` | Low | Very low | n8n + Ollama workflow post |
| `private rag no cloud` | Low | Low | private RAG playbook post |
| `ai workflow automation free` | High | High | long-tail variations |

**Internal linking rule:** every post links to /consult ("need this set up for you?") and cross-links to 1-2 other posts on related keywords. Builds topical authority cluster.

### HN Presence Strategy

- HN profile (news.ycombinator.com/user?id=sudosoph): bio with site link, written day 1
- Comment karma first: participate in local LLM / AMD / agentic threads before posting own content. 50+ quality comments before first submission.
- Submission cadence: max 1-2/month. Quality over frequency.
- Best times: Mon-Tue 9-11am ET
- "Show HN" for OSS tools. "Ask HN" for opinion pieces. Regular for technical posts.
- Never submit same day as other self-promo. Space out.
- Always engage with every comment on your own posts within 2hrs.

---

## 9. Integration Stack

### Email
| Job | Tool | Config |
|---|---|---|
| Personal email (sophia@ daily use) | Fastmail | Existing account, DKIM via Cloudflare DNS |
| Transactional (contact form, waitlist confirms) | Resend | Custom domain: `notifications.agenticarchitecture.ai` |
| Newsletter delivery | Substack | Embed widget on site, n8n auto-posts new content |

### Booking & Payments
| Job | Tool | Notes |
|---|---|---|
| 1:1 session booking | Cal.com hosted (free) | Embedded inline on /consult |
| Paid booking ($499 audit) | Cal.com + Stripe native integration | Payment collected at booking, no custom code |
| Retainer/project deposits | Stripe Payment Links | Generated in Stripe dashboard, no SDK needed |
| Digital products (ebooks, Phase 1) | Lemon Squeezy | 5% + $0.50, merchant of record, handles VAT |
| Future SaaS subscriptions | Stripe Billing | Phase 2 |

### Analytics & Monitoring
| Job | Tool | Cost |
|---|---|---|
| Site traffic | Cloudflare Web Analytics | Free, already in dashboard |
| Product analytics (waitlists, funnels) | PostHog free tier | Free, 1M events/month |
| Error tracking | Sentry free tier | Free, native Next.js integration |

### Community & Distribution

**Platforms:**
| Platform | Purpose | Automation tier |
|---|---|---|
| **Hacker News** | Primary authority signal. New posts + Show HN for OSS. | Agent preps submission, Sophia one-taps (HN penalizes bots) |
| **Twitter/X** | Amplification, consulting DMs, benchmark updates | Tier 1 auto-post (blog threads); Tier 3 approval (original takes) |
| **Discord** | Technical community, OSS contributors, Twitch audience | Phase 1 — human-seeded, Phase 2 community manager agent |
| **GitHub** | OSS credibility. Stars → HN → consulting leads | Release agent auto-syndicates |
| **Substack** | Email newsletter + discovery network | Tier 1 auto-post via n8n |
| **dev.to** | Technical syndication, HN-adjacent | Tier 1 auto-post via n8n |
| **Luma** | Workshop + event registration on /consult | Manual |
| **GitHub Sponsors** | OSS revenue stream | Phase 1 (with first OSS launch) |
| **Skool** | Paid course community | Undecided — evaluate when first course launches |

Note: No LinkedIn. Distribution is engineer-native: HN, Twitter, GitHub, dev.to, Discord.

**Subreddit Distribution Map (agent-managed, tiered by content type):**

| Subreddit | Size | Content type | Automation |
|---|---|---|---|
| r/LocalLLaMA | 200k+ | Benchmarks, model configs, hardware | Tier 1 auto-post (highest relevance) |
| r/ollama | Growing | Ollama-specific configs, tips | Tier 1 auto-post |
| r/selfhosted | 400k+ | Sovereign compute, local services | Tier 1 auto-post (hardware + privacy angle) |
| r/AMD | 300k+ | AMD APU optimization, ROCm | Tier 1 auto-post (hardware posts only) |
| r/linux | 800k+ | Kernel params, GRUB, Ubuntu configs | Tier 2 (LLM scores ≥8 to auto-post) |
| r/homelab | 500k+ | 96GB build, hardware setup | Tier 2 (hardware/benchmark posts) |
| r/MachineLearning | 2.9M | Technical ML research-adjacent | Tier 2 (only highly technical posts) |
| r/artificial | 700k+ | General AI discussion | Tier 2 |
| r/learnmachinelearning | 450k+ | Educational content, tutorials | Tier 2 |
| r/Python | 1.4M | OSS library releases (`agentloop`, `apu-config`) | Tier 2 (OSS releases only) |
| r/webdev | 800k+ | Next.js + local AI stack posts | Tier 2 |
| r/automation | 300k+ | n8n + Ollama workflow posts | Tier 2 |
| r/entrepreneur | 1.2M | SMB consulting angle, business automation | Tier 3 (approval, business posts) |
| r/smallbusiness | 500k+ | "Stop paying OpenAI" content | Tier 3 (approval) |
| r/startups | 900k+ | AI automation for startups | Tier 3 (approval) |
| r/freelance | 300k+ | AI consulting practice building | Tier 3 (approval, career posts) |
| r/Boulder | 40k | Local consulting, events | Manual (Sophia posts) |
| r/Denver | 200k+ | Local SMB outreach | Manual |
| r/Colorado | 100k+ | Regional presence | Manual |

**Reddit posting rules baked into agent:**
- Never post same content to >3 subreddits same day
- Always rewrite title/intro for each subreddit's culture
- Always engage with top comments within 2hrs of posting (Sophia handles this)
- Respect karma/age requirements (agent checks before attempting)
- All posts include canonical link to agenticarchitecture.ai original

### Self-Hosted (Hetzner CX22, $5/mo)
Single VPS running Docker Compose + Caddy reverse proxy:
- **n8n** — full agentic operations engine (syndication + business automation)

### n8n Content Syndication Flow
```
Keystatic commit merged to main
  → GitHub webhook → n8n
    → Cross-post to Substack (triggers email to subscribers)
    → Cross-post to dev.to (canonical link preserved)
    → LLM crafts Twitter thread (5-7 tweets, technical + punchy) → auto-posts (Tier 1)
    → Ping Discord #announcements with excerpt + link
    → Trigger Cloudflare Pages rebuild
```

---

## 9b. Agentic Business Operations

**Core brand statement:** This consulting practice runs on the same agents Sophia builds for clients. Every automatable workflow is automated. She is not available 24/7 — her agents are.

**Chief of Staff model:** Agents handle publishing, distribution, inbox triage, booking, payments, community, and lead nurture. Sophia handles: writing, consulting calls, and approvals on the 5% of things that need a human. Nothing falls through the cracks. Nothing goes out unreviewed that matters.

Documented publicly on /about and /open as proof of work. Each agent workflow → blog post → OSS project → consulting offering.

### Agent Stack — Final Decision

**Two tools. That's it.**

```
OpenClaw (CEO interface)
    ↕ commands / responses
n8n self-hosted (factory floor)
    ↕ HTTP calls
Ollama on Framework 16 (LLM engine)
```

**OpenClaw** (openclaw.ai) — conversational chief of staff
- Natural language commands via Discord or iMessage: "what needs attention?", "post to HN", "draft reply to [name]"
- Browser automation: HN submissions, Product Hunt pages, research tasks
- Persistent memory: learns Sophia's voice, preferences, recurring patterns
- Connects to n8n via webhook to trigger any pipeline by voice command
- Runs locally — aligns with sovereign brand, every workflow is a blog post

**n8n self-hosted** (Hetzner CX22, $5/mo) — deterministic automation engine
- All webhooks (Cal.com, Stripe, Lemon Squeezy, GitHub)
- All scheduled tasks (daily digest, nurture sequences, community monitoring)
- All API chains (Substack, dev.to, Twitter, Reddit, Discord)
- HTTP node calls Ollama for content generation at specific steps
- Runs self-hosted because: $0/mo, brand-aligned ("I run my automation on hardware I own"), blog-worthy

**No Make.com, no Zapier, no Pipedream.** Managed automation tools work fine but contradict the brand and add cost. The n8n self-hosted setup itself is proof-of-work.

**No CrewAI/LangGraph** yet. Add when building autonomous research agents for SaaS products (Phase 2+).

### OpenClaw Daily Brief
Every morning, OpenClaw sends Sophia a structured digest in Discord DM:

```
☀️ MORNING BRIEF — Tuesday Apr 29

📊 METRICS (last 24hrs)
  Substack: +12 subscribers → 847 total
  GitHub stars: +8 → 234 total (apu-config)
  Stripe: $499 payment received — Workstation Audit booked
  Waitlist: +23 signups (LocalFlow)

📥 INBOX NEEDS YOU (3 items)
  1. [Consulting lead] Sarah @ TechCorp — workflow automation inquiry
     [Draft ready] React ✅ to send · ✏️ to edit
  2. [Speaking request] Denver AI Meetup — panel invitation
     [Draft ready] React ✅ to send
  3. [Press] TechCrunch contributor — local AI story
     [Draft ready] React ✅ to send

🟠 HN OPPORTUNITY
  "Ask HN: Best local LLM setups in 2026?" — 847 points, 203 comments
  Your benchmarks are directly relevant. Draft comment ready.
  React 🟠 to post

📅 TODAY
  Blog post due: "ROCm vs Vulkan — final verdict" (drafted in Keystatic)
  Publish → triggers full distribution pipeline automatically

No other action needed.
```

### Three-Tier Oversight Model

```
TIER 1 — FULLY AUTOMATED (zero oversight)
  Blog published → Substack email to subscribers
  Blog published → dev.to cross-post (canonical link preserved)
  Blog published → Twitter thread (LLM-crafted, auto-posted)
  Blog published → Discord #announcements
  Cal.com booking confirmed → confirmation email + prep doc (Resend)
  Cal.com booking confirmed → 24hr reminder email (Resend)
  Stripe payment → receipt + 3-email onboarding drip (LLM-personalized)
  Lemon Squeezy order → download delivery + Discord invite
  PostHog event tracked on all above

TIER 2 — AGENT DRAFTS, AUTO-SENDS AFTER 2HR CANCEL WINDOW
  Contact form lead → 48hr nurture email (LLM drafts, Sophia can cancel via Discord ❌)
  7-day nurture → relevant blog post recommendation (LLM selects from catalog)
  30-day nurture → consulting offer (if no conversion detected)
  Twitter benchmark update tweet (when new benchmarks.json committed)

TIER 3 — AGENT DRAFTS, EXPLICIT APPROVAL REQUIRED
  Consulting inquiry email replies (Discord approval card → react ✅/❌/✏️)
  Speaking / press request replies
  Any email containing scope, pricing, or deliverables
```

**Approval mechanism — single Discord private channel `#agent-approvals`:**
```
n8n sends formatted card to #agent-approvals:

  📧 CONSULTING LEAD — [Name], [Company]
  Inquiry type: Workflow Automation
  
  DRAFTED REPLY:
  "Hi [Name], thanks for reaching out about automating..."
  
  React ✅ to send · ❌ to discard · ✏️ opens n8n edit URL
```
Sophia approves from phone in 5 seconds. No dashboards.

### Agent Workflow Specs

**Inbox Triage Agent**
```
New email → Fastmail IMAP webhook → n8n
  → Python script (Ollama HTTP): classify into
    [consulting-lead | speaking | press | support | noise]
  → consulting-lead:
      Draft reply (Ollama, tone: direct + warm)
      → #agent-approvals Discord card (Tier 3)
      → Add to Resend Audiences [consulting-leads] list
  → speaking:
      Draft reply with Cal.com link
      → #agent-approvals Discord card (Tier 3)
  → support:
      Query private-rag knowledge base (local)
      Draft answer
      → Auto-send after 2hr window (Tier 2)
  → noise: archive via Fastmail API, no notification
```

**Content Publishing Agent**
```
Keystatic commit merged to main → GitHub webhook → n8n
  → Cloudflare Pages build triggered
  → LLM generates Twitter thread (5-7 tweets, technical + punchy)
  → Auto-post Twitter thread (Tier 1)
  → Substack API: publish post
  → dev.to API: cross-post
  → Discord #announcements: excerpt + link
  → n8n wait 48hrs → check Substack open rate
    → If open rate >30%: generate "top insight" quote tweet → auto-post
```

**Booking & Payment Agent**
```
Cal.com webhook (booking confirmed) → n8n
  → Resend: confirmation email (LLM personalizes based on booking type)
  → Resend: 24hr reminder with prep materials
  → PostHog: track booking event
  → #consulting-log (private Discord): internal ping

Stripe webhook (payment) / Lemon Squeezy webhook (order) → n8n
  → Resend: receipt
  → Resend: onboarding drip (3 emails, LLM-personalized to product)
  → Digital product: Lemon Squeezy delivers download
  → Discord invite link sent if community access included
  → PostHog: track revenue
  → Queue /open metrics update
```

**Lead Nurture Agent**
```
Contact form → /api/contact → n8n
  → Tag in Resend Audiences by inquiry type
  → T+48hrs: LLM drafts relevant follow-up → Tier 2 (2hr cancel window)
  → T+7d: LLM selects most relevant blog post → auto-send
  → T+30d: If no reply detected (IMAP check) → consulting offer → Tier 2
```

**HN Submission Agent** (Tier 3 — one-tap approval)
```
Trigger: new blog post published OR new OSS release tagged
  → n8n
    → LLM generates 3 candidate HN titles (optimised for HN front page:
       specific, no hype words, matches "Ask HN / Show HN / [Post]" format)
    → LLM analyses best submission time (HN traffic peaks: 9-11am ET weekdays)
    → LLM selects: regular submission vs Show HN vs Ask HN
    → Discord #agent-approvals card:

      🟠 HN SUBMISSION READY
      Post: "The 96GB RAM Thesis"
      Suggested type: [Show HN] — new technical content with demo
      
      Title options:
      1. "Show HN: 28.4 t/s on a laptop APU – ROCm 7.3 + 90GB GART override"
      2. "Show HN: Local LLM at Q8 precision on a Framework 16 (no GPU, no VRAM)"
      3. "How I broke AMD's 50% GART ceiling to run 72B models locally"
      
      Best time to submit: Tomorrow 9:30am ET
      URL: https://agenticarchitecture.ai/blog/96gb-ram-thesis
      
      React ✅ approve #1 · 2️⃣ approve #2 · 3️⃣ approve #3 · ✏️ edit

OpenClaw handles the actual submission via browser control.
Sophia taps ✅ in Discord → OpenClaw opens browser → navigates to
news.ycombinator.com → logs in → submits with selected title.
~15 seconds total. Human-initiated, agent-executed.
```

**GitHub Release Agent**
```
Trigger: GitHub webhook on [release published] OR [repo created] OR [star milestone]
  → n8n

  New OSS release:
    → LLM drafts release announcement (technical, specific, no hype)
    → Twitter: auto-post (Tier 1)
    → Discord #announcements: auto-post (Tier 1)
    → Reddit: draft posts for r/LocalLLaMA, r/Python, r/selfhosted
       → Tier 2 auto-post (LLM confirms ≥8 relevance score)
    → Keystatic: create blog post draft ("Introducing [tool]: [what it does]")
       → Sophia writes + publishes → triggers full content pipeline
    → HN submission prep → Tier 3 approval card

  Star milestone (100 / 500 / 1000 / 5000):
    → Tweet: "Just hit [N] stars on [repo] — [one sentence what it does] [link]"
    → Discord #announcements: celebrate
    → ≥1000 stars: HN submission prep for "[Show HN: My open source tool hit 1k stars]"

  New repo created:
    → Auto-add GitHub Sponsors button (via GitHub API)
    → Populate README template with standard sections
    → Discord #announcements: "New repo: [name]"
```

**Reddit Distribution Agent**
```
Trigger: new blog post published (from content pipeline)
  → n8n
    → LLM reads post, extracts: topic, technical depth, primary audience
    → Scores relevance against all subreddits in distribution map
    → Selects top 2-3 subreddits (never >3/day)
    → For each selected subreddit:
        LLM rewrites title + opening paragraph for subreddit culture
        LLM checks: does this subreddit allow self-promotion? karma req met?
        If clear: Tier 1/2 auto-post OR Tier 3 approval card
    → Schedules posts 2-4hrs apart (not simultaneous)
    → Monitors for replies → surfaces to #reading-queue for Sophia to engage
```

**Community Monitor Agent** (Phase 2 — 100+ Discord members)
```
Scheduled every 2hrs → n8n
  → Scan Discord #help channels for questions unanswered >2hrs
    → Ollama: query knowledge base (private-rag over blog + docs)
    → Confident (>0.85): post reply tagged "[Bot — verify before acting]"
    → Uncertain: → #agent-review card for Sophia
  → Surfaces top unanswered thread to Sophia daily digest
```

**Social Listening + Opportunity Agent** (Phase 2)
```
Scheduled daily → n8n
  → Sources: HN Algolia API, Reddit RSS (all subreddits in map), Twitter search
  → Keywords: "local llm", "rocm amd", "framework 16", "ollama", "agentic workflow",
               "stop paying openai", "local inference", "sovereign compute", "gguf"
  → Ollama scores each thread (1-10 relevance + opportunity type)
  → Score ≥7: #reading-queue with LLM summary + "why this matters"
  → Score ≥9: draft response → #agent-approvals
  → Trend detected (same topic in 3+ threads): draft blog post outline → Keystatic draft
  → Someone asks "who does local AI consulting in Boulder": flag immediately → Tier 3
```

### What This Means for the Site

- `/about`: "My inbox is triaged by a local LLM. Booking confirmations go out automatically. This post was syndicated by a workflow. I review what matters; agents handle the rest."
- `/open`: tracks "agent actions this month" (emails triaged, replies drafted, posts syndicated, leads nurtured)
- Each workflow → blog post → OSS release → consulting offering
- The site is the live demo of what you sell

### Comments, Search, CMS
| Tool | Purpose |
|---|---|
| Giscus | Blog comments via GitHub Discussions |
| Pagefind | Static search (post-build, runs as build step) |
| Keystatic | CMS in GitHub mode |

---

## 10. Environment Variables

```bash
# Workstation telemetry
WORKSTATION_API_URL=https://system.agenticarchitecture.ai

# Email (Resend — transactional)
RESEND_API_KEY=
RESEND_FROM_ADDRESS=hello@notifications.agenticarchitecture.ai
RESEND_TO_ADDRESS=sophia@agenticarchitecture.ai
RESEND_LOCALFLOW_AUDIENCE_ID=
RESEND_CASEBASE_AUDIENCE_ID=

# Bot defense
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Blog comments
NEXT_PUBLIC_GISCUS_REPO=sudosoph/agentic-architecture
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=

# Booking
NEXT_PUBLIC_CAL_USERNAME=sudosoph

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_AUDIT_PRICE_ID=

# Digital products
NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID=

# CMS (Keystatic GitHub OAuth)
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Error tracking
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# Automation (n8n)
N8N_WEBHOOK_SECRET=
N8N_HETZNER_URL=https://n8n.agenticarchitecture.ai  # internal, not public

# Agentic ops (set in n8n environment, not in Next.js)
# FASTMAIL_IMAP_HOST, FASTMAIL_IMAP_USER, FASTMAIL_IMAP_PASS
# SUBSTACK_PUBLICATION_ID
# DEVTO_API_KEY
# TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET
# DISCORD_WEBHOOK_URL (for #announcements)
# DISCORD_AGENT_REVIEW_WEBHOOK_URL (for flagged agent replies)
# CAL_WEBHOOK_SECRET (booking confirmation agent)
# STRIPE_WEBHOOK_SECRET (payment agent)
# LEMONSQUEEZY_WEBHOOK_SECRET (digital product agent)
```

---

## 11. GitHub Repo & Deployment

### Repository
- Name: `sudosoph/agentic-architecture`
- Visibility: Public
- Description: "Source for agenticarchitecture.ai — Sovereign AI Architect"
- Topics: `nextjs`, `tailwind`, `local-llm`, `keystatic`, `cloudflare-pages`

### .gitignore additions
```
# Business strategy (never public)
docs/superpowers/

# Credentials
.env
.env.local
.env.*

# Claude memory
.claude/

# Build artifacts
.next/
.vercel/
.wrangler/
```

### Cloudflare Pages
- Build command: `npx @cloudflare/next-on-pages && npx pagefind --site .vercel/output/static` (verify Pagefind path against next-on-pages output at implementation time — may need `--site out` depending on adapter version)
- Output directory: `.vercel/output/static`
- Node version: 20
- All env vars set in Cloudflare Pages dashboard
- Custom domain: agenticarchitecture.ai

### Deploy triggers
- Push to `main` → auto-deploy
- Keystatic commit (new post) → same pipeline via branch merge

---

## 12. Email DNS (Cloudflare Dashboard — ops, not code)

Complete before sending any email:

- [ ] **Fastmail SPF:** `v=spf1 include:spf.messagingengine.com ~all` on `agenticarchitecture.ai`
- [ ] **Fastmail DKIM:** 2× TXT records from Fastmail → Settings → Domains → agenticarchitecture.ai
- [ ] **DMARC:** `v=DMARC1; p=none; rua=mailto:sophia@agenticarchitecture.ai`
- [ ] **Resend domain:** verify `notifications.agenticarchitecture.ai` in Resend dashboard (adds its own DKIM)
- [ ] **Substack custom domain** (optional): configure `newsletter.agenticarchitecture.ai` as Substack sending domain if desired

---

## 13. Content Seed

### /content/blog/96gb-ram-thesis.mdx
Full article already written. Frontmatter as specified in §5.3. Brand integration section uses approved naming (no Gemini-style names). Code blocks use Shiki `tokyo-night`. Benchmark table gets cyan-400 styling via MDX component.

### /content/open/2026-04.mdx
First /open entry — launch baseline. Honest zeros: 0 subscribers, 0 stars, 0 sessions. "What shipped: site launch." This entry itself is a future HN post.

### Static pages
- /about: narrative draft to be written at implementation time based on §5.4 structure
- /stack: populated from actual Framework 16 config at implementation time
- /benchmarks: seeded with data from the 96GB thesis benchmark table

---

---

## 14. MicroSaaS & AI-Native $1M ARR Playbook

These principles are baked into how the site and products are built — not afterthoughts.

### Small Bets / Rapid Vertical SaaS Model

Inspired by Marc Lou (35 launches, 5 winners) and Pieter Levels (12 startups in 12 months). The model only works with a reusable boilerplate. Without it, each launch takes weeks. With it, 48-72 hours.

**The boilerplate project** (builds immediately after agenticarchitecture.ai ships):
```
/boilerplate
  Next.js 16 + Tailwind 4 (same as main site, same design tokens)
  Better Auth (user accounts, GitHub + Google OAuth)
  Stripe Billing (subscriptions + one-time, annual billing included)
  Lemon Squeezy (digital products)
  Resend (transactional email + onboarding drip)
  PostgreSQL + Drizzle ORM (Neon free tier or Cloudflare D1)
  PostHog (product analytics)
  Sentry (error tracking)
  Ollama integration (HTTP client, local LLM ready)
  Cloudflare Pages deployment (same pipeline)
  n8n webhook templates (launch automation pre-wired)
```

**Launch automation agent** — OpenClaw + n8n pipeline triggered by one command:
```
Sophia: "launch [product name] waitlist"
  → OpenClaw → n8n pipeline:
    1. Create Resend Audience for product waitlist
    2. Add WaitlistForm to boilerplate deploy (env var swap)
    3. Deploy to Cloudflare Pages on product subdomain
    4. Create Product Hunt draft (browser automation)
    5. Draft Twitter thread announcing waitlist
    6. Draft relevant subreddit posts (Reddit Distribution Agent)
    7. Create HN submission prep card
    8. Add product to homepage OSS/Products section
    9. Create Keystatic blog post draft: "Building [product]: why and how"
    → Discord brief: "Waitlist live at [url]. 5 items queued for your approval."
```

**The 30-day rule:** If a product has <50 waitlist signups and 0 paying users in 30 days → shelve it. n8n sends a "decision time" card on day 30 for every product.

**Traction signals to double down:**
- 50+ waitlist signups in week 1
- Any paying customer in first 30 days  
- An HN comment that says "I would pay for this"
- 100+ GitHub stars in first week (for OSS)

**Vertical launch priority order** (per earlier analysis):
1. LocalFlow (largest TAM, builds on OSS catalog, streamable on Twitch)
2. CaseBase (legal RAG, fastest path to $1M ARR, Boulder market reachable)
3. InboxZero SaaS (wrapper around inbox-agent OSS, $49/mo, fast to build)
4. Remaining verticals as boilerplate makes them fast

### Revenue Acceleration

**Charge from day one.** No free tiers on the SaaS until there's demand signal. The OSS tool is free. The hosted/setup service is paid.

**Annual billing on every SaaS product.** Stripe supports annual plans natively. Offer 2 months free for annual. Improves cash flow dramatically and reduces churn. Add annual option to every pricing page from launch.

**Lifetime deals for early adopters.** First 50 customers on LocalFlow/CaseBase get a one-time LTD price ($299-499). Creates immediate cash, word of mouth, and committed beta users. Run via Lemon Squeezy.

**Productize consulting immediately.** Every repeatable consulting engagement becomes a product within 90 days:
- Workstation Audit → documented checklist → $49 ebook → $299 DIY course
- Workflow build → repeatable template → $79 n8n template pack
- RAG setup → deployment script → free OSS → $1.5k setup service

### Distribution Additions

**Product Hunt:** Each OSS tool and SaaS launch gets a Product Hunt page. n8n agent creates the draft; Sophia approves and launches. Not as authoritative as HN but drives early user signups. Best day: Tuesday.

**Public status page:** status.agenticarchitecture.ai via Cloudflare health checks (free). Shows uptime for agenticarchitecture.ai and the live telemetry endpoint. Signals seriousness to B2B buyers. Auto-provisioned, zero maintenance.

**Public roadmap:** GitHub Projects on the main repo. Visible at /roadmap (redirect). HN engineers check these. Each feature card is a conversation starter.

### Content Velocity (Simon Willison Model)

**TIL posts:** Short "Today I Learned" posts (200-400 words) published frequently. Each is an HN comment worth of insight turned into indexable content. Simon Willison has 2000+ of these. They compound.

**Changelog as content:** Every significant OSS update, config change, or benchmark improvement = a micro-post. Published to /changelog (Keystatic-managed), syndicated to Twitter by the content agent.

**README-as-blog-post:** Every OSS repo README is written to HN standards — specific, reproducible, with benchmark numbers. The README is the first impression for HN "Show HN" submissions.

**Post timing:** Publish Monday or Tuesday morning ET. Agent schedules Substack + dev.to + Twitter + Reddit distribution for 9am ET regardless of when Sophia actually writes.

### Conversion Optimisation

**Testimonials:** Add real client quotes to homepage social proof section within 30 days of first consulting engagement. Even 2 specific quotes ("saved us $400/mo on OpenAI") convert better than any design element.

**Exit intent:** Sticky bottom bar (not popup) appears when user scrolls up on any page: *"Running local AI? Get the optimization guide free."* → newsletter signup. Client-side, no cookies needed.

**Consulting CTA in every post:** Every blog post includes one inline link to /consult mid-article and one at the end. Text: "Need this set up on your hardware?" Not a banner — inline prose.

**Reading time + progress:** Displayed prominently. Engineers decide to read based on time investment. ReadingProgress bar shows momentum.

---

## 15. New Pages Spec

### /changelog
Keystatic-managed collection. Each entry: date, version/milestone, what changed, why it matters. Shows momentum. Agent adds entries automatically on OSS releases (GitHub Release Agent). Manually curated for site/product changes.

### /speaking
- Topics list (3-5 specific talk titles with 2-sentence descriptions)
- Talk formats available (keynote, workshop, podcast, adjunct lecture)
- Past appearances (add as they happen)
- Direct booking CTA → Cal.com speaking event type
- Fee range (be explicit: signals professionalism)

### /newsletter
- Substack embed showing latest issue
- Subscriber count (when >100)
- Sample issue link
- "What you get" — 3 bullet points, specific
- Newsletter signup (SubstackEmbed component)

### /404
Branded. Shows: "This page doesn't exist — but these do:" → links to latest blog post, /consult, /stack. Amber-400 "404" in JetBrains Mono. No apology copy.

---

## 16. Phase 2 (Deferred — do not build now)

| Feature | Trigger to build |
|---|---|
| /guides route + Keystatic collection | 3+ guides ready to publish |
| Better Auth + premium content gating | First paid guide ready |
| SaaS subscription billing (Stripe Billing) | LocalFlow or CaseBase ready for paid tier |
| **Discord community manager agent** | Discord hits 100+ active members (committed Phase 2) |
| **Social listening + opportunity agent** | After Phase 1 agents are stable (~month 3) |
| **OpenClaw integration** | Evaluate once link/docs confirmed — may replace or extend n8n agent layer |
| **AI SaaS boilerplate** | **Priority 1 immediately after site ships** — enables all vertical launches in 48-72hrs |
| Twitch live indicator on homepage | When streaming schedule is consistent |
| **Skool** | Undecided — evaluate when first course launches (takes cut; weigh vs Discord + Lemon Squeezy combo) |

---

## 17. Out of Scope (Never in Public Repo)

- `docs/superpowers/` — all specs, business plans, revenue projections
- `.env*` — all credentials
- `.claude/` — memory system
- Pricing strategy, client information, product roadmaps

# Agentic Architecture — Roadmap

The full roadmap from the 2026-05-06 audit. Living document — check items off as
they ship. All paths chosen for free / cheap / OSS where possible.

Three columns mean: **what** · **OSS option** · **status / cost**.

---

## Affiliate / referral revenue opportunities

Worth signing up for these later. Rates and program type tracked here so we
don't re-research every time. Bias toward the ones that pay actual cash, not
store credit.

| Service | Program type | Rate | Sign-up URL | Status |
|---|---|---|---|---|
| **Mercury (banking)** | Cash referral | $200 to you, $50 to them | mercury.com/refer | TODO |
| **Cal.com** | Affiliate (PartnerStack) | 25% commission, recurring | cal.com/partnership | TODO |
| **Hetzner Cloud** | Referral credit | €20 each side (credit, not cash) | hetzner.com/cloud → "Referral" | TODO |
| **Polar.sh** | Referral | varies, check current | polar.sh | TODO |
| **PostHog** | Partner program | Revenue share on referred paid customers | posthog.com/partners | TODO |
| **Stripe Atlas** | Affiliate | One-time bounty per company formed via your link | stripe.com/atlas | TODO |
| **Linear** | Affiliate | check current rates | linear.app | TODO |
| **GitHub Copilot** | No public affiliate | — | — | not available |
| **Anthropic API** | No public affiliate | — | — | not available |
| **OpenAI API** | No public affiliate | — | — | not available |
| **Together AI** | No public affiliate | — | — | not available |
| **Fireworks** | No public affiliate | — | — | not available |
| **Apify** | No public affiliate | — | — | not available |
| **Framework Computer** | "Ambassador" credit | $100 store credit per laptop sold | frame.work/ambassador | TODO (credit-only, low priority) |
| **Amazon Associates** | Affiliate | 1-10% per category | affiliate-program.amazon.com | TODO (low yield, broad coverage) |
| **Fly.io** | Credit referral | $25 credit each side | fly.io | TODO |
| **DigitalOcean** | Cash referral | $25 to you, $200 credit to them | m.do.co | TODO |

### Realistic income at your stage

At sub-1k monthly visitors on `/stack`, expect $50-200/month from affiliates
once these are active. The big ones to set up first are **Mercury** (cash, real
money to clients you'd recommend anyway), **Cal.com** (recurring, your audience
matches), and **Hetzner** (every reader who follows your sovereign-compute
thesis ends up there).

### Blog sponsorship pattern (more lucrative)

Looking at how top HN-flavored AI engineers monetize their blogs and
newsletters:

| Pattern | Who | Going rate (rough) | Notes |
|---|---|---|---|
| **Sponsorship slot in newsletter** | Pragmatic Engineer, Bytes, TLDR | $1k-5k per send at 10k+ subs; $5k-15k at 50k+ | The dominant pattern. Format: "This issue is sponsored by [X]" + 2-3 sentence pitch + link |
| **Sponsored deep-dive post** | Charity Majors, occasional Pragmatic Engineer | $5k-15k per post | More credibility, harder to sell, requires editorial standards |
| **Job board placement** | Pragmatic Engineer, Hacker Newsletter | $200-1500 per listing | Engineering-leadership audiences only |
| **Paid newsletter tier** | Stratechery, Bits About Money, Pragmatic Engineer | $9-15/month subscription | Best long-term, but requires ~1k+ free subs to validate paid tier |
| **GitHub Sponsors** | Simon Willison, Anthony Fu | $10-1000/month long tail | Trust signal more than revenue |
| **Patreon / Buy Me a Coffee** | Dan Luu (less so), some indie creators | similar to GH Sponsors | Lower-tech, broader audience |
| **Affiliate links in stack/uses page** | Wesbos, Caleb Porzio | $50-500/month at scale | Compounds slowly, hard to game |
| **Book / ebook sales** | Patrick McKenzie (Salary Negotiation), Will Larson (multiple) | $5-50k+ per launch | The biggest one-time revenue. Sophia's flagship Sovereign Stack fits here |
| **Speaking fees** | Charity, Kelsey Hightower, Camille Fournier | $3k-15k+ per talk | Triggered by visibility, not directly monetized via blog |

**Sponsorship marketplaces worth knowing:**

- **Carbon Ads** — `carbonads.net` — the "ads for developers and designers" network. Runs on Stack Overflow, Read the Docs, etc. Higher quality than generic ad networks but rates are modest (~$1-3 RPM).
- **EthicalAds** — `ethicalads.io` — privacy-respecting alternative used by OSS projects (Read the Docs, Codecademy). Lower rate, no tracking.
- **BuySellAds** — older marketplace, still relevant for tech blogs.
- **Direct inquiries via `/sponsor`** — Sophia already has the page. The 3-tier offering (single $500, quarterly $1,800, field guide $2,500) is correctly priced for early stage.

**Realistic sponsorship income for Sophia at launch:**

- Newsletter: 0-100 subs initially → $0 from newsletter ads
- Newsletter at 1k subs: ~$200-500 per send (one sponsor every 2-4 weeks = $200-1k/month)
- Newsletter at 10k subs: ~$1k-3k per send → $4k-12k/month
- Direct sponsor (`/sponsor` page): One per quarter at the $1,800 tier = $7,200/year passive
- Affiliate revenue from `/stack`: $50-200/month once links are activated

Total addressable monthly revenue from blog/newsletter sponsorship at the
1k-subscriber milestone: **~$300-1,500/month**. At 10k subscribers:
**~$5k-15k/month**. The newsletter is the bigger lever than the affiliate
links.

### Action items for monetization track

- [ ] **Sign up for Mercury referral** (link in /sponsor or /stack)
- [ ] **Sign up for Cal.com affiliate via PartnerStack** (apply at cal.com/partnership)
- [ ] **Sign up for Hetzner referral**
- [ ] **Enable GitHub Sponsors on @sudosoph** (free, takes 5 min)
- [ ] **Enable Carbon Ads on /stack and high-traffic posts** (apply, ~2 weeks review)
- [ ] **Listmonk + sponsorship CTA in the welcome email** (after migration)
- [ ] **Reach out to 3 sponsors** for the first sponsored newsletter slot when subs hit ~500
- [ ] **Write the first Sovereign Stack pre-order page** with Polar checkout

---

## Phase 4 — Revenue Infrastructure (in progress)

### Booking + scheduling
- [ ] **Cal.com event types created** · cal.com cloud (already in stack) · existing account
- [ ] **Self-hosted Cal.com** on Hetzner · Cal.com (OSS, MIT) · $0 marginal on the same VPS
- [x] `/work-with-me` cards link to specific cal.com events · already shipped
- [x] `/book` redirects to `/work-with-me` · already shipped

### Newsletter (Substack → OSS)
- [x] PostHog analytics scaffold wired (activates on env var) · self-host later · 1M events/mo free tier
- [ ] **Hetzner CX22 VPS provisioned** · Hetzner Cloud · ~$5/month
- [ ] **DNS for sender domain (DKIM/SPF/DMARC)** · Cloudflare DNS · free
- [ ] **Listmonk deployed via Docker compose** · Listmonk (AGPL) · $0 marginal
- [ ] **Resend wired as SMTP backend** · Resend (3k/mo free tier) · $0 at start
- [ ] **Site signup form switched from Substack iframe → Listmonk public API** · custom · $0
- [ ] **Substack subscriber CSV exported and imported** · Listmonk import · $0
- [ ] **RSS-to-email automation in Listmonk** · Listmonk built-in · $0
- [ ] **2-4 week sender warm-up** · ongoing
- [ ] **Migration story published** as blog post · content asset

### Payments + monetization
- [ ] **Stripe account opened** · Stripe · $0 + 2.9%+30¢ per txn
- [ ] **Polar.sh account opened (Stripe-backed)** · Polar.sh (OSS-flavored) · $0 + small platform fee
- [ ] **Polar product: The Sovereign Stack pre-order** · ~$29 e-book
- [ ] **Polar product: Workflow Audit ($499)** · linked from `/work-with-me`
- [ ] **Polar product: Office Hours ($400/hr)** · linked from `/work-with-me`
- [ ] **Polar subscription: Office Hours retainer ($500/mo)** · for SMBs
- [ ] **Free e-books delivered via Polar (free tier of paid product)** — automated email with PDF on signup
- [ ] **Cal.com + Polar wiring** — paid bookings via Cal.com pointing at Polar checkout
- [ ] **GitHub Sponsors enabled on @sudosoph** · GitHub (free for ~3 months, then 6% fee)
- [ ] **Affiliate links activated on `/stack`** — Framework, Hetzner, Mercury, Cal.com, Apify, Together, Fireworks · revenue stream
- [ ] **`/sponsor` page enhanced** — beyond current 3 tiers, add the "support my work" softer asks (Github Sponsors, affiliate)

### Site infrastructure
- [x] PostHog analytics scaffold (`components/site/analytics.tsx`)
- [ ] **PostHog account created → key set as `NEXT_PUBLIC_POSTHOG_KEY` Cloudflare secret**
- [ ] **Self-hosted PostHog on Hetzner** (eventually replaces cloud)
- [ ] **Self-hosted Umami on Hetzner** as lighter alternative if PostHog is too heavy
- [ ] **Self-hosted Uptime Kuma** for status monitoring
- [ ] **Status page at `/status`** showing Uptime Kuma badge

---

## Phase 5 — HN-tier Polish

### Content discovery
- [x] `/now` page · shipped
- [ ] **Search across blog (Pagefind)** · OSS, static, builds at deploy · $0 infra · ~1 hour
- [ ] **Tag pages** at `/blog/tag/<tag>` · 30 min code · $0
- [ ] **Reading time** on each blog/guide post · 15 min · $0
- [ ] **Related posts** at the bottom of each blog post · 30 min · $0
- [ ] **Series support** for multi-part posts · 1 hour · $0
- [ ] **Per-post OG images** generated at build · @vercel/og or static gen · 1-2 hours
- [ ] **Author photo in hero** · upload + 5 min wire-up
- [ ] **Mastodon + Bluesky links in footer** · 5 min
- [ ] **`/speaking` or `/talks` page** with past talk videos · 1 hour · $0

### SEO + AI search optimization
- [ ] **llms.txt** at site root · the new "AI search SEO" — tells LLMs what your site is · 5 min
- [ ] **llms-full.txt** with the full content · 10 min
- [ ] **humans.txt** (indie polish) · 5 min
- [ ] **security.txt** (responsible disclosure) · 5 min
- [ ] **Schema.org per-post** verification (mostly have, audit completeness)
- [ ] **Internal link audit** — every post should link to 2-3 others
- [ ] **Pillar pages identification** — which 3-5 evergreen posts should other posts link to
- [ ] **Submit sitemap to Google Search Console**
- [ ] **Submit sitemap to Bing Webmaster**

### Technical polish
- [ ] **Custom 404 page** with site search and recent posts
- [ ] **Apple touch icon** (180x180 PNG)
- [ ] **Web app manifest** for PWA install on mobile
- [ ] **Lighthouse score: all 100s** — audit and fix any gaps

---

## Phase 6 — Distribution + Audience Growth

### Content distribution
- [ ] **Show HN strategy** — pick 3 evergreen posts, time submissions for Tuesday 7am EST, seed with engaged friends
- [ ] **r/LocalLLaMA cross-post** strategy for hardware/local-AI posts
- [ ] **r/MachineLearning** for technical posts
- [ ] **r/programming** for the broader dev posts
- [ ] **Mastodon presence** — `@sudosoph@hachyderm.io` or similar (HN-friendly fediverse)
- [ ] **Bluesky presence** — where many ML/AI folks are migrating
- [ ] **LinkedIn — for SMB audience** (consultants land clients here)
- [ ] **Substack Notes** — keep using these even after migrating list (discoverability stays on Substack)

### Outbound
- [ ] **Pitch list for AI newsletters** — Ben's Bites, AlphaSignal, The Rundown, TLDR AI
- [ ] **Guest essay pipeline** — Pragmatic Engineer, The Sequence, etc.
- [ ] **Podcast appearance tracker** — list of shows in target audience
- [ ] **Speaking pitch deck** — for conference CFPs

### Community
- [ ] **Discord or Matrix server** — for the community pillar (in business strategy memory)
- [ ] **Office hours streams** — Twitch/YouTube monthly stream for community
- [ ] **Newsletter "ask me anything" section** — drives reader engagement

---

## Phase 7 — Productized Tools (lead generation)

The interactive widgets that bring people in via search:

- [ ] **Local LLM Cost Calculator** at `/tools/cost-calculator` — pre-input model + workload, output cost-vs-cloud comparison
- [ ] **Hardware sizing tool** — "what laptop do I need to run X?" interactive
- [ ] **n8n template gallery** at `/templates` — public dedicated repo (currently subdir of BSW)
- [ ] **Model comparison sheet** at `/tools/model-comparison` — currently in `/library` as Coming Soon
- [ ] **ROCm install wizard** — interactive Q&A → custom install commands

These exist in the product catalog memory. They're lead magnets for the SMB audience — each captures email and feeds Listmonk.

---

## Phase 8 — Course + ebook delivery

The full ebook + course pipeline once Polar is wired:

- [ ] **The Sovereign Stack** ebook (flagship, ~$29) · drafting through summer 2026
- [ ] **Cut Your AI Bill to Zero** (free e-book) · lead magnet
- [ ] **Agentic Workflows for Lean Founders** (free, BSW companion)
- [ ] **The Token Budget Field Manual** (free)
- [ ] **Local LLMs in Regulated Industries** (free, vertical-specific)
- [ ] **Course: Local AI from Scratch** ($199-499)
- [ ] **Course: Agentic Workflows with n8n + Ollama** ($199-499)
- [ ] **Course: Build Your AI Consultancy** ($299-499)

---

## Phase 9 — Productivity + automation (post-Hetzner)

Things to automate once Listmonk + n8n are running:

- [ ] **Triage agent for sophia@agenticarchitect.ai** — n8n workflow that reads inbox, classifies, drafts replies for HITL
- [ ] **Booking-prep agent** — reads new cal.com booking → researches the lead → preps brief in inbox before the call
- [ ] **Newsletter draft agent** — pulls latest blog posts from RSS, drafts the weekly teaser, queues in Listmonk for review
- [ ] **Affiliate link tracker** — n8n watches affiliate dashboards, posts weekly summary to Sophia
- [ ] **Stale link checker** — build-time check that all internal links resolve

Each of these becomes a blog post itself ("How I automated my X with agents").

---

## Cost summary (target: under $20/month all-in)

| Service | Monthly cost |
|---|---|
| Hetzner CX22 VPS | $5 |
| Resend SMTP (under 3k/month) | $0 |
| Cloudflare Workers (site) | $0 |
| Cloudflare DNS | $0 |
| PostHog cloud (until self-hosted) | $0 (1M events free) |
| Cal.com self-hosted | $0 marginal |
| Listmonk self-hosted | $0 marginal |
| Stripe payments | 2.9% + 30¢ per transaction (no fixed fee) |
| Polar.sh | small platform fee on Stripe processing |
| Domain | ~$10/year amortized |
| **Total fixed** | **~$5-6/month** |

Compare: equivalent SaaS stack (Substack paid + Buttondown + cal.com paid + UptimeRobot paid + posthog cloud paid + ConvertKit) = $80-150/month. The OSS path saves $1k+/year, builds the brand thesis, and generates 5+ blog posts on the way.

---

## Sequencing recommendation (work-blocks)

**Block 1 (one weekend): The Hetzner foundation**
1. Spin up Hetzner CX22
2. Install Caddy + Docker compose
3. Deploy: Listmonk + Cal.com + Uptime Kuma (3 services)
4. DNS records (DKIM/SPF/DMARC + subdomains)
5. Site signup form swap → Listmonk
6. Blog post: "I migrated my newsletter to a $5/mo Hetzner box"

**Block 2 (one evening): Payments**
1. Stripe + Polar.sh accounts
2. Three Polar products: Sovereign Stack pre-order, Workflow Audit, Office Hours
3. Cal.com paid bookings → Polar checkout
4. Update `/work-with-me` cards with explicit pricing where appropriate

**Block 3 (one evening): Polish**
1. Pagefind search
2. Author photo
3. /speaking page
4. Tag pages
5. Reading time
6. llms.txt + humans.txt + security.txt

**Block 4 (one evening): Distribution**
1. Mastodon + Bluesky presence
2. Submit sitemap to Search Console
3. Show HN strategy doc
4. Pitch list for outbound

Each block produces shippable progress + content.

---

## "Coming soon" inventory — all of this needs to be built

Everything tagged "Coming soon" in the live site is a TODO. Listing here so
nothing rots.

### E-books (Library)
- [ ] **The Sovereign Stack** (Pre-order, flagship, ~220 pages, Fall 2026)
- [ ] **Cut Your AI Bill to Zero** (Free, ~30 pages)
- [ ] **Agentic Workflows for Lean Founders** (Free, ~80 pages, BSW companion)
- [ ] **The Token Budget Field Manual** (Free, ~50 pages)
- [ ] **Local LLMs in Regulated Industries** (Free, ~70 pages, EU AI Act tie-in)

### Free resources (Library)
- [ ] **Open-weight model comparison sheet** (CSV + web table) — Qwen 3.6, Gemma 4, Kimi K2.6, DeepSeek V4 + benchmarks
- [ ] **AI cost calculator** (web tool — also lead-gen, see Phase 7)
- [ ] **ROCm 7.3 + Strix Point setup cheatsheet** (1-page PDF)
- [ ] **n8n template library** (separate dedicated repo, currently sub-folder of BSW repo)

### Guides (Beginner track)
- [x] booking-agent (live)
- [ ] **meeting-notes-agent** — drafts follow-up emails from meeting transcripts/notes
- [ ] **weekly-planner-agent** — reads calendar/notes/tasks, outputs Monday brief

### Courses (Tracks in development → make at least one live)
- [ ] **Local AI from Scratch** — first cohort to launch (priority)
- [ ] **Agentic Workflows with n8n + Ollama** — second cohort
- [ ] **AI-native Web Development** — third cohort
- [ ] **Build Your AI Consultancy** — fourth cohort

### Site sections / infrastructure
- [ ] **Self-hosted Cal.com** with all 4 paid event types live
- [ ] **Self-hosted Listmonk** newsletter
- [ ] **Self-hosted PostHog or Umami** analytics
- [ ] **Self-hosted Uptime Kuma** + status page
- [ ] **Polar.sh products** for: Sovereign Stack pre-order, Workflow Audit, Office Hours, Retainer

Rule: anything with the "Coming soon" badge live on the site stays on this list
until it ships. When something ships, check off both this list AND the relevant
phase section above. The badge comes off the site copy at the same time.

---

## How to track progress

This file is the source of truth. Check items off as they ship. When the
Phase 4-5 items are all checked, update `MEMORY.md` to mark Phase 4 complete
and start logging Phase 6+.

Last updated: 2026-05-06

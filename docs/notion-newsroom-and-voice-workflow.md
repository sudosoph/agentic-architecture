# Notion Newsroom, Voice-Diff Calibration & Analytics Workflow

## 1. Live Connected Surface URLs & IDs

- **Notion Hub Page:** `https://app.notion.com/p/4243ce0092f28126affef0289784d0f8` (`4243ce00-92f2-8126-affe-f0289784d0f8`)
- **Notion Database (`Editorial & Format Pipeline`):** `https://app.notion.com/p/4243ce0092f281ea8cc4c0b5c84f79fd`
- **Notion Data Source ID:** `collection://4243ce00-92f2-8107-ae13-000bfabe1816`
- **Embedded Kanban View:** `view://4243ce00-92f2-8139-a63e-000cbc7cf02c` (`Newsroom Vetting Board`)
- **Google Slides Carousel 01 (Capability Cheat Sheet):** `https://docs.google.com/presentation/d/1vwKkx8qX-lExCBXsYwIZjO5_uZmvmtxKtTtlkFFuGbc/edit`
- **Google Slides Carousel 02 (Search-Bar vs. Co-Intelligent):** `https://docs.google.com/presentation/d/1rn2NBQKHGnGzTpPPmP9nfgQTFf0hjP4tud9ymcFkZpI/edit`
- **PostHog Dashboard (`Agentic Architect: Audience & Buyer Funnel`):** `https://us.posthog.com/project/528561/dashboard/2415752`

## 2. Twice-Weekly Vetting & Automatic Voice Calibration Loop

1. **Research & Draft Generation (`npm run newsroom`):** Pulls live signals and stages 4-format packs (Written Substack/Blog + 7-Min Substack Podcast script + Google Slides 6-slide Carousel + 45s Vertical Reaction script + UTM links) into column `2. Ready for Sophia Vet`.
2. **Sophia Redline & Comment Pass:** Edit text directly on the Notion card or highlight any phrase to leave a short inline Notion comment; move to `3. Sophia Redlined` or straight to `4. Approved for Buffer/Substack`.
3. **Automatic Voice Learning:** Before publishing or drafting the next cycle, the agent calls `notion-get-version-changes` and `notion-get-comments` on edited cards, passes `{ originalText, editedText, reviewerComments }` into `extractVoiceDiffLesson` (`scripts/editorial-newsroom.mjs`), and appends the resulting `Avoid -> Prefer` rules to both the Notion Hub's **Voice & Taste Ledger** and `content/editorial-style-memory.json`.
4. **Zero Auto-Publish Gate:** Only cards explicitly moved to `4. Approved for Buffer/Substack` by Sophia are published to `agenticarchitect.ai` or queued to Buffer via Zapier.

## 3. Sunday Closed-Loop Analytics Iteration

Every Sunday, combine:
- First-party `/ingest` PostHog events (`curriculum_preview_opened`, `ld_letter_downloaded`, `cal_booking_clicked`, `newsletter_subscribed`, `contact_inquiry_sent`) broken down by `first_utm_source`, `first_utm_medium`, and `first_utm_campaign`
- Substack open, podcast listen, and free-to-paid conversion stats
- LinkedIn carousel saves and 45-second reaction watch rates

Pass the summary rows into `buildWeeklyGrowthScorecard` (`scripts/editorial-newsroom.mjs`) to update Section 4 of the Notion Hub and allocate 70% of next week's slots to the top two converting formats.

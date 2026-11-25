'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ReplyItem = {
  id: string
  channel: string
  postTitle: string
  postUrl: string
  authorName: string
  authorHandle: string
  authorContext: string
  commentBody: string
  draftReply: string
  status: string
}

type RadarItem = {
  id: string
  source: string
  sourceUrl: string
  format: string
  slug: string
  seoBlogTitle: string
  substackStoryTitle: string
  geoCitationAngle: string
  canonicalUrl: string
  mediumDevtoFrontmatter: string
  linkedinHook: string
}

const CALLAN_BUYER_FUNNEL_PACKS = [
  {
    id: 'callan-li-ig-orgchart',
    channel: 'LinkedIn + Instagram Reel/Carousel -> /masterclass ($5,997-$8,997 Funnel)',
    url: 'https://agenticarchitect.ai/masterclass',
    hookTitle: 'Stop asking "What can AI do?" Draw an AI Org Chart first.',
    copyBody:
      'Most business owners open a blank chat window on Monday, try two prompts, and go right back to answering every email and prepping every call themselves.\n\nBefore hiring your next $65,000 ops or marketing coordinator, split your company org chart in two:\n- Front end (Humans): sales calls, pricing judgment, client trust, final sign-off.\n- Back end (AI workflows): voice.md drafting, 30-min pre-call dossiers, draft-first inbox triage, and 5-day follow-up tracking.\n\nI am walking through all 6 roles live on screen in our free 60-minute AI Org Chart Masterclass.\n\nComment MASTERCLASS (or grab a seat at https://agenticarchitect.ai/masterclass) and I will send you the workbook.',
  },
  {
    id: 'callan-podcast-pitch',
    channel: 'Podcast Guest Tour Pitch (Callan’s #1 Warm Buyer Shortcut)',
    url: 'https://agenticarchitect.ai/blog/ai-org-chart',
    hookTitle: 'Subject: Guest idea: Building an AI Org Chart before your next $65K hire',
    copyBody:
      'Hi [Host Name],\n\nLoved your recent episode with [Guest] on keeping operations lean. Most AI guests either stay at surface-level ChatGPT tips or drown founders in developer jargon.\n\nMy background bridges both: Columbia CS, ex-McKinsey ($70M SaaS cost reduction + 250+ healthcare leaders trained), and 300+ founders taught live at Boulder Startup Week (speaking in my personal capacity).\n\nWould your listeners love a 35-minute tactical walkthrough on "Humans on the Front End, AI on the Back End: The 6-Role AI Org Chart That Saves a $65K Hire"? Happy to give your audience our unlocked Company Context Vault (voice.md) workbook free at agenticarchitect.ai/masterclass.\n\nWarmly,\nSophia Stein',
  },
  {
    id: 'callan-corporate-coo',
    channel: 'LinkedIn / Outbound Note -> $7,500-$15,000 Corporate Labs & $1,500 Audits',
    url: 'https://agenticarchitect.ai/blog/ai-chief-of-staff',
    hookTitle: 'Why 70% of $20K AI agency builds get switched off inside 90 days',
    copyBody:
      'Watched three leadership teams run into the same wall this quarter: they paid an outside agency $20K+ for undocumented webhook automations, a CRM field changed six weeks later, and nobody in-house knew how to edit it.\n\nDurable AI adoption looks boring: portable markdown context files (voice.md, icp.md), draft-only inbox scopes so nothing embarrassing auto-sends, and training your own Ops Lead or Chief of Staff to own the loop.\n\nPublished our full 2026 AI Chief of Staff & Corporate Workshop buyer guide today (link in first comment).',
  },
]

const HN_REDDIT_LAUNCH_PACKS = [
  {
    id: 'hn-loop-eng-2026',
    target: 'Hacker News (Tue/Thu 7:00 AM ET) + r/ExperiencedDevs',
    url: 'https://agenticarchitect.ai/blog/loop-engineering',
    hnTitle:
      'Loop Engineering in Production: Isolated git worktrees, deterministic verifiers, and cost circuit breakers',
    hnFirstComment:
      'Author here. After auditing why so many coding and ops agent loops stall after week two (echoing the arXiv:2608.21884 survey of 2,853 repos), I wrote down the five invariants we enforce in production: isolated worktrees, external deterministic verifiers instead of self-critique prompts, nested inner/middle/outer loops, orchestrator-subagent routing (Neon/Hydrogen vs Kimi K3.1 Pro / DeepSeek V4.1 / local Qwen 3.8-27B), and a 35-line TypeScript dollar circuit breaker.',
  },
  {
    id: 'hn-512gb-nodes',
    target: 'r/LocalLLaMA + Hacker News',
    url: 'https://agenticarchitect.ai/blog/mac-studio-512gb-vs-dgx-spark',
    hnTitle:
      '512GB desk nodes in late 2026: M5 Ultra Mac Studio (1.2 TB/s) vs. DGX Spark (273 GB/s) vs. Ryzen AI Halo',
    hnFirstComment:
      'Put together a vendor-neutral bandwidth and amortization breakdown across M5 Ultra (512GB @ 1.2 TB/s), NVIDIA DGX Spark (128GB @ 273 GB/s), and 128GB Ryzen AI Max+ mini-PCs (HP Z2 Mini G1a, EVO-X2). Main takeaway: 512GB is a trap for dense 405B models (~4 tok/s), where it actually shines is keeping 300GB+ sparse MoE weights (MiniMax M3.1 Flash 501B/23B-active, Nemotron 3 Ultra) + huge KV caches pinned over Tailscale.',
  },
  {
    id: 'hn-openinstinct-audit',
    target: 'Hacker News + r/SelfHosted + r/netsec',
    url: 'https://agenticarchitect.ai/blog/instinct-ai-vs-tab-review',
    hnTitle:
      'Auditing texting and browser agents: Instinct and Tab vs. self-hosted MIT OpenInstinct',
    hnFirstComment:
      'Compared the OAuth scope, payment vault, and default training policies across consumer texting/browser agents (Instinct, Tab, Dots, Opera Neon) against the MIT-licensed OpenInstinct + OpenClaw stack. Keeping encrypted OAuth credentials and cookies completely outside the LLM context window inside per-user microVMs solves the core Gmail/Drive exfiltration risk.',
  },
]

export function StudioInbox({
  initialReplies,
  initialRadar,
  requireAuth = false,
}: {
  initialReplies: ReplyItem[]
  initialRadar: RadarItem[]
  requireAuth?: boolean
}) {
  const [unlocked, setUnlocked] = useState(!requireAuth)
  const [studioToken, setStudioToken] = useState('')
  const [githubPat, setGithubPat] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)

  const [replies, setReplies] = useState<ReplyItem[]>(initialReplies)
  const [radar, setRadar] = useState<RadarItem[]>(initialRadar)
  const [refreshing, setRefreshing] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Browser MDX Publisher state (zero local npm)
  const [postTitle, setPostTitle] = useState('')
  const [postDesc, setPostDesc] = useState('')
  const [postTrack, setPostTrack] = useState<'engineering' | 'models-rigs' | 'small-business'>(
    'engineering',
  )
  const [postBody, setPostBody] = useState('')
  const [publishMode, setPublishMode] = useState<'pr' | 'main'>('pr')
  const [publishing, setPublishing] = useState(false)
  const [publishResult, setPublishResult] = useState<string | null>(null)
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null)
  const [crosspostSlug, setCrosspostSlug] = useState('ai-org-chart')
  const [crosspostLive, setCrosspostLive] = useState(false)

  function buildAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (studioToken.trim()) headers['x-studio-token'] = studioToken.trim()
    if (githubPat.trim()) headers['x-github-pat'] = githubPat.trim()
    return headers
  }

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    setVerifying(true)
    setAuthError(null)
    try {
      const res = await fetch('/api/studio', {
        method: 'POST',
        headers: buildAuthHeaders(),
        body: JSON.stringify({ action: 'verify-auth' }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAuthError(data.error || 'Could not verify credentials.')
        return
      }
      if (Array.isArray(data.replies)) setReplies(data.replies)
      if (Array.isArray(data.radar?.items)) setRadar(data.radar.items)
      setUnlocked(true)
    } catch {
      setAuthError('Network error verifying credentials.')
    } finally {
      setVerifying(false)
    }
  }

  async function handleRefreshRadar() {
    setRefreshing(true)
    try {
      const res = await fetch('/api/studio', {
        method: 'POST',
        headers: buildAuthHeaders(),
        body: JSON.stringify({ action: 'refresh-radar', commitToGitHub: Boolean(githubPat.trim()) }),
      })
      const data = await res.json()
      if (data.radar?.items) setRadar(data.radar.items)
    } finally {
      setRefreshing(false)
    }
  }

  async function handleApproveReply(item: ReplyItem) {
    try {
      await navigator.clipboard.writeText(item.draftReply)
      setCopiedId(item.id)
    } catch {
      // Clipboard optional in headless tests
    }
    const res = await fetch('/api/studio', {
      method: 'POST',
      headers: buildAuthHeaders(),
      body: JSON.stringify({
        action: 'update-reply',
        id: item.id,
        status: 'approved',
        draftReply: item.draftReply,
      }),
    })
    const data = await res.json()
    if (data.replies) setReplies(data.replies)
  }

  async function handlePublishPost(e: React.FormEvent) {
    e.preventDefault()
    setPublishing(true)
    setPublishResult(null)
    try {
      const res = await fetch('/api/studio', {
        method: 'POST',
        headers: buildAuthHeaders(),
        body: JSON.stringify({
          action: 'publish-mdx',
          title: postTitle,
          description: postDesc,
          track: postTrack,
          content: postBody,
          publishMode,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setPublishResult(`Error: ${data.error || 'Failed to publish'}`)
        return
      }
      if (data.prUrl) {
        setPublishResult(`Opened 1-Click GitHub PR: ${data.prUrl}`)
      } else if (data.liveUrl) {
        setPublishResult(`Committed straight to main! Deploying live: ${data.liveUrl}`)
      } else if (data.savedLocal) {
        setPublishResult(`Saved ${data.savedLocal} locally.`)
      }
      setPostTitle('')
      setPostDesc('')
      setPostBody('')
    } finally {
      setPublishing(false)
    }
  }

  async function handleTriggerCloudRadar(topicTitle?: string) {
    setDispatchStatus('Triggering GitHub Actions workflow...')
    try {
      const res = await fetch('/api/studio', {
        method: 'POST',
        headers: buildAuthHeaders(),
        body: JSON.stringify({ action: 'trigger-weekly-workflow', topicTitle }),
      })
      const data = await res.json()
      if (!res.ok) {
        setDispatchStatus(data.error || 'Open GitHub Actions tab to click Run Workflow.')
        return
      }
      setDispatchStatus(`Triggered cloud workflow! View PR/run at ${data.actionsUrl}`)
    } catch {
      setDispatchStatus('Could not reach GitHub API.')
    }
  }

  async function handleTriggerCrosspost() {
    setDispatchStatus(`Dispatching zero-ban official cross-post for "${crosspostSlug}"...`)
    try {
      const res = await fetch('/api/studio', {
        method: 'POST',
        headers: buildAuthHeaders(),
        body: JSON.stringify({
          action: 'trigger-crosspost-workflow',
          slug: crosspostSlug,
          platforms: 'all',
          dryRun: !crosspostLive,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setDispatchStatus(data.error || 'Open GitHub Actions to run Official Cross-Post.')
        return
      }
      setDispatchStatus(
        `Dispatched ${crosspostLive ? 'LIVE official API syndication' : 'dry-run pack build'}! View run at ${data.actionsUrl}`,
      )
    } catch {
      setDispatchStatus('Could not reach GitHub API.')
    }
  }

  function prefillComposerFromRadar(item: RadarItem) {
    setPostTitle(item.seoBlogTitle)
    setPostDesc(item.geoCitationAngle)
    setPostBody(
      `## Context & What We Tested\n\nWrite your measured notes on **${item.seoBlogTitle}** here.\n\n| Dimension | Measured Result | Notes |\n|---|---|---|\n| Setup Time | 15 mins | Plain markdown + scoped config |\n| Monthly Run-Rate | $0 to $20/mo | Compared at 1,000 runs |\n| Security / Data Boundary | Scoped | Zero raw credentials in prompt |\n| Verdict | Production-ready | Gate behind deterministic verifier |\n`,
    )
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function updateDraftText(id: string, value: string) {
    setReplies(prev => prev.map(r => (r.id === id ? { ...r, draftReply: value } : r)))
  }

  async function copyText(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(key)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // ignore
    }
  }

  if (!unlocked) {
    return (
      <Card className="max-w-xl p-6 md:p-8 space-y-5 bg-surface">
        <div className="space-y-1.5">
          <Badge variant="online">Zero-NPM Browser Access</Badge>
          <h2 className="text-xl font-bold text-fg pt-1">Unlock Cloud Operator Studio</h2>
          <p className="text-sm text-muted leading-relaxed">
            Sign in from any laptop or phone using either a Fine-Grained GitHub Personal Access
            Token scoped to <code className="font-mono text-fg">sudosoph/agentic-architecture</code>{' '}
            (Contents + Pull Requests + Actions) or your <code className="font-mono text-fg">STUDIO_ACCESS_TOKEN</code>.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="space-y-1">
            <label className="font-mono text-xs font-semibold text-fg block">
              GitHub Fine-Grained Token (Recommended: enables 1-click browser commits &amp; PRs)
            </label>
            <input
              type="password"
              value={githubPat}
              onChange={e => setGithubPat(e.target.value)}
              placeholder="github_pat_..."
              className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-xs font-semibold text-muted block">
              Or Cloudflare Studio Passcode (STUDIO_ACCESS_TOKEN, optional)
            </label>
            <input
              type="password"
              value={studioToken}
              onChange={e => setStudioToken(e.target.value)}
              placeholder="Optional passcode..."
              className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
            />
          </div>

          {authError && <p className="text-xs font-semibold text-red-600">{authError}</p>}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={verifying}
              className="rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-white hover:opacity-95 cursor-pointer"
            >
              {verifying ? 'Verifying Repo Access...' : 'Unlock Cloud Studio →'}
            </button>
            <a
              href="https://github.com/sudosoph/agentic-architecture/pulls"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-accent hover:underline"
            >
              Open GitHub PR Queue Directly ↗
            </a>
          </div>
        </form>
      </Card>
    )
  }

  return (
    <div className="space-y-12">
      {/* Quick Cloud Links Bar */}
      <Card className="p-4 bg-surface flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <a
            href="https://github.com/sudosoph/agentic-architecture/pulls"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            1-Click Draft PRs on GitHub ↗
          </a>
          <a
            href="https://github.com/sudosoph/agentic-architecture/actions/workflows/weekly-radar.yml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Scheduled Weekly Radar Action ↗
          </a>
          <a href="/keystatic" className="text-accent hover:underline">
            Keystatic Visual Editor (/keystatic) →
          </a>
          <a
            href="https://agenticarchitectai.substack.com/publish/posts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Substack Queue ↗
          </a>
          <a
            href="https://medium.com/p/import"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Medium Canonical Import ↗
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={crosspostSlug}
            onChange={e => setCrosspostSlug(e.target.value)}
            aria-label="Post slug for official API cross-post"
            placeholder="ai-org-chart"
            className="w-36 rounded-lg border border-border bg-white px-2.5 py-1.5 font-mono text-xs text-fg"
          />
          <label className="inline-flex items-center gap-1 text-[11px] font-mono text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={crosspostLive}
              onChange={e => setCrosspostLive(e.target.checked)}
            />
            <span>Live API</span>
          </label>
          <button
            type="button"
            onClick={handleTriggerCrosspost}
            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:opacity-95 cursor-pointer"
          >
            Official Cross-Post →
          </button>
          <button
            type="button"
            onClick={() => handleTriggerCloudRadar()}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-fg hover:border-accent cursor-pointer"
          >
            Run Cloud Weekly Radar PR ↻
          </button>
        </div>
      </Card>

      {dispatchStatus && (
        <p className="text-xs font-mono text-online bg-surface border border-border rounded-lg p-3">
          {dispatchStatus}
        </p>
      )}

      {/* 0. Browser MDX Post & PR Publisher (Zero NPM) */}
      <section className="space-y-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            0. Zero-NPM Browser CMS
          </p>
          <h2 className="text-xl font-bold text-fg">
            Write &amp; Publish Playbooks Straight From Your Browser
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Opens a 1-click-mergeable GitHub Pull Request (or commits straight to main),
            automatically building manifests, recompiling The Sovereign Stack, deploying to
            Cloudflare Workers, and pinging IndexNow.
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handlePublishPost} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="font-mono text-xs font-semibold text-fg block">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                  placeholder="e.g., Benchmarking Qwen 3.8-27B vs. Neon on 50 Real PR Reviews"
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-fg focus:border-accent focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-mono text-xs font-semibold text-fg block">Track</label>
                <select
                  value={postTrack}
                  onChange={e =>
                    setPostTrack(
                      e.target.value as 'engineering' | 'models-rigs' | 'small-business',
                    )
                  }
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-fg focus:border-accent focus:outline-none"
                >
                  <option value="engineering">Engineering Deep Dives</option>
                  <option value="models-rigs">Models, Tailscale &amp; Rigs</option>
                  <option value="small-business">Owner Playbooks &amp; Workflows</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs font-semibold text-fg block">
                1-Sentence SEO / GEO Description
              </label>
              <input
                type="text"
                required
                value={postDesc}
                onChange={e => setPostDesc(e.target.value)}
                placeholder="Concise summary with measured benchmarks and unit economics..."
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-fg focus:border-accent focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs font-semibold text-fg block">
                Markdown / MDX Body
              </label>
              <textarea
                rows={7}
                required
                value={postBody}
                onChange={e => setPostBody(e.target.value)}
                placeholder="Write plain Markdown with tables, code blocks, and links..."
                className="w-full rounded-lg border border-border bg-white p-3 font-mono text-xs text-fg focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs">
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="publishMode"
                    checked={publishMode === 'pr'}
                    onChange={() => setPublishMode('pr')}
                  />
                  <span>Open 1-Click GitHub PR (Review First)</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="publishMode"
                    checked={publishMode === 'main'}
                    onChange={() => setPublishMode('main')}
                  />
                  <span>Publish Straight to Live Site (main)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={publishing}
                className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:opacity-95 cursor-pointer"
              >
                {publishing
                  ? 'Committing to GitHub...'
                  : publishMode === 'pr'
                    ? 'Create 1-Click Draft PR →'
                    : 'Publish Live Now →'}
              </button>
            </div>

            {publishResult && (
              <p className="text-xs font-mono text-online bg-surface border border-border rounded-lg p-3">
                {publishResult}
              </p>
            )}
          </form>
        </Card>
      </section>

      {/* 1. Comment & Inbound Approval Queue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              1. Human-in-the-Loop Engagement
            </p>
            <h2 className="text-xl font-bold text-fg">Comment &amp; Inbound Reply Queue</h2>
          </div>
          <Badge variant="online">
            {replies.filter(r => r.status === 'pending_approval').length} Pending Approval
          </Badge>
        </div>

        <div className="space-y-4">
          {replies.map(item => (
            <Card key={item.id} className="p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-fg">
                    {item.authorName}{' '}
                    <span className="font-mono text-xs font-normal text-muted">
                      ({item.authorHandle})
                    </span>
                  </p>
                  <p className="text-xs text-muted">{item.authorContext}</p>
                </div>
                <Badge variant={item.status === 'approved' ? 'online' : 'rig'}>
                  {item.status === 'approved' ? 'Approved' : 'Needs Your OK'}
                </Badge>
              </div>

              <div className="rounded-lg bg-surface border border-border p-3.5 text-sm text-fg">
                <p className="font-mono text-[11px] text-muted mb-1">On: {item.postTitle}</p>
                &ldquo;{item.commentBody}&rdquo;
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs font-semibold text-fg block">
                  Drafted Reply (Edit freely before approving)
                </label>
                <textarea
                  rows={3}
                  value={item.draftReply}
                  onChange={e => updateDraftText(item.id, e.target.value)}
                  className="w-full rounded-lg border border-border bg-white p-3 text-sm text-fg focus:border-accent focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleApproveReply(item)}
                  className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:opacity-95 cursor-pointer"
                >
                  {copiedId === item.id ? 'Approved & Copied!' : 'Approve & Copy Reply'}
                </button>
                <a
                  href={item.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  Open Substack Thread →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 2. Trend, Tool Review & SEO/GEO Radar */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              2. Anti-Cannibalization Content Engine
            </p>
            <h2 className="text-xl font-bold text-fg">
              Weekly Trend, Hardware &amp; Loop Engineering Briefs
            </h2>
          </div>
          <button
            type="button"
            onClick={handleRefreshRadar}
            disabled={refreshing}
            className="rounded-lg border border-border bg-white px-4 py-2 text-xs font-semibold text-fg hover:border-accent cursor-pointer"
          >
            {refreshing ? 'Pulling Live Signals...' : 'Pull Fresh Live Signals ↻'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {radar.map(item => (
            <Card key={item.id} className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-muted">{item.source}</span>
                <Badge variant="tag">{item.format}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-surface p-3.5 space-y-1">
                  <p className="font-mono text-[11px] font-semibold text-accent uppercase">
                    1. Website SEO Title (Ranks on Google)
                  </p>
                  <p className="text-sm font-bold text-fg">{item.seoBlogTitle}</p>
                  <p className="text-xs text-muted pt-1">
                    <strong>GEO Citation Hook:</strong> {item.geoCitationAngle}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-surface p-3.5 space-y-1">
                  <p className="font-mono text-[11px] font-semibold text-online uppercase">
                    2. Substack Story Headline (Zero SERP Cannibalization)
                  </p>
                  <p className="text-sm font-bold text-fg">{item.substackStoryTitle}</p>
                  <p className="text-xs text-muted pt-1">
                    Links readers back to canonical:{' '}
                    <code className="font-mono">{item.canonicalUrl}</code>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-white p-3.5 space-y-1.5">
                <p className="font-mono text-[11px] font-semibold text-muted uppercase">
                  3. Plain-Spoken LinkedIn Post Draft
                </p>
                <p className="text-xs text-fg whitespace-pre-line leading-relaxed">
                  {item.linkedinHook}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => prefillComposerFromRadar(item)}
                  className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:opacity-95 cursor-pointer"
                >
                  Load Into Browser Editor ↑
                </button>
                <button
                  type="button"
                  onClick={() => copyText(`li-${item.id}`, item.linkedinHook)}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-fg hover:border-accent cursor-pointer"
                >
                  {copiedId === `li-${item.id}` ? 'Copied LinkedIn Draft!' : 'Copy LinkedIn Draft'}
                </button>
                <button
                  type="button"
                  onClick={() => copyText(`canon-${item.id}`, item.mediumDevtoFrontmatter)}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-fg hover:border-accent cursor-pointer"
                >
                  {copiedId === `canon-${item.id}`
                    ? 'Copied Canonical Header!'
                    : 'Copy Medium/Dev.to Canonical Header'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Callan-Style High-Ticket Buyer Funnel Packs (70% Revenue Focus) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              3. Callan-Style Buyer Attraction (70% Revenue Engine)
            </p>
            <h2 className="text-xl font-bold text-fg">
              Ready-to-Send Masterclass Hooks, Podcast Pitches &amp; Corporate Buyer Posts
            </h2>
          </div>
          <Badge variant="online">Drives $5,997 Cohort + $15K Corporate Labs</Badge>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {CALLAN_BUYER_FUNNEL_PACKS.map(pack => (
            <Card key={pack.id} className="p-6 space-y-3 border-blue-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-accent font-semibold">{pack.channel}</span>
                <a
                  href={pack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:underline"
                >
                  {pack.url.replace('https://agenticarchitect.ai', '')} →
                </a>
              </div>
              <p className="text-sm font-bold text-fg">{pack.hookTitle}</p>
              <p className="text-xs text-fg whitespace-pre-line bg-surface border border-border rounded-lg p-3.5 leading-relaxed">
                {pack.copyBody}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => copyText(`callan-${pack.id}`, pack.copyBody)}
                  className="rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-white hover:opacity-95 cursor-pointer"
                >
                  {copiedId === `callan-${pack.id}` ? 'Copied Buyer Script!' : 'Copy Full Script / Pitch'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. OSS, Hardware & Hacker News Launch Queue (30% Technical Authority Moat) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
              4. Builder &amp; Backlink Moat (30% Domain Authority)
            </p>
            <h2 className="text-xl font-bold text-fg">
              Ready-to-Post Hacker News &amp; r/LocalLLaMA Launch Packs
            </h2>
          </div>
          <Badge variant="rig">Builds Domain Rating so Buyer Pages Rank #1</Badge>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {HN_REDDIT_LAUNCH_PACKS.map(pack => (
            <Card key={pack.id} className="p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-muted">{pack.target}</span>
                <a
                  href={pack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:underline"
                >
                  {pack.url.replace('https://agenticarchitect.ai', '')} →
                </a>
              </div>
              <p className="text-sm font-bold text-fg">HN Title: {pack.hnTitle}</p>
              <p className="text-xs text-muted bg-surface border border-border rounded-lg p-3 leading-relaxed">
                <strong>First-Comment Technical Context:</strong> {pack.hnFirstComment}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => copyText(`hn-t-${pack.id}`, pack.hnTitle)}
                  className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-fg hover:border-accent cursor-pointer"
                >
                  {copiedId === `hn-t-${pack.id}` ? 'Copied HN Title!' : 'Copy HN Title'}
                </button>
                <button
                  type="button"
                  onClick={() => copyText(`hn-c-${pack.id}`, pack.hnFirstComment)}
                  className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:opacity-95 cursor-pointer"
                >
                  {copiedId === `hn-c-${pack.id}` ? 'Copied First Comment!' : 'Copy HN First Comment'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

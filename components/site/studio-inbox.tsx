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

const HN_REDDIT_LAUNCH_PACKS = [
  {
    id: 'hn-hetzner-oss',
    target: 'Hacker News (Tue/Thu 7:00 AM ET) + r/SelfHosted',
    url: 'https://agenticarchitect.ai/blog/self-hosting-ai-stack-hetzner',
    hnTitle:
      'Replacing $125/mo of creator SaaS with Caddy, Listmonk, Cal.com, and Umami on a 4GB VPS',
    hnFirstComment:
      'Author here. I wanted to see if a single 4GB Linux box (Hetzner CX22) could comfortably run newsletter delivery (Listmonk + Resend SMTP), scheduling (Cal.com Docker), analytics (Umami), and status checks (Uptime Kuma) on one shared Postgres 16 instance with daily Restic backups. Total idle RAM sits around 1.5 GB; Plane and self-hosted PostHog did not fit in 4 GB, so I documented exact memory footprints, Caddyfile TLS snippets, and where self-hosting is not worth the trouble.',
  },
  {
    id: 'hn-mcp-audit',
    target: 'Hacker News + r/LocalLLaMA + r/programming',
    url: 'https://agenticarchitect.ai/blog/mcp-server-audit-2026',
    hnTitle:
      'Auditing MCP servers in 2026: archived repos, shell injection, and the ~30 worth trusting',
    hnFirstComment:
      'Author here. While reviewing MCP configs across real developer setups, I kept running into links pointing at the 14 unmaintained servers-archived packages and wrappers piping unvalidated tool args into shell exec. Put together a plain engineering audit of the 4-legged OAuth delegation gap (RFC 9728/8414/7591/8707), five concrete failure modes, and the subset of company-backed or least-privilege servers that survive scrutiny.',
  },
  {
    id: 'hn-96gb-tailscale',
    target: 'r/LocalLLaMA + Hacker News',
    url: 'https://agenticarchitect.ai/blog/96gb-ram-thesis',
    hnTitle:
      'Why 96GB of unified memory and a zero-port Tailscale mesh changed what I run locally',
    hnFirstComment:
      'Sharing notes and memory math from running 27B dense and 35B MoE open-weight workhorses locally on modular hardware (Framework 16 / high-RAM Linux node) exposed solely over Tailscale Serve with zero router port-forwarding, plus where cloud frontier APIs still win.',
  },
]

export function StudioInbox({
  initialReplies,
  initialRadar,
}: {
  initialReplies: ReplyItem[]
  initialRadar: RadarItem[]
}) {
  const [replies, setReplies] = useState<ReplyItem[]>(initialReplies)
  const [radar, setRadar] = useState<RadarItem[]>(initialRadar)
  const [refreshing, setRefreshing] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function handleRefreshRadar() {
    setRefreshing(true)
    try {
      const res = await fetch('/api/studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'refresh-radar' }),
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
      headers: { 'Content-Type': 'application/json' },
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

  return (
    <div className="space-y-12">
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
                <p className="font-mono text-[11px] text-muted mb-1">
                  On: {item.postTitle}
                </p>
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
              Weekly Trend, Tool Review &amp; SEO/GEO Briefs
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
                  3. Crisp Human LinkedIn Post Draft
                </p>
                <p className="text-xs text-fg whitespace-pre-line leading-relaxed">
                  {item.linkedinHook}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
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
                <button
                  type="button"
                  onClick={() =>
                    copyText(`cmd-${item.id}`, `npm run new:pack -- "${item.seoBlogTitle}"`)
                  }
                  className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:opacity-95 cursor-pointer"
                >
                  {copiedId === `cmd-${item.id}` ? 'Copied Command!' : 'Copy 1-Command Pack Generator'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. OSS, Hardware & Hacker News Launch Queue */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
              3. OSS, Hardware &amp; Show HN Distribution
            </p>
            <h2 className="text-xl font-bold text-fg">
              Ready-to-Post Hacker News &amp; r/LocalLLaMA Launch Packs
            </h2>
          </div>
          <Badge variant="rig">Feeds /sovereign-stack Book &amp; Freebies</Badge>
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

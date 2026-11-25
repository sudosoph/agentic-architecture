import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, type BlogTrack } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Playbooks & Technical Deep Dives',
  description:
    'Practical AI workflow playbooks for small businesses, model & autonomous rig guides, and production agent engineering deep dives by Sophia Stein.',
}

const TRACK_TABS: Array<{
  slug: BlogTrack
  label: string
  badgeVariant: 'online' | 'rig' | 'tag'
  blurb: string
}> = [
  {
    slug: 'small-business',
    label: 'Small Business & Workflows',
    badgeVariant: 'online',
    blurb: 'Plain-English playbooks to automate inbox, research, content, and operations.',
  },
  {
    slug: 'models-rigs',
    label: 'Models, Tailscale & Rigs',
    badgeVariant: 'rig',
    blurb: 'Model comparisons, cost routing, privacy compliance, and private AI hardware.',
  },
  {
    slug: 'engineering',
    label: 'Engineering Deep Dives',
    badgeVariant: 'tag',
    blurb: 'Production evaluations, MCP security, OAuth identity, and system architecture.',
  },
]

const TRACK_LABELS: Record<BlogTrack, string> = {
  'small-business': 'Small Business & Workflows',
  'models-rigs': 'Models, Tailscale & Rigs',
  engineering: 'Engineering Deep Dive',
}

const TRACK_BADGE_VARIANT: Record<BlogTrack, 'online' | 'rig' | 'tag'> = {
  'small-business': 'online',
  'models-rigs': 'rig',
  engineering: 'tag',
}

type Theme = { slug: string; label: string; tags: string[] }

const LEGACY_THEMES: Theme[] = [
  {
    slug: 'local-models',
    label: 'Local models',
    tags: [
      'local-inference',
      'local-models',
      'local-first',
      'amd',
      'rocm',
      'strix-point',
      'strix-halo',
      'framework',
      'hardware',
      'ollama',
      'benchmarks',
      'cost',
      'cost-benefit',
      'open-weights',
      'tailscale',
      'deepseek',
    ],
  },
  {
    slug: 'agent-architecture',
    label: 'Agent architecture',
    tags: [
      'agents',
      'mcp',
      'protocols',
      'patterns',
      'react',
      'plan-and-execute',
      'design',
      'context-engineering',
      'memory',
      'rag',
      'neo4j',
      'llamaindex',
      'apify',
      'firecrawl',
    ],
  },
  {
    slug: 'production',
    label: 'Production',
    tags: [
      'production',
      'evals',
      'observability',
      'ci-cd',
      'testing',
      'simulation',
      'shadow-testing',
      'devops',
      'infrastructure',
      'codex',
      'linear',
      'graphite',
      'documents',
      'vlm',
    ],
  },
  {
    slug: 'founders-smb',
    label: 'Founders & SMB',
    tags: [
      'smb',
      'founders',
      'ai-native',
      'ai-native-teams',
      'audit',
      'automation',
      'sales',
      'sdr',
      'inbox',
      'outbound',
      'monorepo',
      'turborepo',
      'saas',
      'n8n',
      'startups',
      'operations',
      'hiring',
      'ops',
      'careers',
      'monitoring',
      'competitive-intel',
    ],
  },
  {
    slug: 'identity-compliance',
    label: 'Identity & compliance',
    tags: ['identity', 'oauth', 'security', 'privacy', 'hitl', 'ethics', 'ai-act'],
  },
  {
    slug: 'culture',
    label: 'Culture',
    tags: [
      'vibe-coding',
      'claude-code',
      'community',
      'startup-week',
      'boulder',
      'ax',
      'ux',
      'seo',
      'ai-agents',
      'economics',
    ],
  },
]

function postMatchesTheme(postTags: string[], theme: Theme): boolean {
  const themeSet = new Set(theme.tags)
  return postTags.some(t => themeSet.has(t))
}

function firstParam(val?: string | string[]): string | undefined {
  return Array.isArray(val) ? val[0] : val
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{
    track?: string | string[]
    theme?: string | string[]
    tag?: string | string[]
  }>
}) {
  const rawParams = await searchParams
  const trackParam = firstParam(rawParams.track)
  const themeSlug = firstParam(rawParams.theme)
  const tag = firstParam(rawParams.tag)
  const allPosts = getAllPosts()

  const activeTrack = TRACK_TABS.find(t => t.slug === trackParam) ?? null
  const activeTheme = LEGACY_THEMES.find(t => t.slug === themeSlug) ?? null

  const posts = allPosts.filter(post => {
    if (activeTrack && post.track !== activeTrack.slug) return false
    if (tag && !post.tags.includes(tag)) return false
    if (activeTheme && !postMatchesTheme(post.tags, activeTheme)) return false
    return true
  })

  return (
    <div className="space-y-10">
      <PageHeader
        meta="Playbooks · Model Guides · Systems Research"
        title="AI Workflow Playbooks & Field Notes"
        description="Choose your reader track below: plain-English workflows for lean businesses, practical model and private-rig setups, or production engineering deep dives."
      />

      {/* Primary 3-Track Tabs */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
              !activeTrack && !activeTheme && !tag
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-muted border-border hover:border-accent hover:text-fg'
            }`}
          >
            All Playbooks ({allPosts.length})
          </Link>
          {TRACK_TABS.map(tab => {
            const count = allPosts.filter(p => p.track === tab.slug).length
            const isSelected = activeTrack?.slug === tab.slug
            return (
              <Link
                key={tab.slug}
                href={`/blog?track=${tab.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                  isSelected
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white text-muted border-border hover:border-accent hover:text-fg'
                }`}
              >
                {tab.label} ({count})
              </Link>
            )
          })}
        </div>

        {activeTrack && (
          <p className="text-sm text-muted bg-surface border border-border rounded-xl px-4 py-3">
            <strong className="text-fg">{activeTrack.label}:</strong> {activeTrack.blurb}
          </p>
        )}

        {(activeTheme || tag) && (
          <p className="font-mono text-xs text-muted">
            Showing {posts.length} of {allPosts.length} playbooks
            {activeTheme && (
              <>
                {' '}
                in <span className="text-fg">{activeTheme.label}</span>
              </>
            )}
            {tag && (
              <>
                {' '}
                tagged <span className="text-fg">{tag}</span>
              </>
            )}{' '}
            ·{' '}
            <Link href="/blog" className="text-accent hover:underline">
              Clear filter
            </Link>
          </p>
        )}
      </div>

      {/* Post Grid */}
      {posts.length === 0 ? (
        <Card className="p-8 text-center space-y-3">
          <p className="text-sm text-muted">No playbooks matched that filter.</p>
          <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
            View all playbooks →
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map(post => {
            const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC',
            })
            const trackKey: BlogTrack = post.track ?? 'engineering'
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <Card className="p-6 h-full flex flex-col justify-between space-y-4 hover:border-accent transition-colors">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge variant={TRACK_BADGE_VARIANT[trackKey]}>
                        {TRACK_LABELS[trackKey]}
                      </Badge>
                      <span className="font-mono text-xs text-muted">
                        {post.readingMinutes ?? 5} min read · {date}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-fg group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed">{post.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map(t => (
                        <span
                          key={t}
                          className="font-mono text-[11px] text-muted bg-white border border-border rounded-md px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-accent shrink-0">Read →</span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

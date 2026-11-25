import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, type BlogTrack } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Owner Playbooks & AI Workflow Guides',
  description:
    'Plain-English AI workflow blueprints, AI Chief of Staff setups, security reviews, and ROI calculators for business owners and operators by Sophia Stein.',
  alternates: {
    canonical: '/blog',
  },
}

const TRACK_LABELS: Record<BlogTrack, string> = {
  'small-business': 'Owner Playbook',
  'models-rigs': 'Models & Private Rigs',
  engineering: 'Systems Research',
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
    label: 'Founders & Principals',
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

  const activeTheme = LEGACY_THEMES.find(t => t.slug === themeSlug) ?? null
  // Default /blog strictly to non-technical Owner Playbooks ('small-business' track) unless another filter or ?track=all is explicitly chosen
  const effectiveTrack: BlogTrack | 'all' =
    trackParam === 'all'
      ? 'all'
      : trackParam === 'models-rigs' || trackParam === 'engineering' || trackParam === 'small-business'
        ? trackParam
        : activeTheme || tag
          ? 'all'
          : 'small-business'

  const posts = allPosts.filter(post => {
    if (effectiveTrack !== 'all' && post.track !== effectiveTrack) return false
    if (tag && !post.tags.includes(tag)) return false
    if (activeTheme && !postMatchesTheme(post.tags, activeTheme)) return false
    return true
  })

  const ownerCount = allPosts.filter(p => p.track === 'small-business').length
  const researchCount = allPosts.length - ownerCount

  return (
    <div className="space-y-10">
      <PageHeader
        meta="Practical Workflows · Bottleneck Audits · Cost & Security Guides"
        title="Business Owner Playbooks"
        description="Plain-English playbooks for founders, firm principals, and operators automating repetitive back-office work without writing code. (Looking for our engineering & hardware papers? Visit Research & Teaching.)"
      />

      {/* Owner Conversion Strip */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Where Are You Right Now?
          </p>
          <p className="text-sm font-bold text-fg">
            Learn step-by-step in our free live workshop &amp; $297 Academy, or book a free 20-min call to scope a custom sprint.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            href="/masterclass"
            className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Free 60-Min Live Build →
          </Link>
          <Link
            href="/work-with-me"
            className="inline-flex items-center rounded-lg border border-border bg-white px-4 py-2 text-xs font-semibold text-fg hover:border-accent transition-colors"
          >
            Free 20-Min Bottleneck Call
          </Link>
        </div>
      </div>

      {/* Clean Two-Room Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                effectiveTrack === 'small-business' && !activeTheme && !tag
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-muted border-border hover:border-accent hover:text-fg'
              }`}
            >
              Owner Playbooks ({ownerCount})
            </Link>
            <Link
              href="/blog?track=all"
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                effectiveTrack === 'all' && !activeTheme && !tag
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-muted border-border hover:border-accent hover:text-fg'
              }`}
            >
              All Archive ({allPosts.length})
            </Link>
          </div>

          <Link
            href="/research"
            className="text-xs font-semibold text-accent hover:underline"
          >
            Systems Benchmarks, 18-Ch. Book &amp; University Syllabi ({researchCount}) →
          </Link>
        </div>

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
              Back to Owner Playbooks
            </Link>
          </p>
        )}
      </div>

      {/* Post Grid */}
      {posts.length === 0 ? (
        <Card className="p-8 text-center space-y-3">
          <p className="text-sm text-muted">No playbooks matched that filter.</p>
          <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
            View Owner Playbooks →
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

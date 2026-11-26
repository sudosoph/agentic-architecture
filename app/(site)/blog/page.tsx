import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, type BlogTrack } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

export const metadata: Metadata = {
  title: 'Writing · Essays on AI Architecture, Workflows & Strategy',
  description:
    'Essays and technical field notes on AI workflow design, build-vs-buy strategy, model routing, evaluation harnesses, and private compute by Sophia Stein.',
  alternates: {
    canonical: '/blog',
  },
}

const TRACK_LABELS: Record<BlogTrack, string> = {
  'small-business': 'Strategy & Operations',
  'models-rigs': 'Models & Infrastructure',
  engineering: 'Systems Architecture',
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
  const effectiveTrack: BlogTrack | 'all' =
    trackParam === 'all'
      ? 'all'
      : trackParam === 'models-rigs' ||
          trackParam === 'engineering' ||
          trackParam === 'small-business'
        ? trackParam
        : 'all'

  const posts = allPosts.filter(post => {
    if (effectiveTrack !== 'all' && post.track !== effectiveTrack) return false
    if (tag && !post.tags.includes(tag)) return false
    if (activeTheme && !postMatchesTheme(post.tags, activeTheme)) return false
    return true
  })

  const ownerCount = allPosts.filter(p => p.track === 'small-business').length
  const modelsCount = allPosts.filter(p => p.track === 'models-rigs').length
  const engCount = allPosts.filter(p => p.track === 'engineering').length

  return (
    <div className="space-y-12">
      <PageHeader
        meta={`${allPosts.length} Essays & Field Notes · Updated Weekly`}
        title="Writing"
        description="Essays and reference notes on AI workflow design, organizational build-vs-buy strategy, model routing, and sovereign compute."
      />

      {/* Quiet Editorial Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: 'all', label: `All Writing (${allPosts.length})`, href: '/blog' },
              {
                key: 'small-business',
                label: `Strategy & Operations (${ownerCount})`,
                href: '/blog?track=small-business',
              },
              {
                key: 'models-rigs',
                label: `Models & Infrastructure (${modelsCount})`,
                href: '/blog?track=models-rigs',
              },
              {
                key: 'engineering',
                label: `Systems Architecture (${engCount})`,
                href: '/blog?track=engineering',
              },
            ].map(tab => {
              const active = effectiveTrack === tab.key && !activeTheme && !tag
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={`press-scale rounded-md px-3.5 py-1.5 text-xs font-medium border ${
                    active
                      ? 'bg-fg text-bg border-fg'
                      : 'bg-surface text-muted border-border hover:border-fg/40 hover:text-fg'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>

          <Link
            href="/sovereign-stack"
            className="text-xs font-medium text-muted hover:text-fg underline underline-offset-3 decoration-border"
          >
            Read The Sovereign Stack in 12-chapter order
          </Link>
        </div>

        {(activeTheme || tag) && (
          <p className="text-xs text-muted tabular-nums">
            Showing {posts.length} of {allPosts.length} essays
            {activeTheme && (
              <>
                {' '}
                in <span className="text-fg font-medium">{activeTheme.label}</span>
              </>
            )}
            {tag && (
              <>
                {' '}
                tagged <span className="text-fg font-medium">{tag}</span>
              </>
            )}{' '}
            ·{' '}
            <Link href="/blog" className="text-fg underline underline-offset-3">
              Clear filter
            </Link>
          </p>
        )}
      </div>

      {/* Dated Editorial List / Grid */}
      {posts.length === 0 ? (
        <Card className="p-8 text-center space-y-3">
          <p className="text-sm text-muted">No essays matched that filter.</p>
          <Link href="/blog" className="text-sm font-medium text-fg underline underline-offset-3">
            View all writing
          </Link>
        </Card>
      ) : (
        <div className="divide-y divide-border border-t border-b border-border">
          {posts.map(post => {
            const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC',
            })
            const trackKey: BlogTrack = post.track ?? 'engineering'
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="editorial-row block py-6 group"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline">
                  <div className="md:col-span-3 text-xs text-muted tabular-nums space-y-0.5">
                    <time dateTime={post.publishedDate} className="block font-medium text-fg/80">
                      {date}
                    </time>
                    <span className="block">
                      {TRACK_LABELS[trackKey]} · {post.readingMinutes ?? 6} min read
                    </span>
                  </div>
                  <div className="md:col-span-9 space-y-1.5">
                    <h2 className="font-serif text-2xl font-normal text-fg group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed max-w-2xl">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <NewsletterSignup source="blog-index" />
    </div>
  )
}

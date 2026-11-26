import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, type BlogTrack } from '@/lib/mdx'
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
    <div className="-mx-6 sm:-mx-8 -mt-9 sm:-mt-11 -mb-14 sm:-mb-16 divide-y divide-border">
      {/* Swiss Studio Header Block */}
      <header className="px-6 sm:px-8 py-9 sm:py-11 bg-surface flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <p className="font-mono text-xs text-muted tabular-nums">
            {allPosts.length} Essays &amp; Field Notes · Updated Weekly
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-fg leading-[1.08]">
            Writing
          </h1>
          <p className="text-base sm:text-[17px] text-muted leading-relaxed">
            Essays and reference notes on AI workflow design, organizational build-vs-buy strategy,
            model routing, and sovereign compute.
          </p>
        </div>

        <Link
          href="/sovereign-stack"
          className="text-xs font-semibold text-fg hover:text-accent underline underline-offset-3 decoration-border shrink-0"
        >
          Read The Sovereign Stack (12-Chapter Monograph) →
        </Link>
      </header>

      {/* Two-Tier Swiss Category & Topic Filter Matrix */}
      <div className="bg-bg px-6 sm:px-8 py-5 space-y-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
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
                className={`press-scale rounded px-3.5 py-1.5 text-xs font-medium border tabular-nums ${
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

        {/* Topic Clusters Bar */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[11px] text-muted mr-1">Topics:</span>
          {LEGACY_THEMES.map(theme => {
            const isThemeActive = activeTheme?.slug === theme.slug
            return (
              <Link
                key={theme.slug}
                href={isThemeActive ? '/blog' : `/blog?theme=${theme.slug}`}
                className={`rounded border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                  isThemeActive
                    ? 'bg-accent text-white border-accent'
                    : 'bg-surface text-muted border-border hover:text-fg hover:border-fg/40'
                }`}
              >
                {theme.label}
              </Link>
            )
          })}
        </div>

        {(activeTheme || tag || effectiveTrack !== 'all') && (
          <p className="text-xs text-muted tabular-nums pt-0.5">
            Showing {posts.length} of {allPosts.length} essays
            {effectiveTrack !== 'all' && (
              <>
                {' '}
                in <span className="text-fg font-medium">{TRACK_LABELS[effectiveTrack]}</span>
              </>
            )}
            {activeTheme && (
              <>
                {' '}
                under <span className="text-fg font-medium">{activeTheme.label}</span>
              </>
            )}
            {tag && (
              <>
                {' '}
                tagged <span className="font-mono text-fg font-medium">#{tag}</span>
              </>
            )}{' '}
            ·{' '}
            <Link href="/blog" className="text-fg font-medium underline underline-offset-3">
              Clear filter
            </Link>
          </p>
        )}
      </div>

      {/* Swiss Studio Essay Rows with Category Badges & Tag Chips */}
      {posts.length === 0 ? (
        <div className="p-8 sm:p-12 bg-surface">
          <Card className="p-8 text-center space-y-3">
            <p className="text-sm text-muted">No essays matched that filter.</p>
            <Link href="/blog" className="text-sm font-medium text-fg underline underline-offset-3">
              View all writing
            </Link>
          </Card>
        </div>
      ) : (
        <div className="divide-y divide-border bg-surface">
          {posts.map(post => {
            const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC',
            })
            const trackKey: BlogTrack = post.track ?? 'engineering'
            return (
              <article
                key={post.slug}
                className="swiss-cell px-6 sm:px-8 py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start"
              >
                <div className="md:col-span-3 text-xs tabular-nums space-y-1">
                  <time
                    dateTime={post.publishedDate}
                    className="block font-mono font-medium text-fg/85"
                  >
                    {date}
                  </time>
                  <Link
                    href={`/blog?track=${trackKey}`}
                    className="inline-block font-medium text-accent hover:underline"
                  >
                    {TRACK_LABELS[trackKey]}
                  </Link>
                  <span className="block text-muted">{post.readingMinutes ?? 6} min read</span>
                </div>

                <div className="md:col-span-9 space-y-2">
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.024em] text-fg group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 4).map(t => (
                        <Link
                          key={t}
                          href={`/blog?tag=${encodeURIComponent(t)}`}
                          className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-muted hover:text-fg hover:border-fg/40 transition-colors"
                        >
                          #{t}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}

      <div className="p-6 sm:p-10 bg-surface">
        <NewsletterSignup source="blog-index" buttonVariant="accent" />
      </div>
    </div>
  )
}

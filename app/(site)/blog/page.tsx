import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Benchmarks, field notes, and technical essays on local AI infrastructure, agentic architecture, and the cost economics of 2026 AI.',
}

// Themes are curated collections that group related tags into reader-friendly buckets.
// Each theme matches any post whose tags intersect with the theme's tag set.
type Theme = { slug: string; label: string; tags: string[] }

const THEMES: Theme[] = [
  {
    slug: 'local-models',
    label: 'Local models',
    tags: [
      'local-inference', 'local-models', 'local-first', 'amd', 'rocm',
      'strix-point', 'strix-halo', 'framework', 'hardware', 'ollama',
      'benchmarks', 'cost', 'cost-benefit', 'open-weights',
    ],
  },
  {
    slug: 'agent-architecture',
    label: 'Agent architecture',
    tags: [
      'agents', 'mcp', 'protocols', 'patterns', 'react', 'plan-and-execute',
      'design', 'context-engineering', 'memory', 'rag', 'neo4j',
      'llamaindex', 'apify', 'firecrawl',
    ],
  },
  {
    slug: 'production',
    label: 'Production',
    tags: [
      'production', 'evals', 'observability', 'ci-cd', 'testing',
      'simulation', 'shadow-testing', 'devops', 'infrastructure',
      'codex', 'linear', 'graphite', 'documents', 'vlm',
    ],
  },
  {
    slug: 'founders-smb',
    label: 'Founders & SMB',
    tags: [
      'smb', 'founders', 'ai-native', 'ai-native-teams', 'audit',
      'automation', 'sales', 'sdr', 'inbox', 'outbound', 'monorepo',
      'turborepo', 'saas', 'n8n', 'startups', 'operations', 'hiring',
      'ops', 'careers', 'monitoring', 'competitive-intel',
    ],
  },
  {
    slug: 'identity-compliance',
    label: 'Identity & compliance',
    tags: [
      'identity', 'oauth', 'security', 'privacy', 'hitl', 'ethics',
      'ai-act',
    ],
  },
  {
    slug: 'culture',
    label: 'Culture',
    tags: [
      'vibe-coding', 'claude-code', 'community', 'startup-week',
      'boulder', 'ax', 'ux', 'seo', 'ai-agents', 'economics',
    ],
  },
]

function postMatchesTheme(postTags: string[], theme: Theme): boolean {
  const themeSet = new Set(theme.tags)
  return postTags.some(t => themeSet.has(t))
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string; tag?: string }>
}) {
  const { theme: themeSlug, tag } = await searchParams
  const allPosts = getAllPosts()

  const activeTheme = THEMES.find(t => t.slug === themeSlug) ?? null

  const posts = allPosts.filter(post => {
    if (tag && !post.tags.includes(tag)) return false
    if (activeTheme && !postMatchesTheme(post.tags, activeTheme)) return false
    return true
  })

  return (
    <div>
      <PageHeader
        title="blog"
        description="Benchmarks, field notes, and technical essays on local AI infrastructure, agentic architecture, and the cost economics of 2026 AI."
      />

      {/* Theme filter chips */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        <Link
          href="/blog"
          className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
            !activeTheme && !tag
              ? 'border-accent text-accent bg-surface'
              : 'border-border text-muted hover:text-fg hover:border-fg'
          }`}
        >
          all posts
        </Link>
        {THEMES.map(t => (
          <Link
            key={t.slug}
            href={`/blog?theme=${t.slug}`}
            className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
              activeTheme?.slug === t.slug
                ? 'border-accent text-accent bg-surface'
                : 'border-border text-muted hover:text-fg hover:border-fg'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* Active filter indicator */}
      {(activeTheme || tag) && (
        <p className="font-mono text-xs text-muted mt-4">
          Showing {posts.length} of {allPosts.length} posts
          {activeTheme && <> in <span className="text-fg">{activeTheme.label}</span></>}
          {tag && <> tagged <span className="text-fg">{tag}</span></>}
          {' · '}
          <Link href="/blog" className="text-accent hover:underline">clear</Link>
        </p>
      )}

      {/* Post list */}
      <div className="mt-8 divide-y divide-border">
        {posts.length === 0 ? (
          <p className="font-mono text-sm text-muted py-8">No posts match this filter yet.</p>
        ) : (
          posts.map(post => {
            const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group py-6 first:pt-0 last:pb-0"
              >
                <article>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-mono text-base text-fg group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <time
                      dateTime={post.publishedDate}
                      className="font-mono text-xs text-muted shrink-0 mt-0.5"
                    >
                      {date}
                    </time>
                  </div>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.map(t => (
                        <Badge key={t} variant="tag">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}

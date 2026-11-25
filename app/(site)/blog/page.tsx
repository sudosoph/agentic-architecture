import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Blog · Local-First AI',
  description: 'Local-First AI: field notes and deep dives on agentic architecture, local inference, and what is actually working in 2026, with primary sources and benchmarks. By Sophia Stein in Boulder, CO.',
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

  const deepDiveCount = posts.filter(p => p.kind === 'deep-dive').length
  const fieldNoteCount = posts.length - deepDiveCount

  return (
    <div>
      <PageHeader
        title="Local-First AI"
        meta="blog"
        description="Deep dives and field notes on local-first AI, agentic architecture, and what is actually working in 2026, with primary sources and reproducible benchmarks."
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

      {/* Section jump-nav · skip to Deep dives or Field notes */}
      {deepDiveCount > 0 && fieldNoteCount > 0 && (
        <nav
          aria-label="Jump to section"
          className="mt-4 flex flex-wrap gap-1.5 font-mono text-xs"
        >
          <span className="text-muted uppercase tracking-widest pr-1 self-center">jump to:</span>
          <a
            href="#deep-dives"
            className="px-3 py-1.5 border border-border text-muted hover:text-fg hover:border-fg transition-colors"
          >
            Deep dives ({deepDiveCount})
          </a>
          <a
            href="#field-notes"
            className="px-3 py-1.5 border border-border text-muted hover:text-fg hover:border-fg transition-colors"
          >
            Field notes ({fieldNoteCount})
          </a>
        </nav>
      )}

      {/* Post list — split deep dives (top) from field notes (below) */}
      {posts.length === 0 ? (
        <p className="font-mono text-sm text-muted py-8 mt-8">No posts match this filter yet.</p>
      ) : (
        <PostSections posts={posts} />
      )}
    </div>
  )
}

function PostSections({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  const deepDives = posts.filter(p => p.kind === 'deep-dive')
  const regular = posts.filter(p => p.kind !== 'deep-dive')

  return (
    <>
      {deepDives.length > 0 && (
        <section id="deep-dives" className="mt-10 scroll-mt-24">
          <h2 className="font-mono text-xs text-bench uppercase tracking-widest mb-1">
            Deep dives
          </h2>
          <p className="font-mono text-xs text-muted mb-4">
            Long-form research articles with primary sources, benchmarks, and reference tables.
          </p>
          <div className="divide-y divide-border">
            {deepDives.map(post => (
              <PostRow key={post.slug} post={post} highlight />
            ))}
          </div>
        </section>
      )}

      <section id="field-notes" className="mt-12 scroll-mt-24">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          {deepDives.length > 0 ? 'Field notes' : 'All posts'}
        </h2>
        <div className="divide-y divide-border">
          {regular.map(post => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}

function PostRow({
  post,
  highlight = false,
}: {
  post: ReturnType<typeof getAllPosts>[number]
  highlight?: boolean
}) {
  const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group py-6 first:pt-0 last:pb-0"
    >
      <article>
        <div className="flex items-start justify-between gap-4">
          <h3 className={`font-mono text-fg group-hover:text-accent transition-colors flex items-baseline gap-2 ${highlight ? 'text-base md:text-lg' : 'text-base'}`}>
            <span className="text-bench shrink-0" aria-hidden="true">›</span>
            <span>{post.title}</span>
          </h3>
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
            {highlight && <Badge variant="tag">Deep dive</Badge>}
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
}

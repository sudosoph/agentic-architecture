'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { BlogTrack, PostMeta } from '@/lib/mdx'

const TRACK_LABELS: Record<BlogTrack, string> = {
  'small-business': 'Strategy & Operations',
  'models-rigs': 'Models & Infrastructure',
  engineering: 'Systems Architecture',
}

const TOPIC_CLUSTERS = [
  { label: 'Founders & Principals', href: '/blog?theme=founders-smb' },
  { label: 'Agent architecture', href: '/blog?theme=agent-architecture' },
  { label: 'Local models', href: '/blog?theme=local-models' },
  { label: 'Production & Evals', href: '/blog?theme=production' },
  { label: 'Identity & compliance', href: '/blog?theme=identity-compliance' },
  { label: 'Culture', href: '/blog?theme=culture' },
]

function formatUtcDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function HomeWritingExplorer({ posts }: { posts: PostMeta[] }) {
  const [activeTrack, setActiveTrack] = useState<'all' | BlogTrack>('all')

  const ownerCount = posts.filter(p => p.track === 'small-business').length
  const modelsCount = posts.filter(p => p.track === 'models-rigs').length
  const engCount = posts.filter(p => p.track === 'engineering').length

  const filtered =
    activeTrack === 'all' ? posts : posts.filter(p => (p.track ?? 'engineering') === activeTrack)

  const featuredPosts = filtered.slice(0, 3)
  const indexPosts = filtered.slice(3, 9)

  const activeCategoryLabel =
    activeTrack === 'all' ? 'All Writing' : TRACK_LABELS[activeTrack]

  const tabs: { key: 'all' | BlogTrack; label: string; count: number }[] = [
    { key: 'all', label: 'All Writing', count: posts.length },
    { key: 'small-business', label: 'Strategy & Operations', count: ownerCount },
    { key: 'models-rigs', label: 'Models & Infrastructure', count: modelsCount },
    { key: 'engineering', label: 'Systems Architecture', count: engCount },
  ]

  return (
    <section aria-label="Writing and category explorer">
      {/* Swiss Studio Category & Topic Matrix Bar */}
      <div className="bg-bg border-b border-border px-6 sm:px-8 py-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-accent">
              Writing &amp; Playbooks
            </span>
            <span className="text-border">·</span>
            <span className="text-xs text-muted tabular-nums">
              {posts.length} essays across 3 categories
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link
              href="/sovereign-stack"
              className="font-medium text-muted hover:text-fg transition-colors"
            >
              12-Chapter Sovereign Stack
            </Link>
            <Link
              href="/blog"
              className="font-semibold text-fg hover:text-accent transition-colors"
            >
              Full archive ({posts.length}) →
            </Link>
          </div>
        </div>

        {/* Interactive Category Tabs */}
        <div
          role="tablist"
          aria-label="Essay categories"
          className="flex flex-wrap items-center gap-1.5"
        >
          {tabs.map(tab => {
            const isSelected = activeTrack === tab.key
            return (
              <button
                key={tab.key}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveTrack(tab.key)}
                className={`press-scale rounded px-3 py-1.5 text-xs font-medium border cursor-pointer tabular-nums ${
                  isSelected
                    ? 'bg-fg text-bg border-fg'
                    : 'bg-surface text-muted border-border hover:border-fg/40 hover:text-fg'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            )
          })}
        </div>

        {/* Topic Clusters Quick Links */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="font-mono text-[11px] text-muted mr-1">Topics:</span>
          {TOPIC_CLUSTERS.map(cluster => (
            <Link
              key={cluster.href}
              href={cluster.href}
              className="rounded border border-border bg-surface px-2.5 py-0.5 text-[11px] font-medium text-muted hover:text-fg hover:border-fg/40 transition-colors"
            >
              {cluster.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Featured 3-Column Swiss Architectural Cells */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border bg-surface">
        {featuredPosts.map(post => {
          const track = post.track ?? 'engineering'
          const date = formatUtcDate(post.publishedDate)
          return (
            <article
              key={post.slug}
              className="swiss-cell p-6 sm:p-7 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-[11px] tabular-nums">
                  <Link
                    href={`/blog?track=${track}`}
                    className="font-medium text-accent hover:underline"
                  >
                    {TRACK_LABELS[track]}
                  </Link>
                  <time dateTime={post.publishedDate} className="font-mono text-muted">
                    {date}
                  </time>
                </div>

                <Link href={`/blog/${post.slug}`} className="block group">
                  <h3 className="font-display text-lg font-semibold tracking-[-0.022em] text-fg group-hover:text-accent transition-colors leading-[1.25]">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </div>

              <div className="pt-3.5 border-t border-border/70 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map(tag => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="rounded bg-bg border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted hover:text-fg transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <span className="font-mono text-[11px] text-muted tabular-nums shrink-0">
                  {post.readingMinutes ?? 6} min
                </span>
              </div>
            </article>
          )
        })}
      </div>

      {/* Swiss Tabular Essay Index */}
      {indexPosts.length > 0 && (
        <div className="divide-y divide-border bg-surface">
          {indexPosts.map(post => {
            const track = post.track ?? 'engineering'
            const date = formatUtcDate(post.publishedDate)
            return (
              <div
                key={post.slug}
                className="swiss-cell px-6 sm:px-8 py-4 grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-4 items-baseline"
              >
                <time
                  dateTime={post.publishedDate}
                  className="md:col-span-2 font-mono text-xs text-muted tabular-nums"
                >
                  {date}
                </time>

                <div className="md:col-span-7 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h3 className="font-display text-[15px] sm:text-base font-semibold tracking-[-0.018em] text-fg group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  {post.tags[0] && (
                    <Link
                      href={`/blog?tag=${encodeURIComponent(post.tags[0])}`}
                      className="hidden sm:inline font-mono text-[11px] text-muted hover:text-fg"
                    >
                      #{post.tags[0]}
                    </Link>
                  )}
                </div>

                <div className="md:col-span-3 md:text-right text-xs text-muted tabular-nums">
                  <Link href={`/blog?track=${track}`} className="hover:text-fg">
                    {TRACK_LABELS[track]}
                  </Link>{' '}
                  · {post.readingMinutes ?? 6} min
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Structural Footer Strip */}
      <div className="bg-bg border-t border-border px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted tabular-nums">
        <span>
          Showing {Math.min(9, filtered.length)} of {filtered.length} essays in{' '}
          <strong className="font-medium text-fg">{activeCategoryLabel}</strong>
        </span>
        <Link
          href={activeTrack === 'all' ? '/blog' : `/blog?track=${activeTrack}`}
          className="font-semibold text-fg hover:text-accent transition-colors"
        >
          Browse all {filtered.length} in {activeCategoryLabel} →
        </Link>
      </div>
    </section>
  )
}

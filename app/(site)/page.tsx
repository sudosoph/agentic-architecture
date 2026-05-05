import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-8 pb-4 border-b border-border">
        <p className="font-mono text-xs text-muted mb-3 tracking-widest uppercase">
          Sophia Stein · Boulder, CO
        </p>
        <h1 className="font-mono text-3xl text-fg leading-tight mb-4">
          Sovereign AI Architect
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-xl mb-6">
          Local-first LLM infrastructure, consulting, and open-source tools.
          I help engineers and businesses run powerful AI without sending data
          to the cloud.
        </p>

        {/* Benchmark callout */}
        <div className="inline-block border border-border bg-surface px-4 py-2 mb-6">
          <span className="font-mono text-bench text-lg font-bold">28.4 t/s</span>
          <span className="font-mono text-muted text-xs ml-3">
            GLM-4 9B Q8_0 · ROCm 7.3 · 90GB GART · AMD Strix Point
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" href="/work-with-me">
            work with me ›
          </Button>
          <Button variant="outline" size="md" href="/blog">
            read the blog →
          </Button>
        </div>
      </section>

      {/* What I do */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
          What I do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            {
              label: 'Consulting',
              body: 'Hands-on engagements: local LLM setup, agentic workflow automation, cost audits. From $299/hr.',
              href: '/work-with-me',
            },
            {
              label: 'OSS Tools',
              body: 'Open-source libraries for AMD APU configuration, ROCm tuning, and local inference benchmarking.',
              href: 'https://github.com/sudosoph',
            },
            {
              label: 'Technical Writing',
              body: 'Benchmarks, deep-dives, and field notes on what actually works at the frontier of local AI.',
              href: '/blog',
            },
          ].map(({ label, body, href }) => (
            <Link
              key={label}
              href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="block bg-bg p-6 group hover:bg-surface transition-colors"
            >
              <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors mb-2">
                {label}
              </h3>
              <p className="text-xs text-muted leading-relaxed">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      {posts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
              Recent posts
            </h2>
            <Link href="/blog" className="font-mono text-xs text-accent hover:underline">
              all posts →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {posts.map(post => {
              const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                      {post.title}
                    </span>
                    <time
                      dateTime={post.publishedDate}
                      className="font-mono text-xs text-muted shrink-0"
                    >
                      {date}
                    </time>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="tag">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Benchmarks, field notes, and technical essays on local AI infrastructure.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div>
      <PageHeader
        title="blog"
        description="Benchmarks, field notes, and technical essays on local AI infrastructure."
      />
      <div className="mt-8 divide-y divide-border">
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
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="tag">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

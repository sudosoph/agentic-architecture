import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, getPost } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  }
}

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const dateFormatted = new Date(post.frontmatter.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.publishedDate,
    author: {
      '@type': 'Person',
      name: 'Sophia Stein',
      url: 'https://agenticarchitecture.ai/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Agentic Architecture',
      url: 'https://agenticarchitecture.ai',
    },
  }

  const showToc = post.toc.length >= 3

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <article className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <div className="min-w-0">
          <PageHeader
            title={post.frontmatter.title}
            meta={dateFormatted}
            description={post.frontmatter.description}
          />
          {post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.frontmatter.tags.map(tag => (
                <Badge key={tag} variant="tag">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Mobile TOC */}
          {showToc && (
            <details className="lg:hidden mt-8 border border-border bg-surface p-4">
              <summary className="font-mono text-xs text-muted uppercase tracking-widest cursor-pointer">
                Contents ({post.toc.length})
              </summary>
              <ul className="mt-3 space-y-1.5">
                {post.toc.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="font-mono text-xs text-muted hover:text-accent leading-snug"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <div
            className="prose mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Newsletter signup at the bottom of every post · primary list-capture for syndicated traffic */}
          <div className="mt-16 pt-8 border-t border-border">
            <NewsletterSignup
              source={`post:${slug}`}
              sub="If this was useful, the weekly notes go deeper. No drip sequences, no upsells."
            />
          </div>

          {/* Back to blog · simple nav out of the post */}
          <div className="mt-8 flex items-center justify-between font-mono text-xs">
            <Link href="/blog" className="text-accent hover:underline">
              ← all posts
            </Link>
            <Link href="/rss.xml" className="text-muted hover:text-accent">
              RSS ↗
            </Link>
          </div>
        </div>

        {/* Desktop sticky TOC */}
        {showToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
                Contents
              </p>
              <ul className="space-y-2 border-l border-border">
                {post.toc.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block pl-4 -ml-px border-l border-transparent hover:border-accent font-mono text-xs text-muted hover:text-accent leading-snug py-0.5 transition-colors"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </article>
    </>
  )
}

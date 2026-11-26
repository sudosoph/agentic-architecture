import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, getPost, type BlogTrack } from '@/lib/mdx'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

type Props = { params: Promise<{ slug: string }> }

const TRACK_LABELS: Record<BlogTrack, string> = {
  'small-business': 'Strategy & Operations',
  'models-rigs': 'Models & Infrastructure',
  engineering: 'Systems Architecture',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
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
    timeZone: 'UTC',
  })

  const trackKey: BlogTrack = post.frontmatter.track ?? 'engineering'
  const readingMinutes = post.frontmatter.readingMinutes ?? 6

  const relatedPosts = getAllPosts()
    .filter(p => p.slug !== slug && p.track === trackKey)
    .slice(0, 3)

  const canonicalUrl = `${SITE_CONFIG.siteUrl}/blog/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${canonicalUrl}#article`,
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    datePublished: post.frontmatter.publishedDate,
    author: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.siteUrl}/#person`,
      name: SITE_CONFIG.authorName,
      url: `${SITE_CONFIG.siteUrl}/about`,
      sameAs: [SITE_CONFIG.linkedinUrl, SITE_CONFIG.substackUrl],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.siteUrl}/#organization`,
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.siteUrl,
    },
  }

  const showToc = post.toc.length >= 2
  const briefingBullets =
    Array.isArray(post.frontmatter.briefing) && post.frontmatter.briefing.length > 0
      ? post.frontmatter.briefing
      : [post.frontmatter.description]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <article
        data-article-slug={slug}
        data-reading-minutes={readingMinutes}
        className="lg:grid lg:grid-cols-[minmax(0,680px)_220px] lg:justify-between lg:gap-12"
      >
        <div className="min-w-0">
          {/* Editorial Article Header */}
          <header className="border-b border-border pb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted tabular-nums">
              <Link href={`/blog?track=${trackKey}`} className="font-medium text-fg hover:text-accent">
                {TRACK_LABELS[trackKey]}
              </Link>
              <span>·</span>
              <time dateTime={post.frontmatter.publishedDate}>{dateFormatted}</time>
              <span>·</span>
              <span>{readingMinutes} min read</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-[-0.02em] text-fg leading-[1.1]">
              {post.frontmatter.title}
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed">
              {post.frontmatter.description}
            </p>
          </header>

          {/* 30-Second Executive Briefing Box */}
          <div className="briefing-box mt-8 space-y-2.5">
            <p className="text-xs font-semibold text-fg">30-Second Briefing</p>
            <ul className="space-y-1.5 text-sm text-fg/90 leading-relaxed">
              {briefingBullets.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-muted select-none">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {post.toc.length >= 2 && (
              <p className="text-xs text-muted pt-2 border-t border-border">
                Covers: {post.toc.slice(0, 4).map(t => t.text).join(' · ')}
              </p>
            )}
          </div>

          {/* Mobile TOC */}
          {showToc && (
            <details className="lg:hidden mt-6 rounded-md border border-border bg-surface p-4">
              <summary className="text-xs font-semibold text-fg cursor-pointer">
                In this essay ({post.toc.length})
              </summary>
              <ul className="mt-3 space-y-1.5">
                {post.toc.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-xs text-muted hover:text-fg leading-snug"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* Calm 65ch Prose Body */}
          <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          {/* Quiet Track-Aware Practice Bridge */}
          <Card className="mt-14 p-6 md:p-8 space-y-4">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted">
                {trackKey === 'small-business'
                  ? 'Courses & Implementation'
                  : 'Architecture & Advisory'}
              </p>
              <h2 className="font-serif text-2xl font-normal text-fg">
                {trackKey === 'small-business'
                  ? 'Put these workflow patterns into daily operation'
                  : 'Evaluate your stack or explore fractional technical leadership'}
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {trackKey === 'small-business'
                  ? 'Explore hands-on tracks inside the Agentic Architect Lab on /courses, score your recurring chores with the free 20/80 Kit, or inquire about bespoke builds and workshops.'
                  : 'Run the unified-memory sizer in The Sovereign Stack, inspect our benchmark archive on /research, or explore Fractional CAIO and AI CTO partnerships.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                href={trackKey === 'small-business' ? '/courses' : '/sovereign-stack'}
              >
                {trackKey === 'small-business'
                  ? 'Explore the Lab & Courses'
                  : 'Open Sovereign Stack'}
              </Button>
              <Button variant="outline" size="md" href="/work-with-me">
                Work With Me
              </Button>
            </div>
          </Card>

          {/* Related Cluster Essays */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 space-y-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-2xl font-normal text-fg">
                  Continue in {TRACK_LABELS[trackKey]}
                </h2>
                <Link
                  href={`/blog?track=${trackKey}`}
                  className="text-xs font-medium text-muted hover:text-fg"
                >
                  View track
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map(rel => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="block group">
                    <Card
                      interactive
                      className="p-4 h-full flex flex-col justify-between space-y-2"
                    >
                      <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors leading-snug">
                        {rel.title}
                      </h3>
                      <span className="text-xs text-muted tabular-nums">
                        {rel.readingMinutes ?? 6} min read
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Single Clean Newsletter Signup */}
          <div className="mt-12 pt-8 border-t border-border">
            <NewsletterSignup source={`post:${slug}`} />
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-muted">
            <Link href="/blog" className="hover:text-fg">
              All writing
            </Link>
            <Link href="/rss.xml" className="hover:text-fg">
              RSS Feed
            </Link>
          </div>
        </div>

        {/* Desktop Sticky Rail */}
        {showToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="text-xs font-semibold text-fg mb-3">On this page</p>
                <ul className="space-y-2 border-l border-border">
                  {post.toc.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block pl-3.5 -ml-px border-l border-transparent hover:border-fg text-xs text-muted hover:text-fg leading-snug py-0.5 transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border space-y-2 text-xs">
                <p className="font-semibold text-fg">Reference Hubs</p>
                <ul className="space-y-1.5 text-muted">
                  <li>
                    <Link href="/what-is-an-agentic-architect" className="hover:text-fg">
                      4-Layer Reference Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" className="hover:text-fg">
                      Agentic Architect Lab
                    </Link>
                  </li>
                  <li>
                    <Link href="/starter-kit" className="hover:text-fg">
                      20/80 Task Readiness Kit
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        )}
      </article>
    </>
  )
}

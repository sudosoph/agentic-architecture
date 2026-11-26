import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, getPost, type BlogTrack } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

type Props = { params: Promise<{ slug: string }> }

const TRACK_LABELS: Record<BlogTrack, string> = {
  'small-business': 'Owner Playbook',
  'models-rigs': 'Models, Tailscale & Rigs',
  engineering: 'Engineering Deep Dive',
}

const TRACK_BADGE_VARIANT: Record<BlogTrack, 'online' | 'rig' | 'tag'> = {
  'small-business': 'online',
  'models-rigs': 'rig',
  engineering: 'tag',
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
  const readingMinutes = post.frontmatter.readingMinutes ?? 5

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
      sameAs: [
        SITE_CONFIG.linkedinUrl,
        SITE_CONFIG.xUrl,
        SITE_CONFIG.githubUrl,
        SITE_CONFIG.substackUrl,
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.siteUrl}/#organization`,
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.siteUrl,
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
      <article className="lg:grid lg:grid-cols-[1fr_230px] lg:gap-12">
        <div className="min-w-0">
          <PageHeader
            title={post.frontmatter.title}
            meta={`${dateFormatted} · ${readingMinutes} min read`}
            description={post.frontmatter.description}
          />

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Link href={`/blog?track=${trackKey}`}>
              <Badge variant={TRACK_BADGE_VARIANT[trackKey]}>{TRACK_LABELS[trackKey]}</Badge>
            </Link>
            {post.frontmatter.kind === 'deep-dive' && <Badge variant="tag">Deep Dive</Badge>}
            {post.frontmatter.tags.map(tag => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="tag">{tag}</Badge>
              </Link>
            ))}
          </div>

          {/* Mobile TOC */}
          {showToc && (
            <details className="lg:hidden mt-8 rounded-xl border border-border bg-surface p-4">
              <summary className="font-mono text-xs font-semibold text-fg uppercase tracking-wider cursor-pointer">
                On this page ({post.toc.length})
              </summary>
              <ul className="mt-3 space-y-2">
                {post.toc.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-xs text-muted hover:text-accent leading-snug"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          {/* Track-Aware Funnel Action Card */}
          <Card className="mt-14 p-6 md:p-8 bg-surface space-y-4 border-blue-200">
            <div className="space-y-1.5">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                {trackKey === 'small-business'
                  ? 'Free Live Build · Courses · Custom Sprints'
                  : 'Put This Architecture to Work'}
              </p>
              <h2 className="text-xl font-bold text-fg">
                {trackKey === 'small-business'
                  ? 'Go From Prompting to a Working Automation (Solo or Built With Us)'
                  : 'Run the Hardware Sizer, Audit Your Architecture, or Scope Fractional AI Leadership'}
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {trackKey === 'small-business'
                  ? 'Watch a live 60-minute briefing, unlock all 5 practitioner modules in Curriculum 01 ($297) or all 4 curricula on /courses, or book a 20-minute call to scope a bespoke build.'
                  : 'Run your numbers in The Sovereign Stack 512GB/OSS sizer, explore our 29 systems benchmarks, or scope Fractional CAIO / AI CTO leadership and Corporate Labs.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                href={trackKey === 'small-business' ? '/masterclass' : '/fractional-ai-cto'}
              >
                {trackKey === 'small-business'
                  ? 'Free 60-Min Live Build →'
                  : 'Fractional CAIO / AI CTO →'}
              </Button>
              <Button
                variant="outline"
                size="md"
                href={trackKey === 'small-business' ? '/courses' : '/sovereign-stack'}
              >
                {trackKey === 'small-business'
                  ? 'See $297 Academy & Cohort'
                  : 'Open Sovereign Stack & Sizer'}
              </Button>
              <Button variant="ghost" size="md" href="/work-with-me">
                {trackKey === 'small-business'
                  ? 'Free 20-Min Bottleneck Call →'
                  : '2-Week Audit & Corporate Labs →'}
              </Button>
            </div>
          </Card>

          {/* Related Playbooks */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-fg">More in {TRACK_LABELS[trackKey]}</h2>
                <Link
                  href={`/blog?track=${trackKey}`}
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  See all →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map(rel => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="block group">
                    <Card className="p-4 h-full flex flex-col justify-between space-y-2 hover:border-accent transition-colors">
                      <h3 className="text-sm font-bold text-fg group-hover:text-accent transition-colors leading-snug">
                        {rel.title}
                      </h3>
                      <span className="font-mono text-xs text-muted">
                        {rel.readingMinutes ?? 5} min read →
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Newsletter Signup */}
          <div className="mt-12 pt-8 border-t border-border">
            <NewsletterSignup source={`post:${slug}`} />
          </div>

          <div className="mt-8 flex items-center justify-between font-mono text-xs">
            <Link href="/blog" className="text-accent hover:underline">
              ← All playbooks
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
              <p className="font-mono text-xs font-semibold text-fg uppercase tracking-wider mb-4">
                On this page
              </p>
              <ul className="space-y-2 border-l border-border">
                {post.toc.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block pl-4 -ml-px border-l border-transparent hover:border-accent text-xs text-muted hover:text-accent leading-snug py-0.5 transition-colors"
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

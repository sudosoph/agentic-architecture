import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllGuides, getGuide } from '@/lib/guides'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    alternates: { canonical: `/guides/${slug}` },
  }
}

export function generateStaticParams() {
  return getAllGuides().map(guide => ({ slug: guide.slug }))
}

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const dateFormatted = new Date(guide.frontmatter.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.frontmatter.title,
    description: guide.frontmatter.description,
    datePublished: guide.frontmatter.publishedDate,
    totalTime: guide.frontmatter.estimatedTime,
    author: {
      '@type': 'Person',
      name: 'Sophia Stein',
      url: 'https://agenticarchitect.ai/about',
    },
  }

  const showToc = guide.toc.length >= 3

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <article
        data-article-slug={`guide:${slug}`}
        className="lg:grid lg:grid-cols-[minmax(0,680px)_220px] lg:justify-between lg:gap-12"
      >
        <div className="min-w-0">
          <PageHeader
            title={guide.frontmatter.title}
            meta={`${DIFFICULTY_LABEL[guide.frontmatter.difficulty] ?? guide.frontmatter.difficulty} · ~${guide.frontmatter.estimatedTime} · ${dateFormatted}`}
            description={guide.frontmatter.description}
          />

          {guide.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-5">
              {guide.frontmatter.tags.map(tag => (
                <Badge key={tag} variant="tag">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Mobile TOC */}
          {showToc && (
            <details className="lg:hidden mt-8 rounded-md border border-border bg-surface p-4">
              <summary className="text-xs font-semibold text-fg cursor-pointer">
                In this guide ({guide.toc.length})
              </summary>
              <ul className="mt-3 space-y-1.5">
                {guide.toc.map(item => (
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

          <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: guide.html }} />

          <div className="mt-16 pt-8 border-t border-border">
            <NewsletterSignup
              source={`guide:${slug}`}
              sub="Get new step-by-step guides and weekly architecture synthesis by email."
            />
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-muted">
            <Link href="/guides" className="hover:text-fg">
              All guides
            </Link>
            <Link href="/contact" className="hover:text-fg">
              Questions? Contact
            </Link>
          </div>
        </div>

        {showToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold text-fg mb-3">On this page</p>
              <ul className="space-y-2 border-l border-border">
                {guide.toc.map(item => (
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
          </aside>
        )}
      </article>
    </>
  )
}

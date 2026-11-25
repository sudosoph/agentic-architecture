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
      <article className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
        <div className="min-w-0">
          <PageHeader
            title={guide.frontmatter.title}
            meta={dateFormatted}
            description={guide.frontmatter.description}
          />

          {/* Meta strip: difficulty + time + repo */}
          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
            <Badge variant="tag">
              {DIFFICULTY_LABEL[guide.frontmatter.difficulty] ?? guide.frontmatter.difficulty}
            </Badge>
            <span className="text-muted">~{guide.frontmatter.estimatedTime}</span>
            {guide.frontmatter.repoUrl && (
              <a
                href={guide.frontmatter.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Fork the repo ↗
              </a>
            )}
          </div>

          {guide.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {guide.frontmatter.tags.map(tag => (
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
                Contents ({guide.toc.length})
              </summary>
              <ul className="mt-3 space-y-1.5">
                {guide.toc.map(item => (
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
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />

          <div className="mt-16 pt-8 border-t border-border">
            <NewsletterSignup
              source={`guide:${slug}`}
              sub="Get the next guide as soon as it lands. One email a week, beginner-friendly."
            />
          </div>

          <div className="mt-8 flex items-center justify-between font-mono text-xs">
            <Link href="/guides" className="text-accent hover:underline">
              ← all guides
            </Link>
            <Link href="/contact" className="text-muted hover:text-accent">
              stuck? ask a question
            </Link>
          </div>
        </div>

        {showToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
                Contents
              </p>
              <ul className="space-y-2 border-l border-border">
                {guide.toc.map(item => (
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

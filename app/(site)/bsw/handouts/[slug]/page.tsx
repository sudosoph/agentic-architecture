import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBswDoc, getBswHandouts } from '@/lib/bsw-manifest.generated'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getBswHandouts().map(h => ({ slug: h.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = getBswDoc('handout', slug)
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.description,
  }
}

export default async function BswHandoutPage({ params }: Props) {
  const { slug } = await params
  const doc = getBswDoc('handout', slug)
  if (!doc) notFound()

  // Sibling navigation
  const handouts = getBswHandouts()
  const idx = handouts.findIndex(h => h.slug === slug)
  const prev = idx > 0 ? handouts[idx - 1] : null
  const next = idx < handouts.length - 1 ? handouts[idx + 1] : null
  const showToc = doc.toc.length >= 3

  return (
    <article className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
      <div className="min-w-0">
        <Link href="/bsw/handouts" className="font-mono text-xs text-accent hover:underline">
          ← all handouts
        </Link>

        {showToc && (
          <details className="lg:hidden mt-8 border border-border bg-surface p-4">
            <summary className="font-mono text-xs text-muted uppercase tracking-widest cursor-pointer">
              Contents ({doc.toc.length})
            </summary>
            <ul className="mt-3 space-y-1.5">
              {doc.toc.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="font-mono text-xs text-muted hover:text-accent leading-snug">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="prose mt-8" dangerouslySetInnerHTML={{ __html: doc.html }} />

        <div className="mt-16 pt-8 border-t border-border">
          <NewsletterSignup
            source={`bsw:handout:${slug}`}
            sub="If this template is useful, weekly notes go deeper on patterns like this."
          />
        </div>

        <div className="mt-8 flex items-center justify-between font-mono text-xs gap-4">
          {prev ? (
            <Link href={`/bsw/handouts/${prev.slug}`} className="text-accent hover:underline">
              ← {prev.title}
            </Link>
          ) : (
            <Link href="/bsw/handouts" className="text-accent hover:underline">
              ← all handouts
            </Link>
          )}
          {next && (
            <Link href={`/bsw/handouts/${next.slug}`} className="text-accent hover:underline text-right">
              {next.title} →
            </Link>
          )}
        </div>
      </div>

      {showToc && (
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Contents</p>
            <ul className="space-y-2 border-l border-border">
              {doc.toc.map(item => (
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
  )
}


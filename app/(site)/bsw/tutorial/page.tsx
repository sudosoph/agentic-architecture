import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBswDoc } from '@/lib/bsw-manifest.generated'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

const doc = getBswDoc('page', 'tutorial')

export const metadata: Metadata = {
  title: doc?.title ?? 'BSW Tutorial',
  description: doc?.description ?? 'Build the founder discovery agent live, in 90 minutes.',
}

export default function BswTutorialPage() {
  if (!doc) notFound()
  const showToc = doc.toc.length >= 3

  return (
    <article className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
      <div className="min-w-0">
        <Link href="/bsw" className="font-mono text-xs text-accent hover:underline">
          ← back to workshop
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
            source="bsw:tutorial"
            sub="If this was useful, weekly notes on what is actually working ship to your inbox."
          />
        </div>

        <div className="mt-8 flex items-center justify-between font-mono text-xs">
          <Link href="/bsw" className="text-accent hover:underline">
            ← back to workshop
          </Link>
          <Link href="/bsw/setup" className="text-accent hover:underline">
            setup guide →
          </Link>
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

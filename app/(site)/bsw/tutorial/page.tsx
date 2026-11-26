import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBswDoc } from '@/lib/bsw-manifest.generated'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

const doc = getBswDoc('page', 'tutorial')

export const metadata: Metadata = {
  title: doc?.title ?? 'BSW Tutorial',
  description: doc?.description ?? 'Build the founder discovery workflow live in 90 minutes.',
}

export default function BswTutorialPage() {
  if (!doc) notFound()
  const showToc = doc.toc.length >= 3

  return (
    <article className="lg:grid lg:grid-cols-[minmax(0,680px)_220px] lg:justify-between lg:gap-12">
      <div className="min-w-0">
        <Link href="/bsw" className="text-xs font-medium text-muted hover:text-fg">
          Back to Boulder Startup Week Archive
        </Link>

        {showToc && (
          <details className="lg:hidden mt-6 rounded-md border border-border bg-surface p-4">
            <summary className="text-xs font-semibold text-fg cursor-pointer">
              Contents ({doc.toc.length})
            </summary>
            <ul className="mt-3 space-y-1.5">
              {doc.toc.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-xs text-muted hover:text-fg leading-snug">
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
            sub="Weekly architecture field notes and practical workflow blueprints by email."
          />
        </div>

        <div className="mt-8 flex items-center justify-between text-xs text-muted">
          <Link href="/bsw" className="hover:text-fg">
            Workshop overview
          </Link>
          <Link href="/bsw/setup" className="hover:text-fg">
            Setup guide
          </Link>
        </div>
      </div>

      {showToc && (
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-semibold text-fg mb-3">On this page</p>
            <ul className="space-y-2 border-l border-border">
              {doc.toc.map(item => (
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
  )
}

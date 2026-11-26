import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { getBswHandouts } from '@/lib/bsw-manifest.generated'

export const metadata: Metadata = {
  title: 'Workshop Handouts · Boulder Startup Week',
  description:
    'Printable templates and reference worksheets from the Boulder Startup Week workshop: the 20/80 worksheet, operating rules, qualification criteria, JSON schemas, and OSS growth playbook.',
}

const ORDER = [
  '20-80-worksheet',
  'icp',
  'voice',
  'schemas',
  'oss-growth-playbook',
]

export default function BswHandoutsPage() {
  const all = getBswHandouts()
  const handouts = ORDER.map(slug => all.find(h => h.slug === slug)).filter(
    (h): h is NonNullable<typeof h> => Boolean(h),
  )

  return (
    <div className="space-y-10 max-w-2xl">
      <div className="space-y-3">
        <Link href="/bsw" className="text-xs font-medium text-muted hover:text-fg">
          Back to Boulder Startup Week Archive
        </Link>
        <PageHeader
          title="Workshop Handouts"
          description="Printable templates and references from the Boulder Startup Week workshop. Each file is a plain-text starting point your team can adapt."
        />
      </div>

      <section className="divide-y divide-border border-t border-b border-border">
        {handouts.map(({ slug, title, description }) => (
          <Link
            key={slug}
            href={`/bsw/handouts/${slug}`}
            className="editorial-row block group py-5"
          >
            <h2 className="font-serif text-xl font-normal text-fg group-hover:text-accent transition-colors mb-1">
              {title}
            </h2>
            <p className="text-sm text-muted leading-relaxed">{description}</p>
          </Link>
        ))}
      </section>

      <section className="pt-2 space-y-3">
        <h2 className="text-xs font-semibold text-fg">Companion workshop materials</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/bsw/tutorial" className="text-fg underline underline-offset-3 decoration-border hover:decoration-fg">
              90-minute build-along tutorial
            </Link>
          </li>
          <li>
            <Link href="/bsw/setup" className="text-fg underline underline-offset-3 decoration-border hover:decoration-fg">
              Setup guide &amp; provider swap-ins
            </Link>
          </li>
          <li>
            <Link href="/bsw/templates" className="text-fg underline underline-offset-3 decoration-border hover:decoration-fg">
              n8n workflow templates
            </Link>
          </li>
          <li>
            <a
              href="/slides/bsw26.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline underline-offset-3 decoration-border hover:decoration-fg"
            >
              Open slide deck
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { getBswHandouts } from '@/lib/bsw-manifest.generated'

export const metadata: Metadata = {
  title: 'Workshop Handouts',
  description:
    'Printable templates and references from the BSW 2026 workshop. ICP, voice, schemas, OSS growth playbook, the 20/80 worksheet.',
}

// Friendly display order. Worksheet first because it is what attendees fill in
// during the workshop; templates next; reference reading last.
const ORDER = [
  '20-80-worksheet',
  'icp',
  'voice',
  'schemas',
  'oss-growth-playbook',
]

export default function BswHandoutsPage() {
  const all = getBswHandouts()
  const handouts = ORDER
    .map(slug => all.find(h => h.slug === slug))
    .filter((h): h is NonNullable<typeof h> => Boolean(h))

  return (
    <div className="space-y-10 max-w-2xl">
      <section className="pt-2">
        <Link href="/bsw" className="font-mono text-xs text-accent hover:underline">
          ← back to workshop
        </Link>
        <h1 className="font-mono text-2xl text-fg mt-3 mb-2">workshop handouts</h1>
        <p className="text-sm text-muted leading-relaxed">
          Templates and references from the BSW 2026 workshop. Each one is a
          working starting point. Fork, edit, ship.
        </p>
      </section>

      <section>
        <div className="divide-y divide-border">
          {handouts.map(({ slug, title, description }) => (
            <Link
              key={slug}
              href={`/bsw/handouts/${slug}`}
              className="block group py-5 first:pt-0 last:pb-0"
            >
              <h2 className="font-mono text-sm text-fg group-hover:text-accent transition-colors mb-1">
                {title}
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-2">{description}</p>
              <p className="font-mono text-xs text-accent group-hover:underline">
                read →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-8">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
          Other workshop materials
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/bsw/tutorial" className="text-accent hover:underline">
              90-min build-along tutorial →
            </Link>
          </li>
          <li>
            <Link href="/bsw/setup" className="text-accent hover:underline">
              Setup guide / provider swap-ins →
            </Link>
          </li>
          <li>
            <Link href="/bsw/templates" className="text-accent hover:underline">
              n8n workflow templates →
            </Link>
          </li>
          <li>
            <Link href="/slides/bsw26.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Slide deck ↗
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

type Props = {
  /** Origin of the signup (homepage / bsw / blog) for context. */
  source?: string
  /** Optional headline override. */
  headline?: string
  /** Optional sub-line override. */
  sub?: string
  /** Optional surface variant. Inline = compact bar without surrounding hero card. */
  variant?: 'card' | 'inline'
}

export function NewsletterSignup({
  source: _source,
  headline = 'Weekly AI Systems & Workflow Playbooks',
  sub,
  variant = 'card',
}: Props) {
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-4">
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm font-semibold text-fg">{SITE_CONFIG.newsletterName}</p>
          <p className="text-xs text-muted">
            Practical weekly teardowns on AI workflows, brand systems, and private setups.
          </p>
        </div>
        <Button variant="primary" size="sm" href={SITE_CONFIG.substackUrl}>
          Subscribe on Substack
        </Button>
      </div>
    )
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 font-mono text-xs font-semibold text-accent">
            {SITE_CONFIG.newsletterName}
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-fg">{headline}</h3>
          <p className="text-sm md:text-base text-muted leading-relaxed">
            {sub ??
              'One practical briefing each week on automating repetitive business work, scaling your brand voice, and owning your AI stack without subscription bloat.'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
          <Button variant="primary" size="md" href={SITE_CONFIG.substackUrl}>
            Subscribe Free on Substack
          </Button>
          <Link
            href={SITE_CONFIG.offers.starterKitUrl}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-fg hover:border-accent hover:text-accent transition-colors"
          >
            Get the Free Starter Kit
          </Link>
        </div>
      </div>
    </section>
  )
}

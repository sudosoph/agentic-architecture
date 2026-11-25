import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { StackTabs } from '@/components/site/stack-tabs'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Stack & Autonomous AI Rigs',
  description:
    'Switch between the 15-minute zero-cost Small Business AI Stack and the Private & Sovereign AI Rig running over Tailscale with open-weight models.',
  alternates: { canonical: '/stack' },
}

export default function StackPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        meta="Updated November 2026 · Zero-Bloat Tooling"
        title="Stack & Autonomous Rigs"
        description="Two practical ways to build: start in 15 minutes with free-tier business tools, or add an encrypted private AI rig over Tailscale when volume and data privacy demand it."
      />

      <StackTabs />

      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h2 className="text-xl font-bold text-fg">
            Want Step-by-Step Blueprints for Either Setup?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Grab the unlocked{' '}
            <Link href="/starter-kit" className="text-accent font-medium hover:underline">
              20/80 Bottleneck &amp; SOP Starter Kit
            </Link>{' '}
            for the 15-minute stack, browse technical deep dives on{' '}
            <Link href="/blog?track=models-rigs" className="text-accent font-medium hover:underline">
              Models, Tailscale &amp; Rigs
            </Link>
            , or inspect open configs on{' '}
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-medium hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="md" href="/starter-kit">
            Get Free Starter Kit →
          </Button>
          <Button variant="outline" size="md" href="/work-with-me">
            Book a Stack &amp; Cost Audit
          </Button>
        </div>
      </section>
    </div>
  )
}

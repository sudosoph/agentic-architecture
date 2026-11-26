import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { StackTabs } from '@/components/site/stack-tabs'

export const metadata: Metadata = {
  title: 'Stack & Private AI Rigs',
  description:
    'Switch between the lean operator AI stack and the private open-weight rig running over encrypted Tailscale mesh.',
  alternates: { canonical: '/stack' },
}

export default function StackPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Reference Tooling · Vendor-Neutral Architecture"
        title="Stack & Private Rigs"
        description="Two practical ways to build: start in fifteen minutes with versioned folders and free-tier connectors, or add an encrypted private AI node over Tailscale when volume and data boundaries demand it."
      />

      <StackTabs />

      <section className="rounded-lg border border-border bg-surface p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h2 className="font-serif text-2xl font-normal text-fg">
            Want step-by-step blueprints for either setup?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Open the unlocked{' '}
            <Link
              href="/starter-kit"
              className="text-fg underline underline-offset-3 decoration-border"
            >
              20/80 Task Readiness Kit
            </Link>{' '}
            for the lean team stack, or read our hardware and routing notes on{' '}
            <Link
              href="/sovereign-stack"
              className="text-fg underline underline-offset-3 decoration-border"
            >
              The Sovereign Stack
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="md" href="/starter-kit">
            Open Starter Kit
          </Button>
          <Button variant="outline" size="md" href="/work-with-me">
            Work With Me
          </Button>
        </div>
      </section>
    </div>
  )
}

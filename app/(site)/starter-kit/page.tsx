import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StarterKitBuilder } from '@/components/site/starter-kit-builder'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Free 20-Min Company Context Vault & AI Workflow Kit',
  description:
    'Download the portable voice.md + icp.md Company Context Vault, 20/80 Task Scorecard CSV, and Pre-Call Lead Dossier workflow, plus score your team bottlenecks live.',
  alternates: { canonical: '/starter-kit' },
}

export default function StarterKitPage() {
  return (
    <div className="space-y-14">
      <div className="space-y-4">
        <Badge variant="online">Instant Access · 4 Executive Templates + Live Bottleneck Scorer</Badge>
        <PageHeader
          title="The 20-Minute Company Context Vault & Workflow Kit"
          description="Download the portable voice.md and icp.md context files, importable Pre-Call Lead Dossier workflow, and 20/80 Task Readiness Scorecard."
        />
      </div>

      <StarterKitBuilder />

      {/* Next Steps Bridge */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 space-y-5">
        <div className="space-y-1">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Next Step: Build Live With Sophia
          </p>
          <h2 className="text-2xl font-bold text-fg">Turn Your Starter Kit Into 6 Live Workflows</h2>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Bring your completed <code className="font-mono text-fg">voice.md</code> to the next free
            60-minute live masterclass on Cal.com, or apply to install all 6 business systems inside
            the 8-week Agentic Business Accelerator.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" href={SITE_CONFIG.cal.masterclass}>
            Save Free 60-Min Masterclass Seat →
          </Button>
          <Button variant="outline" size="md" href="/accelerator">
            Explore the 8-Week Accelerator
          </Button>
          <Button variant="ghost" size="md" href={SITE_CONFIG.cal.audit}>
            Book a $1,500 VIP Audit
          </Button>
        </div>
      </section>

      <NewsletterSignup source="starter-kit" />
    </div>
  )
}

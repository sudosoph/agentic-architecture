import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StarterKitBuilder } from '@/components/site/starter-kit-builder'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Free 20/80 Bottleneck Readiness Calculator & Workflow Starter Kit',
  description:
    'Score your weekly operational bottlenecks live and download 4 ready-to-use business automation templates, including our Pre-Call Lead Dossier workflow and Task Audit CSV.',
  alternates: { canonical: '/starter-kit' },
}

export default function StarterKitPage() {
  return (
    <div className="space-y-14">
      <div className="space-y-4">
        <Badge variant="online">Instant Access · 4 Business Templates + Live Bottleneck Scorer</Badge>
        <PageHeader
          title="The 20/80 Bottleneck Readiness Calculator &amp; Workflow Kit"
          description="Score which repetitive process in your business to automate first, and download 4 ready-to-use SOP, qualification, scorecard, and pre-call dossier templates."
        />
      </div>

      <StarterKitBuilder />

      {/* Next Steps Bridge */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 space-y-5">
        <div className="space-y-1">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Next Step: Put Your #1 Workflow Live
          </p>
          <h2 className="text-2xl font-bold text-fg">
            Build It Solo in the $297 Academy or Book a Free 20-Min Bottleneck Call
          </h2>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Bring your top-scoring bottleneck to our free 60-minute live build, unlock all 6
            step-by-step modules in our self-paced Academy, or book a 20-minute discovery call to
            have us scope a custom sprint.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" href="/academy">
            Explore $297 Workflow Academy →
          </Button>
          <Button variant="outline" size="md" href={SITE_CONFIG.cal.masterclass}>
            Free 60-Min Live Build
          </Button>
          <Button variant="ghost" size="md" href={SITE_CONFIG.cal.scoping}>
            Free 20-Min Bottleneck Call
          </Button>
        </div>
      </section>

      <NewsletterSignup source="starter-kit" />
    </div>
  )
}

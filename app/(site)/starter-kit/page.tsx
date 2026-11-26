import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { StarterKitBuilder } from '@/components/site/starter-kit-builder'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Free 20/80 Bottleneck Readiness Calculator & Workflow Starter Kit',
  description:
    'Score your weekly operational bottlenecks live and download 4 ready-to-use automation templates, including our Pre-Call Lead Dossier workflow and Task Audit CSV.',
  alternates: { canonical: '/starter-kit' },
}

export default function StarterKitPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        meta="Unlocked Toolkit · 4 Templates + Interactive Readiness Scorer"
        title="The 20/80 Bottleneck Readiness Calculator & Workflow Kit"
        description="Score which recurring process in your organization to automate first, and download four ready-to-use SOP, qualification, scorecard, and pre-call dossier templates."
      />

      <StarterKitBuilder />

      {/* Next Steps Bridge */}
      <section className="rounded-lg border border-border bg-surface p-6 md:p-8 space-y-5">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted">Next Step</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
            Build your top-scoring workflow solo in the Lab or scope it with us
          </h2>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Read free unlocked lessons in the Agentic Architect Lab, join our next 60-minute live
            briefing, or book a 20-minute scoping call for a bespoke workflow sprint.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" href="/courses">
            Explore Courses &amp; Lab
          </Button>
          <Button variant="outline" size="md" href={SITE_CONFIG.cal.masterclass}>
            Free 60-Min Live Briefing
          </Button>
          <Button variant="ghost" size="md" href={SITE_CONFIG.cal.scoping}>
            20-Min Scoping Call
          </Button>
        </div>
      </section>

      <NewsletterSignup source="starter-kit" />
    </div>
  )
}

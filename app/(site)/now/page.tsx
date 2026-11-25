import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Sophia Stein is building, teaching, and writing right now in Boulder, CO. Updated November 2026.',
  alternates: { canonical: '/now' },
}

export default function NowPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        meta="Last updated November 24, 2026 · Boulder, CO"
        title="What I Am Focused On Right Now"
        description="A snapshot of active cohorts, workshops, writing, and teaching commitments, following Derek Sivers’ /now page convention."
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-6 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Flagship Cohort &amp; Live Masterclass
          </p>
          <h2 className="text-lg font-bold text-fg">The Agentic Business Accelerator</h2>
          <p className="text-sm text-muted leading-relaxed">
            Teaching non-technical business owners and operations leads how to automate repetitive
            bottlenecks through our{' '}
            <Link href="/masterclass" className="text-accent font-medium hover:underline">
              Free 60-Min Live Build
            </Link>{' '}
            and{' '}
            <Link href="/academy" className="text-accent font-medium hover:underline">
              Practical AI Workflow Academy
            </Link>
            , alongside Fractional CAIO / AI CTO partnerships on{' '}
            <Link href="/fractional-ai-cto" className="text-accent font-medium hover:underline">
              /fractional-ai-cto
            </Link>
            .
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
            Weekly Playbooks &amp; Newsletter
          </p>
          <h2 className="text-lg font-bold text-fg">{SITE_CONFIG.newsletterName}</h2>
          <p className="text-sm text-muted leading-relaxed">
            Publishing practical playbooks on small-business AI workflows, cost strategy, and
            private autonomous setups on the{' '}
            <Link href="/blog" className="text-accent font-medium hover:underline">
              blog
            </Link>{' '}
            and{' '}
            <a
              href={SITE_CONFIG.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-medium hover:underline"
            >
              Substack
            </a>
            , alongside serialized chapters of{' '}
            <Link href="/courses#book" className="text-accent font-medium hover:underline">
              The Sovereign Stack
            </Link>
            .
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-rig">
            Corporate &amp; Academic Teaching
          </p>
          <h2 className="text-lg font-bold text-fg">Workshops, Keynotes &amp; CU Boulder</h2>
          <p className="text-sm text-muted leading-relaxed">
            Following a 300+ attendee workshop at{' '}
            <Link href="/bsw" className="text-accent font-medium hover:underline">
              Boulder Startup Week
            </Link>{' '}
            and speaking for Women Who Code, expanding corporate enablement labs and university
            course modules across Boulder and Denver. See{' '}
            <Link href="/teaching" className="text-accent font-medium hover:underline">
              /teaching
            </Link>
            .
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Selective 1:1 Audits &amp; Advisory
          </p>
          <h2 className="text-lg font-bold text-fg">Executive Workflow &amp; Cost Audits</h2>
          <p className="text-sm text-muted leading-relaxed">
            Reserving two slots per week for 90-minute VIP AI Workflow &amp; Cost Audits and ongoing
            fractional advisory. Book directly on{' '}
            <Link href="/work-with-me" className="text-accent font-medium hover:underline">
              /work-with-me
            </Link>
            .
          </p>
        </Card>
      </section>

      <p className="text-xs text-muted border-t border-border pt-6">
        Inspired by{' '}
        <a
          href="https://nownownow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          nownownow.com
        </a>
        . {SITE_CONFIG.personalCapacityNote}
      </p>
    </div>
  )
}

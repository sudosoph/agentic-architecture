import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Sophia Stein is writing, teaching, and building right now in Boulder, CO.',
  alternates: { canonical: '/now' },
}

export default function NowPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        meta="Updated November 2026 · Boulder, Colorado"
        title="What I Am Focused On Right Now"
        description="A snapshot of active writing, courses, workshops, and advisory focus, following Derek Sivers’ /now page convention."
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-6 space-y-2">
          <p className="text-xs font-medium text-muted">Courses &amp; Skool Lab</p>
          <h2 className="font-serif text-xl font-normal text-fg">
            The Agentic Architect Lab
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Building hands-on screen-share modules across Claude Superuser &amp; Cowork OS,
            open-weight cost routing, and practical AI architecture on{' '}
            <Link
              href="/courses"
              className="text-fg underline underline-offset-3 decoration-border"
            >
              /courses
            </Link>
            .
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="text-xs font-medium text-muted">Essays &amp; Weekly Dispatch</p>
          <h2 className="font-serif text-xl font-normal text-fg">{SITE_CONFIG.newsletterName}</h2>
          <p className="text-sm text-muted leading-relaxed">
            Publishing architecture essays and hardware/model benchmarks on the{' '}
            <Link href="/blog" className="text-fg underline underline-offset-3 decoration-border">
              blog
            </Link>{' '}
            alongside weekly field notes on{' '}
            <a
              href={SITE_CONFIG.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline underline-offset-3 decoration-border"
            >
              Substack
            </a>
            .
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="text-xs font-medium text-muted">Speaking &amp; Campus Seminars</p>
          <h2 className="font-serif text-xl font-normal text-fg">
            Workshops, Keynotes &amp; University Syllabi
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Following a 300+ attendee session at{' '}
            <Link href="/bsw" className="text-fg underline underline-offset-3 decoration-border">
              Boulder Startup Week
            </Link>{' '}
            and speaking for Women Who Code, expanding corporate enablement intensives and
            university syllabi on{' '}
            <Link
              href="/teaching"
              className="text-fg underline underline-offset-3 decoration-border"
            >
              /teaching
            </Link>
            .
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="text-xs font-medium text-muted">Selective Advisory</p>
          <h2 className="font-serif text-xl font-normal text-fg">
            Architecture Diagnostics &amp; Fractional CAIO / CTO
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Partnering with a small number of leadership and engineering teams on workflow
            diagnostics, bespoke builds, and Fractional CAIO / AI CTO oversight via{' '}
            <Link
              href="/work-with-me"
              className="text-fg underline underline-offset-3 decoration-border"
            >
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
          className="text-fg underline underline-offset-3 decoration-border"
        >
          nownownow.com
        </a>
        .
      </p>
    </div>
  )
}

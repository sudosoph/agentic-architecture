import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Free 60-Min Live AI Architecture Briefing + 5-Day Primer',
  description:
    'Move from browser chat tabs to durable, human-reviewed AI workflows without writing code. Join Sophia Stein live for 60 minutes plus the 5-day applied architecture primer.',
  alternates: { canonical: '/masterclass' },
}

const AGENDA = [
  {
    window: 'Minutes 00 to 20',
    title: 'The Model Matrix & Structured Intake Skills',
    detail:
      'Where frontier and open-weight models stand right now, why one-line prompts produce generic guesses, and how reusable SKILL.md folders capture unwritten team context first.',
    outcome: 'Unlocked Lesson 1.1 + SKILL.md Template',
  },
  {
    window: 'Minutes 20 to 40',
    title: 'Live Architecture Build: Folder Workspaces & Draft Gates',
    detail:
      'Step-by-step walkthrough connecting folder-based workspaces, search/calendar connectors, and Draft-First human approval gates with zero vendor lock-in.',
    outcome: 'Working Blueprint + Briefing Deck (/slides/masterclass-2026.html)',
  },
  {
    window: 'Minutes 40 to 60',
    title: 'Department Build-vs-Buy, Privacy Tiers & Next Steps',
    detail:
      'Evaluating vertical AI platforms versus lightweight in-house workflows across Marketing, Finance, Legal, and Ops, setting Green/Amber/Red data boundaries, and open Q&A.',
    outcome: '5-Day Applied AI Architecture Primer + Live Q&A',
  },
]

const MASTERCLASS_FAQS = [
  {
    q: 'Do I need coding experience to build the workflows shown in this briefing?',
    a: 'No. Every build uses plain-English SOP rules and accessible workspace connectors that non-technical founders, operators, and managers can inspect and edit.',
  },
  {
    q: 'What comes after the free 60-minute briefing and 5-day primer?',
    a: 'Most attendees ship their first workflow directly from the unlocked kit. When you want structured hands-on mastery, explore the Agentic Architect Lab tracks on /courses or inquire about team workshops and bespoke builds on /work-with-me.',
  },
  {
    q: 'What if our organization already has a concrete workflow bottleneck to scope?',
    a: 'Open the unlocked 20/80 Task Readiness Kit immediately on /starter-kit or book a 20-minute scoping call on /work-with-me.',
  },
]

export default function MasterclassPage() {
  const masterclassLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_CONFIG.siteUrl}/masterclass#course`,
        name: 'Free 60-Min Live AI Workflow Briefing & 5-Day Primer',
        description:
          'Free 60-minute live build and 5-day applied AI architecture primer for founders, operators, and leaders automating research, inbox, and operational workflows.',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
          url: SITE_CONFIG.siteUrl,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${SITE_CONFIG.siteUrl}/masterclass`,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: MASTERCLASS_FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(masterclassLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-16">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-medium text-muted">
              Free 60-Min Live Briefing + 5-Day Primer · Zero Coding Required
            </p>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-[-0.02em] text-fg leading-[1.1]">
              Beyond browser chat tabs: building durable AI workflows you own.
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Most teams collect chat subscriptions and stall before dependable operational impact.
              In 60 minutes, walk through our model and privacy matrix, see how structured intake
              skills prevent generic output, and learn when to buy vertical software versus wiring a
              clean workflow in-house.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="primary" size="lg" href={SITE_CONFIG.cal.masterclass}>
                Reserve Free Live Seat
              </Button>
              <a
                href="/slides/masterclass-2026.html"
                target="_blank"
                rel="noopener noreferrer"
                className="press-scale inline-flex items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-fg hover:border-fg/45"
              >
                Preview Briefing Deck
              </a>
            </div>
          </div>

          <Card className="lg:col-span-5 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
              <span className="font-semibold text-fg">Included Free</span>
              <span className="text-muted">Live + Replay</span>
            </div>

            <ol className="space-y-4 text-sm">
              <li className="space-y-1">
                <p className="font-semibold text-fg">1. 60-minute live architecture walkthrough</p>
                <p className="text-xs text-muted leading-relaxed">
                  Reserve the next live session and receive the 5-day applied architecture primer
                  via email.
                </p>
              </li>
              <li className="space-y-1">
                <p className="font-semibold text-fg">
                  2. Unlocked 20/80 Task Readiness Kit &amp; Lead Dossier Blueprint
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  Score your highest-leverage recurring workflow in ten minutes before the session
                  begins.
                </p>
                <Link
                  href="/starter-kit"
                  className="inline-block pt-1 text-xs font-medium text-fg underline underline-offset-3 decoration-border hover:decoration-fg"
                >
                  Open Starter Kit now
                </Link>
              </li>
            </ol>
          </Card>
        </section>

        {/* 60-Min Agenda */}
        <section className="space-y-5">
          <div className="border-b border-border pb-6 space-y-2">
            <p className="text-xs font-medium text-muted">60-Minute Agenda</p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg">
              Three practical blocks, zero slide filler
            </h2>
            <p className="text-sm text-muted leading-relaxed max-w-2xl">
              Every 20-minute segment walks through a concrete workflow pattern you can apply the
              same week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AGENDA.map(item => (
              <Card key={item.window} className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted tabular-nums">{item.window}</span>
                  <h2 className="font-serif text-xl font-normal text-fg">{item.title}</h2>
                  <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                </div>
                <p className="text-xs text-fg/85 pt-3 border-t border-border">{item.outcome}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Next Steps Bridge */}
        <Card className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1 max-w-xl">
            <h2 className="font-serif text-2xl font-normal text-fg">
              Ready to explore structured courses or scope a custom build?
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Browse the three hands-on tracks in the Agentic Architect Lab on{' '}
              <Link
                href="/courses"
                className="text-fg underline underline-offset-3 decoration-border"
              >
                /courses
              </Link>{' '}
              or schedule a 20-minute scoping call on{' '}
              <Link
                href="/work-with-me"
                className="text-fg underline underline-offset-3 decoration-border"
              >
                /work-with-me
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="md" href="/courses">
              Explore the Lab
            </Button>
            <Button variant="outline" size="md" href={SITE_CONFIG.cal.scoping}>
              20-Min Scoping Call
            </Button>
          </div>
        </Card>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
            Frequently asked questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MASTERCLASS_FAQS.map(faq => (
              <Card key={faq.q} className="p-6 space-y-2">
                <h3 className="text-sm font-semibold text-fg leading-snug">{faq.q}</h3>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>

        <NewsletterSignup
          source="masterclass"
          headline="Get briefing dates & weekly architecture field notes"
          sub="Subscribe free to receive the 5-day applied architecture primer plus weekly essays."
        />
      </div>
    </>
  )
}

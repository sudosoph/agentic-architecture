import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { getModulesByCurriculum } from '@/lib/curriculum'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Claude Superuser & AI-Native Work Track · Agentic Architect Lab',
  description:
    'Hands-on foundations track for operators, founders, and managers: master the model matrix, privacy boundaries, reusable SKILL.md workflows, and folder-based AI Chief of Staff workspaces without coding.',
  alternates: { canonical: '/academy' },
}

const ACADEMY_FAQS = [
  {
    q: 'Do non-technical founders, managers, and operators need coding experience?',
    a: 'No. Every module teaches clear systems architecture in plain English: choosing the right model class, setting Green/Amber/Red privacy boundaries, writing structured intake skills that prevent hallucinations, and running folder-based AI Chief of Staff workflows without Python.',
  },
  {
    q: 'How does this track fit into the broader Agentic Architect Lab?',
    a: 'Foundations & Claude Superuser OS builds your daily workspace habits first. Inside the Lab on /courses, you can also explore Kill the $200/mo AI Subscription Stack (open-weight & smart routing) and Become an AI Architect (department build-vs-buy, bespoke APIs, and evaluation suites).',
  },
  {
    q: 'Can we bring this curriculum to an entire team or department?',
    a: 'Yes. Organizations book private half-day or full-day team workshops or custom implementation sprints via /teaching and /work-with-me.',
  },
]

export default function AcademyPage() {
  const foundationsModules = getModulesByCurriculum('foundations')

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_CONFIG.siteUrl}/academy#course`,
        name: 'Claude Superuser & AI-Native Work Foundations',
        description:
          '5-module foundations curriculum for leaders and non-technical operators covering the model matrix, privacy boundaries, structured SKILL.md workflows, and folder-based workspaces.',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
          url: SITE_CONFIG.siteUrl,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: ACADEMY_FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ld).replace(/</g, '\\u003c'),
        }}
      />
      <div className="space-y-14">
        <div className="space-y-4">
          <PageHeader
            meta="Track 01 · 5 Practitioner Modules · Module 1.1 Unlocked Free"
            title="Claude Superuser & AI-Native Work Foundations"
            description="Break the browser search-bar habit, build folder-based workflows (your real AI Chief of Staff) that handle recurring research, prep, and drafts without coding, and turn personal wins into team velocity."
          />

          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="primary" size="md" href="/courses/1-1-2026-ai-landscape-model-matrix">
              Read Module 1.1 Free
            </Button>
            <Button variant="outline" size="md" href="/courses">
              View All 3 Skool Lab Tracks
            </Button>
            <a
              href="/downloads/ld-stipend-approval-letter.md"
              download
              className="press-scale inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg hover:border-fg/45"
            >
              Download L&amp;D Approval Template
            </a>
          </div>
        </div>

        {/* All 5 practitioner modules */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
              All 5 practitioner modules
            </h2>
            <span className="text-xs text-muted">Module 1.1 open now</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {foundationsModules.map(mod => (
              <Card key={mod.slug} interactive className="p-5 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs tabular-nums">
                    <span className="font-medium text-fg">
                      Module {mod.frontmatter.moduleCode} · {mod.frontmatter.durationMinutes} mins
                    </span>
                    <Link
                      href={`/courses/${mod.slug}`}
                      className={
                        mod.frontmatter.unlocked
                          ? 'text-accent font-semibold hover:underline'
                          : 'text-muted hover:text-fg'
                      }
                    >
                      {mod.frontmatter.unlocked ? 'Read Free' : 'Outline'}
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold text-fg">{mod.frontmatter.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{mod.frontmatter.summary}</p>
                </div>
                <p className="text-[11px] text-muted pt-2 border-t border-border">
                  Deliverable: {mod.frontmatter.artifact}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Founding Lab Waitlist */}
        <NewsletterSignup
          source="academy-waitlist"
          headline="Join the Founding Lab Waitlist"
          sub="Get early invitations to the Agentic Architect Lab on Skool plus immediate access to the 5-day applied architecture primer."
          buttonLabel="Join Founding Waitlist"
          placeholder="Enter your email for Lab access..."
          successMessage="You are on the Founding Lab Waitlist. Check your inbox for Day 1 of the primer."
        />

        {/* Corporate & Custom Bridge */}
        <Card className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1 max-w-2xl">
            <p className="text-xs font-medium text-muted">Team Workshops &amp; Bespoke Systems</p>
            <h2 className="font-serif text-2xl font-normal text-fg">
              Want private team enablement or a workflow engineered with your staff?
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Bring this curriculum live to your organization or schedule a 20-minute scoping call
              to architect custom workflows inside your existing workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="md" href={SITE_CONFIG.cal.scoping}>
              Schedule Scoping Call
            </Button>
            <Button variant="outline" size="md" href="/work-with-me">
              Work With Me
            </Button>
          </div>
        </Card>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
            Frequently asked questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ACADEMY_FAQS.map(faq => (
              <Card key={faq.q} className="p-6 space-y-2">
                <h3 className="text-sm font-semibold text-fg leading-snug">{faq.q}</h3>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

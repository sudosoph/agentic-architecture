import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { ProductiveFrictionDemo } from '@/components/site/productive-friction-demo'
import { BespokeStackSelector } from '@/components/site/bespoke-stack-selector'
import {
  ALL_ACCESS_PASS,
  CURRICULA,
  getModulesByCurriculum,
} from '@/lib/curriculum'
import { SITE_CONFIG } from '@/lib/site-config'
import fiveDayChallenge from '@/content/courses/five-day-prompt-to-system.json'

export const metadata: Metadata = {
  title: 'AI Architecture Curricula: Models, Productive Friction, Bespoke APIs & Sovereign Rigs',
  description:
    'Four structured practitioner curricula (20 modules) spanning late-2026 models and interview-first Skills, department build-vs-buy playbooks, bespoke API harnesses, and private open-weight rigs.',
  alternates: { canonical: '/courses' },
}

export default function CoursesPage() {
  return (
    <div className="space-y-14">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="online">
            4 Practitioner Curricula · 20 Modules · Module x.1 Unlocked Free in Every Track
          </Badge>
          <a
            href="/downloads/ld-stipend-approval-letter.md"
            download
            className="font-mono text-xs text-accent hover:underline"
          >
            Expensing via Corporate L&amp;D Stipend? Download Approval Letter ↓
          </a>
        </div>

        <PageHeader
          meta="Columbia CS · Ex-McKinsey · Built for Leaders, Operators & Forward Deployed Builders"
          title="The Applied AI Architecture Academy"
          description="Start free inside Module x.1 of every curriculum. Master where models stand today, engineer Productive-Friction interview harnesses, evaluate Vertical AI vs. bespoke APIs across Marketing, Finance, Legal, and Ops, or size full private open-weight rigs."
        />
      </div>

      {/* All-Access Architect Pass Banner */}
      <Card className="p-6 md:p-8 border-accent bg-blue-50/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="rig">Save $691 Across All 4 Tracks</Badge>
            <span className="font-mono text-xs text-muted">
              100% Tuition Credit Toward Cohorts, Corporate Labs &amp; Bespoke Builds
            </span>
          </div>
          <h2 className="text-2xl font-bold text-fg">{ALL_ACCESS_PASS.title}</h2>
          <p className="text-sm text-muted leading-relaxed">
            Get instant access to all 20 modules, reusable <code className="font-mono">SKILL.md</code>{' '}
            and schema libraries, best-of-breed API recipes, and our L&amp;D reimbursement kit for{' '}
            <strong className="text-fg">${ALL_ACCESS_PASS.priceUsd}</strong>. Every dollar credits
            within 60 days toward our $1,497 Guided Cohort, Corporate Trainings ($7,500+), or a
            Forward Deployed Build-For-You engagement.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="lg" href={ALL_ACCESS_PASS.checkoutHref}>
            Get All-Access Pass (${ALL_ACCESS_PASS.priceUsd}) →
          </Button>
          <Button variant="outline" size="lg" href="/academy">
            Start With Curriculum 01 ($297)
          </Button>
        </div>
      </Card>

      {/* 4-Curriculum Grid */}
      <section id="starter-kit" className="space-y-6 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CURRICULA.map(curr => {
            const modules = getModulesByCurriculum(curr.id)
            const freeMod = modules[0]
            return (
              <Card key={curr.id} className="p-6 md:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                      {curr.number} · ${curr.priceUsd}
                    </span>
                    <Badge variant="tag">{curr.audience}</Badge>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-fg leading-snug">{curr.title}</h2>
                    <p className="text-sm text-muted leading-relaxed mt-1.5">{curr.subtitle}</p>
                  </div>

                  <ul className="divide-y divide-border border-t border-b border-border">
                    {modules.map(m => (
                      <li key={m.slug} className="py-2.5 flex items-center justify-between gap-3">
                        <Link
                          href={`/courses/${m.slug}`}
                          className="text-xs font-medium text-fg hover:text-accent hover:underline"
                        >
                          <span className="font-mono text-accent font-semibold mr-2">
                            {m.frontmatter.moduleCode}
                          </span>
                          {m.frontmatter.title}
                        </Link>
                        <Link
                          href={`/courses/${m.slug}`}
                          className={`font-mono text-[11px] shrink-0 hover:underline ${
                            m.frontmatter.unlocked ? 'text-online font-bold' : 'text-muted'
                          }`}
                        >
                          {m.frontmatter.unlocked ? 'Read Free →' : 'Syllabus →'}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {freeMod && (
                    <Button variant="primary" size="sm" href={`/courses/${freeMod.slug}`}>
                      Read Module {freeMod.frontmatter.moduleCode} Free →
                    </Button>
                  )}
                  <Button variant="outline" size="sm" href={curr.checkoutHref}>
                    Enroll (${curr.priceUsd})
                  </Button>
                  <Button variant="ghost" size="sm" href={curr.upsellHref}>
                    Team / Live Option
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Interactive Methodology Previews */}
      <ProductiveFrictionDemo />
      <BespokeStackSelector />

      {/* 5-Day Prompt-to-System Free Starter Sequence */}
      <section className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Free 5-Day Email Primer · Delivered Automatically on Signup
            </p>
            <h2 className="text-2xl font-bold text-fg">
              Inside the Free 5-Day Applied AI Architecture Primer
            </h2>
          </div>
          <Button variant="outline" size="sm" href="/masterclass">
            Join Free 60-Min Live Briefing →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {fiveDayChallenge.map(lesson => (
            <Card key={lesson.day} className="p-4 flex flex-col justify-between space-y-3 bg-surface">
              <div className="space-y-1.5">
                <span className="font-mono text-xs font-semibold text-accent">
                  Day 0{lesson.day}
                </span>
                <h3 className="text-sm font-bold text-fg leading-snug">{lesson.subject}</h3>
                <p className="text-xs text-muted leading-relaxed">{lesson.goal}</p>
              </div>
              <a
                href={lesson.ctaUrl.replace('https://agenticarchitect.ai', '') || '/'}
                className="font-mono text-xs font-semibold text-accent hover:underline"
              >
                Open Day {lesson.day} Resource →
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* Corporate, Cohort & Sovereign Book Bridge */}
      <section id="book" className="grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-mt-20">
        <Card className="p-6 md:p-8 space-y-4 bg-surface">
          <Badge variant="online">Cohorts · Corporate Labs · Forward Deployed Builds</Badge>
          <h2 className="text-xl font-bold text-fg">
            Bringing This Curriculum to Your Organization or Commissioning a Build?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            We run private Half-Day ($7,500) and Full-Day ($15,000) Corporate Labs with Marketing,
            Finance, Legal, and Ops breakouts, small-group Guided Cohorts ($1,497), and multi-month
            Forward Deployed bespoke system builds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="md" href="/teaching">
              Corporate Workshops &amp; Keynotes →
            </Button>
            <Button variant="outline" size="md" href="/work-with-me">
              Forward Deployed Builds
            </Button>
          </div>
        </Card>

        <Card className="p-6 md:p-8 space-y-4">
          <Badge variant="tag">Open 18-Chapter Engineering Manuscript</Badge>
          <h2 className="text-xl font-bold text-fg">
            The Sovereign Stack: Hardware Benchmarks, Loop Verifiers &amp; Field Manuals
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Read all 18 live engineering chapters free in your browser, run the 512GB vs. 128GB
            hardware sizer, and download 3 copy-paste Markdown field manuals.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="md" href="/sovereign-stack">
              Open 18-Chapter Book &amp; Sizer →
            </Button>
            <Button variant="ghost" size="md" href="/bsw">
              BSW Open Lab Archive
            </Button>
          </div>
        </Card>
      </section>

      <NewsletterSignup source="courses" />
    </div>
  )
}

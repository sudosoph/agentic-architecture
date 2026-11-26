import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { BespokeStackSelector } from '@/components/site/bespoke-stack-selector'
import {
  CURRICULA,
  SKOOL_LAB_TRACKS,
  getModulesByCurriculum,
} from '@/lib/curriculum'
import fiveDayChallenge from '@/content/courses/five-day-prompt-to-system.json'

export const metadata: Metadata = {
  title: 'Courses & The Agentic Architect Lab',
  description:
    'Hands-on AI courses and Skool community tracks for non-technical operators, founders, and builders: Claude Superuser & Cowork OS, Kill the $200/mo AI Stack, and Become an AI Architect.',
  alternates: { canonical: '/courses' },
}

export default function CoursesPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        meta="The Agentic Architect Lab · Hands-On Courses, Unlocked Modules & Live Builds"
        title="Upskill from chat user to AI systems builder."
        description="Practical courses and community labs designed for non-technical operators, founders, and builders who want working workflows, lower subscription bills, and durable architectural judgment."
      />

      {/* 3 Flagship Skool Lab Tracks */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-muted">Core Learning Paths (Skool Lab)</p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
              Three practical tracks built around real outcomes
            </h2>
          </div>
          <a href="#waitlist" className="text-xs font-medium text-fg hover:text-accent">
            Join the Founding Lab Waitlist
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {SKOOL_LAB_TRACKS.map(track => (
            <Card key={track.number} className="p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted tabular-nums">
                    {track.number}
                  </span>
                  <Badge variant="tag">Skool Track</Badge>
                </div>
                <h3 className="font-serif text-2xl font-normal text-fg leading-snug">
                  {track.title}
                </h3>
                <p className="text-xs font-medium text-fg/80">{track.audience}</p>
                <p className="text-sm text-muted leading-relaxed">{track.summary}</p>
                <ul className="space-y-2 pt-3 border-t border-border text-xs text-fg/90">
                  {track.outcomes.map(outcome => (
                    <li key={outcome} className="flex items-start gap-2">
                      <span className="text-muted select-none">·</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-3 border-t border-border">
                <Button variant="primary" size="sm" href={track.freeModuleHref}>
                  {track.freeModuleLabel}
                </Button>
                <Button variant="outline" size="sm" href="#waitlist">
                  Founding Waitlist
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Real Founding Lab Waitlist Form */}
      <div id="waitlist" className="scroll-mt-24">
        <NewsletterSignup
          source="skool-waitlist"
          headline="Join the Founding Lab Waitlist"
          sub="Receive founding cohort invitations when the Agentic Architect Lab opens on Skool, plus immediate inbox delivery of the free 5-day applied architecture primer."
          buttonLabel="Join Founding Waitlist"
          placeholder="Enter your email for Founding Lab invites..."
          successMessage="You are on the Founding Lab Waitlist. Check your inbox for Day 1 of the architecture primer."
        />
      </div>

      {/* Full 20-Module Reference Syllabus + 4 Unlocked Cornerstone Lessons */}
      <section id="syllabus" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-muted">
              20 Modules · Lesson x.1 Unlocked Free in Every Syllabus
            </p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
              Inspect the full curriculum and start reading free
            </h2>
          </div>
          <Link href="/academy" className="text-xs font-medium text-muted hover:text-fg">
            View Foundations track overview
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CURRICULA.map(curr => {
            const modules = getModulesByCurriculum(curr.id)
            const freeMod = modules[0]
            return (
              <Card key={curr.id} className="p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                    <span className="font-medium text-fg">{curr.number}</span>
                    <span>{curr.audience}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-normal text-fg leading-snug">
                      {curr.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mt-1.5">{curr.subtitle}</p>
                  </div>

                  <ul className="divide-y divide-border border-t border-b border-border">
                    {modules.map(m => (
                      <li key={m.slug} className="py-2.5 flex items-center justify-between gap-3">
                        <Link
                          href={`/courses/${m.slug}`}
                          className="text-xs font-medium text-fg hover:text-accent transition-colors"
                        >
                          <span className="font-mono text-muted mr-2 tabular-nums">
                            {m.frontmatter.moduleCode}
                          </span>
                          {m.frontmatter.title}
                        </Link>
                        <Link
                          href={`/courses/${m.slug}`}
                          className={`text-[11px] shrink-0 ${
                            m.frontmatter.unlocked
                              ? 'text-accent font-semibold hover:underline'
                              : 'text-muted hover:text-fg'
                          }`}
                        >
                          {m.frontmatter.unlocked ? 'Unlocked Free' : 'Outline'}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {freeMod && (
                    <Button variant="primary" size="sm" href={`/courses/${freeMod.slug}`}>
                      Read Module {freeMod.frontmatter.moduleCode} Free
                    </Button>
                  )}
                  <Button variant="outline" size="sm" href={curr.upsellHref}>
                    {curr.upsellLabel}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Interactive Department Build-vs-Buy Matrix */}
      <BespokeStackSelector />

      {/* 5-Day Free Email Primer */}
      <section className="rounded-lg border border-border bg-surface p-6 md:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted">
              Free 5-Day Email Primer · Sent Automatically on Signup
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
              Inside the 5-day applied AI architecture primer
            </h2>
          </div>
          <Button variant="outline" size="sm" href="/masterclass">
            Free 60-Min Live Briefing
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {fiveDayChallenge.map(lesson => (
            <Card key={lesson.day} className="p-4 flex flex-col justify-between space-y-3 bg-bg">
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted tabular-nums">
                  Day 0{lesson.day}
                </span>
                <h3 className="text-sm font-semibold text-fg leading-snug">{lesson.subject}</h3>
                <p className="text-xs text-muted leading-relaxed">{lesson.goal}</p>
              </div>
              <Link
                href={lesson.ctaUrl.replace('https://agenticarchitect.ai', '') || '/'}
                className="text-xs font-medium text-fg hover:text-accent transition-colors"
              >
                Open Day {lesson.day} resource
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Corporate Training & Open Monograph Bridge */}
      <section id="book" className="grid grid-cols-1 lg:grid-cols-2 gap-6 scroll-mt-24">
        <Card className="p-6 md:p-8 space-y-4">
          <p className="text-xs font-medium text-muted">Organizations &amp; Leadership Teams</p>
          <h2 className="font-serif text-2xl font-normal text-fg">
            Bringing hands-on AI training or custom workflows to your team?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            We run tailored corporate department intensives across Marketing, Finance, Legal, and
            Operations, alongside embedded architecture sprints where your staff keeps every SOP and
            configuration.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="primary" size="md" href="/teaching">
              Corporate Workshops &amp; Keynotes
            </Button>
            <Button variant="outline" size="md" href="/work-with-me">
              Bespoke Systems &amp; Advisory
            </Button>
          </div>
        </Card>

        <Card className="p-6 md:p-8 space-y-4">
          <p className="text-xs font-medium text-muted">Open Technical Monograph</p>
          <h2 className="font-serif text-2xl font-normal text-fg">
            The Sovereign Stack: Hardware Physics, Routing &amp; Field Manuals
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Read our compiled engineering chapters free online, run the interactive unified-memory
            hardware sizer, and download three copy-paste Markdown field manuals.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="outline" size="md" href="/sovereign-stack">
              Open Sovereign Stack Monograph
            </Button>
            <Button variant="ghost" size="md" href="/bsw">
              BSW Open Lab Archive
            </Button>
          </div>
        </Card>
      </section>
    </div>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  getAllCurriculumModules,
  getModulesByCurriculum,
  getPublicModuleView,
} from '@/lib/curriculum'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const view = getPublicModuleView(slug)
  if (!view) return {}
  return {
    title: `Module ${view.frontmatter.moduleCode}: ${view.frontmatter.title} · ${view.curriculum.number}`,
    description: view.frontmatter.summary,
    alternates: view.frontmatter.unlocked ? { canonical: `/courses/${slug}` } : undefined,
    robots: view.frontmatter.unlocked
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}

export function generateStaticParams() {
  return getAllCurriculumModules().map(m => ({ slug: m.slug }))
}

export default async function CourseModulePage({ params }: Props) {
  const { slug } = await params
  const view = getPublicModuleView(slug)
  if (!view) notFound()

  const { frontmatter, curriculum, html, toc } = view
  const siblingModules = getModulesByCurriculum(curriculum.id)

  const jsonLd = frontmatter.unlocked
    ? {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        '@id': `${SITE_CONFIG.siteUrl}/courses/${slug}#lesson`,
        name: `Module ${frontmatter.moduleCode}: ${frontmatter.title}`,
        description: frontmatter.summary,
        learningResourceType: 'Lesson',
        isAccessibleForFree: true,
        author: {
          '@type': 'Person',
          '@id': `${SITE_CONFIG.siteUrl}/#person`,
          name: SITE_CONFIG.authorName,
        },
        isPartOf: {
          '@type': 'Course',
          name: `${curriculum.number}: ${curriculum.title}`,
          url: `${SITE_CONFIG.siteUrl}/courses`,
        },
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      )}

      <article
        data-article-slug={`course:${slug}`}
        data-reading-minutes={frontmatter.durationMinutes}
        className="space-y-12"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted tabular-nums">
              <Badge variant={frontmatter.unlocked ? 'online' : 'tag'}>
                {frontmatter.unlocked ? 'Unlocked Free Lesson' : 'Syllabus Preview'}
              </Badge>
              <span>
                {curriculum.number} · Module {frontmatter.moduleCode} · {frontmatter.durationMinutes}{' '}
                mins
              </span>
            </div>
            <Link href="/courses" className="text-xs font-medium text-muted hover:text-fg">
              Back to Courses &amp; Lab
            </Link>
          </div>

          <PageHeader
            meta={`${curriculum.title} · Deliverable: ${frontmatter.artifact}`}
            title={`Module ${frontmatter.moduleCode}: ${frontmatter.title}`}
            description={frontmatter.summary}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 min-w-0 space-y-8">
            <div className="briefing-box space-y-3">
              <p className="text-xs font-semibold text-fg">What You Build &amp; Master</p>
              <ul className="space-y-1.5 text-sm text-fg/90">
                {frontmatter.learningOutcomes.map(outcome => (
                  <li key={outcome} className="flex items-start gap-2.5">
                    <span className="text-muted select-none">·</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted pt-2 border-t border-border">
                Deliverable artifact: <strong className="text-fg">{frontmatter.artifact}</strong>
              </p>
            </div>

            {frontmatter.unlocked && html ? (
              <>
                {toc.length > 1 && (
                  <Card className="p-5 space-y-2">
                    <p className="text-xs font-semibold text-fg">In this lesson</p>
                    <ul className="space-y-1.5 text-sm">
                      {toc.map(item => (
                        <li key={item.id}>
                          <a href={`#${item.id}`} className="text-muted hover:text-fg">
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {slug === '1-1-2026-ai-landscape-model-matrix' && (
                  <Card className="p-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-fg">
                        Prefer slide format? Open the presentation deck
                      </p>
                      <p className="text-xs text-muted">
                        Keyboard-navigable HTML slide deck for executive briefings and team reviews.
                      </p>
                    </div>
                    <a
                      href="/slides/curriculum-01-models-and-landscape.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press-scale inline-flex items-center justify-center rounded-md border border-border bg-surface px-3.5 py-2 text-xs font-medium text-fg hover:border-fg/45 shrink-0"
                    >
                      Open Slide Deck
                    </a>
                  </Card>
                )}

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
              </>
            ) : (
              <Card className="p-6 md:p-8 space-y-5">
                <div className="space-y-2">
                  <Badge variant="online">Agentic Architect Lab · Founding Cohort</Badge>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-fg">
                    Join the Founding Lab Waitlist to unlock all full modules and templates
                  </h2>
                  <p className="text-sm text-muted leading-relaxed">
                    Module {frontmatter.moduleCode} is part of{' '}
                    <strong className="text-fg">{curriculum.title}</strong> inside the Agentic
                    Architect Lab, including full written and screen-share walkthroughs, reusable{' '}
                    <code className="font-mono">SKILL.md</code> configurations, and live build
                    sessions. Join the waitlist below for founding invitations and immediate access
                    to our 5-day architecture primer.
                  </p>
                </div>

                <NewsletterSignup
                  source={`course-module:${slug}`}
                  variant="inline"
                  buttonLabel="Join Founding Waitlist"
                  placeholder="Enter your email for Founding Lab invites..."
                  successMessage="You are on the Founding Lab Waitlist. Check your inbox for Day 1 of the primer."
                />

                <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
                  <span>Bringing a team or planning an L&amp;D cohort?</span>
                  <a
                    href={SITE_CONFIG.cal.scoping}
                    className="font-medium text-fg hover:text-accent underline underline-offset-3"
                  >
                    Schedule a 20-minute team scoping call
                  </a>
                </div>
              </Card>
            )}

            {/* Contextual Team & Advisory Bridge */}
            <Card className="p-6 md:p-8 space-y-4">
              <p className="text-xs font-medium text-muted">
                Corporate Workshops &amp; Bespoke Systems
              </p>
              <h2 className="font-serif text-2xl font-normal text-fg">
                Want your team trained live or want this system engineered with you?
              </h2>
              <p className="text-sm text-muted leading-relaxed">{frontmatter.upsellBridge}</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md" href={curriculum.upsellHref}>
                  {curriculum.upsellLabel}
                </Button>
                <Button variant="outline" size="md" href="/work-with-me">
                  Bespoke Systems &amp; Advisory
                </Button>
              </div>
            </Card>
          </div>

          {/* Syllabus Rail */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <Card className="p-5 space-y-4">
              <div>
                <p className="text-xs font-medium text-muted">{curriculum.number}</p>
                <h2 className="font-serif text-lg font-normal text-fg mt-0.5">
                  {curriculum.title}
                </h2>
                <p className="text-xs text-muted mt-1">{curriculum.audience}</p>
              </div>

              <ul className="divide-y divide-border border-t border-border">
                {siblingModules.map(item => {
                  const active = item.slug === slug
                  return (
                    <li key={item.slug} className="py-2.5">
                      <Link
                        href={`/courses/${item.slug}`}
                        className={`block space-y-1 ${
                          active ? 'text-fg font-semibold' : 'text-muted hover:text-fg'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px] tabular-nums">
                          <span>Module {item.frontmatter.moduleCode}</span>
                          <span className={item.frontmatter.unlocked ? 'text-accent font-medium' : ''}>
                            {item.frontmatter.unlocked ? 'Unlocked' : 'Lab'}
                          </span>
                        </div>
                        <p className="text-xs text-fg leading-snug">{item.frontmatter.title}</p>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="pt-2 border-t border-border flex flex-col gap-2">
                <Button variant="primary" size="sm" href="/courses#waitlist">
                  Join Founding Waitlist
                </Button>
                <Button variant="outline" size="sm" href="/courses">
                  All Tracks &amp; Syllabi
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </article>
    </>
  )
}

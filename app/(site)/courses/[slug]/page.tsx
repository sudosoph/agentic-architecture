import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ALL_ACCESS_PASS,
  getAllCurriculumModules,
  getModulesByCurriculum,
  getPublicModuleView,
} from '@/lib/curriculum'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={frontmatter.unlocked ? 'online' : 'rig'}>
                {frontmatter.unlocked ? 'Unlocked Free Lesson' : 'Syllabus Preview · Enrolled Vault'}
              </Badge>
              <span className="font-mono text-xs text-muted">
                {curriculum.number} · Module {frontmatter.moduleCode} · {frontmatter.durationMinutes} mins
              </span>
            </div>
            <Link href="/courses" className="font-mono text-xs text-accent hover:underline">
              ← Back to All 4 Curricula
            </Link>
          </div>

          <PageHeader
            meta={`${curriculum.title} · Artifact: ${frontmatter.artifact}`}
            title={`Module ${frontmatter.moduleCode}: ${frontmatter.title}`}
            description={frontmatter.summary}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Lesson or Syllabus Preview */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="p-6 bg-surface space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                What You Build &amp; Master in This Module
              </p>
              <ul className="space-y-2 text-sm text-fg">
                {frontmatter.learningOutcomes.map(outcome => (
                  <li key={outcome} className="flex items-start gap-2.5">
                    <span className="text-online font-bold mt-0.5">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-xs text-muted pt-2 border-t border-border">
                Deliverable Artifact: <strong className="text-fg">{frontmatter.artifact}</strong>
              </p>
            </Card>

            {frontmatter.unlocked && html ? (
              <>
                {toc.length > 1 && (
                  <Card className="p-5 space-y-2">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                      In This Lesson
                    </p>
                    <ul className="space-y-1 text-sm">
                      {toc.map(item => (
                        <li key={item.id}>
                          <a href={`#${item.id}`} className="text-accent hover:underline">
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {slug === '1-1-2026-ai-landscape-model-matrix' && (
                  <Card className="p-5 bg-blue-50/40 border-blue-200 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-fg">
                        Prefer Slide Format? Open the 1280x720 Presentation Deck
                      </p>
                      <p className="text-xs text-muted">
                        Keyboard-navigable HTML slide deck built for executive briefings and team reviews.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      href="/slides/curriculum-01-models-and-landscape.html"
                    >
                      Open Slide Deck ↗
                    </Button>
                  </Card>
                )}

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
              </>
            ) : (
              <Card className="p-6 md:p-8 border-accent space-y-5">
                <div className="space-y-2">
                  <Badge variant="online">
                    Included in {curriculum.number} (${curriculum.priceUsd}) &amp; All-Access Pass ($
                    {ALL_ACCESS_PASS.priceUsd})
                  </Badge>
                  <h2 className="text-2xl font-bold text-fg">
                    Unlock Full Written Walkthroughs, Copy-Paste Skills &amp; Architecture Templates
                  </h2>
                  <p className="text-sm text-muted leading-relaxed">
                    Module {frontmatter.moduleCode} is part of the enrolled student vault for{' '}
                    <strong className="text-fg">{curriculum.title}</strong>. Enrollment includes all
                    5 full modules, reusable <code className="font-mono">SKILL.md</code> and schema
                    packs, our L&amp;D Stipend Reimbursement Kit, and 100% tuition credit within 60
                    days toward a Live Cohort ($1,497), Corporate Department Lab ($7,500+), or
                    Forward Deployed Build-For-You engagement.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="lg" href={curriculum.checkoutHref}>
                    Enroll in {curriculum.number} (${curriculum.priceUsd}) →
                  </Button>
                  <Button variant="outline" size="lg" href={ALL_ACCESS_PASS.checkoutHref}>
                    All-Access 4-Curriculum Pass (${ALL_ACCESS_PASS.priceUsd})
                  </Button>
                  <Button variant="ghost" size="lg" href={SITE_CONFIG.cal.scoping}>
                    Book 20-Min Team / Custom Scoping Call
                  </Button>
                </div>

                <p className="text-xs text-muted pt-3 border-t border-border">
                  Using an annual corporate learning stipend?{' '}
                  <a
                    href="/downloads/ld-stipend-approval-letter.md"
                    download
                    className="font-semibold text-accent hover:underline"
                  >
                    Download the 1-page Manager &amp; L&amp;D Approval Template ↓
                  </a>
                </p>
              </Card>
            )}

            {/* Contextual High-Ticket Bridge */}
            <Card className="p-6 md:p-8 bg-surface space-y-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Cohorts · Corporate Department Trainings · Forward Deployed Builds
              </p>
              <h2 className="text-xl font-bold text-fg">
                Want Your Team Trained Live or Want Us to Engineer This System For You?
              </h2>
              <p className="text-sm text-muted leading-relaxed">{frontmatter.upsellBridge}</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md" href={curriculum.upsellHref}>
                  {curriculum.upsellLabel} →
                </Button>
                <Button variant="outline" size="md" href="/work-with-me">
                  Forward Deployed Build-For-You
                </Button>
                <Button variant="ghost" size="md" href={SITE_CONFIG.cal.speaking}>
                  Corporate Training &amp; Speaking
                </Button>
              </div>
            </Card>
          </div>

          {/* Curriculum Module Rail */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <Card className="p-5 space-y-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  {curriculum.number}
                </p>
                <h2 className="text-base font-bold text-fg mt-0.5">{curriculum.title}</h2>
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
                          active ? 'text-accent font-semibold' : 'text-fg hover:text-accent'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                          <span>Module {item.frontmatter.moduleCode}</span>
                          <span
                            className={
                              item.frontmatter.unlocked ? 'text-online font-semibold' : 'text-muted'
                            }
                          >
                            {item.frontmatter.unlocked ? 'Free Lesson' : 'Vault'}
                          </span>
                        </div>
                        <p className="text-xs leading-snug">{item.frontmatter.title}</p>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="pt-2 border-t border-border flex flex-col gap-2">
                <Button variant="primary" size="sm" href={curriculum.checkoutHref}>
                  Unlock Full {curriculum.number} (${curriculum.priceUsd})
                </Button>
                <Button variant="outline" size="sm" href="/courses">
                  Compare All 4 Curricula
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </>
  )
}

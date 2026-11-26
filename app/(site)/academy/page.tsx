import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AcademySeatCalculator } from '@/components/site/academy-seat-calculator'
import { ProductiveFrictionDemo } from '@/components/site/productive-friction-demo'
import { getModulesByCurriculum } from '@/lib/curriculum'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Curriculum 01 ($297): Applied AI Foundations, Models & Productive-Friction Skills',
  description:
    'Flagship foundations course for founders, executives, managers, and operators: master the 2026 model matrix, privacy tradeoffs, interview-first Skills, agentic workspaces without code, and org-wide upskilling.',
  alternates: { canonical: '/academy' },
}

const ACADEMY_FAQS = [
  {
    q: 'Do non-technical founders, managers, and operators need coding experience?',
    a: 'No. Curriculum 01 teaches rigorous architecture in plain English: choosing the right model class, setting Green/Amber/Red privacy boundaries, writing Socratic SKILL.md interview harnesses that stop hallucinations, and running modern folder-based workspaces (including AI Chief of Staff and operational workflows) without Python.',
  },
  {
    q: 'How does Curriculum 01 connect to your advanced API, Department, and Sovereign Rig courses?',
    a: 'Curriculum 01 ($297) builds the core mental models and workspace habits. From there, functional VPs continue into Curriculum 02 (Department Build-vs-Buy, $397), builders advance into Curriculum 03 (Bespoke APIs & Forward Deployed Engineering, $497), and technical leads add Curriculum 04 (Sovereign Open-Weight Rigs, $497), or grab the $997 All-Access Pass on /courses.',
  },
  {
    q: 'Can I credit my $297 enrollment toward a Cohort, Corporate Lab, or Bespoke Build?',
    a: 'Yes. 100% of your $297 tuition credits within 60 days toward our Guided Implementation Cohort ($1,497), a Half-Day or Full-Day Corporate Department Training ($7,500+), or a Forward Deployed Build-For-You engagement on /work-with-me.',
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
        name: 'Curriculum 01: Applied AI Foundations, Models, Productive Friction & Codified Skills',
        description:
          '5-module foundations curriculum for leaders and non-technical operators covering the 2026 model matrix, privacy tradeoffs, Socratic interview Skills, agentic workspaces, and organizational upskilling.',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
          url: SITE_CONFIG.siteUrl,
        },
        offers: {
          '@type': 'Offer',
          price: '297',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: SITE_CONFIG.cal.academy,
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
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="online">
              Curriculum 01 of 4 · Foundations for Leaders, Managers &amp; Non-Coders
            </Badge>
            <Link href="/courses" className="font-mono text-xs text-accent hover:underline">
              Looking for Department AI, Bespoke APIs, or Sovereign Rig Curricula? View all 4 →
            </Link>
          </div>

          <PageHeader
            meta="5 Practitioner Modules · Module 1.1 Unlocked Free · L&D Stipend Eligible"
            title="AI-Native Work &amp; Role Automation: Ship 5x Faster"
            description="Maximize brand-new frontier capabilities the week they drop, break the search-bar mindset, build folder-based workflows (your real AI Chief of Staff) that reclaim 8+ hours a week without coding, and turn personal wins into team velocity."
          />

          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="primary" size="md" href="/courses/1-1-2026-ai-landscape-model-matrix">
              Read Module 1.1 Free Now →
            </Button>
            <a
              href="/downloads/ld-stipend-approval-letter.md"
              download
              className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-fg hover:border-accent hover:text-accent transition-colors"
            >
              Download L&amp;D Stipend Letter ↓
            </a>
          </div>
        </div>

        {/* Split Curriculum + Interactive Team Seat Calculator */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-bold text-fg">Inside Curriculum 01 (5 Modules)</h2>
            <div className="grid grid-cols-1 gap-4">
              {foundationsModules.map(mod => (
                <Card key={mod.slug} className="p-5 space-y-2">
                  <div className="flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="font-bold text-accent">
                      Module {mod.frontmatter.moduleCode} · {mod.frontmatter.durationMinutes} mins
                    </span>
                    <Link
                      href={`/courses/${mod.slug}`}
                      className={
                        mod.frontmatter.unlocked
                          ? 'text-online font-bold hover:underline'
                          : 'text-accent hover:underline'
                      }
                    >
                      {mod.frontmatter.unlocked ? 'Unlocked Free Lesson →' : 'Syllabus Preview →'}
                    </Link>
                  </div>
                  <h3 className="text-base font-bold text-fg">{mod.frontmatter.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{mod.frontmatter.summary}</p>
                  <p className="font-mono text-[11px] text-muted pt-1 border-t border-border">
                    Artifact: {mod.frontmatter.artifact}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <AcademySeatCalculator />
          </div>
        </section>

        <ProductiveFrictionDemo />

        {/* Clean Upsell Bridge to Forward Deployed Builds & Corporate Labs */}
        <Card className="p-6 md:p-8 bg-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-rig">
              100% Tuition Credit Toward Live Trainings &amp; Bespoke Builds
            </p>
            <h2 className="text-xl font-bold text-fg">
              Want Corporate Department Training or a Forward Deployed System Built For You?
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Bring this curriculum live to your company ($7,500 Half-Day / $15,000 Full-Day Lab)
              or book a 20-minute scoping call to have us architect bespoke API harnesses across
              your stack.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="md" href={SITE_CONFIG.cal.scoping}>
              Book 20-Min Scoping Call →
            </Button>
            <Button variant="outline" size="md" href="/work-with-me">
              Forward Deployed Builds
            </Button>
          </div>
        </Card>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-fg">Curriculum 01 &amp; Team Seat FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ACADEMY_FAQS.map(faq => (
              <Card key={faq.q} className="p-6 space-y-2">
                <h3 className="text-sm font-bold text-fg leading-snug">{faq.q}</h3>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { HeroBlueprintSwitcher } from '@/components/site/hero-blueprint'
import { SITE_CONFIG } from '@/lib/site-config'

const PROFESSIONAL_SERVICE_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_CONFIG.siteName,
  description: SITE_CONFIG.tagline,
  url: SITE_CONFIG.siteUrl,
  founder: {
    '@type': 'Person',
    name: SITE_CONFIG.authorName,
    jobTitle: 'AI Systems Architect & Educator',
    url: `${SITE_CONFIG.siteUrl}/about`,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Boulder',
    addressRegion: 'CO',
    addressCountry: 'US',
  },
  priceRange: '$$$',
  serviceType: 'AI Workflow Enablement, Corporate Training & Advisory',
}

const PATH_CARDS = [
  {
    eyebrow: 'For Founders & Lean Teams',
    title: 'Small Business Setups & Cohort',
    body: 'Install your Brand Brain and 6 core business AI workflows without hiring or writing code. Start with the free 60-minute live Masterclass.',
    cta: 'Explore Programs & Kits',
    href: '/courses',
    badge: 'Free Kit + Live Class',
    badgeColor: 'green' as const,
  },
  {
    eyebrow: 'For Corporate & Universities',
    title: 'Workshops, Speaking & Teaching',
    body: 'Hands-on AI enablement intensives for executive and non-technical teams, conference keynotes, and university guest lectures.',
    cta: 'View Speaking & Syllabi',
    href: '/teaching',
    badge: '300+ Trained Live',
    badgeColor: 'blue' as const,
  },
  {
    eyebrow: 'For Leaders & Builders',
    title: '1:1 Audits & Private AI Stack',
    body: 'Book a 90-minute workflow and cost teardown, or explore reference blueprints for private AI infrastructure you control.',
    cta: 'Work With Sophia',
    href: '/work-with-me',
    badge: 'Advisory & Audits',
    badgeColor: 'amber' as const,
  },
]

const CREDENTIAL_CHIPS = [
  'Columbia CS',
  'ex-McKinsey',
  'AI Systems & Enablement at Google*',
  '300+ Trained at Boulder Startup Week',
  'Women Who Code Speaker',
]

export default function HomePage() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFESSIONAL_SERVICE_LD).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-16">
        {/* Split Visual Hero */}
        <section
          data-testid="hero-section"
          className="pt-2 pb-10 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-online" />
              <span className="font-mono text-xs font-medium text-muted">
                Sophia Stein · Boulder, CO
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-fg leading-[1.12]">
              Hook up AI workflows, build your brand, and{' '}
              <span className="text-accent">own your stack.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              Practical AI systems, live workshops, and strategic advisory for business owners,
              leadership teams, and builders who want measurable ROI instead of hype.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href="/masterclass">
                Join the Free 60-Min Masterclass
              </Button>
              <Button variant="outline" size="lg" href="/work-with-me">
                Workshops & Paid Consults
              </Button>
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex flex-wrap gap-2">
                {CREDENTIAL_CHIPS.map(chip => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted">
                *Writing, speaking, and advising here in a personal capacity; views my own.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroBlueprintSwitcher />
          </div>
        </section>

        {/* 3-Card Bento: Where to Start */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Where to Start
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-1">
                Three Ways to Put AI to Work This Month
              </h2>
            </div>
            <Link
              href="/starter-kit"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Start with the free 20-minute Brand & Workflow Kit →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PATH_CARDS.map(card => (
              <Card key={card.title} interactive className="p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted">{card.eyebrow}</span>
                    <Badge variant="status" color={card.badgeColor}>
                      {card.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-fg">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{card.body}</p>
                </div>
                <div className="pt-5 mt-5 border-t border-border">
                  <Link
                    href={card.href}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    {card.cta} →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Flagship Cohort Callout */}
        <section className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Flagship 8-Week Implementation Cohort
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-fg">
              The Agentic Business Accelerator
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Install 6 production AI systems across your brand, inbox, lead pipeline, and
              operations for a fraction of a $65,000/yr hire. Bring your Ops Lead or Executive
              Assistant to build right alongside you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="md" href="/accelerator">
              See Curriculum & Tuition
            </Button>
            <Button variant="outline" size="md" href="/masterclass">
              Watch Free Masterclass First
            </Button>
          </div>
        </section>

        {/* Latest Playbooks & Articles */}
        {recentPosts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  Playbooks & Field Notes
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-1">
                  Latest Guides on Workflows, Strategy & Private AI
                </h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-accent hover:underline shrink-0">
                Browse all playbooks →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentPosts.map(post => {
                const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-xl border border-border bg-surface p-5 flex flex-col justify-between hover:border-accent hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-xs text-muted font-mono">
                        <time dateTime={post.publishedDate}>{date}</time>
                        {'readingMinutes' in post && post.readingMinutes ? (
                          <span>{String(post.readingMinutes)} min read</span>
                        ) : null}
                      </div>
                      <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                    <span className="mt-4 pt-3 border-t border-border text-xs font-semibold text-accent">
                      Read playbook →
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Native Substack + Starter Kit Banner */}
        <NewsletterSignup source="homepage" />
      </div>
    </>
  )
}

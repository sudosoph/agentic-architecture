import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { HeroBlueprintSwitcher } from '@/components/site/hero-blueprint'
import { ProductiveFrictionDemo } from '@/components/site/productive-friction-demo'
import { BespokeStackSelector } from '@/components/site/bespoke-stack-selector'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
}

const ENTITY_PROFILES = [
  SITE_CONFIG.substackUrl,
  SITE_CONFIG.linkedinUrl,
  SITE_CONFIG.xUrl,
  SITE_CONFIG.githubUrl,
  SITE_CONFIG.cal.hub,
]

const HOME_ENTITY_GRAPH_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.siteUrl}/#website`,
      url: `${SITE_CONFIG.siteUrl}/`,
      name: SITE_CONFIG.siteName,
      alternateName: ['agenticarchitect.ai', 'Agentic Architecture', SITE_CONFIG.legalName],
      description: SITE_CONFIG.tagline,
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_CONFIG.siteUrl}/#organization`,
      name: SITE_CONFIG.siteName,
      legalName: SITE_CONFIG.legalName,
      description: SITE_CONFIG.tagline,
      url: SITE_CONFIG.siteUrl,
      logo: `${SITE_CONFIG.siteUrl}/icon.svg`,
      image: `${SITE_CONFIG.siteUrl}/opengraph-image`,
      founder: { '@id': `${SITE_CONFIG.siteUrl}/#person` },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Boulder',
        addressRegion: 'CO',
        addressCountry: 'US',
      },
      priceRange: '$$$',
      serviceType: [
        'AI Automation Courses for Non-Technical Business Owners',
        'Custom Business Workflow Automation Sprints',
        'Fractional Chief AI Officer & Fractional AI CTO',
        'Corporate AI Enablement Workshops',
      ],
      sameAs: ENTITY_PROFILES,
    },
    {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.siteUrl}/#person`,
      name: SITE_CONFIG.authorName,
      jobTitle: 'Agentic Architect, AI Systems Educator & Advisor',
      url: `${SITE_CONFIG.siteUrl}/about`,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Columbia University',
      },
      worksFor: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
      sameAs: ENTITY_PROFILES,
    },
  ],
}

const PATH_CARDS = [
  {
    eyebrow: '1. 4-Curriculum AI Architecture Academy',
    title: 'Models, Productive Friction, APIs & Rigs',
    body: 'Four structured curricula spanning 2026 model routing and interview-first Skills ($297), department build-vs-buy ($397), bespoke API harnesses ($497), and private open-weight rigs ($497).',
    cta: 'Explore All 4 Curricula & Free Modules',
    href: '/courses',
    badge: '4 Unlocked Lessons + From $297',
    badgeColor: 'green' as const,
  },
  {
    eyebrow: '2. Forward Deployed Build-For-You',
    title: 'Bespoke AI Harnesses & System Integration',
    body: 'Skip bloated SaaS wrappers and slide-only agencies. Embed Forward Deployed AI engineering to connect best-of-breed APIs, multi-model routers, and codified department skills inside your stack.',
    cta: 'Scope a Bespoke Build or Sprint',
    href: '/work-with-me',
    badge: 'Pilot Sprints & Multi-Month Builds',
    badgeColor: 'amber' as const,
  },
  {
    eyebrow: '3. Corporate Training, Keynotes & Fractional',
    title: 'Fractional CAIO / AI CTO & Department Labs',
    body: 'Executive AI governance, 2-week architecture diagnostics, conference keynotes, and hands-on Marketing, Finance, Legal, and Ops labs led by Columbia CS + ex-McKinsey leadership.',
    cta: 'Explore Fractional & Corporate Labs',
    href: '/fractional-ai-cto',
    badge: 'Columbia CS · Ex-McKinsey',
    badgeColor: 'blue' as const,
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
  const buyerSlugs = new Set([
    'productive-friction-interview-ai',
    'vertical-ai-vs-bespoke-api-harnesses',
    'forward-deployed-ai-engineering',
    'ai-back-office',
    'hire-ai-agency-vs-in-house',
    'loop-engineering',
  ])
  const buyerFeatured = allPosts.filter(p => buyerSlugs.has(p.slug)).slice(0, 6)
  const recentPosts = buyerFeatured.length >= 6 ? buyerFeatured : allPosts.slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HOME_ENTITY_GRAPH_LD).replace(/</g, '\\u003c'),
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
                Agentic Architect · Sophia Stein · Boulder, CO
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-fg leading-[1.12]">
              Automate the bottleneck, keep the growth, and{' '}
              <span className="text-accent">own your stack.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              Move past ad-hoc prompting and overpriced SaaS wrappers. Master our 4-curriculum AI
              Architecture Academy (from non-coder Productive-Friction Skills to bespoke API
              harnesses and private open-weight rigs), commission a Forward Deployed build, or
              engage Sophia for Fractional CAIO / AI CTO leadership and corporate training.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href="/courses">
                Explore the 4-Curriculum Academy
              </Button>
              <Button variant="outline" size="lg" href="/work-with-me">
                Forward Deployed Builds &amp; Advisory
              </Button>
            </div>

            <div className="pt-1">
              <Link
                href="/what-is-an-agentic-architect"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
              >
                New here? Read What Is an Agentic Architect (2026 Role &amp; 4-Layer Business Stack) →
              </Link>
            </div>

            <div className="pt-1 space-y-2">
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

        {/* 3-Card Bento: Audience Separation */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Separated By Audience
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-1">
                Courses &amp; Sprints for Business Owners · Fractional Leadership for Organizations
              </h2>
            </div>
            <Link
              href="/starter-kit"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Run the free 20/80 Bottleneck Readiness Calculator →
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

        {/* Live Methodological Proof: Productive Friction + Bespoke Stack Selector */}
        <section className="space-y-8">
          <ProductiveFrictionDemo />
          <BespokeStackSelector />
        </section>

        {/* Executive & Enterprise Fractional Callout */}
        <section className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              For $3M to $50M+ Companies, Healthcare Groups &amp; Tech Teams
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-fg">
              Need a Fractional Chief AI Officer, Fractional AI CTO, or Corporate Workshop?
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Skip the $300K+ executive search and slide-only consultants. Get Columbia CS
              architecture oversight and ex-McKinsey ($70M SaaS OpEx + 250+ clinical leaders)
              rollout leadership 2 to 4 days a month, starting with a 2-week diagnostic or team lab.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="md" href="/fractional-ai-cto">
              Fractional CAIO &amp; AI CTO
            </Button>
            <Button variant="outline" size="md" href="/research">
              Research, Book &amp; Syllabi
            </Button>
          </div>
        </section>

        {/* Buyer-First Playbooks & Guides */}
        {recentPosts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  Founder, Executive &amp; Systems Playbooks
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-1">
                  Start With Our Most-Read Automation &amp; Buyer Playbooks
                </h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-accent hover:underline shrink-0">
                Browse all {allPosts.length} playbooks →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentPosts.map(post => {
                const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC',
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

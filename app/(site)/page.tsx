import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { HeroBlueprintSwitcher } from '@/components/site/hero-blueprint'
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
        'AI Implementation Program for Founders',
        'AI Chief of Staff & Org Chart Architecture',
        'Corporate AI Enablement Workshops',
        'Executive AI Cost & Workflow Audits',
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
    eyebrow: '1. For Founders & Business Owners',
    title: 'AI Org Chart Masterclass & Accelerator',
    body: 'See which roles belong to humans vs. AI back-end workflows in the free 60-minute live Masterclass, then install all 6 business systems over 8 weeks.',
    cta: 'Save Free Masterclass Seat',
    href: '/masterclass',
    badge: 'Free Live Class -> Cohort',
    badgeColor: 'green' as const,
  },
  {
    eyebrow: '2. For COOs, L&D & Leadership Teams',
    title: 'Corporate Workshops & VIP Audits',
    body: 'Book a $1,500 90-minute Workflow & Cost Audit (100% creditable) or bring Sophia in for a $7,500 to $15,000 hands-on team enablement lab.',
    cta: 'View Audits & Team Labs',
    href: '/work-with-me',
    badge: '300+ Leaders Trained',
    badgeColor: 'amber' as const,
  },
  {
    eyebrow: '3. Technical Credibility & Private AI',
    title: 'The Sovereign Stack Book & Sizer',
    body: 'Unlike hype coaches, we test the actual plumbing: read our 18-chapter field guide on model cost routing, data privacy, and private hardware.',
    cta: 'Explore Book & Sizer',
    href: '/sovereign-stack',
    badge: 'Free 18-Ch. Book',
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
    'ai-org-chart-for-small-business-founders',
    'how-to-build-an-ai-chief-of-staff-2026',
    'ai-implementation-program-vs-agency-vs-diy-guide',
    'easy-ai-brand-and-workflow-setup',
    'google-latest-models-vs-deepseek-4-1-business-guide',
    'personal-agents-tab-instinct-openinstinct-review',
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
              Build your AI org chart, automate busywork, and{' '}
              <span className="text-accent">own your stack.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              Humans on the front end, verified AI workflows on the back end. Agentic Architect
              helps founders, leadership teams, and operators install an AI Chief of Staff and 6
              core business systems before adding another $65,000 hire.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href="/masterclass">
                Join the Free 60-Min AI Org Chart Masterclass
              </Button>
              <Button variant="outline" size="lg" href="/work-with-me">
                VIP Audits &amp; Team Workshops
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

        {/* 3-Card Bento: Where to Start */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Choose Your Path
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-1">
                From Free Live Masterclass to Full Team Implementation
              </h2>
            </div>
            <Link
              href="/starter-kit"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Grab the free 20-minute Brand Brain (voice.md) Kit →
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

        {/* Flagship Callan-Style Cohort Callout */}
        <section className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              8-Week Done-With-You Implementation Program
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-fg">
              The Agentic Business Accelerator ($5,997 Founding · $8,997 Standard)
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Do not wait six months trying to stitch random prompts together solo. Work live with
              Sophia (and bring your Ops Lead or EA for +$1,500) to wire your AI Brand Brain, AI
              Chief of Staff, pre-call dossiers, inbox triage, and SOP workflows in 8 weeks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="md" href="/accelerator">
              See All 6 Installed Systems
            </Button>
            <Button variant="outline" size="md" href="/masterclass">
              Attend Free Masterclass First
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
                  Start With Our Most-Read AI Org Chart &amp; Buyer Guides
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, type BlogTrack } from '@/lib/mdx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
}

const ENTITY_PROFILES = [SITE_CONFIG.substackUrl, SITE_CONFIG.linkedinUrl]

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
      serviceType: [
        'AI Systems Architecture & Executive Advisory',
        'Hands-On AI Workflow Courses & Skool Lab',
        'Fractional Chief AI Officer & Fractional AI CTO',
        'Corporate AI Workshops & University Teaching',
      ],
      sameAs: ENTITY_PROFILES,
    },
    {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.siteUrl}/#person`,
      name: SITE_CONFIG.authorName,
      jobTitle: 'AI Systems Architect, Educator & Advisor',
      url: `${SITE_CONFIG.siteUrl}/about`,
      worksFor: { '@id': `${SITE_CONFIG.siteUrl}/#organization` },
      sameAs: ENTITY_PROFILES,
    },
  ],
}

const TRACK_LABELS: Record<BlogTrack, string> = {
  'small-business': 'Strategy & Operations',
  'models-rigs': 'Models & Infrastructure',
  engineering: 'Systems Architecture',
}

const PRACTICE_PILLARS = [
  {
    index: '01',
    title: 'The Agentic Architect Lab',
    subtitle: 'Courses & Skool Community',
    body: 'Practical, screen-share tracks for operators, founders, and builders: Claude Superuser & Cowork OS, replacing bloated AI subscription stacks with open-weight routing, and becoming an AI Architect.',
    href: '/courses',
    cta: 'Explore the Lab & free lessons',
  },
  {
    index: '02',
    title: 'Speaking & University Teaching',
    subtitle: 'Keynotes, Executive Labs & Syllabi',
    body: 'Conference keynotes, leadership offsites, functional team workshops, and applied university curricula designed to move organizations from scattered chat usage to governed workflows.',
    href: '/teaching',
    cta: 'View keynotes & syllabi',
  },
  {
    index: '03',
    title: 'Bespoke Systems & Advisory',
    subtitle: 'Architecture Sprints & Fractional CAIO / CTO',
    body: 'Embedded systems engineering and executive AI oversight: connecting scoped tools, multi-model routing, evaluation gates, and private compute inside infrastructure your team owns.',
    href: '/work-with-me',
    cta: 'Inquire about advisory',
  },
]

export default function HomePage() {
  const allPosts = getAllPosts()
  const heroIndexPosts = allPosts.slice(0, 4)
  const archivePosts = allPosts.slice(4, 10)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HOME_ENTITY_GRAPH_LD).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-20">
        {/* Asymmetric Editorial Monograph Hero */}
        <section
          data-testid="hero-section"
          className="pt-2 pb-14 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          <div className="lg:col-span-7 space-y-6 reveal-up">
            <p className="text-xs font-medium text-muted">
              {SITE_CONFIG.siteName} · By {SITE_CONFIG.authorName} · {SITE_CONFIG.location}
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-[-0.02em] text-fg leading-[1.08]">
              What new AI makes possible, what it changes for business, and how to build with it.
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              Most coverage of AI splits into breathless hype or dense infrastructure minutiae. I
              write executive architecture essays here, publish weekly field notes on Substack, and
              teach hands-on workflow systems inside the Agentic Architect Lab.
            </p>

            <div className="space-y-2.5">
              <NewsletterSignup
                source="homepage-hero"
                variant="inline"
                placeholder="Enter your email for weekly field notes..."
                buttonLabel="Subscribe"
              />
              <p className="text-xs text-muted">
                Free weekly dispatch via Substack, including the 5-day applied architecture primer.{' '}
                <Link
                  href="/what-is-an-agentic-architect"
                  className="text-fg underline underline-offset-3 decoration-border hover:decoration-fg"
                >
                  New here? Read the 4-layer reference guide.
                </Link>
              </p>
            </div>
          </div>

          {/* Right-hand Dated Essay Index */}
          <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-8 space-y-4 reveal-up reveal-delay-1">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xs font-semibold text-fg">Recent Writing</h2>
              <Link href="/blog?track=all" className="text-xs text-muted hover:text-fg">
                Full archive ({allPosts.length})
              </Link>
            </div>

            <div className="divide-y divide-border border-t border-b border-border">
              {heroIndexPosts.map(post => {
                const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC',
                })
                const track = post.track ?? 'small-business'
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="editorial-row block py-3.5 group"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted tabular-nums mb-1">
                      <time dateTime={post.publishedDate}>{date}</time>
                      <span>·</span>
                      <span>{TRACK_LABELS[track]}</span>
                    </div>
                    <h3 className="text-sm font-medium text-fg group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Cornerstone Architecture Schematic */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center reveal-up reveal-delay-2">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-medium text-muted">Cornerstone Framework</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-fg leading-[1.14]">
              Why folder context, scoped tools, and human sign-off beat chat tabs.
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Organizations rarely stall on model intelligence. They stall because every teammate
              re-explains business rules in isolated chat windows, or because an outsourced agency
              wired brittle automations nobody in-house can inspect. Durable agentic systems separate
              four clean layers that your team controls end to end.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="primary" size="md" href="/what-is-an-agentic-architect">
                Read the 4-Layer Reference Guide
              </Button>
              <Button variant="outline" size="md" href="/starter-kit">
                Score a Workflow (20/80 Kit)
              </Button>
            </div>
          </div>

          <figure className="lg:col-span-6 editorial-figure m-0">
            <svg
              viewBox="0 0 520 264"
              role="img"
              aria-label="Four-layer agentic architecture diagram from portable context to human sign-off"
            >
              <rect x="16" y="14" width="488" height="46" rx="6" fill="#FAF8F5" stroke="#DFDCD3" />
              <text x="32" y="34" fill="#181920" fontSize="12" fontWeight="600">
                Layer 01 · Portable Operating Context
              </text>
              <text x="32" y="50" fill="#636674" fontSize="11">
                Versioned SOP folders, qualification rules, and concrete examples
              </text>

              <line x1="260" y1="60" x2="260" y2="76" stroke="#181920" strokeWidth="1.4" />

              <rect x="16" y="76" width="488" height="46" rx="6" fill="#FFFFFF" stroke="#181920" />
              <text x="32" y="96" fill="#181920" fontSize="12" fontWeight="600">
                Layer 02 · Scoped MCP Tools &amp; Tiered Model Routing
              </text>
              <text x="32" y="112" fill="#636674" fontSize="11">
                80% fast workhorse routing, 20% deep reasoning, least-privilege scopes
              </text>

              <line x1="260" y1="122" x2="260" y2="138" stroke="#181920" strokeWidth="1.4" />

              <rect x="16" y="138" width="488" height="46" rx="6" fill="#FAF8F5" stroke="#DFDCD3" />
              <text x="32" y="158" fill="#181920" fontSize="12" fontWeight="600">
                Layer 03 · Deterministic Verification &amp; Cost Ceilings
              </text>
              <text x="32" y="174" fill="#636674" fontSize="11">
                Schema checks, 25-case regression suites, and hard per-run budget caps
              </text>

              <line x1="260" y1="184" x2="260" y2="200" stroke="#181920" strokeWidth="1.4" />

              <rect x="16" y="200" width="488" height="46" rx="6" fill="#FAF8F5" stroke="#DFDCD3" />
              <text x="32" y="220" fill="#181920" fontSize="12" fontWeight="600">
                Layer 04 · Staged Drafts &amp; Human Sign-Off
              </text>
              <text x="32" y="236" fill="#636674" fontSize="11">
                Draft-first external actions, audit logs, and private compute boundaries
              </text>
            </svg>
            <figcaption>
              Figure 1 · The vendor-neutral 4-layer architecture across lean operator stacks and
              regulated enterprise deployments.
            </figcaption>
          </figure>
        </section>

        {/* Three Practice Surfaces */}
        <section className="space-y-6 pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-muted">Courses, Teaching &amp; Advisory</p>
              <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
                Three ways to learn or build together
              </h2>
            </div>
            <Link href="/about" className="text-xs font-medium text-muted hover:text-fg">
              Read how the three surfaces fit together
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRACTICE_PILLARS.map(pillar => (
              <Card key={pillar.index} interactive className="p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted tabular-nums">
                    <span>{pillar.index}</span>
                    <span>{pillar.subtitle}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-fg leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{pillar.body}</p>
                </div>
                <div className="pt-5 mt-5 border-t border-border">
                  <Link
                    href={pillar.href}
                    className="text-sm font-medium text-fg hover:text-accent transition-colors"
                  >
                    {pillar.cta}
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Selected Essays Grid */}
        {archivePosts.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-border">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-muted">Selected Essays &amp; Benchmarks</p>
                <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
                  Field notes on workflows, models, and unit economics
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-medium text-muted hover:text-fg shrink-0"
              >
                View all writing
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {archivePosts.map(post => {
                const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC',
                })
                const track = post.track ?? 'small-business'
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                    <Card
                      interactive
                      className="p-6 h-full flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2 text-xs text-muted tabular-nums">
                          <span>{TRACK_LABELS[track]}</span>
                          <span>
                            <time dateTime={post.publishedDate}>{date}</time> ·{' '}
                            {post.readingMinutes ?? 6} min read
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-normal text-fg group-hover:text-accent transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-fg group-hover:text-accent transition-colors pt-3 border-t border-border">
                        Read essay
                      </span>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <NewsletterSignup source="homepage" />
      </div>
    </>
  )
}

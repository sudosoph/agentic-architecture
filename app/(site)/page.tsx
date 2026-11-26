import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { HomeWritingExplorer } from '@/components/site/home-writing-explorer'
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

const HERO_SURFACES = [
  {
    index: '01',
    meta: 'Writing & Monograph',
    title: 'Essays, Benchmarks & Sovereign Stack',
    body: 'Architecture essays across Strategy & Operations, Models & Infrastructure, and Systems Architecture.',
    href: '/blog',
  },
  {
    index: '02',
    meta: 'Courses & Skool Community',
    title: 'The Agentic Architect Lab',
    body: 'Hands-on tracks: Claude Superuser & Cowork OS, replacing bloated AI subscription stacks, and becoming an AI Architect.',
    href: '/courses',
  },
  {
    index: '03',
    meta: 'Advisory & Workshops',
    title: 'Bespoke Systems & Teaching',
    body: 'Architecture sprints, Fractional CAIO / AI CTO oversight, executive workshops, and applied university syllabi.',
    href: '/work-with-me',
  },
]

export default function HomePage() {
  const allPosts = getAllPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HOME_ENTITY_GRAPH_LD).replace(/</g, '\\u003c'),
        }}
      />

      {/* Edge-to-edge Swiss Studio Structural Grid inside the framed sheet */}
      <div className="-mx-6 sm:-mx-8 -mt-9 sm:-mt-11 -mb-14 sm:-mb-16 divide-y divide-border">
        {/* 01. Asymmetric 12-Column Swiss Studio Blueprint Hero */}
        <section
          data-testid="hero-section"
          className="grid grid-cols-1 lg:grid-cols-12 bg-surface"
        >
          <div className="lg:col-span-8 p-6 sm:p-10 lg:p-12 lg:border-r border-border flex flex-col justify-between gap-6 reveal-up">
            <div className="space-y-5">
              <p className="font-mono text-xs text-muted">
                {SITE_CONFIG.siteName} · {SITE_CONFIG.authorName} · {SITE_CONFIG.location}
              </p>

              <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.032em] text-fg leading-[1.06]">
                What new AI makes possible, what it changes for business, and how to build with it.
              </h1>

              <p className="text-base sm:text-[17px] text-muted leading-relaxed max-w-xl">
                Most coverage of AI splits into breathless hype or dense infrastructure minutiae. I
                write executive architecture essays here, publish weekly field notes on Substack, and
                teach hands-on workflow systems inside the Agentic Architect Lab.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <NewsletterSignup
                source="homepage-hero"
                variant="inline"
                buttonVariant="accent"
                placeholder="Enter your email for weekly field notes..."
                buttonLabel="Subscribe"
              />
              <p className="text-xs text-muted">
                Free weekly dispatch via Substack, including the 5-day applied architecture primer.{' '}
                <Link
                  href="/what-is-an-agentic-architect"
                  className="text-fg font-medium underline underline-offset-3 decoration-border hover:decoration-fg"
                >
                  Read the 4-layer reference guide
                </Link>
              </p>
            </div>
          </div>

          {/* Right-hand 3-Surface Architectural Stack */}
          <div className="lg:col-span-4 divide-y divide-border border-t lg:border-t-0 border-border flex flex-col justify-between bg-surface reveal-up reveal-delay-1">
            {HERO_SURFACES.map(surface => (
              <Link
                key={surface.index}
                href={surface.href}
                className="swiss-cell p-6 sm:px-7 sm:py-6 flex-1 flex flex-col justify-between gap-2 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[11px] text-muted tabular-nums">
                    <span className="text-accent font-medium">{surface.index}</span>
                    <span>{surface.meta}</span>
                  </div>
                  <h2 className="font-display text-base sm:text-[17px] font-semibold tracking-[-0.02em] text-fg group-hover:text-accent transition-colors leading-snug">
                    {surface.title}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-muted leading-relaxed">
                    {surface.body}
                  </p>
                </div>
                <span className="text-xs font-medium text-fg group-hover:text-accent transition-colors pt-1">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 02. Interactive Blog Categories, Topic Clusters, Featured Grid & Tabular Index */}
        <HomeWritingExplorer posts={allPosts} />

        {/* 03. Cornerstone 4-Layer Architecture Split Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 bg-surface">
          <div className="lg:col-span-6 p-6 sm:p-10 lg:border-r border-border flex flex-col justify-center space-y-4">
            <p className="font-mono text-xs font-medium text-accent">
              Cornerstone Reference Architecture
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.028em] text-fg leading-[1.14]">
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
                Read the 4-Layer Guide
              </Button>
              <Button variant="outline" size="md" href="/starter-kit">
                Score a Workflow (20/80 Kit)
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-10 bg-bg/65 border-t lg:border-t-0 border-border flex flex-col justify-center">
            <figure className="m-0 bg-surface border border-border rounded-md p-4 sm:p-5">
              <svg
                viewBox="0 0 520 264"
                role="img"
                aria-label="Four-layer agentic architecture diagram from portable context to human sign-off"
              >
                <rect x="16" y="14" width="488" height="46" rx="5" fill="#F7F8FA" stroke="#DCE0E6" />
                <text x="32" y="34" fill="#15181E" fontSize="12" fontWeight="600">
                  Layer 01 · Portable Operating Context
                </text>
                <text x="32" y="50" fill="#5D6472" fontSize="11">
                  Versioned SOP folders, qualification rules, and concrete examples
                </text>

                <line x1="260" y1="60" x2="260" y2="76" stroke="#15181E" strokeWidth="1.4" />

                <rect
                  x="16"
                  y="76"
                  width="488"
                  height="46"
                  rx="5"
                  fill="#FFFFFF"
                  stroke="#106952"
                  strokeWidth="1.5"
                />
                <text x="32" y="96" fill="#106952" fontSize="12" fontWeight="600">
                  Layer 02 · Scoped MCP Tools &amp; Tiered Model Routing
                </text>
                <text x="32" y="112" fill="#5D6472" fontSize="11">
                  80% fast workhorse routing, 20% deep reasoning, least-privilege scopes
                </text>

                <line x1="260" y1="122" x2="260" y2="138" stroke="#15181E" strokeWidth="1.4" />

                <rect x="16" y="138" width="488" height="46" rx="5" fill="#F7F8FA" stroke="#DCE0E6" />
                <text x="32" y="158" fill="#15181E" fontSize="12" fontWeight="600">
                  Layer 03 · Deterministic Verification &amp; Cost Ceilings
                </text>
                <text x="32" y="174" fill="#5D6472" fontSize="11">
                  Schema checks, 25-case regression suites, and hard per-run budget caps
                </text>

                <line x1="260" y1="184" x2="260" y2="200" stroke="#15181E" strokeWidth="1.4" />

                <rect x="16" y="200" width="488" height="46" rx="5" fill="#F7F8FA" stroke="#DCE0E6" />
                <text x="32" y="220" fill="#15181E" fontSize="12" fontWeight="600">
                  Layer 04 · Staged Drafts &amp; Human Sign-Off
                </text>
                <text x="32" y="236" fill="#5D6472" fontSize="11">
                  Draft-first external actions, audit logs, and private compute boundaries
                </text>
              </svg>
              <figcaption className="mt-3 pt-2.5 border-t border-border text-xs text-muted leading-relaxed">
                Figure 1 · Vendor-neutral 4-layer architecture across lean operator stacks and
                regulated enterprise deployments.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 04. Swiss Studio Dispatch Footer Band */}
        <div className="p-6 sm:p-10 bg-surface">
          <NewsletterSignup source="homepage" buttonVariant="accent" />
        </div>
      </div>
    </>
  )
}

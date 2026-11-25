import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

const PROFESSIONAL_SERVICE_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Agentic Architecture',
  description: 'Local-first LLM infrastructure, agentic systems, and open-source tools for lean teams.',
  url: 'https://agenticarchitect.ai',
  founder: {
    '@type': 'Person',
    name: 'Sophia Stein',
    jobTitle: 'AI Architect',
    url: 'https://agenticarchitect.ai/about',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Boulder',
    addressRegion: 'CO',
    addressCountry: 'US',
  },
  priceRange: '$$',
  serviceType: 'AI Architecture',
}

// Three evergreen posts that establish the thesis. New visitors land here first.
const FEATURED_SLUGS = [
  '96gb-ram-thesis',
  'the-40k-token-wall',
  'local-vs-cloud-inference',
]

export default function HomePage() {
  const allPosts = getAllPosts()
  const featured = FEATURED_SLUGS.map(slug => allPosts.find(p => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => p !== undefined,
  )
  const posts = allPosts.slice(0, 5)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFESSIONAL_SERVICE_LD).replace(/</g, '\\u003c'),
        }}
      />
      <div className="space-y-12">
        {/* Hero */}
        <section className="pt-8 pb-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-online animate-pulse" />
            <p className="font-mono text-xs text-muted tracking-widest uppercase">
              Sophia Stein · Boulder, CO · online
            </p>
          </div>
          <h1 className="font-mono text-3xl md:text-4xl text-fg leading-tight mb-4">
            AI Architect.
            <br />
            <span className="text-accent">Local-first by design.</span>
          </h1>
          <p className="text-muted text-sm leading-relaxed max-w-xl mb-6">
            I design and ship agentic systems that run on hardware you own. Local
            inference, smaller models, deliberate architecture. The benchmark
            below is real.
          </p>

          {/* Benchmark callout */}
          <div className="inline-flex items-center gap-3 border border-border bg-surface px-4 py-2">
            <span className="font-mono text-bench text-lg font-bold">28.4 t/s</span>
            <span className="font-mono text-muted text-xs">
              GLM-4 9B Q8_0 · ROCm 7.3 · 90GB GART · AMD Strix Point
            </span>
          </div>
        </section>

        {/* PRIMARY CTA: Newsletter signup */}
        <NewsletterSignup source="homepage" />

        {/* Secondary navigation links */}
        <section className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/blog" className="font-mono text-accent hover:underline">
            read the blog →
          </Link>
          <span className="font-mono text-muted">·</span>
          <Link href="/guides" className="font-mono text-accent hover:underline">
            beginner guides →
          </Link>
          <span className="font-mono text-muted">·</span>
          <Link href="/work-with-me" className="font-mono text-accent hover:underline">
            work with me →
          </Link>
        </section>

        {/* Featured posts — 3 evergreen entry points for new readers */}
        {featured.length > 0 && (
          <section>
            <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
              Start here
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featured.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group border border-border bg-surface p-5 hover:border-accent transition-colors"
                >
                  <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{post.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* BSW talk callout · expires Thu May 7 */}
        <section className="border border-border bg-surface p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-bench uppercase tracking-widest mb-1">
                Speaking next · Boulder Startup Week 2026
              </p>
              <p className="font-mono text-sm text-fg">
                Architecting Agentic Workflows for the Lean 2026 Startup
              </p>
              <p className="font-mono text-xs text-muted mt-1">
                Thu May 7 · 11:00 AM · RegenHub
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/bsw"
                className="font-mono text-xs px-3 py-1.5 border border-border text-muted hover:text-accent hover:border-accent transition-colors"
              >
                materials
              </Link>
              <Link
                href="https://revelco.org/events/bsw-2026?session=5044310e-90eb-4942-babb-ae511817c0d4"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-3 py-1.5 border border-accent text-accent hover:bg-surface transition-colors"
              >
                rsvp ↗
              </Link>
            </div>
          </div>
        </section>

        {/* Flagship e-book pre-order callout */}
        <section className="border border-border bg-surface p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs text-bench uppercase tracking-widest mb-2">
                Pre-order · The Sovereign Stack
              </p>
              <p className="font-mono text-sm text-fg leading-relaxed mb-2">
                An interactive e-book on production agents on hardware you own — built to update for free as the local-AI stack changes.
              </p>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Hardware selection, ROCm + Metal setup, model picks across Qwen / Gemma / Kimi / DeepSeek with the benchmark numbers I actually ran, agent harness design with paste-able eval harnesses, n8n + MCP orchestration patterns from production. PDF + EPUB + browsable web version. ~220 pages, ships fall 2026. Pre-order locks in lifetime free updates.
              </p>
            </div>
            <Link
              href="/library#ebooks"
              className="font-mono text-xs px-4 py-2 border border-accent text-accent hover:bg-bg transition-colors shrink-0 self-start whitespace-nowrap"
            >
              see the table of contents →
            </Link>
          </div>
        </section>

        {/* What I do */}
        <section>
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
            What I do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                label: 'Architecture',
                body: 'Hands-on projects: agentic system design, local LLM infrastructure, cost teardowns. Corporate trainings + custom course creation for orgs.',
                href: '/work-with-me',
              },
              {
                label: 'OSS Tools',
                body: 'Open-source libraries for AMD APU configuration, ROCm tuning, local inference benchmarking, and the n8n templates that run my own business.',
                href: 'https://github.com/sudosoph',
              },
              {
                label: 'Field Notes',
                body: 'Benchmarks, deep dives, and what is actually working in 2026. Written from the projects, not the marketing decks.',
                href: '/blog',
              },
            ].map(({ label, body, href }) => (
              <Link
                key={label}
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block bg-bg p-6 group hover:bg-surface transition-colors"
              >
                <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors mb-2">
                  {label}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent posts */}
        {posts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
                Recent posts
              </h2>
              <Link href="/blog" className="font-mono text-xs text-accent hover:underline">
                all posts →
              </Link>
            </div>
            <div className="divide-y divide-border">
              {posts.map(post => {
                const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block group py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <time
                        dateTime={post.publishedDate}
                        className="font-mono text-xs text-muted shrink-0"
                      >
                        {date}
                      </time>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-2">{post.description}</p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 4).map(tag => (
                          <Badge key={tag} variant="tag">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

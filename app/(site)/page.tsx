import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const PROFESSIONAL_SERVICE_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Agentic Architecture',
  description: 'Local-first LLM infrastructure, agentic systems, and open-source tools for lean teams.',
  url: 'https://agenticarchitecture.ai',
  founder: {
    '@type': 'Person',
    name: 'Sophia Stein',
    jobTitle: 'AI Architect',
    url: 'https://agenticarchitecture.ai/about',
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

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFESSIONAL_SERVICE_LD).replace(/</g, '\\u003c'),
        }}
      />
      <div className="space-y-16">
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
            inference, smaller models, deliberate architecture. The benchmarks
            below are real.
          </p>

          {/* Benchmark callout */}
          <div className="inline-flex items-center gap-3 border border-border bg-surface px-4 py-2 mb-6">
            <span className="font-mono text-bench text-lg font-bold">28.4 t/s</span>
            <span className="font-mono text-muted text-xs">
              GLM-4 9B Q8_0 · ROCm 7.3 · 90GB GART · AMD Strix Point
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="md" href="/work-with-me">
              work with me ›
            </Button>
            <Button variant="outline" size="md" href="/blog">
              read the blog →
            </Button>
          </div>
        </section>

        {/* BSW talk callout */}
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

        {/* What I do */}
        <section>
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
            What I do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                label: 'Architecture',
                body: 'Hands-on engagements: agentic system design, local LLM infrastructure, cost teardowns. Corporate trainings + custom course creation for orgs.',
                href: '/work-with-me',
              },
              {
                label: 'OSS Tools',
                body: 'Open-source libraries for AMD APU configuration, ROCm tuning, local inference benchmarking, and the n8n templates that run my own business.',
                href: 'https://github.com/sudosoph',
              },
              {
                label: 'Field Notes',
                body: 'Benchmarks, deep dives, and what is actually working in 2026. Written from the engagements, not the marketing decks.',
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

        {/* Newsletter */}
        <section className="border border-border bg-surface p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-xl">
              <p className="font-mono text-xs text-bench uppercase tracking-widest mb-2">
                The Architect's Notebook
              </p>
              <p className="font-mono text-sm text-fg leading-relaxed mb-1">
                Weekly deep dive on agentic architecture for lean founders.
              </p>
              <p className="font-mono text-xs text-muted leading-relaxed">
                n8n templates · cost teardowns · what is actually working in 2026.{' '}
                <span className="text-accent">Free for Boulder Startup Week attendees.</span>
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              href="/contact?subject=Newsletter%20signup&message=Add%20me%20to%20The%20Architect%27s%20Notebook.%0A%0AHow%20I%20heard%20about%20it%3A%20"
            >
              subscribe ›
            </Button>
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
                    className="block group py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                        {post.title}
                      </span>
                      <time
                        dateTime={post.publishedDate}
                        className="font-mono text-xs text-muted shrink-0"
                      >
                        {date}
                      </time>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {post.tags.map(tag => (
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

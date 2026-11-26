import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Systems Research, Monograph & University Syllabi',
  description:
    'Published AI systems benchmarks, The Sovereign Stack 12-chapter monograph, university syllabi, open-source labs, and CTO technical advisory by Sophia Stein.',
  alternates: { canonical: '/research' },
}

const PILLARS = [
  {
    badge: '12 Chapters + Hardware Sizer',
    title: 'The Sovereign Stack (Monograph & Manuals)',
    body: 'Vendor-neutral engineering benchmarks across 512GB unified-memory nodes, three-tier open-weight routing, MCP security audits, and deterministic loop verifiers.',
    href: '/sovereign-stack',
    cta: 'Open Monograph & Sizer',
  },
  {
    badge: 'University Syllabi + Keynotes',
    title: 'University Teaching, Speaking & Open Labs',
    body: 'Applied graduate and undergraduate syllabi (Leeds School of Business & ATLAS Institute), Women Who Code talks, and our open-source 300+ attendee Boulder Startup Week lab.',
    href: '/teaching',
    cta: 'View Syllabi & Speaking',
  },
  {
    badge: 'Fractional Leadership & Architecture',
    title: 'Fractional Chief AI Officer & Fractional AI CTO',
    body: 'Part-time executive AI leadership, 2-week architecture diagnostics, evaluation harnesses, and technical due diligence for scaling organizations and engineering teams.',
    href: '/fractional-ai-cto',
    cta: 'Explore Fractional Roles',
  },
]

export default function ResearchPage() {
  const allPosts = getAllPosts()
  const technicalPosts = allPosts.filter(
    p => p.track === 'engineering' || p.track === 'models-rigs',
  )

  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <span>Systems Architecture · Hardware Physics · Academic Syllabi</span>
          <Link href="/blog" className="hover:text-fg underline underline-offset-3">
            Looking for Strategy &amp; Operations essays? Go here
          </Link>
        </div>
        <PageHeader
          title="Systems Research, Monograph & University Teaching"
          description="Our engineering benchmarks, open-source labs, and university course syllabi live together here so CTOs, builders, and academic committees can inspect the underlying architecture."
        />
      </div>

      {/* 3 Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PILLARS.map(item => (
          <Card key={item.title} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <Badge variant="tag">{item.badge}</Badge>
              <h2 className="font-serif text-xl font-normal text-fg leading-snug">{item.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{item.body}</p>
            </div>
            <div className="pt-3 border-t border-border">
              <Button variant="outline" size="sm" href={item.href}>
                {item.cta}
              </Button>
            </div>
          </Card>
        ))}
      </section>

      {/* Open-Source Workshop Strip */}
      <Card className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted">Open-Source Lab Curriculum</p>
          <h2 className="font-serif text-xl font-normal text-fg">
            Boulder Startup Week: 17-Step Autonomous Workflow Lab
          </h2>
          <p className="text-sm text-muted">
            Full lecture slides, reproducible setup scripts, and handouts taught live to 300+
            attendees.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="outline" size="sm" href="/bsw">
            Open BSW Lab Archive
          </Button>
          <Button variant="ghost" size="sm" href="/stack">
            Reference Stack &amp; Rigs
          </Button>
        </div>
      </Card>

      {/* Technical & Model Benchmark Archive */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-muted tabular-nums">
              Engineering &amp; Model Benchmarks ({technicalPosts.length} Notes)
            </p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
              Production architecture, hardware physics &amp; evaluation harnesses
            </h2>
          </div>
          <Link href="/sovereign-stack" className="text-xs font-medium text-muted hover:text-fg">
            Read in compiled monograph order
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {technicalPosts.map(post => {
            const date = new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC',
            })
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <Card
                  interactive
                  className="p-5 h-full flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs text-muted tabular-nums">
                      <span>
                        {post.track === 'models-rigs' ? 'Models & Hardware' : 'Systems Architecture'}
                      </span>
                      <span>
                        {date} · {post.readingMinutes ?? 6} min
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-normal text-fg group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-fg group-hover:text-accent">
                    Read note
                  </span>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Systems Research, Book & University Teaching',
  description:
    'Published AI systems benchmarks, The Sovereign Stack 18-chapter book, CU Boulder university syllabi, open-source labs, and CTO technical advisory by Sophia Stein.',
  alternates: { canonical: '/research' },
}

const PILLARS = [
  {
    badge: '18 Chapters + Hardware Sizer',
    badgeVariant: 'rig' as const,
    title: 'The Sovereign Stack (Book & Field Manuals)',
    body: 'Vendor-neutral engineering benchmarks across 512GB unified-memory nodes, three-tier open-weight routing, MCP security audits, and deterministic loop verifiers.',
    href: '/sovereign-stack',
    cta: 'Open 18-Chapter Book & Sizer →',
  },
  {
    badge: 'CU Boulder Syllabi + Keynotes',
    badgeVariant: 'online' as const,
    title: 'University Teaching, Speaking & Open Labs',
    body: 'Applied graduate and undergraduate syllabi (Leeds School of Business & ATLAS Institute), Women Who Code talks, and our open-source 300+ attendee Boulder Startup Week lab.',
    href: '/teaching',
    cta: 'View Syllabi & Speaking →',
  },
  {
    badge: 'Fractional Leadership & Architecture',
    badgeVariant: 'tag' as const,
    title: 'Fractional Chief AI Officer & Fractional AI CTO',
    body: 'Part-time executive AI leadership, 2-week architecture diagnostics, evaluation harnesses, and technical due diligence for mid-market companies, healthcare groups, and engineering teams.',
    href: '/fractional-ai-cto',
    cta: 'Explore Fractional AI Roles →',
  },
]

export default function ResearchPage() {
  const allPosts = getAllPosts()
  const technicalPosts = allPosts.filter(
    p => p.track === 'engineering' || p.track === 'models-rigs',
  )

  return (
    <div className="space-y-14">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="rig">Technical Credibility · Academic Syllabi · Systems Benchmarks</Badge>
          <Link href="/blog" className="font-mono text-xs text-accent hover:underline">
            Looking for non-technical Business Owner Playbooks? Go here →
          </Link>
        </div>
        <PageHeader
          meta="Columbia CS · Applied AI Engineering · 300+ Trained Live"
          title="Systems Research, Book & University Teaching"
          description="Our engineering benchmarks, open-source labs, and university course syllabi live here so business owners get clean executive playbooks on the front door while CTOs, engineers, and academic committees can inspect the underlying architecture."
        />
      </div>

      {/* 3 Academic & Engineering Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PILLARS.map(item => (
          <Card key={item.title} className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <Badge variant={item.badgeVariant}>{item.badge}</Badge>
              <h2 className="text-lg font-bold text-fg leading-snug">{item.title}</h2>
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
      <Card className="p-6 bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
            Open-Source Lab Curriculum
          </p>
          <h2 className="text-lg font-bold text-fg">
            Boulder Startup Week 2026: 17-Step Autonomous Workflow Lab
          </h2>
          <p className="text-sm text-muted">
            Full lecture slides, reproducible setup scripts, and handouts taught live to 300+
            attendees.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="outline" size="sm" href="/bsw">
            Open BSW Lab Archive →
          </Button>
          <Button variant="ghost" size="sm" href="/stack">
            Hardware &amp; Software Stack →
          </Button>
        </div>
      </Card>

      {/* Technical & Model Benchmark Archive */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Engineering &amp; Model Benchmarks ({technicalPosts.length} Papers &amp; Teardowns)
            </p>
            <h2 className="text-2xl font-bold text-fg mt-1">
              Production Architecture, Hardware Physics &amp; Evaluation Harnesses
            </h2>
          </div>
          <Link href="/sovereign-stack" className="text-xs font-semibold text-accent hover:underline">
            Read in compiled 18-chapter book order →
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
                <Card className="p-5 h-full flex flex-col justify-between space-y-3 hover:border-accent transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted">
                      <Badge variant={post.track === 'models-rigs' ? 'rig' : 'tag'}>
                        {post.track === 'models-rigs' ? 'Models & Hardware' : 'Systems Engineering'}
                      </Badge>
                      <span>
                        {post.readingMinutes ?? 5} min · {date}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-accent">Read technical note →</span>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <p className="text-xs text-muted border-t border-border pt-6">
        {SITE_CONFIG.personalCapacityNote}
      </p>
    </div>
  )
}

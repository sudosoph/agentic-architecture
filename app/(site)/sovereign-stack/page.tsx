import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OssHardwareSizer } from '@/components/site/oss-hardware-sizer'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'
import { SOVEREIGN_STACK_PARTS } from '@/scripts/compile-book-and-freebies.mjs'

const CANONICAL_URL = `${SITE_CONFIG.siteUrl}/sovereign-stack`

export const metadata: Metadata = {
  title: 'The Sovereign Stack · Hardware Physics, Model Routing & 12-Chapter Monograph',
  description:
    'Read all 12 live chapters of The Sovereign Stack free online, size 512GB M5 Ultra vs DGX Spark vs Ryzen AI Halo nodes, and download 3 Markdown field manuals.',
  alternates: {
    canonical: CANONICAL_URL,
  },
}

const FREEBIE_MANUALS = [
  {
    num: 'Manual 01',
    title: 'Cut Your AI & SaaS Bill by 84%',
    meta: 'Markdown Manual · Open-Source Stack + 3-Tier Model Routing',
    desc: 'Single-node Caddy + Cal.com + n8n + PostHog/Umami blueprint paired with three-tier model routing.',
    href: '/downloads/cut-your-ai-bill-84-percent-manual.md',
  },
  {
    num: 'Manual 02',
    title: '512GB & 128GB Hardware + Tailscale Cheatsheet',
    meta: 'Markdown Manual · M5 Ultra (1.2 TB/s) vs DGX Spark vs Ryzen Halo',
    desc: 'Vendor-neutral memory-bandwidth vs sparse-MoE sizing math and zero-port Tailscale Serve setup.',
    href: '/downloads/private-hardware-and-tailscale-rig-guide.md',
  },
  {
    num: 'Manual 03',
    title: 'Loop Verifiers, Credential Vaults & MCP Audit',
    meta: 'Markdown Manual · Git Worktrees, Circuit Breakers & Least Privilege',
    desc: 'Closed-loop verifier checklist, personal agent OAuth hygiene, and 6-layer evaluation harness.',
    href: '/downloads/trusted-mcp-and-eval-checklist.md',
  },
]

export default function SovereignStackPage() {
  const bookLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'The Sovereign Stack: Open-Weight Routing, Private Hardware Rigs, and AI Unit Economics',
    author: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.siteUrl}/#person`,
      name: SITE_CONFIG.authorName,
      url: `${SITE_CONFIG.siteUrl}/about`,
    },
    url: CANONICAL_URL,
    bookFormat: 'https://schema.org/EBook',
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.siteUrl}/#organization`,
      name: SITE_CONFIG.siteName,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-16">
        <PageHeader
          meta="Open Technical Monograph · 12 Live Chapters + 3 Field Manuals"
          title="The Sovereign Stack"
          description="A vendor-neutral field monograph on deterministic loop engineering, sizing 512GB M5 Ultra vs. 128GB DGX Spark vs. Ryzen AI Halo nodes over Tailscale, auditing MCP scopes, and cutting SaaS and API run-rates."
        />

        {/* Interactive OSS & Hardware Sizer */}
        <OssHardwareSizer />

        {/* 3 Unlocked Field Manuals */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-muted">Unlocked Field Manuals</p>
              <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
                Three copy-paste OSS &amp; hardware reference sheets
              </h2>
            </div>
            <Link href="/starter-kit" className="text-xs font-medium text-muted hover:text-fg">
              Need the non-technical 20/80 Task Readiness Kit instead?
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FREEBIE_MANUALS.map(m => (
              <Card key={m.href} className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted tabular-nums">{m.num}</span>
                  <h3 className="font-serif text-xl font-normal text-fg leading-snug">{m.title}</h3>
                  <p className="text-xs text-muted">{m.meta}</p>
                  <p className="text-sm text-muted leading-relaxed">{m.desc}</p>
                </div>
                <a
                  href={m.href}
                  download
                  className="inline-flex items-center text-xs font-medium text-fg hover:text-accent pt-3 border-t border-border"
                >
                  Download Markdown Manual
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Full 12-Chapter Table of Contents */}
        <section className="space-y-6">
          <div>
            <p className="text-xs font-medium text-muted">Read Free Online</p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
              Four-part, 12-chapter monograph map
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Every chapter below is published openly with reproducible tables, architecture
              diagrams, and failure postmortems.
            </p>
          </div>

          <div className="space-y-5">
            {SOVEREIGN_STACK_PARTS.map(part => (
              <Card key={part.part} className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-normal text-fg">{part.part}</h3>
                  <p className="text-sm text-muted mt-0.5">{part.summary}</p>
                </div>
                <ul className="divide-y divide-border border-t border-border">
                  {part.chapters.map(ch => (
                    <li key={ch.slug} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span className="font-mono text-xs text-muted tabular-nums shrink-0">
                          Ch. {String(ch.num).padStart(2, '0')}
                        </span>
                        <Link
                          href={`/blog/${ch.slug}`}
                          className="text-sm font-medium text-fg hover:text-accent truncate"
                        >
                          {ch.title}
                        </Link>
                      </div>
                      <Link
                        href={`/blog/${ch.slug}`}
                        className="text-xs font-medium text-muted hover:text-fg shrink-0"
                      >
                        Read
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Workshop & Advisory Bridge */}
        <section className="rounded-lg border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h2 className="font-serif text-2xl font-normal text-fg">
              Planning open-weight routing or private compute for your organization?
            </h2>
            <p className="text-sm text-muted">
              We run architecture diagnostics and hands-on engineering workshops covering tiered
              routing, MCP security boundaries, and sovereign compute.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="sm" href="/work-with-me">
              Work With Me
            </Button>
            <Button variant="outline" size="sm" href="/contact">
              Send Technical Inquiry
            </Button>
          </div>
        </section>

        <NewsletterSignup source="sovereign-stack-book" />
      </div>
    </>
  )
}

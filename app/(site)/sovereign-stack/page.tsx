import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { OssHardwareSizer } from '@/components/site/oss-hardware-sizer'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'
import { SOVEREIGN_STACK_PARTS } from '@/scripts/compile-book-and-freebies.mjs'

const CANONICAL_URL = `${SITE_CONFIG.siteUrl}/sovereign-stack`

export const metadata: Metadata = {
  title: 'The Sovereign Stack · 512GB Hardware Sizer, Loop Engineering & 18-Chapter Book',
  description:
    'Read all 18 live chapters of The Sovereign Stack free online, size 512GB M5 Ultra vs DGX Spark vs Ryzen AI Halo rigs or $9/mo Hetzner stacks, and download 3 field manuals.',
  alternates: {
    canonical: CANONICAL_URL,
  },
}

const FREEBIE_MANUALS = [
  {
    num: 'Manual 01',
    title: 'Cut Your AI & SaaS Bill by 84%',
    meta: 'Markdown Manual · $9 Hetzner VPS + Neon/DeepSeek/Qwen Routing',
    desc: 'Single-VPS Caddy + Listmonk + Cal.com + Umami + Uptime Kuma blueprint plus the November 2026 3-tier model cascade.',
    href: '/downloads/cut-your-ai-bill-84-percent-manual.md',
  },
  {
    num: 'Manual 02',
    title: '512GB & 128GB Hardware + Tailscale Cheatsheet',
    meta: 'Markdown Manual · M5 Ultra (1.2 TB/s) vs DGX Spark vs Ryzen Halo',
    desc: 'Vendor-neutral bandwidth vs sparse-MoE sizing math (MiniMax M3.1, Qwen 3.8-27B) and zero-port Tailscale Serve setup.',
    href: '/downloads/private-hardware-and-tailscale-rig-guide.md',
  },
  {
    num: 'Manual 03',
    title: 'Loop Verifiers, OpenInstinct Vaults & MCP Audit',
    meta: 'Markdown Manual · Git Worktrees, Circuit Breakers & Least Privilege',
    desc: 'Closed-loop verifier checklist, personal agent OAuth hygiene (OpenInstinct vs Instinct/Tab), and 6-layer eval harness.',
    href: '/downloads/trusted-mcp-and-eval-checklist.md',
  },
]

export default function SovereignStackPage() {
  const bookLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'The Sovereign Stack: OSS Workflows, Private Hardware Rigs, and AI Unit Economics',
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

      <div className="space-y-14">
        <div className="space-y-4">
          <Badge variant="rig">18 Chapters Live Online · Nov 2026 Hardware &amp; Loop Benchmarks</Badge>
          <PageHeader
            meta="Written in Public by Sophia Stein · Vendor-Neutral Physics & Unit Economics"
            title="The Sovereign Stack"
            description="An engineering and founder field guide to deterministic loop engineering, sizing 512GB M5 Ultra vs. 128GB DGX Spark vs. Ryzen AI Halo nodes over Tailscale, auditing personal agents, and cutting SaaS and API bills by up to 84%."
          />
        </div>

        {/* Interactive OSS & Hardware Sizer */}
        <OssHardwareSizer />

        {/* 3 Unlocked Technical Freebie Manuals */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Unlocked Technical Freebies
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-fg mt-1">
                3 Copy-Paste OSS &amp; Hardware Field Manuals
              </h2>
            </div>
            <Link href="/starter-kit" className="text-xs font-semibold text-accent hover:underline">
              Need the non-technical Brand Brain (voice.md) kit instead? →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FREEBIE_MANUALS.map(m => (
              <Card key={m.href} className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-semibold text-online">{m.num}</span>
                  <h3 className="text-base font-bold text-fg leading-snug">{m.title}</h3>
                  <p className="font-mono text-[11px] text-muted">{m.meta}</p>
                  <p className="text-sm text-muted leading-relaxed">{m.desc}</p>
                </div>
                <a
                  href={m.href}
                  download
                  className="inline-flex items-center text-xs font-semibold text-accent hover:underline pt-3 border-t border-border"
                >
                  Download Markdown Manual ↓
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Full 5-Part, 15-Chapter Live Table of Contents */}
        <section className="space-y-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Read Free in Your Browser
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg mt-1">
              Live 5-Part, 18-Chapter Manuscript Map
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Every chapter below is already live as a standalone deep dive with real configs,
              tables, and failure postmortems. Subscribe free below to get compiled EPUB/PDF releases
              as new benchmarks land.
            </p>
          </div>

          <div className="space-y-5">
            {SOVEREIGN_STACK_PARTS.map(part => (
              <Card key={part.part} className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-fg">{part.part}</h3>
                  <p className="text-sm text-muted mt-0.5">{part.summary}</p>
                </div>
                <ul className="divide-y divide-border border-t border-border">
                  {part.chapters.map(ch => (
                    <li key={ch.slug} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span className="font-mono text-xs font-semibold text-accent shrink-0">
                          Ch. {String(ch.num).padStart(2, '0')}
                        </span>
                        <Link
                          href={`/blog/${ch.slug}`}
                          className="text-sm font-medium text-fg hover:text-accent hover:underline truncate"
                        >
                          {ch.title}
                        </Link>
                      </div>
                      <Link
                        href={`/blog/${ch.slug}`}
                        className="font-mono text-xs text-accent shrink-0 hover:underline"
                      >
                        Read →
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Team / Event Bulk Edition Strip */}
        <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h2 className="text-xl font-bold text-fg">
              Want a Custom Sovereign Stack Workshop or Bulk Team Copies?
            </h2>
            <p className="text-sm text-muted">
              I run hands-on architecture intensives for engineering orgs, startups, and leadership
              teams adopting open-weight routing, MCP security guardrails, and private AI compute.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="sm" href="/work-with-me">
              Audits &amp; Team Workshops
            </Button>
            <Button
              variant="outline"
              size="sm"
              href="/contact?subject=Sovereign%20Stack%20Team%20Edition"
            >
              Request Team Edition
            </Button>
          </div>
        </section>

        <NewsletterSignup source="sovereign-stack-book" />
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Sponsor',
  description:
    'Sponsor a post on Agentic Architecture. Single sponsor per post, full editorial firewall, audience-fit dev tools and infra only.',
}

const TIERS = [
  {
    name: 'Single post',
    spec: 'one labeled block · top or bottom of one post',
    starting: '$500',
    body: 'A short labeled block at the top or bottom of one post. You write the copy. I post it as-is, with the disclosure. The post itself stays mine.',
  },
  {
    name: 'Quarterly slot',
    spec: 'four posts · one quarter · first refusal on category',
    starting: '$1,800',
    body: 'A reserved labeled block in four posts across the quarter. First refusal on your product category for the quarter, so a competitor cannot buy the slot next door.',
  },
  {
    name: 'Field guide sponsor',
    spec: 'one free guide · permanent footer · 12 months',
    starting: '$2,500',
    body: 'A permanent labeled footer block on one of the free field guides (Cut Your AI Bill to Zero, Token Budget, Local LLMs in Regulated Industries, Agentic Workflows for Lean Founders). Twelve months. Long-tail distribution.',
  },
]

const CRITERIA = [
  {
    title: 'Audience fit',
    body: 'The reader is an engineer, technical founder, or AI architect running real workloads. Dev tools, hardware, infra, model providers, eval platforms, and vector / graph stores fit. Generic SaaS, marketing automation, and crypto do not.',
  },
  {
    title: 'Editorial firewall',
    body: 'I do not change a post\'s conclusion to accommodate a sponsor. If a post says your competitor is the right pick, I will not run your sponsorship next to it. I will offer a different post.',
  },
  {
    title: 'Disclosure, always',
    body: 'Every sponsored block is labeled. The disclosure pattern matches the affiliate disclosure on the stack page: same typography, same prominence, same wording about the relationship.',
  },
  {
    title: 'No banner ads, no popups, no tracking',
    body: 'One block per post. No display network, no retargeting pixel, no third-party JavaScript. The site is on Cloudflare Workers and stays that way.',
  },
]

const NUMBERS = [
  {
    label: 'Audience',
    value: 'Engineers and founders shipping agentic systems in 2026',
  },
  {
    label: 'Geo skew',
    value: 'US-heavy, with strong Boulder + SF + NYC pockets after BSW and the conference circuit',
  },
  {
    label: 'Cadence',
    value: '2-4 posts per week, archived permanently, indexed for discovery',
  },
  {
    label: 'Newsletter',
    value: 'The Architect\'s Notebook, weekly, sent through Listmonk',
  },
]

export default function SponsorPage() {
  return (
    <div className="space-y-12 max-w-2xl">
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">sponsor</h1>
        <p className="text-sm text-muted leading-relaxed mb-3">
          One sponsor per post. Audience-fit dev tools and infra only. Full
          editorial firewall, full disclosure, no banner ads. Below is how it
          works and what it costs.
        </p>
        <p className="font-mono text-xs text-muted leading-relaxed">
          If your product is in the stack page already, you have a head start.
          The audience already trusts the picks.
        </p>
      </section>

      {/* Tiers */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Tiers
        </h2>
        <div className="divide-y divide-border">
          {TIERS.map(({ name, spec, starting, body }) => (
            <div key={name} className="py-5 first:pt-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-mono text-sm text-fg">{name}</h3>
                <span className="font-mono text-xs text-bench shrink-0">
                  starting at {starting}
                </span>
              </div>
              <p className="font-mono text-xs text-muted mb-2">{spec}</p>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-xs text-muted leading-relaxed mt-4">
          Pricing scales with traffic. The numbers above are the floor. Larger
          readership and exclusivity move them up.
        </p>
      </section>

      {/* Criteria */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          How it works
        </h2>
        <div className="divide-y divide-border">
          {CRITERIA.map(({ title, body }) => (
            <div key={title} className="py-4 first:pt-0 last:pb-0">
              <h3 className="font-mono text-sm text-fg mb-1">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The numbers */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          The numbers
        </h2>
        <div className="border border-border bg-surface p-5 space-y-2">
          {NUMBERS.map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-3 font-mono text-sm">
              <span className="text-bench shrink-0 w-24">{label}</span>
              <span className="text-fg">{value}</span>
            </div>
          ))}
        </div>
        <p className="font-mono text-xs text-muted leading-relaxed mt-3">
          A current media kit (pageviews, post-by-post traffic, newsletter
          opens, geographic breakdown) is sent on request after the first reply.
        </p>
      </section>

      {/* Inquiry */}
      <section className="border-t border-border pt-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Inquire
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-4">
          Send a short note: which tier, which product, which post or category
          you have in mind. Reply within two business days.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="md"
            href="/contact?subject=Sponsorship%20inquiry&message=Tier%3A%20%0ALink%20to%20product%3A%20%0APost%20or%20category%20you%20have%20in%20mind%3A%20"
          >
            send sponsorship inquiry ›
          </Button>
          <Button variant="outline" size="md" href="/stack">
            see what is in the stack →
          </Button>
        </div>
      </section>
    </div>
  )
}

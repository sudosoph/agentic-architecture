import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

const CAL_URL = 'https://cal.com/sophia-stein/scoping'
// Dedicated BSW attendee perk · 5 free 30-min audits, capped on cal.com.
// Same URL the printed QR codes and the BSW repo README use.
const BSW_AUDIT_URL = 'https://cal.com/sophia-stein/architect-audit-bsw'
const REPO_URL = 'https://github.com/sudosoph/bsw26-agentic-workflows'
const SESSION_URL =
  'https://revelco.org/events/bsw-2026?session=5044310e-90eb-4942-babb-ae511817c0d4'

export const metadata: Metadata = {
  title: 'Boulder Startup Week 2026',
  description:
    'Architecting Agentic Workflows for the Lean 2026 Startup. A workshop at Boulder Startup Week 2026, May 7 at RegenHub. Slides, n8n templates, and demo repo.',
}

const SESSION = {
  title: 'Architecting Agentic Workflows for the Lean 2026 Startup',
  date: 'Thursday, May 7, 2026',
  time: '11:00 AM – 12:00 PM',
  venue: 'RegenHub',
  tags: ['AI', 'Growth', 'Founder-Specific', 'SaaS'],
}

const RESOURCES = [
  {
    label: 'Slides',
    body: 'The deck. Local-first agentic patterns for two-person teams.',
    href: `${REPO_URL}/blob/main/slides/index.html`,
  },
  {
    label: 'Tutorial',
    body: 'Build your first agentic workflow with n8n + Ollama in 90 minutes. Step-by-step, copy-pasteable.',
    href: `${REPO_URL}/blob/main/TUTORIAL.md`,
  },
  {
    label: 'n8n templates',
    body: 'Importable workflow JSONs covering inbox triage, competitive monitoring, and the Growth Agent we build live.',
    href: `${REPO_URL}/tree/main/n8n`,
  },
  {
    label: 'Setup guide',
    body: 'Configuration, env vars, and the dependency list for the workshop demo.',
    href: `${REPO_URL}/blob/main/CONFIGURATION.md`,
  },
  {
    label: 'Handouts',
    body: 'One-page references handed out at the workshop. Worth printing.',
    href: `${REPO_URL}/tree/main/handouts`,
  },
]

const TAKEAWAYS = [
  {
    title: 'A Blueprint for Autonomy',
    body: 'A step-by-step framework to identify which 20% of your manual tasks can be 80% automated using current agentic tools.',
  },
  {
    title: 'Live Build-Along',
    body: 'We map out a Growth Agent workflow together. Participants can adapt it for their own ventures immediately.',
  },
  {
    title: 'The Human-in-the-Loop Standard',
    body: 'How to maintain brand voice and ethical oversight while scaling output 10x.',
  },
]

export default function BswPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <section className="pt-2">
        <p className="font-mono text-xs text-bench uppercase tracking-widest mb-2">
          Boulder Startup Week 2026
        </p>
        <h1 className="font-mono text-2xl text-fg mb-3">
          {SESSION.title}
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          A workshop for early-stage founders, product managers, and lean
          growth teams who are tired of basic chat interfaces and want to
          build systems that actually work. If you came from the QR code at
          the venue, you are in the right spot.
        </p>
      </section>

      {/* Session card */}
      <section className="border border-border bg-surface p-5 space-y-2">
        <div className="flex items-baseline gap-3 font-mono text-sm">
          <span className="text-bench shrink-0">when</span>
          <span className="text-fg">{SESSION.date} · {SESSION.time}</span>
        </div>
        <div className="flex items-baseline gap-3 font-mono text-sm">
          <span className="text-bench shrink-0">where</span>
          <span className="text-fg">{SESSION.venue}</span>
        </div>
        <div className="flex items-baseline gap-3 font-mono text-sm">
          <span className="text-bench shrink-0">tags</span>
          <span className="text-muted">{SESSION.tags.join(' · ')}</span>
        </div>
        <div className="pt-3">
          <Link
            href={SESSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline"
          >
            rsvp on revel ↗
          </Link>
        </div>
      </section>

      {/* Workshop attendee offer */}
      <section className="border border-accent/40 bg-surface p-5">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          Workshop attendees · 5 free audits
        </p>
        <p className="font-mono text-sm text-fg leading-relaxed mb-3">
          The first five workshop attendees get a free 30-minute architecture
          audit. A real working session on your agentic workflow, not a sales
          pitch. Capped on Cal, first-come first-served.
        </p>
        <Button variant="primary" size="md" href={BSW_AUDIT_URL}>
          claim a free audit ›
        </Button>
      </section>

      {/* Quick CTAs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button variant="outline" size="md" href={CAL_URL}>
          regular scoping call →
        </Button>
        <Button variant="outline" size="md" href={REPO_URL}>
          github repo →
        </Button>
      </section>

      {/* What you will leave with */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          What you will leave with
        </h2>
        <div className="divide-y divide-border">
          {TAKEAWAYS.map(({ title, body }) => (
            <div key={title} className="py-4 first:pt-0 last:pb-0">
              <h3 className="font-mono text-sm text-fg mb-1">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted leading-relaxed mt-4">
          Whether you are a technical founder or a non-technical visionary,
          you will leave with a practical roadmap. Stop chatting with AI and
          start building with it.
        </p>
      </section>

      {/* Resources */}
      <section className="border-t border-border pt-8">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Workshop materials
        </h2>
        <div className="divide-y divide-border">
          {RESOURCES.map(({ label, body, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block group py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                  {label}
                </h3>
                <span className="font-mono text-xs text-muted shrink-0">↗</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter pull */}
      <NewsletterSignup
        source="bsw"
        sub="Want the writeup of the workshop?"
      />

      {/* Related reading */}
      <section className="pt-4 border-t border-border">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Related on the blog
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/blog/the-agentic-audit" className="text-accent hover:underline">
              Find Your Agent-Ready Tasks in 90 Minutes
            </Link>
            <span className="text-muted">, the framework behind the workshop blueprint</span>
          </li>
          <li>
            <Link href="/blog/three-ways-to-run-open-weight-models" className="text-accent hover:underline">
              Three Ways to Run Open Weights for Pennies
            </Link>
            <span className="text-muted">, the cost math for the agents you build</span>
          </li>
          <li>
            <Link href="/blog/the-hitl-standard" className="text-accent hover:underline">
              Notes on Human-in-the-Loop
            </Link>
            <span className="text-muted">, the standard we build the agents around</span>
          </li>
          <li>
            <Link href="/blog?theme=local-models" className="text-accent hover:underline">
              All local-models posts →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

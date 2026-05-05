import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

const REPO_URL = 'https://github.com/sudosoph/bsw26-agentic-workflows'
const SLIDES_URL = '/slides/bsw26.html'
const SESSION_URL =
  'https://revelco.org/events/bsw-2026?session=5044310e-90eb-4942-babb-ae511817c0d4'
const BSW_AUDIT_URL = 'https://cal.com/sophia-stein/architect-audit-bsw'

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

type Material = {
  label: string
  body: string
  href: string
  external: boolean
  cta: string
}

// Order is intentional. The deck is what most attendees want first.
// External GitHub links are clearly labeled so readers know they are
// leaving the site for the source repo.
const MATERIALS: Material[] = [
  {
    label: 'Slide deck',
    body: 'The 50-slide deck from the workshop. Open in Chrome, press F for fullscreen, arrow keys to navigate.',
    href: SLIDES_URL,
    external: false,
    cta: 'open the deck →',
  },
  {
    label: 'Demo repo (everything in one place)',
    body: 'The full source for the workshop, MIT-licensed. Clone, fork, copy whatever helps. README walks through the free path (Groq + Jina + n8n.cloud trial, $0 for 14 days).',
    href: REPO_URL,
    external: true,
    cta: 'open the repo on github ↗',
  },
  {
    label: 'Tutorial · build your first agent in 90 minutes',
    body: 'Step-by-step. Copy-pasteable. The exact build we walk through live, written so you can finish it on your own afterward.',
    href: `${REPO_URL}/blob/main/TUTORIAL.md`,
    external: true,
    cta: 'open the tutorial ↗',
  },
  {
    label: 'n8n workflow templates',
    body: 'Importable JSONs for inbox triage, competitive monitoring, and the Growth Agent we build live. Import directly into your n8n instance.',
    href: `${REPO_URL}/tree/main/n8n`,
    external: true,
    cta: 'open the templates ↗',
  },
  {
    label: 'Setup guide · provider swap-ins',
    body: 'How to swap providers without rewriting the workflow: Groq, Jina, Ollama, Gemini, OpenRouter. Use whichever is cheapest or fastest for your use case.',
    href: `${REPO_URL}/blob/main/CONFIGURATION.md`,
    external: true,
    cta: 'open the setup guide ↗',
  },
  {
    label: 'Handouts · printable references',
    body: 'Brand voice template, ICP template, agent JSON output schemas, the OSS growth playbook (13 case studies), the 20-80 worksheet. All forkable.',
    href: `${REPO_URL}/tree/main/handouts`,
    external: true,
    cta: 'open the handouts ↗',
  },
]

const TAKEAWAYS = [
  {
    title: 'Find your agent-ready tasks',
    body: 'A simple 90-minute exercise to spot the 20% of your manual work that an agent can take over today, and the 80% that should stay with humans.',
  },
  {
    title: 'Build a working agent live',
    body: 'We build a Growth Agent together using n8n and an LLM of your choice. You leave with the same workflow running on your own machine, ready to adapt.',
  },
  {
    title: 'Keep the human in the loop',
    body: 'Practical patterns for keeping brand voice, judgment, and oversight intact while the agent does the repetitive work.',
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
          A workshop for founders, operators, and small-business owners who
          want to build AI systems that actually work, not just chat with one.
          If you came from the QR code at the venue, you are in the right
          spot. Everything from the workshop is below.
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

      {/* Workshop materials · FIRST so attendees can dive straight in */}
      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Workshop materials
        </h2>
        <div className="divide-y divide-border">
          {MATERIALS.map(({ label, body, href, external, cta }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="block group py-5 first:pt-0 last:pb-0"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-mono text-sm text-fg group-hover:text-accent transition-colors">
                  {label}
                </h3>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-2">{body}</p>
              <p className="font-mono text-xs text-accent group-hover:underline">
                {cta}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* What you will leave with */}
      <section className="border-t border-border pt-8">
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
          Whether you write code or you have never opened a terminal, you
          leave with a working agent and a plan for the next one.
        </p>
      </section>

      {/* Help with your first agent · the offer · value-led */}
      <section className="border border-accent/40 bg-surface p-5">
        <h2 className="font-mono text-sm text-fg mb-2">
          Want help setting up your first agent?
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-3">
          Bring the workflow you want to automate, the part of your week that
          eats your time. Inbox, reporting, follow-ups, lead research, status
          updates. We sit down for 30 minutes and sketch the agent that
          handles it. You leave with a working plan you can hand to whoever
          builds it for you, or follow yourself.
        </p>
        <p className="text-sm text-muted leading-relaxed mb-3">
          Five free sessions for workshop attendees. No sales.
        </p>
        <Button variant="primary" size="md" href={BSW_AUDIT_URL}>
          book a free session ›
        </Button>
      </section>

      {/* Newsletter pull · audience building is the main CTA */}
      <NewsletterSignup
        source="bsw"
        sub="Want the writeup of the workshop, plus weekly notes on what is actually working?"
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
            <span className="text-muted">, the framework behind the workshop</span>
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
            <span className="text-muted">, how to keep the human part of the agent</span>
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

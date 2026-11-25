import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Free 20-Min AI Brand Voice & Workflow Starter Kit',
  description:
    'Copy-paste voice.md Brand Brain template, ICP snapshot, and the 20/80 Task Readiness Scorecard to ship your first AI workflow in 20 minutes.',
}

const VOICE_TEMPLATE = `# Brand Brain (voice.md)

## Who We Serve & What We Do
- Company / Role: [One plain-English sentence]
- Core Customer: [Who buys, what keeps them up at night]
- Primary Offer: [How you solve it and what outcome they measure]

## Voice Rules (Always Follow)
- Direct, warm, specific, and grounded in real numbers.
- Short paragraphs (2 to 4 sentences max). Lead with the takeaway.
- Never use em-dashes, corporate jargon, or filler openers.
- Forbidden words: delve, game-changer, synergy, revolutionary.

## 3 Golden Examples Written By Me
1. [Paste a real email you sent a client that got a great reply]
2. [Paste a short post or memo that sounds unmistakably like you]
3. [Paste how you explain pricing or scope pushback]`

const SCORECARD_ROWS = [
  {
    factor: '1. Weekly Volume (weight x2)',
    rule: 'Score 1 (rare) to 5 (daily repetitive chore). Multiply by 2.',
    example: 'Inbox triage & lead prep = 4 x 2 = 8 pts',
  },
  {
    factor: '2. Bounded Variability',
    rule: 'Score 1 (every case is brand-new) to 5 (80% follow 3 to 5 clear patterns).',
    example: 'Pre-call research brief = 4 pts',
  },
  {
    factor: '3. Reversibility / Draft Gate',
    rule: 'Score 5 when output lands as an internal draft for human approval; 1 if irreversible.',
    example: 'Internal briefing doc or Gmail draft = 5 pts',
  },
  {
    factor: '4. Structured Input Signal',
    rule: 'Score 1 (vague hallway chat) to 5 (form fill, calendar invite, or clean sheet).',
    example: 'Cal.com booking + company URL = 4 pts',
  },
]

export default function StarterKitPage() {
  return (
    <div className="space-y-14">
      <div className="space-y-4">
        <Badge variant="online">Unlocked Resource · No Gate Required</Badge>
        <PageHeader
          title="The 20-Minute AI Brand Voice & Workflow Starter Kit"
          description="Copy the exact Brand Brain file (voice.md) and 20/80 Task Scorecard we use in live workshops to pick and wire your highest-ROI workflow today."
        />
      </div>

      {/* Step 1: voice.md */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-bold text-fg">
            Part 1: Your Portable Brand Brain (`voice.md`)
          </h2>
          <span className="font-mono text-xs text-accent">10 minutes · Save in Docs or Markdown</span>
        </div>
        <p className="text-sm text-muted leading-relaxed max-w-3xl">
          Create a single file named <code className="font-mono text-fg">voice.md</code> in Google
          Drive, Notion, or your local project folder. Attach it to your AI workspace project so you
          never repeat your background or tone instructions again.
        </p>
        <pre className="rounded-xl border border-border bg-surface p-5 text-xs sm:text-sm font-mono text-fg overflow-x-auto leading-relaxed">
          {VOICE_TEMPLATE}
        </pre>
      </section>

      {/* Step 2: 20/80 Scorecard */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-bold text-fg">
            Part 2: The 20/80 Task Readiness Scorecard
          </h2>
          <span className="font-mono text-xs text-online">Score 18+ out of 25 = Automate First</span>
        </div>
        <p className="text-sm text-muted leading-relaxed max-w-3xl">
          List the 5 repetitive tasks eating your week and score each out of 25. Anything scoring 18
          or higher is ready to automate with a human review step today; anything under 14 should
          either stay human or be split into a pure research/drafting step first.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCORECARD_ROWS.map(row => (
            <Card key={row.factor} className="p-5 space-y-1.5">
              <h3 className="text-sm font-bold text-fg">{row.factor}</h3>
              <p className="text-xs text-muted leading-relaxed">{row.rule}</p>
              <p className="font-mono text-xs text-accent pt-1">{row.example}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Step 3: Next Steps Bridge */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 space-y-5">
        <div className="space-y-1">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Part 3: Build It Live With Sophia
          </p>
          <h2 className="text-2xl font-bold text-fg">Turn Your Starter Kit Into 6 Live Workflows</h2>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Bring your completed <code className="font-mono text-fg">voice.md</code> to the next free
            60-minute live masterclass, or apply to install all 6 business systems inside the
            8-week Agentic Business Accelerator.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" href="/masterclass">
            Register for the Free 60-Min Masterclass →
          </Button>
          <Button variant="outline" size="md" href="/accelerator">
            See the 8-Week Accelerator
          </Button>
          <Button variant="ghost" size="md" href={SITE_CONFIG.cal.audit}>
            Book a 1:1 Workflow Audit
          </Button>
        </div>
      </section>

      <NewsletterSignup source="starter-kit" />
    </div>
  )
}

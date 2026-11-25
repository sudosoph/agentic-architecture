import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'

export const metadata: Metadata = {
  title: 'About Sophia Stein',
  description:
    'Builder, writer, and angel investor in Boulder, CO. Columbia CS, ex-McKinsey, AI work at Google (personal capacity, views my own), and Women Who Code speaker.',
  alternates: {
    canonical: '/about',
  },
}

const SNAPSHOTS = [
  {
    label: 'Day Job & Applied Research',
    title: 'Google (Boulder, CO)',
    detail:
      'Building internal AI investigation tools (cutting complex triage from 15 minutes to 2), co-inventing a patent-pending multimodal QA engine, and teaching internal workshops. Everything on this site is strictly in my personal capacity, views my own.',
  },
  {
    label: 'Commercial Strategy & Rollouts',
    title: 'McKinsey & Company',
    detail:
      'Restructured enterprise SaaS contracts to save $70M in annual sales OpEx and led clinical software rollouts across 250+ healthcare leaders at a 79 NPS.',
  },
  {
    label: 'Early Engineering & Computer Science',
    title: 'Columbia University, Section.io & Meta',
    detail:
      'B.S. in Computer Science at Columbia (Dean’s List), performance engineering at Section.io ahead of its Webscale acquisition (+30% conversion lift, -40% support tickets), and Mobile Engineering Fellow at Meta.',
  },
  {
    label: 'Community & Frontier Investing',
    title: 'Boulder Classrooms & 7x Angel Investor',
    detail:
      'Taught 300+ founders live at Boulder Startup Week, spoke for Women Who Code, advise Seed biotech teams, and angel invest across quantum hardware, medtech, microgrids, and zero-waste supply chains.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        meta="Boulder, CO · Builder, Writer & Angel Investor"
        title="Hi, I’m Sophia."
        description="I build practical AI setups so founders and teams spend less time fighting software and more time doing actual work."
      />

      {/* Real-Person Narrative */}
      <section className="max-w-3xl space-y-4 text-base text-muted leading-relaxed">
        <p className="text-fg font-medium text-lg leading-relaxed">
          I started <strong>Agentic Architect</strong> after watching smart people get stuck in the
          same trap: either re-typing context into a blank chat window every morning, or paying
          for complicated AI science projects that nobody uses two weeks later.
        </p>
        <p>
          My background sits halfway between code and messy human operations. I studied computer
          science at Columbia, shipped production web and mobile software at Meta and Section.io,
          spent two years at McKinsey fixing commercial math and clinical rollouts, and now build
          applied AI tools in Boulder. Outside of software, I speak four languages fluently, back
          early deep-tech and climate founders as an angel investor, and care deeply about owning
          your own data and margins.
        </p>
        <p>
          My rule for every tool review, playbook, or live workshop here is simple: if a plain
          markdown file (<code className="font-mono text-fg">voice.md</code>) and a 15-minute
          workflow solve the problem at near-zero monthly cost, do not overcomplicate it.
        </p>
        <p className="text-xs text-muted bg-surface border border-border rounded-lg p-3.5">
          Personal capacity note: My day job is at Google. Everything published, taught, or advised
          through Agentic Architecture LLC (<code className="font-mono">agenticarchitect.ai</code>)
          is independent, uses zero employer resources, and reflects my own views.
        </p>
      </section>

      {/* Crisp 4-Card Track Record */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-fg">Where I Have Built</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SNAPSHOTS.map(item => (
            <Card key={item.title} className="p-6 space-y-2">
              <p className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                {item.label}
              </p>
              <h3 className="text-base font-bold text-fg">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Low-Key Next Step */}
      <section className="rounded-2xl border border-border bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-fg">Want to Build Together or Say Hello?</h2>
          <p className="text-sm text-muted">
            Grab the free <Link href="/starter-kit" className="text-accent font-medium hover:underline">20-Minute Starter Kit</Link>, join the next{' '}
            <Link href="/masterclass" className="text-accent font-medium hover:underline">live class</Link>, or reach out directly.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="sm" href="/work-with-me">
            Ways to Work Together
          </Button>
          <Button variant="outline" size="sm" href="/contact">
            Send a Note
          </Button>
        </div>
      </section>

      <NewsletterSignup source="about" />
    </div>
  )
}

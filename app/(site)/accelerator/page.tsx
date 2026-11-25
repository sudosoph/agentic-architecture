import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LdReimbursementCard } from '@/components/site/ld-reimbursement-card'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'The Agentic Business Accelerator',
  description:
    '8-week Done-With-You implementation cohort installing 6 revenue and operations AI systems inside your business for a fraction of a $65,000/yr hire.',
  alternates: { canonical: '/accelerator' },
}

const SIX_SYSTEMS = [
  {
    num: '01',
    title: 'The AI Business & Brand Brain (voice.md + icp.md)',
    body: 'Codify your positioning, tone, customer objections, and offer rules into portable files every AI tool in your company reads automatically.',
  },
  {
    num: '02',
    title: 'Omnichannel Brand & Content Engine',
    body: 'Turn one 10-minute voice memo or client story per week into a canonical article, newsletter issue, and social posts without sounding robotic.',
  },
  {
    num: '03',
    title: 'Inbound Lead Research & Pre-Call Dossiers',
    body: 'Every new calendar booking triggers an automated background brief, ROI estimate, and tailored meeting agenda in your inbox before the call.',
  },
  {
    num: '04',
    title: 'Zero-Inbox & Smart Scheduling Triage',
    body: 'Route repetitive inquiries, draft replies in your exact voice, and queue 5-day follow-ups with a strict human-in-the-loop review gate.',
  },
  {
    num: '05',
    title: 'Client Delivery, SOPs & Document Extraction',
    body: 'Convert messy meeting transcripts, PDFs, and recurring checklists into clean client deliverables, trackers, and reusable team playbooks.',
  },
  {
    num: '06',
    title: 'Cost Governance & Private Data Architecture',
    body: 'Replace bloated per-seat SaaS subscriptions with lean, portable automations and private workspace boundaries you fully own.',
  },
]

const COMPARISON = [
  {
    option: 'Junior Ops or Marketing Hire',
    cost: '$65,000/yr + taxes',
    timeline: '3 to 4 months to recruit & ramp',
    ownership: 'Walks out the door if they leave',
    highlight: false,
  },
  {
    option: 'Custom Automation Agency',
    cost: '$20,000+ retainer',
    timeline: '6 to 12 weeks of black-box scoping',
    ownership: 'Fragile zaps nobody in-house can edit',
    highlight: false,
  },
  {
    option: 'The Agentic Business Accelerator',
    cost: '$5,997 Founding ($8,997 Standard)',
    timeline: 'First 2 workflows live in Week 1',
    ownership: '100% owned by you + your ops teammate',
    highlight: true,
  },
]

export default function AcceleratorPage() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="online">8-Week Done-With-You Cohort</Badge>
          <Badge variant="rig">Founding Cohort Open</Badge>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-fg leading-tight max-w-4xl">
          Install 6 Production AI Systems Inside Your Business in 8 Weeks
        </h1>

        <p className="text-base sm:text-lg text-muted leading-relaxed max-w-3xl">
          The Agentic Business Accelerator is a hands-on implementation program for founders,
          service business owners, and lean leadership teams who want output of a $65,000/yr
          operations and content hire without adding headcount or writing software.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button variant="primary" size="lg" href={SITE_CONFIG.cal.acceleratorFounding}>
            Enroll in Founding Cohort ($5,997) →
          </Button>
          <Button variant="outline" size="lg" href={SITE_CONFIG.cal.accelerator}>
            Book a 20-Min Cohort Fit Call
          </Button>
          <Button variant="ghost" size="lg" href="/masterclass">
            Watch the Free 60-Min Masterclass First
          </Button>
        </div>
      </section>

      {/* Value Anchor Comparison */}
      <section className="space-y-5">
        <PageHeader
          meta="Unit Economics"
          title="Why Operators Build Systems Before Hiring"
          description="Compare the real first-year cost of adding headcount or hiring an agency against owning the workflows in-house."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COMPARISON.map(row => (
            <Card
              key={row.option}
              className={`p-6 space-y-3 ${
                row.highlight ? 'border-accent ring-1 ring-accent bg-blue-50/40' : 'bg-surface'
              }`}
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                {row.highlight ? 'Recommended Path' : 'Traditional Alternative'}
              </p>
              <h2 className="text-lg font-bold text-fg">{row.option}</h2>
              <p className="text-2xl font-extrabold text-fg">{row.cost}</p>
              <ul className="space-y-1.5 text-xs text-muted pt-2 border-t border-border">
                <li>• Speed: {row.timeline}</li>
                <li>• Control: {row.ownership}</li>
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* 6 Systems Grid */}
      <section className="space-y-5">
        <PageHeader
          meta="8-Week Curriculum & Vault"
          title="The 6 Business Systems You Leave Running"
          description="Each module pairs concise step-by-step setup videos, copy-paste workflow templates, and a weekly 90-minute live implementation and hot-seat call."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SIX_SYSTEMS.map(sys => (
            <Card key={sys.num} className="p-6 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 font-mono text-xs font-bold text-accent">
                  {sys.num}
                </span>
                <h3 className="text-base font-bold text-fg">{sys.title}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">{sys.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing & Team Seat */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <Card className="lg:col-span-7 p-6 md:p-8 space-y-5 border-accent">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="online">Founding Cohort Tuition</Badge>
            <span className="font-mono text-xs text-muted">Capped small group for 1:1 feedback</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-4xl font-extrabold text-fg">$5,997</span>
            <span className="text-sm text-muted line-through">$8,997 Standard Tuition</span>
          </div>

          <ul className="space-y-2.5 text-sm text-muted leading-relaxed">
            <li>✓ 8 weekly 90-minute live implementation &amp; workflow troubleshooting calls with Sophia</li>
            <li>✓ Full lifetime access to the Brand Brain, SOP, and zero-cost automation template vault</li>
            <li>✓ Direct async architecture feedback on your prompts, routing rules, and data security</li>
            <li>
              ✓ <strong className="text-fg">Optional +$1,500 Ops Lead / EA Seat:</strong> Bring your
              operations manager or executive assistant so they wire and maintain every system alongside you
            </li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="primary" size="lg" href={SITE_CONFIG.cal.acceleratorFounding}>
              Enroll Now + Book 1:1 Kickoff ($5,997) →
            </Button>
            <Button variant="outline" size="lg" href={SITE_CONFIG.cal.scoping}>
              Book a Fit Call First
            </Button>
          </div>

          <p className="text-xs text-muted">
            Note: If you begin with a $1,500 VIP 90-Minute Workflow &amp; Cost Audit, 100% of your audit
            fee credits directly toward Accelerator enrollment or a Private Corporate Intensive within 30 days.
          </p>
        </Card>

        <Card className="lg:col-span-5 p-6 md:p-8 bg-surface flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Need a Private Rollout for 10 to 100+ Staff?
            </p>
            <h2 className="text-xl font-bold text-fg">Private Corporate AI Enablement</h2>
            <p className="text-sm text-muted leading-relaxed">
              For established companies, healthcare groups, and engineering or operations teams that
              want this curriculum tailored privately to internal workflows and security policies.
            </p>
          </div>
          <Button variant="outline" size="md" href={SITE_CONFIG.cal.speaking}>
            Scope a Corporate Workshop →
          </Button>
        </Card>
      </section>

      <LdReimbursementCard />
    </div>
  )
}

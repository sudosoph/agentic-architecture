import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LdReimbursementCard } from '@/components/site/ld-reimbursement-card'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: '6-System AI Back-Office Implementation Cohort · Agentic Architect',
  description:
    'Guided implementation cohort for non-technical business owners and their EA or Ops Lead: install 6 durable AI workflows inside your own accounts without agency lock-in.',
  alternates: { canonical: '/accelerator' },
}

const SIX_SYSTEMS = [
  {
    num: '01',
    title: 'Company SOPs, Qualification & Escalation Rules',
    body: 'Document your pricing floors, buyer qualification criteria, and communication standards once so every workflow follows your rules automatically.',
  },
  {
    num: '02',
    title: 'AI Chief of Staff & Commitment Loop',
    body: 'Prep every calendar meeting 30 minutes ahead, extract call decisions, and track open team and client commitments automatically.',
  },
  {
    num: '03',
    title: 'Inbound Lead Research & Pre-Call Dossiers',
    body: 'Every new booking triggers a clean prospect brief, bottleneck check, and tailored call agenda in your inbox.',
  },
  {
    num: '04',
    title: 'Draft-First Inbox & 5-Day Follow-Up Pipeline',
    body: 'Triage repetitive email, stage replies in Gmail Drafts in your exact voice, and queue Day-2 and Day-5 follow-ups for 10-second human approval.',
  },
  {
    num: '05',
    title: 'Proposal, Onboarding & SOP Extractor',
    body: 'Turn call transcripts and recurring deliverables into scoped proposals, onboarding packets, and reusable staff checklists.',
  },
  {
    num: '06',
    title: 'Data Privacy Guardrails & Software Spend Watchdog',
    body: 'Keep confidential client files off public training pipelines with least-privilege permissions while cutting overlapping SaaS bills.',
  },
]

const COMPARISON = [
  {
    option: 'Junior Ops or Marketing Hire',
    cost: '$65,000/yr + payroll tax',
    timeline: '3 to 4 months to recruit & ramp',
    ownership: 'Knowledge walks out the door when they leave',
    highlight: false,
  },
  {
    option: 'Black-Box Automation Agency',
    cost: '$15,000+ retainer',
    timeline: '6 to 12 weeks of scoping calls',
    ownership: 'Undocumented zaps your staff cannot edit',
    highlight: false,
  },
  {
    option: '6-System Back-Office Cohort',
    cost: 'From $1,497 (Includes EA / Ops Seat)',
    timeline: 'First working automation in Week 1',
    ownership: '100% inside your own accounts + full SOPs',
    highlight: true,
  },
]

const ACCELERATOR_FAQS = [
  {
    q: 'I am a non-technical business owner. How much weekly time does this require?',
    a: 'About 60 to 90 minutes a week, and you can bring your Executive Assistant, Chief of Staff, or Ops Manager at no extra seat cost so they wire and maintain the workflows alongside you.',
  },
  {
    q: 'Why do I book a 20-minute Fit Call instead of checking out blindly on a calendar?',
    a: 'Multi-week programs only work when your business actually has repeatable workflow volume ready to automate. In 20 minutes on Cal.com we look at your #1 bottleneck and tell you candidly whether the $297 self-paced Academy, this live Cohort, or a custom Done-For-You Sprint fits best.',
  },
  {
    q: 'What if I want Sophia to build one critical automation for us Done-For-You instead?',
    a: 'Visit /work-with-me to commission a focused Bottleneck Automation Sprint (custom-scoped from $2,500) or start with a single-session $750 Workflow & Cost Roadmap (credited in full if we build together).',
  },
]

export default function AcceleratorPage() {
  const acceleratorLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_CONFIG.siteUrl}/accelerator#course`,
        name: 'The 6-System AI Back-Office Implementation Cohort',
        description:
          'Guided implementation program for non-technical business owners and operators installing 6 owned back-office AI workflows with a free teammate seat included.',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
          url: SITE_CONFIG.siteUrl,
        },
        offers: {
          '@type': 'Offer',
          name: 'Guided Cohort Enrollment (Includes Operator Seat)',
          price: '1497',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: SITE_CONFIG.cal.scoping,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: ACCELERATOR_FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(acceleratorLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="space-y-14">
        {/* Hero */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="online">Guided Implementation Cohort · Free EA / Ops Seat Included</Badge>
            <Badge variant="rig">Zero Coding · Zero Agency Lock-In</Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-fg leading-tight max-w-4xl">
            Install 6 Owned Back-Office Automations With Your Team (Before Hiring Headcount)
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-3xl">
            Built for non-technical founders, service business owners, and operators who want the
            throughput of a $65,000/yr coordinator without fragile black-box agency retainers. Bring
            your EA, Chief of Staff, or Ops Lead at <strong className="text-fg">$0 extra seat cost</strong>{' '}
            and wire every workflow directly inside your own workspace.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="primary" size="lg" href={SITE_CONFIG.cal.scoping}>
              Book Free 20-Min Cohort Fit Call →
            </Button>
            <Button variant="outline" size="lg" href="/courses">
              Prefer Self-Paced? See $297 Academy
            </Button>
            <Button variant="ghost" size="lg" href="/masterclass">
              Join Free 60-Min Live Build First
            </Button>
          </div>
        </section>

        {/* Value Anchor Comparison */}
        <section className="space-y-5">
          <PageHeader
            meta="Unit Economics"
            title="Why Owners Automate Bottlenecks Before Adding Payroll"
            description="Compare the first-year cost and maintenance risk of hiring headcount or a black-box contractor against building durable systems your team owns."
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
                  {row.highlight ? 'Owned In-House Option' : 'Traditional Alternative'}
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
            meta="Curriculum & Workflow Vault"
            title="The 6 Back-Office Workflows You &amp; Your Operator Leave Running"
            description="Each module pairs step-by-step walkthroughs, copy-paste configurations, and live troubleshooting office hours."
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

        {/* Clean Enrollment + Custom Build Bridge */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <Card className="lg:col-span-7 p-6 md:p-8 space-y-5 border-accent">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="online">Cohort Enrollment · From $1,497</Badge>
              <span className="font-mono text-xs text-muted">Small group for hands-on review</span>
            </div>

            <ul className="space-y-2.5 text-sm text-fg border-b border-border pb-4">
              <li>✓ Live weekly implementation sessions + full recorded library</li>
              <li>✓ Free second seat included for your EA, Chief of Staff, or Ops Lead</li>
              <li>✓ Pre-call dossier, draft-first inbox, proposal &amp; onboarding templates</li>
              <li>✓ Built 100% inside your own workspace accounts with human approval gates</li>
            </ul>

            <p className="text-xs text-muted leading-relaxed">
              We never auto-enroll multi-week cohorts off a blind checkout link. Book a quick
              20-minute fit call so we can inspect your current stack and confirm the cohort is the
              highest-return path (or credit a $750 Roadmap session directly toward tuition).
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="primary" size="lg" href={SITE_CONFIG.cal.scoping}>
                Book 20-Min Cohort Fit Call →
              </Button>
              <Button variant="outline" size="lg" href={SITE_CONFIG.cal.cohortKickoff}>
                Ready Now? Enroll + Book Kickoff ($1,497)
              </Button>
              <Button variant="ghost" size="lg" href="/academy">
                Compare $297 Self-Paced Academy
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-5 p-6 md:p-8 bg-surface flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Prefer Done-For-You or Corporate Training?
              </p>
              <h2 className="text-xl font-bold text-fg">
                Commission a Single Bottleneck Sprint or Team Workshop
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                Short on bandwidth? Have Sophia scope and ship one high-ROI automation sprint for
                your business (custom-scoped from $2,500) or lead a private workshop for your
                department. Exploring <Link href="/work-with-me" className="text-accent hover:underline">/work-with-me</Link> takes 60 seconds.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="md" href="/work-with-me">
                See Custom Sprints &amp; Workshops →
              </Button>
              <Button variant="outline" size="md" href={SITE_CONFIG.cal.speaking}>
                Corporate Workshop Inquiry
              </Button>
            </div>
          </Card>
        </section>

        <LdReimbursementCard />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-fg">Cohort &amp; Fit FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ACCELERATOR_FAQS.map(faq => (
              <Card key={faq.q} className="p-6 space-y-2">
                <h3 className="text-sm font-bold text-fg leading-snug">{faq.q}</h3>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

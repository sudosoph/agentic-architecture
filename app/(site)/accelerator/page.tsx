import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LdReimbursementCard } from '@/components/site/ld-reimbursement-card'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: '8-Week Executive AI Operating System Cohort · Agentic Architect',
  description:
    'Install 6 production AI workflows inside your business in 8 weeks (includes a FREE seat for your EA, COO, or Ops Manager + our 14-Day Live-System Guarantee).',
  alternates: { canonical: '/accelerator' },
}

const SIX_SYSTEMS = [
  {
    num: '01',
    title: 'Company Context & Voice Vault (voice.md + icp.md)',
    body: 'Codify your positioning, executive tone, pricing rules, and client objections into portable files every AI workflow reads automatically.',
  },
  {
    num: '02',
    title: 'AI Chief of Staff & Commitment Tracker',
    body: 'Prep every calendar meeting 30 minutes ahead, extract call decisions, and track open team and client commitments automatically.',
  },
  {
    num: '03',
    title: 'Inbound Lead Research & Pre-Call Dossiers',
    body: 'Every new booking triggers a background prospect brief, deal-fit check, and tailored call agenda in your inbox.',
  },
  {
    num: '04',
    title: 'Draft-First Inbox & 5-Day Follow-Up Engine',
    body: 'Triage repetitive email, stage replies in Gmail Drafts in your exact voice, and queue Day-2 / Day-5 deal follow-ups for 1-click sign-off.',
  },
  {
    num: '05',
    title: 'Client Delivery, Proposal & SOP Extractor',
    body: 'Turn call recordings and messy documents into scoped proposals, client deliverables, and reusable staff checklists.',
  },
  {
    num: '06',
    title: 'Private Data Guardrails & SaaS Cost Watchdog',
    body: 'Lock down OAuth scopes so confidential deals and client records never train public models, while cutting overlapping software bills.',
  },
]

const VALUE_STACK = [
  { item: '8-Week Live Implementation Installing All 6 Back-Office AI Roles', val: '$8,997 Value' },
  {
    item: 'BONUS 1: FREE Right-Hand Operator Seat (Bring Your EA, Chief of Staff, or Ops Manager Free)',
    val: '$2,500 Value',
  },
  {
    item: 'BONUS 2: Private Company Context & Data-Security Setup Vault',
    val: '$2,000 Value',
  },
  {
    item: 'BONUS 3: Plug-and-Play Pre-Call Dossier, Draft-First Inbox & Follow-Up Templates',
    val: '$1,500 Value',
  },
]

const COMPARISON = [
  {
    option: 'Junior Ops or Marketing Hire',
    cost: '$65,000/yr + taxes',
    timeline: '3 to 4 months to recruit & ramp',
    ownership: 'Walks out the door if they quit',
    highlight: false,
  },
  {
    option: 'Black-Box Automation Agency',
    cost: '$20,000+ retainer',
    timeline: '6 to 12 weeks of scoping calls',
    ownership: 'Fragile zaps nobody in-house can edit',
    highlight: false,
  },
  {
    option: 'Executive AI Operating System Cohort',
    cost: '$5,997 Founding ($8,997 Standard)',
    timeline: '2 live workflows by Day 14 (Guaranteed)',
    ownership: '100% owned by you + your FREE Operator seat',
    highlight: true,
  },
]

const ACCELERATOR_FAQS = [
  {
    q: 'I am a non-technical business owner with very little free time. How much effort does this take?',
    a: 'Under 60 minutes a week for the owner. That is why we include a FREE Right-Hand Operator Seat ($2,500 value) for your Executive Assistant, COO, or Ops Manager: you attend Week 1 org-chart strategy, and we train your operator to wire and run all 6 workflows for you.',
  },
  {
    q: 'How does the 14-Day Live-System Guarantee work?',
    a: 'Attend Week 1 and Week 2 with your operator. If you do not have at least 2 back-office AI workflows live and saving 8+ hours/week inside your business by Day 14 (and all 6 by Week 8), Sophia continues coaching your operator free until they are running.',
  },
  {
    q: 'What if I want Sophia to just custom-build everything for my company instead?',
    a: 'If you prefer a white-glove Done-For-You build, book our 30-Day Bespoke AI Automation Sprint ($12,500 to $25,000) or start with a $1,500 48-Hour Custom AI Blueprint (100% credited) on /work-with-me.',
  },
]

export default function AcceleratorPage() {
  const acceleratorLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${SITE_CONFIG.siteUrl}/accelerator#course`,
        name: 'The Executive AI Operating System Cohort (8-Week Implementation + Free Operator Seat)',
        description:
          '8-week implementation program for $1M to $50M business owners and principals installing 6 AI workflows alongside their EA, Chief of Staff, or Ops Manager (operator seat included free).',
        provider: {
          '@type': 'Organization',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          name: SITE_CONFIG.siteName,
          url: SITE_CONFIG.siteUrl,
        },
        offers: [
          {
            '@type': 'Offer',
            name: 'Founding Cohort Tuition (Includes Free Operator Seat)',
            price: '5997',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: SITE_CONFIG.cal.acceleratorFounding,
          },
          {
            '@type': 'Offer',
            name: 'Standard Cohort Tuition',
            price: '8997',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: SITE_CONFIG.cal.accelerator,
          },
        ],
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
            <Badge variant="online">8-Week Cohort · EA / Ops Manager Seat Included FREE</Badge>
            <Badge variant="rig">14-Day Live-System Guarantee</Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-fg leading-tight max-w-4xl">
            Install 6 Back-Office AI Workflows in 8 Weeks (Without Doing the Wiring Yourself)
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-3xl">
            Built for non-technical $1M to $50M business owners, firm principals, and executives who
            want the output of a $65,000/yr operations hire without adding headcount. Bring your EA,
            Chief of Staff, or Ops Lead at <strong className="text-fg">$0 extra tuition</strong> so
            we train them to run every workflow for you.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="primary" size="lg" href={SITE_CONFIG.cal.acceleratorFounding}>
              Claim Founding Seat + Free Operator Pass ($5,997) →
            </Button>
            <Button variant="outline" size="lg" href={SITE_CONFIG.cal.scoping}>
              Book a 15-Min Executive Fit Call
            </Button>
            <Button variant="ghost" size="lg" href="/masterclass">
              Watch the Free 60-Min Briefing First
            </Button>
          </div>
        </section>

        {/* Value Anchor Comparison */}
        <section className="space-y-5">
          <PageHeader
            meta="Unit Economics"
            title="Why Owners Install Systems Before Adding Payroll"
            description="Compare the first-year cost and lock-in risk of hiring headcount or an outside agency against owning all 6 systems in-house."
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
                  {row.highlight ? 'Grand Slam Cohort' : 'Traditional Alternative'}
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
            title="The 6 Back-Office AI Roles You &amp; Your Operator Leave Running"
            description="Zero software engineering required. Each week pairs concise setup walkthroughs, copy-paste workflow templates, and live 90-minute implementation coaching."
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

        {/* Hormozi Value Stack + Bespoke Option */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <Card className="lg:col-span-7 p-6 md:p-8 space-y-5 border-accent">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="online">$14,997 Total Value Stack</Badge>
              <span className="font-mono text-xs text-muted">Capped group for direct troubleshooting</span>
            </div>

            <ul className="space-y-2.5 text-sm text-fg border-b border-border pb-4">
              {VALUE_STACK.map(v => (
                <li key={v.item} className="flex items-start justify-between gap-4">
                  <span>✓ {v.item}</span>
                  <span className="font-mono text-xs font-semibold text-accent shrink-0">
                    {v.val}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-extrabold text-fg">$5,997</span>
              <span className="text-sm text-muted line-through">$8,997 Standard Tuition</span>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-fg leading-relaxed">
              <strong className="text-online">14-Day Live-System Guarantee:</strong> Have at least 2
              AI workflows live and saving 8+ hrs/week inside your business by Day 14, or we keep
              coaching your operator free until they run. (Starting with a $1,500 48-Hour AI
              Blueprint? 100% of that $1,500 credits directly toward enrollment.)
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="primary" size="lg" href={SITE_CONFIG.cal.acceleratorFounding}>
                Enroll Now + Claim Free Operator Seat ($5,997) →
              </Button>
              <Button variant="outline" size="lg" href={SITE_CONFIG.cal.scoping}>
                Book a 15-Min Fit Call
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-5 p-6 md:p-8 bg-surface flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Want Us to Just Build It For You Instead?
              </p>
              <h2 className="text-xl font-bold text-fg">30-Day Bespoke AI Automation Build</h2>
              <p className="text-sm text-muted leading-relaxed">
                If you would rather skip classes altogether and have Sophia custom-engineer 3 to 6
                AI workflows directly inside your company ($12,500 to $25,000) or run a private
                on-site day for 10 to 100+ staff, explore our Bespoke Builds.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="md" href="/work-with-me">
                See Bespoke Builds ($12.5K+) →
              </Button>
              <Button variant="outline" size="md" href={SITE_CONFIG.cal.speaking}>
                Scope a Private Team Day
              </Button>
            </div>
          </Card>
        </section>

        <LdReimbursementCard />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-fg">Program &amp; Guarantee FAQ</h2>
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

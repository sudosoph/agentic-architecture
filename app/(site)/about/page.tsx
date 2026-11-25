import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'About Sophia Stein',
  description:
    'AI Systems Architect, Educator & Advisor in Boulder, CO. Columbia CS, ex-McKinsey, AI Systems & Enablement at Google (personal capacity, views my own), and Women Who Code speaker.',
}

const CREDENTIAL_CARDS = [
  {
    label: 'Enterprise AI & Enablement',
    title: 'AI Systems & Enablement at Google',
    detail:
      'Leading extensive internal AI enablement trainings and co-inventing a patent-pending AI engineering system. All writing, teaching, and advising on this site are in a personal capacity, views my own.',
  },
  {
    label: 'Executive Strategy & Transformation',
    title: 'Ex-McKinsey & Company',
    detail:
      'Advised Fortune 500 technology and healthcare organizations on high-ROI operational workflows, executive enablement, and measurable adoption across hundreds of business leaders.',
  },
  {
    label: 'Computer Science Foundation',
    title: 'Columbia University (B.S. in CS)',
    detail:
      'Trained in systems engineering and machine learning fundamentals, translating complex technical architecture into plain-English workflows any operator can run.',
  },
  {
    label: 'Live Teaching & Keynotes',
    title: 'Boulder Startup Week & Women Who Code',
    detail:
      'Trained 300+ founders, executives, and builders live at Boulder Startup Week and spoke for Women Who Code on practical AI systems and sovereign infrastructure.',
  },
]

const PILLARS = [
  {
    step: '01',
    title: 'Systems Over Chatting',
    body: 'Prompting from a blank box every morning wastes hours. A 1-page Brand Brain plus three connected workflows turns AI from a novelty into reliable weekly output.',
  },
  {
    step: '02',
    title: 'Plain English for Business Leaders',
    body: 'Founders, COOs, and department heads do not need jargon. Every workshop and playbook focuses on hours saved, quality gates, and clear unit economics.',
  },
  {
    step: '03',
    title: 'Own Your Data & Infrastructure',
    body: 'Your prompts, SOPs, customer context, and private workflows should live in portable files and infrastructure you control rather than locked vendor silos.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Boulder, CO · Practitioner, Educator & Advisor"
        title="About Sophia Stein"
        description="I help business owners, leadership teams, and builders turn AI into calm, repeatable workflows that save real hours and protect your data."
      />

      {/* Intro + Quick Actions */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4 text-base text-muted leading-relaxed">
          <p className="text-fg font-medium text-lg leading-relaxed">
            Most organizations sit at one of two extremes with AI: either pasting one-off prompts
            into chat windows with inconsistent results, or over-engineering fragile multi-agent
            science projects that nobody on the team actually uses.
          </p>
          <p>
            My work bridges rigorous systems engineering and boardroom-clear business execution.
            Across Columbia Computer Science, McKinsey enterprise engagements, leading internal AI
            trainings, and teaching 300+ operators in Boulder, I focus on the practical middle:
            documenting your Brand Brain, automating the 20% of tasks that eat 80% of your week, and
            keeping your stack lean and sovereign.
          </p>
          <p className="text-xs text-muted bg-surface border border-border rounded-lg p-3.5">
            Note: I work in AI Systems & Enablement at Google. Everything published, taught, and
            advised through Agentic Architect is done strictly in my personal capacity; all views
            and materials are my own.
          </p>
        </div>

        <Card className="lg:col-span-5 p-6 space-y-4 bg-surface">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Work Together
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start justify-between gap-3 pb-3 border-b border-border">
              <div>
                <p className="font-semibold text-fg">Free 60-Min Live Masterclass</p>
                <p className="text-xs text-muted">Build your Brand Brain & first workflows</p>
              </div>
              <Link href="/masterclass" className="text-xs font-semibold text-accent shrink-0 hover:underline">
                Register →
              </Link>
            </li>
            <li className="flex items-start justify-between gap-3 pb-3 border-b border-border">
              <div>
                <p className="font-semibold text-fg">Agentic Business Accelerator</p>
                <p className="text-xs text-muted">8-week cohort for founders & ops leads</p>
              </div>
              <Link href="/accelerator" className="text-xs font-semibold text-accent shrink-0 hover:underline">
                Details →
              </Link>
            </li>
            <li className="flex items-start justify-between gap-3 pb-3 border-b border-border">
              <div>
                <p className="font-semibold text-fg">Corporate Workshops & University</p>
                <p className="text-xs text-muted">Team intensives, keynotes & syllabi</p>
              </div>
              <Link href="/teaching" className="text-xs font-semibold text-accent shrink-0 hover:underline">
                Portfolio →
              </Link>
            </li>
            <li className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-fg">1:1 Workflow Audits & Advisory</p>
                <p className="text-xs text-muted">Direct sessions booked via Cal.com</p>
              </div>
              <Link href="/work-with-me" className="text-xs font-semibold text-accent shrink-0 hover:underline">
                Book →
              </Link>
            </li>
          </ul>
        </Card>
      </section>

      {/* Scannable Credential Bento */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Background & Track Record
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-fg mt-1">
            Built Across Engineering, Strategy & Live Classrooms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CREDENTIAL_CARDS.map(item => (
            <Card key={item.title} className="p-6 space-y-2">
              <p className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                {item.label}
              </p>
              <h3 className="text-lg font-bold text-fg">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Operating Principles */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold tracking-tight text-fg">How I Teach and Build</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map(p => (
            <div key={p.step} className="rounded-xl border border-border bg-white p-6 space-y-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 font-mono text-xs font-bold text-accent">
                {p.step}
              </span>
              <h3 className="text-base font-bold text-fg">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Contact Strip */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-fg">Invite Sophia to Speak, Teach, or Advise</h2>
          <p className="text-sm text-muted">
            Based in Boulder and Denver, available nationwide and remotely for corporate workshops,
            keynotes, and university courses.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button variant="primary" size="md" href={SITE_CONFIG.cal.speaking}>
            Book Speaking / Workshop Intake
          </Button>
          <Button variant="outline" size="md" href="/contact">
            Send a Message
          </Button>
        </div>
      </section>

      <NewsletterSignup source="about" />
    </div>
  )
}

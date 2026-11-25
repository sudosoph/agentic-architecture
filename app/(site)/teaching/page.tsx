import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Speaking, Corporate Workshops & University Teaching',
  description:
    'Keynotes, executive AI workshops, and university courses taught by Sophia Stein. 300+ trained at Boulder Startup Week, Women Who Code speaker, Columbia CS, ex-McKinsey.',
  alternates: { canonical: '/teaching' },
}

const KEYNOTES = [
  {
    audience: 'Founders, Leadership & Non-Technical Teams',
    title: 'From Chatting to Systems: Practical AI Enablement for Non-Technical Teams',
    takeaway:
      'Moves organizations beyond ad-hoc prompting into standardized SOP rules, scored task roadmaps, and human-approved operational workflows.',
  },
  {
    audience: 'Executives, COOs & Engineering/Product Leads',
    title: 'Choosing What Ships: AI Cost Control, Model Strategy, and Measurable ROI',
    takeaway:
      'A plain-English unit-economics playbook for routing 90% of routine tasks to fast, low-cost setups while reserving frontier budgets for high-stakes reasoning.',
  },
  {
    audience: 'Regulated Organizations, Healthcare & Technical Teams',
    title: 'Sovereign AI for Organizations: Private Infrastructure and Human-in-the-Loop Governance',
    takeaway:
      'How modern teams protect customer data, design audit trails, and run private AI workloads without vendor lock-in.',
  },
]

const SYLLABI = [
  {
    school: 'University of Colorado Boulder · Leeds School of Business / Deming Center',
    code: 'Graduate & Undergraduate Seminar · 8 or 15 Weeks',
    title: 'Applied AI Workflows, Unit Economics & Governance for Business Leaders',
    summary:
      'Hands-on business school course equipping future founders, product managers, and operators to audit company processes, build no-code/low-code AI workflows, quantify labor and software ROI, and establish responsible human-in-the-loop governance.',
    modules: [
      'Weeks 1 to 3: The 20/80 Task Decomposition Framework & Portable Brand/Org Context',
      'Weeks 4 to 7: Automating Revenue, Research, and Operations Without Writing Software',
      'Weeks 8 to 11: AI Unit Economics, Vendor Lock-In, Data Privacy & Compliance Gates',
      'Weeks 12 to 15: Live Partner Company Workflow Audit & Measurable ROI Capstone',
    ],
  },
  {
    school: 'University of Colorado Boulder · ATLAS Institute & Computer Science',
    code: 'Technical Studio & Systems Lab · 15 Weeks',
    title: 'Architecting Practical & Sovereign Agentic Systems',
    summary:
      'Studio engineering course where students design, instrument, and evaluate production agent loops across structured tool protocols, evaluation harnesses, cost cascades, and private local-first hardware.',
    modules: [
      'Weeks 1 to 4: Structured Outputs, Tool Protocols (MCP), and State Machines Over Fragile Chains',
      'Weeks 5 to 8: Evaluation Harnesses, Prompt Caching, and Multi-Tier Cost Routing',
      'Weeks 9 to 12: Private & Local-First Inference, Encrypted Mesh Access, and Sandboxing',
      'Weeks 13 to 15: Open-Source Production Agent Deployment & Live Failure-Mode Red-Teaming',
    ],
  },
]

export default function TeachingPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        meta="Keynotes · Corporate L&D · University Courses"
        title="Speaking & Teaching"
        description="Practical, high-energy AI workshops, keynotes, and university curricula built for business leaders, operators, and builders."
      />

      {/* Proof Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-surface space-y-1">
          <p className="text-2xl font-extrabold text-accent">300+</p>
          <p className="text-xs font-semibold text-fg">Founders &amp; Operators Trained Live</p>
          <p className="text-xs text-muted">Standing-room Boulder Startup Week workshop</p>
        </Card>
        <Card className="p-5 bg-surface space-y-1">
          <p className="text-2xl font-extrabold text-online">79 NPS</p>
          <p className="text-xs font-semibold text-fg">Executive &amp; Corporate Enablement</p>
          <p className="text-xs text-muted">Ex-McKinsey, 250+ enterprise &amp; healthcare leads</p>
        </Card>
        <Card className="p-5 bg-surface space-y-1">
          <p className="text-2xl font-extrabold text-fg">Women Who Code</p>
          <p className="text-xs font-semibold text-fg">Featured Technical Speaker</p>
          <p className="text-xs text-muted">Plus Columbia University B.S. in Computer Science</p>
        </Card>
        <Card className="p-5 bg-surface space-y-1">
          <p className="text-2xl font-extrabold text-rig">AI Patent*</p>
          <p className="text-xs font-semibold text-fg">Internal Trainings &amp; Systems</p>
          <p className="text-xs text-muted">AI Systems &amp; Enablement at Google (personal capacity)</p>
        </Card>
      </section>

      {/* Signature Keynotes & Corporate Workshops */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Conferences &amp; Corporate Teams
            </p>
            <h2 className="text-2xl font-bold text-fg mt-1">
              Signature Keynotes &amp; Team Intensives
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button variant="primary" size="md" href={SITE_CONFIG.cal.speaking}>
              Book Speaking / Workshop Intake →
            </Button>
            <a
              href="/downloads/corporate-ai-workshop-sheet.md"
              download
              className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-fg hover:border-accent hover:text-accent transition-colors"
            >
              1-Page Speaker &amp; L&amp;D Sheet ↓
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {KEYNOTES.map(talk => (
            <Card key={talk.title} className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <Badge variant="tag">{talk.audience}</Badge>
                <h3 className="text-lg font-bold text-fg leading-snug">{talk.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{talk.takeaway}</p>
              </div>
              <p className="font-mono text-xs text-accent pt-3 border-t border-border">
                Available as 45-min keynote or half/full-day hands-on lab
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* University Syllabi (CU Boulder) */}
      <section id="university" className="space-y-5 scroll-mt-20">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-online">
            Academic &amp; University Portfolio
          </p>
          <h2 className="text-2xl font-bold text-fg mt-1">
            University Courses &amp; Guest Lectures (CU Boulder &amp; Partner Campuses)
          </h2>
          <p className="text-sm text-muted mt-1 max-w-3xl leading-relaxed">
            Based in Boulder, I design and teach applied syllabi bridging business ROI and real
            systems architecture, backed by open-source lab repos students can run on day one.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SYLLABI.map(course => (
            <Card key={course.title} className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="font-mono text-xs font-semibold text-accent">{course.school}</p>
                <h3 className="text-lg font-bold text-fg">{course.title}</h3>
                <p className="font-mono text-xs text-muted">{course.code}</p>
              </div>
              <p className="text-sm text-muted leading-relaxed">{course.summary}</p>
              <ul className="space-y-1.5 text-xs text-fg bg-surface rounded-lg p-4 border border-border">
                {course.modules.map(m => (
                  <li key={m}>• {m}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-fg">
              Inspect a Full Open-Source Workshop Curriculum
            </h3>
            <p className="text-sm text-muted">
              Browse the complete slide deck, 17-step lab tutorial, and forkable handouts from my
              Boulder Startup Week session at{' '}
              <Link href="/bsw" className="text-accent font-medium hover:underline">
                /bsw
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button
              variant="primary"
              size="md"
              href="/contact?subject=CU%20Boulder%20Teaching%20or%20Speaking%20Inquiry"
            >
              Invite to Teach or Guest Lecture
            </Button>
            <Button variant="outline" size="md" href="/bsw">
              Open BSW Lab Materials →
            </Button>
          </div>
        </Card>
      </section>

      <p className="text-xs text-muted border-t border-border pt-6">
        *Personal-capacity note: Sophia works in AI Systems &amp; Enablement at Google, where she has
        led extensive internal AI trainings and co-invented a patent-pending AI system. All external
        speaking, university teaching, and advisory engagements are conducted strictly in her
        personal capacity, views her own.
      </p>
    </div>
  )
}

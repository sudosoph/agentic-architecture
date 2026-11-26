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
    'Keynotes, executive AI workshops, and applied university curricula taught by Sophia Stein. 300+ founders and operators trained live at Boulder Startup Week, Women Who Code speaker.',
  alternates: { canonical: '/teaching' },
}

const KEYNOTES = [
  {
    audience: 'Conferences, Offsites & Cross-Functional Leadership',
    title: 'From Chat Windows to Operating Systems: How High-Output Teams Actually Work With AI',
    takeaway:
      'Why one-line prompts manufacture generic output, and how portable folder context, structured intake skills, and draft-first review loops turn AI into dependable operational leverage.',
  },
  {
    audience: 'Executives, COOs, CMOs, CFOs & General Counsel',
    title: 'Vertical AI vs. Connected Harnesses: Build-vs-Buy Across Marketing, Finance, Legal & Ops',
    takeaway:
      'A vendor-neutral framework separating category-defining vertical platforms worth buying from thin SaaS wrappers your organization should replace with lightweight, owned primitives.',
  },
  {
    audience: 'CTOs, Regulated Practices & Engineering Organizations',
    title: 'Smart Model Routing, Private Open-Weights & Deterministic Verification',
    takeaway:
      'How technical and regulated teams combine zero-retention frontier APIs, open-weight workhorses, 25-case evaluation suites, and scoped MCP tool permissions without vendor lock-in.',
  },
]

const SYLLABI = [
  {
    school: 'University of Colorado Boulder · Leeds School of Business / Executive Education',
    code: 'Graduate & Undergraduate Seminar · 8 or 15 Weeks',
    title: 'Applied AI Workflows, Unit Economics & Governance for Business Leaders',
    summary:
      'Hands-on seminar equipping future founders, product leaders, and operators to decompose organizational bottlenecks, build no-code/low-code AI workflows, model software and inference unit economics, and establish human-in-the-loop governance.',
    modules: [
      'Weeks 1 to 3: The 20/80 Task Decomposition Rubric & Portable Organizational Context',
      'Weeks 4 to 7: Designing Research, Intake, and Operations Workflows Without Code',
      'Weeks 8 to 11: AI Unit Economics, Vendor Lock-In, Data Privacy & Compliance Gates',
      'Weeks 12 to 15: Partner Organization Workflow Audit & Measurable Throughput Capstone',
    ],
  },
  {
    school: 'University of Colorado Boulder · ATLAS Institute & Computer Science',
    code: 'Technical Studio & Systems Lab · 15 Weeks',
    title: 'Architecting Practical & Sovereign Agentic Systems',
    summary:
      'Studio engineering course where students design, instrument, and evaluate production agent loops across structured tool protocols, evaluation harnesses, tiered model routing, and private local-first compute.',
    modules: [
      'Weeks 1 to 4: Structured Outputs, Tool Protocols (MCP), and State Machines Over Fragile Chains',
      'Weeks 5 to 8: Evaluation Harnesses, Prompt Caching, and Multi-Tier Cost Routing',
      'Weeks 9 to 12: Private & Local-First Inference, Encrypted Mesh Access, and Sandboxing',
      'Weeks 13 to 15: Open-Source Agent Deployment & Live Failure-Mode Red-Teaming',
    ],
  },
]

export default function TeachingPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        meta="Keynotes · Corporate Enablement · University Curricula"
        title="Speaking & Teaching"
        description="Clear, practical keynotes, hands-on leadership intensives, and university courses built for executives, operators, and technical builders."
      />

      {/* Clean Community & Classroom Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 space-y-1">
          <p className="font-serif text-2xl text-fg tabular-nums">300+ Trained Live</p>
          <p className="text-xs font-medium text-fg">Boulder Startup Week</p>
          <p className="text-xs text-muted">Standing-room hands-on workflow build lab</p>
        </Card>
        <Card className="p-5 space-y-1">
          <p className="font-serif text-2xl text-fg">Women Who Code</p>
          <p className="text-xs font-medium text-fg">Featured Technical Speaker</p>
          <p className="text-xs text-muted">Practical systems engineering &amp; applied AI talks</p>
        </Card>
        <Card className="p-5 space-y-1">
          <p className="font-serif text-2xl text-fg">Open Lab Syllabi</p>
          <p className="text-xs font-medium text-fg">Executive Education &amp; Campus Studios</p>
          <p className="text-xs text-muted">Reproducible decks, handouts, and benchmark suites</p>
        </Card>
      </section>

      {/* Signature Keynotes & Corporate Workshops */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-muted">Conferences &amp; Corporate Teams</p>
            <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
              Signature keynotes &amp; department intensives
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button variant="primary" size="md" href={SITE_CONFIG.cal.speaking}>
              Inquire About Speaking or Workshops
            </Button>
            <a
              href="/downloads/corporate-ai-workshop-sheet.md"
              download
              className="press-scale inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-fg hover:border-fg/45"
            >
              Download Speaker &amp; Workshop Sheet
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {KEYNOTES.map(talk => (
            <Card key={talk.title} className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <Badge variant="tag">{talk.audience}</Badge>
                <h3 className="font-serif text-xl font-normal text-fg leading-snug">
                  {talk.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{talk.takeaway}</p>
              </div>
              <p className="text-xs text-muted pt-3 border-t border-border">
                Available as a 45-minute keynote or hands-on half/full-day team lab
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* University Syllabi & Executive Education */}
      <section id="university" className="space-y-5 scroll-mt-20">
        <div>
          <p className="text-xs font-medium text-muted">
            Executive Education &amp; University Portfolio
          </p>
          <h2 className="font-serif text-3xl font-normal tracking-[-0.02em] text-fg mt-1">
            Executive Education &amp; University Courses (CU Boulder &amp; Partner Campuses)
          </h2>
          <p className="text-sm text-muted mt-1.5 max-w-3xl leading-relaxed">
            Based in Boulder, I lead Executive Education intensives for regional leaders and
            operating partners alongside applied graduate and undergraduate courses backed by
            open-source lab materials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SYLLABI.map(course => (
            <Card key={course.title} className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted">{course.school}</p>
                <h3 className="font-serif text-xl font-normal text-fg">{course.title}</h3>
                <p className="text-xs text-muted">{course.code}</p>
              </div>
              <p className="text-sm text-muted leading-relaxed">{course.summary}</p>
              <ul className="space-y-1.5 text-xs text-fg/90 bg-bg rounded-md p-4 border border-border">
                {course.modules.map(m => (
                  <li key={m}>· {m}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-fg">
              Inspect a complete open-source workshop curriculum
            </h3>
            <p className="text-sm text-muted">
              Browse the slide deck, 17-step lab tutorial, and printable handouts from Boulder
              Startup Week on{' '}
              <Link
                href="/bsw"
                className="text-fg underline underline-offset-3 decoration-border"
              >
                /bsw
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button variant="primary" size="md" href="/contact">
              Invite to Teach or Guest Lecture
            </Button>
            <Button variant="outline" size="md" href="/bsw">
              Open BSW Lab Archive
            </Button>
          </div>
        </Card>
      </section>
    </div>
  )
}

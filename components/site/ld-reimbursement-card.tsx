'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Props {
  programName?: string
  tuitionLabel?: string
}

export function LdReimbursementCard({
  programName = 'The 6-System AI Back-Office Implementation Cohort',
  tuitionLabel = 'From $1,497 (Includes Free Teammate Seat)',
}: Props) {
  const [copied, setCopied] = useState(false)

  const managerTemplate = `Subject: L&D Approval Request: ${programName}

Hi [Manager / Finance Name],

I would like to use my professional development / operations budget to enroll in ${programName} (${tuitionLabel}), led by AI Systems Architect Sophia Stein (Columbia CS, ex-McKinsey, 300+ operators trained at Boulder Startup Week).

Unlike passive video courses, this is a guided implementation program where we build and document six production workflows directly for our team:
1. Shared company operating rules, qualification criteria, and SOP templates
2. Pre-call client research and follow-up automation
3. Draft-first inbox and scheduling triage with human approval gates
4. Proposal, onboarding, and document extraction with cost governance

Reclaiming even 6 hours per week across our team returns more than 300 hours over the next year at a fraction of a $65,000/yr coordinator hire or $20,000 agency retainer.

Full syllabus and invoice details: https://agenticarchitect.ai/accelerator

Happy to share our 90-day workflow roadmap with the rest of the team as we implement. Can I go ahead and register?`

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(managerTemplate)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Card className="p-6 md:p-8 bg-surface space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <Badge variant="accent">Expense to Company L&amp;D or Ops Budget</Badge>
          <h3 className="text-lg font-bold text-fg pt-1">
            Need Manager or Finance Sign-Off? Copy This 30-Second Approval Note
          </h3>
          <p className="text-xs text-muted">
            Stripe receipts from Agentic Architecture LLC include itemized business training documentation for corporate L&amp;D reimbursement or tax deduction.
          </p>
        </div>
        <button
          type="button"
          onClick={copyEmail}
          className="rounded-lg bg-accent text-white px-4 py-2.5 text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer shrink-0"
        >
          {copied ? 'Copied L&D Email ✓' : 'Copy L&D Approval Email'}
        </button>
      </div>

      <pre className="rounded-xl border border-border bg-white p-4 text-xs font-mono text-muted overflow-x-auto leading-relaxed max-h-56">
        {managerTemplate}
      </pre>
    </Card>
  )
}

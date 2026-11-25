'use client'

import { useState } from 'react'

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(8)
  const [hoursPerWeek, setHoursPerWeek] = useState(6)

  const monthlyHoursReclaimed = Math.round(teamSize * hoursPerWeek * 4.33 * 0.75)
  const monthlyValueSaved = monthlyHoursReclaimed * 65
  const annualValueSaved = monthlyValueSaved * 12

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 font-mono text-xs font-semibold text-emerald-700 mb-2">
              Hiring vs. AI Workflow Math
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-fg">
              Estimate What Repetitive Busywork Costs Your Team
            </h2>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              Before hiring a $65,000/yr ops or marketing coordinator, see how many hours structured
              AI workflows can reclaim across inbox triage, follow-ups, reporting, and content.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-semibold text-fg mb-1.5">
                <label htmlFor="roi-team-size">Team size</label>
                <span className="font-mono text-accent">{teamSize} people</span>
              </div>
              <input
                id="roi-team-size"
                aria-label="Team size"
                type="range"
                min={1}
                max={50}
                value={teamSize}
                onChange={e => setTeamSize(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-fg mb-1.5">
                <label htmlFor="roi-hours-week">Repetitive admin/content hours per person/week</label>
                <span className="font-mono text-accent">{hoursPerWeek} hrs/wk</span>
              </div>
              <input
                id="roi-hours-week"
                aria-label="Repetitive admin/content hours per person/week"
                type="range"
                min={2}
                max={25}
                value={hoursPerWeek}
                onChange={e => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-xl border border-border bg-white p-6 space-y-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              Estimated Monthly Hours Reclaimed (75% Automation)
            </p>
            <p
              data-testid="roi-hours"
              className="text-3xl md:text-4xl font-bold tracking-tight text-accent mt-1"
            >
              {monthlyHoursReclaimed} hrs/mo
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted">Monthly capacity value</p>
              <p className="text-lg font-bold text-fg">${monthlyValueSaved.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Annualized impact</p>
              <p className="text-lg font-bold text-emerald-700">
                ${annualValueSaved.toLocaleString()}/yr
              </p>
            </div>
          </div>

          <p className="text-xs text-muted leading-relaxed pt-2 border-t border-border">
            Compare against a single $65,000/yr junior coordinator plus payroll taxes and ramp time.
          </p>
        </div>
      </div>
    </section>
  )
}

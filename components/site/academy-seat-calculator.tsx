'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const BASE_PRICE = 297
const EXTRA_SEAT_PRICE = 97
const MAX_EXTRA_SEATS = 50

export function AcademySeatCalculator() {
  const [extraSeats, setExtraSeats] = useState(0)

  function handleSeatsChange(raw: string) {
    const parsed = Number.parseInt(raw, 10)
    if (Number.isNaN(parsed) || parsed <= 0) {
      setExtraSeats(0)
      return
    }
    setExtraSeats(Math.min(MAX_EXTRA_SEATS, parsed))
  }

  const totalPrice = BASE_PRICE + extraSeats * EXTRA_SEAT_PRICE
  const formattedTotal = `$${totalPrice.toLocaleString('en-US')}`
  const totalSeats = 1 + extraSeats

  return (
    <Card className="p-6 md:p-8 border-accent bg-surface space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant="online">One-Time Payment · Lifetime Access</Badge>
        <span className="font-mono text-xs text-muted">+$97 per additional team seat</span>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-fg">Owner + Team Seat Enrollment</h3>
        <p className="text-xs text-muted leading-relaxed">
          Start solo for $297, or add seats for your Executive Assistant, Ops Manager, or
          department leads so they wire and maintain the workflows for you.
        </p>
      </div>

      <div className="space-y-2 rounded-xl border border-border bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="academy-extra-seats" className="text-xs font-semibold text-fg">
            Additional team seats (+$97 each)
          </label>
          <input
            id="academy-extra-seats"
            aria-label="Additional team seats"
            type="number"
            min={0}
            max={MAX_EXTRA_SEATS}
            value={extraSeats}
            onChange={e => handleSeatsChange(e.target.value)}
            className="w-24 rounded-lg border border-border bg-surface px-3 py-1.5 text-right font-mono text-sm font-bold text-fg focus:border-accent focus:outline-none"
          />
        </div>
        <p className="font-mono text-[11px] text-muted">
          Includes {totalSeats} {totalSeats === 1 ? 'seat (just you)' : `total seats (you + ${extraSeats} team)`}
        </p>
      </div>

      <div className="flex items-baseline justify-between border-t border-border pt-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted font-mono">
          Total Investment
        </span>
        <span data-testid="academy-total-price" className="text-3xl font-extrabold text-fg">
          {formattedTotal}
        </span>
      </div>

      <ul className="space-y-2 text-xs text-fg">
        <li>✓ All 5 practitioner modules in Curriculum 01 (under 4 hours total)</li>
        <li>✓ Copy-paste SKILL.md interview harnesses, privacy matrices &amp; checklists</li>
        <li>✓ L&amp;D stipend reimbursement template + alumni community invite</li>
        <li>✓ 100% of your $297 credited within 60 days toward Cohorts, Corporate Labs, or Builds</li>
      </ul>

      <div className="flex flex-col gap-2.5 pt-1">
        {extraSeats === 0 ? (
          <Button variant="primary" size="lg" href={SITE_CONFIG.cal.academy}>
            Enroll Now ({formattedTotal}) →
          </Button>
        ) : (
          <>
            <Button
              variant="primary"
              size="lg"
              href={`/contact?subject=${encodeURIComponent(`AI Workflow Academy Team Invoice (${totalSeats} Seats - ${formattedTotal})`)}`}
            >
              Request Team Invoice ({formattedTotal}) →
            </Button>
            <a
              href={SITE_CONFIG.cal.academy}
              className="text-center font-mono text-[11px] font-semibold text-accent hover:underline"
            >
              Or enroll 1 owner seat ($297) instantly via Stripe →
            </a>
          </>
        )}
        <Button variant="outline" size="md" href="/masterclass">
          Try the Free 60-Min Live Build First
        </Button>
      </div>
    </Card>
  )
}

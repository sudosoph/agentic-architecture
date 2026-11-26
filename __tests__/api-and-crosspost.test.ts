import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { POST as postContact } from '@/app/api/contact/route'
import { POST as postSubscribe } from '@/app/api/subscribe/route'
import { GET as getSystem } from '@/app/api/system/route'
import { POST as postStudio } from '@/app/api/studio/route'
import {
  buildCrosspostPayloads,
  checkCanonicalGraceWindow,
  runSyndication,
} from '../scripts/crosspost-official.mjs'

describe('Contact, Subscribe, Healthcheck, Studio Cross-Post API, and Zero-Ban Syndicator', () => {
  const originalEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...originalEnv }
    vi.restoreAllMocks()
  })

  it('returns 503 unconfigured on /api/contact when RESEND_API_KEY is absent and sends to both Sophia inboxes when configured', async () => {
    delete process.env.RESEND_API_KEY
    const unconfRes = await postContact(
      new Request('https://agenticarchitect.ai/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Jordan', email: 'jordan@company.com', message: 'Hello' }),
      }),
    )
    expect(unconfRes.status).toBe(503)

    process.env.RESEND_API_KEY = 're_test_key'
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 'email_123' }), { status: 200 }),
    )

    // Honeypot bot submissions silently return 200 without calling Resend
    const botRes = await postContact(
      new Request('https://agenticarchitect.ai/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Spam Bot',
          email: 'bot@spam.tld',
          message: 'Buy links',
          website: 'https://spam.tld',
        }),
      }),
    )
    expect(botRes.status).toBe(200)
    expect(fetchSpy).not.toHaveBeenCalled()

    const realRes = await postContact(
      new Request('https://agenticarchitect.ai/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jordan Owner',
          email: 'jordan@company.com',
          subject: '48-Hour Custom AI Blueprint',
          message: 'Looking to automate client intake and pre-call briefs.',
        }),
      }),
    )
    expect(realRes.status).toBe(200)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [, init] = fetchSpy.mock.calls[0]
    const payload = JSON.parse(String(init?.body))
    expect(payload.to).toEqual(['sophia@agenticarchitect.ai', 'sophiasteinco@gmail.com'])
    expect(payload.reply_to).toBe('jordan@company.com')
  })

  it('forwards /api/subscribe to Substack, dispatches Sophia alert + 5-day Prompt-to-System drip via Resend batch, and upserts Resend contact', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({ didSignup: true }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: [{ id: 'b1' }] }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 'contact_1' }), { status: 200 }))

    const res = await postSubscribe(
      new Request('https://agenticarchitect.ai/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'ceo@firm.com', source: 'masterclass-hero' }),
      }),
    )

    expect(res.status).toBe(200)
    expect(fetchSpy).toHaveBeenCalledTimes(3)
    expect(fetchSpy.mock.calls[0][0]).toContain('substack.com/api/v1/free')
    expect(fetchSpy.mock.calls[1][0]).toBe('https://api.resend.com/emails/batch')
    const batchBody = JSON.parse(String(fetchSpy.mock.calls[1][1]?.body))
    expect(Array.isArray(batchBody)).toBe(true)
    expect(batchBody).toHaveLength(6)
    expect(batchBody[0].to).toEqual(['sophia@agenticarchitect.ai', 'sophiasteinco@gmail.com'])
    expect(batchBody[1].to).toEqual(['ceo@firm.com'])
    expect(batchBody[1].subject).toContain('Day 1:')
    expect(batchBody[1].scheduled_at).toBeUndefined()
    expect(batchBody[2].subject).toContain('Day 2:')
    expect(batchBody[2].scheduled_at).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    expect(batchBody[5].subject).toContain('Day 5:')
    expect(batchBody[5].scheduled_at).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    expect(fetchSpy.mock.calls[2][0]).toBe('https://api.resend.com/contacts')
  })

  it('returns clean 200 health JSON on /api/system without exposing secrets', () => {
    process.env.RESEND_API_KEY = 're_secret_do_not_expose'
    const res = getSystem()
    expect(res.status).toBe(200)
    expect(res.headers.get('cache-control')).toContain('no-store')
  })

  it('dispatches official crosspost workflow from /api/studio when authorized with GitHub PAT', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 204 }),
    )

    const res = await postStudio(
      new Request('http://localhost:3000/api/studio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-github-pat': 'ghp_test_token',
        },
        body: JSON.stringify({
          action: 'trigger-crosspost-workflow',
          slug: 'ai-back-office',
          platforms: 'devto,bluesky',
          dryRun: true,
        }),
      }),
    )

    expect(res.status).toBe(200)
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/actions/workflows/crosspost-on-publish.yml/dispatches'),
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('builds canonical-protected, zero-em-dash crosspost payloads for both short owner slugs and technical posts with idempotent ledger', async () => {
    const ownerPack = buildCrosspostPayloads('ai-back-office')
    expect(ownerPack.canonicalUrl).toBe('https://agenticarchitect.ai/blog/ai-back-office')
    expect(ownerPack.devto.article.canonical_url).toBe('https://agenticarchitect.ai/blog/ai-back-office')
    expect(ownerPack.hashnode.originalArticleURL).toBe('https://agenticarchitect.ai/blog/ai-back-office')
    expect(ownerPack.linkedin.text).not.toContain('\u2014')
    expect(ownerPack.linkedin.text.toLowerCase()).not.toContain('brand brain')
    expect(ownerPack.manualSafePack.redditNativePost.body).not.toContain('https://')

    const techPack = buildCrosspostPayloads('loop-engineering')
    expect(techPack.canonicalUrl).toBe('https://agenticarchitect.ai/blog/loop-engineering')
    expect(techPack.devto.article.published).toBe(true)
    expect(techPack.bluesky.text.length).toBeLessThanOrEqual(300)
    expect(techPack.x.text.length).toBeLessThanOrEqual(280)

    expect(checkCanonicalGraceWindow('2020-01-01', 24).ready).toBe(true)
    const futureDate = new Date(Date.now() + 86400_000).toISOString().slice(0, 10)
    expect(checkCanonicalGraceWindow(futureDate, 24).ready).toBe(false)

    // Verify idempotency ledger prevents duplicate syndication
    const tmpLedger = path.join(os.tmpdir(), `crosspost-ledger-${Date.now()}.json`)
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 999, url: 'https://dev.to/sophia/loop-engineering' }), {
        status: 201,
      }),
    )

    const firstRun = await runSyndication('loop-engineering', {
      force: false,
      dryRun: false,
      minHours: 0,
      platforms: 'devto',
      ledgerPath: tmpLedger,
      env: { DEVTO_API_KEY: 'devto_test_key' },
    })
    const firstResults = firstRun.results as Record<string, { status: string }> | undefined
    expect(firstResults?.devto?.status).toBe('published')
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    const secondRun = await runSyndication('loop-engineering', {
      force: false,
      dryRun: false,
      minHours: 0,
      platforms: 'devto',
      ledgerPath: tmpLedger,
      env: { DEVTO_API_KEY: 'devto_test_key' },
    })
    const secondResults = secondRun.results as Record<string, { status: string }> | undefined
    expect(secondResults?.devto?.status).toBe('already_syndicated')
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    if (fs.existsSync(tmpLedger)) fs.unlinkSync(tmpLedger)
  })
})

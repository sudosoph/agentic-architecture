import { describe, it, expect, vi } from 'vitest'
import {
  CURATED_BUYER_SUBSTACKS,
  classifySubstackInteraction,
  parseRssLatestItem,
  fetchFreshBuyerThreads,
} from '../scripts/substack-buyer-radar.mjs'

describe('Substack Buyer-Room Radar & Bot-vs-Buyer Interaction Classifier', () => {
  it('maintains balanced non-competing buyer Substacks across Non-Technical Owners and Fractional CAIO/CTO tracks free of em-dashes', () => {
    const ownerPubs = CURATED_BUYER_SUBSTACKS.filter(p => p.audience === 'non-technical-owners')
    const execPubs = CURATED_BUYER_SUBSTACKS.filter(p => p.audience === 'fractional-caio-cto')
    expect(ownerPubs.length).toBeGreaterThanOrEqual(4)
    expect(execPubs.length).toBeGreaterThanOrEqual(4)

    for (const pub of CURATED_BUYER_SUBSTACKS) {
      expect(pub.commentAngle).not.toContain('\u2014')
      expect(pub.commentAngle.toLowerCase()).not.toContain('voice.md')
    }
  })

  it('accurately separates 5-second cron AI brand bots from real Executive / Business Owner buyers', () => {
    const botVerdict = classifySubstackInteraction({
      commenterName: 'Tamara Ashworth',
      commentBody:
        'Treating an agent like a new employee keeps workflows owned. Which of the six would you keep a sign-off on?',
      bio: 'AI does the work. You own the assets. AI for operators.',
      commentTimestampIso: '2026-11-25T19:35:30.157Z',
      likeTimestampIso: '2026-11-25T19:35:35.000Z',
      recentNotesIn24h: 11,
    })
    expect(botVerdict.classification).toBe('PEER_AI_BRAND_AGENT')
    expect(botVerdict.recommendedAction).not.toContain('\u2014')

    const buyerVerdict = classifySubstackInteraction({
      commenterName: 'Elena Vance',
      commentBody:
        'We run a 35-person dental group in Denver and are debating whether to build pre-call intake triage internally or bring in fractional oversight.',
      bio: 'COO at Front Range Dental Group',
      commentTimestampIso: '2026-11-25T18:10:00.000Z',
      likeTimestampIso: '2026-11-25T18:14:20.000Z',
      recentNotesIn24h: 0,
    })
    expect(buyerVerdict.classification).toBe('HIGH_VALUE_BUYER_OR_PARTNER')
    expect(buyerVerdict.recommendedAction).not.toContain('\u2014')
  })

  it('parses Substack RSS feeds and returns separated Owner + Executive threads for human engagement', async () => {
    const sampleRss = `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0"><channel>
        <item>
          <title><![CDATA[How We Evaluated Back-Office Hiring After Buying an HVAC Business]]></title>
          <link>https://bigdealsmallbusiness.substack.com/p/back-office-hiring</link>
          <pubDate>Wed, 25 Nov 2026 14:00:00 GMT</pubDate>
        </item>
      </channel></rss>`

    const parsed = parseRssLatestItem(sampleRss)
    expect(parsed?.title).toContain('Back-Office Hiring')
    expect(parsed?.link).toBe('https://bigdealsmallbusiness.substack.com/p/back-office-hiring')

    const mockFetch = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response(sampleRss, { status: 200 })),
    )
    const picks = await fetchFreshBuyerThreads({ limitPerAudience: 2, fetchImpl: mockFetch })
    expect(picks['non-technical-owners']).toHaveLength(2)
    expect(picks['fractional-caio-cto']).toHaveLength(2)
  })
})

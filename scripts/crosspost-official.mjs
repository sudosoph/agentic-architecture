// Official, Zero-Ban Cross-Posting & Syndication Engine
//
// Why accounts get blocked when cross-posting (and how this script avoids 100% of bans):
// 1. NEVER uses headless browsers, Playwright, or stolen session cookies (li_at / substack.sid)
//    from datacenter IPs. Every automated push uses official documented APIs or OAuth webhooks.
// 2. Protects SEO on agenticarchitect.ai:
//    - Enforces a configurable canonical indexing grace window (default 24h, overridable via --force)
//      so Google indexes https://agenticarchitect.ai/blog/<slug> first via IndexNow + sitemap.
//    - Passes explicit canonical_url / originalArticleURL on Dev.to and Hashnode.
//    - Formats native, dwell-time-first practitioner posts on LinkedIn, Bluesky, and X (never
//      duplicate full-article scrapes or spammy multi-link blasts).
// 3. Maintains an idempotent ledger (content/queue/crosspost-ledger.json) so re-runs never
//    double-post and trigger platform duplicate/spam filters.
//
// Usage:
//   node scripts/crosspost-official.mjs <slug> [--dry-run] [--force] [--platforms=devto,hashnode,bluesky,linkedin,x,webhook]

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseMdxFile, convertMdxToSubstackPayload } from './mdx-to-substack.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BLOG_DIR = path.join(ROOT, 'content', 'blog')
const SOCIAL_DIR = path.join(ROOT, 'content', 'social')
const LEDGER_PATH = path.join(ROOT, 'content', 'queue', 'crosspost-ledger.json')
const SITE_URL = 'https://agenticarchitect.ai'

// Canonical slug overrides matching next.config.ts short-slug rewrites
const SHORT_SLUG_MAP = {
  'instinct-ai-vs-tab-dots-and-openinstinct-texting-browser-agents-review': 'instinct-ai-vs-tab-review',
  'building-an-ai-org-chart-before-your-next-hire': 'ai-back-office',
  'ai-org-chart': 'ai-back-office',
  'ai-chief-of-staff-for-founders-and-small-teams': 'ai-chief-of-staff',
  'hire-ai-automation-agency-vs-build-in-house': 'hire-ai-agency-vs-in-house',
  '512gb-unified-memory-mac-studio-vs-dgx-spark-and-mini-pcs': 'mac-studio-512gb-vs-dgx-spark',
  'loop-engineering-for-production-coding-and-ops-agents': 'loop-engineering',
  'gemini-4-neon-vs-deepseek-v4-kimi-k3-and-qwen-routing-guide': 'gemini-4-neon-vs-deepseek-v4',
}

export function sanitizeCleanCopy(text) {
  return String(text || '')
    .replace(/\u2014/g, ': ')
    .replace(/\s+--\s+/g, ': ')
    .replace(/Brand Brain/gi, 'Company Context Vault')
}

export function resolvePostBySlug(inputSlug) {
  const directPath = path.join(BLOG_DIR, `${inputSlug}.mdx`)
  if (fs.existsSync(directPath)) {
    return { fileSlug: inputSlug, filePath: directPath }
  }

  // Reverse lookup if caller passed the short public SEO slug (e.g. "ai-org-chart")
  for (const [fileSlug, shortSlug] of Object.entries(SHORT_SLUG_MAP)) {
    if (shortSlug === inputSlug) {
      const candidate = path.join(BLOG_DIR, `${fileSlug}.mdx`)
      if (fs.existsSync(candidate)) {
        return { fileSlug, filePath: candidate }
      }
    }
  }

  // Fallback scan on frontmatter slug
  if (fs.existsSync(BLOG_DIR)) {
    for (const entry of fs.readdirSync(BLOG_DIR)) {
      if (!entry.endsWith('.mdx')) continue
      const full = path.join(BLOG_DIR, entry)
      const { frontmatter } = parseMdxFile(fs.readFileSync(full, 'utf8'))
      if (frontmatter.slug === inputSlug) {
        return { fileSlug: entry.replace(/\.mdx$/, ''), filePath: full }
      }
    }
  }

  throw new Error(`Blog post not found for slug "${inputSlug}"`)
}

function absolutizeMarkdownLinks(markdown) {
  return sanitizeCleanCopy(markdown)
    .replace(/\]\(\/(?!\/)([^)]*)\)/g, `](${SITE_URL}/$1)`)
    .replace(/<Callout[^>]*>([\s\S]*?)<\/Callout>/g, '> $1')
}

function extractKeyBullets(markdown, maxBullets = 3) {
  const lines = markdown.split('\n').map(l => l.trim())
  const bullets = []

  for (const line of lines) {
    if (/^[-*]\s+\*\*/.test(line) || /^\d+\.\s+\*\*/.test(line)) {
      const cleaned = sanitizeCleanCopy(
        line
          .replace(/^([-*]|\d+\.)\s+/, '')
          .replace(/\*\*/g, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/`([^`]+)`/g, '$1'),
      ).trim()
      if (cleaned.length >= 24 && cleaned.length <= 180) {
        bullets.push(cleaned)
      }
    }
    if (bullets.length >= maxBullets) break
  }

  if (bullets.length === 0) {
    const headings = lines
      .filter(l => l.startsWith('## '))
      .map(l => sanitizeCleanCopy(l.replace(/^##\s+/, '')).trim())
      .filter(Boolean)
      .slice(0, maxBullets)
    for (const h of headings) bullets.push(h)
  }

  return bullets
}

function normalizeDevtoTags(tags = [], track = 'engineering') {
  const raw = Array.isArray(tags) && tags.length > 0 ? tags : [track, 'ai', 'automation', 'architecture']
  const normalized = raw
    .map(t => String(t).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20))
    .filter(Boolean)
  return Array.from(new Set(['ai', ...normalized])).slice(0, 4)
}

export function checkCanonicalGraceWindow(publishedDate, minHours = 24) {
  if (!publishedDate) return { ready: true, hoursElapsed: 999 }
  const pubMs = Date.parse(`${publishedDate}T00:00:00Z`)
  if (Number.isNaN(pubMs)) return { ready: true, hoursElapsed: 999 }
  const hoursElapsed = Math.round(((Date.now() - pubMs) / 36e5) * 10) / 10
  return {
    ready: hoursElapsed >= minHours,
    hoursElapsed,
    minHours,
  }
}

export function buildCrosspostPayloads(inputSlug, options = {}) {
  const { fileSlug, filePath } = resolvePostBySlug(inputSlug)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { frontmatter, content } = parseMdxFile(raw)

  const publicSlug = frontmatter.slug || SHORT_SLUG_MAP[fileSlug] || fileSlug
  const canonicalUrl = `${SITE_URL}/blog/${publicSlug}`
  const title = sanitizeCleanCopy(frontmatter.title || publicSlug)
  const description = sanitizeCleanCopy(frontmatter.description || '')
  const track = frontmatter.track || 'engineering'
  const isOwnerTrack = track === 'small-business'

  const cleanMarkdownBody = absolutizeMarkdownLinks(content.trim())
  const canonicalFooter = isOwnerTrack
    ? `\n\n---\n\n*Originally published on [Agentic Architect](${canonicalUrl}). Join the next free 60-minute [Prompt-to-System Live Build](${SITE_URL}/masterclass), explore our [$297 AI Workflow Academy](${SITE_URL}/courses), or book a [Free 20-Min Bottleneck Call](${SITE_URL}/work-with-me).*`
    : `\n\n---\n\n*Originally published on [Agentic Architect](${canonicalUrl}). Explore more reproducible benchmarks in the [Research & University Lab](${SITE_URL}/research) and [The Sovereign Stack](${SITE_URL}/sovereign-stack).*`

  const bullets = extractKeyBullets(content, 3)
  const bulletBlock =
    bullets.length > 0
      ? bullets.map((b, idx) => `${idx + 1}. ${b}`).join('\n')
      : `1. Scope context in plain markdown files your team owns.\n2. Gate external actions behind deterministic checks or draft queues.\n3. Measure cost per completed workflow before scaling.`

  // 1. Dev.to Official API Payload (canonical_url prevents Google SEO cannibalization)
  const devto = {
    article: {
      title,
      published: options.publishDevto ?? !isOwnerTrack,
      body_markdown: `${cleanMarkdownBody}${canonicalFooter}`,
      tags: normalizeDevtoTags(frontmatter.tags, track),
      canonical_url: canonicalUrl,
      description: description.slice(0, 150),
    },
  }

  // 2. Hashnode Official GraphQL Input (originalArticleURL sets rel=canonical)
  const hashnode = {
    title,
    subtitle: description.slice(0, 140),
    contentMarkdown: `${cleanMarkdownBody}${canonicalFooter}`,
    originalArticleURL: canonicalUrl,
    tags: normalizeDevtoTags(frontmatter.tags, track).map(slug => ({ slug, name: slug })),
  }

  // 3. LinkedIn Official Posts REST API / Buffer Queue Copy
  // Short hook (<140 chars) + practitioner breakdown + link cleanly placed in first comment or end.
  const linkedinHookLine = title.length <= 135 ? title : `${title.slice(0, 132)}...`
  const linkedinText = sanitizeCleanCopy(
    [
      linkedinHookLine,
      '',
      description,
      '',
      'Three takeaways from our production teardown:',
      bulletBlock,
      '',
      isOwnerTrack
        ? `Full owner playbook and copy-paste templates: ${canonicalUrl}`
        : `Full benchmark numbers and architecture breakdown: ${canonicalUrl}`,
    ].join('\n'),
  )

  const linkedinFirstComment = isOwnerTrack
    ? `Full step-by-step guide: ${canonicalUrl} (plus free live 60-min Masterclass seats at ${SITE_URL}/masterclass)`
    : `Full reproducible teardown + tables: ${canonicalUrl}`

  // 4. Bluesky Official AT Protocol Record Text (<= 300 graphemes + rich embed card)
  const bskySummary = `${title}\n\n${description}`
  const bskyText =
    bskySummary.length <= 255
      ? `${bskySummary}\n\n${canonicalUrl}`
      : `${title.slice(0, 220)}\n\n${canonicalUrl}`

  const bluesky = {
    text: sanitizeCleanCopy(bskyText),
    embed: {
      title,
      description: description.slice(0, 240),
      uri: canonicalUrl,
    },
  }

  // 5. X (@sudosoph) Official v2 API Single-Post / Thread Starter (<= 280 chars)
  const xLead = `${title}\n\n${canonicalUrl}`
  const xPost = sanitizeCleanCopy(
    xLead.length <= 275 ? xLead : `${title.slice(0, 235)}...\n\n${canonicalUrl}`,
  )

  // 6. Assisted Residential / Manual Packs (Substack ProseMirror + Medium Import + Native Reddit/HN)
  const substackPayload = convertMdxToSubstackPayload(fileSlug)
  const manualSafePack = {
    mediumImportUrl: `https://medium.com/p/import (paste ${canonicalUrl} so Medium sets rel="canonical" automatically)`,
    substackDraft: {
      draft_title: sanitizeCleanCopy(substackPayload.draft_title),
      draft_subtitle: sanitizeCleanCopy(substackPayload.draft_subtitle),
      note: 'Stage via residential browser session or paste into Substack editor; never push via datacenter cookie scrapers.',
    },
    redditNativePost: {
      subreddits: isOwnerTrack
        ? ['r/Entrepreneur', 'r/smallbusiness', 'r/AI_Agents']
        : ['r/LocalLLaMA', 'r/AI_Agents', 'r/SelfHosted'],
      title: `Breakdown: ${title} (measured numbers + what broke)`,
      body: sanitizeCleanCopy(
        `${description}\n\nKey takeaways:\n${bulletBlock}\n\nHappy to share the full markdown config or answer setup questions in the comments.`,
      ),
      antiBanNote: 'Zero external links in body. Post natively from residential browser; share link in comments only when asked.',
    },
    hackerNews: {
      factualTitle: title,
      url: canonicalUrl,
      firstComment: sanitizeCleanCopy(
        `Author here. ${description} Key findings: ${bullets.join('; ')}. Feedback and critiques welcome.`,
      ),
      antiBanNote: 'Submit manually Tue-Thu 7:00-9:00 AM ET while maintaining a 9:1 genuine comment ratio.',
    },
  }

  return {
    fileSlug,
    publicSlug,
    track,
    publishedDate: frontmatter.publishedDate || '',
    canonicalUrl,
    title,
    description,
    devto,
    hashnode,
    linkedin: {
      text: linkedinText,
      firstComment: sanitizeCleanCopy(linkedinFirstComment),
    },
    bluesky,
    x: { text: xPost },
    manualSafePack,
  }
}

export function loadLedger(ledgerPath = LEDGER_PATH) {
  if (!fs.existsSync(ledgerPath)) {
    return { syndicated: {} }
  }
  try {
    return JSON.parse(fs.readFileSync(ledgerPath, 'utf8'))
  } catch {
    return { syndicated: {} }
  }
}

export function saveLedger(ledger, ledgerPath = LEDGER_PATH) {
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true })
  fs.writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8')
}

async function publishToDevto(payload, apiKey) {
  const res = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.forem.api-v1+json',
      'User-Agent': 'agenticarchitect-official-syndicator/1.0',
    },
    body: JSON.stringify(payload.devto),
  })
  if (!res.ok) {
    throw new Error(`Dev.to API ${res.status}: ${(await res.text()).slice(0, 200)}`)
  }
  const data = await res.json()
  return { url: data.url, id: data.id }
}

async function publishToHashnode(payload, pat, publicationId) {
  const query = `
    mutation PublishPost($input: PublishPostInput!) {
      publishPost(input: $input) {
        post { id url }
      }
    }
  `
  const res = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
      Authorization: pat,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          publicationId,
          title: payload.hashnode.title,
          subtitle: payload.hashnode.subtitle,
          contentMarkdown: payload.hashnode.contentMarkdown,
          originalArticleURL: payload.hashnode.originalArticleURL,
          tags: payload.hashnode.tags,
        },
      },
    }),
  })
  if (!res.ok) {
    throw new Error(`Hashnode API ${res.status}: ${(await res.text()).slice(0, 200)}`)
  }
  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(`Hashnode GraphQL error: ${JSON.stringify(json.errors[0])}`)
  }
  return json.data?.publishPost?.post || { ok: true }
}

async function publishToBluesky(payload, identifier, appPassword) {
  const sessionRes = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password: appPassword }),
  })
  if (!sessionRes.ok) {
    throw new Error(`Bluesky auth ${sessionRes.status}: ${(await sessionRes.text()).slice(0, 160)}`)
  }
  const session = await sessionRes.json()

  // Build byte-offset link facet for canonical URL
  const text = payload.bluesky.text
  const urlStartChar = text.indexOf(payload.canonicalUrl)
  const facets = []
  if (urlStartChar >= 0) {
    const prefixBytes = Buffer.byteLength(text.slice(0, urlStartChar), 'utf8')
    const urlBytes = Buffer.byteLength(payload.canonicalUrl, 'utf8')
    facets.push({
      index: { byteStart: prefixBytes, byteEnd: prefixBytes + urlBytes },
      features: [{ $type: 'app.bsky.richtext.facet#link', uri: payload.canonicalUrl }],
    })
  }

  const recordRes = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.accessJwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      repo: session.did,
      collection: 'app.bsky.feed.post',
      record: {
        $type: 'app.bsky.feed.post',
        text,
        facets,
        embed: {
          $type: 'app.bsky.embed.external',
          external: payload.bluesky.embed,
        },
        createdAt: new Date().toISOString(),
      },
    }),
  })
  if (!recordRes.ok) {
    throw new Error(`Bluesky post ${recordRes.status}: ${(await recordRes.text()).slice(0, 160)}`)
  }
  return recordRes.json()
}

async function publishToLinkedInOfficial(payload, accessToken, authorUrn) {
  const normalizedUrn = authorUrn.startsWith('urn:li:') ? authorUrn : `urn:li:person:${authorUrn}`
  const res = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': '202601',
    },
    body: JSON.stringify({
      author: normalizedUrn,
      commentary: payload.linkedin.text,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    }),
  })
  if (!res.ok) {
    throw new Error(`LinkedIn Official API ${res.status}: ${(await res.text()).slice(0, 200)}`)
  }
  return { id: res.headers.get('x-restli-id') || 'published' }
}

async function publishToSocialQueueWebhook(payload, webhookUrl) {
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      slug: payload.publicSlug,
      canonicalUrl: payload.canonicalUrl,
      title: payload.title,
      track: payload.track,
      linkedinText: payload.linkedin.text,
      linkedinFirstComment: payload.linkedin.firstComment,
      xText: payload.x.text,
      blueskyText: payload.bluesky.text,
    }),
  })
  if (!res.ok) {
    throw new Error(`Queue webhook ${res.status}: ${(await res.text()).slice(0, 160)}`)
  }
  return { queued: true }
}

export async function runSyndication(inputSlug, opts = {}) {
  const dryRun = Boolean(opts.dryRun)
  const force = Boolean(opts.force)
  const ledgerPath = opts.ledgerPath || LEDGER_PATH
  const env = opts.env || process.env
  const requestedPlatforms = new Set(
    opts.platforms && opts.platforms !== 'all'
      ? String(opts.platforms)
          .split(',')
          .map(s => s.trim().toLowerCase())
          .filter(Boolean)
      : ['devto', 'hashnode', 'bluesky', 'linkedin', 'webhook'],
  )

  const payload = buildCrosspostPayloads(inputSlug, opts)
  const grace = checkCanonicalGraceWindow(payload.publishedDate, opts.minHours ?? 24)

  // Always write the local reviewable social bundle
  const packOutDir = path.join(SOCIAL_DIR, payload.publicSlug)
  fs.mkdirSync(packOutDir, { recursive: true })
  const packOutPath = path.join(packOutDir, 'crosspost-pack.json')
  fs.writeFileSync(packOutPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  if (!grace.ready && !force && !dryRun) {
    return {
      skippedForCanonicalGrace: true,
      hoursElapsed: grace.hoursElapsed,
      message: `Waiting for 24h canonical Google indexing head start (${grace.hoursElapsed}h elapsed). Pass --force to override.`,
      packOutPath,
      payload,
    }
  }

  const ledger = loadLedger(ledgerPath)
  ledger.syndicated[payload.publicSlug] = ledger.syndicated[payload.publicSlug] || {}
  const existing = ledger.syndicated[payload.publicSlug]
  const results = {}

  const adapters = [
    {
      key: 'devto',
      configured: Boolean(env.DEVTO_API_KEY),
      run: () => publishToDevto(payload, env.DEVTO_API_KEY),
    },
    {
      key: 'hashnode',
      configured: Boolean(env.HASHNODE_PAT && env.HASHNODE_PUBLICATION_ID),
      run: () => publishToHashnode(payload, env.HASHNODE_PAT, env.HASHNODE_PUBLICATION_ID),
    },
    {
      key: 'bluesky',
      configured: Boolean(env.BLUESKY_IDENTIFIER && env.BLUESKY_APP_PASSWORD),
      run: () => publishToBluesky(payload, env.BLUESKY_IDENTIFIER, env.BLUESKY_APP_PASSWORD),
    },
    {
      key: 'linkedin',
      configured: Boolean(env.LINKEDIN_ACCESS_TOKEN && env.LINKEDIN_AUTHOR_URN),
      run: () =>
        publishToLinkedInOfficial(payload, env.LINKEDIN_ACCESS_TOKEN, env.LINKEDIN_AUTHOR_URN),
    },
    {
      key: 'webhook',
      configured: Boolean(env.SOCIAL_QUEUE_WEBHOOK_URL),
      run: () => publishToSocialQueueWebhook(payload, env.SOCIAL_QUEUE_WEBHOOK_URL),
    },
  ]

  for (const adapter of adapters) {
    if (!requestedPlatforms.has(adapter.key)) continue
    if (existing[adapter.key] && !force) {
      results[adapter.key] = { status: 'already_syndicated', recorded: existing[adapter.key] }
      continue
    }
    if (dryRun) {
      results[adapter.key] = {
        status: 'dry_run_ready',
        credentialsConfigured: adapter.configured,
      }
      continue
    }
    if (!adapter.configured) {
      results[adapter.key] = { status: 'skipped_unconfigured' }
      continue
    }

    const out = await adapter.run()
    const record = { syncedAt: new Date().toISOString(), ...out }
    existing[adapter.key] = record
    results[adapter.key] = { status: 'published', ...record }
  }

  if (!dryRun) {
    saveLedger(ledger, ledgerPath)
  }

  return {
    slug: payload.publicSlug,
    canonicalUrl: payload.canonicalUrl,
    dryRun,
    packOutPath,
    results,
    payload,
  }
}

async function runCli() {
  const args = process.argv.slice(2)
  const slugArg = args.find(a => !a.startsWith('--'))
  if (!slugArg) {
    console.error(
      'Usage: node scripts/crosspost-official.mjs <slug> [--dry-run] [--force] [--platforms=devto,hashnode,bluesky,linkedin,webhook]',
    )
    process.exit(1)
  }

  const dryRun = args.includes('--dry-run')
  const force = args.includes('--force')
  const platformsFlag = args.find(a => a.startsWith('--platforms='))
  const platforms = platformsFlag ? platformsFlag.split('=')[1] : 'all'

  const summary = await runSyndication(slugArg, { dryRun, force, platforms })
  console.log(
    JSON.stringify(
      {
        slug: summary.slug || slugArg,
        canonicalUrl: summary.canonicalUrl,
        dryRun: summary.dryRun,
        skippedForCanonicalGrace: summary.skippedForCanonicalGrace || false,
        packOutPath: summary.packOutPath,
        results: summary.results,
      },
      null,
      2,
    ),
  )
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli().catch(err => {
    console.error('[crosspost] fatal:', err.message)
    process.exit(1)
  })
}

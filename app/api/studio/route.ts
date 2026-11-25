import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { getWorkerEnv } from '@/lib/cloudflare-env'
import { fetchLiveRadarItems } from '@/scripts/brand-radar.mjs'
import { loadReplyQueue, updateReplyStatus } from '@/scripts/comment-copilot.mjs'
import pendingRepliesData from '@/content/queue/pending-replies.json'
import radarLatestData from '@/content/queue/radar-latest.json'

const PRIVATE_HEADERS = {
  'Cache-Control': 'no-store, private, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow',
}

function isAllowedOrigin(request: Request) {
  if (process.env.NODE_ENV !== 'production') return true
  const origin = request.headers.get('origin')
  if (!origin) return true
  return origin === 'https://agenticarchitect.ai'
}

const GITHUB_REPO = 'sudosoph/agentic-architecture'
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}`

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

function sanitizeNoEmDash(input: string) {
  return String(input)
    .replace(/\u2014/g, ': ')
    .replace(/\s+--\s+/g, ': ')
}

function slugify(input: string) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64)
}

function ghHeaders(pat: string) {
  return {
    Authorization: `Bearer ${pat}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'agenticarchitect-cloud-studio',
    'Content-Type': 'application/json',
  }
}

async function resolveAuth(request: Request): Promise<{
  authorized: boolean
  githubPat: string | null
  mode: 'local' | 'studio_token' | 'github_pat' | 'unauthorized'
}> {
  const headerPat = request.headers.get('x-github-pat')?.trim() || ''
  const headerStudio = request.headers.get('x-studio-token')?.trim() || ''
  const envStudio = getWorkerEnv('STUDIO_ACCESS_TOKEN') || ''
  const envPat = getWorkerEnv('GITHUB_PAT') || ''

  if (process.env.NODE_ENV !== 'production') {
    return {
      authorized: true,
      githubPat: headerPat || envPat || null,
      mode: 'local',
    }
  }

  if (envStudio && headerStudio && safeEqual(headerStudio, envStudio)) {
    return {
      authorized: true,
      githubPat: headerPat || envPat || null,
      mode: 'studio_token',
    }
  }

  if (headerPat) {
    const check = await fetch(GITHUB_API, { headers: ghHeaders(headerPat) })
    if (check.ok) {
      const repoInfo = (await check.json()) as { permissions?: { push?: boolean } }
      if (repoInfo.permissions?.push) {
        return {
          authorized: true,
          githubPat: headerPat,
          mode: 'github_pat',
        }
      }
    }
  }

  return { authorized: false, githubPat: null, mode: 'unauthorized' }
}

async function upsertGitHubFile({
  pat,
  filePath,
  content,
  message,
  branch = 'main',
}: {
  pat: string
  filePath: string
  content: string
  message: string
  branch?: string
}) {
  let sha: string | undefined
  const existing = await fetch(
    `${GITHUB_API}/contents/${filePath}?ref=${encodeURIComponent(branch)}`,
    { headers: ghHeaders(pat) },
  )
  if (existing.ok) {
    const json = (await existing.json()) as { sha?: string }
    sha = json.sha
  }

  const putRes = await fetch(`${GITHUB_API}/contents/${filePath}`, {
    method: 'PUT',
    headers: ghHeaders(pat),
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  })

  if (!putRes.ok) {
    const detail = await putRes.text()
    throw new Error(`GitHub commit failed (${putRes.status}): ${detail.slice(0, 200)}`)
  }
  return putRes.json()
}

export async function GET(request: Request) {
  const auth = await resolveAuth(request)
  if (!auth.authorized) {
    return NextResponse.json(
      { error: 'Unauthorized: repository owner credentials required.' },
      { status: 401, headers: PRIVATE_HEADERS },
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const radarPath = path.join(process.cwd(), 'content/queue/radar-latest.json')
    const radar = fs.existsSync(radarPath)
      ? JSON.parse(fs.readFileSync(radarPath, 'utf8'))
      : radarLatestData
    const replies = loadReplyQueue()
    return NextResponse.json({ ok: true, mode: auth.mode, radar, replies }, { headers: PRIVATE_HEADERS })
  }

  return NextResponse.json(
    {
      ok: true,
      mode: auth.mode,
      hasGitHubWrite: Boolean(auth.githubPat),
      radar: radarLatestData,
      replies: pendingRepliesData,
    },
    { headers: PRIVATE_HEADERS },
  )
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: 'Forbidden origin.' },
      { status: 403, headers: PRIVATE_HEADERS },
    )
  }

  const auth = await resolveAuth(request)
  if (!auth.authorized) {
    return NextResponse.json(
      { error: 'Unauthorized: repository owner credentials required.' },
      { status: 401, headers: PRIVATE_HEADERS },
    )
  }

  const body = await request.json()

  if (body.action === 'verify-auth') {
    return NextResponse.json(
      {
        ok: true,
        mode: auth.mode,
        hasGitHubWrite: Boolean(auth.githubPat),
        radar: radarLatestData,
        replies: pendingRepliesData,
      },
      { headers: PRIVATE_HEADERS },
    )
  }

  if (body.action === 'refresh-radar') {
    const items = await fetchLiveRadarItems()
    const payload = { updatedAt: new Date().toISOString(), items }

    if (process.env.NODE_ENV !== 'production') {
      const radarPath = path.join(process.cwd(), 'content/queue/radar-latest.json')
      fs.mkdirSync(path.dirname(radarPath), { recursive: true })
      fs.writeFileSync(radarPath, JSON.stringify(payload, null, 2), 'utf8')
    } else if (auth.githubPat && body.commitToGitHub) {
      await upsertGitHubFile({
        pat: auth.githubPat,
        filePath: 'content/queue/radar-latest.json',
        content: `${JSON.stringify(payload, null, 2)}\n`,
        message: 'chore(radar): refresh live trend signals from browser studio',
      })
    }

    return NextResponse.json({ ok: true, radar: payload })
  }

  if (body.action === 'update-reply') {
    if (process.env.NODE_ENV !== 'production') {
      const replies = updateReplyStatus(body.id, {
        status: body.status,
        editedReply: body.draftReply,
      })
      return NextResponse.json({ ok: true, replies })
    }

type ReplyQueueItem = {
  id: string
  status: string
  draftReply: string
  [key: string]: unknown
}

    const baseReplies: ReplyQueueItem[] = Array.isArray(pendingRepliesData)
      ? (pendingRepliesData as ReplyQueueItem[])
      : []
    const updated = baseReplies.map(item =>
      String(item.id) === String(body.id)
        ? {
            ...item,
            status: body.status || item.status,
            draftReply: sanitizeNoEmDash(body.draftReply ?? item.draftReply),
            updatedAt: new Date().toISOString(),
          }
        : item,
    )

    if (auth.githubPat) {
      await upsertGitHubFile({
        pat: auth.githubPat,
        filePath: 'content/queue/pending-replies.json',
        content: `${JSON.stringify(updated, null, 2)}\n`,
        message: `chore(replies): mark reply ${body.id} ${body.status || 'approved'}`,
      })
    }

    return NextResponse.json({ ok: true, replies: updated, committed: Boolean(auth.githubPat) })
  }

  if (body.action === 'publish-mdx') {
    const title = sanitizeNoEmDash(String(body.title || '').trim())
    const slug = slugify(body.slug || title)
    const description = sanitizeNoEmDash(String(body.description || '').trim())
    const track = ['small-business', 'models-rigs', 'engineering'].includes(body.track)
      ? body.track
      : 'engineering'
    const rawBody = sanitizeNoEmDash(String(body.content || '').trim())
    const publishMode = body.publishMode === 'main' ? 'main' : 'pr'

    if (!title || !slug || !description || !rawBody) {
      return NextResponse.json(
        { error: 'Title, description, and article body are required.' },
        { status: 400 },
      )
    }

    const today = new Date().toISOString().slice(0, 10)
    const mdxFile = [
      '---',
      `title: "${title.replace(/"/g, "'")}"`,
      `slug: ${slug}`,
      `publishedDate: "${today}"`,
      `description: "${description.replace(/"/g, "'")}"`,
      `track: "${track}"`,
      'tags: ["architecture", "loop-engineering", "economics"]',
      'kind: deep-dive',
      'draft: false',
      '---',
      '',
      rawBody,
      '',
    ].join('\n')

    const relPath = `content/blog/${slug}.mdx`

    if (!auth.githubPat) {
      if (process.env.NODE_ENV !== 'production') {
        const localFile = path.join(process.cwd(), relPath)
        fs.writeFileSync(localFile, mdxFile, 'utf8')
        return NextResponse.json({
          ok: true,
          savedLocal: relPath,
          url: `/blog/${slug}`,
        })
      }
      return NextResponse.json(
        { error: 'Add a GitHub PAT in Studio to commit posts directly from the browser.' },
        { status: 400 },
      )
    }

    if (publishMode === 'main') {
      await upsertGitHubFile({
        pat: auth.githubPat,
        filePath: relPath,
        content: mdxFile,
        message: `feat(blog): publish ${slug} via browser studio`,
        branch: 'main',
      })
      return NextResponse.json({
        ok: true,
        publishedBranch: 'main',
        liveUrl: `https://agenticarchitect.ai/blog/${slug}`,
      })
    }

    // Create branch + PR for 1-click browser review
    const refRes = await fetch(`${GITHUB_API}/git/ref/heads/main`, {
      headers: ghHeaders(auth.githubPat),
    })
    if (!refRes.ok) {
      return NextResponse.json({ error: 'Could not read main branch SHA from GitHub.' }, { status: 502 })
    }
    const refJson = (await refRes.json()) as { object: { sha: string } }
    const branchName = `post/${slug}-${Date.now().toString(36)}`

    const createRef = await fetch(`${GITHUB_API}/git/refs`, {
      method: 'POST',
      headers: ghHeaders(auth.githubPat),
      body: JSON.stringify({
        ref: `refs/heads/${branchName}`,
        sha: refJson.object.sha,
      }),
    })
    if (!createRef.ok) {
      return NextResponse.json({ error: 'Could not create draft branch on GitHub.' }, { status: 502 })
    }

    await upsertGitHubFile({
      pat: auth.githubPat,
      filePath: relPath,
      content: mdxFile,
      message: `feat(blog): draft ${slug} via browser studio`,
      branch: branchName,
    })

    const prRes = await fetch(`${GITHUB_API}/pulls`, {
      method: 'POST',
      headers: ghHeaders(auth.githubPat),
      body: JSON.stringify({
        title: `Publish playbook: ${title}`,
        head: branchName,
        base: 'main',
        body: `Created from **Agentic Architect Cloud Studio** (\`/studio\`) with zero local \`npm\`.\n\n- **Canonical URL once merged:** \`https://agenticarchitect.ai/blog/${slug}\`\n- **Track:** \`${track}\`\n\nMerge this PR from GitHub web or mobile to auto-build manifests, recompile *The Sovereign Stack*, deploy to Cloudflare Workers, and ping IndexNow.`,
      }),
    })

    const prJson = (await prRes.json()) as { html_url?: string }
    return NextResponse.json({
      ok: true,
      prUrl: prJson.html_url || `https://github.com/${GITHUB_REPO}/pulls`,
    })
  }

  if (body.action === 'trigger-weekly-workflow') {
    if (!auth.githubPat) {
      return NextResponse.json(
        { error: 'Connect a GitHub PAT with Actions write permission (or click Run Workflow on GitHub).' },
        { status: 400 },
      )
    }
    const dispatch = await fetch(
      `${GITHUB_API}/actions/workflows/weekly-radar.yml/dispatches`,
      {
        method: 'POST',
        headers: ghHeaders(auth.githubPat),
        body: JSON.stringify({
          ref: 'main',
          inputs: body.topicTitle ? { topic_title: sanitizeNoEmDash(String(body.topicTitle)) } : {},
        }),
      },
    )
    if (!dispatch.ok) {
      const errText = await dispatch.text()
      return NextResponse.json(
        { error: `Workflow dispatch returned ${dispatch.status}: ${errText.slice(0, 160)}` },
        { status: 502 },
      )
    }
    return NextResponse.json({
      ok: true,
      actionsUrl: `https://github.com/${GITHUB_REPO}/actions/workflows/weekly-radar.yml`,
    })
  }

  if (body.action === 'trigger-crosspost-workflow') {
    if (!auth.githubPat) {
      return NextResponse.json(
        { error: 'Connect a GitHub PAT with Actions write permission to dispatch cross-posting.' },
        { status: 400 },
      )
    }
    const cleanSlug = slugify(String(body.slug || ''))
    if (!cleanSlug) {
      return NextResponse.json({ error: 'Provide a published post slug to syndicate.' }, { status: 400 })
    }
    const dispatch = await fetch(
      `${GITHUB_API}/actions/workflows/crosspost-on-publish.yml/dispatches`,
      {
        method: 'POST',
        headers: ghHeaders(auth.githubPat),
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            slug: cleanSlug,
            platforms: String(body.platforms || 'all'),
            dry_run: body.dryRun === false ? 'false' : 'true',
          },
        }),
      },
    )
    if (!dispatch.ok) {
      const errText = await dispatch.text()
      return NextResponse.json(
        { error: `Cross-post workflow dispatch returned ${dispatch.status}: ${errText.slice(0, 160)}` },
        { status: 502 },
      )
    }
    return NextResponse.json({
      ok: true,
      actionsUrl: `https://github.com/${GITHUB_REPO}/actions/workflows/crosspost-on-publish.yml`,
    })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}

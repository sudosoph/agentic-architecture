import fs from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { fetchLiveRadarItems } from '@/scripts/brand-radar.mjs'
import { loadReplyQueue, updateReplyStatus } from '@/scripts/comment-copilot.mjs'

function isProductionBlocked() {
  return process.env.NODE_ENV === 'production'
}

export async function GET() {
  if (isProductionBlocked()) {
    return NextResponse.json({ error: 'Local studio only' }, { status: 403 })
  }

  const radarPath = path.join(process.cwd(), 'content/queue/radar-latest.json')
  const radar = fs.existsSync(radarPath)
    ? JSON.parse(fs.readFileSync(radarPath, 'utf8'))
    : { updatedAt: null, items: [] }

  const replies = loadReplyQueue()
  return NextResponse.json({ radar, replies })
}

export async function POST(request: Request) {
  if (isProductionBlocked()) {
    return NextResponse.json({ error: 'Local studio only' }, { status: 403 })
  }

  const body = await request.json()

  if (body.action === 'refresh-radar') {
    const items = await fetchLiveRadarItems()
    const radarPath = path.join(process.cwd(), 'content/queue/radar-latest.json')
    const payload = { updatedAt: new Date().toISOString(), items }
    fs.mkdirSync(path.dirname(radarPath), { recursive: true })
    fs.writeFileSync(radarPath, JSON.stringify(payload, null, 2), 'utf8')
    return NextResponse.json({ ok: true, radar: payload })
  }

  if (body.action === 'update-reply') {
    const replies = updateReplyStatus(body.id, {
      status: body.status,
      editedReply: body.draftReply,
    })
    return NextResponse.json({ ok: true, replies })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}

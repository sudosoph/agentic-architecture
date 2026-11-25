#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const QUEUE_PATH = path.join(process.cwd(), 'content/queue/pending-replies.json')

export function draftHumanReply({ commenterName, commentBody }) {
  const firstName = String(commenterName || 'there').split(/\s+/)[0]
  const mentionsApprovalOrRung = /approve|rung|checkpoint|review/i.test(commentBody || '')

  const reply = mentionsApprovalOrRung
    ? `Spot on, ${firstName}. Rubber-stamping is the #1 trap once volume picks up. One habit that keeps reviewers sharp without slowing everything down: force the workflow to highlight the two assumptions it was least confident about right at the top so the human has to make a real call instead of skimming polished prose.`
    : `Appreciate you reading closely, ${firstName}. Curious how this is showing up in your own workflows right now: are you keeping a manual review step in the loop or running it end-to-end?`

  return reply.replace(/\u2014/g, ': ')
}

export function loadReplyQueue(filePath = QUEUE_PATH) {
  if (!fs.existsSync(filePath)) return []
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function updateReplyStatus(id, { status, editedReply }, filePath = QUEUE_PATH) {
  const items = loadReplyQueue(filePath)
  const updated = items.map(item => {
    if (String(item.id) !== String(id)) return item
    return {
      ...item,
      status: status || item.status,
      draftReply: editedReply !== undefined ? String(editedReply).replace(/\u2014/g, ': ') : item.draftReply,
      updatedAt: new Date().toISOString(),
    }
  })
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8')
  return updated
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const items = loadReplyQueue()
  const pending = items.filter(i => i.status === 'pending_approval')
  console.log(`Pending human approval replies: ${pending.length} (total tracked: ${items.length})`)
  for (const p of pending) {
    console.log(`\n[${p.id}] ${p.authorName} (${p.authorContext}) on "${p.postTitle}"`)
    console.log(`  Their comment: "${p.commentBody}"`)
    console.log(`  Draft reply:   "${p.draftReply}"`)
  }
}

// Sync the BSW workshop content from the source repo (bsw-content/ symlink
// -> /home/sophia-stein/bsw, which is the github.com/sudosoph/bsw26-agentic-workflows
// checkout) into the place the build pipeline reads from (content/bsw/ + public/).
//
// Applies sanitizeBswMarkdown() on synced markdown files so retired May 2026
// booking/newsletter URLs and em-dashes can never re-enter content/bsw/.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const SRC = path.join(ROOT, 'bsw-content')
const DEST_CONTENT = path.join(ROOT, 'content', 'bsw')
const DEST_HANDOUTS = path.join(DEST_CONTENT, 'handouts')
const DEST_TEMPLATES = path.join(ROOT, 'public', 'bsw', 'templates')
const DEST_SLIDES = path.join(ROOT, 'public', 'slides')

export function sanitizeBswMarkdown(raw) {
  return String(raw)
    .replace(
      /\*\*Office Hours[^*\n]*\*\*\s*\[cal\.com\/sophia-stein\/architect-audit-bsw\]\(https:\/\/cal\.com\/sophia-stein\/architect-audit-bsw\)(?:\s*\(capped at 5 bookings\))?/g,
      '**Work With Sophia · Workflow Audits & Live Masterclass:** [agenticarchitect.ai/work-with-me](https://agenticarchitect.ai/work-with-me)',
    )
    .replace(
      /https?:\/\/cal\.com\/sophia-stein\/architect-audit-bsw/g,
      'https://agenticarchitect.ai/work-with-me',
    )
    .replace(
      /cal\.com\/sophia-stein\/architect-audit-bsw/g,
      'agenticarchitect.ai/work-with-me',
    )
    .replace(
      /\*\*Newsletter:\*\*\s*\[agenticarchitect\.ai\/blog\]\(https:\/\/agenticarchitect\.ai\/blog\)[^\n]*/g,
      '**Newsletter:** [agenticarchitectai.substack.com](https://agenticarchitectai.substack.com) · weekly playbooks on AI workflows and private infrastructure',
    )
    .replace(/ · \u2014 Sophia Stein/g, ' · Sophia Stein')
    .replace(/\*\*(Tab \d+|Option [AB])\s*\u2014\s*/g, '**$1: ')
    .replace(/Sent \u2014 Discovery/g, 'Sent - Discovery')
    .replace(/ \u2014 /g, ': ')
    .replace(/\u2014/g, '-')
}

function exists(p) {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function copyIfChanged(src, dest, label) {
  if (!exists(src)) {
    console.warn(`[sync-bsw] missing source: ${label} (${src})`)
    return false
  }
  ensureDir(path.dirname(dest))
  try {
    const a = fs.statSync(src)
    const b = fs.statSync(dest)
    if (a.mtimeMs <= b.mtimeMs) {
      return false
    }
  } catch {
    // dest does not exist yet
  }

  if (dest.endsWith('.md')) {
    const sanitized = sanitizeBswMarkdown(fs.readFileSync(src, 'utf8'))
    fs.writeFileSync(dest, sanitized)
  } else {
    fs.copyFileSync(src, dest)
  }
  console.log(`[sync-bsw] synced ${label}`)
  return true
}

function runSync() {
  if (!exists(SRC)) {
    console.warn(
      `[sync-bsw] bsw-content/ not found at ${SRC} - skipping sync (using committed copies in content/bsw/)`,
    )
    return
  }

  let changed = 0

  ensureDir(DEST_CONTENT)
  if (copyIfChanged(path.join(SRC, 'CONFIGURATION.md'), path.join(DEST_CONTENT, 'setup.md'), 'setup.md')) changed++
  if (copyIfChanged(path.join(SRC, 'TUTORIAL.md'), path.join(DEST_CONTENT, 'tutorial.md'), 'tutorial.md')) changed++

  ensureDir(DEST_HANDOUTS)
  const handoutsSrc = path.join(SRC, 'handouts')
  if (exists(handoutsSrc)) {
    for (const filename of fs.readdirSync(handoutsSrc)) {
      const src = path.join(handoutsSrc, filename)
      if (filename.endsWith('.md')) {
        if (copyIfChanged(src, path.join(DEST_HANDOUTS, filename), `handouts/${filename}`)) changed++
      } else if (filename.endsWith('.csv')) {
        ensureDir(DEST_TEMPLATES)
        if (copyIfChanged(src, path.join(DEST_TEMPLATES, filename), `templates/${filename}`)) changed++
      }
    }
  }

  const n8nSrc = path.join(SRC, 'n8n')
  if (exists(n8nSrc)) {
    ensureDir(DEST_TEMPLATES)
    for (const filename of fs.readdirSync(n8nSrc)) {
      if (!filename.endsWith('.json')) continue
      if (copyIfChanged(path.join(n8nSrc, filename), path.join(DEST_TEMPLATES, filename), `templates/${filename}`)) changed++
    }
  }

  const slidesSrc = path.join(SRC, 'slides', 'index.html')
  ensureDir(DEST_SLIDES)
  if (copyIfChanged(slidesSrc, path.join(DEST_SLIDES, 'bsw26.html'), 'slides/bsw26.html')) changed++

  if (changed === 0) {
    console.log('[sync-bsw] no changes - bsw assets already up to date')
  } else {
    console.log(`[sync-bsw] synced ${changed} file(s)`)
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runSync()
}

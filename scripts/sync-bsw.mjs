// Sync the BSW workshop content from the source repo (bsw-content/ symlink
// → /home/sophia-stein/bsw, which is the github.com/sudosoph/bsw26-agentic-workflows
// checkout) into the place the build pipeline reads from (content/bsw/ + public/).
//
// Run before generate-bsw-manifest.mjs. Wired into npm scripts dev / build /
// build:next so every site build picks up the latest BSW content.
//
// File mapping:
//   bsw-content/CONFIGURATION.md          → content/bsw/setup.md       (keeps /bsw/setup URL)
//   bsw-content/TUTORIAL.md                → content/bsw/tutorial.md   (keeps /bsw/tutorial URL)
//   bsw-content/handouts/*.md              → content/bsw/handouts/*.md (handout pages)
//   bsw-content/handouts/*.csv             → public/bsw/templates/     (raw downloads)
//   bsw-content/n8n/*.json                 → public/bsw/templates/     (n8n imports)
//   bsw-content/slides/index.html          → public/slides/bsw26.html  (workshop deck)
//
// If bsw-content/ doesn't resolve (CI environment without the symlink), this
// script logs a warning and exits without changes — manifest will fall back
// to whatever's already committed in content/bsw/.

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

function exists(p) {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}

if (!exists(SRC)) {
  console.warn(
    `[sync-bsw] bsw-content/ not found at ${SRC} — skipping sync (using committed copies in content/bsw/)`,
  )
  process.exit(0)
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
  // Skip work if destination already matches by content hash (fast path)
  try {
    const a = fs.statSync(src)
    const b = fs.statSync(dest)
    if (a.size === b.size && a.mtimeMs <= b.mtimeMs) {
      return false
    }
  } catch {
    // dest doesn't exist, fall through to copy
  }
  fs.copyFileSync(src, dest)
  console.log(`[sync-bsw] synced ${label}`)
  return true
}

let changed = 0

// Top-level pages (renamed)
ensureDir(DEST_CONTENT)
if (copyIfChanged(path.join(SRC, 'CONFIGURATION.md'), path.join(DEST_CONTENT, 'setup.md'), 'setup.md')) changed++
if (copyIfChanged(path.join(SRC, 'TUTORIAL.md'), path.join(DEST_CONTENT, 'tutorial.md'), 'tutorial.md')) changed++

// Handouts directory — copy every .md file into content/bsw/handouts/
ensureDir(DEST_HANDOUTS)
const handoutsSrc = path.join(SRC, 'handouts')
if (exists(handoutsSrc)) {
  for (const filename of fs.readdirSync(handoutsSrc)) {
    const src = path.join(handoutsSrc, filename)
    if (filename.endsWith('.md')) {
      if (copyIfChanged(src, path.join(DEST_HANDOUTS, filename), `handouts/${filename}`)) changed++
    } else if (filename.endsWith('.csv')) {
      // CSVs go into public/bsw/templates/ for raw download
      ensureDir(DEST_TEMPLATES)
      if (copyIfChanged(src, path.join(DEST_TEMPLATES, filename), `templates/${filename}`)) changed++
    }
  }
}

// n8n template JSONs → public/bsw/templates/
const n8nSrc = path.join(SRC, 'n8n')
if (exists(n8nSrc)) {
  ensureDir(DEST_TEMPLATES)
  for (const filename of fs.readdirSync(n8nSrc)) {
    if (!filename.endsWith('.json')) continue
    if (copyIfChanged(path.join(n8nSrc, filename), path.join(DEST_TEMPLATES, filename), `templates/${filename}`)) changed++
  }
}

// Workshop slides → public/slides/bsw26.html
const slidesSrc = path.join(SRC, 'slides', 'index.html')
ensureDir(DEST_SLIDES)
if (copyIfChanged(slidesSrc, path.join(DEST_SLIDES, 'bsw26.html'), 'slides/bsw26.html')) changed++

if (changed === 0) {
  console.log('[sync-bsw] no changes — bsw assets already up to date')
} else {
  console.log(`[sync-bsw] synced ${changed} file(s)`)
}

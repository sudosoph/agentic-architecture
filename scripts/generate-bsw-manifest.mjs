// Reads BSW workshop markdown from content/bsw/, renders to HTML at build
// time, and writes a static manifest. Same Worker-bundle constraints as the
// blog manifest: no fs at runtime, no eval, HTML pre-rendered.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BSW_DIR = path.join(__dirname, '..', 'content', 'bsw')
const OUT_FILE = path.join(__dirname, '..', 'lib', 'bsw-manifest.generated.ts')

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeStringify, { allowDangerousHtml: true })

async function mdToHtml(content) {
  const file = await processor.process(content)
  return String(file)
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+?)\s*$/m)
  return match ? match[1].trim() : ''
}

function extractDescription(content) {
  // Prefer the first blockquote (most BSW docs lead with one)
  const bq = content.match(/^>\s+(.+?)(?:\n|$)/m)
  if (bq) return bq[1].trim().replace(/^\*+|\*+$/g, '').trim()
  // Fallback: first non-heading, non-empty paragraph
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('>')) {
      return trimmed.slice(0, 200)
    }
  }
  return ''
}

function decodeHtmlEntities(input) {
  return String(input)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
}

function extractToc(html) {
  const matches = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)]
  return matches.map(([, id, inner]) => ({
    id,
    text: decodeHtmlEntities(inner.replace(/<[^>]+>/g, '').trim()),
  }))
}

async function loadDoc(filepath, slug, kind) {
  const raw = fs.readFileSync(filepath, 'utf-8')
  const title = extractTitle(raw) || slug
  const description = extractDescription(raw)
  const html = await mdToHtml(raw)
  const toc = extractToc(html)
  return { slug, kind, title, description, html, toc }
}

const docs = []

// Top-level pages: tutorial.md, setup.md
for (const filename of fs.readdirSync(BSW_DIR)) {
  if (!filename.endsWith('.md')) continue
  const filepath = path.join(BSW_DIR, filename)
  const slug = filename.replace(/\.md$/, '')
  docs.push(await loadDoc(filepath, slug, 'page'))
}

// Handouts: content/bsw/handouts/*.md
const HANDOUTS_DIR = path.join(BSW_DIR, 'handouts')
if (fs.existsSync(HANDOUTS_DIR)) {
  for (const filename of fs.readdirSync(HANDOUTS_DIR)) {
    if (!filename.endsWith('.md')) continue
    const filepath = path.join(HANDOUTS_DIR, filename)
    const slug = filename.replace(/\.md$/, '').replace(/-md-template$/, '')
    docs.push(await loadDoc(filepath, slug, 'handout'))
  }
}

const json = JSON.stringify(docs, null, 2)
const code = `// AUTO-GENERATED · do not edit manually; regenerated on every build via scripts/generate-bsw-manifest.mjs

export type BswDoc = {
  slug: string
  kind: 'page' | 'handout'
  title: string
  description: string
  html: string
  toc: { id: string; text: string }[]
}

export const bswDocs: BswDoc[] = ${json}

export function getBswDoc(kind: 'page' | 'handout', slug: string): BswDoc | undefined {
  return bswDocs.find(d => d.kind === kind && d.slug === slug)
}

export function getBswHandouts(): BswDoc[] {
  return bswDocs.filter(d => d.kind === 'handout')
}
`

fs.writeFileSync(OUT_FILE, code)
console.log(`[bsw-manifest] wrote ${docs.length} doc(s) → lib/bsw-manifest.generated.ts`)

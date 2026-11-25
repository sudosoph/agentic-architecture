// Reads all MDX files from content/guides, renders MDX → HTML at build time,
// and writes a static manifest. Mirrors generate-blog-manifest.mjs exactly so
// the two pipelines stay in sync.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const GUIDES_DIR = path.join(__dirname, '..', 'content', 'guides')
const OUT_FILE = path.join(__dirname, '..', 'lib', 'guides-manifest.generated.ts')

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const [, yaml, content] = match
  const data = {}
  for (const line of yaml.split('\n')) {
    const colon = line.indexOf(':')
    if (colon < 0) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim()
    if (val.startsWith('[')) {
      data[key] = val.slice(1, val.lastIndexOf(']')).split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    } else if (val === 'true') {
      data[key] = true
    } else if (val === 'false') {
      data[key] = false
    } else {
      data[key] = val.replace(/^["']|["']$/g, '')
    }
  }
  return { data, content }
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMdx)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeStringify, { allowDangerousHtml: true })

async function mdxToHtml(content) {
  const stripped = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  const file = await processor.process(stripped)
  return String(file)
}

function extractToc(html) {
  const matches = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)]
  return matches.map(([, id, inner]) => ({
    id,
    text: inner.replace(/<[^>]+>/g, '').trim(),
  }))
}

if (!fs.existsSync(GUIDES_DIR)) {
  fs.mkdirSync(GUIDES_DIR, { recursive: true })
}

const files = fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith('.mdx'))
const guides = await Promise.all(
  files.map(async filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(GUIDES_DIR, filename), 'utf-8')
    const { data, content } = parseFrontmatter(raw)
    const html = await mdxToHtml(content)
    const toc = extractToc(html)
    return { slug, frontmatter: data, html, toc }
  })
)

const json = JSON.stringify(guides, null, 2)
const code = `// AUTO-GENERATED — do not edit manually; regenerated on every build via scripts/generate-guides-manifest.mjs
import type { GuideFrontmatter } from './guides'

export const guides: Array<{
  slug: string
  frontmatter: GuideFrontmatter
  html: string
  toc: { id: string; text: string }[]
}> = ${json}
`

fs.writeFileSync(OUT_FILE, code)
console.log(`[guides-manifest] wrote ${guides.length} guide(s) → lib/guides-manifest.generated.ts`)

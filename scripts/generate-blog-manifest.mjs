// Reads all MDX files from content/blog, renders Markdown + inline SVG HTML at build time,
// and writes a static manifest so Cloudflare Workers never need runtime eval/compileMDX.
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
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')
const OUT_FILE = path.join(__dirname, '..', 'lib', 'blog-manifest.generated.ts')

function unquoteYamlScalar(rawVal) {
  return String(rawVal)
    .trim()
    .replace(/^"(.*)"$/, '$1')
    .replace(/^'(.*)'$/, '$1')
    .replace(/\\"/g, '"')
}

export function decodeHtmlEntities(input) {
  return String(input)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
}

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const [, yaml, content] = match
  const data = {}
  const lines = yaml.split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim() || line.trim().startsWith('#')) continue

    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!keyMatch) continue
    const [, key, rawRest] = keyMatch
    const val = rawRest.trim()

    if (val === '') {
      const items = []
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        i += 1
        items.push(unquoteYamlScalar(lines[i].replace(/^\s*-\s+/, '')))
      }
      data[key] = items
    } else if (val.startsWith('[')) {
      try {
        data[key] = JSON.parse(val)
      } catch {
        data[key] = val
          .slice(1, val.lastIndexOf(']'))
          .split(',')
          .map(s => unquoteYamlScalar(s))
          .filter(Boolean)
      }
    } else if (val === 'true') {
      data[key] = true
    } else if (val === 'false') {
      data[key] = false
    } else if (/^\d+$/.test(val)) {
      data[key] = Number(val)
    } else {
      data[key] = unquoteYamlScalar(val)
    }
  }
  return { data, content }
}

function computeReadingMinutes(content) {
  const plain = content
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*`>_~\[\]()|-]/g, ' ')
    .trim()
  const wordCount = plain ? plain.split(/\s+/).filter(Boolean).length : 0
  return Math.max(1, Math.round(wordCount / 220))
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeStringify, { allowDangerousHtml: true })

function normalizeRawHtmlFigures(markdown) {
  return markdown
    .replace(/<figure\b[\s\S]*?<\/figure>/gi, block =>
      block
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean)
        .join('\n'),
    )
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, block =>
      block
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean)
        .join('\n'),
    )
}

async function mdxToHtml(content) {
  const stripped = normalizeRawHtmlFigures(content.replace(/\{\/\*[\s\S]*?\*\/\}/g, ''))
  const file = await processor.process(stripped)
  let html = String(file)
  html = html
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, '</table></div>')
  return html
}

function extractToc(html) {
  const matches = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)]
  return matches.map(([, id, inner]) => ({
    id,
    text: decodeHtmlEntities(inner.replace(/<[^>]+>/g, '').trim()),
  }))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx')).sort()
  const posts = await Promise.all(
    files.map(async filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = parseFrontmatter(raw)
      const readingMinutes = computeReadingMinutes(content)
      const briefing = Array.isArray(data.briefing)
        ? data.briefing
        : typeof data.briefing === 'string' && data.briefing.trim()
          ? [data.briefing.trim()]
          : []
      const frontmatter = {
        ...data,
        briefing,
        slug: data.slug || slug,
        track: data.track || 'engineering',
        readingMinutes,
      }
      const html = await mdxToHtml(content)
      const toc = extractToc(html)
      return { slug, frontmatter, html, toc }
    }),
  )

  const json = JSON.stringify(posts, null, 2)
  const code = `// AUTO-GENERATED: regenerated on every build via scripts/generate-blog-manifest.mjs
import type { PostFrontmatter } from './mdx'

export const blogPosts: Array<{
  slug: string
  frontmatter: PostFrontmatter
  html: string
  toc: { id: string; text: string }[]
}> = ${json}
`

  fs.writeFileSync(OUT_FILE, code)
  console.log(`[blog-manifest] wrote ${posts.length} post(s) -> lib/blog-manifest.generated.ts`)
}

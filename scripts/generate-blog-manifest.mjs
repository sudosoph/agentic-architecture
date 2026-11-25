// Reads all MDX files from content/blog, renders MDX -> HTML at build time,
// and writes a static manifest. The HTML is embedded so the Worker never
// needs to call compileMDX (which uses eval/new Function and is blocked
// in the CF Workers runtime).
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
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')
const OUT_FILE = path.join(__dirname, '..', 'lib', 'blog-manifest.generated.ts')

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
      data[key] = val
        .slice(1, val.lastIndexOf(']'))
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (val === 'true') {
      data[key] = true
    } else if (val === 'false') {
      data[key] = false
    } else if (/^\d+$/.test(val)) {
      data[key] = Number(val)
    } else {
      data[key] = val.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1').replace(/\\"/g, '"')
    }
  }
  return { data, content }
}

function computeReadingMinutes(content) {
  const plain = content
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*`>_~\[\]()|-]/g, ' ')
    .trim()
  const wordCount = plain ? plain.split(/\s+/).filter(Boolean).length : 0
  return Math.max(1, Math.round(wordCount / 220))
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
    text: inner.replace(/<[^>]+>/g, '').trim(),
  }))
}

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx')).sort()
const posts = await Promise.all(
  files.map(async filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data, content } = parseFrontmatter(raw)
    const readingMinutes = computeReadingMinutes(content)
    const frontmatter = {
      ...data,
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
const code = `// AUTO-GENERATED — do not edit manually; regenerated on every build via scripts/generate-blog-manifest.mjs
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

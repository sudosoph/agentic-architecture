// Compiles all MDX modules in content/curriculum into a static TypeScript manifest
// so Cloudflare Workers SSR renders /courses/[slug] and /vault/[token] without runtime fs.
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
const CURRICULUM_DIR = path.join(__dirname, '..', 'content', 'curriculum')
const OUT_FILE = path.join(__dirname, '..', 'lib', 'curriculum-manifest.generated.ts')

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
    if (!key) continue
    if (val.startsWith('[')) {
      try {
        data[key] = JSON.parse(val)
      } catch {
        data[key] = val
          .slice(1, val.lastIndexOf(']'))
          .split(',')
          .map(s => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean)
      }
    } else if (val === 'true') {
      data[key] = true
    } else if (val === 'false') {
      data[key] = false
    } else if (key === 'durationMinutes' && !Number.isNaN(Number(val))) {
      data[key] = Number(val)
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
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, '</table></div>')
}

function extractToc(html) {
  const matches = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)]
  return matches.map(([, id, inner]) => ({
    id,
    text: inner.replace(/<[^>]+>/g, '').trim(),
  }))
}

if (!fs.existsSync(CURRICULUM_DIR)) {
  fs.mkdirSync(CURRICULUM_DIR, { recursive: true })
}

const files = fs
  .readdirSync(CURRICULUM_DIR)
  .filter(f => f.endsWith('.mdx'))
  .sort()

const modules = await Promise.all(
  files.map(async filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(CURRICULUM_DIR, filename), 'utf-8')
    const { data, content } = parseFrontmatter(raw)
    const html = await mdxToHtml(content)
    const toc = extractToc(html)
    return {
      slug,
      frontmatter: {
        slug,
        ...data,
      },
      html,
      toc,
    }
  }),
)

const json = JSON.stringify(modules, null, 2)
const code = `// AUTO-GENERATED: regenerated on every build via scripts/generate-curriculum-manifest.mjs
import type { ModuleFrontmatter } from './curriculum'

export const curriculumModules: Array<{
  slug: string
  frontmatter: ModuleFrontmatter
  html: string
  toc: { id: string; text: string }[]
}> = ${json}
`

fs.writeFileSync(OUT_FILE, code)
console.log(
  `[curriculum-manifest] wrote ${modules.length} module(s) -> lib/curriculum-manifest.generated.ts`,
)

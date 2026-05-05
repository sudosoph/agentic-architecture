// Reads all MDX files from content/blog and writes a static manifest that
// can be imported at runtime without any fs calls (required for CF Workers).
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
const posts = files.map(filename => {
  const slug = filename.replace(/\.mdx$/, '')
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
  const { data, content } = parseFrontmatter(raw)
  return { slug, frontmatter: data, content }
})

const json = JSON.stringify(posts, null, 2)
const code = `// AUTO-GENERATED — do not edit manually; regenerated on every build via scripts/generate-blog-manifest.mjs
import type { PostFrontmatter } from './mdx'

export const blogPosts: Array<{ slug: string; frontmatter: PostFrontmatter; content: string }> = ${json}
`

fs.writeFileSync(OUT_FILE, code)
console.log(`[blog-manifest] wrote ${posts.length} post(s) → lib/blog-manifest.generated.ts`)

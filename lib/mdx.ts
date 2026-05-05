import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface PostFrontmatter {
  title: string
  slug: string
  publishedDate: string
  description: string
  tags: string[]
  draft?: boolean
}

export type PostMeta = Omit<PostFrontmatter, 'draft'>

function parseFrontmatter(raw: string): { data: PostFrontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {} as PostFrontmatter, content: raw }

  const [, yaml, content] = match
  const data: Record<string, unknown> = {}

  for (const line of yaml.split('\n')) {
    const colon = line.indexOf(':')
    if (colon < 0) continue
    const key = line.slice(0, colon).trim()
    const raw = line.slice(colon + 1).trim()

    if (raw.startsWith('[')) {
      data[key] = raw
        .slice(1, raw.lastIndexOf(']'))
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (raw === 'true') {
      data[key] = true
    } else if (raw === 'false') {
      data[key] = false
    } else {
      data[key] = raw.replace(/^["']|["']$/g, '')
    }
  }

  return { data: data as unknown as PostFrontmatter, content }
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data } = parseFrontmatter(raw)
      return data
    })
    .filter(post => !post.draft)
    .sort((a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    )
    .map(({ draft: _draft, ...rest }) => rest)
}

export function getPost(slug: string): { frontmatter: PostFrontmatter; content: string } | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = parseFrontmatter(raw)
  return { frontmatter: data, content }
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return data as PostFrontmatter
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
  const { data, content } = matter(raw)
  return { frontmatter: data as PostFrontmatter, content }
}

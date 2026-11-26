import { blogPosts } from './blog-manifest.generated'

export type BlogTrack = 'small-business' | 'models-rigs' | 'engineering'

export interface PostFrontmatter {
  title: string
  slug: string
  publishedDate: string
  description: string
  briefing: string[]
  tags: string[]
  track?: BlogTrack
  readingMinutes?: number
  kind?: 'post' | 'deep-dive'
  draft?: boolean
}

export type PostMeta = Omit<PostFrontmatter, 'draft'>

export function getAllPosts(): PostMeta[] {
  return blogPosts
    .filter(p => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedDate).getTime() -
        new Date(a.frontmatter.publishedDate).getTime(),
    )
    .map(({ frontmatter: { draft: _draft, ...rest }, slug }) => ({ ...rest, slug }))
}

export function getPostsByTrack(track?: string): PostMeta[] {
  const all = getAllPosts()
  if (!track || track === 'all') return all
  return all.filter(p => p.track === track)
}

export function getDeepDives(): PostMeta[] {
  return getAllPosts().filter(p => p.kind === 'deep-dive')
}

export function getRegularPosts(): PostMeta[] {
  return getAllPosts().filter(p => p.kind !== 'deep-dive')
}

export type TocItem = { id: string; text: string }

export function getPost(
  slug: string,
): { frontmatter: PostFrontmatter; html: string; toc: TocItem[] } | null {
  const post = blogPosts.find(p => p.slug === slug)
  return post ? { frontmatter: post.frontmatter, html: post.html, toc: post.toc } : null
}

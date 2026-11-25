import { guides } from './guides-manifest.generated'

export interface GuideFrontmatter {
  title: string
  slug: string
  publishedDate: string
  description: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  repoUrl?: string
  draft?: boolean
}

export type GuideMeta = Omit<GuideFrontmatter, 'draft'>

export function getAllGuides(): GuideMeta[] {
  return guides
    .filter(g => !g.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedDate).getTime() -
        new Date(a.frontmatter.publishedDate).getTime()
    )
    .map(({ frontmatter: { draft: _draft, ...rest }, slug }) => ({ ...rest, slug }))
}

export type GuideTocItem = { id: string; text: string }

export function getGuide(
  slug: string
): { frontmatter: GuideFrontmatter; html: string; toc: GuideTocItem[] } | null {
  const guide = guides.find(g => g.slug === slug)
  return guide ? { frontmatter: guide.frontmatter, html: guide.html, toc: guide.toc } : null
}

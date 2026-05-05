import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Metadata } from 'next'
import { getAllPosts, getPost } from '@/lib/mdx'
import { getMDXComponents } from '@/lib/mdx-components'
import { PageHeader } from '@/components/ui/page-header'
import { Badge } from '@/components/ui/badge'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  }
}

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export const dynamicParams = false

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { content } = await compileMDX({
    source: post.content,
    components: getMDXComponents(),
    options: {
      mdxOptions: {
        rehypePlugins: [
          [rehypePrettyCode, { theme: 'tokyo-night', keepBackground: false }],
        ],
      },
    },
  })

  const dateFormatted = new Date(post.frontmatter.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article>
      <PageHeader
        title={post.frontmatter.title}
        meta={dateFormatted}
        description={post.frontmatter.description}
      />
      {post.frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {post.frontmatter.tags.map(tag => (
            <Badge key={tag} variant="tag">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <div className="prose mt-10">{content}</div>
    </article>
  )
}

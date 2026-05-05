import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getPost, getAllPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateAltText({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  return post ? post.frontmatter.title : 'Blog post'
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const font = await readFile(
    join(process.cwd(), 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf')
  )
  const fontBold = await readFile(
    join(process.cwd(), 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf')
  )

  const date = new Date(post.frontmatter.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          padding: '60px',
          fontFamily: 'GeistMono',
        }}
      >
        {/* Top: site identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#34d399',
              borderRadius: '50%',
            }}
          />
          <span style={{ color: '#a1a1aa', fontSize: '16px', letterSpacing: '0.1em' }}>
            AGENTICARCHITECT.AI
          </span>
        </div>

        {/* Post title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              color: '#fbbf24',
              fontSize: post.frontmatter.title.length > 50 ? '44px' : '56px',
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: '900px',
            }}
          >
            {post.frontmatter.title}
          </div>
          {post.frontmatter.description && (
            <div style={{ color: '#a1a1aa', fontSize: '20px', lineHeight: 1.5, maxWidth: '800px' }}>
              {post.frontmatter.description.length > 120
                ? post.frontmatter.description.slice(0, 120) + '…'
                : post.frontmatter.description}
            </div>
          )}
        </div>

        {/* Bottom: author + date */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#52525b', fontSize: '16px' }}>Sophia Stein</span>
          <span style={{ color: '#52525b', fontSize: '16px' }}>{date}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'GeistMono', data: font, weight: 400 },
        { name: 'GeistMono', data: fontBold, weight: 700 },
      ],
    }
  )
}

import { ImageResponse } from 'next/og'
import { getAllPosts, getPost, type BlogTrack } from '@/lib/mdx'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

const TRACK_LABELS: Record<BlogTrack, string> = {
  'small-business': 'Strategy & Operations',
  'models-rigs': 'Models & Infrastructure',
  engineering: 'Systems Architecture',
}

export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  const title = post?.frontmatter.title ?? 'Agentic Architect Essay'
  const desc =
    post?.frontmatter.description ??
    'Systems architecture, workflow design, and practical AI unit economics.'
  const trackKey: BlogTrack = post?.frontmatter.track ?? 'small-business'
  const mins = post?.frontmatter.readingMinutes ?? 6

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#F5F7FA',
          padding: '32px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            color: '#15181E',
            border: '1px solid #DCE0E6',
            borderTop: '6px solid #106952',
            padding: '50px 64px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '18px', color: '#106952', fontWeight: 600 }}>
              {TRACK_LABELS[trackKey]} · {mins} min read
            </span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#15181E' }}>
              Agentic Architect
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1020px' }}>
            <div
              style={{
                fontSize: title.length > 70 ? '44px' : '52px',
                fontWeight: 700,
                color: '#15181E',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '22px',
                color: '#5D6472',
                lineHeight: 1.42,
              }}
            >
              {desc.length > 150 ? `${desc.slice(0, 147)}...` : desc}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '20px',
              borderTop: '1px solid #DCE0E6',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <svg width="38" height="38" viewBox="0 0 64 64" fill="none">
                <rect width="64" height="64" rx="12" fill="#15181E" />
                <path
                  d="M14 47L25.5 17L37 47"
                  stroke="#FFFFFF"
                  strokeWidth="4.2"
                  strokeLinejoin="miter"
                />
                <path
                  d="M27 47L38.5 17L50 47"
                  stroke="#34D399"
                  strokeWidth="4.2"
                  strokeLinejoin="miter"
                />
                <line x1="18.5" y1="37" x2="45.5" y2="37" stroke="#FFFFFF" strokeWidth="3.4" />
              </svg>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#15181E' }}>
                Sophia Stein · Boulder, CO
              </span>
            </div>
            <span style={{ fontSize: '17px', color: '#5D6472', fontWeight: 600 }}>
              agenticarchitect.ai/blog
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}

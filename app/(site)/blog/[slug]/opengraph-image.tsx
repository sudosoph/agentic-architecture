import { ImageResponse } from 'next/og'
import { getAllPosts, getPost, type BlogTrack } from '@/lib/mdx'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

const TRACK_LABELS: Record<BlogTrack, string> = {
  'small-business': 'Strategy & Operations',
  'models-rigs': 'Models & Private Infrastructure',
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FAF8F5',
          color: '#181920',
          padding: '64px 76px',
          fontFamily: 'Georgia, serif',
          borderTop: '8px solid #181920',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'sans-serif',
          }}
        >
          <span style={{ fontSize: '18px', color: '#585B68', fontWeight: 500 }}>
            {TRACK_LABELS[trackKey]} · {mins} min read
          </span>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#181920' }}>
            Agentic Architect
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1040px' }}>
          <div
            style={{
              fontSize: title.length > 70 ? '46px' : '54px',
              fontWeight: 400,
              color: '#181920',
              lineHeight: 1.14,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '23px',
              color: '#585B68',
              lineHeight: 1.42,
              fontFamily: 'sans-serif',
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
            paddingTop: '22px',
            borderTop: '1px solid #E3E0D8',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg width="38" height="38" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="12" fill="#181920" />
              <path
                d="M14 47L25.5 17L37 47"
                stroke="#FAF8F5"
                strokeWidth="4.2"
                strokeLinejoin="miter"
              />
              <path
                d="M27 47L38.5 17L50 47"
                stroke="#FAF8F5"
                strokeOpacity="0.55"
                strokeWidth="4.2"
                strokeLinejoin="miter"
              />
              <line x1="18.5" y1="37" x2="45.5" y2="37" stroke="#FAF8F5" strokeWidth="3.4" />
            </svg>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#181920' }}>
              Sophia Stein · Boulder, CO
            </span>
          </div>
          <span style={{ fontSize: '17px', color: '#585B68' }}>agenticarchitect.ai/blog</span>
        </div>
      </div>
    ),
    { ...size },
  )
}

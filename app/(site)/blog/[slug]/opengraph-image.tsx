import { ImageResponse } from 'next/og'
import { getAllPosts, getPost, type BlogTrack } from '@/lib/mdx'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

const TRACK_STYLE: Record<
  BlogTrack,
  { label: string; bg: string; border: string; text: string }
> = {
  'small-business': {
    label: 'Small Business & Workflows',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    text: '#047857',
  },
  'models-rigs': {
    label: 'Models, Tailscale & Rigs',
    bg: '#FFFBEB',
    border: '#FDE68A',
    text: '#B45309',
  },
  engineering: {
    label: 'Engineering Deep Dive',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    text: '#1D4ED8',
  },
}

export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  const title = post?.frontmatter.title ?? 'Agentic Architect Playbook'
  const desc =
    post?.frontmatter.description ??
    'Practical AI workflows, brand systems, and private infrastructure.'
  const trackKey: BlogTrack = post?.frontmatter.track ?? 'small-business'
  const pill = TRACK_STYLE[trackKey]
  const mins = post?.frontmatter.readingMinutes ?? 5

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          borderTop: '12px solid #2563EB',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: pill.bg,
              border: `1px solid ${pill.border}`,
              color: pill.text,
              fontSize: '17px',
              fontWeight: 700,
            }}
          >
            {pill.label} · {mins} min read
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563EB' }}>
            Agentic Architect
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1040px' }}>
          <div
            style={{
              fontSize: title.length > 72 ? '44px' : '52px',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.16,
              letterSpacing: '-0.025em',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: '23px', color: '#475569', lineHeight: 1.4 }}>
            {desc.length > 150 ? `${desc.slice(0, 147)}...` : desc}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '22px',
            borderTop: '2px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
              }}
            >
              SS
            </div>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>
              Sophia Stein · Columbia CS · ex-McKinsey · Boulder, CO
            </span>
          </div>
          <span style={{ fontSize: '17px', fontWeight: 600, color: '#475569' }}>
            agenticarchitect.ai/blog
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}

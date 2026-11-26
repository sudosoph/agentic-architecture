import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/site-config'

export const alt = `${SITE_CONFIG.siteName} · ${SITE_CONFIG.authorName}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
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
          padding: '68px 76px',
          fontFamily: 'Georgia, serif',
          borderTop: '8px solid #181920',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <svg width="46" height="46" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="12" fill="#181920" />
              <rect
                x="3"
                y="3"
                width="58"
                height="58"
                rx="9.5"
                stroke="#FAF8F5"
                strokeOpacity="0.16"
                strokeWidth="1.5"
              />
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
            <span style={{ fontSize: '26px', fontWeight: 600 }}>Agentic Architect</span>
          </div>
          <span style={{ fontSize: '18px', color: '#585B68', fontFamily: 'sans-serif' }}>
            Essays · Skool Lab · Advisory
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1020px' }}>
          <div
            style={{
              fontSize: '58px',
              fontWeight: 400,
              color: '#181920',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            What new AI makes possible, what it changes for organizations, and how to build with it.
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#585B68',
              lineHeight: 1.45,
              fontFamily: 'sans-serif',
            }}
          >
            Systems architecture essays, weekly Substack field notes, and hands-on courses by Sophia
            Stein.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '24px',
            borderTop: '1px solid #E3E0D8',
            fontFamily: 'sans-serif',
            fontSize: '18px',
            color: '#585B68',
          }}
        >
          <span>Sophia Stein · Boulder, CO</span>
          <span style={{ color: '#181920', fontWeight: 600 }}>agenticarchitect.ai</span>
        </div>
      </div>
    ),
    { ...size },
  )
}

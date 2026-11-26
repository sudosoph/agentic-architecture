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
            padding: '52px 64px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
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
              <span style={{ fontSize: '25px', fontWeight: 700, letterSpacing: '-0.025em' }}>
                Agentic Architect
              </span>
            </div>
            <span style={{ fontSize: '17px', color: '#5D6472', fontWeight: 500 }}>
              Essays · Skool Lab · Advisory
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1000px' }}>
            <div
              style={{
                fontSize: '54px',
                fontWeight: 700,
                color: '#15181E',
                lineHeight: 1.08,
                letterSpacing: '-0.032em',
              }}
            >
              What new AI makes possible, what it changes for business, and how to build with it.
            </div>
            <div
              style={{
                fontSize: '23px',
                color: '#5D6472',
                lineHeight: 1.45,
              }}
            >
              Systems architecture essays, weekly Substack field notes, and hands-on courses by
              Sophia Stein.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '22px',
              borderTop: '1px solid #DCE0E6',
              fontSize: '18px',
              color: '#5D6472',
            }}
          >
            <span>Sophia Stein · Boulder, CO</span>
            <span style={{ color: '#106952', fontWeight: 700 }}>agenticarchitect.ai</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}

import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/site-config'

export const alt = 'What Is an Agentic Architect? Role, 4-Layer Stack & Reference Guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function PillarOpenGraphImage() {
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
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
            <span style={{ fontSize: '21px', fontWeight: 600, color: '#181920' }}>
              {SITE_CONFIG.siteName}
            </span>
          </div>
          <span style={{ fontSize: '17px', color: '#585B68' }}>Cornerstone Reference Guide</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1040px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 400,
              color: '#181920',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            What Is an Agentic Architect?
          </div>
          <div
            style={{
              fontSize: '25px',
              color: '#585B68',
              lineHeight: 1.4,
              fontFamily: 'sans-serif',
            }}
          >
            The vendor-neutral 4-layer stack: portable context, scoped tool permissions, evaluation
            loops, and human-in-the-loop governance.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '22px',
            borderTop: '1px solid #E3E0D8',
            fontSize: '18px',
            color: '#585B68',
            fontFamily: 'sans-serif',
          }}
        >
          <span>Sophia Stein · Boulder, CO</span>
          <span style={{ color: '#181920', fontWeight: 600 }}>
            agenticarchitect.ai/what-is-an-agentic-architect
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}

import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/site-config'

export const alt = 'The Sovereign Stack · Hardware Physics, Model Routing & Loop Engineering'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function SovereignStackOgImage() {
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
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
              <span style={{ fontSize: '21px', fontWeight: 700, color: '#15181E' }}>
                {SITE_CONFIG.siteName} · Technical Monograph
              </span>
            </div>
            <span style={{ fontSize: '17px', color: '#106952', fontWeight: 600 }}>
              12 Live Chapters + 3 Field Manuals
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1020px' }}>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.032em',
                color: '#15181E',
              }}
            >
              The Sovereign Stack
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#5D6472',
                lineHeight: 1.4,
              }}
            >
              Vendor-neutral unified-memory benchmarks, three-tier open-weight routing, encrypted
              Tailscale meshes, and deterministic loop verifiers.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '20px',
              borderTop: '1px solid #DCE0E6',
              fontSize: '18px',
              color: '#5D6472',
            }}
          >
            <span>Sophia Stein · Boulder, CO</span>
            <span style={{ color: '#15181E', fontWeight: 700 }}>
              agenticarchitect.ai/sovereign-stack
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}

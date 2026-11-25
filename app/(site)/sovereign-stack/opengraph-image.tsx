import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/site-config'

export const alt = 'The Sovereign Stack · OSS Workflows, Hardware Rigs & AI Unit Economics'
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          borderTop: '12px solid #10B981',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#93C5FD' }}>
            {SITE_CONFIG.siteName} · Open Field Guide
          </span>
          <div
            style={{
              display: 'flex',
              padding: '8px 16px',
              borderRadius: '999px',
              backgroundColor: '#064E3B',
              color: '#6EE7B7',
              fontSize: '15px',
              fontWeight: 700,
            }}
          >
            15 Live Chapters + 3 Free Manuals
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1040px' }}>
          <div style={{ fontSize: '58px', fontWeight: 800, lineHeight: 1.1 }}>
            The Sovereign Stack
          </div>
          <div style={{ fontSize: '26px', color: '#CBD5E1', lineHeight: 1.38 }}>
            Self-hosted $9/mo OSS infrastructure, 96GB unified-memory hardware rigs over Tailscale,
            and three-tier open-weight routing that cuts AI spend by 84%.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '22px',
            borderTop: '1px solid #334155',
            fontSize: '17px',
            color: '#94A3B8',
            fontWeight: 600,
          }}
        >
          <span>By Sophia Stein · Boulder, CO</span>
          <span style={{ color: '#6EE7B7', fontWeight: 700 }}>
            agenticarchitect.ai/sovereign-stack
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}

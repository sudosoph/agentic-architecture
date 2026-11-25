import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/site-config'

export const alt = 'What Is an Agentic Architect? Role, 4-Layer Stack & 2026 Playbook'
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
          backgroundColor: '#FFFFFF',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          borderTop: '12px solid #2563EB',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 800,
              }}
            >
              AA
            </div>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
              {SITE_CONFIG.siteName}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 16px',
              borderRadius: '999px',
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              fontSize: '15px',
              fontWeight: 700,
            }}
          >
            2026 Cornerstone Reference Guide
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1040px' }}>
          <div
            style={{
              fontSize: '54px',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
            }}
          >
            What Is an Agentic Architect?
          </div>
          <div style={{ fontSize: '26px', color: '#475569', lineHeight: 1.38 }}>
            The vendor-neutral 4-layer stack: portable Brand Brains, scoped tool permissions,
            readiness scoring, evaluation loops, and human-in-the-loop governance.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '22px',
            borderTop: '2px solid #E2E8F0',
            fontSize: '17px',
            color: '#334155',
            fontWeight: 600,
          }}
        >
          <span>By Sophia Stein · Columbia CS · ex-McKinsey · Boulder, CO</span>
          <span style={{ color: '#2563EB', fontWeight: 700 }}>
            agenticarchitect.ai/what-is-an-agentic-architect
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}

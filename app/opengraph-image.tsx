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
          backgroundColor: '#FFFFFF',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          borderTop: '12px solid #2563EB',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 800,
              }}
            >
              SS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
                Agentic Architect
              </span>
              <span style={{ fontSize: '15px', color: '#475569' }}>
                Boulder, CO · Workflows, Brand Systems &amp; Private AI
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              color: '#047857',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            Free Starter Kit &amp; Live 60-Min Masterclass
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1020px' }}>
          <div
            style={{
              fontSize: '58px',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
            }}
          >
            Hook up AI workflows, build your brand, and own your stack.
          </div>
          <div style={{ fontSize: '26px', color: '#475569', lineHeight: 1.4 }}>
            Plain-English AI systems, executive workshops, and private infrastructure for founders,
            operators, and modern teams.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '24px',
            borderTop: '2px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', fontSize: '17px', color: '#334155', fontWeight: 600 }}>
            <span>Sophia Stein</span>
            <span>·</span>
            <span>Columbia CS</span>
            <span>·</span>
            <span>ex-McKinsey</span>
            <span>·</span>
            <span>300+ Trained at BSW</span>
            <span>·</span>
            <span>Women Who Code</span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#2563EB' }}>
            agenticarchitect.ai
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}

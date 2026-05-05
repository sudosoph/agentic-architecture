import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Agentic Architecture — Sophia Stein'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const font = await readFile(
    join(process.cwd(), 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf')
  )
  const fontBold = await readFile(
    join(process.cwd(), 'node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf')
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          padding: '60px',
          fontFamily: 'GeistMono',
        }}
      >
        {/* Top: site identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#34d399',
              borderRadius: '50%',
            }}
          />
          <span style={{ color: '#a1a1aa', fontSize: '16px', letterSpacing: '0.1em' }}>
            AGENTICARCHITECT.AI
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: '#fbbf24', fontSize: '64px', fontWeight: 700, lineHeight: 1.1 }}>
            Sovereign AI Architect
          </div>
          <div style={{ color: '#a1a1aa', fontSize: '22px', lineHeight: 1.5, maxWidth: '800px' }}>
            Local-first LLM infrastructure, consulting, and open-source tools.
          </div>
        </div>

        {/* Bottom: benchmark callout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              border: '1px solid #27272a',
              backgroundColor: '#18181b',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ color: '#22d3ee', fontSize: '28px', fontWeight: 700 }}>28.4 t/s</span>
            <span style={{ color: '#a1a1aa', fontSize: '14px' }}>
              GLM-4 9B Q8_0 · ROCm 7.3 · AMD Strix Point
            </span>
          </div>
          <span style={{ color: '#52525b', fontSize: '14px' }}>Boulder, CO</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'GeistMono', data: font, weight: 400 },
        { name: 'GeistMono', data: fontBold, weight: 700 },
      ],
    }
  )
}

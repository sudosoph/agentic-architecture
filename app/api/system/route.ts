import { NextResponse } from 'next/server'
import { getWorkerEnv } from '@/lib/cloudflare-env'

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'agentic-architect',
      status: 'healthy',
      resendConfigured: Boolean(getWorkerEnv('RESEND_API_KEY')),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  )
}

import { NextResponse } from 'next/server'

export const runtime = 'edge'

// Stub, returns 501 until Plan C wires the telemetry bridge
export function GET() {
  return NextResponse.json(
    { error: 'telemetry not configured' },
    { status: 501 }
  )
}

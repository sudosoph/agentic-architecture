import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * Safely reads a secret or environment variable on Cloudflare Workers
 * (`getCloudflareContext().env`) with a clean fallback to `process.env`
 * for local Next.js dev, CLI scripts, and Vitest unit tests.
 */
export function getWorkerEnv(key: string): string | undefined {
  try {
    const ctx = getCloudflareContext()
    const envRecord = ctx?.env as Record<string, unknown> | undefined
    const workerVal = envRecord?.[key]
    if (typeof workerVal === 'string' && workerVal.trim()) {
      return workerVal.trim()
    }
  } catch {
    // Outside OpenNext Cloudflare request context (local Node / Vitest).
  }

  const nodeVal = process.env[key]
  if (typeof nodeVal === 'string' && nodeVal.trim()) {
    return nodeVal.trim()
  }
  return undefined
}

/**
 * Registers a non-blocking background promise with Cloudflare Workers `ctx.waitUntil`
 * when running on the edge so isolates never terminate background fetches mid-flight.
 * Falls back to awaiting the promise in Node/Vitest environments.
 */
export async function runInBackground(promise: Promise<unknown>): Promise<void> {
  const safePromise = promise.catch(err => {
    console.error('[background] task error (non-fatal)', err)
  })

  try {
    const ctx = getCloudflareContext()
    if (ctx?.ctx && typeof ctx.ctx.waitUntil === 'function') {
      ctx.ctx.waitUntil(safePromise)
      return
    }
  } catch {
    // Outside OpenNext Cloudflare request context; await directly below.
  }

  await safePromise
}

import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic'
import config from '@/keystatic.config'

type KeystaticResp = { body: string | Uint8Array | null } & ResponseInit

function getHandler() {
  return makeGenericAPIRouteHandler({
    config,
    clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: process.env.KEYSTATIC_SECRET,
  })
}

function toResponse({ body, ...init }: KeystaticResp) {
  return new Response(body as BodyInit | null, init)
}

export async function GET(req: Request) {
  return toResponse(await getHandler()(req as Parameters<ReturnType<typeof getHandler>>[0]))
}

export async function POST(req: Request) {
  return toResponse(await getHandler()(req as Parameters<ReturnType<typeof getHandler>>[0]))
}

const POSTHOG_API_ORIGIN = 'https://us.i.posthog.com'
const POSTHOG_ASSET_ORIGIN = 'https://us-assets.i.posthog.com'
const ALLOWED_ORIGIN = 'https://agenticarchitect.ai'

const ALLOWED_FORWARD_HEADERS = new Set([
  'content-type',
  'content-encoding',
  'user-agent',
  'accept',
  'accept-language',
  'origin',
  'referer',
])

async function proxyPostHog(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path = [] } = await context.params
  if (
    path.length === 0 ||
    path.some(segment => !segment || segment === '.' || segment === '..')
  ) {
    return new Response('Invalid ingest path', { status: 400 })
  }

  const joinedPath = path.map(segment => encodeURIComponent(segment)).join('/')
  const reqUrl = new URL(request.url)
  const trailingSlash = reqUrl.pathname.endsWith('/') ? '/' : ''
  const upstreamOrigin =
    path[0] === 'static' || path[0] === 'array' ? POSTHOG_ASSET_ORIGIN : POSTHOG_API_ORIGIN
  const targetUrl = `${upstreamOrigin}/${joinedPath}${trailingSlash}${reqUrl.search}`

  const headers = new Headers()
  request.headers.forEach((value, key) => {
    const lower = key.toLowerCase()
    if (ALLOWED_FORWARD_HEADERS.has(lower)) {
      headers.set(key, value)
    }
  })

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD'
  let upstreamRes: Response
  try {
    upstreamRes = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      redirect: 'manual',
    })
  } catch {
    return new Response('Upstream analytics unavailable', { status: 502 })
  }

  const responseHeaders = new Headers()
  const contentType = upstreamRes.headers.get('content-type')
  if (contentType) responseHeaders.set('content-type', contentType)
  const cacheControl = upstreamRes.headers.get('cache-control')
  if (cacheControl) responseHeaders.set('cache-control', cacheControl)
  responseHeaders.set('access-control-allow-origin', ALLOWED_ORIGIN)

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    headers: responseHeaders,
  })
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  return proxyPostHog(request, context)
}

export async function POST(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  return proxyPostHog(request, context)
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': ALLOWED_ORIGIN,
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'Content-Type, Authorization',
    },
  })
}

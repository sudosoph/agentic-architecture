const POSTHOG_API_ORIGIN = 'https://us.i.posthog.com'
const POSTHOG_ASSET_ORIGIN = 'https://us-assets.i.posthog.com'

const STRIPPED_HEADERS = new Set([
  'cookie',
  'host',
  'connection',
  'content-length',
  'cf-connecting-ip',
])

async function proxyPostHog(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path = [] } = await context.params
  const joinedPath = path.map(segment => encodeURIComponent(segment)).join('/')
  const reqUrl = new URL(request.url)
  const upstreamOrigin = path[0] === 'static' ? POSTHOG_ASSET_ORIGIN : POSTHOG_API_ORIGIN
  const targetUrl = `${upstreamOrigin}/${joinedPath}${reqUrl.search}`

  const headers = new Headers()
  request.headers.forEach((value, key) => {
    if (!STRIPPED_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value)
    }
  })

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD'
  const upstreamRes = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: 'manual',
  })

  const responseHeaders = new Headers()
  const contentType = upstreamRes.headers.get('content-type')
  if (contentType) responseHeaders.set('content-type', contentType)
  const cacheControl = upstreamRes.headers.get('cache-control')
  if (cacheControl) responseHeaders.set('cache-control', cacheControl)
  responseHeaders.set('access-control-allow-origin', '*')

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
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'Content-Type, Authorization',
    },
  })
}

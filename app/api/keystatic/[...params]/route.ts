import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic'
import config from '@/keystatic.config'
import { getWorkerEnv } from '@/lib/cloudflare-env'

type KeystaticResp = { body: string | Uint8Array | null } & ResponseInit

function readKeystaticOAuthConfig() {
  const clientId = getWorkerEnv('KEYSTATIC_GITHUB_CLIENT_ID')
  const clientSecret = getWorkerEnv('KEYSTATIC_GITHUB_CLIENT_SECRET')
  const secret = getWorkerEnv('KEYSTATIC_SECRET')
  return {
    clientId,
    clientSecret,
    secret,
    configured: Boolean(clientId && clientSecret && secret),
  }
}

function renderLockedCmsNotice() {
  const isProd = process.env.NODE_ENV === 'production'
  const details = isProd
    ? '<p style="font-size:14px;color:#475569;">Keystatic GitHub OAuth (`KEYSTATIC_GITHUB_CLIENT_ID`) is currently disabled on this edge worker. Authenticate as the repository owner via <a href="/studio">/studio</a>.</p>'
    : '<p style="font-size:14px;">Local setup note: configure <code>KEYSTATIC_GITHUB_CLIENT_ID</code>, <code>KEYSTATIC_GITHUB_CLIENT_SECRET</code>, and <code>KEYSTATIC_SECRET</code> to test GitHub OAuth, or use <a href="/studio">/studio</a>.</p>'

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Restricted CMS · Agentic Architect</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 64px auto; padding: 0 20px; color: #0f172a; line-height: 1.6; }
    .card { border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; background: #f8fafc; }
    a.btn { display: inline-block; margin-top: 10px; background: #1d4ed8; color: #fff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h1 style="margin-top:0;font-size:18px;">Restricted Owner CMS</h1>
    ${details}
    <p><a class="btn" href="/studio">Owner Sign-In (/studio) →</a></p>
  </div>
</body>
</html>`
  return new Response(html, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, private, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

function getHandler(oauth: ReturnType<typeof readKeystaticOAuthConfig>) {
  return makeGenericAPIRouteHandler({
    config,
    clientId: oauth.clientId,
    clientSecret: oauth.clientSecret,
    secret: oauth.secret,
  })
}

function toResponse({ body, ...init }: KeystaticResp) {
  return new Response(body as BodyInit | null, init)
}

export async function GET(req: Request) {
  const oauth = readKeystaticOAuthConfig()
  if (!oauth.configured) {
    return renderLockedCmsNotice()
  }
  return toResponse(await getHandler(oauth)(req as Parameters<ReturnType<typeof getHandler>>[0]))
}

export async function POST(req: Request) {
  const oauth = readKeystaticOAuthConfig()
  if (!oauth.configured) {
    return renderLockedCmsNotice()
  }
  return toResponse(await getHandler(oauth)(req as Parameters<ReturnType<typeof getHandler>>[0]))
}

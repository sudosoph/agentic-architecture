import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic'
import config from '@/keystatic.config'

type KeystaticResp = { body: string | Uint8Array | null } & ResponseInit

function hasKeystaticOAuthEnv() {
  return Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  )
}

function renderMissingEnvGuide() {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Keystatic OAuth Setup · Agentic Architect</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 680px; margin: 48px auto; padding: 0 20px; color: #0f172a; line-height: 1.6; }
    .card { border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; background: #f8fafc; }
    code { background: #e2e8f0; padding: 2px 6px; border-radius: 5px; font-size: 0.9em; }
    a.btn { display: inline-block; margin-top: 12px; background: #1d4ed8; color: #fff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h1 style="margin-top:0;font-size:20px;">Use Browser Studio Now, or Connect Keystatic GitHub OAuth</h1>
    <p><strong>Fastest option (zero OAuth app needed):</strong> Open your browser-based Operator Studio to publish MDX posts, open 1-click GitHub PRs, pull live trend briefs, and approve reader replies immediately:</p>
    <p><a class="btn" href="/studio">Open Cloud Operator Studio (/studio) →</a></p>
    <hr style="border:0;border-top:1px solid #cbd5e1;margin:20px 0;" />
    <p style="font-size:14px;margin-bottom:8px;"><strong>Optional Keystatic Visual Editor setup:</strong> Create a GitHub OAuth App with callback URL <code>https://agenticarchitect.ai/api/keystatic/github/oauth/callback</code> and add three Worker secrets in Cloudflare:</p>
    <ul style="font-size:14px;">
      <li><code>KEYSTATIC_GITHUB_CLIENT_ID</code></li>
      <li><code>KEYSTATIC_GITHUB_CLIENT_SECRET</code></li>
      <li><code>KEYSTATIC_SECRET</code> (any 32+ char random string)</li>
    </ul>
  </div>
</body>
</html>`
  return new Response(html, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

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
  if (!hasKeystaticOAuthEnv()) {
    return renderMissingEnvGuide()
  }
  return toResponse(await getHandler()(req as Parameters<ReturnType<typeof getHandler>>[0]))
}

export async function POST(req: Request) {
  if (!hasKeystaticOAuthEnv()) {
    return renderMissingEnvGuide()
  }
  return toResponse(await getHandler()(req as Parameters<ReturnType<typeof getHandler>>[0]))
}

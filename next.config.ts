import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev()
}

// Permanent redirects for blog slugs that were renamed in the 2026-05-06
// editorial pass. Preserves any external links / search-engine results.
const RENAMED_SLUGS: Array<[string, string]> = [
  ['the-24-7-sdr', 'cold-email-agent'],
  ['the-agentic-audit', 'agent-ready-tasks'],
  ['framework-for-builders', 'framework-laptop-thesis'],
  ['personal-ai-agents-on-amd', 'personal-ai-agent-weekend'],
  ['ethical-autonomy', 'eu-ai-act-deadline'],
  ['scaling-to-1m-arr-with-2-people', 'solo-founder-1m-arr'],
]

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.agenticarchitect.ai',
          },
        ],
        destination: 'https://agenticarchitect.ai',
        permanent: true,
      },
      {
        source: '/:path+',
        has: [
          {
            type: 'host',
            value: 'www.agenticarchitect.ai',
          },
        ],
        destination: 'https://agenticarchitect.ai/:path+',
        permanent: true,
      },
      {
        source: '/agentic-architect',
        destination: '/what-is-an-agentic-architect',
        permanent: true,
      },
      ...RENAMED_SLUGS.map(([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
        permanent: true,
      })),
    ]
  },
}

export default nextConfig

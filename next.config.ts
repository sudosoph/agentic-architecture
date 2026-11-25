import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev()
}

// Permanent 308 redirects for renamed blog slugs so external links and indexed URLs preserve full equity.
const RENAMED_SLUGS: Array<[string, string]> = [
  ['the-24-7-sdr', 'cold-email-agent'],
  ['the-agentic-audit', 'agent-ready-tasks'],
  ['framework-for-builders', 'framework-laptop-thesis'],
  ['personal-ai-agents-on-amd', 'personal-ai-agent-weekend'],
  ['ethical-autonomy', 'eu-ai-act-deadline'],
  ['scaling-to-1m-arr-with-2-people', 'solo-founder-1m-arr'],
  ['personal-agents-tab-instinct-openinstinct-review', 'instinct-ai-vs-tab-review'],
  ['ai-org-chart-for-small-business-founders', 'ai-org-chart'],
  ['how-to-build-an-ai-chief-of-staff-2026', 'ai-chief-of-staff'],
  ['ai-implementation-program-vs-agency-vs-diy-guide', 'hire-ai-agency-vs-in-house'],
  ['512gb-unified-memory-mini-pcs-local-llm-2026', 'mac-studio-512gb-vs-dgx-spark'],
  ['loop-engineering-production-guide-2026', 'loop-engineering'],
  ['google-latest-models-vs-deepseek-4-1-business-guide', 'gemini-4-neon-vs-deepseek-v4'],
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

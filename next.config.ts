import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev()
}

// Permanent 308 redirects for renamed and retired blog slugs so external links and indexed URLs preserve 100% of search equity.
const RENAMED_SLUGS: Array<[string, string]> = [
  ['the-24-7-sdr', 'cold-email-agent'],
  ['the-agentic-audit', 'agent-ready-tasks'],
  ['framework-for-builders', 'mac-studio-512gb-vs-dgx-spark'],
  ['framework-laptop-thesis', 'mac-studio-512gb-vs-dgx-spark'],
  ['96gb-ram-thesis', 'mac-studio-512gb-vs-dgx-spark'],
  ['personal-ai-agents-on-amd', 'instinct-ai-vs-tab-review'],
  ['personal-ai-agent-weekend', 'instinct-ai-vs-tab-review'],
  ['ethical-autonomy', 'eu-ai-act-deadline'],
  ['scaling-to-1m-arr-with-2-people', 'solo-founder-1m-arr'],
  ['personal-agents-tab-instinct-openinstinct-review', 'instinct-ai-vs-tab-review'],
  ['ai-org-chart-for-small-business-founders', 'ai-back-office'],
  ['ai-org-chart', 'ai-back-office'],
  ['how-to-build-an-ai-chief-of-staff-2026', 'ai-chief-of-staff'],
  ['ai-implementation-program-vs-agency-vs-diy-guide', 'hire-ai-agency-vs-in-house'],
  ['512gb-unified-memory-mini-pcs-local-llm-2026', 'mac-studio-512gb-vs-dgx-spark'],
  ['loop-engineering-production-guide-2026', 'loop-engineering'],
  ['google-latest-models-vs-deepseek-4-1-business-guide', 'gemini-4-neon-vs-deepseek-v4'],
  // Retired off-brand / superseded essays mapped to closest active pillar essay
  ['productive-friction-interview-ai', 'easy-ai-brand-and-workflow-setup'],
  ['self-hosting-ai-stack-hetzner', 'autonomous-ai-rig-tailscale-guide'],
  ['boulders-ai-frontier', 'ai-chief-of-staff'],
  ['ai-agent-conf-nyc-takeaways', 'forward-deployed-ai-engineering'],
  ['ai-dev-sf-takeaways', 'loop-engineering'],
  ['the-monorepo-advantage', 'coding-agent-infrastructure'],
  ['self-healing-cicd', 'coding-agent-infrastructure'],
  ['the-40k-token-wall', 'long-term-memory-for-agents'],
  ['below-the-waterline', 'eval-harness-catches-regressions'],
  ['shadow-testing', 'eval-harness-catches-regressions'],
  ['swarm-vs-monolith', 'multi-agent-orchestration-frontier'],
  ['reasoning-loops', 'loop-engineering'],
  ['agent-experience', 'mcp-101'],
]

const nextConfig: NextConfig = {
  output: 'standalone',
  skipTrailingSlashRedirect: true,
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
      {
        source: '/accelerator',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/vault/:token*',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/courses/1-3-productive-friction-interview-skills',
        destination: '/courses/1-3-co-intelligent-intake-skills',
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

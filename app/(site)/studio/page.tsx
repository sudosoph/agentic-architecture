import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { StudioInbox } from '@/components/site/studio-inbox'
import pendingRepliesData from '@/content/queue/pending-replies.json'
import radarLatestData from '@/content/queue/radar-latest.json'

export const metadata: Metadata = {
  title: 'Owner Studio · Restricted Access',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioPage() {
  const isLocal = process.env.NODE_ENV !== 'production'
  // Never serialize queue or radar data into unauthenticated production HTML
  const initialReplies = isLocal && Array.isArray(pendingRepliesData) ? pendingRepliesData : []
  const initialRadar = isLocal && Array.isArray(radarLatestData?.items) ? radarLatestData.items : []

  return (
    <div className="space-y-10">
      <PageHeader
        meta={
          isLocal
            ? 'Owner Workbench · Local Dev Mode'
            : 'Restricted Owner Access · sudosoph/agentic-architecture'
        }
        title="Agentic Architect Owner Studio"
        description="Restricted to the repository owner. Authenticate with a write-scoped GitHub token to load queues, approve replies, or open draft PRs."
      />
      <StudioInbox
        initialReplies={initialReplies}
        initialRadar={initialRadar}
        requireAuth={!isLocal}
      />
    </div>
  )
}

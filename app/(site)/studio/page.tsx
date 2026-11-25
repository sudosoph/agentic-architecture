import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { StudioInbox } from '@/components/site/studio-inbox'
import pendingRepliesData from '@/content/queue/pending-replies.json'
import radarLatestData from '@/content/queue/radar-latest.json'

export const metadata: Metadata = {
  title: 'Cloud CMS, Approvals & Automation Studio',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioPage() {
  const isLocal = process.env.NODE_ENV !== 'production'
  const initialReplies = Array.isArray(pendingRepliesData) ? pendingRepliesData : []
  const initialRadar = Array.isArray(radarLatestData?.items) ? radarLatestData.items : []

  return (
    <div className="space-y-10">
      <PageHeader
        meta={
          isLocal
            ? 'Browser Operator Workbench · Local Dev Unlocked'
            : 'Zero-NPM Cloud Workbench · https://agenticarchitect.ai/studio'
        }
        title="Cloud CMS, Reply Approvals & Trend Automation"
        description="Publish or schedule MDX posts to GitHub without npm, approve Substack replies, trigger cloud trend sweeps, and grab non-cannibalizing cross-post packs from any browser."
      />
      <StudioInbox
        initialReplies={initialReplies}
        initialRadar={initialRadar}
        requireAuth={!isLocal}
      />
    </div>
  )
}

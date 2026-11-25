import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { StudioInbox } from '@/components/site/studio-inbox'

export const metadata: Metadata = {
  title: 'Local Brand & Approval Studio',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioPage() {
  const isLocal = process.env.NODE_ENV !== 'production'

  if (!isLocal) {
    return (
      <div className="py-16 text-center space-y-2">
        <h1 className="text-xl font-bold text-fg">Local Operator Studio</h1>
        <p className="text-sm text-muted">
          This approval workbench only runs locally via <code className="font-mono">npm run dev</code>.
        </p>
      </div>
    )
  }

  const repliesPath = path.join(process.cwd(), 'content/queue/pending-replies.json')
  const radarPath = path.join(process.cwd(), 'content/queue/radar-latest.json')

  const initialReplies = fs.existsSync(repliesPath)
    ? JSON.parse(fs.readFileSync(repliesPath, 'utf8'))
    : []
  const initialRadar = fs.existsSync(radarPath)
    ? JSON.parse(fs.readFileSync(radarPath, 'utf8')).items ?? []
    : []

  return (
    <div className="space-y-10">
      <PageHeader
        meta="Local-Only Operator Workbench · http://localhost:3000/studio"
        title="Brand, Trend & Reply Approval Studio"
        description="Approve reader replies, pull live AI tool/trend signals, and generate non-cannibalizing Blog + Substack + LinkedIn drafts in one place."
      />
      <StudioInbox initialReplies={initialReplies} initialRadar={initialRadar} />
    </div>
  )
}

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { ContactForm } from '@/components/site/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Send a written inquiry regarding advisory, corporate workshops, speaking, sponsorships, or courses.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        meta="Direct Inbox · Boulder, CO"
        title="Contact"
        description="Advisory inquiries, speaking and workshop invitations, sponsorship questions, or general notes all land directly in the same inbox. Replies typically go out within one business day."
      />
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </div>
  )
}

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { ContactForm } from '@/components/site/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send a note. Resource requests, sponsorship inquiries, workshop follow-ups, or general questions all land in the same inbox.',
}

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="contact"
        description="Resource requests, sponsorship inquiries, workshop follow-ups, anything else. All land in the same inbox. Reply usually within a business day."
      />
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </div>
  )
}

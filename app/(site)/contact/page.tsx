import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/ui/page-header'
import { ContactForm } from '@/components/site/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Sophia Stein — engagement inquiries, collaboration, or general questions.',
}

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="contact"
        description="For engagement inquiries, use the work with me page. For everything else, use the form below."
      />
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </div>
  )
}

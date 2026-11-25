import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@/components/site/analytics'
import { SITE_CONFIG } from '@/lib/site-config'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  applicationName: SITE_CONFIG.siteName,
  title: {
    default: `${SITE_CONFIG.siteName} | ${SITE_CONFIG.authorName} · AI Systems & Workflows`,
    template: `%s | ${SITE_CONFIG.siteName}`,
  },
  description:
    'Agentic Architect by Sophia Stein: practical AI workflows, Brand Brains, corporate workshops, and private infrastructure in Boulder, CO.',
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  alternates: {
    canonical: '/',
    types: {
      'application/atom+xml': `${SITE_CONFIG.siteUrl}/rss.xml`,
    },
  },
  verification: {
    google: 'sxLhGeSJ39fP2CLT8JatFpqv9mKIZHfODoeGb24ocK8',
  },
  openGraph: {
    siteName: SITE_CONFIG.siteName,
    locale: 'en_US',
    type: 'website',
    url: SITE_CONFIG.siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@sudosoph',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${GeistSans.variable}`}
    >
      <body className="bg-bg text-text font-sans antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  )
}

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
  title: {
    default: `${SITE_CONFIG.siteName} | ${SITE_CONFIG.authorName}`,
    template: `%s | ${SITE_CONFIG.siteName}`,
  },
  description:
    'Practical AI workflows, brand systems, corporate enablement, and private infrastructure for founders, operators, and leaders. By Sophia Stein in Boulder, CO.',
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  openGraph: {
    siteName: SITE_CONFIG.siteName,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/brand/substack-cover-1200x600.png', width: 1200, height: 600 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@sudosoph',
    images: ['/brand/substack-cover-1200x600.png'],
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

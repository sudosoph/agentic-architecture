import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Agentic Architecture, Sophia Stein',
    template: '%s | Agentic Architecture',
  },
  description:
    'AI Architect. Local-first LLM infrastructure, benchmarks, and OSS tools. Boulder, CO.',
  metadataBase: new URL('https://agenticarchitect.ai'),
  openGraph: {
    siteName: 'Agentic Architecture',
    locale: 'en_US',
    type: 'website',
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
        {children}
      </body>
    </html>
  )
}

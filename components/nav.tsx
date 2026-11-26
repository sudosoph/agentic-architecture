'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/courses', label: 'Courses' },
  { href: '/teaching', label: 'Speaking & Teaching' },
]

export function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
      <nav
        aria-label="Primary navigation"
        className="px-6 sm:px-8 h-15 grid grid-cols-12 items-center"
      >
        <div className="col-span-8 md:col-span-4 flex items-center">
          <Link href="/" className="inline-flex items-center gap-2.5 text-fg group press-scale">
            <svg
              width="22"
              height="22"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="text-fg shrink-0"
            >
              <rect
                x="1.5"
                y="1.5"
                width="29"
                height="29"
                rx="5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M7.5 23.5L13 8.5L18.5 23.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="miter"
              />
              <path
                d="M14.5 23.5L20 8.5L25.5 23.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="miter"
                opacity="0.52"
              />
              <line
                x1="9.8"
                y1="18.5"
                x2="23.2"
                y2="18.5"
                stroke="currentColor"
                strokeWidth="1.9"
              />
            </svg>
            <span className="font-display text-[15px] font-semibold tracking-[-0.025em] text-fg">
              {SITE_CONFIG.siteName}
            </span>
          </Link>
        </div>

        {/* Desktop Swiss Centered Navigation */}
        <div className="hidden md:flex md:col-span-5 items-center justify-center gap-6">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname?.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                className={`text-[13px] transition-colors whitespace-nowrap ${
                  active ? 'text-fg font-semibold' : 'text-muted hover:text-fg font-medium'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Desktop Right CTA */}
        <div className="hidden md:flex md:col-span-3 justify-end">
          <Button variant="primary" size="sm" href="/work-with-me">
            Work With Me
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="col-span-4 flex justify-end md:hidden">
          <button
            type="button"
            className="text-muted hover:text-fg p-2 rounded-md hover:bg-surface-elevated press-scale cursor-pointer"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor" aria-hidden="true">
              <rect width="20" height="1.75" rx="0.875" />
              <rect y="6" width="20" height="1.75" rx="0.875" />
              <rect y="12" width="20" height="1.75" rx="0.875" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-surface border-l border-border p-6 flex flex-col">
            <button
              type="button"
              className="self-end text-muted hover:text-fg mb-6 p-1 text-sm font-medium cursor-pointer"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              Close
            </button>
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-base font-medium text-fg hover:text-accent transition-colors"
                  onClick={() => setDrawerOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border">
                <Button
                  variant="primary"
                  size="md"
                  href="/work-with-me"
                  className="w-full"
                  onClick={() => setDrawerOpen(false)}
                >
                  Work With Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const NAV_LINKS = [
  { href: '/blog', label: 'Owner Playbooks' },
  { href: '/courses', label: 'Courses & Cohort' },
  { href: '/work-with-me', label: 'Bespoke AI Builds' },
  { href: '/fractional-ai-cto', label: 'Fractional AI / CTO' },
  { href: '/research', label: 'Research & Teaching' },
  { href: '/about', label: 'About' },
]

export function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-sans font-bold text-base tracking-tight text-fg group"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f172a] shadow-xs"
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <line
                x1="9"
                y1="23"
                x2="16"
                y2="9"
                stroke="#3b82f6"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <line
                x1="16"
                y1="9"
                x2="23"
                y2="23"
                stroke="#3b82f6"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <line
                x1="11.5"
                y1="18.5"
                x2="20.5"
                y2="18.5"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle cx="16" cy="9" r="2.2" fill="#ffffff" />
              <circle cx="23" cy="23" r="2" fill="#10b981" />
            </svg>
          </span>
          {SITE_CONFIG.siteName}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    active ? 'text-accent font-semibold' : 'text-muted hover:text-fg'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>
          <Button variant="primary" size="sm" href="/masterclass">
            Free Live Briefing
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted hover:text-fg p-2 rounded-lg hover:bg-surface"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor" aria-hidden="true">
            <rect width="20" height="2" rx="1" />
            <rect y="6" width="20" height="2" rx="1" />
            <rect y="12" width="20" height="2" rx="1" />
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white border-l border-border p-6 flex flex-col shadow-xl">
            <button
              className="self-end text-muted hover:text-fg mb-6 p-1 text-sm font-semibold"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              ✕
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
              <div className="pt-2">
                <Button variant="primary" size="md" href="/masterclass" className="w-full">
                  Free Live Briefing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

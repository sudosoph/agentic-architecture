'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const NAV_LEFT = [
  { href: '/about', label: 'about' },
  { href: '/blog', label: 'blog' },
  { href: '/stack', label: 'stack' },
  { href: '/courses', label: 'courses' },
]

const NAV_RIGHT = [
  { href: '/contact', label: 'contact' },
]

export function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <nav className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm text-fg">
          Agentic Architect
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5">
            {NAV_LEFT.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-xs font-mono transition-colors ${
                  pathname === href ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {NAV_RIGHT.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-xs font-mono transition-colors ${
                  pathname === href ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {label}
              </Link>
            ))}
            <Button variant="outline" size="sm" href="/work-with-me">
              work with me ›
            </Button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted hover:text-fg p-1"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" aria-hidden="true">
            <rect width="18" height="2" />
            <rect y="6" width="18" height="2" />
            <rect y="12" width="18" height="2" />
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-64 bg-surface border-l border-border p-6 flex flex-col">
            <button
              className="self-end text-muted hover:text-fg mb-6 text-sm"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <div className="flex flex-col gap-4">
              {[...NAV_LEFT, ...NAV_RIGHT].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-mono text-muted hover:text-fg transition-colors"
                  onClick={() => setDrawerOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Button variant="outline" size="md" href="/work-with-me">
                work with me ›
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

const WRITING_LINKS = [
  { href: '/blog', label: 'Essays & Architecture Notes' },
  { href: '/what-is-an-agentic-architect', label: 'What Is an Agentic Architect?' },
  { href: '/sovereign-stack', label: 'The Sovereign Stack (Field Monograph)' },
  { href: '/research', label: 'Systems Benchmarks & Syllabi' },
  { href: '/starter-kit', label: '20/80 Task Readiness Kit' },
  { href: '/stack', label: 'Reference Stack & Private Rigs' },
]

const PRACTICE_LINKS = [
  { href: '/about', label: 'About Sophia' },
  { href: '/courses', label: 'Agentic Architect Lab (Courses)' },
  { href: '/work-with-me', label: 'Bespoke Systems & Advisory' },
  { href: '/fractional-ai-cto', label: 'Fractional CAIO & AI CTO' },
  { href: '/teaching', label: 'Speaking & University Teaching' },
  { href: '/boulder', label: 'Boulder & Denver Workshops' },
]

const CONNECT_LINKS = [
  { href: SITE_CONFIG.substackUrl, label: 'Substack Dispatch', external: true },
  { href: SITE_CONFIG.linkedinUrl, label: 'LinkedIn', external: true },
  { href: '/contact', label: 'Contact', external: false },
  { href: '/sponsor', label: 'Sponsorships', external: false },
  { href: '/now', label: 'Now', external: false },
  { href: '/rss.xml', label: 'RSS Feed', external: false },
]

function FooterCol({
  heading,
  links,
}: {
  heading: string
  links: { href: string; label: string; external?: boolean }[]
}) {
  return (
    <div>
      <h4 className="text-fg text-xs font-semibold mb-3">{heading}</h4>
      <ul className="space-y-2">
        {links.map(({ href, label, external }) => (
          <li key={href}>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-fg transition-colors"
              >
                {label}
              </a>
            ) : (
              <Link href={href} className="text-sm text-muted hover:text-fg transition-colors">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border mt-16">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <FooterCol heading="Writing & Frameworks" links={WRITING_LINKS} />
          <FooterCol heading="Courses & Practice" links={PRACTICE_LINKS} />
          <FooterCol heading="Connect" links={CONNECT_LINKS} />
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-muted">
          <span>
            © 2026 {SITE_CONFIG.legalName} · {SITE_CONFIG.location}
          </span>
          <span>Essays, courses, and systems architecture by {SITE_CONFIG.authorName}.</span>
        </div>
      </div>
    </footer>
  )
}

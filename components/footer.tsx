import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

const EXPLORE_LINKS = [
  { href: '/blog', label: 'Owner Playbooks & Reviews' },
  { href: '/starter-kit', label: 'Free Bottleneck Scorecard & Kit' },
  { href: '/research', label: 'Systems Research & Benchmarks' },
  { href: '/sovereign-stack', label: 'The Sovereign Stack (18-Ch. Book)' },
  { href: '/what-is-an-agentic-architect', label: 'What Is an Agentic Architect?' },
  { href: '/stack', label: 'Stack & Rigs' },
  { href: '/about', label: 'About Sophia' },
]

const PROGRAM_LINKS = [
  { href: '/courses', label: 'Owner Courses & $297 Academy' },
  { href: '/masterclass', label: 'Free 60-Min Live Workflow Build' },
  { href: '/work-with-me', label: 'Custom Bottleneck Sprints' },
  { href: '/fractional-ai-cto', label: 'Fractional CAIO & AI CTO' },
  { href: '/teaching', label: 'Corporate Training & University' },
  { href: '/boulder', label: 'Boulder & Denver Team Workshops' },
  { href: '/contact', label: 'Contact' },
]

const CONNECT_LINKS = [
  { href: SITE_CONFIG.substackUrl, label: 'Substack Newsletter', accent: true },
  { href: SITE_CONFIG.linkedinUrl, label: 'LinkedIn', accent: false },
  { href: SITE_CONFIG.xUrl, label: 'X (@sudosoph)', accent: false },
  { href: SITE_CONFIG.githubUrl, label: 'GitHub', accent: false },
  { href: '/rss.xml', label: 'RSS Feed', accent: false },
]

function FooterCol({
  heading,
  links,
}: {
  heading: string
  links: { href: string; label: string; accent?: boolean }[]
}) {
  return (
    <div>
      <h4 className="text-fg text-xs font-semibold uppercase tracking-wider mb-3">
        {heading}
      </h4>
      <ul className="space-y-2">
        {links.map(({ href, label, accent }) => (
          <li key={href}>
            <Link
              href={href}
              className={`text-sm transition-colors ${
                accent ? 'text-accent font-medium hover:underline' : 'text-muted hover:text-fg'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <FooterCol heading="Explore" links={EXPLORE_LINKS} />
          <FooterCol heading="Programs & Advisory" links={PROGRAM_LINKS} />
          <FooterCol heading="Connect" links={CONNECT_LINKS} />
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-muted">
          <span>© 2026 {SITE_CONFIG.legalName} · Boulder, CO</span>
          <span>
            Sophia Stein writes and teaches here in a personal capacity, views my own.
          </span>
        </div>
      </div>
    </footer>
  )
}

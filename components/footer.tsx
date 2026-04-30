import Link from 'next/link'

const CONTENT_LINKS = [
  { href: '/about', label: 'about' },
  { href: '/blog', label: 'blog' },
  { href: '/stack', label: 'stack' },
  { href: '/changelog', label: 'changelog' },
]

const WORK_LINKS = [
  { href: '/consult', label: 'consult' },
  { href: '/courses', label: 'courses' },
  { href: '/speaking', label: 'speaking' },
]

const CONNECT_LINKS = [
  { href: 'https://x.com/agenticarchitect', label: 'X ↗', accent: false },
  { href: 'https://github.com/agenticarchitect', label: 'GitHub ↗', accent: false },
  { href: 'https://agenticarchitect.substack.com', label: 'Substack ↗', accent: false },
  { href: 'https://discord.gg/agenticarchitect', label: 'Discord ↗', accent: false },
  { href: '/rss.xml', label: 'RSS ↗', accent: true },
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
      <h4 className="text-[#52525b] text-[0.6rem] uppercase tracking-widest mb-3 font-mono">
        {heading}
      </h4>
      {links.map(({ href, label, accent }) => (
        <Link
          key={href}
          href={href}
          className={`block mb-1.5 text-xs font-mono no-underline transition-colors ${
            accent ? 'text-accent' : 'text-muted hover:text-fg'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border font-mono">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8 mb-6">
          <FooterCol heading="Content" links={CONTENT_LINKS} />
          <FooterCol heading="Work" links={WORK_LINKS} />
          <FooterCol heading="Connect" links={CONNECT_LINKS} />
        </div>
        <div className="border-t border-border pt-4 flex justify-between items-baseline gap-8">
          <span className="text-[#3f3f46] text-[0.66rem] whitespace-nowrap">
            © 2026 Agentic Architecture LLC
          </span>
          <span className="text-[#3f3f46] text-[0.64rem] text-right leading-relaxed">
            🤖 Runs on a Framework 16 · 96GB DDR5 · local LLMs · open source
          </span>
        </div>
      </div>
    </footer>
  )
}

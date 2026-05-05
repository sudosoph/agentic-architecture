import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sophia Stein. AI Architect in Boulder, CO. Local-first agentic infrastructure, OSS tools, technical writing.',
}

const NOW = [
  {
    label: 'Writing',
    body: 'A 90-minute audit for finding agent-ready tasks',
    href: '/blog/the-agentic-audit',
  },
  {
    label: 'Speaking',
    body: 'Boulder Startup Week 2026, agentic architecture for lean teams',
    href: 'https://boulderstartupweek.com/',
    external: true,
  },
  {
    label: 'Shipping',
    body: 'apu-config, a one-command AMD APU optimizer (in progress)',
    href: 'https://github.com/sudosoph',
    external: true,
  },
  {
    label: 'Reading',
    body: 'Conference notes from AI Dev SF and AI Agent Conference NYC',
    href: '/blog?theme=local-models',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <section className="pt-2">
        <h1 className="font-mono text-2xl text-fg mb-2">about</h1>
        <p className="font-mono text-xs text-muted">Boulder, CO</p>
      </section>

      <section className="space-y-4 text-sm text-muted leading-relaxed">
        <p>
          I am an AI Architect. I design and ship local-first agentic
          infrastructure for engineers and operating businesses. Most of what I
          do involves picking the right model, the right hardware, and the
          right amount of structure around an agent so it actually works in
          production.
        </p>
        <p>
          The benchmarks on this site are real numbers from a Framework 16
          with 96GB of RAM running ROCm 7.3. The OSS work is on{' '}
          <Link
            href="https://github.com/sudosoph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            github.com/sudosoph
          </Link>
          . The writing lives at <Link href="/blog" className="text-accent hover:underline">/blog</Link>.
        </p>
        <p>
          For the gear and tooling I actually run, see{' '}
          <Link href="/stack" className="text-accent hover:underline">/stack</Link>.
          For project work, see{' '}
          <Link href="/work-with-me" className="text-accent hover:underline">/work-with-me</Link>.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Now
        </h2>
        <div className="divide-y divide-border">
          {NOW.map(({ label, body, href, external }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-baseline gap-4 py-3 first:pt-0 last:pb-0 group"
            >
              <span className="font-mono text-xs text-bench uppercase tracking-wider shrink-0 w-20">
                {label}
              </span>
              <span className="text-sm text-muted leading-relaxed group-hover:text-accent transition-colors">
                {body}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          Contact
        </h2>
        <div className="space-y-2 font-mono text-xs">
          <div>
            <span className="text-muted w-16 inline-block">email</span>
            <Link
              href="mailto:sophia@agenticarchitecture.ai"
              className="text-accent hover:underline"
            >
              sophia@agenticarchitecture.ai
            </Link>
          </div>
          <div>
            <span className="text-muted w-16 inline-block">github</span>
            <Link
              href="https://github.com/sudosoph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              github.com/sudosoph
            </Link>
          </div>
          <div>
            <span className="text-muted w-16 inline-block">work</span>
            <Link href="/work-with-me" className="text-accent hover:underline">
              /work-with-me
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

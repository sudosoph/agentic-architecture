import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-bg text-fg flex flex-col items-center justify-center px-6 text-center space-y-4">
      <p className="text-xs font-medium text-muted tabular-nums">Error 404</p>
      <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-[-0.02em] text-fg">
        Page not found
      </h1>
      <p className="text-sm text-muted max-w-md leading-relaxed">
        The essay or resource you requested may have moved. Browse all published writing or return
        to the homepage.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button variant="primary" size="md" href="/">
          Return Home
        </Button>
        <Link
          href="/blog"
          className="text-sm font-medium text-fg underline underline-offset-3 decoration-border hover:decoration-fg px-3 py-2"
        >
          Browse Writing
        </Link>
      </div>
    </main>
  )
}

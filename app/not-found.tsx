import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg text-text flex flex-col items-center justify-center font-mono">
      <p className="text-bench text-6xl font-bold">404</p>
      <p className="text-muted mt-4">Page not found.</p>
      <Link href="/" className="mt-6 text-accent hover:underline">
        ← Back to home
      </Link>
    </main>
  )
}

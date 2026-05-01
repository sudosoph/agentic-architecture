import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">{children}</main>
      <Footer />
    </div>
  )
}

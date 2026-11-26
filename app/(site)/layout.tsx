import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg sm:py-6 sm:px-4 md:px-6">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col bg-surface border-y sm:border border-border shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <Nav />
        <main className="flex-1 w-full px-6 sm:px-8 pt-9 sm:pt-11 pb-14 sm:pb-16">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

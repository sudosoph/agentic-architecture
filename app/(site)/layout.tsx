export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Nav — added in Plan B */}
      <main>{children}</main>
      {/* Footer — added in Plan B */}
    </>
  )
}

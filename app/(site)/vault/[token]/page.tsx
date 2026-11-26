import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getVaultBundle } from '@/lib/curriculum'
import { PageHeader } from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

type Props = { params: Promise<{ token: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params
  const bundle = getVaultBundle(token)
  return {
    title: bundle ? `${bundle.title} · Student Curriculum Vault` : 'Restricted Vault',
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function StudentVaultPage({ params }: Props) {
  const { token } = await params
  const bundle = getVaultBundle(token)
  if (!bundle) notFound()

  return (
    <div className="space-y-14">
      <div className="space-y-4">
        <Badge variant="online">Enrolled Student Curriculum Vault · Unlisted Access</Badge>
        <PageHeader
          meta="Complete Written Lessons · Copy-Paste SKILL.md Packs · 100% Tuition Credit Eligible"
          title={bundle.title}
          description="Work through each module in order, copy the Socratic interview skills and API schemas directly into your workspace, and use your 60-day 100% tuition credit whenever you want live cohort coaching, corporate team training, or a Forward Deployed build."
        />
      </div>

      {/* Curriculum Jump Index */}
      <Card className="p-6 bg-surface space-y-4">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
          Module Jump Map
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bundle.curricula.map(({ meta, modules }) => (
            <div key={meta.id} className="space-y-2 rounded-xl border border-border bg-white p-4">
              <p className="font-mono text-xs font-bold text-accent">{meta.number}</p>
              <h2 className="text-sm font-bold text-fg">{meta.title}</h2>
              <ul className="space-y-1 text-xs">
                {modules.map(m => (
                  <li key={m.slug}>
                    <a href={`#mod-${m.slug}`} className="text-muted hover:text-accent hover:underline">
                      {m.frontmatter.moduleCode} · {m.frontmatter.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Full Modules */}
      {bundle.curricula.map(({ meta, modules }) => (
        <section key={meta.id} className="space-y-8">
          <div className="border-b border-border pb-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              {meta.number}
            </p>
            <h2 className="text-2xl font-bold text-fg mt-1">{meta.title}</h2>
            <p className="text-sm text-muted mt-1">{meta.subtitle}</p>
          </div>

          {modules.map(mod => (
            <Card key={mod.slug} id={`mod-${mod.slug}`} className="p-6 md:p-8 space-y-6 scroll-mt-24">
              <div className="space-y-2 border-b border-border pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className="font-bold text-accent">
                    Module {mod.frontmatter.moduleCode} · {mod.frontmatter.durationMinutes} mins
                  </span>
                  <span className="text-online font-semibold">
                    Artifact: {mod.frontmatter.artifact}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-fg">{mod.frontmatter.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{mod.frontmatter.summary}</p>
              </div>

              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: mod.html }} />
            </Card>
          ))}
        </section>
      ))}

      {/* Tuition Credit Upgrade Strip */}
      <Card className="p-6 md:p-8 border-accent bg-surface space-y-4">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
          60-Day 100% Tuition Credit Included
        </p>
        <h2 className="text-xl font-bold text-fg">
          Ready to Scale This Across Your Team or Commission a Forward Deployed Build?
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          Every dollar of your self-paced enrollment credits directly toward our Guided Cohort
          ($1,497), a Half-Day or Full-Day Corporate Department Training ($7,500+), or a
          custom-scoped Forward Deployed Build-For-You engagement.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" href={SITE_CONFIG.cal.scoping}>
            Book 20-Min Forward Deployed / Cohort Call →
          </Button>
          <Button variant="outline" size="md" href={SITE_CONFIG.cal.speaking}>
            Corporate Department Training Inquiry
          </Button>
        </div>
      </Card>
    </div>
  )
}

import { curriculumModules } from './curriculum-manifest.generated'
import { SITE_CONFIG } from './site-config'

export type CurriculumId =
  | 'foundations'
  | 'departments'
  | 'bespoke-systems'
  | 'sovereign-stack'

export interface CurriculumMeta {
  id: CurriculumId
  number: string
  title: string
  subtitle: string
  audience: string
  priceUsd: number
  checkoutHref: string
  vaultToken: string
  upsellLabel: string
  upsellHref: string
}

export interface ModuleFrontmatter {
  slug: string
  curriculumId: CurriculumId
  moduleCode: string
  title: string
  summary: string
  durationMinutes: number
  unlocked: boolean
  artifact: string
  learningOutcomes: string[]
  upsellBridge: string
}

export const CURRICULA: CurriculumMeta[] = [
  {
    id: 'foundations',
    number: 'Curriculum 01',
    title: 'Applied AI Foundations: Models, Productive Friction & Codified Skills',
    subtitle:
      'Navigate the late-2026 model landscape, replace ad-hoc prompting with Socratic interview harnesses, run agentic workspaces without Python, and drive org-wide adoption.',
    audience: 'Founders, Executives, Managers & Non-Technical Operators',
    priceUsd: 297,
    checkoutHref: SITE_CONFIG.cal.academy,
    vaultToken: 'aa-vault-foundations-9f4c2e',
    upsellLabel: 'Upgrade to Guided Cohort ($1,497) or Corporate Workshop',
    upsellHref: '/accelerator',
  },
  {
    id: 'departments',
    number: 'Curriculum 02',
    title: 'Department AI Systems: Vertical SaaS vs. Build In-House',
    subtitle:
      'Function-by-function build-vs-buy playbooks across Marketing, Finance, Legal, Sales/RevOps, and HR/Operations, backed by ex-McKinsey AI FinOps discipline.',
    audience: 'COOs, Functional VPs (Marketing, Finance, Legal, Sales, HR) & Corporate L&D',
    priceUsd: 397,
    checkoutHref: '/contact?subject=Curriculum%2002%20Department%20AI%20Enrollment%20(%24397)',
    vaultToken: 'aa-vault-departments-7b3d1a',
    upsellLabel: 'Book Half-Day ($7,500) or Full-Day ($15,000) Corporate Lab',
    upsellHref: '/teaching',
  },
  {
    id: 'bespoke-systems',
    number: 'Curriculum 03',
    title: 'Bespoke AI Harnesses, Best-of-Breed APIs & Forward Deployed Engineering',
    subtitle:
      'Engineer production agent harnesses, connect best-of-breed Search/OCR/Voice/Sandbox APIs, route multi-model ensembles, and ship with Forward Deployed Golden Evals.',
    audience: 'Builders, Product Managers, Solutions Architects & Internal FDEs',
    priceUsd: 497,
    checkoutHref: '/contact?subject=Curriculum%2003%20Bespoke%20Systems%20Enrollment%20(%24497)',
    vaultToken: 'aa-vault-bespoke-4e8a6c',
    upsellLabel: 'Scope a Forward Deployed Build-For-You Engagement',
    upsellHref: '/work-with-me',
  },
  {
    id: 'sovereign-stack',
    number: 'Curriculum 04',
    title: 'The Sovereign AI Stack: Open-Weights, Private Rigs & Zero-Egress Compute',
    subtitle:
      'Deploy $9 Linux VPS stacks, size 96GB to 512GB unified-memory nodes, serve open weights over encrypted Tailscale meshes, and govern regulated workloads.',
    audience: 'CTOs, Engineering Leaders, Regulated Healthcare/Legal Teams & Technical Founders',
    priceUsd: 497,
    checkoutHref: '/contact?subject=Curriculum%2004%20Sovereign%20Stack%20Enrollment%20(%24497)',
    vaultToken: 'aa-vault-sovereign-2c9f5b',
    upsellLabel: 'Explore Fractional CAIO / AI CTO & 2-Week Diagnostic',
    upsellHref: '/fractional-ai-cto',
  },
]

export const ALL_ACCESS_PASS: {
  title: string
  priceUsd: 997
  vaultToken: string
  checkoutHref: string
} = {
  title: 'All-Access 4-Curriculum AI Architect Pass (All 20 Modules + Vaults + L&D Kit)',
  priceUsd: 997,
  vaultToken: 'aa-vault-architect-all-8d1e3f',
  checkoutHref: '/contact?subject=All-Access%204-Curriculum%20Architect%20Pass%20(%24997)',
}

export function getAllCurriculumModules(): Array<{
  slug: string
  frontmatter: ModuleFrontmatter
  toc: { id: string; text: string }[]
}> {
  return curriculumModules.map(({ slug, frontmatter, toc }) => ({
    slug,
    frontmatter,
    toc,
  }))
}

export function getModulesByCurriculum(
  id: CurriculumId,
): Array<{ slug: string; frontmatter: ModuleFrontmatter }> {
  return curriculumModules
    .filter(m => m.frontmatter.curriculumId === id)
    .map(({ slug, frontmatter }) => ({ slug, frontmatter }))
}

export function getPublicModuleView(slug: string): {
  frontmatter: ModuleFrontmatter
  curriculum: CurriculumMeta
  html: string | null
  toc: { id: string; text: string }[]
} | null {
  const mod = curriculumModules.find(m => m.slug === slug)
  if (!mod) return null
  const curriculum = CURRICULA.find(c => c.id === mod.frontmatter.curriculumId)
  if (!curriculum) return null
  return {
    frontmatter: mod.frontmatter,
    curriculum,
    html: mod.frontmatter.unlocked ? mod.html : null,
    toc: mod.frontmatter.unlocked ? mod.toc : [],
  }
}

export function getVaultBundle(token: string): {
  title: string
  curricula: Array<{
    meta: CurriculumMeta
    modules: Array<{
      slug: string
      frontmatter: ModuleFrontmatter
      html: string
      toc: { id: string; text: string }[]
    }>
  }>
} | null {
  if (!token) return null
  if (token === ALL_ACCESS_PASS.vaultToken) {
    return {
      title: ALL_ACCESS_PASS.title,
      curricula: CURRICULA.map(meta => ({
        meta,
        modules: curriculumModules.filter(m => m.frontmatter.curriculumId === meta.id),
      })),
    }
  }
  const matched = CURRICULA.find(c => c.vaultToken === token)
  if (!matched) return null
  return {
    title: `${matched.number}: ${matched.title}`,
    curricula: [
      {
        meta: matched,
        modules: curriculumModules.filter(m => m.frontmatter.curriculumId === matched.id),
      },
    ],
  }
}

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
  waitlistHref: string
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

export interface SkoolTrack {
  number: string
  title: string
  audience: string
  summary: string
  outcomes: string[]
  freeModuleHref: string
  freeModuleLabel: string
}

export const SKOOL_LAB_TRACKS: SkoolTrack[] = [
  {
    number: 'Track 01',
    title: 'Claude Superuser & Cowork OS',
    audience: 'Non-Technical Operators, Founders & Ambitious Professionals',
    summary:
      'Move far beyond browser chat tabs. Master Projects, folder-based Cowork workspaces, structured SKILL.md workflows, MCP connectors, and Claude Code without needing a software engineering background.',
    outcomes: [
      'Organize reusable operating context and Socratic intake skills that stop generic outputs',
      'Automate weekly research dossiers, inbox triage, call prep, and deliverable drafts safely',
      'Connect calendar, docs, and workspace tools with human sign-off gates',
    ],
    freeModuleHref: '/courses/1-1-2026-ai-landscape-model-matrix',
    freeModuleLabel: 'Read Lesson 1.1 Free',
  },
  {
    number: 'Track 02',
    title: 'Kill the $200/mo AI Subscription Stack',
    audience: 'Solo Builders, Lean Teams & Cost-Conscious Operators',
    summary:
      'Replace overlapping Max/Ultra seats and thin SaaS wrappers with clean multi-model routing, OpenRouter cascades, open-weight workhorses (DeepSeek, Qwen), and private Tailscale setups.',
    outcomes: [
      'Audit every recurring AI subscription and route 80% of tasks to fast, low-cost workhorses',
      'Stand up open-source workflow automation and encrypted private model endpoints',
      'Keep sensitive client and company documents inside clear Green, Amber, and Red boundaries',
    ],
    freeModuleHref: '/courses/4-1-open-weights-vs-frontier-economics',
    freeModuleLabel: 'Read Lesson 4.1 Free',
  },
  {
    number: 'Track 03',
    title: 'Become an AI Architect',
    audience: 'Operators Upskilling Into AI Roles, PMs & Internal Champions',
    summary:
      'Learn how to audit team bottlenecks, separate what to buy from what to compose in-house, design 4-layer agentic workflows with 25-case evaluation suites, and graduate with a real portfolio.',
    outcomes: [
      'Decompose messy cross-functional processes using the 20/80 Task Readiness rubric',
      'Evaluate Vertical AI platforms against lightweight bespoke API harnesses across departments',
      'Ship production-grade workflows backed by deterministic verification and clear SOP handoffs',
    ],
    freeModuleHref: '/courses/2-1-vertical-ai-build-vs-buy-framework',
    freeModuleLabel: 'Read Lesson 2.1 Free',
  },
]

export const CURRICULA: CurriculumMeta[] = [
  {
    id: 'foundations',
    number: 'Syllabus 01',
    title: 'AI-Native Work, Workspace Folders & Reusable Skills',
    subtitle:
      'Evaluate new frontier capabilities the week they ship, replace ad-hoc prompting with structured intake skills, and automate recurring research, inbox, and document workflows without Python.',
    audience: 'Operators, Managers, Founders & Non-Technical Professionals',
    waitlistHref: '/courses#waitlist',
    upsellLabel: 'Inquire About a Team Workshop',
    upsellHref: '/teaching',
  },
  {
    id: 'departments',
    number: 'Syllabus 02',
    title: 'Department AI Strategy: Build vs. Buy Across GTM, Finance & Legal',
    subtitle:
      'Separate durable vertical platforms from overpriced SaaS wrappers, design signal-driven GTM and executive decision rooms, and govern department rollouts.',
    audience: 'Founders, Functional VPs, COOs & Operating Leaders',
    waitlistHref: '/courses#waitlist',
    upsellLabel: 'Book Corporate Lab Scoping',
    upsellHref: SITE_CONFIG.cal.speaking,
  },
  {
    id: 'bespoke-systems',
    number: 'Syllabus 03',
    title: 'Bespoke AI Harnesses, Multi-API Systems & Evaluation Suites',
    subtitle:
      'Compose search, OCR, voice, and workspace APIs into state-machine harnesses with tiered model routing, scoped OAuth permissions, and 25-case binary regression suites.',
    audience: 'Builders, Product Managers, Solutions Architects & AI Champions',
    waitlistHref: '/courses#waitlist',
    upsellLabel: 'Scope a Bespoke System Build',
    upsellHref: '/work-with-me',
  },
  {
    id: 'sovereign-stack',
    number: 'Syllabus 04',
    title: 'The Sovereign AI Stack: Open-Weights, Private Rigs & Mesh Security',
    subtitle:
      'Size unified-memory desk nodes, serve permissive open-weight models over encrypted Tailscale meshes, and enforce strict governance for regulated workloads.',
    audience: 'CTOs, Technical Leads & Privacy-Sensitive Organizations',
    waitlistHref: '/courses#waitlist',
    upsellLabel: 'Explore Fractional CAIO & AI CTO',
    upsellHref: '/fractional-ai-cto',
  },
]

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

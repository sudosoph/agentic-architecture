#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter } from './generate-blog-manifest.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DEFAULT_ROOT = path.resolve(__dirname, '..')

const EMPLOYER_GOOGLE_RE =
  /\b(?:at|ex-|former|work(?:s|ing)?\s+(?:in|at)|enablement\s+at|systems\s+&\s+enablement\s+at)\s+Google\b|Google\s*\((?:Boulder|personal|views)|Google\*/i

const FORBIDDEN_SUBSTRINGS = [
  { token: 'columbia', reason: 'CV/school leak (Columbia)' },
  { token: 'mckinsey', reason: 'CV/employer leak (McKinsey)' },
  { token: 'sudosoph', reason: 'Retired personal handle (sudosoph)' },
  { token: 'section.io', reason: 'CV/employer leak (Section.io)' },
  { token: 'webscale', reason: 'CV/employer leak (Webscale)' },
  { token: 'angel investor', reason: 'Personal bio leak (angel investor)' },
  { token: '79 nps', reason: 'Resume metric leak (79 NPS)' },
  { token: '$70m', reason: 'Resume metric leak ($70M)' },
  { token: 'patent-pending', reason: 'Employer/patent leak' },
  { token: 'ai patent', reason: 'Employer/patent leak' },
  { token: 'personal capacity', reason: 'Employer disclaimer leak' },
  { token: 'personal-capacity', reason: 'Employer disclaimer leak' },
  { token: 'views my own', reason: 'Employer disclaimer leak' },
  { token: 'views her own', reason: 'Employer disclaimer leak' },
  { token: 'fellow at meta', reason: 'CV/employer leak (Meta)' },
  { token: 'software at meta', reason: 'CV/employer leak (Meta)' },
  { token: '$250,000', reason: 'Salary table leak ($250,000)' },
  { token: '$450,000', reason: 'Salary table leak ($450,000)' },
  { token: '$300k', reason: 'Salary anchor leak ($300K)' },
  { token: '$350k', reason: 'Salary anchor leak ($350K)' },
  { token: '$65,000', reason: 'Coordinator salary anchor leak ($65,000)' },
  { token: '$65k', reason: 'Coordinator salary anchor leak ($65K)' },
  { token: '$297', reason: 'Legacy price tag ($297)' },
  { token: '$397', reason: 'Legacy price tag ($397)' },
  { token: '$497', reason: 'Legacy price tag ($497)' },
  { token: '$997', reason: 'Legacy price tag ($997)' },
  { token: '$1,497', reason: 'Legacy price tag ($1,497)' },
  { token: '$7,500', reason: 'Rate-card price tag ($7,500)' },
  { token: '$15,000', reason: 'Rate-card price tag ($15,000)' },
  { token: '$750', reason: 'Rate-card price tag ($750)' },
  { token: '$2,500', reason: 'Rate-card price tag ($2,500)' },
  { token: '$1,800', reason: 'Rate-card price tag ($1,800)' },
  { token: 'save $691', reason: 'Slop discount badge (Save $691)' },
  { token: 'zero dropped leads', reason: 'AI bravado pill (Zero Dropped Leads)' },
  { token: 'reclaims ', reason: 'Stale status pill (Reclaims ...)' },
  { token: 'productive friction', reason: 'Retired jargon (Productive Friction)' },
  { token: 'productive-friction', reason: 'Retired jargon slug (productive-friction)' },
  { token: 'voice.md', reason: 'Retired template artifact (voice.md)' },
  { token: 'icp.md', reason: 'Retired template artifact (icp.md)' },
  { token: 'brand brain', reason: 'Retired phrase (Brand Brain)' },
  { token: 'ai org chart', reason: 'Retired phrase (AI Org Chart)' },
  { token: 'lesbians who tech', reason: 'Unverified credential claim' },
  { token: 'listmonk', reason: 'Off-brand sysadmin tool (Listmonk)' },
  { token: 'cal.com/sophia-stein/office-hours', reason: 'Dead HTTP 404 Cal.com slug (office-hours)' },
  {
    token: 'cal.com/sophia-stein/accelerator-founding',
    reason: 'Dead HTTP 404 Cal.com slug (accelerator-founding)',
  },
  {
    token: 'architect-audit-bsw',
    reason: 'Dead BSW Cal.com slug (architect-audit-bsw)',
  },
  { token: '/contact?subject=', reason: 'Fake /contact?subject= checkout or inquiry hack' },
]

const VALID_STATIC_ROUTES = new Set([
  '/',
  '/about',
  '/blog',
  '/courses',
  '/academy',
  '/accelerator',
  '/teaching',
  '/work-with-me',
  '/fractional-ai-cto',
  '/research',
  '/sovereign-stack',
  '/what-is-an-agentic-architect',
  '/masterclass',
  '/starter-kit',
  '/guides',
  '/guides/booking-agent',
  '/stack',
  '/boulder',
  '/bsw',
  '/bsw/tutorial',
  '/bsw/setup',
  '/bsw/templates',
  '/bsw/handouts',
  '/now',
  '/sponsor',
  '/contact',
  '/rss.xml',
])

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.open-next', '.git'].includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkFiles(full, out)
    } else {
      out.push(full)
    }
  }
  return out
}

export function runBrandQualityGate(rootDir = DEFAULT_ROOT) {
  const violations = []

  const scanTargets = [
    'app',
    'components',
    'lib',
    'content/blog',
    'content/curriculum',
    'content/courses',
    'content/guides',
    'content/bsw',
    'content/book',
    'content/linkedin',
    'content/social',
    'content/queue',
    'public',
  ]

  const rootSingleFiles = ['keystatic.config.ts', 'README.md', 'CLAUDE.md', 'ROADMAP.md']

  const allFiles = []
  for (const relDir of scanTargets) {
    walkFiles(path.join(rootDir, relDir), allFiles)
  }
  for (const single of rootSingleFiles) {
    const p = path.join(rootDir, single)
    if (fs.existsSync(p)) allFiles.push(p)
  }

  for (const absPath of allFiles) {
    const rel = path.relative(rootDir, absPath).replace(/\\/g, '/')
    if (
      rel.endsWith('.generated.ts') ||
      rel.endsWith('.png') ||
      rel.endsWith('.ico') ||
      rel.endsWith('.woff2')
    ) {
      continue
    }

    // Check filenames themselves against retired slugs
    if (rel.toLowerCase().includes('productive-friction') || rel.toLowerCase().includes('sudosoph')) {
      violations.push(`${rel}: filename contains retired slug/handle`)
    }

    const raw = fs.readFileSync(absPath, 'utf8')
    const lower = raw.toLowerCase()

    // 1. Em-dash check (skip pure SVG files)
    if (!rel.endsWith('.svg')) {
      if (raw.includes('\u2014')) {
        violations.push(`${rel}: contains forbidden em-dash (\\u2014)`)
      }
      if (
        /\s--\s/.test(raw) &&
        !rel.endsWith('.tsx') &&
        !rel.endsWith('.ts') &&
        !rel.endsWith('.css')
      ) {
        violations.push(`${rel}: contains forbidden spaced double-hyphen ( -- )`)
      }
    }

    // 2. Forbidden substring check
    for (const { token, reason } of FORBIDDEN_SUBSTRINGS) {
      if (lower.includes(token)) {
        violations.push(`${rel}: ${reason} ("${token}")`)
      }
    }

    // 3. Employer "Google" leak check
    if (EMPLOYER_GOOGLE_RE.test(raw)) {
      violations.push(`${rel}: contains employer/bio "Google" reference`)
    }
  }

  // 3b. Verify editorial-and-site-qc/SKILL.md has zero literal em-dashes
  const qcSkillPath = path.join(rootDir, '.agents/skills/editorial-and-site-qc/SKILL.md')
  if (fs.existsSync(qcSkillPath)) {
    const skillRaw = fs.readFileSync(qcSkillPath, 'utf8')
    if (skillRaw.includes('\u2014')) {
      violations.push('.agents/skills/editorial-and-site-qc/SKILL.md: contains forbidden em-dash')
    }
  }

  // 3c. Generated Manifest Integrity Checks (no broken <svg>...<pre>, no raw &#x entities in TOC, no em-dashes)
  for (const genRel of [
    'lib/blog-manifest.generated.ts',
    'lib/curriculum-manifest.generated.ts',
    'lib/guides-manifest.generated.ts',
    'lib/bsw-manifest.generated.ts',
  ]) {
    const genPath = path.join(rootDir, genRel)
    if (!fs.existsSync(genPath)) continue
    const genRaw = fs.readFileSync(genPath, 'utf8')
    if (
      /<figure\b(?:(?!<\/figure>)[\s\S])*?<pre>/i.test(genRaw) ||
      /<svg\b(?:(?!<\/svg>)[\s\S])*?<pre>/i.test(genRaw) ||
      /<pre><code>[^<]*&#x3C;(?:rect|line|polygon|figcaption)\b/i.test(genRaw)
    ) {
      violations.push(`${genRel}: contains broken <pre><code> block inside inline <svg> diagram`)
    }
    const tocMatches = [...genRaw.matchAll(/"toc":\s*\[([\s\S]*?)\]/g)]
    for (const [, tocBlock] of tocMatches) {
      if (/&#x[0-9a-f]+;|&#\d+;|&amp;/i.test(tocBlock)) {
        violations.push(`${genRel}: contains undecoded HTML entity inside TOC text`)
        break
      }
    }
    if (genRaw.includes('\u2014')) {
      violations.push(`${genRel}: contains forbidden em-dash`)
    }
  }

  // 4. Coherent Navigation Order Check
  const navPath = path.join(rootDir, 'components/nav.tsx')
  if (fs.existsSync(navPath)) {
    const navSrc = fs.readFileSync(navPath, 'utf8')
    const labels = [...navSrc.matchAll(/label:\s*['"]([^'"]+)['"]/g)].map(m => m[1])
    const expectedNav = ['About', 'Writing', 'Courses', 'Speaking & Teaching']
    if (JSON.stringify(labels) !== JSON.stringify(expectedNav)) {
      violations.push(
        `components/nav.tsx: expected NAV_LINKS ${JSON.stringify(expectedNav)}, got ${JSON.stringify(labels)}`,
      )
    }
    if (!navSrc.includes('Work With Me')) {
      violations.push('components/nav.tsx: missing primary "Work With Me" CTA')
    }
  }

  // 5. Blog Archive Quality, 3-Bullet Briefings, Date Staggering, Diagrams & Internal Link Graph
  const blogDir = path.join(rootDir, 'content/blog')
  const curriculumDir = path.join(rootDir, 'content/curriculum')
  const validCourseRoutes = new Set(
    fs.existsSync(curriculumDir)
      ? fs
          .readdirSync(curriculumDir)
          .filter(f => f.endsWith('.mdx'))
          .map(f => `/courses/${f.replace(/\.mdx$/, '')}`)
      : [],
  )

  if (fs.existsSync(blogDir)) {
    const mdxFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx')).sort()
    const activeSlugs = new Set(mdxFiles.map(f => f.replace(/\.mdx$/, '')))

    if (mdxFiles.length < 30 || mdxFiles.length > 40) {
      violations.push(
        `content/blog: expected 30..40 focused active essays, found ${mdxFiles.length}`,
      )
    }

    const dateCounts = new Map()
    let svgPostCount = 0

    for (const file of mdxFiles) {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf8')
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
      if (!match) {
        violations.push(`content/blog/${file}: invalid frontmatter`)
        continue
      }
      const [, , body] = match
      const { data } = parseFrontmatter(raw)
      const pubDate = typeof data.publishedDate === 'string' ? data.publishedDate : ''
      if (!/^\d{4}-\d{2}-\d{2}$/.test(pubDate)) {
        violations.push(`content/blog/${file}: missing YYYY-MM-DD publishedDate`)
      } else {
        dateCounts.set(pubDate, (dateCounts.get(pubDate) || 0) + 1)
      }

      if (!Array.isArray(data.briefing) || data.briefing.length < 3) {
        violations.push(
          `content/blog/${file}: requires briefing array with >= 3 scannable bullets (got ${JSON.stringify(data.briefing)})`,
        )
      }

      if (/<svg[\s>]/i.test(body)) {
        svgPostCount += 1
      }

      const plainWords = body
        .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/```[\s\S]*?```/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length

      if (plainWords < 520 || plainWords > 1850) {
        violations.push(
          `content/blog/${file}: word count ${plainWords} outside crisp 520..1850 editorial window`,
        )
      }

      const mdLinks = [...body.matchAll(/\]\((\/[^)#?\s]*)/g)].map(m => m[1])
      const htmlLinks = [...body.matchAll(/href=["'](\/[^"#?\s]*)/g)].map(m => m[1])
      const allInternalLinks = [...mdLinks, ...htmlLinks]

      if (allInternalLinks.length < 3) {
        violations.push(
          `content/blog/${file}: has only ${allInternalLinks.length} internal links (minimum 3 required for SEO/GEO hub-and-spoke)`,
        )
      }

      for (const href of allInternalLinks) {
        const clean = href.endsWith('/') && href !== '/' ? href.slice(0, -1) : href
        if (clean.startsWith('/blog/')) {
          const targetSlug = clean.slice('/blog/'.length)
          if (!activeSlugs.has(targetSlug)) {
            violations.push(`content/blog/${file}: broken internal blog link ${clean}`)
          }
        } else if (clean.startsWith('/downloads/') || clean.startsWith('/slides/')) {
          const diskTarget = path.join(rootDir, 'public', clean)
          if (!fs.existsSync(diskTarget)) {
            violations.push(`content/blog/${file}: missing public asset ${clean}`)
          }
        } else if (!VALID_STATIC_ROUTES.has(clean) && !validCourseRoutes.has(clean)) {
          violations.push(`content/blog/${file}: unknown internal route ${clean}`)
        }
      }
    }

    for (const [date, count] of dateCounts.entries()) {
      if (count > 1) {
        violations.push(
          `content/blog: publishedDate ${date} is shared by ${count} posts (dates must be uniquely staggered)`,
        )
      }
    }

    if (svgPostCount < 8) {
      violations.push(
        `content/blog: expected >= 8 flagship essays with inline <svg> architectural figures, found ${svgPostCount}`,
      )
    }
  }

  return {
    ok: violations.length === 0,
    violationCount: violations.length,
    violations,
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = runBrandQualityGate()
  if (!report.ok) {
    console.error(`[brand-quality-gate] FAILED with ${report.violationCount} violation(s):`)
    for (const v of report.violations.slice(0, 60)) {
      console.error(`  - ${v}`)
    }
    if (report.violationCount > 60) {
      console.error(`  ... and ${report.violationCount - 60} more.`)
    }
    process.exit(1)
  }
  console.log(
    '[brand-quality-gate] PASSED: zero CV/salary/slop leaks, coherent nav, 3-bullet briefings, intact SVG figures, decoded TOCs, staggered dates, and >=3 internal links per essay.',
  )
}

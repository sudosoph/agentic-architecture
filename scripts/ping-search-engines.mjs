#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const HOST = 'agenticarchitect.ai'
const BASE_URL = `https://${HOST}`
const INDEXNOW_KEY = 'aa8f4d2e9c1b7e6a5d3f0c8b4e2a1d9f'
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`

export function collectCanonicalUrls(rootDir = process.cwd()) {
  const staticPaths = [
    '/',
    '/what-is-an-agentic-architect',
    '/sovereign-stack',
    '/masterclass',
    '/accelerator',
    '/starter-kit',
    '/courses',
    '/academy',
    '/work-with-me',
    '/fractional-ai-cto',
    '/teaching',
    '/research',
    '/boulder',
    '/blog',
    '/stack',
    '/guides',
    '/bsw',
    '/bsw/tutorial',
    '/bsw/setup',
    '/bsw/templates',
    '/bsw/handouts',
    '/about',
    '/now',
    '/sponsor',
    '/contact',
  ]

  const blogDir = path.join(rootDir, 'content/blog')
  const blogSlugs = fs.existsSync(blogDir)
    ? fs
        .readdirSync(blogDir)
        .filter(f => f.endsWith('.mdx'))
        .map(f => `/blog/${f.replace(/\.mdx$/, '')}`)
    : []

  const guidesDir = path.join(rootDir, 'content/guides')
  const guideSlugs = fs.existsSync(guidesDir)
    ? fs
        .readdirSync(guidesDir)
        .filter(f => f.endsWith('.mdx'))
        .map(f => `/guides/${f.replace(/\.mdx$/, '')}`)
    : []

  const curriculumDir = path.join(rootDir, 'content/curriculum')
  const unlockedCurriculumSlugs = fs.existsSync(curriculumDir)
    ? fs
        .readdirSync(curriculumDir)
        .filter(f => f.endsWith('.mdx'))
        .filter(f => {
          const raw = fs.readFileSync(path.join(curriculumDir, f), 'utf8')
          return /^unlocked:\s*true\s*$/m.test(raw)
        })
        .map(f => `/courses/${f.replace(/\.mdx$/, '')}`)
    : []

  return [...staticPaths, ...unlockedCurriculumSlugs, ...blogSlugs, ...guideSlugs].map(p =>
    p === '/' ? BASE_URL : `${BASE_URL}${p}`,
  )
}

export async function submitIndexNow(urlList = collectCanonicalUrls()) {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  })
  return { status: response.status, submitted: urlList.length }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dryRun = process.argv.includes('--dry-run')
  const urls = collectCanonicalUrls()
  if (dryRun) {
    console.log(JSON.stringify({ host: HOST, keyLocation: KEY_LOCATION, count: urls.length, sample: urls.slice(0, 6) }, null, 2))
  } else {
    submitIndexNow(urls)
      .then(res => console.log(`IndexNow response HTTP ${res.status} for ${res.submitted} canonical URLs.`))
      .catch(err => {
        console.error('IndexNow submission failed:', err)
        process.exitCode = 1
      })
  }
}

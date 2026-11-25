import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { getAllGuides } from '@/lib/guides'
import { SITE_CONFIG } from '@/lib/site-config'

const BASE = SITE_CONFIG.siteUrl

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const guides = getAllGuides()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    {
      url: `${BASE}/what-is-an-agentic-architect`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE}/sovereign-stack`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    { url: `${BASE}/masterclass`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/accelerator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/starter-kit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/courses`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/work-with-me`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/teaching`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/boulder`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/stack`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/bsw`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/bsw/tutorial`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/bsw/setup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/bsw/templates`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/bsw/handouts`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/now`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/sponsor`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const guideRoutes: MetadataRoute.Sitemap = guides.map(guide => ({
    url: `${BASE}/guides/${guide.slug}`,
    lastModified: new Date(guide.publishedDate),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...postRoutes, ...guideRoutes]
}

import { getAllPosts } from '@/lib/mdx'

const SITE_URL = 'https://agenticarchitecture.ai'
const FEED_TITLE = 'Agentic Architecture'
const FEED_DESC =
  'Field notes on agentic architecture, local-first AI, and what is actually working in 2026. Sophia Stein, Boulder CO.'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts()
  const updated = posts[0]?.publishedDate ?? new Date().toISOString()
  const updatedIso = new Date(updated).toISOString()

  const entries = posts
    .map(post => {
      const url = `${SITE_URL}/blog/${post.slug}`
      const date = new Date(post.publishedDate).toISOString()
      const tags = post.tags
        .map(t => `    <category term="${escapeXml(t)}" />`)
        .join('\n')
      return `  <entry>
    <id>${url}</id>
    <title>${escapeXml(post.title)}</title>
    <link href="${url}" />
    <updated>${date}</updated>
    <published>${date}</published>
    <author><name>Sophia Stein</name></author>
    <summary type="text">${escapeXml(post.description)}</summary>
${tags}
  </entry>`
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${SITE_URL}/</id>
  <title>${escapeXml(FEED_TITLE)}</title>
  <subtitle>${escapeXml(FEED_DESC)}</subtitle>
  <link href="${SITE_URL}/" rel="alternate" />
  <link href="${SITE_URL}/rss.xml" rel="self" type="application/atom+xml" />
  <updated>${updatedIso}</updated>
  <author><name>Sophia Stein</name><uri>${SITE_URL}/about</uri></author>
${entries}
</feed>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

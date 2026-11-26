// Converts content/blog/<slug>.mdx playbooks into:
// 1. Substack ProseMirror `body_json` (`draft_title`, `draft_subtitle`, `draft_body`)
//    with clean relative->absolute URL rewriting, GFM table formatting, and funnel footer CTAs.
// 2. High-engagement Substack Notes + LinkedIn/X social queue drafts.
//
// Usage:
//   node scripts/mdx-to-substack.mjs <slug>
//   node scripts/mdx-to-substack.mjs --bundle <outFile> <slug1> <slug2> ...

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BLOG_DIR = path.join(ROOT, 'content', 'blog')
const SITE_URL = 'https://agenticarchitect.ai'
const SUBSTACK_URL = 'https://agenticarchitectai.substack.com'
const CAL_URL = 'https://cal.com/sophia-stein'

export function parseMdxFile(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { frontmatter: {}, content: raw }
  const [, yaml, content] = match
  const frontmatter = {}
  for (const line of yaml.split('\n')) {
    const colon = line.indexOf(':')
    if (colon < 0) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim()
    if (val.startsWith('[')) {
      frontmatter[key] = val
        .slice(1, val.lastIndexOf(']'))
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (val === 'true') {
      frontmatter[key] = true
    } else if (val === 'false') {
      frontmatter[key] = false
    } else {
      frontmatter[key] = val.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1').replace(/\\"/g, '"')
    }
  }
  return { frontmatter, content }
}

function absolutizeHref(href) {
  if (!href) return SITE_URL
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
    return href
  }
  if (href.startsWith('/')) {
    return `${SITE_URL}${href}`
  }
  return `${SITE_URL}/${href}`
}

function inlineMdastToProseMirror(children = [], activeMarks = []) {
  const out = []
  for (const node of children) {
    if (node.type === 'text') {
      if (node.value) {
        const item = { type: 'text', text: node.value }
        if (activeMarks.length > 0) item.marks = activeMarks.map(m => ({ ...m }))
        out.push(item)
      }
    } else if (node.type === 'strong') {
      out.push(...inlineMdastToProseMirror(node.children, [...activeMarks, { type: 'strong' }]))
    } else if (node.type === 'emphasis') {
      out.push(...inlineMdastToProseMirror(node.children, [...activeMarks, { type: 'em' }]))
    } else if (node.type === 'inlineCode') {
      const item = {
        type: 'text',
        text: node.value,
        marks: [...activeMarks.map(m => ({ ...m })), { type: 'code' }],
      }
      out.push(item)
    } else if (node.type === 'link') {
      const href = absolutizeHref(node.url)
      out.push(
        ...inlineMdastToProseMirror(node.children, [
          ...activeMarks,
          { type: 'link', attrs: { href, target: '_blank', rel: 'noopener noreferrer nofollow', class: null } },
        ]),
      )
    } else if (node.type === 'break') {
      out.push({ type: 'hard_break' })
    } else if (node.children) {
      out.push(...inlineMdastToProseMirror(node.children, activeMarks))
    }
  }
  return out
}

function plainTextFromMdast(node) {
  if (!node) return ''
  if (node.type === 'text' || node.type === 'inlineCode') return node.value || ''
  if (Array.isArray(node.children)) return node.children.map(plainTextFromMdast).join('')
  return ''
}

function tableToBulletList(tableNode) {
  const rows = tableNode.children || []
  if (rows.length < 2) return null
  const headers = (rows[0].children || []).map(cell => plainTextFromMdast(cell).trim())
  const listItems = []

  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r].children || []
    const leadText = plainTextFromMdast(cells[0]).trim()
    const detailParts = []
    for (let c = 1; c < cells.length; c++) {
      const val = plainTextFromMdast(cells[c]).trim()
      if (!val) continue
      const hdr = headers[c] ? `${headers[c]}: ` : ''
      detailParts.push(`${hdr}${val}`)
    }
    const content = []
    if (leadText) {
      content.push({ type: 'text', text: leadText, marks: [{ type: 'strong' }] })
    }
    if (detailParts.length > 0) {
      content.push({
        type: 'text',
        text: `${leadText ? ' · ' : ''}${detailParts.join(' | ')}`,
      })
    }
    if (content.length > 0) {
      listItems.push({
        type: 'list_item',
        content: [{ type: 'paragraph', content }],
      })
    }
  }

  return listItems.length > 0 ? { type: 'bullet_list', content: listItems } : null
}

function imageNodeToProseMirror(imgNode) {
  const src = absolutizeHref(imgNode.url)
  const captionText = (imgNode.alt || imgNode.title || '').trim()
  const children = [
    {
      type: 'image2',
      attrs: {
        src,
        fullscreen: false,
        imageSize: 'normal',
        height: 900,
        width: 1600,
        resizeWidth: null,
        bytes: null,
        alt: captionText,
        title: imgNode.title || captionText,
        type: 'image/png',
        href: null,
        belowTheFold: false,
        internalRedirect: null,
      },
    },
  ]
  if (captionText) {
    children.push({
      type: 'caption',
      content: [{ type: 'text', text: captionText }],
    })
  }
  return {
    type: 'captionedImage',
    content: children,
  }
}

function blockMdastToProseMirror(nodes = []) {
  const blocks = []
  for (const node of nodes) {
    if (node.type === 'heading') {
      const level = Math.min(Math.max(node.depth || 2, 1), 4)
      const content = inlineMdastToProseMirror(node.children)
      if (content.length > 0) {
        blocks.push({ type: 'heading', attrs: { level }, content })
      }
    } else if (node.type === 'image') {
      blocks.push(imageNodeToProseMirror(node))
    } else if (node.type === 'paragraph') {
      if (Array.isArray(node.children) && node.children.length === 1 && node.children[0].type === 'image') {
        blocks.push(imageNodeToProseMirror(node.children[0]))
      } else {
        const content = inlineMdastToProseMirror(node.children)
        if (content.length > 0) {
          blocks.push({ type: 'paragraph', content })
        }
      }
    } else if (node.type === 'blockquote') {
      const inner = blockMdastToProseMirror(node.children)
      if (inner.length > 0) {
        blocks.push({ type: 'blockquote', content: inner })
      }
    } else if (node.type === 'list') {
      const items = (node.children || [])
        .map(li => {
          const itemBlocks = blockMdastToProseMirror(li.children)
          return itemBlocks.length > 0 ? { type: 'list_item', content: itemBlocks } : null
        })
        .filter(Boolean)
      if (items.length > 0) {
        blocks.push({
          type: node.ordered ? 'ordered_list' : 'bullet_list',
          ...(node.ordered ? { attrs: { start: node.start || 1, order: node.start || 1 } } : {}),
          content: items,
        })
      }
    } else if (node.type === 'code') {
      blocks.push({
        type: 'code_block',
        attrs: { language: node.lang || null },
        content: node.value ? [{ type: 'text', text: node.value }] : [],
      })
    } else if (node.type === 'thematicBreak') {
      blocks.push({ type: 'horizontal_rule' })
    } else if (node.type === 'table') {
      const converted = tableToBulletList(node)
      if (converted) blocks.push(converted)
    }
  }
  return blocks
}

function buildFunnelFooterBlocks(slug) {
  const canonicalUrl = `${SITE_URL}/blog/${slug}`
  return [
    { type: 'horizontal_rule' },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Put This Playbook Into Practice' }],
    },
    {
      type: 'bullet_list',
      content: [
        {
          type: 'list_item',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Free 20-Minute Bottleneck Scorecard & SOP Kit: ', marks: [{ type: 'strong' }] },
                {
                  type: 'text',
                  text: 'Score your #1 workflow and download the operating templates',
                  marks: [{ type: 'link', attrs: { href: `${SITE_URL}/starter-kit`, target: '_blank', rel: 'noopener noreferrer nofollow', class: null } }],
                },
              ],
            },
          ],
        },
        {
          type: 'list_item',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Free Live 60-Min Business Automation Build: ', marks: [{ type: 'strong' }] },
                {
                  type: 'text',
                  text: 'Save your seat on Cal.com',
                  marks: [{ type: 'link', attrs: { href: `${CAL_URL}/masterclass`, target: '_blank', rel: 'noopener noreferrer nofollow', class: null } }],
                },
              ],
            },
          ],
        },
        {
          type: 'list_item',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Work With Sophia (Courses, Custom Sprints, Fractional CAIO/CTO & Corporate Training): ', marks: [{ type: 'strong' }] },
                {
                  type: 'text',
                  text: 'Explore tracks for business owners and executive teams',
                  marks: [{ type: 'link', attrs: { href: `${SITE_URL}/work-with-me`, target: '_blank', rel: 'noopener noreferrer nofollow', class: null } }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Originally published at ', marks: [{ type: 'em' }] },
        {
          type: 'text',
          text: canonicalUrl,
          marks: [
            { type: 'em' },
            { type: 'link', attrs: { href: canonicalUrl, target: '_blank', rel: 'noopener noreferrer nofollow', class: null } },
          ],
        },
        {
          type: 'text',
          text: '. Sophia Stein writes and teaches here in a personal capacity; all views are her own.',
          marks: [{ type: 'em' }],
        },
      ],
    },
  ]
}

export function convertMarkdownBodyToProseMirror(markdown) {
  const stripped = String(markdown || '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  const tree = unified().use(remarkParse).use(remarkGfm).parse(stripped)
  return blockMdastToProseMirror(tree.children)
}

export function convertMdxToSubstackPayload(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { frontmatter, content } = parseMdxFile(raw)
  const stripped = content
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/Brand Brain/gi, 'Company Context Vault')
    .replace(/`?voice\.md`?/gi, 'company operating rules')
    .replace(/`?icp\.md`?/gi, 'buyer qualification criteria')
  const tree = unified().use(remarkParse).use(remarkGfm).parse(stripped)
  const bodyBlocks = blockMdastToProseMirror(tree.children)
  const fullDoc = {
    type: 'doc',
    attrs: { schemaVersion: 'v1' },
    content: [...bodyBlocks, ...buildFunnelFooterBlocks(slug)],
  }

  const noteText = `${frontmatter.title}\n\n${frontmatter.description}\n\nFull playbook + copy-paste templates: ${SITE_URL}/blog/${slug}`

  return {
    slug,
    title: frontmatter.title,
    subtitle: frontmatter.description,
    track: frontmatter.track || 'small-business',
    publishedDate: frontmatter.publishedDate,
    draft_title: frontmatter.title,
    draft_subtitle: frontmatter.description,
    draft_body: JSON.stringify(fullDoc),
    canonicalUrl: `${SITE_URL}/blog/${slug}`,
    substackUrl: SUBSTACK_URL,
    noteText,
  }
}

function runCli() {
  const args = process.argv.slice(2)
  if (args[0] === '--bundle') {
    const outFile = args[1]
    const slugs = args.slice(2)
    if (!outFile || slugs.length === 0) {
      console.error('Usage: node scripts/mdx-to-substack.mjs --bundle <outFile> <slug1> [slug2...]')
      process.exit(1)
    }
    const items = slugs.map(s => convertMdxToSubstackPayload(s))
    fs.writeFileSync(outFile, JSON.stringify(items, null, 2))
    console.log(`[mdx-to-substack] wrote ${items.length} Substack payload(s) -> ${outFile}`)
    return
  }

  const slug = args[0]
  if (!slug) {
    console.error('Usage: node scripts/mdx-to-substack.mjs <slug>')
    process.exit(1)
  }
  const payload = convertMdxToSubstackPayload(slug)
  const outDir = path.join(ROOT, 'content', 'social', slug)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'substack-api-payload.json'), JSON.stringify(payload, null, 2))
  console.log(`[mdx-to-substack] generated Substack payload -> content/social/${slug}/substack-api-payload.json`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli()
}

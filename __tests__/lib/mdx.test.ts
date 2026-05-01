import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getAllPosts, getPost } from '@/lib/mdx'

vi.mock('fs')
import fs from 'fs'
const mockFs = vi.mocked(fs)

const POST_A = `---
title: Post A
slug: post-a
publishedDate: 2026-03-01
description: Earlier post
tags: [test]
draft: false
---

Content A.
`

const POST_B = `---
title: Post B
slug: post-b
publishedDate: 2026-04-28
description: Later post
tags: [test, demo]
draft: false
---

Content B.
`

const DRAFT_POST = `---
title: Draft
slug: draft
publishedDate: 2026-04-29
description: Not published
tags: [draft]
draft: true
---

Draft content.
`

describe('getAllPosts', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('returns posts sorted by publishedDate descending', () => {
    mockFs.readdirSync.mockReturnValue(['post-a.mdx', 'post-b.mdx'] as any)
    mockFs.readFileSync.mockImplementation((p: any) =>
      p.toString().includes('post-a') ? POST_A : POST_B
    )
    const posts = getAllPosts()
    expect(posts[0].slug).toBe('post-b')
    expect(posts[1].slug).toBe('post-a')
  })

  it('excludes draft posts', () => {
    mockFs.readdirSync.mockReturnValue(['draft.mdx'] as any)
    mockFs.readFileSync.mockReturnValue(DRAFT_POST)
    expect(getAllPosts()).toHaveLength(0)
  })

  it('returns only .mdx files', () => {
    mockFs.readdirSync.mockReturnValue(['post-b.mdx', 'readme.txt'] as any)
    mockFs.readFileSync.mockReturnValue(POST_B)
    expect(getAllPosts()).toHaveLength(1)
  })

  it('returns frontmatter fields without content', () => {
    mockFs.readdirSync.mockReturnValue(['post-b.mdx'] as any)
    mockFs.readFileSync.mockReturnValue(POST_B)
    const posts = getAllPosts()
    expect(posts[0].title).toBe('Post B')
    expect(posts[0].tags).toEqual(['test', 'demo'])
    expect((posts[0] as any).content).toBeUndefined()
  })
})

describe('getPost', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('returns frontmatter and content for valid slug', () => {
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readFileSync.mockReturnValue(POST_B)
    const result = getPost('post-b')
    expect(result).not.toBeNull()
    expect(result!.frontmatter.title).toBe('Post B')
    expect(result!.content).toContain('Content B.')
  })

  it('returns null for missing file', () => {
    mockFs.existsSync.mockReturnValue(false)
    expect(getPost('does-not-exist')).toBeNull()
  })

  it('content does not include frontmatter', () => {
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readFileSync.mockReturnValue(POST_B)
    const result = getPost('post-b')
    expect(result!.content).not.toContain('publishedDate')
  })
})

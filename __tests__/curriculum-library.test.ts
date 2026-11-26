import { describe, it, expect } from 'vitest'
import {
  CURRICULA,
  SKOOL_LAB_TRACKS,
  getAllCurriculumModules,
  getModulesByCurriculum,
  getPublicModuleView,
} from '@/lib/curriculum'

describe('Skool Lab Tracks & 4-Syllabus Module Manifest', () => {
  it('loads 3 Skool Lab tracks, 4 syllabi, and 20 practitioner modules free of price tags, em-dashes, and retired terms', () => {
    expect(SKOOL_LAB_TRACKS).toHaveLength(3)
    expect(SKOOL_LAB_TRACKS[0].title).toContain('Claude Superuser')
    expect(SKOOL_LAB_TRACKS[1].title).toContain('$200/mo')
    expect(SKOOL_LAB_TRACKS[2].title).toContain('Become an AI Architect')

    expect(CURRICULA).toHaveLength(4)
    for (const c of CURRICULA) {
      expect('priceUsd' in c).toBe(false)
      expect(c.waitlistHref).toBe('/courses#waitlist')
    }

    const all = getAllCurriculumModules()
    expect(all).toHaveLength(20)

    for (const c of CURRICULA) {
      const mods = getModulesByCurriculum(c.id)
      expect(mods).toHaveLength(5)
      expect(mods.filter(m => m.frontmatter.unlocked)).toHaveLength(1)
      expect(mods[0].frontmatter.unlocked).toBe(true)
    }
  })

  it('returns full HTML for unlocked x.1 modules and strips HTML on gated x.2..x.5 public views', () => {
    const openMod = getPublicModuleView('1-1-2026-ai-landscape-model-matrix')
    expect(openMod).not.toBeNull()
    expect(openMod!.frontmatter.unlocked).toBe(true)
    expect(openMod!.html).toContain('<h2')
    expect(openMod!.html).toContain('Cowork')
    expect(openMod!.html).not.toContain('\u2014')
    expect(openMod!.html?.toLowerCase()).not.toContain('voice.md')
    expect(openMod!.html?.toLowerCase()).not.toContain('brand brain')

    const gatedMod = getPublicModuleView('1-2-privacy-shadow-ai-security')
    expect(gatedMod).not.toBeNull()
    expect(gatedMod!.frontmatter.unlocked).toBe(false)
    expect(gatedMod!.html).toBeNull()
    expect(gatedMod!.frontmatter.learningOutcomes.length).toBeGreaterThanOrEqual(3)
  })

  it('returns null for unknown module slugs', () => {
    expect(getPublicModuleView('does-not-exist')).toBeNull()
  })
})

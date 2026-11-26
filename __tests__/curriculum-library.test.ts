import { describe, it, expect } from 'vitest'
import {
  CURRICULA,
  ALL_ACCESS_PASS,
  getAllCurriculumModules,
  getModulesByCurriculum,
  getPublicModuleView,
  getVaultBundle,
} from '@/lib/curriculum'

describe('4-Curriculum Catalog & Module Manifest', () => {
  it('loads all 4 curricula and 20 practitioner modules free of em-dashes and retired terms', () => {
    expect(CURRICULA).toHaveLength(4)
    expect(CURRICULA.map(c => c.priceUsd)).toEqual([297, 397, 497, 497])
    expect(ALL_ACCESS_PASS.priceUsd).toBe(997)

    const all = getAllCurriculumModules()
    expect(all).toHaveLength(20)

    for (const c of CURRICULA) {
      const mods = getModulesByCurriculum(c.id)
      expect(mods).toHaveLength(5)
      expect(mods.filter(m => m.frontmatter.unlocked)).toHaveLength(1)
      expect(mods[0].frontmatter.unlocked).toBe(true)
    }

    const bundle = getVaultBundle(ALL_ACCESS_PASS.vaultToken)
    expect(bundle).not.toBeNull()
    expect(bundle!.curricula).toHaveLength(4)
    for (const group of bundle!.curricula) {
      for (const mod of group.modules) {
        expect(mod.html.length, `${mod.slug} html length`).toBeGreaterThan(800)
        expect(mod.html).not.toContain('\u2014')
        expect(mod.html).not.toContain(' -- ')
        expect(mod.html.toLowerCase()).not.toContain('voice.md')
        expect(mod.html.toLowerCase()).not.toContain('icp.md')
        expect(mod.html.toLowerCase()).not.toContain('brand brain')
        expect(mod.html.toLowerCase()).not.toContain('ai org chart')
      }
    }
  })

  it('returns full HTML for unlocked x.1 modules and strips HTML on paid x.2..x.5 public views', () => {
    const openMod = getPublicModuleView('1-1-2026-ai-landscape-model-matrix')
    expect(openMod).not.toBeNull()
    expect(openMod!.frontmatter.unlocked).toBe(true)
    expect(openMod!.html).toContain('<h2')
    expect(openMod!.html).toContain('Cowork')
    expect(openMod!.html).toContain('<div class="table-scroll"><table>')

    const gatedMod = getPublicModuleView('1-2-privacy-shadow-ai-security')
    expect(gatedMod).not.toBeNull()
    expect(gatedMod!.frontmatter.unlocked).toBe(false)
    expect(gatedMod!.html).toBeNull()
    expect(gatedMod!.frontmatter.learningOutcomes.length).toBeGreaterThanOrEqual(3)
  })

  it('rejects unknown or human-guessable vault tokens', () => {
    expect(getVaultBundle('foundations')).toBeNull()
    expect(getVaultBundle('curriculum-01')).toBeNull()
    expect(getVaultBundle('')).toBeNull()
  })
})

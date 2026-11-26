import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import { describe, it, expect } from 'vitest'
import { buildFfmpegArgs, parseRecorderCliArgs } from '../scripts/record-linux-walkthrough.mjs'

describe('Zero-Loom Linux Walkthrough Recorder, Reveal.js Decks & High-Ticket Kits', () => {
  it('builds safe execFile ffmpeg arguments and runs CLI --dry-run cleanly without a browser', () => {
    const args = buildFfmpegArgs({
      framesDir: '/tmp/aa-frames',
      fps: 30,
      outputPath: '/tmp/module-01.mp4',
    })
    expect(args).toContain('-pix_fmt')
    expect(args).toContain('yuv420p')
    expect(args.at(-1)).toBe('/tmp/module-01.mp4')

    expect(() =>
      buildFfmpegArgs({ framesDir: '/tmp/aa-frames', outputPath: '/tmp/bad;rm -rf.txt' }),
    ).toThrow()
    expect(() =>
      buildFfmpegArgs({ framesDir: '/tmp/aa-frames', outputPath: '-flag-injection.mp4' }),
    ).toThrow()

    const parsed = parseRecorderCliArgs([
      '--url',
      'http://localhost:3000/slides/masterclass-2026.html',
      '--slides',
      '12',
      '--out',
      '/tmp/out.mp4',
      '--dry-run',
    ])
    expect(parsed.dryRun).toBe(true)
    expect(parsed.slides).toBe(12)

    const stdout = execFileSync(
      'node',
      [
        path.join(process.cwd(), 'scripts/record-linux-walkthrough.mjs'),
        '--url',
        'http://localhost:3000/slides/masterclass-2026.html',
        '--slides',
        '5',
        '--out',
        '/tmp/masterclass-preview.mp4',
        '--dry-run',
      ],
      { encoding: 'utf8' },
    )
    expect(stdout).toContain('/usr/bin/ffmpeg')
  })

  it('ships valid Reveal.js HTML decks and clean Corporate, Forward-Deployed, and L&D Stipend kits', () => {
    const files = [
      'public/slides/masterclass-2026.html',
      'public/slides/curriculum-01-models-and-landscape.html',
      'public/downloads/corporate-ai-workshop-sheet.md',
      'public/downloads/forward-deployed-ai-scoping-guide.md',
      'public/downloads/ld-stipend-approval-letter.md',
      'docs/linux-course-recording.md',
    ]
    for (const rel of files) {
      const content = fs.readFileSync(path.join(process.cwd(), rel), 'utf8')
      expect(content.length, rel).toBeGreaterThan(400)
      expect(content, `${rel} em-dash`).not.toContain('\u2014')
      expect(content, `${rel} double-hyphen`).not.toContain(' -- ')
      expect(content.toLowerCase(), `${rel} voice.md`).not.toContain('voice.md')
      expect(content.toLowerCase(), `${rel} ai org chart`).not.toContain('ai org chart')
      if (rel.endsWith('.html')) {
        expect(content, `${rel} Reveal grid display`).toContain("display: 'grid'")
      }
    }
  })
})

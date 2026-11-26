import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const FFMPEG_BIN = '/usr/bin/ffmpeg'
const UNSAFE_PATH_RE = /[;&|$`\n\r\0]/

function assertSafePath(p, label, allowedExts = null) {
  if (!p || typeof p !== 'string' || UNSAFE_PATH_RE.test(p) || p.includes('..')) {
    throw new Error(`Unsafe or invalid ${label}: ${String(p)}`)
  }
  if (allowedExts) {
    const ext = path.extname(p).toLowerCase()
    if (!allowedExts.includes(ext)) {
      throw new Error(`${label} must end with ${allowedExts.join(' or ')}`)
    }
  }
}

export function buildFfmpegArgs({ framesDir, fps = 30, audioPath, outputPath }) {
  assertSafePath(framesDir, 'framesDir')
  assertSafePath(outputPath, 'outputPath', ['.mp4', '.webm'])
  const numericFps = Number(fps)
  if (!Number.isFinite(numericFps) || numericFps < 1 || numericFps > 120) {
    throw new Error(`Invalid fps: ${String(fps)}`)
  }

  const args = ['-y', '-framerate', String(numericFps), '-i', path.join(framesDir, 'frame-%05d.png')]

  if (audioPath) {
    assertSafePath(audioPath, 'audioPath', ['.wav', '.mp3', '.m4a', '.ogg', '.flac'])
    args.push('-i', audioPath, '-c:a', 'aac', '-b:a', '192k', '-shortest')
  }

  if (outputPath.toLowerCase().endsWith('.webm')) {
    args.push('-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', outputPath)
  } else {
    args.push('-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', outputPath)
  }

  return args
}

export function parseRecorderCliArgs(argv = []) {
  const opts = {
    url: 'http://localhost:3000/slides/masterclass-2026.html',
    slides: 10,
    secondsPerSlide: 6,
    outputPath: path.join(os.tmpdir(), 'agentic-architect-walkthrough.mp4'),
    audioPath: undefined,
    dryRun: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i]
    if (flag === '--url' && argv[i + 1]) {
      opts.url = argv[++i]
    } else if (flag === '--slides' && argv[i + 1]) {
      opts.slides = Math.max(1, Math.min(200, Number(argv[++i]) || 10))
    } else if (flag === '--seconds' && argv[i + 1]) {
      opts.secondsPerSlide = Math.max(1, Math.min(120, Number(argv[++i]) || 6))
    } else if (flag === '--out' && argv[i + 1]) {
      opts.outputPath = argv[++i]
    } else if (flag === '--audio' && argv[i + 1]) {
      opts.audioPath = argv[++i]
    } else if (flag === '--dry-run') {
      opts.dryRun = true
    }
  }

  if (!/^https?:\/\//i.test(opts.url) && !/^file:\/\//i.test(opts.url)) {
    throw new Error(`Recorder URL must start with http://, https://, or file://: ${opts.url}`)
  }
  assertSafePath(opts.outputPath, 'outputPath', ['.mp4', '.webm'])
  if (opts.audioPath) {
    assertSafePath(opts.audioPath, 'audioPath', ['.wav', '.mp3', '.m4a', '.ogg', '.flac'])
  }

  return opts
}

async function runLiveCapture(opts) {
  const framesDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aa-deck-frames-'))
  const fps = 1
  let browser
  try {
    const pkgName = 'playwright'
    const pw = await import(/* @vite-ignore */ pkgName).catch(() => {
      throw new Error(
        'Playwright is not installed in node_modules yet. Run `npm i -D playwright && npx playwright install chromium` for headless capture, or pass --dry-run.',
      )
    })
    browser = await pw.chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
    await page.goto(opts.url, { waitUntil: 'networkidle' })

    let frameIdx = 0
    for (let s = 0; s < opts.slides; s += 1) {
      await page.waitForTimeout(350)
      const shotPath = path.join(framesDir, `shot-${String(s).padStart(3, '0')}.png`)
      await page.screenshot({ path: shotPath })
      for (let hold = 0; hold < opts.secondsPerSlide; hold += 1) {
        const framePath = path.join(framesDir, `frame-${String(frameIdx).padStart(5, '0')}.png`)
        fs.copyFileSync(shotPath, framePath)
        frameIdx += 1
      }
      if (s < opts.slides - 1) {
        await page.keyboard.press('ArrowRight')
      }
    }

    const ffmpegArgs = buildFfmpegArgs({
      framesDir,
      fps,
      audioPath: opts.audioPath,
      outputPath: opts.outputPath,
    })
    execFileSync(FFMPEG_BIN, ffmpegArgs, { stdio: 'inherit' })
    console.log(`[record:deck] Rendered ${opts.slides} slides -> ${opts.outputPath}`)
  } finally {
    if (browser) await browser.close()
    fs.rmSync(framesDir, { recursive: true, force: true })
  }
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))

if (isMain) {
  const parsed = parseRecorderCliArgs(process.argv.slice(2))
  const previewArgs = buildFfmpegArgs({
    framesDir: '/tmp/aa-deck-frames-preview',
    fps: 1,
    audioPath: parsed.audioPath,
    outputPath: parsed.outputPath,
  })

  if (parsed.dryRun) {
    console.log(
      JSON.stringify(
        {
          mode: 'dry-run',
          ffmpegBinary: FFMPEG_BIN,
          ffmpegAvailable: fs.existsSync(FFMPEG_BIN),
          url: parsed.url,
          slides: parsed.slides,
          secondsPerSlide: parsed.secondsPerSlide,
          command: [FFMPEG_BIN, ...previewArgs],
        },
        null,
        2,
      ),
    )
  } else {
    runLiveCapture(parsed).catch(err => {
      console.error('[record:deck] Capture failed:', err.message)
      process.exitCode = 1
    })
  }
}

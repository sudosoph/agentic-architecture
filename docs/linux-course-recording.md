# Zero-Loom Linux Course & Briefing Video Pipeline

This repository replaces paid SaaS screen-recording subscriptions with deterministic `1280x720` Reveal.js HTML decks and native Linux (`Wayland` + `/usr/bin/ffmpeg`) capture workflows.

## 1. Automated Slide & Browser Walkthrough Renderer

Every HTML presentation under `public/slides/` uses a strict `1280x720` editorial frame (`masterclass-2026.html` and `curriculum-01-models-and-landscape.html`) so automated browser capture never clips typography or tables.

Preview the exact `ffmpeg` pipeline without launching a browser:

```bash
node scripts/record-linux-walkthrough.mjs \
  --url http://localhost:3000/slides/masterclass-2026.html \
  --slides 5 \
  --seconds 8 \
  --out /tmp/masterclass-2026.mp4 \
  --dry-run
```

Render a live `1080p` H.264 `.mp4` walkthrough while `npm run dev` is running (optionally muxing a recorded `.wav` or `.m4a` voiceover track):

```bash
node scripts/record-linux-walkthrough.mjs \
  --url http://localhost:3000/slides/curriculum-01-models-and-landscape.html \
  --slides 3 \
  --seconds 10 \
  --audio /tmp/module-01-voiceover.wav \
  --out /tmp/module-01-walkthrough.mp4
```

## 2. Native Linux Wayland Live Screen + Microphone Capture

When demonstrating live terminal harnesses (`Claude Code`, `OpenCode`), local folder setups (`Cowork`), or browser selectors on Wayland:

1. **Built-in GNOME Wayland Screencast:** Press `Ctrl+Shift+Alt+R`, select the browser or terminal window, and convert the resulting `.webm` to universally playable `yuv420p` `.mp4` via `/usr/bin/ffmpeg`:
   ```bash
   /usr/bin/ffmpeg -y -i Screencast.webm -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac lesson-clip.mp4
   ```
2. **Clean Voiceover First, Automated Visuals Second:** Record crisp voiceover audio into `/tmp/voice.wav` via PipeWire (`pw-record /tmp/voice.wav`), then pass `--audio /tmp/voice.wav` to `scripts/record-linux-walkthrough.mjs` so slide transitions stay pixel-sharp even if UI layouts evolve later.

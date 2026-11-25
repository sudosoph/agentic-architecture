// AUTO-GENERATED — do not edit manually; regenerated on every build via scripts/generate-guides-manifest.mjs
import type { GuideFrontmatter } from './guides'

export const guides: Array<{
  slug: string
  frontmatter: GuideFrontmatter
  html: string
  toc: { id: string; text: string }[]
}> = [
  {
    "slug": "booking-agent",
    "frontmatter": {
      "title": "Stop Replying to Scheduling Emails: Build a Booking Agent in an Afternoon",
      "slug": "booking-agent",
      "publishedDate": "2026-05-06",
      "description": "A copy-paste tutorial for non-coders. Paste a scheduling email, get a draft reply with your Cal.com link in plain English, hit send. No SaaS, no monthly subscription, ~$0 to run. Includes a forkable GitHub repo.",
      "tags": [
        "beginner",
        "booking",
        "automation",
        "cal-com",
        "guides"
      ],
      "difficulty": "beginner",
      "estimatedTime": "45 minutes",
      "repoUrl": "https://github.com/sudosoph/booking-agent",
      "draft": false
    },
    "html": "<p><strong>Who this is for.</strong> You're not a developer. You spend more time replying to \"what time works for you?\" emails than you'd care to admit. You have a Cal.com page (or any scheduling link) but people still email you instead of using it. You'd love an assistant that drafts those replies for you, on your behalf, that you just confirm or decline.</p>\n<p><strong>What you'll have at the end.</strong> A small web page on your laptop where you paste in a scheduling email, click a button, and get back a polite, on-brand draft reply that includes your Cal.com link with a sentence of context (why you're suggesting it, what the recipient should do). You copy it, paste it into your email client, send.</p>\n<p><strong>What it costs.</strong> Effectively zero. The Anthropic API charges per use (around $0.005 per drafted reply with Claude Haiku, less than a penny). Cal.com has a free tier. No monthly subscription.</p>\n<p><strong>What it doesn't do (yet).</strong> It doesn't read your inbox automatically, that's the next guide. This first version is a copy-paste tool. We start here on purpose: you stay in control, you see every draft before it goes out, and you build trust in the agent before handing it the keys.</p>\n<h2 id=\"what-youll-need\">What you'll need</h2>\n<ul>\n<li>A computer (Mac, Windows, or Linux, any of them work).</li>\n<li>A free <a href=\"https://console.anthropic.com\">Anthropic account</a> for the API key. New accounts get $5 in free credit, which is enough for ~1,000 drafted replies.</li>\n<li>A free <a href=\"https://cal.com\">Cal.com account</a> (or any scheduling link, Calendly works too, just swap the URL).</li>\n<li>About 45 minutes. The first 15 are setup, the rest is using it and tweaking the tone.</li>\n</ul>\n<p>You do not need to know how to code. You'll copy and paste a few commands. If you've ever opened the Terminal app to run something a guide told you to, you have all the skills required.</p>\n<h2 id=\"the-plan\">The plan</h2>\n<p>We're going to:</p>\n<ol>\n<li>Get an API key from Anthropic.</li>\n<li>Clone a small GitHub repo (one command).</li>\n<li>Add your API key and your Cal.com link to a file.</li>\n<li>Run the app on your laptop.</li>\n<li>Use it: paste an email, get a draft, send it.</li>\n<li>Customize the tone so it sounds like you.</li>\n</ol>\n<h2 id=\"step-1-get-your-anthropic-api-key\">Step 1. Get your Anthropic API key</h2>\n<p>Go to <a href=\"https://console.anthropic.com\">console.anthropic.com</a> and sign up. Once you're in:</p>\n<ol>\n<li>Click <strong>Settings</strong> → <strong>API keys</strong> in the sidebar.</li>\n<li>Click <strong>Create Key</strong>, give it a name like \"booking-agent\", and copy the key.</li>\n<li>Save it somewhere safe (a password manager is ideal). You won't be able to see it again after you close the page.</li>\n</ol>\n<p>The key looks like <code>sk-ant-api03-XXXXX...</code>. Treat it like a password.</p>\n<h2 id=\"step-2-get-your-calcom-link\">Step 2. Get your Cal.com link</h2>\n<p>If you don't already have one, sign up at <a href=\"https://cal.com\">cal.com</a> and create your first event type. The free tier covers everything we need.</p>\n<p>Your link will look like <code>https://cal.com/your-name/30min</code>. Copy it.</p>\n<h2 id=\"step-3-clone-the-repo\">Step 3. Clone the repo</h2>\n<p>Open the Terminal app (on Mac: Cmd+Space, type \"Terminal\"; on Windows: open PowerShell). Paste this and press Enter:</p>\n<pre><code class=\"language-bash\">git clone https://github.com/sudosoph/booking-agent.git\ncd booking-agent\nnpm install\n</code></pre>\n<p>The first command downloads the code. The second moves you into the folder. The third installs the libraries the app needs (it'll print a lot of text, that's normal, wait for it to finish).</p>\n<p>If you get an error like \"command not found: npm\", you need to install Node.js first. Go to <a href=\"https://nodejs.org\">nodejs.org</a>, download the LTS version, install it, then run the three commands above again.</p>\n<h2 id=\"step-4-add-your-secrets\">Step 4. Add your secrets</h2>\n<p>In the booking-agent folder, you'll see a file called <code>.env.example</code>. Make a copy of it called <code>.env</code> (just <code>.env</code>, no <code>example</code> part). Open <code>.env</code> in any text editor (TextEdit on Mac, Notepad on Windows, or VS Code if you have it). It looks like this:</p>\n<pre><code class=\"language-bash\">ANTHROPIC_API_KEY=sk-ant-api03-paste-your-key-here\nCAL_LINK=https://cal.com/your-name/30min\nYOUR_NAME=Sophia\nYOUR_TIMEZONE=America/Denver\n</code></pre>\n<p>Replace each value with yours. Save the file. That's it for setup.</p>\n<h2 id=\"step-5-run-it\">Step 5. Run it</h2>\n<p>Back in the Terminal:</p>\n<pre><code class=\"language-bash\">npm run dev\n</code></pre>\n<p>You'll see a line that says something like <code>Local: http://localhost:3000</code>. Open that URL in your browser. You'll see a simple form with a big text box.</p>\n<h2 id=\"step-6-use-it\">Step 6. Use it</h2>\n<p>Find a scheduling email in your inbox, the kind that says \"Hey, free for a quick call next week?\" Copy the entire email body (subject + body if you want, but the body is what matters). Paste it into the text box. Click <strong>Draft reply</strong>.</p>\n<p>In a few seconds, you'll see a draft reply below the form. It will:</p>\n<ul>\n<li>Address the sender by name.</li>\n<li>Match the level of formality of their email.</li>\n<li>Include your Cal.com link with one or two sentences of context.</li>\n<li>Suggest an alternative if they asked for a specific time you might want to honor.</li>\n<li>Sign off in your voice.</li>\n</ul>\n<p>Read it. If it's good, click <strong>Copy</strong>, paste it into your email reply, hit send. If the tone is off, edit it before copying, or tweak the prompt (next step).</p>\n<h2 id=\"step-7-make-it-sound-like-you\">Step 7. Make it sound like you</h2>\n<p>The whole personality of the agent lives in one file: <code>src/voice.md</code>. Open it. It looks something like this:</p>\n<pre><code class=\"language-markdown\"># How to write replies for me\n\nI'm Sophia, an AI engineer based in Boulder, Colorado. My emails are:\n\n- Direct, but warm. I don't use \"circle back\" or \"touch base.\"\n- Short. Two or three sentences in the body.\n- Honest about what I can and can't do.\n\nWhen suggesting my Cal.com link:\n\n- Frame it as \"the easiest way to find a slot that works for both of us.\"\n- Don't apologize for using a scheduling tool.\n- If they suggested a specific time, acknowledge it before offering the link.\n\nWhen declining:\n\n- Be honest about why if it's relevant.\n- Always thank them for thinking of me.\n\nSign off with: \"Sophia\"\n</code></pre>\n<p>This is your agent's brand voice. Edit it freely. Run a few drafts and watch the agent adapt, the changes take effect on the next draft, no restart needed.</p>\n<p>The voice file is the most important customization, and the most fun. Add your own tics, your own preferred phrases, the things you say a lot, the things you'd never say. The agent reads this on every request and uses it to shape every reply. This is the same pattern professional writers use to keep AI on-brand at scale.</p>\n<h2 id=\"whats-actually-happening-under-the-hood\">What's actually happening under the hood</h2>\n<p>For the curious: when you click <strong>Draft reply</strong>, the app sends three things to the Anthropic API:</p>\n<ol>\n<li>Your <code>voice.md</code> file (your brand instructions).</li>\n<li>Your Cal.com link, your name, your timezone (basic context).</li>\n<li>The pasted email body.</li>\n</ol>\n<p>It uses Claude Haiku (the fastest, cheapest Claude model) and asks for a reply in a specific JSON shape: <code>{ subject, body }</code>. The app shows you the body. That's the whole pipeline, about 80 lines of code.</p>\n<p>If you're curious what the prompt looks like, open <code>src/prompt.ts</code>. It's plain English, not magic. Tweak it and you'll feel exactly how prompt engineering works.</p>\n<h2 id=\"what-it-costs-to-run\">What it costs to run</h2>\n<p>Each drafted reply uses around 800 input tokens and 200 output tokens. On Claude Haiku that's about half a cent per draft. If you draft 100 replies a month, you'll spend less than a dollar. The $5 free credit gets you to ~1,000 drafts.</p>\n<p>If you want to upgrade to Claude Sonnet (smarter, better at picking up tone), open <code>src/draft.ts</code> and change <code>model: 'claude-haiku-4-5'</code> to <code>model: 'claude-sonnet-4-6'</code>. Cost goes up to about 2 cents per draft.</p>\n<h2 id=\"what-v1-doesnt-do-and-why\">What V1 doesn't do (and why)</h2>\n<p>This guide builds the simplest possible version on purpose. Things it intentionally does <em>not</em> do yet:</p>\n<ul>\n<li><strong>Read your Gmail inbox automatically.</strong> You still copy-paste each email. V1 is about you trusting the drafts before automating the read path.</li>\n<li><strong>Send replies for you.</strong> Drafts only. You hit send.</li>\n<li><strong>Connect to Google Calendar to suggest specific times.</strong> It always offers the Cal.com link instead, because suggesting times that turn out to conflict is the most common failure mode of full-automation booking bots.</li>\n<li><strong>Use MCP</strong> (Model Context Protocol) for Google Workspace. MCP is the right pattern for V2, it lets the agent read Gmail, write drafts to Gmail's drafts folder, and query Calendar, but the setup is significantly more involved than this beginner guide.</li>\n</ul>\n<p>If you want any of these, that's V2 territory. The next guide in this series adds Gmail-via-MCP automation: agent watches your inbox, classifies scheduling emails, drafts replies, lands them in your Gmail drafts folder for review. Same pattern as this guide (paste-and-trust first, then automate), one layer up.</p>\n<h2 id=\"v2-preview-gmail--google-calendar-via-mcp\">V2 preview: Gmail + Google Calendar via MCP</h2>\n<p>The natural next step, in three pieces:</p>\n<ol>\n<li><strong>MCP server for Gmail</strong>, there's a community-maintained one (<code>gmail-mcp-server</code>) that exposes inbox, search, and drafts as tools. The agent gets <code>read_inbox</code>, <code>search_messages</code>, <code>create_draft</code> capabilities.</li>\n<li><strong>MCP server for Calendar</strong>, same pattern. <code>list_events</code>, <code>find_free_slots</code>. The agent can answer \"is Tuesday at 2 actually open?\" before suggesting it.</li>\n<li><strong>A small loop</strong> that runs every 15 minutes: list new messages → classify scheduling vs other → for scheduling messages, draft reply → save to Gmail drafts. You review and send when you're ready.</li>\n</ol>\n<p>V1 (this guide) is the foundation. You learn the prompt-engineering layer and build trust in the drafts. V2 adds the read/write automation on top of the same skill.</p>\n<p>If you want a heads-up when V2 lands, subscribe to Local-First AI at the bottom of this page or at <a href=\"https://localfirstai.substack.com\">localfirstai.substack.com</a>. One email a week, no upsells.</p>\n<h2 id=\"when-this-beginner-guide-isnt-enough\">When this beginner guide isn't enough</h2>\n<p>If you're a developer reading this and thinking \"I just want the full Gmail integration now\", fair. The Boulder Startup Week 2026 workshop (<a href=\"/bsw\">/bsw</a>) covers the full agentic pattern (research, draft, HITL, audit) with n8n + Gmail + an MCP-shaped tool layer. The slides, n8n template JSON, and the 17-step tutorial are open at the link above. That's the closest thing to \"the full thing\" the site has today.</p>\n<h2 id=\"troubleshooting\">Troubleshooting</h2>\n<p><strong>The Terminal says \"command not found: git\" or \"npm\".</strong> You need to install Git and Node.js. Git: <a href=\"https://git-scm.com\">git-scm.com</a>. Node: <a href=\"https://nodejs.org\">nodejs.org</a> (pick LTS).</p>\n<p><strong>The browser says \"this site can't be reached\".</strong> Make sure <code>npm run dev</code> is still running in the Terminal. If you closed the Terminal, open it again, <code>cd booking-agent</code>, and run <code>npm run dev</code> again.</p>\n<p><strong>The draft is in a weird tone or makes things up.</strong> Two fixes: (1) make <code>voice.md</code> more specific (add example replies you've sent before, show, don't tell), and (2) try Claude Sonnet instead of Haiku (see \"What it costs\" above). The smarter model picks up subtle tone shifts faster.</p>\n<p><strong>It mentioned a meeting time the sender didn't ask for.</strong> Open <code>src/prompt.ts</code> and look for the line that says \"Do not invent times\". Make it more explicit, e.g., \"Never propose a specific time. Always offer the Cal.com link instead.\"</p>\n<p><strong>I want it to send the reply for me, not just draft it.</strong> Don't, yet. Building trust in the drafts is the load-bearing first step. Once you've sent 50 drafts and you're confident in the agent's judgment, then we wire it up to your inbox. That's the guide after the next one.</p>\n<h2 id=\"where-to-ask-for-help\">Where to ask for help</h2>\n<p>Stuck on a step? <a href=\"/contact\">Email me</a>. Include the step number you're on and what the Terminal said when it broke. I read every message and I'm building this guide series in public, the questions you ask shape the next version.</p>",
    "toc": [
      {
        "id": "what-youll-need",
        "text": "What you'll need"
      },
      {
        "id": "the-plan",
        "text": "The plan"
      },
      {
        "id": "step-1-get-your-anthropic-api-key",
        "text": "Step 1. Get your Anthropic API key"
      },
      {
        "id": "step-2-get-your-calcom-link",
        "text": "Step 2. Get your Cal.com link"
      },
      {
        "id": "step-3-clone-the-repo",
        "text": "Step 3. Clone the repo"
      },
      {
        "id": "step-4-add-your-secrets",
        "text": "Step 4. Add your secrets"
      },
      {
        "id": "step-5-run-it",
        "text": "Step 5. Run it"
      },
      {
        "id": "step-6-use-it",
        "text": "Step 6. Use it"
      },
      {
        "id": "step-7-make-it-sound-like-you",
        "text": "Step 7. Make it sound like you"
      },
      {
        "id": "whats-actually-happening-under-the-hood",
        "text": "What's actually happening under the hood"
      },
      {
        "id": "what-it-costs-to-run",
        "text": "What it costs to run"
      },
      {
        "id": "what-v1-doesnt-do-and-why",
        "text": "What V1 doesn't do (and why)"
      },
      {
        "id": "v2-preview-gmail--google-calendar-via-mcp",
        "text": "V2 preview: Gmail + Google Calendar via MCP"
      },
      {
        "id": "when-this-beginner-guide-isnt-enough",
        "text": "When this beginner guide isn't enough"
      },
      {
        "id": "troubleshooting",
        "text": "Troubleshooting"
      },
      {
        "id": "where-to-ask-for-help",
        "text": "Where to ask for help"
      }
    ]
  }
]

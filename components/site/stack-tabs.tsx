'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ToolItem = {
  category: string
  name: string
  cost: string
  summary: string
  href?: string
}

const BUSINESS_STACK: ToolItem[] = [
  {
    category: 'Brand Brain & Daily Drafting',
    name: 'Portable voice.md + ICP Docs',
    cost: '$0 (Plain Markdown / Google Docs)',
    summary:
      'Store your voice rules, offer positioning, and 5 real writing samples in one clean file so any AI workspace writes like you immediately.',
  },
  {
    category: 'Bookings & Paid Consults',
    name: 'Cal.com + Stripe',
    cost: '$0/mo fixed',
    summary:
      'Direct calendar links for free discovery calls and Stripe-backed paid workflow audits without back-and-forth emails.',
    href: 'https://cal.com',
  },
  {
    category: 'Workflow Automation Glue',
    name: 'n8n (Open Source) or Zapier Free',
    cost: '$0 self-hosted / free tier',
    summary:
      'Connects inbound forms, calendar bookings, Gmail drafts, and spreadsheets with human-in-the-loop approval gates.',
    href: 'https://n8n.io',
  },
  {
    category: 'Newsletter & Owned Audience',
    name: 'Substack',
    cost: '$0/mo fixed',
    summary:
      'Combined web archive and email newsletter with built-in discovery network and zero server maintenance.',
    href: 'https://agenticarchitectai.substack.com',
  },
  {
    category: 'Social Cross-Posting',
    name: 'Buffer Free or Postiz (GitHub OSS)',
    cost: '$0/mo',
    summary:
      'Queue LinkedIn and X threads from one canonical weekly article without paying agency software fees.',
    href: 'https://postiz.com',
  },
  {
    category: 'Core Workspace & Search Analytics',
    name: 'Google Workspace + Search Console',
    cost: 'Existing workspace',
    summary:
      'Docs, Sheets, Calendar, Gmail Drafts, and Search Console query data wired directly into your weekly brief.',
  },
]

const SOVEREIGN_STACK: ToolItem[] = [
  {
    category: 'Encrypted Private Mesh',
    name: 'Tailscale',
    cost: 'Free personal / small team tier',
    summary:
      'Zero-port WireGuard mesh that lets your phone or travel laptop reach your home or office AI rig securely from anywhere.',
    href: 'https://tailscale.com',
  },
  {
    category: 'Open-Weight Local Models',
    name: 'DeepSeek 4.1, Qwen 3.6 & Gemma 4',
    cost: '$0 per token on your hardware',
    summary:
      'Run high-volume document extraction, structured classification, coding loops, and private client summarization locally with zero third-party retention.',
  },
  {
    category: 'Daily Driver Workstation (Sophia’s Rig)',
    name: 'Framework 16 (AMD Ryzen AI 9 HX 370 · 96GB DDR5)',
    cost: 'Owned hardware · 90GB unified GART pool',
    summary:
      'Modular, repairable Linux workstation running Ubuntu LTS, ROCm / Vulkan, llama.cpp, and Dockerized n8n workflows.',
    href: 'https://frame.work',
  },
  {
    category: 'Practical Small-Office Nodes',
    name: 'Mac Mini (Unified Memory) or Ryzen AI Mini-PC',
    cost: 'One-time ~$800 to $2,000 hardware',
    summary:
      'Quiet, low-wattage always-on office nodes recommended for small teams wanting a shared private AI server over Tailscale.',
  },
  {
    category: 'Local Inference & Tool Protocol',
    name: 'llama.cpp + Ollama + MCP Servers',
    cost: 'Open source (MIT / Apache 2.0)',
    summary:
      'Fast quantized model serving paired with Model Context Protocol bridges for local files, Postgres/pgvector, and browser tools.',
    href: 'https://github.com/ggml-org/llama.cpp',
  },
  {
    category: 'Edge Web & Git-Backed Publishing',
    name: 'Next.js 16 + Tailwind CSS + Cloudflare Workers',
    cost: '$0 to $5/mo edge hosting',
    summary:
      'Every playbook and guide lives as portable MDX in Git and deploys globally to Cloudflare Workers.',
    href: 'https://workers.cloudflare.com',
  },
]

export function StackTabs() {
  const [activeTab, setActiveTab] = useState<'business' | 'sovereign'>('business')
  const items = activeTab === 'business' ? BUSINESS_STACK : SOVEREIGN_STACK

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Stack architecture views"
        className="inline-flex flex-wrap gap-2 rounded-xl border border-border bg-surface p-1.5"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'business'}
          onClick={() => setActiveTab('business')}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'business'
              ? 'bg-accent text-white shadow-xs'
              : 'text-muted hover:text-fg'
          }`}
        >
          15-Minute Small Business Stack
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'sovereign'}
          onClick={() => setActiveTab('sovereign')}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'sovereign'
              ? 'bg-accent text-white shadow-xs'
              : 'text-muted hover:text-fg'
          }`}
        >
          Private &amp; Sovereign AI Rig
        </button>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 flex flex-wrap items-center justify-between gap-2">
        {activeTab === 'business' ? (
          <>
            <p className="text-sm text-fg font-medium">
              Start here if you run a lean business and want reliable automations live this afternoon with $0 software bloat.
            </p>
            <Badge variant="online">Zero-Cost / Free-Tier First</Badge>
          </>
        ) : (
          <>
            <p className="text-sm text-fg font-medium">
              Switch here when you want private local inference, zero per-token bills, and encrypted remote access over Tailscale.
            </p>
            <Badge variant="rig">Local Hardware + Mesh</Badge>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map(item => (
          <Card key={item.name} className="p-6 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  {item.category}
                </span>
                <span className="font-mono text-xs text-online font-medium">{item.cost}</span>
              </div>
              <h3 className="text-lg font-bold text-fg">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {item.name} ↗
                  </a>
                ) : (
                  item.name
                )}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{item.summary}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

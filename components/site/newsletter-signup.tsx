type Props = {
  /** Origin of the signup (homepage / bsw / library / blog) — informational only. */
  source?: string
  /** Optional headline override. */
  headline?: string
  /** Optional sub-line override. */
  sub?: string
  /** Optional surface variant. Inline = compact, no surrounding card. */
  variant?: 'card' | 'inline'
}

// Substack's official iframe embed. The earlier AJAX path returned 200 from
// Substack but didn't reliably trigger the confirmation email when the email
// was already associated with a Substack account (returns didSignup: false +
// prompt_to_login: true). The iframe widget always sends the email because
// it's user interaction inside Substack's domain. The white background of
// the embed is unfortunate but unavoidable without losing the confirmation flow.
const SUBSTACK_EMBED_URL = 'https://localfirstai.substack.com/embed'

export function NewsletterSignup({
  source: _source,
  headline = 'Local-First AI',
  sub,
  variant = 'card',
}: Props) {
  if (variant === 'inline') {
    return (
      <div className="max-w-md">
        <iframe
          src={SUBSTACK_EMBED_URL}
          title="Subscribe to Local-First AI"
          width="100%"
          height="160"
          style={{ border: '1px solid var(--color-border)', background: 'transparent' }}
          scrolling="no"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <section className="border border-border bg-surface p-6">
      <p className="font-mono text-xs text-bench uppercase tracking-widest mb-2">
        {headline}
      </p>
      {sub ? (
        <p className="font-mono text-sm text-fg leading-relaxed mb-1">{sub}</p>
      ) : (
        <p className="font-mono text-sm text-fg leading-relaxed mb-1">
          One email a week on local-first AI, agentic architecture, and what
          is actually working in 2026.
        </p>
      )}
      <p className="font-mono text-xs text-muted leading-relaxed mb-4">
        n8n templates, cost teardowns, and what is actually working in 2026.
        No drip sequences, no upsells. Reply to opt out.
      </p>
      <iframe
        src={SUBSTACK_EMBED_URL}
        title="Subscribe to Local-First AI"
        width="100%"
        height="160"
        style={{ border: 0, background: 'transparent' }}
        scrolling="no"
        loading="lazy"
      />
    </section>
  )
}

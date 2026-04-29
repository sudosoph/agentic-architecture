interface PageHeaderProps {
  title: string
  meta?: string
  description?: string
}

export function PageHeader({ title, meta, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border py-8">
      {meta && (
        <p data-testid="page-header-meta" className="font-mono text-xs text-muted mb-2">
          {meta}
        </p>
      )}
      <h1 className="font-mono text-2xl text-fg">{title}</h1>
      {description && (
        <p data-testid="page-header-description" className="mt-3 text-sm text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

interface PageHeaderProps {
  title: string
  meta?: string
  description?: string
}

export function PageHeader({ title, meta, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border py-10">
      {meta && (
        <p
          data-testid="page-header-meta"
          className="font-mono text-xs font-semibold uppercase tracking-wider text-accent mb-2.5"
        >
          {meta}
        </p>
      )}
      <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-fg">
        {title}
      </h1>
      {description && (
        <p
          data-testid="page-header-description"
          className="mt-3 max-w-2xl text-base text-muted leading-relaxed"
        >
          {description}
        </p>
      )}
    </div>
  )
}

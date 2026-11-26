interface PageHeaderProps {
  title: string
  meta?: string
  description?: string
}

export function PageHeader({ title, meta, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border pb-8 pt-2">
      {meta && (
        <p
          data-testid="page-header-meta"
          className="text-xs font-medium text-muted tabular-nums mb-3"
        >
          {meta}
        </p>
      )}
      <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-[-0.02em] text-fg leading-[1.1]">
        {title}
      </h1>
      {description && (
        <p
          data-testid="page-header-description"
          className="mt-3.5 max-w-2xl text-base sm:text-lg text-muted leading-relaxed"
        >
          {description}
        </p>
      )}
    </div>
  )
}

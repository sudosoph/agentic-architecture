interface PageHeaderProps {
  title: string
  meta?: string
  description?: string
}

export function PageHeader({ title, meta, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border pb-7 pt-1">
      {meta && (
        <p
          data-testid="page-header-meta"
          className="text-xs font-medium text-muted tabular-nums mb-2.5"
        >
          {meta}
        </p>
      )}
      <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-[-0.03em] text-fg leading-[1.1]">
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

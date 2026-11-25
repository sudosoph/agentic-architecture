import { cn } from '@/lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({ interactive, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl',
        interactive && 'hover:border-accent hover:shadow-sm transition-all',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

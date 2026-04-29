import { cn } from '@/lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({ interactive, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border',
        interactive && 'hover:border-accent transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

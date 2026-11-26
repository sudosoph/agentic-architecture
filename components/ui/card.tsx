import { cn } from '@/lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({ interactive, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-md',
        interactive && 'transition-colors duration-150 hover:border-fg/35',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

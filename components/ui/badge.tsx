import { cn } from '@/lib/cn'

type BadgeColor = 'amber' | 'green' | 'red' | 'zinc' | 'blue'
export type BadgeVariant = 'tag' | 'status' | 'online' | 'rig' | 'accent'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  color?: BadgeColor
}

export function Badge({ variant = 'tag', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border rounded-md text-xs font-medium leading-none px-2.5 py-1',
        variant === 'tag' && 'text-muted bg-surface-elevated border-border',
        variant === 'status' && 'text-fg bg-surface border-border',
        variant === 'online' && 'text-fg bg-surface border-fg/20',
        variant === 'rig' && 'text-muted bg-surface border-border',
        variant === 'accent' && 'text-accent bg-surface border-accent/25',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

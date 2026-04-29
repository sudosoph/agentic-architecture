import { cn } from '@/lib/cn'

type BadgeColor = 'amber' | 'green' | 'red' | 'zinc'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: 'tag' | 'status'
  color?: BadgeColor
}

const colorClasses: Record<BadgeColor, string> = {
  amber: 'text-amber-400 border-amber-400/30',
  green: 'text-green-400 border-green-400/30',
  red: 'text-red-400 border-red-400/30',
  zinc: 'text-zinc-400 border-zinc-400/30',
}

export function Badge({ variant, color = 'zinc', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border bg-surface text-xs leading-none px-1.5 py-0.5',
        variant === 'tag' && 'font-mono text-muted border-border',
        variant === 'status' && colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

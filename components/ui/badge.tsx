import { cn } from '@/lib/cn'

type BadgeColor = 'amber' | 'green' | 'red' | 'zinc' | 'blue'
export type BadgeVariant = 'tag' | 'status' | 'online' | 'rig' | 'accent'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant
  color?: BadgeColor
}

const colorClasses: Record<BadgeColor, string> = {
  amber: 'text-amber-700 bg-amber-50 border-amber-200',
  green: 'text-green-700 bg-green-50 border-green-200',
  red: 'text-red-700 bg-red-50 border-red-200',
  zinc: 'text-slate-600 bg-slate-100 border-slate-200',
  blue: 'text-blue-700 bg-blue-50 border-blue-200',
}

export function Badge({ variant, color = 'zinc', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border rounded-full text-xs font-medium leading-none px-2.5 py-1',
        variant === 'tag' && 'font-mono text-muted bg-surface border-border',
        variant === 'status' && colorClasses[color],
        variant === 'online' && 'text-emerald-700 bg-emerald-50 border-emerald-200',
        variant === 'rig' && 'text-amber-700 bg-amber-50 border-amber-200',
        variant === 'accent' && 'text-blue-700 bg-blue-50 border-blue-200',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

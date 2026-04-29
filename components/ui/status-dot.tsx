import { cn } from '@/lib/cn'

type DotState = 'online' | 'pending' | 'offline'

interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  state: DotState
}

const stateClasses: Record<DotState, string> = {
  online: 'bg-green-400 animate-pulse',
  pending: 'bg-amber-400',
  offline: 'bg-zinc-500',
}

export function StatusDot({ state, className, ...props }: StatusDotProps) {
  return (
    <span
      className={cn('inline-block w-2 h-2 rounded-full', stateClasses[state], className)}
      {...props}
    />
  )
}

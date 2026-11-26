import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'press-scale inline-flex items-center justify-center font-sans font-medium rounded-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-fg text-bg hover:opacity-90',
        accent: 'bg-accent text-white hover:opacity-95',
        outline: 'border border-border bg-surface text-fg hover:border-fg/45',
        ghost: 'text-muted bg-transparent hover:text-fg hover:bg-surface-elevated',
      },
      size: {
        sm: 'text-xs px-3.5 py-1.5',
        md: 'text-sm px-4 py-2.5',
        lg: 'text-sm sm:text-base px-5 py-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

export function Button({
  variant,
  size,
  className,
  href,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, className })
  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={props['aria-label']}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    )
  }
  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

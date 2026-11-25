import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-sans font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white shadow-xs hover:bg-blue-700',
        outline:
          'border border-border bg-white text-text hover:border-accent hover:text-accent',
        ghost: 'text-muted bg-transparent hover:text-text hover:bg-surface',
      },
      size: {
        sm: 'text-xs px-3.5 py-1.5',
        md: 'text-sm px-4.5 py-2.5',
        lg: 'text-base px-6 py-3',
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

export function Button({ variant, size, className, href, children, ...props }: ButtonProps) {
  const classes = buttonVariants({ variant, size, className })
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

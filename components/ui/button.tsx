import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-mono transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-black hover:bg-amber-300',
        outline: 'border border-accent text-accent bg-transparent hover:bg-accent hover:text-black',
        ghost: 'text-muted bg-transparent hover:text-fg',
      },
      size: {
        sm: 'text-xs px-3 py-1',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
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

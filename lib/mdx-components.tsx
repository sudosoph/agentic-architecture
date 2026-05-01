import type { MDXComponents } from 'mdx/types'

export function getMDXComponents(): MDXComponents {
  return {
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http')
      return (
        <a
          href={href}
          className="text-accent hover:underline"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props}
        >
          {children}
        </a>
      )
    },
  }
}

import * as React from 'react'
import NextLink from 'next/link'

export type LinkVariant = 'primary' | 'text'

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  variant?: LinkVariant
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')
}

function linkClass(variant: LinkVariant) {
  const base = [
    'font-sans text-base',
    'focus-ring',
    'interactive-transition',
  ]

  if (variant === 'text') {
    return [...base, 'text-foreground hover:text-accent', 'hover:underline underline-offset-4'].join(
      ' ',
    )
  }

  return [
    ...base,
    'inline-flex items-center justify-center',
    'rounded-md px-3 py-2',
    'bg-accent text-canvas',
    'hover:opacity-90 active:opacity-80',
  ].join(' ')
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, variant = 'text', className, ...props },
  ref,
) {
  const classes = [linkClass(variant), className].filter(Boolean).join(' ')

  if (isExternalHref(href)) {
    return <a ref={ref} href={href} className={classes} {...props} />
  }

  return <NextLink ref={ref} href={href} className={classes} {...props} />
})

'use client'

import * as React from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

export type NavLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  pathname?: string
  exact?: boolean
  activeClassName?: string
}

function isPathActive(pathname: string, href: string, exact: boolean) {
  if (exact || href === '/') {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function NavLink({
  href,
  pathname: pathnameOverride,
  exact = false,
  activeClassName = 'text-accent underline',
  className,
  ...props
}: NavLinkProps) {
  const pathnameFromHook = usePathname() ?? ''
  const pathname = pathnameOverride ?? pathnameFromHook
  const isActive = isPathActive(pathname, href, exact)

  const classes = [
    'font-sans text-base',
    'text-foreground hover:text-accent',
    'focus-ring',
    'interactive-transition',
    isActive ? activeClassName : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <NextLink
      href={href}
      className={classes}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    />
  )
}

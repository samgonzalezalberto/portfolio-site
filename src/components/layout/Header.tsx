 'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { GridContainer } from '../ui/GridContainer'

type NavItem = {
  href: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

function navLinkClass(isActive: boolean) {
  return [
    'font-sans text-base',
    'text-foreground hover:text-accent',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    isActive ? 'text-accent underline' : undefined,
  ]
    .filter(Boolean)
    .join(' ')
}

export function Header() {
  const pathname = usePathname()

  return (
    <header>
      <GridContainer className="py-6">
        <nav aria-label="Primary" className="grid grid-cols-swiss items-center">
          <Link href="/" className={['col-span-6', navLinkClass(pathname === '/')].join(' ')}>
            Portfolio
          </Link>
          <div className="col-span-6 flex justify-end gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClass(isActive)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </GridContainer>
    </header>
  )
}

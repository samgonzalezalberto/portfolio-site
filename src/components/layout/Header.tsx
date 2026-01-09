'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import { GridContainer } from '../ui/GridContainer'
import { NavLink } from '../ui/NavLink'
import { MobileMenu } from './MobileMenu'

type NavItem = {
  href: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

type HeaderProps = {
  pathname?: string
  initialIsOpen?: boolean
}

export function Header({ pathname: pathnameOverride, initialIsOpen }: HeaderProps = {}) {
  const pathnameFromHook = usePathname()
  const pathname = pathnameOverride ?? pathnameFromHook
  const [isOpen, setIsOpen] = useState(initialIsOpen ?? false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  function closeMenu() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-40 bg-canvas">
      <GridContainer className="py-gutter">
        <nav aria-label="Primary" className="grid grid-cols-swiss items-center">
          <NavLink href="/" exact pathname={pathname} className="col-span-6">
            Portfolio
          </NavLink>

          <div className="col-span-6 flex justify-end gap-gutter">
            <div className="hidden md:flex justify-end gap-gutter">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} href={item.href} pathname={pathname}>
                  {item.label}
                </NavLink>
              ))}
            </div>

            <button
              ref={triggerRef}
              type="button"
              className="focus-ring interactive-transition md:hidden rounded-md px-2 py-1 text-foreground hover:text-accent"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </nav>
      </GridContainer>

      <MobileMenu isOpen={isOpen} menuId="mobile-menu" onClose={closeMenu}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            pathname={pathname}
            className="text-lg"
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}
      </MobileMenu>
    </header>
  )
}

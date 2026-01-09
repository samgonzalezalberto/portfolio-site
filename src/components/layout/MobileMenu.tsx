'use client'

import * as React from 'react'

type MinimalKeyEvent = {
  key: string
  shiftKey: boolean
  preventDefault: () => void
}

export function trapFocusOnTab({
  event,
  focusables,
  activeElement,
}: {
  event: MinimalKeyEvent
  focusables: Array<{ focus: () => void }>
  activeElement: unknown
}) {
  if (event.key !== 'Tab') return false
  if (focusables.length === 0) return false

  const activeIndex = focusables.indexOf(activeElement as any)
  const lastIndex = focusables.length - 1

  if (event.shiftKey) {
    if (activeIndex <= 0) {
      event.preventDefault()
      focusables[lastIndex]?.focus()
      return true
    }

    return false
  }

  if (activeIndex === -1 || activeIndex >= lastIndex) {
    event.preventDefault()
    focusables[0]?.focus()
    return true
  }

  return false
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return []

  const nodes = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )

  return Array.from(nodes)
}

export type MobileMenuProps = {
  isOpen: boolean
  menuId?: string
  onClose: () => void
  children: React.ReactNode
}

export function MobileMenu({ isOpen, menuId = 'mobile-menu', onClose, children }: MobileMenuProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!isOpen) return

    const focusables = getFocusableElements(containerRef.current)
    if (focusables.length > 0) {
      focusables[0]?.focus()
      return
    }

    containerRef.current?.focus()
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      id={menuId}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-50 bg-canvas"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          onClose()
          return
        }

        if (e.key !== 'Tab') return

        const focusables = getFocusableElements(containerRef.current)
        trapFocusOnTab({
          event: {
            key: e.key,
            shiftKey: e.shiftKey,
            preventDefault: () => e.preventDefault(),
          },
          focusables,
          activeElement: typeof document === 'undefined' ? null : document.activeElement,
        })
      }}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="h-full w-full px-6 py-6"
      >
        <div className="flex items-center justify-between">
          <div className="font-sans text-base text-foreground">Menu</div>
          <button
            type="button"
            className="focus-ring interactive-transition rounded-md px-2 py-1 text-foreground hover:text-accent"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-10 flex flex-col gap-6">
          {children}
        </nav>
      </div>
    </div>
  )
}

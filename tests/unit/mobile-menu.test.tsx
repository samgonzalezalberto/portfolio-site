import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MobileMenu, trapFocusOnTab } from '../../src/components/layout/MobileMenu'

test('MobileMenu renders nothing when closed', () => {
  const html = renderToStaticMarkup(
    <MobileMenu isOpen={false} onClose={() => {}}>
      <a href="/about">About</a>
    </MobileMenu>,
  )

  assert.equal(html, '')
})

test('MobileMenu renders overlay with dialog semantics when open', () => {
  const html = renderToStaticMarkup(
    <MobileMenu isOpen={true} menuId="mobile-menu" onClose={() => {}}>
      <a href="/about">About</a>
    </MobileMenu>,
  )

  assert.match(html, /id="mobile-menu"/)
  assert.match(html, /role="dialog"/)
  assert.match(html, /aria-modal="true"/)
  assert.match(html, />Close</)
})

test('trapFocusOnTab cycles from last to first on Tab', () => {
  let focused: unknown = null

  const focusables = [
    { focus: () => (focused = 0) },
    { focus: () => (focused = 1) },
    { focus: () => (focused = 2) },
  ]

  let prevented = false

  const trapped = trapFocusOnTab({
    event: {
      key: 'Tab',
      shiftKey: false,
      preventDefault: () => {
        prevented = true
      },
    },
    focusables,
    activeElement: focusables[2],
  })

  assert.equal(trapped, true)
  assert.equal(prevented, true)
  assert.equal(focused, 0)
})

test('trapFocusOnTab cycles from first to last on Shift+Tab', () => {
  let focused: unknown = null

  const focusables = [
    { focus: () => (focused = 0) },
    { focus: () => (focused = 1) },
    { focus: () => (focused = 2) },
  ]

  let prevented = false

  const trapped = trapFocusOnTab({
    event: {
      key: 'Tab',
      shiftKey: true,
      preventDefault: () => {
        prevented = true
      },
    },
    focusables,
    activeElement: focusables[0],
  })

  assert.equal(trapped, true)
  assert.equal(prevented, true)
  assert.equal(focused, 2)
})

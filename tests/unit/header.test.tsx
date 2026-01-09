import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Header } from '../../src/components/layout/Header'

test('Header hamburger trigger has correct ARIA attributes when closed', () => {
  const html = renderToStaticMarkup(<Header pathname="/" />)

  assert.match(html, /aria-controls="mobile-menu"/)
  assert.match(html, /aria-expanded="false"/)
})

test('Header sets aria-expanded true when initialIsOpen is true', () => {
  const html = renderToStaticMarkup(<Header pathname="/" initialIsOpen={true} />)

  assert.match(html, /aria-expanded="true"/)
  assert.match(html, /id="mobile-menu"/)
})

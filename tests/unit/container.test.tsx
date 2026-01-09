import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Container } from '../../src/components/ui/Container'

test('Container applies max width and padding defaults', () => {
  const html = renderToStaticMarkup(<Container>Hi</Container>)
  assert.match(html, /<div[^>]*class="[^"]*mx-auto[^"]*"/)
  assert.match(html, /max-w-screen-xl/)
  assert.match(html, /px-gutter/)
})

test('Container merges className', () => {
  const html = renderToStaticMarkup(<Container className="py-6">Hi</Container>)
  assert.match(html, /py-6/)
})

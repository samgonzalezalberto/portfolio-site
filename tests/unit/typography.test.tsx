import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Typography } from '../../src/components/ui/Typography'

test('Typography renders correct tag based on as prop', () => {
  const html = renderToStaticMarkup(<Typography as="h1">Title</Typography>)
  assert.match(html, /^<h1/)
})

test('Typography defaults to <p> for body variant', () => {
  const html = renderToStaticMarkup(<Typography>Body</Typography>)
  assert.match(html, /^<p/)
})

test('Typography renders mono variant as <code>', () => {
  const html = renderToStaticMarkup(<Typography variant="mono">x</Typography>)
  assert.match(html, /^<code/)
  assert.match(html, /font-mono/)
})

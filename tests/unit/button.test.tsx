import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Button } from '../../src/components/ui/Button'

test('Button primary variant applies accent background classes', () => {
  const html = renderToStaticMarkup(<Button variant="primary">Save</Button>)
  assert.match(html, /bg-accent/)
  assert.match(html, /text-canvas/)
})

test('Button text variant applies hover underline classes', () => {
  const html = renderToStaticMarkup(<Button variant="text">More</Button>)
  assert.match(html, /hover:underline/)
  assert.doesNotMatch(html, /bg-accent/)
})

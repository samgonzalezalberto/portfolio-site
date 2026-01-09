import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { TypographicBody, TypographicHeading, TypographicHero } from '../Typography'

test('TypographicHero renders the requested semantic tag', () => {
  const html = renderToStaticMarkup(<TypographicHero as="h2">Title</TypographicHero>)
  assert.match(html, /^<h2/)
})

test('TypographicHeading renders the requested semantic tag', () => {
  const html = renderToStaticMarkup(<TypographicHeading as="p">Heading</TypographicHeading>)
  assert.match(html, /^<p/)
})

test('TypographicBody renders the requested semantic tag', () => {
  const html = renderToStaticMarkup(<TypographicBody as="span">Body</TypographicBody>)
  assert.match(html, /^<span/)
})

test('TypographicHero applies overflow-wrap: break-word via Tailwind utility', () => {
  const html = renderToStaticMarkup(<TypographicHero>VeryLongTitle</TypographicHero>)
  assert.match(html, /break-words/)
})

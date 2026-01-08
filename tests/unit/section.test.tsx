import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Section } from '../../src/components/ui/Section'

test('Section renders semantic <section> and applies vertical padding', () => {
  const html = renderToStaticMarkup(
    <Section>
      <p>Hi</p>
    </Section>,
  )
  assert.match(html, /^<section/)
  assert.match(html, /py-12/)
})

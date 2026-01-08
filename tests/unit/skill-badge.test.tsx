import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { SkillBadge } from '../../src/components/content/SkillBadge'

test('SkillBadge renders label text', () => {
  const html = renderToStaticMarkup(<SkillBadge label="TypeScript" />)
  assert.match(html, /TypeScript/)
})

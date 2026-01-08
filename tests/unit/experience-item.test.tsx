import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ExperienceItem } from '../../src/components/content/ExperienceItem'

test('ExperienceItem renders role, date range, and description', () => {
  const html = renderToStaticMarkup(
    <ExperienceItem
      role="Engineer"
      company="Acme"
      startDate="2021-01"
      endDate="2022-06"
      description="Did stuff"
    />,
  )

  assert.match(html, /Engineer/)
  assert.match(html, /2021-01/)
  assert.match(html, /2022-06/)
  assert.match(html, /Did stuff/)
})

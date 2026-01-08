import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Grid } from '../../src/components/ui/Grid'

test('Grid defaults to 12-column swiss grid', () => {
  const html = renderToStaticMarkup(
    <Grid>
      <div />
    </Grid>,
  )
  assert.match(html, /class="[^"]*grid[^"]*"/)
  assert.match(html, /grid-cols-swiss/)
})

test('Grid applies columns based on cols prop', () => {
  const html = renderToStaticMarkup(
    <Grid cols={3}>
      <div />
    </Grid>,
  )
  assert.match(html, /grid-cols-3/)
})

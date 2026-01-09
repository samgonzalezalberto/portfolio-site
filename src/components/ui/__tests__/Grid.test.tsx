import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Grid, GridItem } from '../Grid'

test('Grid applies expected 12-col compositional grid classes', () => {
  const html = renderToStaticMarkup(
    <Grid>
      <div />
    </Grid>,
  )

  assert.match(html, /class="[^"]*grid[^"]*"/)
  assert.match(html, /grid-cols-swiss/)
  assert.match(html, /gap-gutter/)
})

test('GridItem applies column span classes from props', () => {
  const html = renderToStaticMarkup(
    <Grid>
      <GridItem span={5}>
        <div />
      </GridItem>
    </Grid>,
  )

  assert.match(html, /col-span-5/)
})

import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

async function getNavLink() {
  const mod = await import('../../src/components/ui/NavLink')
  return mod.NavLink
}

test('NavLink applies active styles when pathname matches', async () => {
  const NavLink = await getNavLink()
  const html = renderToStaticMarkup(
    <NavLink href="/projects" pathname="/projects">
      Projects
    </NavLink>,
  )

  assert.match(html, /aria-current="page"/)
  assert.match(html, /text-accent underline/)
})

test('NavLink does not apply active styles when pathname differs', async () => {
  const NavLink = await getNavLink()
  const html = renderToStaticMarkup(
    <NavLink href="/projects" pathname="/about">
      Projects
    </NavLink>,
  )

  assert.doesNotMatch(html, /aria-current="page"/)
  assert.doesNotMatch(html, /text-accent underline/)
})

test('NavLink treats nested routes as active by default', async () => {
  const NavLink = await getNavLink()
  const html = renderToStaticMarkup(
    <NavLink href="/projects" pathname="/projects/task-engine">
      Projects
    </NavLink>,
  )

  assert.match(html, /aria-current="page"/)
})

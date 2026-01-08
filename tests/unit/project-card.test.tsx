import test from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ProjectCard } from '../../src/components/content/ProjectCard'

test('ProjectCard renders title and description', () => {
  const html = renderToStaticMarkup(
    <ProjectCard
      title="My Project"
      description="A short description"
      technologies={['React']}
    />,
  )

  assert.match(html, /My Project/)
  assert.match(html, /A short description/)
})

test('ProjectCard renders Code and Demo links when URLs provided', () => {
  const html = renderToStaticMarkup(
    <ProjectCard
      title="My Project"
      description="A short description"
      technologies={['React']}
      repoUrl="https://example.com/repo"
      liveUrl="https://example.com/demo"
    />,
  )

  assert.match(html, />Code</)
  assert.match(html, /https:\/\/example.com\/repo/)
  assert.match(html, />Demo</)
  assert.match(html, /https:\/\/example.com\/demo/)
})

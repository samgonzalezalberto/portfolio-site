import test from 'node:test'
import assert from 'node:assert/strict'
import { getAllExperiences, getAllProjects } from '../../src/lib/mdx'

test('mdx loader parses projects from src/content/projects', async () => {
  const projects = await getAllProjects()
  assert.ok(projects.length >= 1)

  const first = projects[0]
  assert.equal(typeof first.title, 'string')
  assert.equal(typeof first.description, 'string')
  assert.ok(Array.isArray(first.technologies))
  assert.equal(typeof first.featured, 'boolean')
  assert.match(first.date, /^\d{4}-\d{2}$/)
  assert.equal(typeof first.slug, 'string')
})

test('mdx loader parses experiences from src/content/experience', async () => {
  const experiences = await getAllExperiences()
  assert.ok(experiences.length >= 1)

  const first = experiences[0]
  assert.equal(typeof first.company, 'string')
  assert.equal(typeof first.role, 'string')
  assert.match(first.startDate, /^\d{4}-\d{2}$/)
  assert.equal(typeof first.endDate, 'string')
  assert.equal(typeof first.location, 'string')
  assert.equal(typeof first.description, 'string')
  assert.equal(typeof first.slug, 'string')
})

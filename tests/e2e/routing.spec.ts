import { test, expect } from '@playwright/test'

test('GET / returns 200', async ({ request }) => {
  const res = await request.get('/')
  expect(res.status()).toBe(200)
})

test('GET /about returns 200', async ({ request }) => {
  const res = await request.get('/about')
  expect(res.status()).toBe(200)
})

test('GET /projects returns 200', async ({ request }) => {
  const res = await request.get('/projects')
  expect(res.status()).toBe(200)
})

test('GET /contact returns 200', async ({ request }) => {
  const res = await request.get('/contact')
  expect(res.status()).toBe(200)
})

test('404 Page: unknown routes return 404', async ({ request, page }) => {
  const res = await request.get('/unknown')
  expect(res.status()).toBe(404)

  await page.goto('/unknown')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Not Found')
})

test('Navigation Links: client-side navigation (no full reload)', async ({ page }) => {
  await page.goto('/')

  const before = await page.evaluate(
    () => performance.getEntriesByType('navigation').length,
  )

  await page.getByRole('link', { name: 'About' }).click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('About')

  const after = await page.evaluate(
    () => performance.getEntriesByType('navigation').length,
  )

  expect(after).toBe(before)
})

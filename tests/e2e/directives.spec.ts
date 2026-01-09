import { test, expect } from '@playwright/test'

function getCanonicalHref(html: string): string | null {
  const match = html.match(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/i)
  return match?.[1] ?? null
}

test('D-01: /robots.txt serves directives + sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.status()).toBe(200)

  const body = await res.text()
  expect(body).toMatch(/User-agent:\s*\*/i)
  expect(body).toMatch(/Allow:\s*\//i)
  expect(body).toMatch(/Sitemap:\s*https?:\/\//i)
  expect(body).toMatch(/sitemap\.xml/i)
})

test('D-01: /sitemap.xml serves valid XML with public URLs', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)

  const body = await res.text()
  expect(body).toContain('<?xml')
  expect(body).toContain('<urlset')

  // Public Surface Area
  expect(body).toMatch(/<loc>https?:\/\/[^<]+<\/loc>/)
  expect(body).toContain('/about')
  expect(body).toContain('/contact')
  expect(body).toContain('/projects')
})

test('E-01: unknown route returns 404, has noindex, and no canonical', async ({ request }) => {
  const res = await request.get('/this-page-does-not-exist')
  expect(res.status()).toBe(404)

  const html = await res.text()
  expect(html).toContain('content="noindex"')
  expect(html).not.toContain('rel="canonical"')
})

test('Edge-01: /about/ canonical excludes trailing slash', async ({ page }) => {
  await page.goto('/about/')

  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  expect(canonical).toBeTruthy()
  expect(canonical).toMatch(/\/about$/)
})

test('Edge-02: / canonical matches domain root', async ({ request }) => {
  const res = await request.get('/')
  expect(res.status()).toBe(200)

  const html = await res.text()
  const canonical = getCanonicalHref(html)

  expect(canonical).toBeTruthy()
  expect(canonical).toMatch(/^https?:\/\/[^/]+$/)
})

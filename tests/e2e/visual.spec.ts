import { test, expect } from '@playwright/test'

test('Grid layout: RootLayout persists swiss grid classes', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('nav')).toHaveClass(/grid-cols-swiss/)
  await expect(page.locator('main #page-root')).toHaveClass(/grid-cols-swiss/)
})

test('Typography: H1 exists and uses expected utility classes', async ({ page }) => {
  await page.goto('/projects')

  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toHaveText('Projects')
  await expect(h1).toHaveClass(/text-4xl/)
})

test.describe('Mobile view', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('Shell snapshot: Home (mobile)', async ({ page }) => {
    await page.goto('/')

    const hasNoHorizontalScroll = await page.evaluate(() => {
      const root = document.documentElement
      return root.scrollWidth <= window.innerWidth
    })
    expect(hasNoHorizontalScroll).toBe(true)

    const h1FitsViewport = await page.evaluate(() => {
      const h1 = document.querySelector('h1')
      if (!h1) return true
      const rect = h1.getBoundingClientRect()
      return rect.width <= window.innerWidth
    })
    expect(h1FitsViewport).toBe(true)

    const html = await page.locator('#page-root').innerHTML()
    expect(html).toMatchSnapshot('home.mobile.html')
  })
})

test('Shell snapshot: About', async ({ page }) => {
  await page.goto('/about')

  const html = await page.locator('#page-root').innerHTML()
  expect(html).toMatchSnapshot('about.html')
})

test('Shell snapshot: Projects', async ({ page }) => {
  await page.goto('/projects')

  const html = await page.locator('#page-root').innerHTML()
  expect(html).toMatchSnapshot('projects.html')
})

test('Shell snapshot: Contact', async ({ page }) => {
  await page.goto('/contact')

  const html = await page.locator('#page-root').innerHTML()
  expect(html).toMatchSnapshot('contact.html')
})

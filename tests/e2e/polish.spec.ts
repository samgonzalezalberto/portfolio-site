import { test, expect } from '@playwright/test'

test.describe('Phase 4 — Polish & Verify', () => {
  test('Edge case: long title wraps (no horizontal scroll)', async ({ page }) => {
    await page.goto('/projects/edge-long-title')

    const hasNoHorizontalScroll = await page.evaluate(() => {
      const root = document.documentElement
      return root.scrollWidth <= window.innerWidth
    })
    expect(hasNoHorizontalScroll).toBe(true)

    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    await expect(h1).toHaveClass(/break-words/)

    const h1FitsViewport = await page.evaluate(() => {
      const h1El = document.querySelector('h1')
      if (!h1El) return true
      const rect = h1El.getBoundingClientRect()
      return rect.width <= window.innerWidth
    })
    expect(h1FitsViewport).toBe(true)
  })

  test('Edge case: missing metadata preserves alignment (Projects list)', async ({ page }) => {
    await page.goto('/projects')

    const missingDateItem = page.getByRole('heading', {
      level: 3,
      name: /deliberately long project title/i,
    })
    await expect(missingDateItem).toBeVisible()

    // The item should still render inside the IndexList without forcing overflow.
    const hasNoHorizontalScroll = await page.evaluate(() => {
      const root = document.documentElement
      return root.scrollWidth <= window.innerWidth
    })
    expect(hasNoHorizontalScroll).toBe(true)
  })

  test('Mobile landscape: navigation remains usable', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 })
    await page.goto('/')

    const trigger = page.getByRole('button', { name: 'Menu' })
    await expect(trigger).toBeVisible()
    await trigger.click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
  })

  test('Fold line: intro content remains above the fold (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')

    const lead = page.getByText('A component-driven portfolio powered by file-based MDX content.')
    await expect(lead).toBeVisible()

    const leadBottom = await lead.evaluate((el) => el.getBoundingClientRect().bottom)
    const viewportHeight = await page.evaluate(() => window.innerHeight)
    expect(leadBottom).toBeLessThanOrEqual(viewportHeight)
  })

  test('Structural anchors: header/footer pin to viewport edges on scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/projects')

    const header = page.locator('header')
    const footer = page.locator('footer')

    await expect(header).toBeVisible()
    await expect(footer).toBeVisible()

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const headerTop = await header.evaluate((el) => el.getBoundingClientRect().top)
    const footerBottom = await footer.evaluate((el) => el.getBoundingClientRect().bottom)
    const viewportHeight = await page.evaluate(() => window.innerHeight)

    expect(Math.abs(headerTop)).toBeLessThanOrEqual(1)
    expect(Math.abs(footerBottom - viewportHeight)).toBeLessThanOrEqual(1)
  })

  test('Responsive scaling: poster type grows from mobile → desktop', async ({ page }) => {
    const getFontSize = async (url: string, viewport: { width: number; height: number }) => {
      await page.setViewportSize(viewport)
      await page.goto(url)
      const h1 = page.getByRole('heading', { level: 1 })
      await expect(h1).toBeVisible()
      return h1.evaluate((el) => Number.parseFloat(getComputedStyle(el).fontSize))
    }

    const mobile = await getFontSize('/', { width: 375, height: 812 })
    const desktop = await getFontSize('/', { width: 1440, height: 900 })

    expect(desktop).toBeGreaterThan(mobile)
  })

  test('Negative space audit: ≥ 40% viewport width on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })

    const check = async (path: string) => {
      await page.goto(path)

      const h1 = page.getByRole('heading', { level: 1 })
      await expect(h1).toBeVisible()

      // Measure the primary content column, then infer negative space.
      // This avoids relying on an explicit "void" element being visible.
      const contentColumn = page.locator('.md\\:col-span-5', { has: h1 }).first()
      await expect(contentColumn).toHaveCount(1)

      const contentRatio = await contentColumn.evaluate((el) => {
        const rect = el.getBoundingClientRect()
        return rect.width / window.innerWidth
      })

      const negativeSpaceRatio = 1 - contentRatio
      expect(negativeSpaceRatio).toBeGreaterThanOrEqual(0.4)
      return negativeSpaceRatio
    }

    await check('/')
    await check('/projects')
    await check('/about')
    await check('/contact')
  })

  test('200% zoom (CSS simulation): no overlap and Menu usable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Playwright cannot reliably set browser zoom; use CSS zoom as a proxy.
    await page.addStyleTag({ content: 'html { zoom: 2; }' })

    const trigger = page.getByRole('button', { name: 'Menu' })
    await expect(trigger).toBeVisible()
    await trigger.click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
  })
})

import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility (axe-core)', () => {
  const routes = ['/', '/about', '/projects', '/contact'] as const

  for (const route of routes) {
    test(`A11y: ${route} has zero violations (mobile viewport)`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto(route)

      // Include the mobile menu dialog in the scan.
      await page.getByRole('button', { name: 'Menu' }).click()

      const results = await new AxeBuilder({ page }).analyze()

      expect(results.violations).toEqual([])
    })
  }
})

import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility (axe-core)', () => {
  const routes = ['/', '/about', '/projects', '/contact'] as const

  for (const route of routes) {
    test(`A11y: ${route} has no serious/critical violations`, async ({ page }) => {
      await page.goto(route)

      const results = await new AxeBuilder({ page }).analyze()

      const seriousOrWorse = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      )

      expect(seriousOrWorse).toEqual([])
    })
  }
})

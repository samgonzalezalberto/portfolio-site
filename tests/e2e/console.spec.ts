import { test, expect } from '@playwright/test'

const routes = ['/', '/about', '/projects', '/contact', '/projects/portfolio-site'] as const

for (const route of routes) {
  test(`Console is clean: ${route}`, async ({ page }) => {
    const consoleErrors: string[] = []
    const pageErrors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    page.on('pageerror', (err) => {
      pageErrors.push(String(err))
    })

    await page.goto(route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(250)

    expect(pageErrors).toEqual([])
    expect(consoleErrors).toEqual([])
  })
}

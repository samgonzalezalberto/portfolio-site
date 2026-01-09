import { test, expect } from '@playwright/test'

test.describe('Interaction (navigation + keyboard)', () => {
  test('Skip link is first focusable and moves focus to content', async ({ page }) => {
    await page.goto('/')

    // First Tab should focus the Skip link.
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to Content' })
    await expect(skip).toBeFocused()

    // It should become visible when focused.
    await expect(skip).toBeVisible()

    // Activate and ensure focus lands on the target.
    await page.keyboard.press('Enter')
    await expect(page.locator('#page-root')).toBeFocused()
  })

  test('Mobile menu opens/closes and restores focus (Esc)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const trigger = page.getByRole('button', { name: 'Menu' })
    await expect(trigger).toHaveAttribute('aria-controls', 'mobile-menu')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    const dialog = page.locator('#mobile-menu')
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('role', 'dialog')

    // Focus should move into the menu.
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused()

    // Escape closes and restores focus to trigger.
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('Mobile menu traps focus on Tab', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    await page.getByRole('button', { name: 'Menu' }).click()

    const dialog = page.locator('#mobile-menu')
    await expect(dialog).toBeVisible()

    // Ensure repeated tabbing never leaves the dialog.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab')
      const isInside = await page.evaluate(() => {
        const active = document.activeElement
        const menu = document.getElementById('mobile-menu')
        return Boolean(active && menu && menu.contains(active))
      })

      expect(isInside).toBe(true)
    }
  })

  test('400% zoom (CSS) keeps Menu trigger visible and usable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Simulate zoom via CSS; Playwright cannot reliably set browser zoom.
    await page.addStyleTag({ content: 'html { zoom: 4; }' })

    const trigger = page.getByRole('button', { name: 'Menu' })
    await expect(trigger).toBeVisible()

    await trigger.click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
  })
})

import { test, expect } from '@playwright/test';

test.describe('Context Engineering Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the game interface', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Context Engineering Game');
    await expect(page.locator('h2').filter({ hasText: 'Select Scenario' })).toBeVisible();
  });

  test('should display task selector with all scenarios', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: 'Real-time Customer Service' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Financial Analysis' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Code Review Assistant' })).toBeVisible();
  });

  test('should switch between scenarios', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'Financial Analysis' }).click();
    await expect(page.locator('text=Deep portfolio analysis')).toBeVisible();

    await page.locator('button').filter({ hasText: 'Code Review Assistant' }).click();
    await expect(page.locator('text=Review pull requests')).toBeVisible();
  });

  test('should display available items palette', async ({ page }) => {
    const palette = page.locator('h2').filter({ hasText: 'Available Items' });
    await expect(palette).toBeVisible();

    const itemCount = await page.locator('[class*="bg-anthro"]').count();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('should display context window', async ({ page }) => {
    const contextWindow = page.locator('h2').filter({ hasText: 'Context Window' });
    await expect(contextWindow).toBeVisible();
  });

  test('should add items to context window by clicking', async ({ page }) => {
    const firstItem = page.locator('[class*="bg-anthro"]').first();
    const itemName = await firstItem.locator('div.font-medium').textContent();

    await firstItem.click();

    const contextWindowArea = page.locator('text=Your selected context').locator('..');
    await expect(contextWindowArea.locator(`text=${itemName}`)).toBeVisible();
  });

  test('should display metrics panel', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: 'Performance Metrics' })).toBeVisible();
    await expect(page.locator('text=Tokens')).toBeVisible();
    await expect(page.locator('text=Est. Cost')).toBeVisible();
    await expect(page.locator('text=Est. Latency')).toBeVisible();
    await expect(page.locator('text=Cache Rate')).toBeVisible();
    await expect(page.locator('text=Accuracy')).toBeVisible();
  });

  test('should update metrics when adding items', async ({ page }) => {
    const tokensBeforeText = await page.locator('text=Tokens').locator('..').locator('div.text-xl').textContent();

    const firstItem = page.locator('[class*="bg-anthro"]').first();
    await firstItem.click();

    await page.waitForTimeout(100);

    const tokensAfterText = await page.locator('text=Tokens').locator('..').locator('div.text-xl').textContent();
    expect(tokensAfterText).not.toBe(tokensBeforeText);
  });

  test('should display feedback panel', async ({ page }) => {
    await expect(page.locator('h2').filter({ hasText: 'AI Feedback & Analysis' })).toBeVisible();
  });

  test('should show feedback when items are added', async ({ page }) => {
    const items = page.locator('[class*="bg-anthro"]');
    const itemCount = await items.count();

    for (let i = 0; i < Math.min(3, itemCount); i++) {
      await items.nth(i).click();
      await page.waitForTimeout(50);
    }

    const feedbackItems = page.locator('[class*="border-l-4"]');
    const feedbackCount = await feedbackItems.count();
    expect(feedbackCount).toBeGreaterThan(0);
  });

  test('should take screenshot of initial state', async ({ page }) => {
    await page.screenshot({ path: 'test-results/screenshot-initial.png', fullPage: true });
  });

  test('should take screenshot with context', async ({ page }) => {
    const items = page.locator('[class*="bg-anthro"]');
    const itemCount = await items.count();

    for (let i = 0; i < Math.min(5, itemCount); i++) {
      await items.nth(i).click();
      await page.waitForTimeout(50);
    }

    await page.screenshot({ path: 'test-results/screenshot-with-context.png', fullPage: true });
  });

  test('should remove items from context window', async ({ page }) => {
    const firstItem = page.locator('[class*="bg-anthro"]').first();
    await firstItem.click();

    await page.waitForTimeout(100);

    const contextItem = page.locator('text=Your selected context').locator('..').locator('[class*="bg-anthro"]').first();
    await contextItem.hover();

    const removeButton = contextItem.locator('button[title="Remove from context"]');
    await removeButton.click();

    await page.waitForTimeout(100);

    const remainingItems = await page.locator('text=Your selected context').locator('..').locator('[class*="bg-anthro"]').count();
    expect(remainingItems).toBe(0);
  });

  test('should show different color coded items', async ({ page }) => {
    const blueItems = await page.locator('.bg-anthro-blue').count();
    const tealItems = await page.locator('.bg-anthro-teal').count();
    const orangeItems = await page.locator('.bg-anthro-orange').count();
    const purpleItems = await page.locator('.bg-anthro-purple').count();

    expect(blueItems + tealItems + orangeItems + purpleItems).toBeGreaterThan(0);
  });
});

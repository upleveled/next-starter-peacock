import { expect, test } from '@playwright/test';

test('Navigate and check content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Works' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Articles' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Notes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(
    page.locator('div:has-text("WorksArticlesNotesAbout") a').nth(4),
  ).toBeVisible();
  await expect(page.locator('h1')).toContainText('Senior Software Engineer');

  await page.getByRole('link', { name: 'Works' }).click();
  await page.waitForURL('/works');
  await expect(page).toHaveTitle('Selected Works | NextJS Starter Peacock');
  await expect(page.locator('h1')).toContainText('Selected Works');

  await page.getByRole('link', { name: 'Articles' }).click();
  await page.waitForURL('/articles');
  await expect(page).toHaveTitle('Articles | NextJS Starter Peacock');
  await expect(page.locator('h1')).toContainText('Articles');

  await page.getByRole('link', { name: 'Notes' }).click();
  await page.waitForURL('/notes');
  await expect(page).toHaveTitle('Notes | NextJS Starter Peacock');
  await expect(page.locator('h1')).toContainText('Notes');

  await page.getByRole('link', { name: 'About' }).click();
  await page.waitForURL('/about');
  await expect(page).toHaveTitle('About Me | Peacock');
  await expect(page.getByRole('heading')).toContainText('About Me 🧘🏾‍♂️');
  await expect(
    await page
      .locator('div:has-text("WorksArticlesNotesAbout") a')
      .nth(4)
      .getAttribute('href'),
  ).toContain('/rss.xml');
});

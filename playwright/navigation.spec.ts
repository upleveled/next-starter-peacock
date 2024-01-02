import { expect, test } from '@playwright/test';

test('Navigate and check content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('workPageLink')).toBeVisible();
  await expect(page.getByTestId('articlesPageLink')).toBeVisible();
  await expect(page.getByTestId('notesPageLink')).toBeVisible();
  await expect(page.getByTestId('aboutPageLink')).toBeVisible();
  await expect(page.getByTestId('rssPageLink')).toBeVisible();
  await expect(page.getByTestId('pageTitle')).toHaveText(
    'Senior Software Engineer',
  );

  await page.getByTestId('workPageLink').click();
  await page.waitForURL('/works');
  await expect(page).toHaveTitle('Selected Works | NextJS Starter Peacock');
  await expect(page.getByTestId('pageTitle')).toHaveText('Selected Works');

  await page.getByTestId('articlesPageLink').click();
  await page.waitForURL('/articles');
  await expect(page).toHaveTitle('Articles | NextJS Starter Peacock');
  await expect(page.getByTestId('pageTitle')).toHaveText('Articles');

  await page.getByTestId('notesPageLink').click();
  await page.waitForURL('/notes');
  await expect(page).toHaveTitle('Notes | NextJS Starter Peacock');
  await expect(page.getByTestId('pageTitle')).toHaveText('Notes');

  await page.getByTestId('aboutPageLink').click();
  await page.waitForURL('/about');
  await expect(page).toHaveTitle('About Me | Peacock');
  await expect(page.getByTestId('pageTitle')).toHaveText('About Me 🧘🏾‍♂️');
  await expect(
    await page.locator('[data-test-id="rssPageLink"]').getAttribute('href'),
  ).toContain('/rss.xml');
});

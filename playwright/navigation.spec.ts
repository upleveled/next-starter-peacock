import { expect, test } from '@playwright/test';

test('Navigate and check content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('articlesPageLink')).toBeVisible();
  await expect(page.getByTestId('notesPageLink')).toBeVisible();
  await expect(page.getByTestId('aboutPageLink')).toBeVisible();
  await expect(page.getByTestId('rssPageLink')).toBeVisible();
  await expect(page.getByTestId('pageTitle')).toHaveText(
    'NextJS Starter Peacock',
  );

  await page.getByTestId('workPageLink').click();
  await page.waitForURL('/works');
  await expect(page.getByTestId('pageTitle')).toHaveText('Works & Projects');

  await page.getByTestId('articlesPageLink').click();
  await page.waitForURL('/articles');
  await expect(page.getByTestId('pageTitle')).toHaveText('Articles');

  await page.getByTestId('notesPageLink').click();
  await page.waitForURL('/notes');
  await expect(page.getByTestId('pageTitle')).toHaveText('Notes');

  await page.getByTestId('aboutPageLink').click();
  await page.waitForURL('/about');
  await expect(page.getByTestId('pageTitle')).toHaveText('About Me🧘🏾‍♂️');
  const rssLink = await page.locator('[data-test-id="rssPageLink"] a');
  await expect(rssLink).toBeVisible();
  await expect(rssLink.getAttribute('href')).toContain('/rss.xml');
});

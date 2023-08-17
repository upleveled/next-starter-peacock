import { expect, test } from '@playwright/test';

test('Can find the different components in the app', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('homePageTitle')).toContainText(
    'NextJS Starter Peacock',
  );
  await expect(page.getByTestId('articlesPageLink')).toBeVisible();
  await expect(page.getByTestId('notesPageLink')).toBeVisible();
  await expect(page.getByTestId('aboutPageLink')).toBeVisible();
  await expect(page.getByTestId('rssPageLink')).toBeVisible();

  await Promise.all([
    page.getByTestId('workPageLink').click(),
    page.waitForNavigation(),
  ]);
  await expect(page.getByTestId('pageTitle')).toHaveText('Works & Projects');

  await Promise.all([
    page.getByTestId('articlesPageLink').click(),
    page.waitForNavigation(),
  ]);
  await expect(page.url()).toContain('/articles');
  await expect(page.getByTestId('pageTitle')).toHaveText('Articles');

  await Promise.all([
    page.getByTestId('notesPageLink').click(),
    page.waitForNavigation(),
  ]);
  await expect(page.url()).toContain('/notes');
  await expect(page.getByTestId('pageTitle')).toHaveText('Notes');

  await page.getByTestId('aboutPageLink').click();

  await expect(page.url()).toContain('/about');
  await expect(page.locator('h1')).toHaveText('About Me🧘🏾‍♂️');

  const rssLink = await page.locator('[data-test-id="rssPageLink"] a');
  await expect(rssLink).toBeVisible();
  const rssHref = await rssLink.getAttribute('href');
  await expect(rssHref).toContain('/rss.xml');
});

const { test, expect } = require('@playwright/test');
for (const view of ['home', 'economy', 'employment', 'democracy', 'audit', 'methods']) {
  test(`${view}: renders without browser errors or missing local resources`, async ({ page, request }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`/?view=${view}`);
    await expect(page.locator('#app')).not.toBeEmpty();
    expect(await page.locator('body').evaluate(el => el.scrollWidth <= innerWidth)).toBeTruthy();
    for (const href of await page.locator('a[href]').evaluateAll(links => links.map(a => a.getAttribute('href')))) {
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      const response = await request.get(new URL(href, page.url()).href);
      expect(response.ok(), href).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
}
test('category navigation and browser history restore the selected view', async ({ page }) => {
  await page.goto('/');
  await page.locator('.cat').first().click();
  await expect(page).toHaveURL(/view=economy/);
  await page.goBack();
  await expect(page.locator('.hero')).toBeVisible();
  await page.goForward();
  await expect(page.locator('.eco-six')).toBeVisible();
});
test('economy evidence explorer renders', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/economy-evidence.html');
  await expect(page.locator('h1')).toBeVisible();
  expect(errors).toEqual([]);
});

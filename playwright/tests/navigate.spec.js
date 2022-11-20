import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.locator('h1')).toHaveText(
    'Get new delicious recipes every day',
  );

  await page.goto(' http://localhost:3000/login');
  const userinput = page.locator('[data-test-id^="username"]');
  expect(userinput).toHaveAttribute('placeholder', 'Username');
  await userinput.type('test');

  const passwordinput = page.locator('[data-test-id^="password"]');
  expect(passwordinput).toHaveAttribute('placeholder', 'Password');
  await userinput.type('test');

  await page.locator('[data-test-id^="login"]').click();
  await page.goto('http://localhost:3000/private-profile');

  await page.goto('http://localhost:3000/recipes');

  await expect(page.locator('h1')).toHaveText(
    'Find Your Recipes By Ingredients',
  );
  await expect(page.locator('h2')).toHaveText(
    'You wish to have in your recipe',
  );

  expect(page.locator(`img[alt="Pad Thai Recipe"] >> nth=0`));
});

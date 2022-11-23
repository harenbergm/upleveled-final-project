import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.locator('h1')).toHaveText('Nasch');

  // test login
  await page.goto(' http://localhost:3000/login');
  const userinput = page.locator('[data-test-id^="username"]');
  expect(userinput).toHaveAttribute('placeholder', 'Username');
  await userinput.type('test');

  const passwordinput = page.locator('[data-test-id^="password"]');
  expect(passwordinput).toHaveAttribute('placeholder', 'Password');
  await userinput.type('test');

  await page.locator('[data-test-id^="login"]').click();
  await await page.goto('http://localhost:3000/private-profile');
  //

  await page.goto('http://localhost:3000/recipes');

  await expect(page.locator('h1')).toHaveText(
    'Find Delicoius Recipes Everyday',
  );
  await expect(page.locator('h2')).toHaveText('And Share Yours With Others');

  expect(page.locator(`img[alt="Pad Thai Recipe"] >> nth=0`));

  await page.goto(' http://localhost:3000//recipes/1');

  expect(page.locator(`[data-test-id^="ingredients"]`)).toHaveText(
    `Almond Meal ,Almond ,Amaranth ,`,
  );
});

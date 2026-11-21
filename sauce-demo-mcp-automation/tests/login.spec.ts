
import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

test('TC01 - successful login', async ({ page }) => {
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});

test('TC02 - invalid credentials', async () => {
  await loginPage.login('invalid_user', 'invalid_password');

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toContainText(
    'Username and password do not match',
  );
});

test('TC03 - locked-out user', async () => {
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toContainText(
    'Sorry, this user has been locked out',
  );
});

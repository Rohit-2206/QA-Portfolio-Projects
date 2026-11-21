import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

const backpackName = 'Sauce Labs Backpack';

let productsPage: ProductsPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  cartPage = new CartPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('TC09 - verify product in cart', async ({ page }) => {
  await productsPage.addProductToCart(backpackName);
  await page.goto('/cart.html');

  await expect(cartPage.getCartHeading()).toBeVisible();
  await expect(cartPage.getCartItemNames()).toHaveText([backpackName]);
});

test('TC10 - verify cart quantity and price', async ({ page }) => {
  await productsPage.addProductToCart(backpackName);
  await page.goto('/cart.html');

  await expect(cartPage.getCartQuantity()).toHaveText('1');
  await expect(cartPage.getCartItemPrices()).toHaveText('$29.99');
});

test('TC11 - remove product from cart', async ({ page }) => {
  await productsPage.addProductToCart(backpackName);
  await page.goto('/cart.html');

  await cartPage.removeProduct(backpackName);

  await expect(cartPage.getCartItems()).toHaveCount(0);
});

test('TC12 - continue shopping', async ({ page }) => {
  await productsPage.addProductToCart(backpackName);
  await page.goto('/cart.html');

  await cartPage.continueShopping();

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(productsPage.getPageHeading()).toBeVisible();
});
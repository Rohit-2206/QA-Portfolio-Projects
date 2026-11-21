import { expect, Page, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

const backpackName = 'Sauce Labs Backpack';
const firstName = 'Rohit';
const lastName = 'Chandrasekar';
const postalCode = '600001';

let productsPage: ProductsPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('TC13 - checkout required-field validation', async ({ page }) => {
  await navigateToCheckout(page, productsPage, cartPage);
  await checkoutPage.continueToOverview();

  await expect(checkoutPage.getErrorMessage()).toBeVisible();
  await expect(checkoutPage.getErrorMessage()).toContainText('First Name is required');
});

test('TC14 - submit checkout information', async ({ page }) => {
  await navigateToCheckout(page, productsPage, cartPage);
  await enterCheckoutInformation(checkoutPage);

  await expect(checkoutPage.getOverviewHeading()).toBeVisible();
});

test('TC15 - verify order summary', async ({ page }) => {
  await navigateToCheckout(page, productsPage, cartPage);
  await enterCheckoutInformation(checkoutPage);

  await expect(checkoutPage.getSummarySubtotal()).toContainText('$29.99');
  await expect(checkoutPage.getSummaryTax()).toContainText('$2.40');
  await expect(checkoutPage.getSummaryTotal()).toContainText('$32.39');
});

test('TC16 - cancel checkout', async ({ page }) => {
  await navigateToCheckout(page, productsPage, cartPage);
  await enterCheckoutInformation(checkoutPage);
  await checkoutPage.cancelCheckout();

  await expect(page).toHaveURL(/\/inventory\.html$/);
});

test('TC17 - complete order', async ({ page }) => {
  await navigateToCheckout(page, productsPage, cartPage);
  await enterCheckoutInformation(checkoutPage);
  await checkoutPage.finishOrder();

  await expect(checkoutPage.getCompleteHeading()).toHaveText('Thank you for your order!');
  await expect(checkoutPage.getCompleteMessage()).toBeVisible();
});

async function navigateToCheckout(
  page: Page,
  productsPage: ProductsPage,
  cartPage: CartPage,
): Promise<void> {
  await productsPage.addProductToCart(backpackName);
  await page.goto('/cart.html');
  await cartPage.checkout();
}

async function enterCheckoutInformation(checkoutPage: CheckoutPage): Promise<void> {
  await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
  await checkoutPage.continueToOverview();
}
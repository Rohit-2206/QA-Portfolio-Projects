import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

const backpackName = 'Sauce Labs Backpack';

let productsPage: ProductsPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('TC04 - verify inventory products', async () => {
  await expect(productsPage.getPageHeading()).toBeVisible();
  await expect(productsPage.getProductItems()).toHaveCount(6);
});

test('TC05 - sort products by price low to high', async () => {
  await productsPage.sortProducts('lohi');

  await expectPricesSorted(productsPage, 'ascending');
});

test('TC06 - sort products by price high to low', async () => {
  await productsPage.sortProducts('hilo');

  await expectPricesSorted(productsPage, 'descending');
});

test('TC07 - add a product to cart', async () => {
  await productsPage.addProductToCart(backpackName);

  await expect(productsPage.getCartBadge()).toHaveText('1');
});

test('TC08 - product button changes after adding to cart', async () => {
  await productsPage.addProductToCart(backpackName);

  await expect(productsPage.getProductRemoveButton(backpackName)).toBeVisible();
});

async function expectPricesSorted(
  page: ProductsPage,
  order: 'ascending' | 'descending',
): Promise<void> {
  await expect
    .poll(async () => {
      const displayedPrices = await page.getProductPrices().allTextContents();
      const prices = displayedPrices.map((price) => Number(price.replace('$', '')));
      const sortedPrices = [...prices].sort((left, right) =>
        order === 'ascending' ? left - right : right - left,
      );

      return (
        prices.length > 0 &&
        prices.every((price, index) => Number.isFinite(price) && price === sortedPrices[index])
      );
    })
    .toBe(true);
}
import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  getPageHeading(): Locator {
    return this.page.getByText('Products', { exact: true });
  }

  getProductItems(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  getProductNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  getProductPrices(): Locator {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.getProductCard(productName)
      .getByRole('button', { name: 'Add to cart', exact: true })
      .click();
  }

  getCartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  getProductRemoveButton(productName: string): Locator {
    return this.getProductCard(productName).getByRole('button', {
      name: 'Remove',
      exact: true,
    });
  }

  private getProductCard(productName: string): Locator {
    return this.getProductItems().filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }
}

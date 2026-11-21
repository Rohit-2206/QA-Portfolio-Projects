import { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  getCartHeading(): Locator {
    return this.page.getByText('Your Cart', { exact: true });
  }

  getCartItems(): Locator {
    return this.page.locator('[data-test="inventory-item"]');
  }

  getCartItemNames(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  getCartItemPrices(): Locator {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  async removeProduct(productName: string): Promise<void> {
    await this.getCartItem(productName)
      .getByRole('button', { name: 'Remove', exact: true })
      .click();
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping', exact: true }).click();
  }

  async checkout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout', exact: true }).click();
  }

  getCartQuantity(): Locator {
    return this.page.locator('[data-test="item-quantity"]');
  }

  private getCartItem(productName: string): Locator {
    return this.getCartItems().filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }
}

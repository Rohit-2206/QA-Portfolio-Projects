import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  getFirstNameInput(): Locator {
    return this.page.locator('[data-test="firstName"]');
  }

  getLastNameInput(): Locator {
    return this.page.locator('[data-test="lastName"]');
  }

  getPostalCodeInput(): Locator {
    return this.page.locator('[data-test="postalCode"]');
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.getFirstNameInput().fill(firstName);
    await this.getLastNameInput().fill(lastName);
    await this.getPostalCodeInput().fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.page.locator('[data-test="continue"]').click();
  }

  getErrorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  getOverviewHeading(): Locator {
    return this.page.getByText('Checkout: Overview', { exact: true });
  }

  getSummarySubtotal(): Locator {
    return this.page.locator('[data-test="subtotal-label"]');
  }

  getSummaryTax(): Locator {
    return this.page.locator('[data-test="tax-label"]');
  }

  getSummaryTotal(): Locator {
    return this.page.locator('[data-test="total-label"]');
  }

  async finishOrder(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
  }

  async cancelCheckout(): Promise<void> {
    await this.page.locator('[data-test="cancel"]').click();
  }

  getCompleteHeading(): Locator {
    return this.page.locator('[data-test="complete-header"]');
  }

  getCompleteMessage(): Locator {
    return this.page.locator('[data-test="complete-text"]');
  }
}

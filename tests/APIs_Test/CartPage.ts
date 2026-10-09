import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    private readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartButton = page.locator("[routerlink*='cart']");
    }

    async openCart(): Promise<void> {
        await this.cartButton.click();
    }

    productRow(productName: string): Locator {
        return this.page
            .locator("div.cartSection h3")
            .filter({ hasText: productName });
    }

    async expectProductVisibility(productName: string): Promise<void> {
        await expect(
            this.productRow(productName),
            `Expected "${productName}" to be visible in the cart`
        ).toBeVisible();
    }
    
    async expectCartCount(count: number): Promise<void> {
    await expect(this.cartButton).toContainText(count.toString());
}
}
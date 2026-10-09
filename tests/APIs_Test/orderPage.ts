import { Locator, Page, expect } from "@playwright/test";

export class OrderPage {
    readonly page: Page;
    private readonly ordersLink: Locator;
    private readonly cartLink: Locator;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersLink = page.locator("[routerlink*='myorders']");
        this.cartLink = page.locator("[routerlink*='cart']");
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    }

    async openOrders(): Promise<void> {
        await this.ordersLink.click();
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    private orderRow(orderId: string): Locator {
        return this.page.locator("tr").filter({ hasText: orderId });
    }

    async getOrderId(): Promise<string> {
        const orderId = await this.page
            .locator("tbody tr")
            .first()
            .locator("th")
            .innerText();

        return orderId.trim();
    }

    async clickView(orderId: string): Promise<void> {
        const row = this.orderRow(orderId);

        await row.getByRole("button", { name: "View" }).click();
    }

    async expectOrderId(orderId: string): Promise<void> {
        await expect(
            this.page.locator(".col-text.-main"),
            `Expected Order ID "${orderId}" to be visible`
        ).toContainText(orderId);
    }
    
    async checkout(): Promise<void> {
    await this.checkoutButton.click();
}
}
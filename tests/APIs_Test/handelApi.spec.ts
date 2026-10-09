import { test, expect } from "@playwright/test";
import {AuthApi} from "./AuthApi";
import { TokenHelper } from "./TokenHelper";
import testData from "./TestData/data.json";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { OrderPage } from "./orderPage";
import { PaymentMethod } from "./Payment";
import { CheckOrder } from "./orderHistory";



test.describe("Login and Add Products", () => {

    for (const user of testData) {

        test(`Login test - ${user.status} - ${user.userEmail}`, async ({ page }) =>  {

            const authApi = await AuthApi.create();

            if (user.status === "invalid") {

                await expect(
                    authApi.login({
                        userEmail: user.userEmail,
                        userPassword: user.userPassword
                    })
                ).rejects.toThrow();

            }

            if (user.status === "valid") {

                const token = await authApi.login({
                    userEmail: user.userEmail,
                    userPassword: user.userPassword
                });

                await TokenHelper.inject(page, token);

                await page.goto("https://rahulshettyacademy.com/client");

                const products = user.products;
                const dashboardPage = new DashboardPage(page);

                for (const product of products) {

                      await dashboardPage.addProductToCart(product);
                }

                const cartPage = new CartPage(page);
                await cartPage.expectCartCount(products.length);

                await cartPage.openCart();

                for (const product of products) {
                await cartPage.expectProductVisibility(product);
}
               const orderPage = new OrderPage(page);

                await orderPage.openOrders();

                const orderId = await orderPage.getOrderId();

                await orderPage.clickView(orderId);

                 await orderPage.expectOrderId(orderId);

                 await orderPage.openCart();
                 
                 await orderPage.checkout();

                 const payment= new PaymentMethod(page)
                 await payment.pay()

                 const check = new CheckOrder(page);
                 await check.ClickDownload();

            }

            

            await authApi.dispose();
        });
    }
});
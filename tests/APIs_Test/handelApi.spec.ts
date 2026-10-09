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

    // Loop through all users in the test data
    for (const user of testData) {

        test(`Login test - ${user.status} - ${user.userEmail}`, async ({ page }) =>  {

            // Create API context for authentication
            const authApi = await AuthApi.create();

            // Handle invalid login scenario
            if (user.status === "invalid") {

                // Invalid credentials are expected to reject the login request
                await expect(
                    authApi.login({
                        userEmail: user.userEmail,
                        userPassword: user.userPassword
                    })
                ).rejects.toThrow();

            }

            // Handle valid login scenario
            if (user.status === "valid") {

                // Login through API and get the authentication token
                const token = await authApi.login({
                    userEmail: user.userEmail,
                    userPassword: user.userPassword
                });

                // Inject the token into the browser localStorage
                await TokenHelper.inject(page, token);

                // Open the application
                await page.goto("https://rahulshettyacademy.com/client");

                const products = user.products;

                // Add products to the cart
                const dashboardPage = new DashboardPage(page);

                for (const product of products) {
                    await dashboardPage.addProductToCart(product);
                }

                // Validate cart contents
                const cartPage = new CartPage(page);

                // Verify the number of products in the cart
                await cartPage.expectCartCount(products.length);

                // Open the cart
                await cartPage.openCart();

                // Verify that all expected products are visible in the cart
                for (const product of products) {
                    await cartPage.expectProductVisibility(product);
                }

                // Handle order history
                const orderPage = new OrderPage(page);

                // Open orders page
                await orderPage.openOrders();

                // Get the generated order ID
                const orderId = await orderPage.getOrderId();

                // Open the order details
                await orderPage.clickView(orderId);

                // Verify the order ID
                await orderPage.expectOrderId(orderId);

                // Return to the cart
                await orderPage.openCart();
                 
                // Proceed to checkout
                await orderPage.checkout();

                // Fill payment details and place the order
                const payment= new PaymentMethod(page);
                await payment.pay();

                // Verify the order confirmation
                const check = new CheckOrder(page);
                await check.ClickDownload();

            }

            // Dispose the API context after the test
            await authApi.dispose();
        });
    }
});

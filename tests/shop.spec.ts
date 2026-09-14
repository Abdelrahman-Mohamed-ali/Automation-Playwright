import  { test , expect , Page} from "@playwright/test";
import { BasePageAc } from "./BasePageAcademy";
import { ShopPage } from "./ShopPage";

test.use({
    launchOptions: { slowMo: 1200 },
});


test("Should add specific product to cart successfully" , async ({ page }) => {

const search = new ShopPage(page)
await search.open()

await search.openShop()
await expect(page.locator("a").filter({ hasText: "Checkout" })).toContainText("Checkout ( 2 )");


}  
)
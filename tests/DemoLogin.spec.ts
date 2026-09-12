import { SwagPage } from "./SwagPage";
import { LoginPage } from "./loginPage";
import { test , expect } from "@playwright/test";

test.use({
    launchOptions: { slowMo: 1200 },
});

test("User can login successfully" , async ({page})=>
{
const login = new LoginPage (page) 

await login.open()
await login.fillLoginData()

await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
await expect(page.getByText("Swag Labs")).toBeVisible();
//test AI new Skill

})

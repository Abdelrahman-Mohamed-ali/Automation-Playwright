import {test ,expect,Page } from "@playwright/test";
import { BasicPage } from "./BasicPage"; 
import { RegisterPage } from "./RegisterPage";
import { loginPage } from "./LoginPage";
import { addProduct } from "./AddProduct";
import { PaymentMethod } from "./Payment";
import { CheckOrder } from "./OrderPage";

test.use({
    launchOptions: { slowMo: 500 },
});

test("Should register, login, add a product to cart and complete checkout successfully", async({ page }) =>
    {
const registerPage = new RegisterPage(page)
await registerPage.open()
await registerPage.register()

await expect(
    page.getByText("Account Created Successfully")
).toBeVisible()

const login = new loginPage(page) 
await login.Login()


const link=new RegisterPage(page)
await link.openLink()


const product = new addProduct(page)
await product.addToProduct()


const payment= new PaymentMethod(page)
await payment.pay()
 

const order=new CheckOrder(page)
await order.ClickDownload()
 


})
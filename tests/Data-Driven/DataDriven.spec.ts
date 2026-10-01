import {test ,expect,Page } from "@playwright/test";
import { BasicPage } from "./BasicPage"; 
import { loginPage } from "./LoginPage";
import { addProduct} from "./AddProduct";
import { PaymentMethod } from "./Payment";
import { CheckOrder } from "./OrderPage";
import LoginData from "./Test-Data/login-data.json"
import Products from "./Test-Data/Product.json"
import Creditcard from "./Test-Data/Checkout.json"

test.use({
    launchOptions: { slowMo: 100 },
});



for (const user of LoginData){
test( `User login - ${user.Email} , add a product to cart and complete checkout successfully` , async({ page }) => 
    {

const login = new loginPage(page) 
await login.openPage()
await login.Login(user.Email,user.Password)

switch(user.expectedResult)
{
    case "success":
        await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
        console.log(Products[0].productName)
       
        const add = new addProduct (page)
        await add.addToProduct(Products[0].productName)

        const checkout=new addProduct(page)
        await checkout.goToCheckout()

        const pay = new PaymentMethod(page)
        await pay.pay()

        const check = new CheckOrder(page)
        await check.ClickDownload()
       break 

     case "incorect email or password" :
        await expect(page.getByText(/Incorrect email or password/i)).toBeVisible();
        break

        case "*Password is required":
        await expect(page.getByText("*Password is required")).toBeVisible();
        break

        case "*Email is required & *Password is required ":
        await expect(page.getByText("*Email is required")).toBeVisible();    
        await expect(page.getByText("*Password is required")).toBeVisible();
        break

}








})
}
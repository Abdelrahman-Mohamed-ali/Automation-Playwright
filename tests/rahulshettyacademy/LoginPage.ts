import { Page , Locator } from "@playwright/test";
import { user } from "./TestData";

export class loginPage 
{
    readonly LoginEmail    :Locator
    readonly LoginPassword :Locator
    readonly LoginButton   :Locator
constructor (readonly page :Page)
{
this.LoginEmail=page.getByPlaceholder("email@example.com")
this.LoginPassword=page.locator("#userPassword")
this.LoginButton=page.getByRole('button', {name:"Login"})

}
async Login() :Promise <void> 
{
    await this.LoginButton.click()
    await this.LoginEmail.fill(user.email)
    await this.LoginPassword.fill(user.password)
    await this.LoginButton.click()
}
}
import { Page , Locator } from "@playwright/test";
import LoginData from "./Test-Data/login-data.json";
import { BasicPage } from "./BasicPage";

export class loginPage extends BasicPage
{
    readonly LoginEmail    :Locator
    readonly LoginPassword :Locator
    readonly LoginButton   :Locator

constructor (readonly page :Page)
{
    super(page)
this.LoginEmail=page.getByPlaceholder("email@example.com")
this.LoginPassword=page.locator("#userPassword")
this.LoginButton=page.getByRole('button', {name:"Login"})

}


async openPage() : Promise<void> {
        
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
        
    }

    

async Login(email :string , password :string) :Promise <void> 

{
    await this.LoginEmail.fill(email)
    await this.LoginPassword.fill(password)
    await this.LoginButton.click()
}

}
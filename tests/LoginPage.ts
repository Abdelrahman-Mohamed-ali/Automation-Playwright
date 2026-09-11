import { SwagPage } from "./SwagPage";
import { Locator, Page } from "@playwright/test";


export class LoginPage extends SwagPage {

    readonly loginButton : Locator
    readonly username    : Locator
    readonly password    :Locator

    constructor (readonly page :Page)
    {
        super(page)
        this.loginButton = this.page.getByRole('button',{name:'Login'})
        this.username    = this.page.getByPlaceholder("Username")
        this.password    = this.page.getByPlaceholder("Password")
    }

    override async open(): Promise<void> 
    {
        await this.page.goto("https://www.saucedemo.com/")
        await this.username.waitFor()
        await this.password.waitFor()
        
        //await this.page.getByPlaceholder("Username").waitFor()
        //await this.page.getByPlaceholder("Password").waitFor()
        //await this.page.getByRole('button', {name:'login'})
        
    }

    async fillLoginData():Promise<void>
    {
       // await this.page.getByPlaceholder("Username").fill("standard_user")
       // await this.page.getByPlaceholder("Password").fill("secret_sauce")
       // await this.page.getByRole('button', {name:'login'}).click()
       
       await this.username.fill("standard_user")
       await this.password.fill("secret_sauce")
       await this.loginButton.click()


    }
}
import { Page , Locator , expect} from "@playwright/test";

export class addProduct 
{
    readonly addTocart  : Locator
    readonly cartLink   : Locator
    readonly checkout   : Locator


    constructor(readonly page:Page)
    {
     this.addTocart= page.locator(".card").filter({hasText :"ZARA COAT 3"}).getByRole('button', {name:" Add To Cart"})
     this.cartLink=  page.locator('button[routerlink="/dashboard/cart"]')
     this.checkout = page.getByRole('button', {name:"Checkout"})
    }

    async addToProduct ():Promise<void> 
    {
        await this.addTocart.click()
        await expect(this.cartLink).toContainText("  Cart 1")
        await this.cartLink.click()
        await this.checkout.click()

    }
}
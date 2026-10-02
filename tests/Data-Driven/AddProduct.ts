import { Page , Locator , expect} from "@playwright/test";
import Products from "./Test-Data/Product.json"

export class addProduct 
{
    
    readonly cartLink   : Locator
    readonly checkout   : Locator
    


    constructor(readonly page:Page )
    {
         
     
     this.cartLink=  page.locator('button[routerlink="/dashboard/cart"]')
     this.checkout = page.getByRole('button', {name:"Checkout"})
     
    }

async isProductAvailable(ProductName: string): Promise<boolean> {

    const product = this.page
        .locator(".card")
        .filter({ hasText: ProductName.trim() });

    return await product.count() > 0;
}

    async addToProduct(ProductName: string): Promise<void> {
    const addTocart = this.page
        .locator(".card")
        .filter({ hasText: ProductName.trim() })
        .getByRole("button", { name: /Add To Cart/i });

    await addTocart.click();
    await expect(this.cartLink).toContainText("  Cart 1")
}

    async goToCheckout () :Promise <void>

    {
        await this.cartLink.click()
        await this.checkout.click()
    }
}
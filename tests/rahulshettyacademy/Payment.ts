import { Page , Locator } from "@playwright/test";
import { user } from "./TestData";


export class PaymentMethod
 {
   readonly creditCard  : Locator 
   readonly expiryMonth : Locator
   readonly  expiryYear  : Locator
   readonly cvvCode     : Locator
   readonly nameCard    : Locator
   //readonly ApplyCoupon : Locator
   readonly SelectCountry : Locator
   readonly PlaceOrderLink  :Locator
   readonly userEmail: Locator
readonly countrySuggestions: Locator
    constructor(readonly page:Page)
    {
     this.creditCard=   page.locator('.field').filter({hasText:"Credit Card Number "}).locator('input')
     
this.countrySuggestions = page.locator('.ta-results .ta-item')
    this.expiryMonth = page
    .locator('.field.small')
    .filter({ hasText: 'Expiry Date' })
    .locator('select')
    .nth(0)

this.expiryYear = page
    .locator('.field.small')
    .filter({ hasText: 'Expiry Date' })
    .locator('select')
    .nth(1)
     
 this.cvvCode = page
    .locator('.field.small')
    .filter({
        has: page.locator('.title').filter({ hasText: 'CVV Code' })
    })
    .locator('input')

this.nameCard = page
    .locator('.field')
    .filter({
        has: page.locator('.title').filter({ hasText: 'Name on Card' })
    })
    .locator('input')

   this.userEmail = page.locator('.user_name input')

     this.SelectCountry = page.getByPlaceholder("Select Country")
      this.PlaceOrderLink = page.locator('a.action__submit');
    
    }

    async pay():Promise<void>
    {

    await this.creditCard.fill("4542 9931 9292 2200")
    await this.expiryMonth.selectOption("02")
    await this.expiryYear.selectOption("22")
    await this.cvvCode.fill("165")
    await this.nameCard.fill("Abdelrahman Mohammed")
   
    await this.SelectCountry.click()

await this.SelectCountry.pressSequentially("Egypt", { delay: 80 })

const suggestion = this.countrySuggestions
    .getByText("Egypt", { exact: true })
    .first()

await suggestion.waitFor({ state: 'visible' })

await suggestion.click()

      
      await this.PlaceOrderLink.click()
 
    }

 }
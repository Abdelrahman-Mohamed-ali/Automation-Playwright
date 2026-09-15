import { BasePageAc } from "./BasePageAcademy";
import { Locator , Page  } from "@playwright/test";



export class ShopPage extends BasePageAc {
 
    readonly NameFiled       : Locator
    readonly EmailFiled      : Locator
    readonly Password        : Locator
    readonly Checkbox        : Locator
    readonly Gender        : Locator
    readonly RadioButton     : Locator
    readonly DataPicker      : Locator
    readonly SubmitButton    : Locator
    readonly ShopLink        : Locator
    readonly CardIphone      : Locator
    readonly CardNokia       : Locator
    readonly Checkbutton     :Locator



    constructor (page :Page)
    {
        super(page)

        this.NameFiled =page.locator("div.form-group").filter({hasText : "Name"}).locator('input[name="name"]')
        this.EmailFiled =page.locator('input[name="email"]')
        this.Password =page.getByPlaceholder("Password")
        this.Checkbox=page.getByLabel("Check me out if you Love IceCreams!")
        this.Gender =page.getByLabel("Gender")
        this.RadioButton=page.getByLabel("Student")
        this.DataPicker =page.locator('input[name="bday"]')
        this.SubmitButton=page.getByRole('button' , {name:"Submit"})
        this.ShopLink=page.getByRole('link' , {name :"Shop"} )

        this.CardIphone=page.locator("app-card").filter({hasText : "iphone X"})
        .getByRole('button' , {name:"Add"})
        this.CardNokia=page.locator("app-card").filter({hasText : "Nokia Edge"})
        .getByRole('button' , {name:"Add"})

        this.Checkbutton=page.getByRole("button" , {name:"Checkout ( 0 )"})



    }

   override async open(): Promise<void> 
    {
    
    await this.page.goto("https://rahulshettyacademy.com/angularpractice/")
   
    }

    async Fill() : Promise<void>
    {
        await this.NameFiled.fill("Abdelrahman Mohammed")
        await this.EmailFiled.fill("test@gmail.com")
        await this.Password.fill("Pass@1234#")
        await this.Checkbox.click()
        await this.Gender.selectOption("Male")
        await this.RadioButton.click()
        await this.DataPicker.fill("1996-05-12")
        await this.SubmitButton.click()
       
    }

    async openShop() : Promise<void> 
    {
        await this.ShopLink.click()
        await this.CardIphone.click()
        await this.CardNokia.click()
    }
}
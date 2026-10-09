import { BasicPage } from "./BasicPage"; 
import { user } from "./TestData";
import { Page , Locator , expect} from "@playwright/test";

export class RegisterPage extends BasicPage {

readonly RegisterLink :Locator
readonly FristName : Locator
readonly LastName :Locator
readonly Email : Locator
readonly PhoneNumber :Locator
readonly Occupation : Locator
readonly Gender : Locator 
readonly Password : Locator
readonly ConfirmPassword :Locator
readonly ageCheckbox : Locator
readonly RegisterButton :Locator
readonly LoginButton : Locator
readonly bannerLink: Locator



    constructor(readonly page: Page )
    {
        super( page )
        this.RegisterLink = page.getByRole('link',{name:"Register"})
        this.FristName= page.getByPlaceholder("First Name")
        this.LastName=page.getByPlaceholder("Last Name")
        this.Email=page.getByPlaceholder("email@example.com")
        this.PhoneNumber=page.getByPlaceholder("enter your number")
        this.Occupation= page.locator('select[formcontrolname="occupation"]');
        this.Gender=page.locator('input[type="radio"][value="Male"]')
        this.Password= page.locator('#userPassword')
        this.ConfirmPassword=page.getByPlaceholder("Confirm Passsword")
        this.ageCheckbox=page.getByRole('checkbox')
        this.RegisterButton=page.getByRole('button', {name:"Register"})
        this.LoginButton=page.getByRole('button' , {name:"Login"})
        this.bannerLink=page.getByRole('link', {name:/ QA Career Accelerator/})
    }

   override async open() : Promise<void> {
        
await this.page.goto("https://rahulshettyacademy.com/client")
        
    }

    async register() :Promise <void>
    {
        await this.RegisterLink.click()
        await this.FristName.fill("Abdelrahman")
        await this.LastName.fill("Mohammed Ali")
        await this.Email.fill(user.email)
        await this.PhoneNumber.fill("1122073838")
        await this.Occupation.selectOption({ label: "Engineer" });
        await this.Gender.check()
        await this.Password.fill(user.password)
        await this.ConfirmPassword.fill(user.password)
        await this.ageCheckbox.click()
        await this.RegisterButton.click()
        
}
async openLink():Promise<void>
{
    const [newPage] = await Promise.all([
    this.page.waitForEvent('popup'),
    this.bannerLink.click()
])
 await newPage.waitForLoadState()
console.log("New Page URL:", newPage.url())
await expect(newPage.getByRole('link', {name:"Sign Up" , exact: true})).toBeVisible()


await newPage.close()
//await this.page.bringToFront()

}

}
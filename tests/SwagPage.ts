import{Page} from "@playwright/test"

 export class SwagPage {
    constructor(readonly page : Page)
    {
      
    }
    async open(): Promise<void>
      {
        await this.page .goto("https://www.saucedemo.com/")
      }
}

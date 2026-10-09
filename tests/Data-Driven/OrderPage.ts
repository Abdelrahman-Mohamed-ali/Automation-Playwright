import { Page , Locator,expect } from "@playwright/test";


export class CheckOrder
{
readonly DownloadOrder : Locator

constructor(readonly page:Page)
{
this.DownloadOrder=page.getByRole('button',{name:"Click To Download Order Details in CSV"})

}

async ClickDownload () :Promise<void>
{
     await expect(this.page.getByText(" Thankyou for the order. ")).toBeVisible()
     await this.DownloadOrder.click()
}
}
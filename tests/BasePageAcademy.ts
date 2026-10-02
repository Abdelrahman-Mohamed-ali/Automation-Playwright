import { Page } from "@playwright/test";


export class BasePageAc {
constructor(readonly page:Page)
{

}
async open() :Promise<void>
{
    await this.page.goto("https://rahulshettyacademy.com/angularpractice/")
}
}
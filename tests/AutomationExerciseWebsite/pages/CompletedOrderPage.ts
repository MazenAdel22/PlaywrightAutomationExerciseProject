import { test, expect, type Locator, type Page } from '@playwright/test';

export class CompletedOrderPage {

    // Locators //

    readonly page: Page;
    readonly completedOrderTitle: Locator;
    readonly completedOrderSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completedOrderTitle = page.locator("h2[class='title text-center'] b");
        this.completedOrderSuccessMessage = page.locator("div[class='col-sm-9 col-sm-offset-1'] p");
    }

    // Methods //

    async verifyCompletedOrderTitle(expectedTitle: string) {
        await test.step('Verify completed order title', async () => {
            await expect(this.completedOrderTitle).toHaveText(expectedTitle);
        });
    }

    async verifyCompletedOrderSuccessMessage(expectedSuccessMessage: string) {
        await test.step('Verify completed order success message', async () => {
            await expect(this.completedOrderSuccessMessage).toHaveText(expectedSuccessMessage);
        });
    }

}
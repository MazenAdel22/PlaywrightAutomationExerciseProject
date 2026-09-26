import { test, expect, type Locator, type Page } from '@playwright/test';

export class CategoryProductsPage {

    // Locators //

    readonly page: Page;
    readonly categoryProductsHeader: Locator;
    readonly categoryProductsCards: Locator;
    readonly categoryProductsNames: Locator;


    constructor(page: Page) {
        this.page = page;
        this.categoryProductsHeader = page.getByRole('heading', { name: 'Women - Tops Products' })
        this.categoryProductsCards = page.locator('.productinfo.text-center');
        this.categoryProductsNames = page.locator('.productinfo.text-center p');
    }

    // Methods //

    async verifyCategoryProductsHeader(expectedText: string) {
        await test.step('Verify category products header', async () => {
            await expect(this.categoryProductsHeader).toHaveText(expectedText);
        });
    }

    async verifyProductsExist(productName: string) {
        await test.step(`Verify all category products contain "${productName}"`, async () => {
            const productNames = await this.categoryProductsNames.allTextContents();

            for (const name of productNames) {
                expect(name).toContain(productName);
            }
        });
    }

    async verifyProductsCount(expectedCount: number) {
        await test.step(`Verify category products count is ${expectedCount}`, async () => {
            await expect(await this.categoryProductsCards).toHaveCount(expectedCount);
        });
    }

}
import { test, expect, type Locator, type Page } from '@playwright/test';

export class BrandProductsPage {

    // Locators //

    readonly page: Page;
    readonly brandProductsHeader: Locator;
    readonly brandProductsCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.brandProductsHeader = page.locator('h2.title.text-center');
        this.brandProductsCards = page.locator('.product-image-wrapper');
    }

    // Methods //

    async verifyBrandProductsHeader(expectedText: string) {
        await test.step('Verify brand products header', async () => {
            await expect(this.brandProductsHeader).toHaveText(expectedText);
        });
    }

    async getProduct(productName: string): Promise<Locator> {
        return await this.brandProductsCards.filter({ hasText: productName });
    }

    async getProductName(productName: string): Promise<Locator> {
        return await this.brandProductsCards.filter({ has: this.page.locator('p', { hasText: productName }) });
    }

    async viewProductDetails(productName: string) {
        await test.step(`View product details for "${productName}"`, async () => {
            await (await this.getProduct(productName)).getByRole('link', { name: 'View Product' }).click();
        });
    }

    async verifyProductsExist(productName: string) {
        await test.step(`Verify "${productName}" exists in brand products`, async () => {
            await expect(await this.getProductName(productName)).toContainText(productName);
        });
    }

    async verifyProductsCount(expectedCount: number) {
        await test.step(`Verify brand products count is ${expectedCount}`, async () => {
            await expect(await this.brandProductsCards).toHaveCount(expectedCount);
        });
    }
}
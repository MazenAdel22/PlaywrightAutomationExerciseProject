import { test, expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {

    // Locators //
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchedProducts: Locator;
    readonly searchProductsHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchedProducts = page.locator('.productinfo.text-center p');
        this.searchProductsHeader = page.locator(".title.text-center");
    }

    // Methods //

    async searchProduct(productName: string) {
        await test.step(`Search for "${productName}"`, async () => {
            await this.searchInput.fill(productName);
            await this.searchButton.click();
        });
    }

    async verifySearchedProductsHeader(expectedText: string) {
        await test.step('Verify searched products header', async () => {
            expect(await this.searchProductsHeader).toHaveText(expectedText);
        });
    }

    async getSearchedProductsNames(): Promise<string[]> {
        const productNames = await this.searchedProducts.allTextContents();
        return productNames;
    }

    async getSearchedProductsCount(): Promise<number> {
            const productCount = await this.searchedProducts.count();
            return productCount;
    }

    async verifySearchedProductsNames(expectedProductName: string) {
        await test.step(`Verify searched products names contains ${expectedProductName}`, async () => {
            for (const searchedProductName of await this.getSearchedProductsNames()) {
                expect(searchedProductName).toContain(expectedProductName);
            }
        });
    }

    async verifySearchedProductsCount(expectedCount: number) {
        await test.step(`Verify searched products count is ${expectedCount}`, async () => {
            expect(await this.getSearchedProductsCount()).toBe(expectedCount);
        });
    }

}
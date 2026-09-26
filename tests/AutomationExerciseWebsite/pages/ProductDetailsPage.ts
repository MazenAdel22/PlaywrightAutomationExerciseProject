import { test, expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {

    // Locators //

    readonly page: Page;
    readonly productName: Locator;
    readonly productCategoryPath: Locator;
    readonly productPrice: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator;
    readonly reviewTextInput: Locator;
    readonly reviewSubmitButton: Locator;
    readonly reviewSuccessMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator("div[class='product-information'] h2");
        this.productCategoryPath = page.locator('.product-information p').filter({ hasText: 'Category:' });
        this.productPrice = page.locator('.product-information > span > span').first();
        this.productAvailability = page.locator('p').filter({ hasText: 'Availability:' });
        this.productCondition = page.locator('p').filter({ hasText: 'Condition:' });
        this.productBrand = page.locator('p').filter({ hasText: 'Brand:' });
        this.reviewNameInput = page.locator('#name')
        this.reviewEmailInput = page.locator('#email')
        this.reviewTextInput = page.locator('#review')
        this.reviewSubmitButton = page.locator('#button-review');
        this.reviewSuccessMessage = page.locator("div[class='alert-success alert'] span");
    }

    // Methods //

    async getActualProductName(): Promise<string> {
        return await this.productName.innerText();
    }

    async getActualCategory(): Promise<string> {
        return (await this.productCategoryPath.innerText()).split(':')[1].trim();
    }

    async getActualPrice(): Promise<number> {
        return Number((await this.productPrice.innerText()).replace('Rs.', '').trim());
    }

    async getActualAvailability(): Promise<string> {
        return (await this.productAvailability.innerText()).split(':')[1].trim();
    }

    async getActualCondition(): Promise<string> {
        return (await this.productCondition.innerText()).split(':')[1].trim();
    }

    async getActualBrand(): Promise<string> {
        return (await this.productBrand.innerText()).split(':')[1].trim();
    }

    async submitReview(name: string, email: string, reviewText: string) {
        await test.step('Submit product review', async () => {
            await this.reviewNameInput.fill(name);
            await this.reviewEmailInput.fill(email);
            await this.reviewTextInput.fill(reviewText);
            await this.reviewSubmitButton.click();
        });
    }

    async verifyProductDetails(expectedName: string, expectedCategory: string, expectedPrice: number, expectedAvailability: string, expectedCondition: string, expectedBrand: string) {
        const actualProductName = await this.getActualProductName();
        await test.step(`Verify these product details : "${actualProductName}" `, async () => {
            await expect(await this.getActualProductName()).toBe(expectedName);
            await expect(await this.getActualCategory()).toBe(expectedCategory);
            await expect(await this.getActualPrice()).toBe(expectedPrice);
            await expect(await this.getActualAvailability()).toBe(expectedAvailability);
            await expect(await this.getActualCondition()).toBe(expectedCondition);
            await expect(await this.getActualBrand()).toBe(expectedBrand);
        });
    }

}
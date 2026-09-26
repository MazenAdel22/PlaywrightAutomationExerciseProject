import { test, expect, type Locator, type Page } from '@playwright/test';

export class HomePage {

    // Locators //

    readonly page: Page;
    readonly productsButton: Locator;
    readonly contactUsButton: Locator;
    readonly signUpLoginButton: Locator;
    readonly cartButton: Locator;
    readonly deleteAccountButton: Locator;
    readonly loggedInAsText: Locator;
    readonly featuredProductsTitle: Locator;
    readonly featuredProducts: Locator;
    readonly recommendedProducts: Locator;
    readonly subscriptionTitle: Locator;
    readonly subscriptionInput: Locator;
    readonly subscriptionButton: Locator;
    readonly subscriptionSuccessMessage: Locator;
    readonly womanCategoryButton: Locator;
    readonly sareeSubCategoryButton: Locator;
    readonly HMBrandCategoryButton: Locator;
    readonly productCardsWithWrapper: Locator;
    readonly productCards: Locator;
    readonly addedToCartSucessMessage: Locator;
    readonly continueShoppingButton: Locator;
    readonly continueButton: Locator;
    readonly deletedAccountSuccessMessage: Locator;
    readonly recommendedProductsTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsButton = page.locator('a[href="/products"]');
        this.contactUsButton = page.locator('a[href="/contact_us"]');
        this.signUpLoginButton = page.locator('a[href="/login"]');
        this.cartButton = page.getByText('Cart', { exact: true });
        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
        this.loggedInAsText = page.locator('b');
        this.featuredProductsTitle = page.locator("div[class='features_items'] h2[class='title text-center']")
        this.featuredProducts = page.locator('.features_items .productinfo.text-center p');
        this.recommendedProducts = page.locator('.recommended_items .productinfo.text-center p');
        this.subscriptionTitle = page.locator("div[class='single-widget'] h2");
        this.subscriptionInput = page.locator('#susbscribe_email');
        this.subscriptionButton = page.locator('#subscribe');
        this.subscriptionSuccessMessage = page.locator('.alert-success');
        this.womanCategoryButton = page.locator("(//h4[@class='panel-title'])[1]");
        this.sareeSubCategoryButton = page.locator("a[href='/category_products/7']");
        this.HMBrandCategoryButton = page.locator("//a[@href='/brand_products/H&M']")
        this.productCardsWithWrapper = page.locator(".product-image-wrapper");
        this.productCards = page.locator(".productinfo.text-center");
        this.addedToCartSucessMessage = page.locator('p').filter({ hasText: 'Your product has been added to cart.' });
        this.continueShoppingButton = page.locator(".btn.btn-success.close-modal.btn-block");
        this.continueButton = page.locator("//a[@data-qa='continue-button']");
        this.deletedAccountSuccessMessage = page.locator("h2[class='title text-center'] b");
        this.recommendedProductsTitle = page.locator("div[class='recommended_items'] h2[class='title text-center']");
    }

    // Methods //

    async openHomePage() {
        await test.step('open home page', async () => {
            await this.page.goto('');
        });
    }

    async navigateToProductsPage() {
        await test.step('Open products page', async () => {
            await this.productsButton.click();
        });
    }

    async clickContactUsButton() {
        await test.step('Open contact us page', async () => {
            await this.contactUsButton.click();
        });
    }

    async navigateToSignUpLoginPage() {
        await test.step('Open sign up and login page', async () => {
            await this.signUpLoginButton.click();
        });
    }

    async navigateToCartPage() {
        await test.step('Open cart page', async () => {
            await this.cartButton.click();
        });
    }

    async clickDeleteAccountButton() {
        await test.step('Delete user account', async () => {
            await this.deleteAccountButton.click();
        });
    }

    async clickContiuneButton() {
        await test.step('click contiune button to go back to home page', async () => {
            await this.continueButton.click();
        });
    }

    async openWomanCategory() {
        await test.step('Open Women category', async () => {
            await this.womanCategoryButton.click();
        });
    }

    async openSareeSubCategory() {
        await test.step('Open saree sub-category', async () => {
            await this.sareeSubCategoryButton.click();
        });
    }

    async openHMBrandCategory() {
        await test.step('Open H&M brand products', async () => {
            await this.HMBrandCategoryButton.click();
        });
    }

    async getProductNameWithWrapper(productName: string): Promise<Locator> {
        return this.productCardsWithWrapper.filter({ has: this.page.locator('p', { hasText: productName }) });
    }

    async getProductName(productName: string): Promise<Locator> {
        return this.productCards.filter({ has: this.page.locator('p', { hasText: productName }) });
    }

    async addProductToCart(productName: string) {
        await test.step(`Add "${productName}" to cart`, async () => {
            await (await this.getProductName(productName)).locator('a', { hasText: 'Add to cart' }).click();
        });
    }

    async viewProductDetails(productName: string) {
        await test.step(`View "${productName}" product details`, async () => {
            await (await this.getProductNameWithWrapper(productName)).locator('a', { hasText: 'View Product' }).click();
        });
    }

    async closeAdIfVisible() {
        await test.step('Close Google ad if visible', async () => {
            const timeout = 2000;
            const startTime = Date.now();

            while (Date.now() - startTime < timeout) {
                for (const frame of this.page.frames()) {
                    if (!frame.url().includes('googleads.g.doubleclick.net')) {
                        continue;
                    }

                    const closeAdButton = frame.getByText('Close', { exact: true });

                    if (await closeAdButton.isVisible().catch(() => false)) {
                        await closeAdButton.click();
                        return;
                    }
                }

                await this.page.waitForTimeout(200);
            }
        });
    }

    async continueShopping() {
        await test.step('Continue shopping', async () => {
            await this.continueShoppingButton.click();
        });
    }

    async enterSubscriptionData(email: string) {
        await test.step('Subscribe with email address', async () => {
            await this.subscriptionInput.fill(email);
            await this.subscriptionButton.click();
        });
    }

    async verifyFeaturedProductsTitle(expectedText: string) {
        await test.step('Verify featured products title', async () => {
            await expect(this.featuredProductsTitle).toHaveText(expectedText);
        });
    }

    async verifyRecommendedProductsTitle(expectedText: string) {
        await test.step('Verify recommended products title', async () => {
            await expect(this.recommendedProductsTitle).toHaveText(expectedText);
        });
    }

    async verifyLoggedInUsername(expectedText: string) {
        await test.step('Verify logged-in username', async () => {
            await expect(this.loggedInAsText).toHaveText(expectedText);
        });
    }

    async verifyHomePageTitle(expectedTitle: string) {
        await test.step('Verify home page title', async () => {
            await expect(this.page).toHaveTitle(expectedTitle);
        });
    }

    async verifyFeaturedProductsCount(expectedCount: number) {
        await test.step(`Verify featured products count is ${expectedCount}`, async () => {
            await expect(this.featuredProducts).toHaveCount(expectedCount);
        });
    }

    async verifyRecommendedProductsCount(expectedCount: number) {
        await test.step(`Verify recommended products count is ${expectedCount}`, async () => {
            await expect(this.recommendedProducts).toHaveCount(expectedCount);
        });
    }

    async verifyFeaturedProductsName(featuredProductName: string) {
        await test.step(`Verify featured products contain "${featuredProductName}"`, async () => {
            await expect(this.featuredProducts.filter({ hasText: featuredProductName }).first()).toBeVisible();
        });
    };

    async verifyRecommendedProductsName(recommendedProductName: string) {
        await test.step(`Verify recommended product contain "${recommendedProductName}"`, async () => {
            await expect(this.recommendedProducts.filter({ hasText: recommendedProductName }).first()).toBeVisible();
        });
    }

    async verifySubscriptionTitle(expectedText: string) {
        await test.step('Verify subscription title', async () => {
            await expect(this.subscriptionTitle).toHaveText(expectedText);
        });
    }

    async verifySubscriptionSuccessMessage(expectedText: string) {
        await test.step('Verify subscription success message', async () => {
            await expect(this.subscriptionSuccessMessage).toHaveText(expectedText);
        });
    }

    async verifyAddedToCartSuccessMessage(expectedText: string) {
        await test.step('Verify product added to cart success message', async () => {
            await expect(this.addedToCartSucessMessage).toHaveText(expectedText);
        });
    }

    async verifyAccountIsDeleted(expectedText: string) {
        await test.step('Verify account is deleted', async () => {
            await expect(this.deletedAccountSuccessMessage).toHaveText(expectedText);
        });
    }

}
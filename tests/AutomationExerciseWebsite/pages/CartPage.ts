import { test, expect, type Locator, type Page } from '@playwright/test';
import type { Products } from '../utils/TestData/products';

export class CartPage {

    // Locators //

    readonly page: Page;
    readonly cartRows: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.checkoutButton = page.getByText('Proceed To Checkout', { exact: true });
    }

    // Methods //

    async getProductRow(productName: string): Promise<Locator> {
        return this.cartRows.filter({ has: this.page.locator('.cart_description h4 a', { hasText: productName }) });
    }

    async getProductName(productName: string): Promise<string> {
        return await (await this.getProductRow(productName)).locator('.cart_description h4 a').innerText();
    }

    async getProductPrice(productName: string): Promise<number> {
        const price = await (await this.getProductRow(productName)).locator('.cart_price p').innerText();
        return Number(price.replace('Rs.', '').trim());
    }

    async getProductQuantity(productName: string): Promise<number> {
        const quantity = await (await this.getProductRow(productName)).locator('.cart_quantity button').innerText();
        return Number(quantity.trim());
    }

    async getProductTotal(productName: string): Promise<number> {
        const total = await (await this.getProductRow(productName)).locator('.cart_total_price').innerText();
        return Number(total.replace('Rs.', '').trim());
    }

    async verifyEachProductInCart(product: Products) {
        await test.step(`Verify "${product.name}" details in cart`, async () => {
            await expect(await this.getProductName(product.name)).toBe(product.name);
            await expect(await this.getProductPrice(product.name)).toBe(product.price);
            await expect(await this.getProductQuantity(product.name)).toBe(product.quantity);
            await expect(await this.getProductTotal(product.name)).toBe(product.price * product.quantity);
        });
    }

    async verifyAllProductsQuantityAndPriceInCart(products: Products[]) {
        await test.step('Verify all products in cart', async () => {
            for (const product of products) {
                await this.verifyEachProductInCart(product);
            }
        });
    }

    async removeProduct(productName: string) {
        await test.step(`Remove "${productName}" from cart`, async () => {
            await (await this.getProductRow(productName)).locator('.cart_quantity_delete').click();
        });
    }

    async proceedToCheckout() {
        await test.step('Proceed to checkout', async () => {
            await this.checkoutButton.click();
        });
    }

}


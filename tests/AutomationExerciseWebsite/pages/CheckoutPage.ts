import { test, expect, type Locator, type Page } from '@playwright/test';
import type { Products } from '../utils/TestData/products';

export class CheckoutPage {

    // Locators //

    readonly page: Page;
    readonly DeliveryHeader: Locator;
    readonly BillingHeader: Locator;
    readonly DeliveryUserName: Locator;
    readonly DeliveryUserCompany: Locator;
    readonly DeliveryUserCity: Locator;
    readonly DeliveryUserCountry: Locator;
    readonly DeliveryUserPhoneNumber: Locator;
    readonly BillingUserName: Locator;
    readonly BillingUserCompany: Locator;
    readonly BillingUserCity: Locator;
    readonly BillingUserCountry: Locator;
    readonly BillingUserPhoneNumber: Locator;
    readonly checkoutRows: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.DeliveryHeader = page.locator("ul[id='address_delivery'] h3[class='page-subheading']");
        this.BillingHeader = page.locator("ul[id='address_invoice'] h3[class='page-subheading']");
        this.DeliveryUserName = page.locator("ul[id='address_delivery'] li[class='address_firstname address_lastname']");
        this.DeliveryUserCompany = page.locator('#address_delivery .address_address1').nth(0);
        this.DeliveryUserCity = page.locator('#address_delivery .address_address1').nth(1);
        this.DeliveryUserCountry = page.locator("ul[id='address_delivery'] li[class='address_country_name']");
        this.DeliveryUserPhoneNumber = page.locator("ul[id='address_delivery'] li[class='address_phone']");
        this.BillingUserName = page.locator("ul[id='address_invoice'] li[class='address_firstname address_lastname']");
        this.BillingUserCompany = page.locator('#address_invoice .address_address1').nth(0);
        this.BillingUserCity = page.locator('#address_invoice .address_address1').nth(1);
        this.BillingUserCountry = page.locator("ul[id='address_invoice'] li[class='address_country_name']");
        this.BillingUserPhoneNumber = page.locator("ul[id='address_invoice'] li[class='address_phone']");
        this.checkoutRows = page.locator('.table.table-condensed tbody tr');
        this.placeOrderButton = page.locator(".btn.btn-default.check_out");
    }

    // Methods //

    async verifyDeliveryAddress(expectedTitle: string, expectedName: string, expectedCompany: string, expectedCity: string, expectedCountry: string, expectedPhoneNumber: Number) {
        await test.step('Verify delivery address details', async () => {
            await expect(this.DeliveryHeader).toHaveText(expectedTitle);
            await expect(this.DeliveryUserName).toHaveText(expectedName);
            await expect(this.DeliveryUserCompany).toHaveText(expectedCompany);
            await expect(this.DeliveryUserCity).toHaveText(expectedCity);
            await expect(this.DeliveryUserCountry).toHaveText(expectedCountry);
            await expect(Number(await this.DeliveryUserPhoneNumber.innerText())).toBe(expectedPhoneNumber);
        });
    }

    async verifyBillingAddress(expectedTitle: string, expectedName: string, expectedCompany: string, expectedCity: string, expectedCountry: string, expectedPhoneNumber: Number) {
        await test.step('Verify billing address details', async () => {
            await expect(this.BillingHeader).toHaveText(expectedTitle);
            await expect(this.BillingUserName).toHaveText(expectedName);
            await expect(this.BillingUserCompany).toHaveText(expectedCompany);
            await expect(this.BillingUserCity).toHaveText(expectedCity);
            await expect(this.BillingUserCountry).toHaveText(expectedCountry);
            await expect(Number(await this.BillingUserPhoneNumber.innerText())).toBe(expectedPhoneNumber);
        });
    }

    async verifyProductsQuantityAndPriceInCheckout(excludedProductName: string, products: Products[]) {
        await test.step('Verify products and total amount in checkout', async () => {
            const finalProducts = products.filter(product => product.name !== excludedProductName);
            for (const product of finalProducts) {
                const row = this.checkoutRows.filter({ has: this.page.locator('td.cart_description h4 a', { hasText: product.name }) });
                await expect(await row.locator('td.cart_description h4 a').innerText()).toBe(product.name);
                const ActualPrice = await row.locator('td.cart_price p').innerText();
                await expect(Number(ActualPrice.replace('Rs.', '').trim())).toBe(product.price);
                const ActualQuantity = await row.locator('td.cart_quantity button').innerText();
                await expect(Number(ActualQuantity.trim())).toBe(product.quantity);
                const ActualTotal = await row.locator('td.cart_total p').innerText();
                await expect(Number(ActualTotal.replace('Rs.', '').trim())).toBe(product.price * product.quantity);
            }
            const grandTotal = await Number((await this.page.locator(`//tr[td[contains(., 'Total Amount')]]//p`).innerText()).replace('Rs.', '').trim());
            await expect(grandTotal).toBe(finalProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0));
        });
    }

    async placeOrder() {
        await test.step('Place the order', async () => {
            await this.placeOrderButton.click();
        });
    }

}

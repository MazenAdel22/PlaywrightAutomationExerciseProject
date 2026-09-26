import { test, type Locator, type Page } from '@playwright/test';

export class PaymentPage {

    // Locators //

    readonly page: Page;
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;
    readonly payAndConfirmOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameOnCardInput = page.locator("input[name='name_on_card']");
        this.cardNumberInput = page.locator("input[name='card_number']");
        this.cvcInput = page.locator("input[name='cvc']");
        this.expirationMonthInput = page.locator("input[name='expiry_month']");
        this.expirationYearInput = page.locator("input[name='expiry_year']");
        this.payAndConfirmOrderButton = page.locator("button[id='submit']");
    }

    // Methods //

    async fillPaymentDetails(nameOnCard: string, cardNumber: string, cvc: string, expirationMonth: string, expirationYear: string) {
        await test.step('Fill payment details', async () => {
            await this.nameOnCardInput.fill(nameOnCard);
            await this.cardNumberInput.fill(cardNumber);
            await this.cvcInput.fill(cvc);
            await this.expirationMonthInput.fill(expirationMonth);
            await this.expirationYearInput.fill(expirationYear);
        });
    }

    async clickPayAndConfirmOrder() {
        await test.step('Pay and confirm order', async () => {
            await this.payAndConfirmOrderButton.click();
        });
    }

}
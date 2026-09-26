import { test, expect, type Locator, type Page } from '@playwright/test';
// import path from 'path';

export class ContactUsPage {

    // Locators //

    readonly page: Page;
    readonly contactUsSectionHeader: Locator;
    readonly contactUsSectionSubHeader: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly uploadFileInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactUsSectionHeader = page.getByRole('heading', { name: 'Contact Us' })
        this.contactUsSectionSubHeader = page.getByRole('heading', { name: 'Get In Touch' })
        this.nameInput = page.locator("input[data-qa='name']");
        this.emailInput = page.locator("input[data-qa='email']");
        this.subjectInput = page.locator("input[data-qa='subject']");
        this.messageInput = page.locator("textarea[data-qa='message']");
        this.uploadFileInput = page.locator('[name="upload_file"]');
        this.submitButton = page.locator('input[name="submit"]');
        this.successMessage = page.locator("div[class='status alert alert-success']");
    }

    // Methods //

    async verifyContactUsSectionHeaders(expectedHeaderText: string, expectedSubHeaderText: string) {
        await test.step('Verify contact us section headers', async () => {
            await expect(this.contactUsSectionHeader).toHaveText(expectedHeaderText);
            await expect(this.contactUsSectionSubHeader).toHaveText(expectedSubHeaderText);
        });
    }

    async fillContactUsForm(name: string, email: string, subject: string, message: string) {
        await test.step('Fill and submit contact us form', async () => {
            await this.nameInput.fill(name);
            await this.emailInput.fill(email);
            await this.subjectInput.fill(subject);
            await this.messageInput.fill(message);
        });
    }

    async submitContactUsForm() {
        await test.step('Submit contact us form', async () => {
            await this.page.waitForTimeout(1000);
            this.page.once('dialog', async dialog => {
                await dialog.accept();
            });
            await this.submitButton.evaluate(
                (button: HTMLInputElement) => button.click()
            );
        });
    }

    async verifySuccessMessage(expectedText: string) {
        await test.step('Verify contact us success message', async () => {
            await expect(this.successMessage).toHaveText(expectedText);
        });
    }

}
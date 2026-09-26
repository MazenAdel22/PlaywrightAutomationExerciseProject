import { test, expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {

    // Locators //
    readonly page: Page;
    readonly signUpSectionHeader: Locator;
    readonly loginSectionHeader: Locator;
    readonly signUpNameInput: Locator;
    readonly signUpEmailInput: Locator;
    readonly signUpButton: Locator;
    readonly signUpErrorMessage: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpSectionHeader = page.locator("div[class='signup-form'] h2")
        this.loginSectionHeader = page.locator("div[class='login-form'] h2");
        this.signUpNameInput = page.getByRole('textbox', { name: 'Name' })
        this.signUpEmailInput = page.locator("input[data-qa='signup-email']")
        this.signUpButton = page.getByRole('button', { name: 'Signup' })
        this.signUpErrorMessage = page.locator('//form[@action=\'/signup\'] /p')
        this.loginEmailInput = page.locator("input[data-qa='login-email']")
        this.loginPasswordInput = page.locator('[name="password"]')
        this.loginButton = page.locator('button[data-qa="login-button"]')
        this.loginErrorMessage = page.locator('//form[@action=\'/login\'] /p')
    }

    // Methods //

    async signUp(name: string, email: string) {
        await test.step('Sign up with name and email', async () => {
            await this.signUpNameInput.fill(name);
            await this.signUpEmailInput.fill(email);
            await this.signUpButton.click();
        })
    }

    async login(email: string, password: string) {
        await test.step('Login with email and password', async () => {
            await this.loginEmailInput.fill(email);
            await this.loginPasswordInput.fill(password);
            await this.loginButton.click();
        })
    }

    async verifySignUpSectionHeader(expectedText: string) {
        await test.step('Verify sign up section header', async () => {
            await expect(this.signUpSectionHeader).toHaveText(expectedText);
        });
    }

    async verifyLoginSectionHeader(expectedText: string) {
        await test.step('Verify login section header', async () => {
            await expect(this.loginSectionHeader).toHaveText(expectedText);
        });
    }

    async verifySignUpErrorMessage(expectedText: string) {
        await test.step('Verify sign up error message', async () => {
            await expect(this.signUpErrorMessage).toHaveText(expectedText);
        });
    }

    async verifyLoginErrorMessage(expectedText: string) {
        await test.step('Verify login error message', async () => {
            await expect(this.loginErrorMessage).toHaveText(expectedText);
        });
    }

}
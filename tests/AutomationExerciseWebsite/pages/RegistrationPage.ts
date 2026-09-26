import { test, expect, type Locator, type Page } from '@playwright/test';

export class RegistrationPage {

    // Locators //

    readonly page: Page;
    readonly RegistrationSectionHeader: Locator;
    readonly RegistrationSectionSubHeader: Locator;
    readonly genderRadioButton: Locator;
    readonly passwordInput: Locator;
    readonly dayDropdown: Locator;
    readonly monthDropdown: Locator;
    readonly yearDropdown: Locator;
    readonly specialOffersCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedMessage: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.RegistrationSectionHeader = page.locator("//div[@class='login-form'] /h2[@class='title text-center']");
        this.RegistrationSectionSubHeader = page.locator("//form[@action='/signup'] /h2[@class='title text-center']");
        this.genderRadioButton = page.locator("#id_gender1");
        this.passwordInput = page.getByLabel('Password *');
        this.dayDropdown = page.locator("#days");
        this.monthDropdown = page.locator("#months");
        this.yearDropdown = page.locator("#years");
        this.specialOffersCheckbox = page.locator('#optin');
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.companyInput = page.locator('#company');
        this.addressInput = page.locator('#address1');
        this.countryDropdown = page.locator('#country');
        this.stateInput = page.locator('#state');
        this.cityInput = page.locator('#city');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.locator('#mobile_number');
        this.createAccountButton = page.locator("button[data-qa='create-account']");
        this.accountCreatedMessage = page.locator("h2[class='title text-center'] b");
        this.continueButton = page.locator('a.btn.btn-primary')
    }

    // Methods //

    async verifyRegistrationSectionHeaders(expectedHeaderText: string, expectedSubHeaderText: string) {
        await test.step('Verify registration section headers', async () => {
            await expect(this.RegistrationSectionHeader).toHaveText(expectedHeaderText);
            await expect(this.RegistrationSectionSubHeader).toHaveText(expectedSubHeaderText);
        });
    }

    async fillRegistrationForm(password: string, day: string, month: string, year: string, firstName: string, lastName: string, company: string, address: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string) {
        await test.step('Fill registration form and create account', async () => {
            await this.genderRadioButton.check();
            await this.passwordInput.fill(password);
            await this.dayDropdown.selectOption({ value: day });
            await this.monthDropdown.selectOption({ label : month });
            await this.yearDropdown.selectOption({ value: year });
            await this.specialOffersCheckbox.check();
            await this.firstNameInput.fill(firstName);
            await this.lastNameInput.fill(lastName);
            await this.companyInput.fill(company);
            await this.addressInput.fill(address);
            await this.countryDropdown.selectOption(country);
            await this.stateInput.fill(state);
            await this.cityInput.fill(city);
            await this.zipcodeInput.fill(zipcode);
            await this.mobileNumberInput.fill(mobileNumber);
            await this.createAccountButton.click();
        });
    }

    async verifyAccountCreatedMessage(expectedText: string) {
        await test.step('Verify account created message', async () => {
            await expect(this.accountCreatedMessage).toHaveText(expectedText);
        });
    }

    async clickContinueButton() {
        await test.step('Continue after account creation', async () => {
            await this.continueButton.click();
        });
    }

}
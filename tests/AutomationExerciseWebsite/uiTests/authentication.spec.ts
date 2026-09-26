import { test } from '../fixtures/BaseFixture';
import { messages, pageTitles } from '../utils/TestData/messagesWithTitles';
import { users } from '../utils/TestData/users';

test.use({ storageState: { cookies: [], origins: [] } });

test('Valid Registration', async ({ page, homePage, loginPage, registrationPage }) => {
  await page.goto('/login');
  await loginPage.verifySignUpSectionHeader(pageTitles.signUp.mainTitle);
  await loginPage.signUp(users.validSignUpUser.username, users.validSignUpUser.email);
  await registrationPage.verifyRegistrationSectionHeaders(pageTitles.signUp.firstSectionTitle, pageTitles.signUp.secondSectionTitle);
  await registrationPage.fillRegistrationForm(users.validSignUpUser.password, users.validSignUpUser.days, users.validSignUpUser.months, users.validSignUpUser.years, users.validSignUpUser.first_name, users.validSignUpUser.last_name, users.validSignUpUser.company, users.validSignUpUser.address, users.validSignUpUser.country, users.validSignUpUser.state, users.validSignUpUser.city, users.validSignUpUser.zipcode, users.validSignUpUser.mobile_number);
  await registrationPage.verifyAccountCreatedMessage(messages.signUp.successMessage);
  await registrationPage.clickContinueButton();
  await homePage.verifyLoggedInUsername(users.validSignUpUser.username);
});

test('Valid Login and delete account', async ({ page, homePage, loginPage }) => {
  await page.goto('/login');
  await loginPage.verifyLoginSectionHeader(pageTitles.login.mainTitle)
  await loginPage.login(users.validSignUpUser.email, users.validSignUpUser.password);
  await homePage.verifyHomePageTitle(pageTitles.homePage.title);
  await homePage.verifyLoggedInUsername(users.validSignUpUser.username);
  await homePage.clickDeleteAccountButton();
  await homePage.verifyAccountIsDeleted(messages.deleteAccount.successMessage);
});

test('Invalid Registration', async ({ page, loginPage }) => {
  await page.goto('/login');
  await loginPage.signUp(users.invalidSignUpUser.username, users.invalidSignUpUser.email);
  await loginPage.verifySignUpErrorMessage(messages.signUp.errorMessage);
});


test('Invalid Login', async ({ page, loginPage }) => {
  await page.goto('/login');
  await loginPage.login(users.invalidLoginUser.email, users.invalidLoginUser.password);
  await loginPage.verifyLoginErrorMessage(messages.login.errorMessage);
});
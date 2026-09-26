import { test } from '../fixtures/BaseFixture';
import { messages, pageTitles } from '../utils/TestData/messagesWithTitles';
import { users } from '../utils/TestData/users';

  test.use({ storageState: {cookies: [], origins: []} });

  test('should submit the contact form successfully', async ({ homePage, contactUsPage }) => {
    await homePage.openHomePage();
    await homePage.clickContactUsButton();
    await contactUsPage.verifyContactUsSectionHeaders(pageTitles.contactUs.firstSectionTitle, pageTitles.contactUs.secondSectionTitle );
    await contactUsPage.fillContactUsForm(users.contactUsUser.name, users.contactUsUser.email, users.contactUsUser.subject, users.contactUsUser.yourMessage );
    await contactUsPage.submitContactUsForm();
    await contactUsPage.verifySuccessMessage(messages.contactUs.successMessage);
  });

    test('should submit the subscription successfully', async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.verifySubscriptionTitle(pageTitles.subscription.title);
    await homePage.enterSubscriptionData(users.subscriptionUser.email);
    await homePage.verifySubscriptionSuccessMessage(messages.subscription.successMessage);
  });

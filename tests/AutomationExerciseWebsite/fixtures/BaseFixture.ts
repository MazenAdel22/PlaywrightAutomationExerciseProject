import { test as base } from '@playwright/test';
import { BrandProductsPage } from '../pages/BrandProductsPage';
import { CartPage } from '../pages/CartPage';
import { CategoryProductsPage } from '../pages/CategoryProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CompletedOrderPage } from '../pages/CompletedOrderPage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ProductsPage } from '../pages/ProductsPage';
import { RegistrationPage } from '../pages/RegistrationPage';


type pages = {
  brandProductsPage: BrandProductsPage;
  cartPage: CartPage;
  loginPage: LoginPage;
  categoryProductsPage: CategoryProductsPage;
  checkoutPage: CheckoutPage;
  completedOrderPage: CompletedOrderPage;
  contactUsPage: ContactUsPage;
  homePage: HomePage;
  paymentPage: PaymentPage;
  productDetailsPage: ProductDetailsPage;
  productsPage: ProductsPage;
  registrationPage: RegistrationPage;
};

const testPages = base.extend<pages>({
  brandProductsPage: async ({ page }, use) => {
    const brandProductsPage = new BrandProductsPage(page);
    await use(brandProductsPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  categoryProductsPage: async ({ page }, use) => {
    const categoryProductsPage = new CategoryProductsPage(page);
    await use(categoryProductsPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  completedOrderPage: async ({ page }, use) => {
    const completedOrderPage = new CompletedOrderPage(page);
    await use(completedOrderPage);
  },
  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },
  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },
});

export const test = testPages;
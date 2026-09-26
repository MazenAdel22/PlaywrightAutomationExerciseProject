import { test } from '../fixtures/BaseFixture';
import { productsData } from '../utils/TestData/products';
import { pageTitles } from '../utils/TestData/messagesWithTitles';
import { users } from '../utils/TestData/users';


test.use({ storageState: { cookies: [], origins: [] } });

test('Validate Features Products', async ({ homePage }) => {
  await homePage.openHomePage();
  await homePage.verifyFeaturedProductsTitle(pageTitles.featureProducts.title);
  await homePage.verifyFeaturedProductsCount(productsData.featureProducts.count);
  await homePage.verifyFeaturedProductsName(productsData.featureProducts.name);
});

test('Validate recommended Products', async ({ homePage }) => {
  await homePage.openHomePage();
  await homePage.verifyRecommendedProductsTitle(pageTitles.recommendedItems.title);
  await homePage.verifyRecommendedProductsCount(productsData.recommendedItems.count);
  await homePage.verifyRecommendedProductsName(productsData.recommendedItems.name);
});

test('Validate Sub-Categories Products', async ({ page, categoryProductsPage }) => {
  await page.goto('/category_products/2');
  await categoryProductsPage.verifyCategoryProductsHeader(productsData.searchingSelections.category.title);
  await categoryProductsPage.verifyProductsExist(productsData.searchingSelections.category.name);
  await categoryProductsPage.verifyProductsCount(productsData.searchingSelections.category.count);
});

test('Validate Brand Products', async ({ page, brandProductsPage }) => {
  await page.goto('/brand_products/H&M');
  await brandProductsPage.verifyBrandProductsHeader(productsData.searchingSelections.brand.title);
  await brandProductsPage.verifyProductsExist(productsData.searchingSelections.brand.name);
  await brandProductsPage.verifyProductsCount(productsData.searchingSelections.brand.count);
});


for (const productDetails of (productsData.productsDetails)) {
  test(`Validate Products Details for ${productDetails.name}`, async ({ homePage, productDetailsPage }) => {
    await homePage.openHomePage();
    await homePage.viewProductDetails(productDetails.name);
    await homePage.closeAdIfVisible();
    await productDetailsPage.verifyProductDetails(productDetails.name, productDetails.category, productDetails.price, productDetails.availability, productDetails.condition, productDetails.brand);
  });
}

test('Validate submitting a review on product', async ({ homePage, productDetailsPage }) => {
    await homePage.openHomePage();
    await homePage.viewProductDetails(productsData.reviewProducts.name);
    await homePage.closeAdIfVisible();
    await productDetailsPage.submitReview(users.reviewUser.username , users.reviewUser.email , users.reviewUser.yourReview);
  });

  
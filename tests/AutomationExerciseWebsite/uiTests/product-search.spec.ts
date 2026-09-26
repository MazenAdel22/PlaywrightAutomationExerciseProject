import { test } from '../fixtures/BaseFixture';
import { productsData } from '../utils/TestData/products';
import { pageTitles } from '../utils/TestData/messagesWithTitles';

test.use({ storageState: { cookies: [], origins: [] } });

for (const searchCase of (productsData.searchingSelections.searchingProductsCases)) {

  test(searchCase.testCaseName, async ({ page, productsPage }) => {
    await page.goto('/products')
    await productsPage.searchProduct(searchCase.searchingProductName);
    await productsPage.verifySearchedProductsHeader(pageTitles.searchedItems.title);
    if (searchCase.shouldHaveResults === true) {
      await productsPage.verifySearchedProductsCount(productsData.searchingSelections.searchingProductsCases[0].count);
      await productsPage.verifySearchedProductsNames(productsData.searchingSelections.searchingProductsCases[0].searchingProductName);
    } else
      await productsPage.verifySearchedProductsCount(productsData.searchingSelections.searchingProductsCases[1].count);
  });

}

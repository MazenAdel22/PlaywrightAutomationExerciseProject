import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch({
    channel: 'chrome'
});
    const page = await browser.newPage();
    await page.goto(baseURL!);
    await page.locator("a[href='/login']").click();
    await page.locator("input[data-qa='login-email']").fill('sanij69099@cerisun.com');
    await page.locator('[name="password"]').fill('v99ztYi3He@5FmV');
    await page.locator('button[data-qa="login-button"]').click();
    await page.waitForURL(baseURL!);
    await page.context().storageState({ path: storageState as string });
    await browser.close();
}

export default globalSetup;
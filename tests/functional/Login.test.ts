import test from "@lib/BaseTest";

test.use({ storageState: { cookies: [], origins: [] } });

test(`Verify Login to the App`, async ({ loginPage, webActions }) => {
  await loginPage.navigateToURL();
  await loginPage.loginToApplication();
  await loginPage.verifyProfilePage();
});

import { TestInfo, test as baseTest } from "@playwright/test";
import { WebActions } from "./WebActions";
import AxeBuilder from "@axe-core/playwright";
import { LoginPage } from "@pages/LoginPage";

const test = baseTest.extend<{
  webActions: WebActions;
  loginPage: LoginPage;
  makeAxeBuilder: AxeBuilder;
  testInfo: TestInfo;
}>({
  webActions: async ({ page, context }, use) => {
    await use(new WebActions(page, context));
  },
  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page, context));
  },
  makeAxeBuilder: async ({ page }, use) => {
    await use(
      new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .exclude("#commonly-reused-element-with-known-issue")
    );
  },
});

export default test;

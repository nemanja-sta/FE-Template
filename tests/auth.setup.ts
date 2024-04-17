import { test as setup, expect } from "@playwright/test";
import { testConfig } from "../testConfig";
const ENV = process.env.npm_config_ENV;
import dotenv from "dotenv";
dotenv.config();

const authFile = "./auth/superAdminFile.json";

setup("authenticate UI Super Admin", async ({ page }) => {
  const loginUrl: string = testConfig[ENV] + "/login";
  let superAdminEmail: string = String(process.env.SUPER_ADMIN_EMAIL);
  let superAdminPass: string = String(process.env.SUPER_ADMIN_PASSWORD);

  await page.goto(loginUrl);
  await page.locator('input[id="userName"]').fill(superAdminEmail);
  await page.locator('input[id="password"]').fill(superAdminPass);
  await page.locator('button[id="login"]').click();

  await page.waitForURL(testConfig[ENV] + "/profile");
  await expect(page.getByText("Username")).toBeVisible();
  await page.context().storageState({ path: authFile });
});

import { Page, BrowserContext, Locator, expect } from "@playwright/test";
import { testConfig } from "../testConfig";
import { WebActions } from "@lib/WebActions";
import dotenv from "dotenv";
dotenv.config();
let superAdminEmail: string = String(process.env.SUPER_ADMIN_EMAIL);
let superAdminPass: string = String(process.env.SUPER_ADMIN_PASSWORD);

let webActions: WebActions;

export class LoginPage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitBtn: Locator;
  readonly profileName: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    webActions = new WebActions(this.page, this.context);
    this.email = page.locator('input[id="userName"]');
    this.password = page.locator('input[id="password"]');
    this.submitBtn = page.locator('button[id="login"]');
    this.profileName = page.getByText("Username");
  }

  async navigateToURL(): Promise<void> {
    await this.page.goto("/login");
  }

  async loginToApplication(): Promise<void> {
    // const decipherPassword = await webActions.decipherPassword();
    await this.email.fill(superAdminEmail);
    await this.password.fill(superAdminPass);
    await this.submitBtn.click();
  }

  async verifyProfilePage(): Promise<void> {
    await expect(this.profileName).toBeVisible();
  }
}

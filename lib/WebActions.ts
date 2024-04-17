import fs from "fs";
import type { Page } from "@playwright/test";
import { BrowserContext, expect } from "@playwright/test";
import { Workbook } from "exceljs";
import { testConfig } from "testConfig";
import * as pdfjslib from "pdfjs-dist-es5";

export class WebActions {
  readonly page: Page;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  //   async decipherPassword(): Promise<string> {
  //     const key = `SECRET`;
  //     return CryptoJS.AES.decrypt(testConfig.password, key).toString(
  //       CryptoJS.enc.Utf8
  //     );
  //   }

  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async clickByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click();
  }

  async clickElementJS(locator: string): Promise<void> {
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

  async readDataFromExcel(
    fileName: string,
    sheetName: string,
    rowNum: number,
    cellNum: number
  ): Promise<string> {
    const workbook = new Workbook();
    return workbook.xlsx.readFile(`./Downloads/${fileName}`).then(function () {
      const sheet = workbook.getWorksheet(sheetName);
      return sheet.getRow(rowNum).getCell(cellNum).toString();
    });
  }
}

import { Page } from '@playwright/test';

export class RouterTestHelpers {
  static async navigateToRoute(page: Page, route: string) {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
  }

  static async assertRoute(page: Page, expectedRoute: string) {
    await page.waitForURL(`**${expectedRoute}`);
    await expect(page).toHaveURL(expectedRoute);
  }

  static async getRouteData(page: Page, selector: string) {
    return await page.locator(selector).textContent();
  }
}
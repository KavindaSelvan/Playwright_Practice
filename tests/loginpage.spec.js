import { test, expect } from '@playwright/test';

test.only('first test', async ({ page }) => {
  
await page.goto("https://demoqa.com/automation-practice-form");
console.log(await page.title());

const FirstName = page.locator("#firstName");
const LastName = page.locator("#lastName");
const Email = page.locator("#userEmail");

await FirstName.fill("Kavindh");
await page.waitForTimeout(3000);

await LastName.fill("Selvan");
await page.waitForTimeout(3000);

await Email.fill("kavindh@gmail.com");
await page.waitForTimeout(3000);

await page.locator("#submit").click();

});

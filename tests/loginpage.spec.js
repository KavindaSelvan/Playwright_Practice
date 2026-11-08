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

//click and verify male radio btn is clicked
await page.locator("[name='gender']").nth(0).click();
console.log(await page.locator("[name='gender']").nth(0).isChecked());
await expect(page.locator("[name='gender']").nth(0)).toBeChecked();


await page.locator("#submit").click();

});

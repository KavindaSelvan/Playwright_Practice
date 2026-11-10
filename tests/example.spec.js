
import { test, expect } from '@playwright/test';

test('first test', async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.locator("#user-name");
  const passWord = page.locator("#password");
  const loginButton = page.locator("#login-button");
  const cardTitles = page.locator(".inventory_item_name");

  // First Try - Wrong username and correct password
  await userName.fill("Kavindh");
  await page.waitForTimeout(3000);

  await passWord.fill("secret_sauce");
  await page.waitForTimeout(3000);

  await loginButton.click();
  await page.waitForTimeout(3000);

  // Check error message
  console.log(await page.locator(".error-message-container").textContent());

  await expect(page.locator(".error-message-container"))
    .toContainText("Epic sadface: Username and password do not match any user in this service");

  // Second Try - Correct username and password
  await userName.fill("");
  await userName.fill("standard_user");
  await page.waitForTimeout(3000);

  await loginButton.click();
  await page.waitForTimeout(3000);

  // console.log(await page.locator(".inventory_item_name").first().textContent());
  // await page.waitForTimeout(3000);
  // console.log(await page.locator(".inventory_item_name").nth(1).textContent());
  // await page.waitForTimeout(3000);
  // console.log(await page.locator(".inventory_item_name").allTextContents());
  // await page.waitForTimeout(3000);

   console.log(await cardTitles.first().textContent());
   await page.waitForTimeout(3000);
    
   console.log(await cardTitles.nth(1).textContent());
   await page.waitForTimeout(3000);

   console.log(await cardTitles.allTextContents());
   await page.waitForTimeout(3000);



});

test.only('Check add to cart', async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const userName = page.locator("#user-name");
  const passWord = page.locator("#password");
  const loginButton = page.locator("#login-button");

  const products = page.locator(".inventory_item");
  const cardTitles = page.locator(".inventory_item_name")
  const productName = "Sauce Labs Fleece Jacket";

  await userName.fill("standard_user")
  await page.waitForTimeout(3000);

  await passWord.fill("secret_sauce");
  await page.waitForTimeout(3000);

  await loginButton.click();
  await page.waitForLoadState('networkidle'); //Wait until network requests stop for a short time.
  
  console.log(await cardTitles.allTextContents());
  const count = await cardTitles.count();
  for (let i = 0; i < count; i++) {
    const title = await cardTitles.nth(i).textContent();

    if (title.trim() === productName) {
      await products.nth(i).getByRole('button', { name: 'Add to cart', exact: true }) .click();

      // Check that the product was added
      await expect(products.nth(i).getByRole('button', 
        {
          name: 'Remove',
          exact: true
        })
      ).toBeVisible();

      break;
    }
  }
  await page.pause();
});



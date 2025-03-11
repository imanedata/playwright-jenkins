import { test, expect } from '@playwright/test';
import Inventory from '../pages/inventory.page';
import Login from '../pages/login.page';


test('Add product to cart', async ({ page }) => {
  const loginPage = new Login(page);
  const inventoryPage = new Inventory(page);

  await loginPage.gotoLoginPage();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.verifySuccessfulLogin();

  await inventoryPage.verifyInventoryPage();
  await inventoryPage.addToCart();
  await inventoryPage.verifyCartBadge('1');
});


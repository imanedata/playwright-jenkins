import { test, expect } from '@playwright/test';
import Inventory from '../pages/inventory.page';
import Login from '../pages/login.page';

test('Login to SauceDemo using POM', async ({ page }) => {
  const loginPage = new Login(page);

  // Aller sur la page de login
  await loginPage.gotoLoginPage();

  // Remplir les champs et se connecter
  await loginPage.login('standard_user', 'secret_sauce');

  // Vérifier que la connexion a réussi
  await loginPage.verifySuccessfulLogin();
});
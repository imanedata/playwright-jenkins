import { expect, Page } from "@playwright/test";
class LoginPage{
    readonly page: Page;
  readonly usernameInput = '#user-name';
  readonly passwordInput = '#password';
  readonly loginButton = '#login-button';

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }


}
export default LoginPage;
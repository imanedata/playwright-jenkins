import { expect, Page } from "@playwright/test";
class CartPage {
    readonly page: Page;
    readonly cartTitle = '.title';
    readonly checkoutButton = '[data-test="checkout"]';
    readonly firstItemName = '.cart_item:first-child .inventory_item_name';
    readonly removeFirstItemButton = '.cart_item:first-child .cart_button';
  
    constructor(page: Page) {
      this.page = page;
    }
  
    /** 📌 Aller à la page du panier */
    async gotoCartPage() {
      await this.page.click('.shopping_cart_link');
    }
  
    /** 📌 Vérifier que l'utilisateur est bien sur la page du panier */
    async verifyCartPage() {
      await expect(this.page.locator(this.cartTitle)).toHaveText('Your Cart');
    }
  
    /** 📌 Vérifier que le premier article est bien ajouté */
    async verifyFirstItemName(expectedName: string) {
      await expect(this.page.locator(this.firstItemName)).toHaveText(expectedName);
    }
  
    /** 📌 Supprimer le premier article du panier */
    async removeFirstItem() {
      await this.page.click(this.removeFirstItemButton);
    }
  
    /** 📌 Cliquer sur le bouton "Checkout" */
    async proceedToCheckout() {
      await this.page.click(this.checkoutButton);
    }
  }

export default CartPage;
class ProductsPage {
  elements = {
    productPageTitle: () => cy.get("span.title"),
    cartIcon: () => cy.get("a.shopping_cart_link"),
    cartBadge: () => cy.get("span.shopping_cart_badge"),
  };

  addItem1ToCart() {
    this.elements.item1().click();
  }
  addItem2ToCart() {
    this.elements.item2().click();
  }
  addItem3ToCart() {
    this.elements.item3().click();
  }
  clickCartIcon() {
    this.elements.cartIcon().click();
  }
}

module.exports = new ProductsPage();

require("@cypress/xpath");

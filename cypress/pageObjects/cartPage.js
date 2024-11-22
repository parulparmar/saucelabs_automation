class CartPage {
  elements = {
    cartPageTitle: () => cy.get("span.title"),
    checkoutButton: () => cy.get("#checkout"),
  };

  clickCheckoutButton() {
    this.elements.checkoutButton().click();
  }
}

module.exports = new CartPage();

require("@cypress/xpath");

class CheckoutPage {
  elements = {
    checkoutPageTitle: () => cy.get("span.title"),
    continueButton: () => cy.get("#continue"),
    firstName: () => cy.get("#first-name"),
    lastName: () => cy.get("#last-name"),
    postalCode: () => cy.get("#postal-code"),
    paymentInfoLabel: () => cy.get('[data-test="payment-info-label"]'),
    paymentInfoValue: () => cy.get('[data-test="payment-info-value"]'),
    shippingInfoLabel: () => cy.get('[data-test="shipping-info-label"]'),
    shippingInfoValue: () => cy.get('[data-test="shipping-info-value"]'),
    totalInfoLabel: () => cy.get("[data-test=total-info-label]"),
    subTotalValue: () => cy.get('[data-test="subtotal-label"]'),
    taxLabel: () => cy.get('[data-test="tax-label"]'),
    totalLabel: () => cy.get('[data-test="total-label"]'),
    finishButton: () => cy.get("#finish"),
    completeHeader: () => cy.get('[data-test="complete-header"]'),
    completeText: () => cy.get('[data-test="complete-text"]'),
    backHomeButton: () => cy.get("#back-to-products"),
  };

  typeFirstName(firstName) {
    this.elements.firstName().type(firstName);
  }

  typeLastName(lastName) {
    this.elements.lastName().type(lastName);
  }

  typePostalCode(postalCode) {
    this.elements.postalCode().type(postalCode);
  }

  clickContinueButton() {
    this.elements.continueButton().click();
  }

  clickFinishButton() {
    this.elements.finishButton().click();
  }

  clickBackToHomeButton(){
    this.elements.backHomeButton().click();
  }
}

module.exports = new CheckoutPage();

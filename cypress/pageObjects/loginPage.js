
class LoginPage {
  elements = {
    userName: () => cy.get('#user-name'),
    password: () => cy.get('#password'),
    login: () => cy.get("#login-button")
  };

  login(username, password) {
    cy.visit("/");
    this.elements.userName().type(username);
    this.elements.password().type(password);
    this.elements.login().click();
  }
}

module.exports = new LoginPage();

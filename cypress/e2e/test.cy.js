import LoginPage from "../pageObjects/loginPage";
import Products from "../pageObjects/productPage";
import CartPage from "../pageObjects/cartPage";
import CheckoutPage from "../pageObjects/checkoutPage";

describe("End to End Test for Sauce Lab", () => {
  let testData;
  //let totalPrice;

  before(() => {
    // load fixtures once before any tests
    // and they are kept in closure variables
    cy.fixture("testData.json").then((test_Data) => {
      testData = test_Data;
    });
  });

  it("Products checkout End to End flow", () => {
    LoginPage.login(testData.username, testData.password);
    Products.elements.productPageTitle().should("have.text", "Products");

    cy.xpath('//button[text()="Add to cart"]').then((elements) => {
      let items = [];
      let arr = [];
      while (arr.length < 3) {
        let r = Math.floor(Math.random() * (elements.length - 1));
        cy.log(r)
        if (!arr.includes(r)) {
          arr.push(r);
          items.push(elements[r]);
        }
      }

      cy.get('[data-test="inventory-item-name"]').then((itemNameElement) => {
        cy.wrap(itemNameElement[arr[0]])
          .invoke("text")
          .then((message) => {
            cy.wrap(message).as("item1Name");
          });
        cy.wrap(itemNameElement[arr[1]])
          .invoke("text")
          .then((message) => {
            cy.wrap(message).as("item2Name");
          });
        cy.wrap(itemNameElement[arr[2]])
          .invoke("text")
          .then((message) => {
            cy.wrap(message).as("item3Name");
          });
      });

      //cy.wait(30000);

      cy.get('[data-test="inventory-item-price"]').then((itemPriceElement) => {
        cy.wrap(itemPriceElement[arr[0]])
          .invoke("text")
          .then((message) => {
            cy.wrap(message).as("item1Price");
            let price = message.slice(1);
            cy.wrap(parseFloat(price)).as("itemTotal");
          });
        cy.wrap(itemPriceElement[arr[1]])
          .invoke("text")
          .then((message) => {
            cy.wrap(message).as("item2Price");

            let price = message.slice(1);
            cy.get("@itemTotal").then((item_total) => {
              item_total = item_total + parseFloat(price);
              cy.wrap(item_total).as("itemTotal");
            });
          });
        cy.wrap(itemPriceElement[arr[2]])
          .invoke("text")
          .then((message) => {
            cy.wrap(message).as("item3Price");

            let price = message.slice(1);
            cy.get("@itemTotal").then((item_total) => {
              item_total = item_total + parseFloat(price);
              cy.wrap(item_total).as("itemTotal");
            });
          });
      });

      //cy.wait(30000);

      cy.wrap(items).each((item) => {
        cy.wrap(item).click();
      });
    });

    Products.elements.cartBadge().should("have.text", 3);
    Products.clickCartIcon();

    CartPage.elements.cartPageTitle().should("have.text", "Your Cart");

    let checkoutItemsPrice = [], checkoutItemsName = [];
    cy.get('[class="inventory_item_price"]').then((elements) => {

      cy.wrap(elements).each((item) => {
        cy.wrap(item).invoke("text").then((itemPrice) => {
          checkoutItemsPrice.push(itemPrice);
        })
      })

      cy.log(checkoutItemsPrice)

      cy.get("@item1Price").then((item1_price) => {
          expect(checkoutItemsPrice[0]).to.be.eql(item1_price)
      })

      cy.get("@item2Price").then((item2_price) => {
          expect(checkoutItemsPrice[1]).to.be.eql(item2_price);
      })

      cy.get("@item3Price").then((item3_price) => {
          expect(checkoutItemsPrice[2]).to.be.eql(item3_price);
      })

    })

    cy.get('[class="inventory_item_name"]').then((elements) => {

      cy.wrap(elements).each((item) => {
        cy.wrap(item).invoke("text").then((itemName) => {
          checkoutItemsName.push(itemName);
        })
      })

      cy.log(checkoutItemsName)

      cy.get("@item1Name").then((item1_name) => {
          expect(checkoutItemsName[0]).to.be.eql(item1_name)
      })

      cy.get("@item2Name").then((item2_name) => {
          expect(checkoutItemsName[1]).to.includes(item2_name);
      })

      cy.get("@item3Name").then((item3_name) => {
          expect(checkoutItemsName[2]).to.includes(item3_name);
      })

    })

    CartPage.elements.checkoutButton().should("be.visible");
    CartPage.clickCheckoutButton();

    CheckoutPage.elements
      .checkoutPageTitle()
      .should("have.text", "Checkout: Your Information");
    CheckoutPage.typeFirstName(testData.firstname);
    CheckoutPage.typeLastName(testData.lastname);
    CheckoutPage.typePostalCode(testData.postalcode);
    CheckoutPage.clickContinueButton();

    CheckoutPage.elements
      .checkoutPageTitle()
      .should("have.text", "Checkout: Overview");

    CheckoutPage.elements.paymentInfoLabel().should("be.visible");
    CheckoutPage.elements.paymentInfoValue().should("be.visible");
    CheckoutPage.elements
      .paymentInfoValue()
      .should("contain.text", "SauceCard");

    CheckoutPage.elements.shippingInfoLabel().should("be.visible");
    CheckoutPage.elements.shippingInfoValue().should("be.visible");
    CheckoutPage.elements
      .shippingInfoValue()
      .should("contain.text", "Free Pony Express Delivery!");

    CheckoutPage.elements.totalInfoLabel().should("be.visible");
    CheckoutPage.elements.subTotalValue().should("be.visible");

    cy.get("@itemTotal").then((total_price) => {
      CheckoutPage.elements
        .subTotalValue()
        .invoke("text")
        .then((totalPrice) => {
          let price = totalPrice.slice(13);
          expect(parseFloat(price)).to.be.eql(total_price);
        });
    });
    CheckoutPage.clickFinishButton();

    CheckoutPage.elements.completeHeader().should("be.visible");
    CheckoutPage.elements
      .completeHeader()
      .should("have.text", "Thank you for your order!");

    CheckoutPage.elements.completeText().should("be.visible");
    CheckoutPage.elements
      .completeText()
      .should(
        "have.text",
        "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
      );

    CheckoutPage.elements.backHomeButton().should("be.visible");
  });
});

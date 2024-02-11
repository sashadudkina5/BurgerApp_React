import {BASE_URL} from "../../src/utils/ApiConfig"

describe("resetting password", () => {

  const tokenInputSelector = '[name="token"]';
  const emailInputSelector = '[name="email"]';
  const passwordInputSelector = '[name="newPassword"]';

  const email = "test@example.com";
  const password = "password123";
  const token = "123";


    before(function() {
        cy.visit("http://localhost:3000/login");
      });

  it("should reset password successfully", () => {

    cy.window()
    .its("store")
    .invoke("getState")
    .its("userDataStore")
    .should("deep.include", {
      isLoggedIn: false,
    });

    cy.contains('Восстановить пароль').as("ResetButton");
    cy.get("@ResetButton").click();
    cy.url().should("include", "/forgot-password");
    
    cy.get(emailInputSelector).type(email);
    cy.get(emailInputSelector).should('have.value', email);

    cy.get('button[type="submit"]').as('submitButton');
    cy.get('@submitButton').click();

    cy.intercept("POST", `${BASE_URL}/password-reset`, {"success":true,"message":"Reset email sent"});
  
    cy.url().should("include", "/reset-password");

    cy.get(passwordInputSelector).type(password);
    cy.get(passwordInputSelector).should('have.value', password);
    cy.get(tokenInputSelector).type(token);
    cy.get(tokenInputSelector).should('have.value', token);

    cy.get('@submitButton').click();
    cy.intercept("POST", `${BASE_URL}/password-reset/reset`, {
        "success": true,
        "message": "Password successfully reset"
      });

      cy.url().should("include", "http://localhost:3000/react-project-BurgerApp/");
  });
});

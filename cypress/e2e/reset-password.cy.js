import {BASE_URL} from "../../src/utils/ApiConfig"

describe("resetting password", () => {
    before(function() {
        cy.visit("http://localhost:3001/login");
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

    const email = "test@example.com";
    
    cy.get('[name="email"]').type(email);
    cy.get('[name="email"]').should('have.value', email);

    cy.get('button[type="submit"]').click();

    cy.intercept("POST", `${BASE_URL}/password-reset`, {"success":true,"message":"Reset email sent"});
  
    cy.url().should("include", "/reset-password");

    const password = "password123";
    const token = "123";

    cy.get('[name="newPassword"]').type(password);
    cy.get('[name="newPassword"]').should('have.value', password);
    cy.get('[name="token"]').type(token);
    cy.get('[name="token"]').should('have.value', token);

    cy.get('button[type="submit"]').click();
    cy.intercept("POST", `${BASE_URL}/password-reset/reset`, {
        "success": true,
        "message": "Password successfully reset"
      });

      cy.url().should("include", "/login");
  });
});

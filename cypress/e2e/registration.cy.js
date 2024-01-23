import { getLoginSuccess } from "../../src/redux_services/UserData/actions";
import {BASE_URL} from "../../src/utils/ApiConfig"

describe("registration", () => {
    before(function() {
        cy.visit("http://localhost:3000/register");
      });

  it("should register successfully", () => {


    cy.window()
    .its("store")
    .invoke("getState")
    .its("userDataStore")
    .should("deep.include", {
      isLoggedIn: false,
    });

    const name = "Test Name";
    const email = "test@example.com";

    const password = "password123";

    cy.get('[name="name"]').type(name);
    cy.get('[name="name"]').should('have.value', name);
    
    cy.get('[name="email"]').type(email);
    cy.get('[name="email"]').should('have.value', email);
    
    cy.get('[name="password"]').type(password);
    cy.get('[name="password"]').should('have.value', password);

    cy.get('button[type="submit"]').click();

    cy.intercept("POST", `${BASE_URL}/auth/register`, { fixture: 'onRegistrationResponse.json' }).as("registrationRequest");

    cy.window().then((win) => {
        const loginData = {
          email: "test@gmail.com",
          name: "test",
        };
        win.store.dispatch(getLoginSuccess(loginData));
      });
  
      cy.setCookie("accessToken", "mockedToken");

      cy.url().should("eq", "http://localhost:3000/");

  });
});

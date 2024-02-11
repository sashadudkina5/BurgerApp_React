import { getLoginSuccess } from "../../src/redux_services/UserData/actions";
import {BASE_URL} from "../../src/utils/ApiConfig"

describe("registration", () => {

  const nameInputSelector = '[name="name"]';
    const emailInputSelector = '[name="email"]';
    const passwordInputSelector = '[name="password"]';

    const name = "Test Name";
    const email = "test@example.com";
    const password = "password123";


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


    cy.get(nameInputSelector).type(name);
    cy.get(nameInputSelector).should('have.value', name);
    
    cy.get(emailInputSelector).type(email);
    cy.get(emailInputSelector).should('have.value', email);
    
    cy.get(passwordInputSelector).type(password);
    cy.get(passwordInputSelector).should('have.value', password);

    cy.get('button[type="submit"]').click();

    cy.intercept("POST", `${BASE_URL}/auth/register`, { fixture: 'onRegistrationResponse.json' }).as("registrationRequest");

    cy.window().then((win) => {
        const loginData = {
          email: email,
          name: name,
        };
        win.store.dispatch(getLoginSuccess(loginData));
      });
  
      cy.setCookie("accessToken", "mockedToken");

      cy.url().should("eq", "http://localhost:3000/react-project-BurgerApp/");

  });
});

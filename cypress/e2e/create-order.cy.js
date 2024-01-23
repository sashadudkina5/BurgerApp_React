import { getLoginSuccess } from "../../src/redux_services/UserData/actions";
import {BASE_URL} from "../../src/utils/ApiConfig"

describe("create order in burger constructor", () => {

  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it("should navigate to login page if not logged in and tried to submit an order", () => {

    cy.window()
      .its("store")
      .invoke("getState")
      .its("userDataStore")
      .should("deep.include", {
        userData: {
          email: "",
          name: "",
        },
        isLoading: false,
        isLoggedIn: false,
      });

    cy.get(".sourceitem")
      .drag(".targetitem")
      .then((success) => {
        assert.isTrue(success);
      });

    cy.get(".order_botton").click();
    cy.url().should("include", "/login");
  });

  it("should create a new order and open order details modal on button click if logged in", () => {

    cy.intercept("POST", `${BASE_URL}/auth/login`, { fixture: 'onLoginResponse.json' }).as("loginRequest");

    cy.window().then((win) => {
      const loginData = {
        email: "test@gmail.com",
        name: "test",
      };
      win.store.dispatch(getLoginSuccess(loginData));
    });

    cy.setCookie("accessToken", "mockedToken");

    cy.window()
      .its("store")
      .invoke("getState")
      .its("userDataStore")
      .should("deep.include", {
        userData: {
          email: "test@gmail.com",
          name: "test",
        },
        isLoading: false,
        isLoggedIn: true,
      });

    cy.get(".sourceitem")
      .drag(".targetitem")
      .then((success) => {
        assert.isTrue(success);
      });


      cy.get("#643d69a5c3f7b9001cfa0943")
      .drag(".targetitem")
      .then((success) => {
        assert.isTrue(success);
      });
      
    cy.intercept("POST", `${BASE_URL}/orders`, { fixture: 'orderResponse.json' }).as("createOrderRequest");
    cy.get(".order_botton").click();

    cy.get("#modal_overlay").should("exist");
    cy.get("#modal").should("exist");
  

    cy.wait("@createOrderRequest").then((interception) => {
      interception.request.body.ingredients.forEach((ingredient) => {
        expect(ingredient).to.be.a("string");
      });
      expect(interception.request.headers["authorization"]).to.equal("mockedToken");
    });

    cy.window()
      .its("store")
      .invoke("getState")
      .its("orderStore")
      .should("deep.include", {
        orderNumber: 32147,
        loading: false,
        error: null,
      });
  });
});

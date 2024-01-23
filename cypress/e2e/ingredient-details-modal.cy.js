const ingredientsToTest = [
  {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
  },
];

describe("opening ingredient details modals", () => {
  ingredientsToTest.forEach((ingredient) => {
    it(`should open ingredients details modal for ${ingredient.name}`, () => {
      cy.visit("http://localhost:3000/");

      cy.get(`#${ingredient._id}`).click();

      cy.get("#modal").should("exist");
      cy.get("#modal_overlay").should("exist");

      cy.window()
        .its("store")
        .invoke("getState")
        .its("ingredientDetailsStore")
        .then((store) => {
          expect(store).to.deep.equal({
            ingredientDetails: {
              _id: "643d69a5c3f7b9001cfa093d",
              name: "Флюоресцентная булка R2-D3",
              type: "bun",
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: "https://code.s3.yandex.net/react/code/bun-01.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/bun-01-large.png",
              __v: 0,
            },
            isIngredientDetailModalOpen: true,
          });
        });
    });
  });

  ingredientsToTest.forEach((ingredient) => {
    it(`should close opened modal for ${ingredient.name}`, () => {
      cy.visit("http://localhost:3000/");

      cy.get(`#${ingredient._id}`).click();

      cy.get("#modal-root").should("exist");

      cy.window()
        .its("store")
        .invoke("getState")
        .its("ingredientDetailsStore")
        .then((store) => {
          expect(store).to.deep.equal({
            ingredientDetails: {
              _id: "643d69a5c3f7b9001cfa093d",
              name: "Флюоресцентная булка R2-D3",
              type: "bun",
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: "https://code.s3.yandex.net/react/code/bun-01.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/bun-01-large.png",
              __v: 0,
            },
            isIngredientDetailModalOpen: true,
          });
        });
      cy.get("#closing_modal").click();
      cy.get("#modal").should("not.exist");
      cy.get("#modal_overlay").should("not.exist");

      cy.window()
        .its("store")
        .invoke("getState")
        .its("ingredientDetailsStore")
        .then((store) => {
          expect(store).to.deep.equal({
            ingredientDetails: null,
            isIngredientDetailModalOpen: false,
          });
        });
    });
  });
});

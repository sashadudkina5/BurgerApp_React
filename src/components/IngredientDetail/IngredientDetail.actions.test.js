import {
    showIngredientDetails,
    hideIngredientDetails,
    reopenIngredientDetails
  } from './actions';

  import {
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
    REOPEN_INGREDIENT_DETAILS
  } from "../../redux_services/types-of-actions";
  
  describe('Ingredient Details Actions', () => {

    const selectedIngredient = {
        type: 'some_type',
        name: 'Ingredient Name',
        price: 5.99,
        _id: 'some_id',
        image: 'ingredient_image.jpg',
        calories: 150,
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        count: 1,
      };


    it('should create an action to show ingredient details', () => {

      const action = showIngredientDetails(selectedIngredient);
      const expectedAction = {
        type: SHOW_INGREDIENT_DETAILS,
        selectedIngredient,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action to hide ingredient details', () => {
      const action = hideIngredientDetails();
      const expectedAction = {
        type: HIDE_INGREDIENT_DETAILS,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action to reopen ingredient details', () => {
      const action = reopenIngredientDetails(selectedIngredient);
      const expectedAction = {
        type: REOPEN_INGREDIENT_DETAILS,
        ingredient: selectedIngredient,
      };
      expect(action).toEqual(expectedAction);
    });
  });
  
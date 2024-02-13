import ingredientDetailsReducer from "./reducer";
import {
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
    REOPEN_INGREDIENT_DETAILS
} from "../../redux_services/types-of-actions";
import { initialState } from "./reducer";

describe('ingredients details reducer', () => {

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

      const currentState = {
        ingredientDetails: selectedIngredient,
        isIngredientDetailModalOpen: true,
      };


    it('should return the initial state', () => {
      expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle SHOW_INGREDIENT_DETAILS action', () => {
  
      const action = {
        type: SHOW_INGREDIENT_DETAILS,
        selectedIngredient,
      };
  
      const newState = ingredientDetailsReducer(initialState, action);
  
      expect(newState.ingredientDetails).toEqual(selectedIngredient);
      expect(newState.isIngredientDetailModalOpen).toBe(true);
    });
  
    it('should handle HIDE_INGREDIENT_DETAILS action', () => {
  
      const action = {
        type: HIDE_INGREDIENT_DETAILS,
      };
  
      const newState = ingredientDetailsReducer(currentState, action);
  
      expect(newState.ingredientDetails).toBeNull();
      expect(newState.isIngredientDetailModalOpen).toBe(false);
    });
  
    it('should handle REOPEN_INGREDIENT_DETAILS action', () => {
      const action = {
        type: REOPEN_INGREDIENT_DETAILS,
        ingredient: selectedIngredient,
      };
  
      const newState = ingredientDetailsReducer(initialState, action);
  
      expect(newState.ingredientDetails).toEqual(selectedIngredient);
      expect(newState.isIngredientDetailModalOpen).toBe(true);
    });
  });
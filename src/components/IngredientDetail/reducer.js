import {
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
  } from "./actions";
  

  // Исходное состояние
const initialState = {
    ingredientDetails: null,
    isIngredientDetailModalOpen: false
  };
  
  export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case SHOW_INGREDIENT_DETAILS: {
        return {
          ...state,
          ingredientDetails: action.payload,
          isIngredientDetailModalOpen: true
        };
      }
  
      case HIDE_INGREDIENT_DETAILS: {
        return { ...state, ingredientDetails: [], isIngredientDetailModalOpen: false };
      }
  
      // Реакция на прочие типы экшенов
      default:
        return state;
    }
  };
  
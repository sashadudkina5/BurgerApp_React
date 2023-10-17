import { nanoid } from "@reduxjs/toolkit";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS';

export const addIngredient = (ingredientObj) => ({
    type: ADD_INGREDIENT,
    payload: {...ingredientObj},
    uniqId: nanoid()
});

export const deleteIngredient = (ingredientObj) => ({
    type: DELETE_INGREDIENT,
    payload: ingredientObj.uniqId,
});

export const getIngredientsRequest = () => ({
    type: GET_INGREDIENTS_REQUEST,
});
  
export const getIngredientsSuccess = (ingredientsData) => ({
    type: GET_INGREDIENTS_SUCCESS,
    payload: ingredientsData,
});
  
export const getIngredientsFailed = (error) => ({
    type: GET_INGREDIENTS_FAILED,
    error: error,
});

export const showIngredientDetails = (selectedIngredient) => ({
    type: SHOW_INGREDIENT_DETAILS,
    payload: selectedIngredient,
});

export const hideIngredientDetails = () => ({
    type: HIDE_INGREDIENT_DETAILS,
});
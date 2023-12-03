import { nanoid } from "@reduxjs/toolkit";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CONSTRUCTOR_REORDER = 'CONSTRUCTOR_REORDER';
export const CLEAN_CONSTRUCTOR = 'CLEAN_CONSTRUCTOR';


export const addIngredient = (ingredientObj) => ({
    type: ADD_INGREDIENT,
    payload: {...ingredientObj, uniqID: nanoid()},
});

export const deleteIngredient = (ingredientObj) => ({
    type: DELETE_INGREDIENT,
    payload: ingredientObj,
});

export const cleanConstructor = () => ({
    type: CLEAN_CONSTRUCTOR,
});
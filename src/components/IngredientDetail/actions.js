export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS';

export const showIngredientDetails = (selectedIngredient) => ({
    type: SHOW_INGREDIENT_DETAILS,
    payload: selectedIngredient,
});

export const hideIngredientDetails = () => ({
    type: HIDE_INGREDIENT_DETAILS,
});
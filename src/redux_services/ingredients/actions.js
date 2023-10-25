
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

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
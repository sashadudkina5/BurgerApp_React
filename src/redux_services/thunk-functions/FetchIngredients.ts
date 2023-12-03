import { getIngredientsSuccess, getIngredientsFailed } from  "../ingredients/actions"; 
import { getIngredients } from "../../utils/burger-api";

export const fetchIngredients = () => async (dispatch: any) => {
  try {
    const ingredientsData = await getIngredients();
    dispatch(getIngredientsSuccess(ingredientsData));
  } catch (error: any) {
    console.error(error);
    dispatch(getIngredientsFailed(error.message));
  }
};

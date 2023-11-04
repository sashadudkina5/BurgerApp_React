export const getConstructorIngredients = (state) => state.constructorStore.constructorIngredients;
export const getListOfIngredients = (state) => state.ingredientsStore;
export const getIngredientDetails = (state) => state.ingredientDetailsStore.ingredientDetails;
export const getBurgerIngredients = (state) => state.ingredientsStore.ingredientsData.data;
export const getBunData = (state) => state.constructorStore.bun;
export const getIngredientDetailsModalState = (state) => state.ingredientDetailsStore.isIngredientDetailModalOpen;
import {RootState} from "../utils/types";
import { createSelector } from 'reselect';

export const getConstructorIngredients = (state: RootState) => state.constructorStore.constructorIngredients;
export const getListOfIngredients = (state: RootState) => state.ingredientsStore;
export const getListOfIngredientsArray = (state: RootState) => state.ingredientsStore.ingredientsData.data;
export const getIngredientDetails = (state: RootState) => state.ingredientDetailsStore.ingredientDetails;
export const getBurgerIngredients = (state: RootState) => state.ingredientsStore.ingredientsData.data;
export const getBunData = (state: RootState) => state.constructorStore.bun;
export const getIngredientDetailsModalState = (state: RootState) => state.ingredientDetailsStore.isIngredientDetailModalOpen;
export const getUserEmail = (state: RootState) => state.userDataStore.userData.email;
export const getUserError = (state: RootState) => state.userDataStore.error;
export const getLoggedInStatus = (state: RootState) => state.userDataStore.isLoggedIn;
export const getUserData = (state: RootState) => state.userDataStore.userData;
export const getOpenedIngredientID = (state: RootState) => state.ingredientDetailsStore.ingredientDetails;
export const getOrferNumber = (state: RootState) => state.orderStore.orderNumber;
export const getLoggingInLoading = (state: RootState) => state.userDataStore.isLoading;

export const getReadyOrders = createSelector(
    (state: RootState) => state.webSocketStore.getData.orders,
    (orders) => orders.filter(order => order.status === 'done')
  );
  
  export const getInProcessOrders = createSelector(
    (state: RootState) => state.webSocketStore.getData.orders,
    (orders) => orders.filter(order => order.status !== 'done')
  );

  export const getTotalOrders = createSelector(
    (state: RootState) => state.webSocketStore.getData,
    (data) => data.total
  );

  export const getTotalTodatOrders = createSelector(
    (state: RootState) => state.webSocketStore.getData,
    (data) => data.totalToday
  );
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./ingredients/reducer";
import { orderReducer } from "../components/OrderDetails/reducer";
import {constructorReducer} from "../components/BurgerConstructor/reducer";
import {ingredientDetailsReducer} from "../components/IngredientDetail/reducer";
import { userDataReducer } from "./UserData/reducer";


const rootReducer = combineReducers({
  ingredientsStore: ingredientsReducer,
  orderStore: orderReducer,
  constructorStore: constructorReducer,
  ingredientDetailsStore: ingredientDetailsReducer,
  userDataStore: userDataReducer

});

export const store = configureStore({
  reducer: rootReducer,
});

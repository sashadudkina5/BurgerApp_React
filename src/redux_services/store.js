import {combineReducers} from "redux";
import { configureStore } from '@reduxjs/toolkit'
import { ingredientsReducer } from "./ingredients/reducer";

const rootReducer = combineReducers({
    ingredientsStore: ingredientsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
})
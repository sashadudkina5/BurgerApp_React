import ingredientsReducer from "./reducer";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../../redux_services/types-of-actions";
import { initialState } from "./reducer";

describe("get all ingredients reducer", () => {

    const ingredientsData = {
        data: [
          {
            type: "some_type",
            name: "Ingredient Name",
            price: 5.99,
            _id: "some_id",
            image: "ingredient_image.jpg",
            uniqID: "1234abc",
            calories: 150,
            proteins: 10,
            fat: 5,
            carbohydrates: 20,
            count: 1,
          },
        ],
      };
      

  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST action", () => {
    const action = { type: GET_INGREDIENTS_REQUEST };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
  });

  it("should handle GET_INGREDIENTS_SUCCESS action", () => {

    const requestAction = { type: GET_INGREDIENTS_REQUEST };
    const requestState = ingredientsReducer(initialState, requestAction);

    const action = {
      type: GET_INGREDIENTS_SUCCESS,
      ingredientsData,
    };

    const newState = ingredientsReducer(requestState, action);

    expect(newState.ingredientsData.data).toEqual(ingredientsData.data);
    expect(newState.isLoading).toBe(false);
  });

  it("should handle GET_INGREDIENTS_FAILED action", () => {

    const requestAction = { type: GET_INGREDIENTS_REQUEST };
    const requestState = ingredientsReducer(initialState, requestAction);

    const errorMessage = "Failed to fetch ingredients";
    const action = {
      type: GET_INGREDIENTS_FAILED,
      errorMessage,
    };

    const newState = ingredientsReducer(requestState, action);
    
    expect(newState.ingredientsData.data).toEqual([]);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });
});
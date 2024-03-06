import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
} from "../../components/OrderDetails/actions";
import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, AppThunk} from "../../utils/types";
import { getCookie } from "../../utils/api";

/**
 * This function dispatches an action of order creation. It attempts to
 * create an order by making a POST request to the order creation endpoint, including a list of ingredient IDs
 * in the request body. If an access token exists, it is included in the request headers for authentication.
 * 
 * On successful order creation, the function dispatches an action with the created order's number.
 *
 * @param {{ ingredients: (string | undefined)[]; }} ingredientIDs - Object containing an array of ingredient IDs for the order.
 * 
 * @example
 * // Dispatch the createOrderThunk with an array of ingredient IDs to initiate the order creation process
 * dispatch(createOrderThunk({ ingredients: ['ingredientId1', 'ingredientId2'] }));
 */
export const createOrderThunk = (ingredientIDs: { ingredients: (string | undefined)[]; }): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(createOrderRequest());
    const accessToken = getCookie("accessToken");
    
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `${accessToken}` : "", // Sends token with "Bearer" prefix
      },
      body: JSON.stringify(ingredientIDs),
    });
    const data = await checkResponse(response);
    dispatch(createOrderSuccess(data.order.number));
  } catch (error: any) {
    let errorMessage = "An unknown error occurred.";
  
    if (error instanceof SyntaxError && error.message.includes("Unexpected token")) {
      errorMessage = "Invalid response format: Expected JSON.";
    } else if (error.message) {
      errorMessage = error.message;
    }
  
    dispatch(createOrderFailure(errorMessage));
    console.log(error);
  }
};

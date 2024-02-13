import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
} from "../../components/OrderDetails/actions";
import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, AppThunk} from "../../utils/types";
import { getCookie } from "../../utils/api";

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

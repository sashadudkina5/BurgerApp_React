import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
} from "../../components/OrderDetails/actions";
import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";

export const createOrderThunk = (ingredientIDs) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredientIDs),
    });
    const data = await checkResponse(response);
    dispatch(createOrderSuccess(data.order.number));
  } catch (error) {
    dispatch(
      createOrderFailure("An error occurred while processing your request.")
    );
  }
};

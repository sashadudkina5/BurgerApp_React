import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
} from "../../components/OrderDetails/actions";
import { store } from "../store";
import { BASE_URL } from "../../utils/ApiConfig"

export const createOrderThunk = (
  ingredientIDs
) => async (
  dispatch
) => {
  try {
    dispatch(createOrderRequest());

    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientIDs),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createOrderSuccess(data.order.number));
    } else {
      const data = await response.json();
      dispatch(createOrderFailure(data.message));
    }
  } catch (error) {
    dispatch(createOrderFailure('An error occurred while processing your request.'));
  }
};

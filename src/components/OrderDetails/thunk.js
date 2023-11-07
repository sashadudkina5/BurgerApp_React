import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
} from "./actions";
import { store } from "../../redux_services/store";

export const createOrder = async (ingredientIDs) => {
  try {
    store.dispatch(createOrderRequest());

    const response = await fetch(
      "https://norma.nomoreparties.space/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredientIDs),
      }
    );

    if (response.ok) {
      const data = await response.json();
      store.dispatch(createOrderSuccess(data.order.number));
    } else {
      const data = await response.json();
      store.dispatch(createOrderFailure(data.message));
    }
  } catch (error) {
    store.dispatch(
      createOrderFailure("An error occurred while processing your request.")
    );
  }
};

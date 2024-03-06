import { checkResponse } from "../../utils/api";
import { BASE_URL } from "../../utils/ApiConfig";
import {AppDispatch} from "../../utils/types";
import {showDoneOrderDetails} from "../../components/DoneOrderDetails/actions"


/**
 * Thunk function for fetching order details by order number and dispatching them to the store.
 * If the request is successful, the fetched order details
 * are dispatched to the store using the `showDoneOrderDetails` action.
 * 
 * @param {string} orderNumber - The unique identifier for the order whose details are to be fetched.
 * 
 * @example
 * // Dispatch function to get order details and update the state in Redux
 * dispatch(getOrderDetailsThunk('12345'));
 */

export const getOrderDetailsThunk = (orderNumber: string) => async (
    dispatch: AppDispatch
  ) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${orderNumber}`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            },
          });

          const requestedOrderData = await checkResponse(response);
          const requestedOrder = requestedOrderData.orders[0]
          dispatch(showDoneOrderDetails(requestedOrder));
        } catch (err: any) {
          console.error('An unexpected error occurred:', err.message);
        }
      };
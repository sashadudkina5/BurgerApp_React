import { checkResponse } from "../../utils/api";
import { BASE_URL } from "../../utils/ApiConfig";
import {AppDispatch} from "../../utils/types";
import {showDoneOrderDetails} from "../../components/DoneOrderDetails/actions"


export const getOrderDetailsThunk = (orderID: string) => async (
    dispatch: AppDispatch
  ) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${orderID}`, {
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
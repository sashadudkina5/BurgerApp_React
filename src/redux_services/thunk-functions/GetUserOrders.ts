import { getCookie } from "../../utils/api";
import {AppDispatch} from "../../utils/types";
import {connect as OrdersConnect} from "../web-socket-actions";
import {WS_URL} from "../../utils/ApiConfig"


/**
 * Initiates a WebSocket connection to retrieve the current user's orders using an access token.
 * 
 * @example
 * // Dispatch function to initiate WebSocket connection for fetching user orders
 * dispatch(getUserOrders());
 */
export const getUserOrders = () => async (dispatch: AppDispatch) => {
    try {
      const accessToken = getCookie('accessToken');
      const tokenWithoutBearer = accessToken && accessToken.startsWith('Bearer ')
  ? accessToken.split(' ')[1]
  : accessToken;
  
      if (!accessToken) {
        console.error('AccessToken is missing');
        return null;
      }

      const connect = () => {
        dispatch(OrdersConnect(`${WS_URL}/orders?token=${tokenWithoutBearer}`));
      };
      connect();
    } catch (err: any) {
      console.error('An unexpected error occurred:', err.message);
      return null;
    } 
  };
import orderReducer from "./reducer";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CLEAN_ORDER_ID,
} from "../../redux_services/types-of-actions";
import { initialState } from "./reducer";

describe('create new order reducer', () => {

    const orderNumber = 123;


    it('should return the initial state', () => {
      expect(orderReducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle CREATE_ORDER_REQUEST action', () => {
      const action = {
        type: CREATE_ORDER_REQUEST,
      };
      const newState = orderReducer(initialState, action);
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });
  
    it('should handle CREATE_ORDER_SUCCESS action', () => {
  const requestAction = { type: CREATE_ORDER_REQUEST };
  const requestState = orderReducer(undefined, requestAction);

  const successAction = {
    type: CREATE_ORDER_SUCCESS,
    orderNumber,
  };
  const newState = orderReducer(requestState, successAction);

  expect(newState.loading).toBe(false);
  expect(newState.orderNumber).toBe(orderNumber);
  expect(newState.error).toBeNull();
});
  
    it('should handle CREATE_ORDER_FAILURE action', () => {
      const errorMessage = "An error occurred";
      const requestAction = { type: CREATE_ORDER_REQUEST };
      const requestState = orderReducer(undefined, requestAction);

      const failureAction = {
        type: CREATE_ORDER_FAILURE,
        errorMessage,
      };
      const newState = orderReducer(requestState, failureAction);
      expect(newState.loading).toBe(false);
      expect(newState.orderNumber).toBeNull();
      expect(newState.error).toBe(errorMessage);
    });
  
    it('should handle CLEAN_ORDER_ID action', () => {
        const requestAction = { type: CREATE_ORDER_REQUEST };
        const requestState = orderReducer(undefined, requestAction);

        const sucessAction = { type: CREATE_ORDER_SUCCESS };
        const sucessState = orderReducer(requestState, sucessAction);

      const action = {
        type: CLEAN_ORDER_ID,
      };
      const newState = orderReducer(sucessState, action);
      expect(newState.loading).toBe(false);
      expect(newState.orderNumber).toBeNull();
      expect(newState.error).toBeNull();
    });
  
    it('should return current state for unknown action types', () => {
      const currentState = {
        orderNumber: 456,
        loading: true,
        error: "Previous error",
      };
      const action = {
        type: 'UNKNOWN_ACTION',
      };
      const newState = orderReducer(currentState, action);
      expect(newState).toEqual(currentState);
    });
  });
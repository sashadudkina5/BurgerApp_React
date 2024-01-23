import {
    createOrderRequest,
    cleanOrderID,
    createOrderSuccess,
    createOrderFailure
  } from './actions';

  import {
    CREATE_ORDER_REQUEST,
    CLEAN_ORDER_ID,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE
  } from "../../redux_services/types-of-actions";
  
  describe('Create Order Actions', () => {
    it('should create an action for creating order request', () => {
      const action = createOrderRequest();
      const expectedAction = {
        type: CREATE_ORDER_REQUEST,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for cleaning order ID', () => {
      const action = cleanOrderID();
      const expectedAction = {
        type: CLEAN_ORDER_ID,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for creating order success', () => {
      const orderNumber = 123456;
      const action = createOrderSuccess(orderNumber);
      const expectedAction = {
        type: CREATE_ORDER_SUCCESS,
        orderNumber,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for creating order failure', () => {
      const error = { message: 'An error occurred' };
      const action = createOrderFailure(error);
      const expectedAction = {
        type: CREATE_ORDER_FAILURE,
        errorMessage: error.message,
      };
      expect(action).toEqual(expectedAction);
    });
  });
  
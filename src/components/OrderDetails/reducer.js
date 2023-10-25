import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
  } from './actions';
  
  const initialState = {
    orderNumber: null,
    loading: false,
    error: null
  };
  
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return { ...state, loading: true, error: null };
  
      case CREATE_ORDER_SUCCESS:
        return { ...state, loading: false, orderNumber: action.payload};
  
      case CREATE_ORDER_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
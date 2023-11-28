import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGIN_OUT_SUCCESS
} from "./actions";

// Исходное состояние
const initialState = {
  userData: {
    email: "",
    name: "",
  },
  isLoading: true,
  error: null,
  isLoggedIn: false,
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTRATION_REQUEST: {
      return { ...state, isLoading: true };
    }

    case GET_REGISTRATION_SUCCESS: {
      return {
        ...state,
        userData: {
          email: action.payload.email,
          name: action.payload.name,
        },
        isLoading: false,
        error: null,
      };
    }

    case GET_REGISTRATION_FAILED: {
      return {
        ...state,
        userData: { email: "", name: "" },
        isLoading: false,
        error: action.error,
      };
    }

    case GET_LOGIN_REQUEST: {
        return { ...state, isLoading: true };
      }
  
      case GET_LOGIN_SUCCESS: {
        return {
          ...state,
          userData: {
            email: action.payload.email,
            name: action.payload.name,
          },
          isLoading: false,
          isLoggedIn: true,
          error: null,
        };
      }
  
      case GET_LOGIN_FAILED: {
        return {
          ...state,
          userData: { email: "", name: "" },
          isLoading: false,
          error: action.error,
        };
      }

      case GET_LOGIN_OUT_SUCCESS: {
        return {
          ...state,
          userData: { email: "", name: "" },
          isLoggedIn: false,
      }
    };

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};

import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGIN_OUT_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_FAILED,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAILED,
  GET_LOGIN_OUT_REQUEST,
  GET_LOGIN_OUT_FAILURE
} from "../types-of-actions";

import {TUserDataActions} from "./actions"

// Исходное состояние
type TUserData = {
  email: string | undefined;
  name: string | undefined;
}

type TAppState = {
  userData: TUserData;
  isLoading: boolean;
  error: null | any;
  isLoggedIn: boolean;
  resetPasswordError: null | any;
  resetTokenInvalidError: null | any;
  changeProfileInfoResponse: null | string;
  logOutStatus: null | string;
}

export const initialState: TAppState = {
  userData: {
    email: "",
    name: "",
  },
  isLoading: true,
  error: null,
  isLoggedIn: false,
  resetPasswordError: null,
  resetTokenInvalidError: null,
  changeProfileInfoResponse: null,
  logOutStatus: null
};

export const userDataReducer = (state = initialState, action: TUserDataActions): TAppState => {
  switch (action.type) {
    case GET_REGISTRATION_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }

    case GET_REGISTRATION_SUCCESS: {
      return {
        ...state,
        userData: {
          email: action.registrationData.email,
          name: action.registrationData.name,
        },
        isLoading: false,
        error: null,
        isLoggedIn: true
      };
    }

    case GET_REGISTRATION_FAILED: {
      return {
        ...state,
        userData: { email: "", name: "" },
        isLoading: false,
        error: action.errorMessage,
      };
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordError: action.errorMessage,
      };
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetTokenInvalidError: action.errorMessage,
      };
    }

    case GET_LOGIN_REQUEST: {
        return { ...state, isLoading: true, error: null };
      }
  
      case GET_LOGIN_SUCCESS: {
        return {
          ...state,
          userData: {
            email: action.loginData.email,
            name: action.loginData.name,
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
          error: action.errorMessage,
        };
      }

      case GET_LOGIN_OUT_SUCCESS: {
        return {
          ...state,
          logOutStatus: null,
          userData: { email: "", name: "" },
          isLoggedIn: false,
          isLoading: false
      }
    };

    case GET_LOGIN_OUT_REQUEST: {
      return {
        ...state,
        logOutStatus: "Loading...",
    }
  };

  case GET_LOGIN_OUT_FAILURE: {
    return {
      ...state,
      logOutStatus: "Произошла ошибка выхода, попробуйте повторить попытку позже",
  }
};


    case CHANGE_PROFILE_SUCCESS: {
      return { ...state, changeProfileInfoResponse: "Ваши данные были успешно изменены" };
    }

    case CHANGE_PROFILE_FAILED: {
      return {
        ...state,
        changeProfileInfoResponse: "Произошла ошибка, повторите попытку позже",
      };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};

export default userDataReducer;

import {
  getLoginRequest,
  getLoginSuccess,
  getLoginFailed,
} from "../UserData/actions";
import { setCookie } from "../../utils/api";
import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, AppThunk} from "../../utils/types"

interface ILoginData {
  password: string;
  email: string;
}

/**
 * This function takes user login data (email and password), dispatches a login request action, and attempts to log the user in
 * by making a POST request to the login endpoint with the provided credentials. If the login is successful, it processes the response
 * to dispatch a login success action with the user data, and stores the access and refreshToken in cookies.
 *
 * @param {ILoginData} loginData - Object containing the user's email and password.
 * 
 * @example
 * // Dispatch the login thunk with user's login data to initiate the login process
 * dispatch(loginThunk({ email: 'user@example.com', password: 'password123' }));
 */
export const loginThunk = (loginData: ILoginData): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(getLoginRequest());

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(loginData),
    });

    const data = await checkResponse(response);

    dispatch(getLoginSuccess(data.user));
    setCookie("accessToken", data.accessToken); //sets with Bearer
    setCookie("refreshToken", data.refreshToken);
  } catch (error: any) {
    
    dispatch(getLoginFailed(error));
  }
};

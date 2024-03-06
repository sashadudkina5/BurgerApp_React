import {
  getRegistrationRequest,
  getRegistrationSuccess,
  getRegistrationFailed,
} from "../UserData/actions";
import { setCookie } from "../../utils/api";
import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import { AppDispatch, AppThunk } from "../../utils/types";

interface IregistrationData {
  password: string;
  email: string;
  name: string;
}

/**
 * This function takes registration data (email, password, and name), dispatches a registration request action,
 * and attempts to register the user by making a POST request to the registration endpoint with the provided information.
 * If the registration is successful, it processes the response to dispatch a registration success action with the user data,
 * and stores the accessToken and refreshToken in cookies for session management.
 *
 * @param {IregistrationData} registrationData - Object containing the new user's email, password, and name.
 * 
 * @example
 * // Dispatch the register thunk with new user's registration data to initiate the registration process
 * dispatch(registerThunk({ email: 'newuser@example.com', password: 'newpassword123', name: 'New User' }));
 */
export const registerThunk =
  (registrationData: IregistrationData): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(getRegistrationRequest());

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(registrationData),
      });

      const data = await checkResponse(response);

      dispatch(getRegistrationSuccess(data.user));
      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);
    } catch (error) {
      dispatch(getRegistrationFailed(error));
    }
  };

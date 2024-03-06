import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, ForgotPasswordThunk} from "../../utils/types";
import {resetPasswordFailed} from "../UserData/actions"

interface InewPasswordData {
  password: string | number;
  token: string | number;
}

/**
 * This function takes nnew password and a reset code, and dispatches an action to attempt
 * a password reset by making a POST request to the password reset endpoint.
 *
 * @param {InewPasswordData} newPasswordData - Object containing the new password and the code received for password reset.
 * 
 * @example
 * // Dispatch the resetPasswordThunk with the new password and token to initiate the password reset process
 * dispatch(resetPasswordThunk({ password: 'newSecurePassword123', token: 'resetToken123' }));
 */
export const resetPasswordThunk =
  (newPasswordData: InewPasswordData): ForgotPasswordThunk => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(newPasswordData),
      });

      await checkResponse(response);
      return Promise.resolve();
    } catch (error) {
      dispatch(resetPasswordFailed(error));
      return Promise.reject("Network error");
    }
  };

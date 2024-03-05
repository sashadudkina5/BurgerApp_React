import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, ForgotPasswordThunk} from "../../utils/types";
import {forgotPasswordFailed} from "../UserData/actions"

interface IEmailInfo {
  email: string;
}

/**
 * A thunk action for initiating a password reset process. 
 * It sends a POST request with the user's email.
 * @param {IEmailInfo} emailData - Object containing the user's email address.
 * @returns {ForgotPasswordThunk} A thunk function that executes the password 
 * reset operation and dispatches actions based on the result.
 */
export const forgotPasswordThunk =
  (emailData: IEmailInfo): ForgotPasswordThunk => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(emailData),
      });
      await checkResponse(response);
      return Promise.resolve();
    } catch (error) {
      dispatch(forgotPasswordFailed(error));
      return Promise.reject("Network error");
    }
  };

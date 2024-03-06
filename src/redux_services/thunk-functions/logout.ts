import { getCookie, deleteCookie } from "../../utils/api";
import { getLogOutSuccess, getLogOutRequest, getLogOutFailed } from "../UserData/actions";
import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, AppThunk} from "../../utils/types"


/**
 * This function initiates a logout request to the server using the stored access and refresh tokens.
 *  If the request is successful, it clears the access and refresh tokens
 * stored as cookies and dispatches a logout success action.
 * @example
 * // Dispatch the logout thunk to initiate user logout
 * dispatch(logoutThunk());
 */
export const logoutThunk = (): AppThunk => async (dispatch: AppDispatch) => {

  const refreshConfig = {
    token: getCookie("refreshToken"),
  };

  dispatch(getLogOutRequest());

  try {
    const accessToken = getCookie("accessToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers.Authorization = accessToken;
    }

    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(refreshConfig),
    });

    await checkResponse(response);
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    dispatch(getLogOutSuccess());
    return Promise.resolve();

  } catch (error) {
      console.error("Network error during logout:", error);
      dispatch(getLogOutFailed())
      return Promise.reject("Network error");
    }
  }

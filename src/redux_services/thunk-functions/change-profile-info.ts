import { getCookie, fetchWithRefresh } from "../../utils/api";
import { getLoginSuccess, changeProfileSuccess, changeProfileInfoFailed } from "../UserData/actions";
import { BASE_URL } from "../../utils/ApiConfig";
import {AppDispatch, ChangeProfileThunk} from "../../utils/types"

interface IСhangedData {
  email: string;
  password: string | number;
  name: string;
}

/**
 * Thunk action for changing user profile information.
 * It sends a PATCH request to the server with the changed data.
 * If the request is successful, it updates the user's login and profile information in the Redux store.
 * In case of an error, it dispatches an action to indicate the failure.
 *
 * @param {IСhangedData} changedData - The changed user data including email, password, and name.
 * @returns {ChangeProfileThunk} A thunk function that dispatches actions based on the outcome of the fetch request.
 * 
 * @example
 * dispatch(changeUserInfoThunk({ email: "newemail@example.com", password: "newpassword", name: "New Name" }));
 */
export const changeUserInfoThunk  =
  (changedData: IСhangedData):ChangeProfileThunk => async (dispatch: AppDispatch) => {
    try {
      const accessToken = getCookie("accessToken");

      if (!accessToken) {
        console.error("AccessToken is missing");
        return null;
      }

      const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedData),
      });
  
      if (response.success) {
        const userInfo = response.user;
        const userEmail: string = userInfo.email;
        const userName: string = userInfo.name;
        const loginData = {
          email: userEmail,
          name: userName,
        };
        dispatch(getLoginSuccess(loginData));
        dispatch(changeProfileSuccess());
      } else {
        console.error('Error:', response.message || 'Unknown error');
      }
    } catch (error: any) {
      dispatch(changeProfileInfoFailed());
      console.error('Network error:', error.message || 'Unknown error');
    }
  };

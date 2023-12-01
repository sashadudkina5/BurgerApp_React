import { getCookie, fetchWithRefresh } from "../../utils/api";
import { getLoginSuccess, getLoginRequest, getLoginFailed } from "../UserData/actions";
import { BASE_URL } from "../../utils/ApiConfig";

interface UserInfo {
  email: string;
  name: string;
}

export const getUserInfoThunk = () => async (
  dispatch: any
) => {
  try {
    dispatch(getLoginRequest());
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      console.error('AccessToken is missing');
      dispatch(getLoginFailed());
      return null;
    }

    const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    });

    // cant use CheckResponse here as response is not json type
    if (response.success) {
      const userInfo: UserInfo = response.user;
      const userEmail: string = userInfo.email;
      const userName: string = userInfo.name;
      const loginData = {
        email: userEmail,
        name: userName,
      };
      dispatch(getLoginSuccess(loginData));
      return userInfo;
    } else {
      console.error('Error getting user information');
      return null;
    }
  } catch (err: any) {
    console.error('An unexpected error occurred:', err.message);
    dispatch(getLoginFailed(err));
    return null;
  }
};
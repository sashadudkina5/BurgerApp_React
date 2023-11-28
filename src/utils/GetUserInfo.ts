import { getCookie, fetchWithRefresh } from "./api";
import { store } from "../redux_services/store";
import { getLoginSuccess, getLoginRequest, getLoginFailed } from "../redux_services/UserData/actions";
import { BASE_URL } from "./ApiConfig";

interface UserInfo {
  email: string;
  name: string;
}

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    store.dispatch(getLoginRequest());
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      console.error("AccessToken is missing");
      return null;
    }

    const response = await fetchWithRefresh(
      `${BASE_URL}/auth/user`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
        },
      }
    );

    if (response.success) {
      const userInfo: UserInfo = response.user;
      const userEmail: string = userInfo.email;
      const userName: string = userInfo.name;
      const loginData = {
        email: userEmail,
        name: userName,
      };
      store.dispatch(getLoginSuccess(loginData));
      return userInfo;
    } else {
      console.error("Error getting user information");
      return null;
    }
  } catch (err: any) {
    console.error("An unexpected error occurred:", err.message);
    store.dispatch(getLoginFailed(err));
    return null;
  }
};

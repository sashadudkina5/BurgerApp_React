import { getCookie, fetchWithRefresh } from "./api";
import { store } from "../redux_services/store";
import { getLoginSuccess } from "../redux_services/UserData/actions";
import { BASE_URL } from "./ApiConfig";

interface IСhangedData {
  email: string;
  password: string | number;
  name: string;
}

export const changeUserInfo = async (changedData: IСhangedData) => {
  console.log(JSON.stringify(changedData));
  try {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      console.error("AccessToken is missing");
      return null;
    }

    const response = await fetchWithRefresh(
      `${BASE_URL}/auth/user`,
      {
        method: "PATCH",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedData),
      }
    );

    if (response.success) {
      const userInfo = response.user;
      const userEmail: string = userInfo.email;
      const userName: string = userInfo.name;
      const loginData = {
        email: userEmail,
        name: userName,
      };
      store.dispatch(getLoginSuccess(loginData));
      return userInfo;
    } else {
      console.error("Error:", response.message || "Unknown error");
    }
  } catch (error: any) {
    console.error("Network error:", error.message || "Unknown error");
  }
};

import { getCookie, fetchWithRefresh } from "../utils/api";
import { store } from "../redux_services/store"; 
import { getLoginSuccess } from "../redux_services/userData/actions";


export const changeUserInfo = async (changedData) => {
    console.log(JSON.stringify(changedData))
  try {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      console.error("AccessToken is missing");
      return null;
    }

    const response = await fetchWithRefresh("https://norma.nomoreparties.space/api/auth/user", {
      method: "PATCH",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedData),
    });

    if (response.success) {
      const userInfo = response.user;
      const userEmail = userInfo.email;
      const userName = userInfo.name;
      const loginData = {
        email: userEmail,
        name: userName,
      };
      store.dispatch(getLoginSuccess(loginData));
      return userInfo;
    } else {
      console.error("Error:", response.message || "Unknown error");
    }
  } catch (error) {
    console.error("Network error:", error.message || "Unknown error");
  }
};

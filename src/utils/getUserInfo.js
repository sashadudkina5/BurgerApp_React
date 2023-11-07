import { getCookie, fetchWithRefresh } from "../utils/api";

export const getUserInfo = async () => {
    try {
      const accessToken = getCookie("accessToken");
  
      if (!accessToken) {
        console.error("AccessToken is missing");
        return null;
      }
  
      const response = await fetchWithRefresh("https://norma.nomoreparties.space/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: accessToken,
        },
      })

      if (response.success) {
        const userInfo = response.user
        return userInfo;
      } else {
        console.error("Error getting user information");
        return null;
    }
    } catch (err) {
      console.error("An unexpected error occurred:", err.message);
      return null;
    }
  };

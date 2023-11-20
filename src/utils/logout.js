import {getCookie, deleteCookie } from "../utils/api";
import {store} from "../redux_services/store";
import {getLogOutSuccess} from "../redux_services/userData/actions"

export const logout = async () => {

    const refreshConfig = {
      token: getCookie("refreshToken"),
    };
  
    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch("https://norma.nomoreparties.space/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refreshConfig),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          store.dispatch(getLogOutSuccess())

        } else {
          console.error("Error during logout");
        }
      } else {
        console.error("Error during logout");
      }
    } catch (error) {
      console.error("Network error during logout");
    }
  };
  
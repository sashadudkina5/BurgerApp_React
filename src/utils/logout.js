import {getCookie, deleteCookie } from "../utils/api";

export const logout = async () => {

    const refreshConfig = {
      token: getCookie("refreshToken"),
    };
  
    try {
      const response = await fetch("https://norma.nomoreparties.space/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refreshConfig),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
  
          // редирект на страницу входа
          //navigate("/login");
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
  
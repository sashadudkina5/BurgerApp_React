import {
  getLoginRequest,
  getLoginSuccess,
  getLoginFailed,
} from "../redux_services/UserData/actions";
import { store } from "../redux_services/store";
import { setCookie } from "./api";
import { BASE_URL } from "./ApiConfig";

interface ILoginData {
  password: string | number;
  email: string;
}

export const onLogin = async (loginData: ILoginData) => {
  try {
    store.dispatch(getLoginRequest());

    const response = await fetch(
      `${BASE_URL}/auth/login`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(loginData),
      }
    );
    if (response.ok) {
      const data = await response.json();
      store.dispatch(getLoginSuccess(data.user));

      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);
    } else {
      const data = await response.json();
      store.dispatch(getLoginFailed(data.message));
    }
  } catch (error) {
    store.dispatch(
      getLoginFailed("An error occurred while processing your request.")
    );
  }
};

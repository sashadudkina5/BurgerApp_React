import {
  getRegistrationRequest,
  getRegistrationSuccess,
  getRegistrationFailed,
} from "../UserData/actions";
import { store } from "../store";
import { setCookie } from "../../utils/api";
import { BASE_URL } from "../../utils/ApiConfig";

interface IregistrationData {
  password: string | number;
  email: string;
  name: string;
}

export const register = async (registrationData: IregistrationData) => {
  try {
    store.dispatch(getRegistrationRequest());

    const response = await fetch(
      `${BASE_URL}/auth/register`,
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
        body: JSON.stringify(registrationData),
      }
    );
    if (response.ok) {
      const data = await response.json();
      store.dispatch(getRegistrationSuccess(data.user));

      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);
    } else {
      const data = await response.json();
      store.dispatch(getRegistrationFailed(data.message));
    }
  } catch (error) {
    store.dispatch(
      getRegistrationFailed("An error occurred while processing your request.")
    );
  }
};

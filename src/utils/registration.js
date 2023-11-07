import {
  getRegistrationRequest,
  getRegistrationSuccess,
  getRegistrationFailed,
} from "../redux_services/userData/actions";
import { store } from "../redux_services/store";
import { setCookie } from "../utils/api";

export const register = async (registrationData) => {
  try {
    store.dispatch(getRegistrationRequest());

    const response = await fetch(
      "https://norma.nomoreparties.space/api/auth/register",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
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

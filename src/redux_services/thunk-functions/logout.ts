import { getCookie, deleteCookie } from "../../utils/api";
import { getLogOutSuccess } from "../UserData/actions";
import { BASE_URL } from "../../utils/ApiConfig";

export const logoutThunk = () => async (dispatch: any) => {
  const refreshConfig = {
    token: getCookie('refreshToken'),
  };

  try {
    const accessToken = getCookie('accessToken');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers.Authorization = accessToken;
    }

    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(refreshConfig),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(getLogOutSuccess());
      } else {
        console.error('Error during logout');
      }
    } else {
      console.error('Error during logout');
    }
  } catch (error) {
    console.error('Network error during logout');
  }
};

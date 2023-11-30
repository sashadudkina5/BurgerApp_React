import {
  getLoginRequest,
  getLoginSuccess,
  getLoginFailed,
} from '../UserData/actions';
import { setCookie } from '../../utils/api';
import { BASE_URL } from '../../utils/ApiConfig';

interface ILoginData {
  password: string;
  email: string;
}

export const loginThunk = (
  loginData: ILoginData
) => async (dispatch: any) => {
  try {
    dispatch(getLoginRequest());

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getLoginSuccess(data.user));

      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
    } else {
      const data = await response.json();
      dispatch(getLoginFailed(data.message));
    }
  } catch (error) {
    dispatch(
      getLoginFailed('An error occurred while processing your request.')
    );
  }
};
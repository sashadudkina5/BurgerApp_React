import { BASE_URL } from "./ApiConfig";

/**
 * Gets a specific cookie by name from the document's cookies.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string | undefined} The value of the cookie if found, otherwise undefined.
 */
export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Sets a cookie with a specified name and value, and optionally additional properties.
 * @param {string} name - The name of the cookie.
 * @param {any} value - The value of the cookie.
 * @param {any} [props] - Optional additional properties for the cookie (expires, path, domain, etc.).
 */
export function setCookie(name: string, value: any, props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

/**
 * Deletes a cookie by setting its expiration date to a past date.
 * @param {string} name - The name of the cookie to delete.
 */
export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

/**
 * Refreshes the authentication token by sending a POST request with the refreshToken.
 * @returns {Promise<{success: boolean, message?: string}>} An object indicating the success or failure of the token refresh operation.
 */
export const refreshToken = async () => {
  const refreshConfig = {
    token: getCookie("refreshToken"),
  };

  try {
    const response = await fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshConfig),
    });

    if (response.ok) {
      const data = await response.json();
      setCookie("accessToken", data.accessToken);
      return { success: true };
    } else {
      const errorData = await response.json();
      console.error("Error during token refresh:", errorData.message);
      return { success: false, message: errorData.message };
    }
  } catch (error: any) {
    console.error("Network error during token refresh:", error.message);
    return { success: false, message: "Network error during token refresh" };
  }
};

/**
 * Checks the response from a fetch call, parsing the JSON if successful, or throwing an error if not.
 * @param {Response} response - The response object from a fetch call.
 * @returns {Promise<any>} The parsed JSON from the response if successful.
 * @throws {Error} An error if the response is not ok.
 */
export const checkResponse = async (response: Response) => {
  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    console.error("Error in response:", errorData.message);
    throw new Error(errorData.message);
  }
};

/**
 * A fetch request with the provided URL and options, automatically attempting to refresh the token if necessary.
 * @param {any} url - The URL to fetch.
 * @param {any} options - The options for the fetch request.
 * @returns {Promise<any>} The response from the fetch call, parsed as JSON.
 */
export const fetchWithRefresh = async (url: any, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData: any = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;

      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

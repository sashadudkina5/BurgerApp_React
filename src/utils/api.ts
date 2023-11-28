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

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export const refreshToken = async () => {
    const refreshConfig = {
      token: getCookie("refreshToken"),
    };
  
    try {
      const response = await fetch("https://norma.nomoreparties.space/api/auth/token", {
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


  export const checkResponse = async (response: any) => {
    if (response.ok) {
        return response.json();
    } else {
        const errorData = await response.json();
        console.error("Error in response:", errorData.message);
        return Promise.reject(errorData);
    }
};

  
  export const fetchWithRefresh = async (url: string, options: any) => {
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
  
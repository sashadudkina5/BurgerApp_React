import { BASE_URL } from "./ApiConfig";

interface IEmailInfo {
  email: string;
}

export const forgotPassword = async (emailData: IEmailInfo) => {
  try {
    const response = await fetch(
      `${BASE_URL}/password-reset`,
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
        body: JSON.stringify(emailData),
      }
    );

    if (response.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject("Error");
    }
  } catch (error) {
    return Promise.reject("Network error");
  }
};

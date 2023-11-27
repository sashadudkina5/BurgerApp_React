import { BASE_URL } from "./ApiConfig";

interface InewPasswordData {
  password: string | number;
  token: string | number;
}

export const resetPassword = async (
  newPasswordData: InewPasswordData
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/password-reset/reset`,
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
        body: JSON.stringify(newPasswordData),
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

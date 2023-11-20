export const resetPassword = async (newPasswordData) => {
  try {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/password-reset/reset",
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
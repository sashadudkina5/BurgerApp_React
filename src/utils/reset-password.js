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
      if (!response.ok) {
        console.error("error");
      }
    } catch (error) {
        console.error("Network error");
      }
  };
  
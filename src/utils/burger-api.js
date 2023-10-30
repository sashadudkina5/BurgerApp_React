const NORMA_API = "https://norma.nomoreparties.space/api/ingredients";

export function getIngredients() {
  return fetch(`${NORMA_API}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных с сервера");
      }
      return response.json();
    })
    .then(data => data.data)
    .catch(error => {
      throw new Error("Не удалось загрузить данные. Попробуйте позже.");
    });
}


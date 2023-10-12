const NORMA_API = "https://norma.nomoreparties.space/api";

export function getIngredients() {
  return fetch(`${NORMA_API}/ingredients`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      return response.json();
    })
    .then(data => data.data)
    .catch(error => {
      throw new Error("Не удалось загрузить данные. Попробуйте позже.");
    });
}

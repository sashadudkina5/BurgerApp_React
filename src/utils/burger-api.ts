import { BASE_URL } from "./ApiConfig";


export function getIngredients() {
  return fetch(`${BASE_URL}/ingredients`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных с сервера");
      }
      return response.json();
    })
    .then((data) => data.data)
    .catch((error) => {
      throw new Error("Не удалось загрузить данные. Попробуйте позже.");
    });
}

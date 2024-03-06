import { BASE_URL } from "./ApiConfig";

/**
 * Fetches the list of ingredients from the server.
 * 
 * This function makes a GET request to the ingredients endpoint to retrieve the list of ingredients.
 *
 * @returns {Promise<Object>} A promise that resolves to the data part of the JSON response containing
 * the list of ingredients, or rejects with an error message if the fetch operation or response processing fails.
 * 
 * @example
 * // Call getIngredients and handle the response or error
 * getIngredients()
 *   .then(ingredientsList => console.log(ingredientsList))
 *   .catch(error => console.error(error.message));
 */
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

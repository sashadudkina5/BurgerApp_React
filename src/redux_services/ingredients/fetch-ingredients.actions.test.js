import {
    getIngredientsRequest,
    getIngredientsSuccess,
    getIngredientsFailed
  } from './actions';

  import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
  } from "../../redux_services/types-of-actions";
  
  describe('Get Ingredients Actions', () => {

    const ingredientsData = {
        data: [
          {
            type: "some_type",
            name: "Ingredient Name",
            price: 5.99,
            _id: "some_id",
            image: "ingredient_image.jpg",
            uniqID: "1234abc",
            calories: 150,
            proteins: 10,
            fat: 5,
            carbohydrates: 20,
            count: 1,
          },
        ],
      };

    it('should create an action for getting ingredients request', () => {
      const action = getIngredientsRequest();
      const expectedAction = {
        type: GET_INGREDIENTS_REQUEST,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for getting ingredients success', () => {
      const action = getIngredientsSuccess(ingredientsData);
      const expectedAction = {
        type: GET_INGREDIENTS_SUCCESS,
        ingredientsData,
      };
      expect(action).toEqual(expectedAction);
    });
  
    it('should create an action for getting ingredients failure', () => {
      const error = { message: 'An error occurred' };
      const action = getIngredientsFailed(error);
      const expectedAction = {
        type: GET_INGREDIENTS_FAILED,
        errorMessage: error.message,
      };
      expect(action).toEqual(expectedAction);
    });
  });
  
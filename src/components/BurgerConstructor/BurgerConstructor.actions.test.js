import {
    addIngredient,
    deleteIngredient,
    cleanConstructor,
    constructorReorder
  } from './actions';

  import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    CLEAN_CONSTRUCTOR,
    CONSTRUCTOR_REORDER
  } from "../../redux_services/types-of-actions";

  describe('burger Constructor Actions', () => {

    const ingredientObj = {
        type: 'some_type',
        name: 'Ingredient Name',
        price: 5.99,
        _id: 'some_id',
        image: 'ingredient_image.jpg',
        calories: 150,
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        count: 1,
      };

    it('should create an action to add an ingredient', () => {
      const action = addIngredient(ingredientObj);
      expect(action).toEqual({
        type: ADD_INGREDIENT,
        payload: { ingredientObj, uniqID: expect.any(String) },
      });
    });
  
    it('should create an action to delete an ingredient', () => {
      const ingredientObj = '1';
      const action = deleteIngredient(ingredientObj);
      expect(action).toEqual({
        type: DELETE_INGREDIENT,
        ingredientObj,
      });
    });
  
    it('should create an action to clean the constructor', () => {
      const action = cleanConstructor();
      expect(action).toEqual({
        type: CLEAN_CONSTRUCTOR,
      });
    });
  
    it('should create an action to reorder constructor elements', () => {
      const payload = { from: 1, to: 2 };
      const action = constructorReorder(payload);
      expect(action).toEqual({
        type: CONSTRUCTOR_REORDER,
        payload,
      });
    });
  });
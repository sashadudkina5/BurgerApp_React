import constructorReducer from "./reducer";
import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    CONSTRUCTOR_REORDER,
    CLEAN_CONSTRUCTOR
} from "../../redux_services/types-of-actions";
import { initialState } from "./reducer";

describe('burger constructor reducer', () => {

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

      const bunObject = {
        type: 'bun',
        name: 'Bun Name',
        price: 3.99,
        _id: 'bun_id',
        image: 'bun_image.jpg',
        calories: 120,
        proteins: 5,
        fat: 2,
        carbohydrates: 25,
        count: 1,
      };

      const uniqID = '1234abc';

      const currentState = {
        constructorIngredients: [
          { uniqID: '1', ingredientObj },
          { uniqID: '2', ingredientObj },
        ],
        bun: bunObject,
      };

    it("should return the initial state", () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState);
      });


    it('should handle ADD_INGREDIENT action', () => {
  
      const action = {
        type: ADD_INGREDIENT,
        payload: { ingredientObj, uniqID },
    };
  
      const newState = constructorReducer(initialState, action);

      expect(newState.constructorIngredients).toHaveLength(1);
      expect(newState.constructorIngredients[0].ingredientObj).toEqual(action.payload.ingredientObj);
      expect(newState.constructorIngredients[0].uniqID).toEqual(action.payload.uniqID);
    });
  
    it('should handle ADD_INGREDIENT action with bun type of ingredient', () => {  
      const action = {
        type: ADD_INGREDIENT,
        payload: { ingredientObj: bunObject, uniqID }
      };
  
      const newState = constructorReducer(initialState, action);
  
      expect(newState.bun).toEqual(bunObject);
    });
  
    it('should handle DELETE_INGREDIENT action', () => {
  
      const action = {
        type: DELETE_INGREDIENT,
        ingredientObj: '1',
      };
  
      const newState = constructorReducer(currentState, action);
  
      expect(newState.constructorIngredients).toHaveLength(1);
      expect(newState.constructorIngredients[0].uniqID).not.toEqual(action.ingredientObj);
    });
  
    it('should handle CONSTRUCTOR_REORDER action', () => {
  
      const action = {
        type: CONSTRUCTOR_REORDER,
        payload: { from: 0, to: 1 },
      };
  
      const newState = constructorReducer(currentState, action);
  
      expect(newState.constructorIngredients[0].uniqID).toEqual('2');
      expect(newState.constructorIngredients[1].uniqID).toEqual('1');
    });
  
    it('should handle CLEAN_CONSTRUCTOR action', () => {
  
      const action = {
        type: CLEAN_CONSTRUCTOR,
      };
  
      const newState = constructorReducer(currentState, action);
  
      expect(newState.constructorIngredients).toHaveLength(0);
      expect(newState.bun).toBeNull();
    });
  });
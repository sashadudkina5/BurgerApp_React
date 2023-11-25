import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    CONSTRUCTOR_REORDER
  } from "./actions";
  
  // Исходное состояние
  const initialState = {
    constructorIngredients: [],
    bun: null,
  };
  
  export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case ADD_INGREDIENT: {
          if (action.payload.type === "bun") {
              return {...state, bun: action.payload }
          }
  
        return {
          ...state,
          constructorIngredients: [
            ...state.constructorIngredients,
            action.payload,
          ],
        };
      }
  
      case DELETE_INGREDIENT: {
        return {
          ...state,
          constructorIngredients: state.constructorIngredients.filter(
            ({ uniqID }) => uniqID !== action.payload
          ),
        };
      }
  
      case CONSTRUCTOR_REORDER: {
        const constructorIngredients = [...state.constructorIngredients];
        constructorIngredients.splice(
          action.payload.to,
          0,
          constructorIngredients.splice(action.payload.from, 1)[0]
        );
        return  {
               ...state,
               constructorIngredients
        }
      }
  
      // Реакция на прочие типы экшенов
      default:
        return state;
    }
  };
  
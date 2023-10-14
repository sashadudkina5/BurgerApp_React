import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS,
} from "../ingredients/actions";

// Исходное состояние
const initialState = {
  ingredientsData: {
    data: [],
  },
  isLoading: false,
  error: null,
  constructorIngredients: [],
  ingredientDetails: [],
  isIngredientDetailModalOpen: false
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, isLoading: true };
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsData: { data: action.payload },
        isLoading: false,
      };
    }

    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsData: { data: [] },
        isLoading: false,
        error: action.error,
      };
    }

    case ADD_INGREDIENT: {
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

    case SHOW_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: [...state.ingredientDetails, action.payload],
        isIngredientDetailModalOpen: true
      };
    }

    case HIDE_INGREDIENT_DETAILS: {
      return { ...state, ingredientDetails: [], isIngredientDetailModalOpen: false };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};

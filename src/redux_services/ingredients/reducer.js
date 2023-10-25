import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from "../ingredients/actions";

// Исходное состояние
const initialState = {
  ingredientsData: {
    data: [],
  },
  isLoading: false,
  error: null,
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

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};

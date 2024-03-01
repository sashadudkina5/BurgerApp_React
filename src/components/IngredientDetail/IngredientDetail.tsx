import ingredientDetailStyles from "./IngredientDetail.module.css";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { getListOfIngredientsArray } from "../../redux_services/selectors";
import { reopenIngredientDetails } from "../IngredientDetail/actions";
import {IIngredients, IIngredientCard} from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos"

interface IIngredientDetailProps {
  selectedIngredient: IIngredientCard | null;
}

/**
 * Displays detailed information about a specific ingredient, including buns.
 * Used within a modal and within a separate window page to show selected ingredient's calories, proteins, fats,
 * and carbohydrates.
 * It retrieves the selected ingredient either from the passed `selectedIngredient` prop
 * or by matching the ingredient's ID from the URL parameters against the full list of ingredients
 * fetched from the Redux store.
 * 
 * @component
 * @param {IIngredientCard | null} props.selectedIngredient - The ingredient to display, if selected.
 */

function IngredientDetail({ selectedIngredient }: IIngredientDetailProps) {
  const dispatch = useAppDispatch();
  const routeParams = useParams();

  /**
   * Array of all available ingredients. Stored in redux 
 */
  const data: IIngredients = useAppSelector(getListOfIngredientsArray);
  const location = useLocation();

  // Checks URL parameter and fetches matching ingredient to redux store.
  React.useEffect(() => {
    if (location.pathname.startsWith('/ingredients/') && routeParams.id && data) {
      const filteredArray = data.filter(obj => obj._id === routeParams.id);
      if (filteredArray.length > 0) {
        dispatch(reopenIngredientDetails(filteredArray[0]));
      }
    }
  }, [location, routeParams.id, data, dispatch]);


  if (!selectedIngredient) {
    return null;
  }

  return (
    <div className={ingredientDetailStyles.wrapper}>
      <img
        className={ingredientDetailStyles.image}
        src={selectedIngredient.image}
        alt={selectedIngredient.name}
      />
      <p className={ingredientDetailStyles.name}>{selectedIngredient.name}</p>
      <div className={ingredientDetailStyles.details}>
        <ul className={ingredientDetailStyles.detailsList}>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {selectedIngredient.calories}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {selectedIngredient.proteins}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {selectedIngredient.fat}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {selectedIngredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default IngredientDetail;

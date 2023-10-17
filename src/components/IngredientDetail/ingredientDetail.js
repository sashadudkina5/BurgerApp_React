import ingredientDetailStyles from "./ingredientDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import {getIngredientDetails} from "../../redux_services/selectors";
import React from 'react'

function IngredientDetail({ingredient}) {

  const selectedIngredient = useSelector(getIngredientDetails);

  if (!selectedIngredient) {
    return null; // Return null if no ingredient is selected
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

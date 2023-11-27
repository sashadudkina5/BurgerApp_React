import ingredientDetailStyles from "./IngredientDetail.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getIngredientDetails } from "../../redux_services/selectors";
import React from "react";
import { useParams } from "react-router-dom";
import { getListOfIngredientsArray } from "../../redux_services/selectors";
import { reopenIngredientDetails } from "../IngredientDetail/actions";

interface IIngredientCard {
  type?: string;
  name: string;
  price: number;
  _id: string;
  image: string;
}

interface IIngredients extends Array<IIngredientCard> {}

function IngredientDetail() {
  const dispatch = useDispatch();

  const selectedIngredient = useSelector(getIngredientDetails);
  const routeParams = useParams();
  const data: IIngredients = useSelector(getListOfIngredientsArray);

  if (routeParams) {
  const filteredArray = data.filter((obj) => obj._id === routeParams.id);
  dispatch(reopenIngredientDetails(filteredArray[0]))
  }

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

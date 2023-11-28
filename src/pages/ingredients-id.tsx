import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBurgerIngredients } from "../redux_services/selectors";
import ingredientDetailStyles from "../components/IngredientDetail/IngredientDetail.module.css";
import { IIngredientCard} from "../components/App/App";

function IngredientDetailPageOpened() {

  const data = useSelector(getBurgerIngredients);

  const { id } = useParams();

  localStorage.setItem('currentRoute', '/ingredients/:id');

  const matchingObject: IIngredientCard | undefined = data.find(
    (obj: IIngredientCard) => obj._id === id
  );

  if (!matchingObject) return <p>Ingredient not found</p>;

  return (
    <div className={ingredientDetailStyles.wrapper}>
      <img
        className={ingredientDetailStyles.image}
        src={matchingObject.image}
        alt={matchingObject.name}
      />
      <p className={ingredientDetailStyles.name}>{matchingObject.name}</p>
      <div className={ingredientDetailStyles.details}>
        <ul className={ingredientDetailStyles.detailsList}>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {matchingObject.calories}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {matchingObject.proteins}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {matchingObject.fat}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {matchingObject.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default IngredientDetailPageOpened;

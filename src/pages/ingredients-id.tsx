import React from "react";
import { useParams } from "react-router-dom";
import { getBurgerIngredients } from "../redux_services/selectors";
import { IIngredientCard } from "../utils/types";
import IngredientDetail from "../components/IngredientDetail/IngredientDetail";
import { useAppSelector } from "../hooks/dispatch-selectos";


/**
 * Displays detailed information about a specific ingredient in a separate browser window.
 * Utilizes React Router's useParams hook to extract the ingredient ID from the URL and fetch the ingredient's data
 * from the Redux store.
 *
 * @component
 * @example
 * return <IngredientDetailPageOpened />;
 */
function IngredientDetailPageOpened() {

  /**
   * All the ingredients in the app, including buns
   */
  const data = useAppSelector(getBurgerIngredients);

   // Extract the ingredient ID from the URL parameters.
  const { id } = useParams();

  localStorage.setItem("currentRoute", "/ingredients/:id");

  /**
   * Finds the ingredient in the redux store that matches the ID from the URL parameters.
   * @type {IIngredientCard | undefined}
   */
  const matchingObject: IIngredientCard | undefined = data.find(
    (obj: IIngredientCard) => obj._id === id
  );

  if (!matchingObject) return <p>Ingredient not found</p>;

  return <IngredientDetail selectedIngredient={matchingObject} />;
}

export default IngredientDetailPageOpened;

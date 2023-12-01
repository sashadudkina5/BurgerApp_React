import React from "react";
import { useParams } from "react-router-dom";
import { getBurgerIngredients } from "../redux_services/selectors";
import { IIngredientCard } from "../utils/types";
import IngredientDetail from "../components/IngredientDetail/IngredientDetail";
import { useAppSelector } from "../hooks/dispatch-selectos";

function IngredientDetailPageOpened() {
  const data = useAppSelector(getBurgerIngredients);

  const { id } = useParams();

  localStorage.setItem("currentRoute", "/ingredients/:id");

  const matchingObject: IIngredientCard | undefined = data.find(
    (obj: IIngredientCard) => obj._id === id
  );

  if (!matchingObject) return <p>Ingredient not found</p>;

  return <IngredientDetail selectedIngredient={matchingObject} />;
}

export default IngredientDetailPageOpened;

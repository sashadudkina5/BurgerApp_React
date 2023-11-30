import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBurgerIngredients } from "../redux_services/selectors";
import {IIngredientCard} from "../utils/types";
import IngredientDetail from "../components/IngredientDetail/IngredientDetail"

function IngredientDetailPageOpened() {

  const data = useSelector(getBurgerIngredients);

  const { id } = useParams();

  localStorage.setItem('currentRoute', '/ingredients/:id');

  const matchingObject: IIngredientCard | undefined = data.find(
    (obj: IIngredientCard) => obj._id === id
  );

  if (!matchingObject) return <p>Ingredient not found</p>;

  return (
    <IngredientDetail selectedIngredient={matchingObject}/>
  );
}

export default IngredientDetailPageOpened;

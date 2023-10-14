import burgerIngredientsStyles from "./burgerIngredients.module.css";
import Tabs from "../Tabs/tabs";
import ProductCard from "../ProductCard/productCard";
import { useMemo } from "react";
import { applyPropTypesToArray } from "../../utils/prop-types";
import getListOfIngredients from "../../redux_services/selectors"
import { useDispatch, useSelector } from "react-redux";
import {showIngredientDetails} from "../../redux_services/ingredients/actions"

function BurgerIngredients({ ingredients }) {
  const dispatch = useDispatch();

  const openIngredientDetailModal = (ingredient) => {
    dispatch(showIngredientDetails(ingredient));
  };

  const bunIngredients = useMemo(
    () => ingredients?.filter((ingredient) => ingredient.type === "bun") || [],
    [ingredients]
  );
  
  const sauceIngredients = useMemo(
    () => ingredients?.filter((ingredient) => ingredient.type === "sauce") || [],
    [ingredients]
  );
  
  const mainIngredients = useMemo(
    () => ingredients?.filter((ingredient) => ingredient.type === "main") || [],
    [ingredients]
  );
  

  return (
    <div className={burgerIngredientsStyles.wrapper}>
      <h1
        className={`${burgerIngredientsStyles.title} text text_type_main-large`}
      >
        Соберите бургер
      </h1>
      <Tabs />
      <section className={burgerIngredientsStyles.section}>
        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Булки
        </h2>
        <ProductCard typeOfIngredient={bunIngredients} onClick={openIngredientDetailModal} />

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Соусы
        </h2>
        <ProductCard typeOfIngredient={sauceIngredients} onClick={openIngredientDetailModal} />

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Начинка
        </h2>
        <ProductCard typeOfIngredient={mainIngredients} onClick={openIngredientDetailModal} />
      </section>
    </div>
  );
}

applyPropTypesToArray(BurgerIngredients, "ingredients");

export default BurgerIngredients;

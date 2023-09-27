import burgerIngredientsStyles from "./burgerIngredients.module.css";
import MockData from "../../utils/utils";
import Tabs from "../Tabs/tabs";
import ProductCard from "../ProductCard/productCard";
import { useMemo } from "react";

function BurgerIngredients() {
  const mockDataInstance = new MockData();
  const ingredients = mockDataInstance.state.ingredients;
  const bunIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "bun"),
    [ingredients]
  );
  const sauceIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "sauce"),
    [ingredients]
  );
  const mainIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "main"),
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
        <ProductCard typeOfIngredient={bunIngredients} />

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Соусы
        </h2>
        <ProductCard typeOfIngredient={sauceIngredients} />

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Начинка
        </h2>
        <ProductCard typeOfIngredient={mainIngredients} />
      </section>
    </div>
  );
}

export default BurgerIngredients;

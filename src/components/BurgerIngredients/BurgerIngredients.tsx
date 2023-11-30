import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import Tabs from "../Tabs/Tabs";
import { useInView } from "react-intersection-observer";
import ProductCard from "../ProductCard/ProductCard";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { showIngredientDetails } from "../IngredientDetail/actions";
import {IIngredients, IIngredientCard} from "../../utils/types";


interface IBurgerIngredients {
  ingredients: IIngredients;
  onClick: (ingredient: IIngredientCard) => void;
}

function BurgerIngredients({ ingredients, onClick }: IBurgerIngredients) {
  const dispatch = useDispatch();

  const openIngredientDetailModal = (ingredient: IIngredientCard) => {
    dispatch(showIngredientDetails(ingredient));
  };

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  const [mainRef, inViewMain] = useInView({
    threshold: 0,
  });

  const bunIngredients = useMemo(
    () => ingredients?.filter((ingredient) => ingredient.type === "bun") || [],
    [ingredients]
  );

  const sauceIngredients = useMemo(
    () =>
      ingredients?.filter((ingredient) => ingredient.type === "sauce") || [],
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
      <Tabs
        inViewBuns={inViewBuns}
        inViewSauces={inViewSauces}
        inViewMain={inViewMain}
      />
      <section className={burgerIngredientsStyles.section}>
        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Булки
        </h2>
        <ProductCard
          typeOfIngredients={bunIngredients}
          onClick={openIngredientDetailModal}
          data-testid={`box`}
          ref={bunsRef}
        />

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Соусы
        </h2>
        <ProductCard
          typeOfIngredients={sauceIngredients}
          onClick={openIngredientDetailModal}
          data-testid={`box`}
          ref={saucesRef}
        />

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Начинка
        </h2>
        <ProductCard
          typeOfIngredients={mainIngredients}
          onClick={openIngredientDetailModal}
          data-testid={`box`}
          ref={mainRef}
        />
      </section>
    </div>
  );
}

export default BurgerIngredients;

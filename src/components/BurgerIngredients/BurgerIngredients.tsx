import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import Tabs from "../Tabs/Tabs";
import { useInView } from "react-intersection-observer";
import ProductCard from "../ProductCard/ProductCard";
import React, { useMemo, useState, useRef } from "react";
import { showIngredientDetails } from "../IngredientDetail/actions";
import { IIngredients, IIngredientCard } from "../../utils/types";
import { useAppDispatch } from "../../hooks/dispatch-selectos";

interface IBurgerIngredients {
  ingredients: IIngredients;
  onClick: (ingredient: IIngredientCard) => void;
}

/**
 * Displays ingredients categorized by type (buns, sauces, and mains).
 * Utilizes `react-intersection-observer` to detect when ingredient categories are in view,
 * enabling dynamic tab navigation. Provides functionality to open an ingredient detail
 * modal.
 * Each product can be dragged to the "BurgerConstructor" constructor area
 * 
 * @component
 * @param {IBurgerIngredients} props - Props for the BurgerIngredients component.
 * @param {IIngredients} props.ingredients - an array of all available ingredients objects. Including buns
 * @param {Function} props.onClick - Handler function to be called when an ingredient is clicked. When an ingredient is clicked,
 * it opens a modal with ingredient detail. Including buns.
 * 
 *  *  @example
 * return (
 *  <BurgerIngredients
    ingredients={data}
    onClick={openIngredientDetailModal}
    />
 * )
 */
function BurgerIngredients({ ingredients, onClick }: IBurgerIngredients) {
  const dispatch = useAppDispatch();

  /**
   * Handler to open the ingredient detail modal. Fetched ingredient detail to redux store.
   * Dispatches the showIngredientDetails action with the selected ingredient.
   * @param {IIngredientCard} ingredient - The ingredient for which details are to be shown.
   */
  const openIngredientDetailModal = (ingredient: IIngredientCard) => {
    dispatch(showIngredientDetails(ingredient));
  };

  // Hooks to monitor whether elements are in the viewport
  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  const [mainRef, inViewMain] = useInView({
    threshold: 0,
  });

  // Refs for scrolling to specific ingredient sections
  const bunsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const saucesTitleRef = useRef<HTMLHeadingElement | null>(null);
  const mainTitleRef = useRef<HTMLHeadingElement | null>(null);

  // Scroll handlers for each ingredient section
  const scrollToBuns = () =>
    bunsTitleRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const scrollToSauces = () =>
    saucesTitleRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const scrollToMain = () =>
    mainTitleRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  // Memoized selectors for filtering available ingredients by type
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
        onBunClick={scrollToBuns}
        onSauceClick={scrollToSauces}
        onMainClick={scrollToMain}
      />
      <section className={burgerIngredientsStyles.section}>
        <h2
          ref={bunsTitleRef}
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
          ref={saucesTitleRef}
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
          ref={mainTitleRef}
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

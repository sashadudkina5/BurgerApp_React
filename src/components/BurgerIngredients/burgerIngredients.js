import burgerIngredientsStyles from "./burgerIngredients.module.css";
import Tabs from "../Tabs/tabs";
import {useInView} from 'react-intersection-observer';
import ProductCard from "../ProductCard/productCard";
import { useMemo } from "react";
import { applyPropTypesToArray } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import {showIngredientDetails} from "../IngredientDetail/actions"
import {getBurgerIngredients} from "../../redux_services/selectors";

function BurgerIngredients({ ingredients }) {
  const dispatch = useDispatch();
  const data = useSelector(getBurgerIngredients)

  const openIngredientDetailModal = (ingredient) => {
    dispatch(showIngredientDetails(ingredient));
  };


  const [bunsRef, inViewBuns] = useInView({
    treshold: 0, 
  });

  const [saucesRef, inViewSauces] = useInView({
    treshold: 0, 
  });

  const [mainRef, inViewMain] = useInView({
    treshold: 0,
  });



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
      <Tabs inViewBuns={inViewBuns} inViewSauces={inViewSauces} inViewMain={inViewMain}/>
      <section className={burgerIngredientsStyles.section}>
        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Булки
        </h2>
        <ProductCard typeOfIngredient={bunIngredients} onClick={openIngredientDetailModal} data-testid={`box`} ref={bunsRef}/>

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Соусы
        </h2>
        <ProductCard typeOfIngredient={sauceIngredients} onClick={openIngredientDetailModal} data-testid={`box`} ref={saucesRef} />

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`}
        >
          Начинка
        </h2>
        <ProductCard typeOfIngredient={mainIngredients} onClick={openIngredientDetailModal} data-testid={`box`} ref={mainRef} />
      </section>
    </div>
  );
}

applyPropTypesToArray(BurgerIngredients, "ingredients");

export default BurgerIngredients;

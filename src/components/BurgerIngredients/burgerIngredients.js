import burgerIngredientsStyles from "./burgerIngredients.module.css";
import Tabs from "../Tabs/tabs";
import {useInView} from 'react-intersection-observer';
import ProductCard from "../ProductCard/productCard";
import { useMemo } from "react";
import { applyPropTypesToArray } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import {showIngredientDetails, addIngredient} from "../../redux_services/ingredients/actions"
import {getBurgerIngredients} from "../../redux_services/selectors";
import { useDrag } from 'react-dnd';
import { ItemTypes } from "../../utils/item-types-dnd"

function BurgerIngredients({ ingredients }) {
  const dispatch = useDispatch();
  const data = useSelector(getBurgerIngredients)

  const onAdd = (ingredientObj) => {
    dispatch(addIngredient(ingredientObj))
  }

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

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: {ProductCard},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        onAdd(item)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  

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
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`} ref={bunsRef}
        >
          Булки
        </h2>
        <ProductCard typeOfIngredient={bunIngredients} onClick={openIngredientDetailModal} data-testid={`box`}/>

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`} ref={saucesRef}
        >
          Соусы
        </h2>
        <ProductCard typeOfIngredient={sauceIngredients} onClick={openIngredientDetailModal} data-testid={`box`} />

        <h2
          className={`${burgerIngredientsStyles.title} text text_type_main-medium`} ref={mainRef}
        >
          Начинка
        </h2>
        <ProductCard typeOfIngredient={mainIngredients} onClick={openIngredientDetailModal} data-testid={`box`}/>
      </section>
    </div>
  );
}

applyPropTypesToArray(BurgerIngredients, "ingredients");

export default BurgerIngredients;

import burgerConstructorStyles from "./burgerConstructor.module.css";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { applyPropTypesToArray } from "../../utils/prop-types";
import { useSelector} from "react-redux";
import { getConstructorIngredients, getBunData } from "../../redux_services/selectors";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import { useMemo, useCallback } from "react";
import SortingIngredients from "../SortingIngredients/sortingIngredients"

function BurgerConstructor({ onClick }) {
  const data = useSelector(getConstructorIngredients);
  const bunData = useSelector(getBunData);


  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }


  const price = useMemo(() => {
    const bunPrice = bunData?.ingredient?.price || 0;
    const ingredientsPrice = data.reduce((s, v) => s + v.ingredient.price, 0);
    return bunPrice * 2 + ingredientsPrice;
  }, [data, bunData]);

  
  const renderCard = useCallback((card, index) => {
    return (
      <SortingIngredients
        index={index}
        key={card.uniqID}
        item={card}
      />
    )
  }, [])



  return (
    <div className={burgerConstructorStyles.wrapper} ref={drop}>

      {(bunData && bunData.ingredient) ? (
        <>
      <div className={burgerConstructorStyles.item}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={bunData.ingredient.name}
        price={bunData.ingredient.price}
        thumbnail={bunData.ingredient.image}
      />
      </div>

      <ul className={burgerConstructorStyles.list}>
      <div >{data.map((card, i) => renderCard(card, i))}</div>
      </ul>

      <div className={burgerConstructorStyles.item}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bunData.ingredient.name}
        price={bunData.ingredient.price}
        thumbnail={bunData.ingredient.image}
      />
      </div>
      </>) : (
         <>
        <p>Выберите булку и начинку</p>

        <ul className={burgerConstructorStyles.list}>
        <div >{data.map((card, i) => renderCard(card, i))}</div>
       </ul>
      </>
      )}
      <section className={burgerConstructorStyles.finalPrice}>
        <div className={burgerConstructorStyles.finalPriceWrapper}>
          <p className="text text_type_main-large">{price}</p>
          <CurrencyIcon width={"33px"} style={{ display: "block" }} />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={onClick}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </div>
  );
}

applyPropTypesToArray(BurgerConstructor, "ingredients");

export default BurgerConstructor;

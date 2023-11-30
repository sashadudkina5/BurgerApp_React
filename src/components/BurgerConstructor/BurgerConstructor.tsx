import burgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import {
  getConstructorIngredients,
  getBunData,
} from "../../redux_services/selectors";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import { useMemo, useCallback } from "react";
import SortingIngredients from "../SortingIngredients/SortingIngredients";
import {IIngredients, IIngredientCard} from "../../utils/types";


interface IBurgerConstructorProps {
  onClick: ((e: React.SyntheticEvent<Element, Event>) => void);
}

function BurgerConstructor({ onClick }: IBurgerConstructorProps) {
  const data: IIngredients = useSelector(getConstructorIngredients);
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
    const bunPrice = bunData?.price || 0;
    const ingredientsData: IIngredients = data || [];
    const ingredientsPrice = ingredientsData.reduce((s, v) => s + v.price, 0);
    return bunPrice * 2 + ingredientsPrice;
  }, [data, bunData]);

  const renderCard = useCallback((card: IIngredientCard, i: number) => {
    return <SortingIngredients index={i} key={card.uniqID} item={card} />;
  }, []);

  return (
    <div className={burgerConstructorStyles.wrapper} ref={drop}>
      {bunData ? (
        <>
          <div className={burgerConstructorStyles.item}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bunData.name} (верх)`}
              price={bunData.price}
              thumbnail={bunData.image}
            />
          </div>

          <ul className={burgerConstructorStyles.list}>
            <div>{data && data.map((card, i) => renderCard(card, i))}</div>
          </ul>

          <div className={burgerConstructorStyles.item}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bunData.name} (низ)`}
              price={bunData.price}
              thumbnail={bunData.image}
            />
          </div>
        </>
      ) : (
        <>
          <p>Выберите булку и начинку</p>

          <ul className={burgerConstructorStyles.list}>
            <div>{data && data.map((card, i) => renderCard(card, i))}</div>
          </ul>
        </>
      )}
      <section className={burgerConstructorStyles.finalPrice}>
        <div className={burgerConstructorStyles.finalPriceWrapper}>
          <p className="text text_type_main-large">{price}</p>
          <CurrencyIcon type="primary"/>
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

export default BurgerConstructor;

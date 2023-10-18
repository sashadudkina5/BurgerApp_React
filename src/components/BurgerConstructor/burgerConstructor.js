import burgerConstructorStyles from "./burgerConstructor.module.css";
import ProductAdded from "../ProductAdded/productAdded";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BunAddedInConstructor from "../BunAddedInConstructor/bunAddedInConstructor";
import { applyPropTypesToArray } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getConstructorIngredients, getBunData } from "../../redux_services/selectors";
import { deleteIngredient } from "../../redux_services/ingredients/actions";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import { useMemo } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ onClick }) {
  const dispatch = useDispatch();
  const data = useSelector(getConstructorIngredients);
  const bunData = useSelector(getBunData);

  const onDelete = (ingredientObj) => {
    dispatch(deleteIngredient(ingredientObj));
  };

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

  const mappedElements = useMemo(
    () =>
      data.map((item) => {
          return (
            <>
            <DragIcon />
            <ConstructorElement
              data-testid="dustbin"
              text={item.ingredient.name}
              price={item.ingredient.price}
              thumbnail={item.ingredient.image}
              handleClose={() => onDelete(item.uniqID)}
              key={item.uniqID}
            />
            </>
          )},
    [data]
  ));

  const price = useMemo(() => {
    const bunPrice = bunData?.ingredient?.price || 0;
    const ingredientsPrice = data.reduce((s, v) => s + v.ingredient.price, 0);
    return bunPrice * 2 + ingredientsPrice;
  }, [data, bunData]);



  return (
    <div className={burgerConstructorStyles.wrapper} ref={drop}>

      {(bunData && bunData.ingredient) ? (
         <>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={bunData.ingredient.name}
        price={bunData.ingredient.price}
        thumbnail={bunData.ingredient.image}
      />

      <ul className={burgerConstructorStyles.list}>{mappedElements}</ul>

      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bunData.ingredient.name}
        price={bunData.ingredient.price}
        thumbnail={bunData.ingredient.image}
      />
      </>) : (
         <>
        <p>Выберите булку и начинку</p>

      <ul className={burgerConstructorStyles.list}>{mappedElements}</ul>
      </>
      )}
      {/* <ul className={burgerConstructorStyles.list}>
        <BunAddedInConstructor
          image={"https://code.s3.yandex.net/react/code/bun-02.png"}
          name={"Краторная булка N-200i (верх)"}
          price={20}
        />
        <div className={burgerConstructorStyles.innerIngredients}>
          <ProductAdded ingredients={ingredients} />
        </div>
        <BunAddedInConstructor
          image={"https://code.s3.yandex.net/react/code/bun-02.png"}
          name={"Краторная булка N-200i (низ)"}
          price={20}
        />
      </ul>
  */}
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

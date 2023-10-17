import burgerConstructorStyles from "./burgerConstructor.module.css";
import ProductAdded from "../ProductAdded/productAdded";
import { Button, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BunAddedInConstructor from "../BunAddedInConstructor/bunAddedInConstructor";
import { applyPropTypesToArray } from "../../utils/prop-types";
import { useSelector, useDispatch } from "react-redux";
import {getConstructorIngredients} from '../../redux_services/selectors';
import {deleteIngredient, addIngredient} from "../../redux_services/ingredients/actions";
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/item-types-dnd'


function BurgerConstructor({ ingredients, onClick }) {

  const dispatch = useDispatch();
  const data = useSelector(getConstructorIngredients);

  const onDelete = (ingredientObj) => {
    dispatch(deleteIngredient(ingredientObj))
  }


  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }


  return (
    <div className={burgerConstructorStyles.wrapper} ref={drop} data-testid="dustbin">
         <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        handleClose = {onDelete}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
      />
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
          <p className="text text_type_main-large">610</p>
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

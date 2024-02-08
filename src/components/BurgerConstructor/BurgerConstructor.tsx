import burgerConstructorStyles from "./BurgerConstructor.module.css";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getConstructorIngredients,
  getBunData,
} from "../../redux_services/selectors";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import { useMemo, useCallback } from "react";
import SortingIngredients from "../SortingIngredients/SortingIngredients";
import {IIngredientCardConstructor, IAllIngredientsConstructor, AppDispatch} from "../../utils/types";
import { useAppSelector } from "../../hooks/dispatch-selectos";
import { useAppDispatch } from "../../hooks/dispatch-selectos";
import { addIngredient } from "../BurgerConstructor/actions";
import {IIngredientCard} from "../../utils/types";


interface IBurgerConstructorProps {
  onClick: ((e: React.SyntheticEvent<Element, Event>) => void);
}

type TDropCollectedProps = {
  isOver: boolean;
  canDrop: boolean;
}

function BurgerConstructor({ onClick }: IBurgerConstructorProps) {
  const dispatch: AppDispatch = useAppDispatch()

  const data: IAllIngredientsConstructor = useAppSelector(getConstructorIngredients);
  const bunData: IIngredientCard | null = useAppSelector(getBunData);


  const [{ canDrop, isOver }, drop] = useDrop<IIngredientCard, unknown, TDropCollectedProps>({
    accept: ItemTypes.BOX,
    drop: (item) => (dispatch(addIngredient(item))),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  const price = useMemo(() => {
    const bunPrice = bunData?.price || 0;
    const ingredientsData = data || [];
    const ingredientsPrice = ingredientsData.reduce((s, v) => s + v.ingredientObj!.price!, 0);
    return bunPrice * 2 + ingredientsPrice;
  }, [data, bunData]);

  const renderCard = useCallback((card: IIngredientCardConstructor, i: number) => {
    return <SortingIngredients index={i} key={card.uniqID} item={card} />;
  }, []);


  const renderContent = () => {

    if (!bunData && !data.length) {
      return <p>Выберите начинку и булку</p>;
    } else {
      return (
        <>
          {bunData && (
            <div className={burgerConstructorStyles.item}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bunData.name} (верх)`}
                price={bunData.price!}
                thumbnail={bunData.image!}
              />
            </div>
          )}
  
          <ul className={burgerConstructorStyles.list}>
            {data.map((card, i) => renderCard(card, i))}
            {isActive && (
              <div className={burgerConstructorStyles.placeholder}>
                Place your ingredient here
              </div>
            )}
          </ul>
  
          {bunData && (
            <div className={burgerConstructorStyles.item}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bunData.name} (низ)`}
                price={bunData.price!}
                thumbnail={bunData.image!}
              />
            </div>
          )}
          {bunData && !data.length && <p>Выберите начинку</p>}
          {data.length !== 0 && !bunData && <p>Выберите булку</p>}
        </>
      );
    }
  };
  


  return (
    <div className={`${burgerConstructorStyles.wrapper} targetitem`} ref={drop}>
      {renderContent()}
      <section className={burgerConstructorStyles.finalPrice}>
        <div className={burgerConstructorStyles.finalPriceWrapper}>
          <p className="text text_type_main-large">{price}</p>
          <CurrencyIcon type="primary" />
          <Button
            extraClass="order_button"
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

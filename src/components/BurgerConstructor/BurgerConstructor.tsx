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
import {
  IIngredientCardConstructor,
  IAllIngredientsConstructor,
  AppDispatch,
} from "../../utils/types";
import { useAppSelector } from "../../hooks/dispatch-selectos";
import { useAppDispatch } from "../../hooks/dispatch-selectos";
import { addIngredient } from "../BurgerConstructor/actions";
import { IIngredientCard } from "../../utils/types";

interface IBurgerConstructorProps {
  onClick: (e: React.SyntheticEvent<Element, Event>) => void;
}

type TDropCollectedProps = {
  isOver: boolean;
  canDrop: boolean;
};
/**
 * Allows users to construct their burger by dragging ingredients into the constructor area.
 * Displays the selected buns, ingredients, and the total price. Provides an "Order" button to send the order.
 *
 * Uses React DnD for drag-and-drop functionality.
 * Selected ingredients and buns are fetched to redux store
 *
 * @component
 * @param {IBurgerConstructorProps} props - The props for the BurgerConstructor component. Types for onClick function
 * @param {Function} props.onClick - Handler for the "Order" button click event.
 *
 *  @example
 * return (
 *   <BurgerConstructor onClick={openOrderDetailsModal} />
 * )
 */

function BurgerConstructor({ onClick }: IBurgerConstructorProps) {
  const dispatch: AppDispatch = useAppDispatch();

  /**
   * ingredinets added into the constructor area. Excluding buns.
   */
  const data: IAllIngredientsConstructor = useAppSelector(
    getConstructorIngredients
  );

  /**
   * Only buns added into the constructor area. Excluding other ingredients.
   */
  const bunData: IIngredientCard | null = useAppSelector(getBunData);

  /**
   * React DnD hook to handle ingredient dropping into the constructor area. Updates the Redux store with the dropped ingredient.
   * @type {TDropCollectedProps}
   */
  const [{ canDrop, isOver }, drop] = useDrop<
    IIngredientCard,
    unknown,
    TDropCollectedProps
  >({
    accept: ItemTypes.BOX,
    drop: (item) => {
      dispatch(addIngredient(item));
      console.log("drop");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  /**
   * Calculates the total price of the constructed burger using useMemo for performance optimization.
   * @returns {number} The total price of the burger.
   */
  const price = useMemo(() => {
    const bunPrice = bunData?.price || 0;
    const ingredientsData = data || [];
    const ingredientsPrice = ingredientsData.reduce(
      (s, v) => s + v.ingredientObj!.price!,
      0
    );
    return bunPrice * 2 + ingredientsPrice;
  }, [data, bunData]);

  /**
   * Renders a list ingredietns for each item in the constructor. Excluding buns
   * @param {IIngredientCardConstructor} card - The ingredient to render.
   * @param {number} i - The index of the ingredient in the list.
   * @returns {JSX.Element} The rendered list item.
   * Uses "SortingIngredients" component.
   * Essential to handle sorting of ingredients inside the constructor
   */
  const renderCard = useCallback(
    (card: IIngredientCardConstructor, i: number) => {
      return <SortingIngredients index={i} key={card.uniqID} item={card} />;
    },
    []
  );

  /**
   * Renders the content of the burger constructor based on selected ingredients and buns.
   * @returns {JSX.Element} The content of the constructor.
   */
  const renderContent = () => {
    // Conditional rendering based on selected bun and ingredients. Essential to display alerts
    if (!bunData && !data.length) {
      return <p className="text text_type_main-medium mb-10 mt-10">Перетащите сюда ингредиенты</p>;
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
    <div className={burgerConstructorStyles.wrapper}>
      <div
        ref={drop}
        className={`targetitem ${burgerConstructorStyles.targetitem} ${
          isOver ? burgerConstructorStyles.hovered : ""
        }`}
      >
        {renderContent()}
      </div>
      <section className={burgerConstructorStyles.finalPrice}>
        <div className={burgerConstructorStyles.finalPriceWrapper}>
          <div className={burgerConstructorStyles.currency_wrapper}>
            <p className="text text_type_main-large">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
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

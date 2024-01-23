import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import { addIngredient } from "../BurgerConstructor/actions";
import React from "react";
import {IIngredientCard} from "../../utils/types";
import { useAppDispatch } from "../../hooks/dispatch-selectos"

interface IProductItemProps {
  ingredient: IIngredientCard;
  children: React.ReactNode;
}

const ProductItem: React.FC<IProductItemProps> = ({ children, ingredient }) => {
  const dispatch = useAppDispatch()

  const onAdd = (ingredientObj: IIngredientCard) => {
    dispatch(addIngredient(ingredientObj));
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: ingredient,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onAdd(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div className="sourceitem" ref={drag} style={{ opacity }} data-testid={`box`}>
      {children}
    </div>
  );
};

export default ProductItem;

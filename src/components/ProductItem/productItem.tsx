import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import { useDispatch } from "react-redux";
import { addIngredient } from "../BurgerConstructor/actions";
import React from "react";

interface IIngredientItem {
  type?: string;
  name: string;
  price: number;
  _id: number;
  image: string;
}

interface IProductItemProps {
  ingredient: IIngredientItem;
  children: any;
}

const ProductItem: React.FC<IProductItemProps> = ({ children, ingredient }) => {
  const dispatch = useDispatch();

  const onAdd = (ingredientObj: IIngredientItem) => {
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
    <div ref={drag} style={{ opacity }} data-testid={`box`}>
      {children}
    </div>
  );
};

export default ProductItem;

import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import React from "react";
import {IIngredientCard} from "../../utils/types";

interface IProductItemProps {
  ingredient: IIngredientCard;
  children: React.ReactNode;
}

const ProductItem: React.FC<IProductItemProps> = ({ children, ingredient }) => {


  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const style = {
    opacity: isDragging ? 0.4 : 1,
    boxShadow: isDragging ? '0px 0px 24px 2px rgba(0,0,0,0.15)' : 'none',
    borderRadius: 30
  };

  return (
    <div className="sourceitem" ref={drag} style={style} data-testid={`box`}>
      {children}
    </div>
  );
};

export default ProductItem;

import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import React from "react";
import {IIngredientCard} from "../../utils/types";

interface IProductItemProps {
  ingredient: IIngredientCard;
  children: React.ReactNode;
}

/**
 * A draggable ingredient item for dragging to the burger constructor area.
 * Utilizes the React DnD (Drag and Drop) library.
 * 
 * @component
 * @param {IProductItemProps} props - The props for the ProductItem component.
 * @param {IIngredientCard} props.ingredient - The ingredient data for the item, including buns.
 * @param {React.ReactNode} props.children - All the ingredient content: counters, ingredient name and picture and so on.
 * 
 * @example
 * <ProductItem ingredient={ingredient}>
              <div
                key={ingredient._id}
                className={productCardStyles.productItem}
                onClick={() => openIngredientDetailModal(ingredient)}
                id={ingredient._id}
              >
                <Counter
                  count={ingredientsCounters[ingredient._id!] || 0}
                  size="default"
                  extraClass="m-1"
                />
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={productCardStyles.image}
                />
                <div className={productCardStyles.price_wrapper}>
                  <span className="text text_type_main-medium">
                    {ingredient.price}
                  </span>
                  <CurrencyIcon type="secondary" />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
              </div>
            </ProductItem>
 */
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

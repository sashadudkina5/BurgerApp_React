import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import sortingIngredientsStyles from "./SortingIngredientsStyles.module.css";
import { deleteIngredient } from "../BurgerConstructor/actions";
import { useRef } from "react";
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import { CONSTRUCTOR_REORDER } from "../../redux_services/types-of-actions";
import {IIngredientCardConstructor} from "../../utils/types";
import { useAppDispatch } from "../../hooks/dispatch-selectos"

interface ISortingIngredientsProps {
  item: IIngredientCardConstructor;
  index: number;
}

/**
 * Used within the BurgerConstructor component.
 * This component allows users to reorder or remove ingredients within the burger constructor by dragging.
 * Utilizes the `useDrag` and `useDrop` hooks.
 * It is rendered for each ingredient in the constructor through a `renderCard`.
 * 
 * @component
 * @param {ISortingIngredientsProps} props The props for the SortingIngredients component.
 * @param {IIngredientCardConstructor} props.item The ingredient item object.
 * @param {number} props.index The index of the ingredient item within the constructor list, used for reordering logic.
 */
const SortingIngredients: React.FC<ISortingIngredientsProps> = ({
  index,
  item,
}) => {

  const dispatch = useAppDispatch()

  /**
   * 
   * @param ingredientId - ingredient item, exluding buns. Matched by uniqID.
   * Deletes ingredient from the constructor
   */
  const onDelete = (ingredientId: string) => {
    dispatch(deleteIngredient(ingredientId));
  };

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.SORTED,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: ISortingIngredientsProps, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: CONSTRUCTOR_REORDER,
        payload: {
          from: dragIndex,
          to: hoverIndex,
        },
      });
      item.index = hoverIndex;
    },
  });

  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SORTED,
    item: () => ({
      index,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));



  return (
    <div ref={ref} data-handler-id={handlerId}>
      <div className={sortingIngredientsStyles.item} key={item.uniqID}>
        <DragIcon type="secondary"/>
        <ConstructorElement
          data-testid="dustbin"
          text={item.ingredientObj!.name|| ""}
          price={item.ingredientObj!.price || 0}
          thumbnail={item.ingredientObj!.image || ""}
          handleClose={() => onDelete(item.uniqID || "")}
          key={item.uniqID || ""}
        />
      </div>
    </div>
  );
};

export default SortingIngredients;

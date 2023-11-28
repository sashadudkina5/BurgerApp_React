import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import sortingIngredientsStyles from "./SortingIngredientsStyles.module.css";
import { deleteIngredient } from "../BurgerConstructor/actions";
import { useRef } from "react";
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import { ItemTypes } from "../../utils/item-types-dnd";
import { CONSTRUCTOR_REORDER } from "../BurgerConstructor/actions";
import {IIngredientCard} from "../App/App";

interface ISortingIngredientsProps {
  item: IIngredientCard;
  index: number;
}

const SortingIngredients: React.FC<ISortingIngredientsProps> = ({
  index,
  item,
}) => {
  const dispatch = useDispatch();
  const onDelete = (ingredientId: number) => {
    dispatch(deleteIngredient(ingredientId));
  };

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.BOX,
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
    type: ItemTypes.BOX,
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
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => onDelete(item.uniqID)}
          key={item.uniqID}
        />
      </div>
    </div>
  );
};

export default SortingIngredients;

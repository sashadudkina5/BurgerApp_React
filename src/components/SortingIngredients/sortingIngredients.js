import {
    DragIcon,
    ConstructorElement,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import sortingIngredientsStyles from "./sortingIngredientsStyles.module.css";
import { deleteIngredient } from "../../redux_services/ingredients/actions";
import { useRef } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { ItemTypes } from "../../utils/item-types-dnd";
import { getConstructorIngredients, getBunData } from "../../redux_services/selectors";

function SortingIngredients({ index, moveCard }) {
  const data = useSelector(getConstructorIngredients);

    const dispatch = useDispatch();
    const onDelete = (ingredientObj) => {
        dispatch(deleteIngredient(ingredientObj));
      };


      
      const ref = useRef(null)
      const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.BOX,
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index
          if (dragIndex === hoverIndex) {
            return
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()

          const hoverClientY = clientOffset.y - hoverBoundingRect.top

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }

          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }
          moveCard(dragIndex, hoverIndex)
          item.index = hoverIndex
        },
      })
      const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.BOX,
        item: () => {
          return { index }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      })
    
    const mappedElements = useMemo(
        () =>
          data.map((item) => (
            <div className={sortingIngredientsStyles.item} key={item.uniqID}>
              <DragIcon />
              <ConstructorElement
                data-testid="dustbin"
                text={item.ingredient.name}
                price={item.ingredient.price}
                thumbnail={item.ingredient.image}
                handleClose={() => onDelete(item.uniqID)}
                key={item.uniqID}
              />
            </div>
          )), [data, onDelete]
      );

      console.log(mappedElements)
      
      return   ( <div ref={ref} data-handler-id={handlerId}>
      {mappedElements}
    </div>)
}

export default SortingIngredients; 
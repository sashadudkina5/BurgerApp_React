import { useDrag } from 'react-dnd';
import { ItemTypes } from "../../utils/item-types-dnd";
import { useDispatch } from "react-redux";
import {addIngredient} from "../BurgerConstructor/actions";


function ProductItem ({children, ingredient}) {
    const dispatch = useDispatch();

  const onAdd = (ingredientObj) => {
    dispatch(addIngredient(ingredientObj))
  }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: {ingredient},
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult()
          if (item && dropResult) {
            onAdd(item)
          }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),
      }))
      const opacity = isDragging ? 0.4 : 1

    return (
      <div ref={drag} style={{ opacity }} data-testid={`box`}>
        {children}
      </div>
    );
  }

  export default ProductItem;
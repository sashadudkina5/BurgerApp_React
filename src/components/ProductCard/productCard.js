import productCardStyles from "./productCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { applyPropTypesToArray } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import {showIngredientDetails} from "../../redux_services/ingredients/actions"

function ProductCard(props) {

  const dispatch = useDispatch();

  const openIngredientDetailModal = (ingredient) => {
    dispatch(showIngredientDetails(ingredient));
  };


  return (
    <div className={productCardStyles.product}>
      {props.typeOfIngredient.map((ingredient) => (
        <div
          key={ingredient._id}
          className={productCardStyles.productItem}
          onClick={() => openIngredientDetailModal(ingredient)}
        >
          <Counter count={1} size="default" extraClass="m-1" />
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className={productCardStyles.image}
          />
          <span>
            <CurrencyIcon type="secondary" />
            <span className="text text_type_main-medium">
              {ingredient.price}
            </span>
          </span>
          <p className="text text_type_main-default">{ingredient.name}</p>
        </div>
      ))}
    </div>
  );
}

applyPropTypesToArray(ProductCard, "typeOfIngredient");

export default ProductCard;

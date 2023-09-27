import productCardStyles from "./productCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { applyPropTypesToArray } from "../../utils/prop-types";

function ProductCard(props) {
  return (
    <div className={productCardStyles.product}>
      {props.typeOfIngredient.map((ingredient) => (
        <div key={ingredient._id} className={productCardStyles.productItem}>
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

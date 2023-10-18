import productCardStyles from "./productCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { applyPropTypesToArray } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import {showIngredientDetails} from "../../redux_services/ingredients/actions";
import {getConstructorIngredients, getBunData} from "../../redux_services/selectors"
import React, {useMemo} from "react";
import ProductItem from "../ProductItem/productItem"

const ProductCard = React.forwardRef((props, ref) => {

  const dispatch = useDispatch();

  const openIngredientDetailModal = (ingredient) => {
    dispatch(showIngredientDetails(ingredient));
  };

  const data = useSelector(getConstructorIngredients);
  const bunData = useSelector(getBunData);

  const ingredientsCounters = useMemo(() => {
    const counters = {};
    data.forEach((ingredient) => {
      if (!counters[ingredient.ingredient._id]) {counters[ingredient.ingredient._id] = 0};
      counters[ingredient.ingredient._id]++;

      if (bunData) {counters[bunData.ingredient._id] = 2};
    })
    return counters;
  }, [data, bunData])

  return (
    <div className={productCardStyles.product} ref={ref}>
      {props.typeOfIngredient.map((ingredient) => (
        <ProductItem ingredient={ingredient}>
          <div key={ingredient._id}
          className={productCardStyles.productItem}
          onClick={() => openIngredientDetailModal(ingredient)}
        >
          <Counter count={ingredientsCounters[ingredient._id]} size="default" extraClass="m-1" name={ingredient.name}/>
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
        </ProductItem>
      ))}
    </div>
  );
})

applyPropTypesToArray(ProductCard, "typeOfIngredient");

export default ProductCard;

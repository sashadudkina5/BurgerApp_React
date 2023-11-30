import productCardStyles from "./ProductCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { showIngredientDetails } from "../IngredientDetail/actions";
import {
  getConstructorIngredients,
  getBunData,
} from "../../redux_services/selectors";
import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import { Link, useLocation } from "react-router-dom";
import {IIngredientCard} from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos"


interface IIngredients {
  onClick: (ingredient: IIngredientCard) => void;
  "data-testid": string;
  typeOfIngredients: Array<IIngredientCard>;
}

const ProductCard = React.forwardRef<HTMLDivElement, IIngredients>(
  (props, ref) => {
    let location = useLocation();

    const dispatch = useAppDispatch()

    const openIngredientDetailModal = (ingredient: IIngredientCard) => {
      dispatch(showIngredientDetails(ingredient));
    };

    const data = useAppSelector(getConstructorIngredients);
    const bunData = useAppSelector(getBunData);

    const [ingredientsCounters, setIngredientsCounters] = React.useState<{
      [key: string]: number;
    }>({});

    React.useEffect(() => {
      const counters: { [key: string]: number } = {};

      if (bunData) {
        counters[bunData._id] = 2;
      }

      data.forEach((ingredient: IIngredientCard) => {
        if (!counters[ingredient._id]) {
          counters[ingredient._id] = 0;
        }

        counters[ingredient._id]++;
      });

      setIngredientsCounters(counters);
    }, [data, bunData]);

    return (
      <div className={productCardStyles.product} ref={ref}>
        {props.typeOfIngredients.map((ingredient) => (
          <Link
            to={`/ingredients/${ingredient._id}`}
            state={{ backgroundLocation: location }}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            key={ingredient._id}
          >
            <ProductItem ingredient={ingredient}>
              <div
                key={ingredient._id}
                className={productCardStyles.productItem}
                onClick={() => openIngredientDetailModal(ingredient)}
              >
                <Counter
                  count={ingredientsCounters[ingredient._id] || 0}
                  size="default"
                  extraClass="m-1"
                />
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
          </Link>
        ))}
      </div>
    );
  }
);


export default ProductCard;

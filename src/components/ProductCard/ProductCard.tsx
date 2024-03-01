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
import {IIngredientCard, IIngredientCardConstructor} from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos";


interface IIngredients {
  onClick: (ingredient: IIngredientCard) => void;
  "data-testid": string;
  typeOfIngredients: Array<IIngredientCard>;
}
/**
 * Displays all the available ingredients and their name, image, count as list items in BurgerIngredients.
 * Clicking on a card opens a modal with ingredient details.
 * Contains ProductItem component, which is responsible for drag and drop functionality.
 * 
 * @component
 * @param typeOfIngredients - an array of ingredient objects. Essential for displaying different blocks of ingredients depending on the value of "type" key in the ingredient object
 * @param onClick - function for opnening modal with ingredient details
 * @param ref - defines to wich tab to refer the ingredient. Essential for navigating with Tabs.
 * 
 * @param `data-testid` - defines the drag and drop target
 * @example 
 *  <ProductCard
      typeOfIngredients={sauceIngredients}
      onClick={openIngredientDetailModal}
      data-testid={`box`}
      ref={saucesRef}
     />
 */
const ProductCard = React.forwardRef<HTMLDivElement, IIngredients>(
  (props, ref) => {
    let location = useLocation();

    const dispatch = useAppDispatch()

    /**
     * Opens the modal with ingredient details.
     * @param ingredient - clicked on ingredient. 
     */
    const openIngredientDetailModal = (ingredient: IIngredientCard) => {
      dispatch(showIngredientDetails(ingredient));
    };

    /**
     * Ingredients already added to the constructor. Excluding buns
     */
    const data = useAppSelector(getConstructorIngredients);

     /**
     * Buns already added to the constructor. Excluding other ingredients
     */
    const bunData = useAppSelector(getBunData);

    const [ingredientsCounters, setIngredientsCounters] = React.useState<{
      [key: string]: number;
    }>({});

    /**
     * Counters if item added to the constructor. Buns count as x2
     */
    React.useEffect(() => {
      const counters: { [key: string]: number } = {};

      if (bunData) {
        counters[bunData._id!] = 2;
      }

      data.forEach((ingredient: IIngredientCardConstructor) => {
        const ingredientId = ingredient.ingredientObj!._id!;
        if (!counters[ingredientId]) {
          counters[ingredientId] = 0;
        }

        counters[ingredientId]++;
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
          </Link>
        ))}
      </div>
    );
  }
);


export default ProductCard;

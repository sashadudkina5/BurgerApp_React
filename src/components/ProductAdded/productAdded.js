import productAddedStyles from "./productAdded.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DeleteIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { applyPropTypesToArray } from "../../utils/prop-types";

function ProductAdded(props) {
  return (
    <>
      {props.ingredients.map((ingredient) => (
        <li className={productAddedStyles.listItem}>
          <DragIcon />
          <div key={ingredient._id} className={productAddedStyles.productItem}>
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className={productAddedStyles.image}
            />
            <p
              className={`text text_type_main-default ${productAddedStyles.name}`}
            >
              {ingredient.name}
            </p>
            <div>
              <span className="text text_type_main-medium">
                {ingredient.price}
              </span>
              <CurrencyIcon type="secondary" />
            </div>
            <DeleteIcon />
          </div>
        </li>
      ))}
    </>
  );
}

applyPropTypesToArray(ProductAdded, "ingredients");

export default ProductAdded;

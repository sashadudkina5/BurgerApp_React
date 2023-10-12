import bunAddedInConstructorStyles from "./bunAddedInConstructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LockIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { applyPropTypesToComponent } from "../../utils/prop-types";

<LockIcon type="secondary" />;

function BunAddedInConstructor(props) {
  return (
    <>
      <li className={bunAddedInConstructorStyles.listItem}>
        <div className={bunAddedInConstructorStyles.productItem}>
          <img
            src={props.image}
            alt={props.name}
            className={bunAddedInConstructorStyles.image}
          />
          <p
            className={`text text_type_main-default ${bunAddedInConstructorStyles.name}`}
          >
            {props.name}
          </p>
          <div>
            <span className="text text_type_main-medium">{props.price}</span>
            <CurrencyIcon type="secondary" />
          </div>
          <LockIcon />
        </div>
      </li>
    </>
  );
}

applyPropTypesToComponent(BunAddedInConstructor);

export default BunAddedInConstructor;

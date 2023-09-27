import burgerConstructorStyles from "./burgerConstructor.module.css";
import MockData from "../../utils/utils";
import ProductAdded from "../ProductAdded/productAdded";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BunAddedInConstructor from "../BunAddedInConstructor/bunAddedInConstructor";

function BurgerConstructor() {
  const mockDataInstance = new MockData();
  const ingredients = mockDataInstance.state.ingredients;

  return (
    <div className={burgerConstructorStyles.wrapper}>
      <ul className={burgerConstructorStyles.list}>
        <BunAddedInConstructor
          image={"https://code.s3.yandex.net/react/code/bun-02.png"}
          name={"Краторная булка N-200i (верх)"}
          price={"20"}
        />
        <div className={burgerConstructorStyles.innerIngredients}>
          <ProductAdded ingredients={ingredients} />
        </div>
        <BunAddedInConstructor
          image={"https://code.s3.yandex.net/react/code/bun-02.png"}
          name={"Краторная булка N-200i (низ)"}
          price={"20"}
        />
      </ul>
      <section className={burgerConstructorStyles.finalPrice}>
        <div className={burgerConstructorStyles.finalPriceWrapper}>
          <p className="text text_type_main-large">610</p>
          <CurrencyIcon width={"33px"} style={{ display: "block" }} />
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    </div>
  );
}

export default BurgerConstructor;

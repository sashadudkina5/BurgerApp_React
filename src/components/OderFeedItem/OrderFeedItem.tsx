import styles from "./OderFeedItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getReadyOrders,
  getListOfIngredients,
} from "../../redux_services/selectors";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos";

const OrderFeedItem = () => {
  const dispatch = useAppDispatch();

  const readyOrders = useAppSelector(getReadyOrders);
  const allIngredients = useAppSelector(getListOfIngredients);

  const ingredientPricesMap = allIngredients.ingredientsData.data
    .filter((ingredient) => ingredient.price !== undefined)
    .map(
      (ingredient) => [ingredient._id, ingredient.price] as [string, number]
    );

  const ordersWithTotalPrice = readyOrders.map((order) => {
    const totalPrice = order.ingredients.reduce((sum, ingredientId) => {
      const ingredientPrice = ingredientPricesMap.find(
        ([_id]) => _id === ingredientId
      )?.[1];

      if (ingredientPrice !== undefined) {
        return sum + ingredientPrice;
      } else {
        console.warn(`Price not found for ingredient with ID ${ingredientId}`);
        return sum;
      }
    }, 0);

    return {
      order,
      totalPrice,
    };
  });

  // console.log(ordersWithTotalPrice);

  return (
    <>
      {ordersWithTotalPrice.map(({ order, totalPrice }) => (
        <li className={styles.feed_section_item} key={order.number}>
          <div className={styles.order_info_wrapper}>
            <p className="text text_type_main-default">{`#${order.number}`}</p>
            <p className="text text_type_main-default text_color_inactive">
              <time dateTime="2008-02-14 20:00">{order.createdAt}</time>
            </p>
          </div>
          <h2 className="text text_type_main-medium">{order.name}</h2>
          <div className={styles.order_info_wrapper}>
            <div>Картинки</div>
            <div className={styles.order_info_wrapper}>
              <p className="text text_type_digits-default">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default OrderFeedItem;

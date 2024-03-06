import styles from "./OderFeedItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getAllCreatedOrders,
  getListOfIngredients,
  isWSLoading,
  getWSError,
} from "../../redux_services/selectors";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos";
import moment from "moment";
import "moment/locale/ru";
import { TOrder } from "../../utils/types";
import React, { MouseEvent } from "react";
import { showDoneOrderDetails } from "../DoneOrderDetails/actions";
import { Link, useLocation } from "react-router-dom";

/**
 * Reusable component that renders each order in the list. Orders are fetched from WebSocket.
 * Users can click on an order to view detailed information in a modal.
 * Handles loading states and displays appropriate messages for loading and connection errors.
 *
 * @component
 */
function OrderFeedItem() {
  let location = useLocation();
  const dispatch = useAppDispatch();

  /**
   * Last 50 orders recieved from WebSocket. All statuses. Stored in redux
   */
  const allCreatedOrders = useAppSelector(getAllCreatedOrders);

  /**
   * Array of all ingredientes available. Stores in redux
   */
  const allIngredients = useAppSelector(getListOfIngredients);

  /**
   * True if WebSocket connection is loading. Stored in redux
   */
  const WSLoading = useAppSelector(isWSLoading);

  /**
   * Error in WebSocket response. Stored in redux
   */
  const connectionError = useAppSelector(getWSError);

  if (WSLoading) {
    return <p className="text text_type_main-default">Loading...</p>;
  }

  // Displays a message when there are connection errors
  if (connectionError !== "") {
    return (
      <p className="text text_type_main-default">
        Ошибка подключения. Повторите попытку позже
      </p>
    );
  }

  // Displays a message when there are no orders.
  if (!allCreatedOrders || allCreatedOrders.length === 0) {
    return <p className="text text_type_main-default">Заказов пока нет</p>;
  }

  /**
   * Function fetches clicked order into redux store.
   * The modal with order details is opened.
   *
   * @param event
   * @param selectedOrder - an order clicked by user
   */
  const handleClick = (
    event: MouseEvent<HTMLLIElement>,
    selectedOrder: TOrder
  ) => {
    dispatch(showDoneOrderDetails(selectedOrder));
  };

  /**
   * Array of [name of ingredient, its price] elements.
   */
  const ingredientPricesMap = allIngredients.ingredientsData.data
    .filter((ingredient) => ingredient.price !== undefined)
    .map(
      (ingredient) => [ingredient._id, ingredient.price] as [string, number]
    );

  /**
   * Array of order object and its total price
   */
  const ordersWithTotalPrice = allCreatedOrders.map((order) => {
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

  /**
   * Array of images of all ingredients available
   */
  const imageMap = allIngredients.ingredientsData.data.reduce(
    (map, ingredient) => {
      map[ingredient._id as string] = ingredient.image;
      return map;
    },
    {} as Record<string, string | undefined>
  );

  /**
   * Array of order object and its ingredients images
   */
  const ordersWithImages = allCreatedOrders.map((order) => {
    const images = order.ingredients.map(
      (ingredientId: string) => imageMap[ingredientId]
    );

    return {
      order,
      images,
    };
  });

  return (
    <>
      {ordersWithTotalPrice.map(({ order, totalPrice }) => (
        <Link
          to={`/feed/${order.number}`}
          state={{ backgroundLocation: location }}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
          key={order._id}
        >
          <li
            className={styles.feed_section_item}
            key={order.number}
            onClick={(event) => handleClick(event, order)}
          >
            <div className={styles.order_info_wrapper}>
              <p className="text text_type_main-default">{`#${order.number}`}</p>
              <p className="text text_type_main-default text_color_inactive">
                <time dateTime={moment(order.createdAt).format()}>
                  {moment(order.createdAt).calendar(null, {
                    sameDay: "[Сегодня], LT",
                    lastDay: "[Вчера], LT",
                    lastWeek: "DD.MM.YYYY, LT",
                    sameElse: "DD.MM.YYYY, LT",
                  })}
                </time>
              </p>
            </div>
            <h2 className="text text_type_main-medium">{order.name}</h2>
            <div className={styles.order_info_wrapper}>
              <div className={styles.images_container}>
                {ordersWithImages
                  .find((item) => item.order === order)
                  ?.images.map((imageUrl, index) => (
                    <div
                      className={styles.imageWrapper}
                      key={index}
                      style={{
                        zIndex: ordersWithImages.length + index,
                      }}
                    >
                      {imageUrl && (
                        <img
                          className={styles.ingredient_image}
                          src={imageUrl}
                          alt={`Ingredient ${index}`}
                        />
                      )}
                    </div>
                  ))}
              </div>
              <div className={styles.order_info_wrapper}>
                <p className="text text_type_digits-default">{totalPrice}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </li>
        </Link>
      ))}
    </>
  );
}

export default OrderFeedItem;

import React, { useState, useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder, IIngredients } from "../../utils/types";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos";
import {
  getAllCreatedOrders,
  isWSLoading,
  getListOfIngredientsArray,
} from "../../redux_services/selectors";
import { reopenDoneOrderDetails } from "./actions";
import moment from "moment";
import "moment/locale/ru";
import DoneOrderDetailsStyles from "./DoneOrderDetails.module.css";
import { statusTexts } from "../../utils/order-statuses";

interface DoneOrderDetailsProps {
  matchingOrder: TOrder | null;
}

/**
 * Displays detailed information about a specific order.
 * It utilizes React Router's useParams to extract the order ID from the URL and fetches the order
 * details based on this ID. The component shows the order number, name, status, list of ingredients,
 * and the total price of the order. It supports re-opening order details after a page refresh.
 * The component is also used as a single page content, in case of pasting the URL in new browser window.
 *
 * @component
 * @param {DoneOrderDetailsProps} props - Props containing the matched order details.
 * @param {TOrder | null} props.matchingOrder - The order object to display details for, or null if no order is matched. The order thaty was clicked on or the one requested in a separate browser window.
 * @example
 * return (
 * <DoneOrderDetails matchingOrder={selectedOrder} />
 * )
 *
 */
function DoneOrderDetails({ matchingOrder }: DoneOrderDetailsProps) {
  // React Router hook for accessing URL parameter ID
  const routeParams = useParams();

  /**
   * An array of last 50 orders fetched by websocket
   */
  const readyOrders = useAppSelector(getAllCreatedOrders);
  const dispatch = useAppDispatch();
  /**
   * Checks if WebSocket is in the loading state
   */
  const WSLoading = useAppSelector(isWSLoading);

  /**
   * Array of all the ingredients available in the app
   */
  const allIngredients = useAppSelector(getListOfIngredientsArray);

  // Effect to handle modal display for order details upon page refresh
  useEffect(() => {
    if (!matchingOrder && !WSLoading) {
      // Converts "id" from URL string to number. Essential because URL paramenter is a string
      const orderNumber = Number(routeParams.id);
      /**
       * Object of the order, that matches its number with URL id parametr
       */
      const filteredArray = readyOrders.filter(
        (obj) => obj.number === orderNumber
      );

      if (filteredArray.length > 0) {
        dispatch(reopenDoneOrderDetails(filteredArray[0]));
      } else {
      }
    }
  }, [dispatch, routeParams, readyOrders, WSLoading, matchingOrder]);

  /**
   * Function to find ingredients from the order in the list of available ingredients by matching their IDs. Returns an array of ingredients.
   */
  function getMatchingIngredients(
    matchingOrder: TOrder | null,
    allIngredients: IIngredients | null
  ) {
    return (
      allIngredients?.filter((ingredient) =>
        matchingOrder?.ingredients.includes(ingredient._id!)
      ) || []
    );
  }

  /**
   * Array ingredients present in the order.
   */
  const matchingIngredients = getMatchingIngredients(
    matchingOrder,
    allIngredients
  );

  /**
   * Returns an array of ordered ingredients' count and their details
   */
  const [orderedIngredients, setOrderedIngredients] = useState<IIngredients>(
    []
  );

  useEffect(() => {
    /**
     * Computes the count of each ingredient in the given order.
     * Utilizes the order's ingredient IDs to match against the full ingredient list.
     *
     * @param {TOrder | null} matchingOrder - The currently selected order to analyze.
     * @param {IIngredients | null} matchingIngredients - The list of all ingredients to match the order's ingredient IDs.
     */
    function getCountOfIngredients(
      matchingOrder: TOrder | null,
      matchingIngredients: IIngredients | null
    ) {
      if (!matchingOrder || !matchingIngredients) {
        return [];
      }
      const orderIngredientsIDs = matchingOrder.ingredients;
      const ingredientCounts = orderIngredientsIDs.reduce((counts, id) => {
        counts[id] = (counts[id] || 0) + 1;
        return counts;
      }, {} as Record<string, number>);

      const orderIngredients: IIngredients = [];

      for (const id in ingredientCounts) {
        const count = ingredientCounts[id];
        const matchingIngredient = matchingIngredients.find(
          (ingredient) => ingredient._id === id
        );

        if (matchingIngredient) {
          orderIngredients.push({ ...matchingIngredient, count });
        }
      }
      setOrderedIngredients(orderIngredients);
    }

    getCountOfIngredients(matchingOrder, matchingIngredients);
  }, [matchingOrder]);

  /**
   * Function counts total price of the order
   */
  function calculateTotalPrice(orderedIngredients: IIngredients | null) {
    let totalPrice = 0;
    if (orderedIngredients) {
      for (const ingredient of orderedIngredients) {
        totalPrice += ingredient.price! * ingredient.count!;
      }
    }
    return totalPrice;
  }

  /**
   * The total order price
   */
  const totalOrderPrice = calculateTotalPrice(orderedIngredients);

  /**
   * The selected order's status
   */
  const statusText = matchingOrder && statusTexts[matchingOrder.status];

  if (WSLoading || !matchingOrder) {
    return <p>Loading...</p>;
  }

  if (WSLoading) return <p>Loading...</p>;

  if (!matchingOrder && !WSLoading) return <p>Order not found</p>;

  return (
    <section className={DoneOrderDetailsStyles.wrapper}>
      <p
        className={`text text_type_digits-default mb-10 ${DoneOrderDetailsStyles.order_number}`}
      >
        #{matchingOrder!.number}
      </p>
      <h1
        className="text text_type_main-medium mb-3"
        style={{ textAlign: "left" }}
      >
        {matchingOrder!.name}
      </h1>
      <p
        className="text text_type_main-small mb-3"
        style={{ textAlign: "left" }}
      >
        {statusText && <span>{statusText}</span>}
      </p>
      <p
        className="text text_type_main-medium mb-6"
        style={{ textAlign: "left" }}
      >
        Состав:{" "}
      </p>
      <ul className={`mb-10 ${DoneOrderDetailsStyles.ingredients_list}`}>
        {orderedIngredients.map((ingredient) => (
          <li
            key={ingredient._id}
            className={DoneOrderDetailsStyles.ingredient_info}
          >
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className={DoneOrderDetailsStyles.image}
            />
            <p
              className={`text text_type_main-default ${DoneOrderDetailsStyles.ingredient_name}`}
            >
              {ingredient.name}
            </p>
            <div className={DoneOrderDetailsStyles.price_wrapper}>
              <p className="text text_type_digits-default">
                {ingredient.count}x{ingredient.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={DoneOrderDetailsStyles.total_info_wrapper}>
        <p className="text text_type_main-default text_color_inactive">
          <time dateTime={moment(matchingOrder!.createdAt).format()}>
            {moment(matchingOrder!.createdAt).calendar(null, {
              sameDay: "[Сегодня], LT",
              lastDay: "[Вчера], LT",
              lastWeek: "DD.MM.YYYY, LT",
              sameElse: "DD.MM.YYYY, LT",
            })}
          </time>
        </p>
        <div className={DoneOrderDetailsStyles.total_price_wrapper}>
          <p className="text text_type_digits-default">{totalOrderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}

export default DoneOrderDetails;

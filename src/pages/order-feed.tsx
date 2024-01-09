import styles from "./styles/order-feed.module.css";
import OrderFeedItem from "../components/OderFeedItem/OrderFeedItem";
import { connect as OrdersConnect, disconnected as OrdersDisconnect} from "../redux_services/web-socket-actions";
import { WS_URL } from "../utils/ApiConfig";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";
import { useEffect } from "react";
import {getTotalOrders, getTotalTodatOrders} from "../redux_services/selectors";

function OrderFeed() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const connect = () => {
      dispatch(OrdersConnect(`${WS_URL}/orders/all`));
    };

    connect();
    return () => {
        dispatch(OrdersDisconnect());
      };
  }, [dispatch]);


  const totalTodayOrders: number = useAppSelector(getTotalTodatOrders)
  const totalOrders: number = useAppSelector(getTotalOrders)

  return (
    <section className={styles.feed_section}>
      <div className={styles.feed_section_wrapper_orders}>
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
        <ul className={styles.feed_section_list}>
        <OrderFeedItem />
        </ul>
      </div>

      <div className={styles.feed_section_wrapper_orders_numbersr}>
        <div className={styles.orders_status}>
          <div className={styles.top_left}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <ul className={styles.orders_list}>
            <li className="mb-2">
              <p className="text text_type_digits-default">1234567890</p>
            </li>
            <li className="mb-2">
              <p className="text text_type_digits-default">1234567890</p>
            </li>
            <li className="mb-2">
              <p className="text text_type_digits-default">1234567890</p>
            </li>
            <li className="mb-2">
              <p className="text text_type_digits-default">1234567890</p>
            </li>
            </ul>
          </div>
          <div className={styles.top_right}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            <ul className={styles.orders_list}>
            <li className="mb-2">
                <p className="text text_type_digits-default">1234567890</p>
              </li>
              <li className="mb-2">
                <p className="text text_type_digits-default">1234567890</p>
              </li>
              <li className="mb-2">
                <p className="text text_type_digits-default">1234567890</p>
              </li>
              <li className="mb-2">
                <p className="text text_type_digits-default">1234567890</p>
              </li>
            </ul>
          </div>
          <div className={styles.full_width}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className="text text_type_digits-large">{totalOrders}</p>
          </div>
          <div className={styles.full_width}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalTodayOrders}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderFeed;

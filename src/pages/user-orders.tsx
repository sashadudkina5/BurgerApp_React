import styles from "./styles/user-ordes.module.css";
import OrderFeedItem from "../components/OderFeedItem/OrderFeedItem";
import {
  connect as OrdersConnect,
  disconnected as OrdersDisconnect,
} from "../redux_services/web-socket-actions";
import { WS_URL } from "../utils/ApiConfig";
import { useEffect } from "react";
import {
  getTotalOrders,
  getTotalTodatOrders,
} from "../redux_services/selectors";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";
import { getUserOrders } from "../redux_services/thunk-functions/GetUserOrders";
import UserOrderItem from "../components/UserOrderItem/UserOrderItem";

import UserProfileMenu from "../components/UserProfileMenu/UserProfileMenu";

function UserOrdersPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
    return () => {
      dispatch(OrdersDisconnect());
    };
  }, [dispatch]);

  return (
    <section className={styles.page_wrapper}>
      <UserProfileMenu />
      <div className={styles.wrapper_orders}>
        <ul className={styles.orders_list}>
          <UserOrderItem />
        </ul>
      </div>
    </section>
  );
}

export default UserOrdersPage;

import styles from "./styles/user-ordes.module.css";
import {
  disconnected as OrdersDisconnect,
} from "../redux_services/web-socket-actions";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/dispatch-selectos";
import { getUserOrders } from "../redux_services/thunk-functions/GetUserOrders";
import UserOrderItem from "../components/UserOrderItem/UserOrderItem";
import UserProfileMenu from "../components/UserProfileMenu/UserProfileMenu";

/**
 * Displays the user's order page with a list of their orders.
 * Upon component mounting, initiates a WebSocket connection to retrieve the user's orders.
 * Renders a list of the user's orders using the `UserOrderItem` component.
 * Includes the `UserProfileMenu` component for navigation.
 * Upon component unmounting, closes the WebSocket connection.
 * 
 * @component
 * @example
 * return (
 *   <UserOrdersPage />
 * )
 */
function UserOrdersPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetches user orders on component mount
    dispatch(getUserOrders());
    return () => {
      // Disconnects WebSocket connection on component unmount
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

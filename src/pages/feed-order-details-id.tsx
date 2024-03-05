import React from "react";
import { useParams } from "react-router-dom";
import { getSelectedOrder } from "../redux_services/selectors";
import DoneOrderDetails from "../components/DoneOrderDetails/DoneOrderDetails";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";
import { useEffect } from "react";
import {
  connect as OrdersConnect,
  disconnected as OrdersDisconnect,
} from "../redux_services/web-socket-actions";
import { WS_URL } from "../utils/ApiConfig";
import styles from "./styles/pages.module.css";
import { getOrderDetailsThunk } from "../redux_services/thunk-functions/GetOrderDetails";

interface OrderDetailPageOpenedProps {
  path: string;
}

/**
 * Page that shows order's details in a separate browser window.
 * Upon component mount, it connects to a WebSocket URL to receive order details and fetches order details based on the order ID obtained from the URL parameters.
 * Before unmounting, it disconnects from the WebSocket to clean up resources.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.path - The URL path, used to distinguish between different all orders and specific user's orders.
 * 
 * @example
 * <Route path="/order/:id" element={<OrderDetailPageOpened path="/orders/:id" />} />
 */

function OrderDetailPageOpened({ path }: OrderDetailPageOpenedProps) {
  const dispatch = useAppDispatch();

  /**
   *  * Upon component mount, it connects to a WebSocket URL to receive order details and fetches order details based on the order ID obtained from the URL parameters.
 * Before unmounting, it disconnects from the WebSocket to clean up resources.
   */
  useEffect(() => {
    const connect = () => {
      dispatch(OrdersConnect(WS_URL));
    };

    connect();
    return () => {
      dispatch(OrdersDisconnect());
    };
  }, [dispatch]);

  const { id } = useParams();

  /**
   * Order's details fetched from redux store
   */
  const matchingOrder = useAppSelector(getSelectedOrder);

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetailsThunk(id));
    }
  }, [dispatch, id]);

  localStorage.setItem("currentRoute", path);


  if (!matchingOrder) return <p>Order not found</p>;

  return (
    <div className={styles.order_details_wrapper}>
      <DoneOrderDetails matchingOrder={matchingOrder} />
    </div>
  );
}

export default OrderDetailPageOpened;

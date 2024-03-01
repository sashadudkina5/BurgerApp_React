import orderDetailsStyles from "./OrderDetails.module.css";
import image from "../../images/done.png";
import {
  getOrderNumber,
  isOrderRequestLoading,
} from "../../redux_services/selectors";
import { useAppSelector } from "../../hooks/dispatch-selectos";

/**
 * Displays the order confirmation and order number.
 * Handles the loading state by displaying a loading message while the order number is being fetched and provides an error message in case
 * the order creation fails.
 * 
 * @component
 */
function OrderDetails() {

  /**
   * Order number. Fetched from server, stored in redux
   */
  const orderNumber = useAppSelector(getOrderNumber);

  /**
   * True if the response is loading
   */
  const isLoading = useAppSelector(isOrderRequestLoading);

  return (
    <div className={orderDetailsStyles.wrapper}>
      {orderNumber ? (
        <>
          <h2
            className={`text text_type_digits-large ${orderDetailsStyles.orderNumber}`}
          >
            {orderNumber}
          </h2>
          <p
            className={`text text_type_main-medium ${orderDetailsStyles.description}`}
          >
            идентификатор заказа
          </p>

          <img src={image} alt="done" className={orderDetailsStyles.image} />
          <p
            className={`text text_type_main-default ${orderDetailsStyles.status}`}
          >
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : isLoading ? (
        <p className="text text_type_main-default">Подождите, пожалуйста, несколько секунд. Номер заказа загружается</p>
      ) : <p className="text text_type_main-default">Произошла ошибка при создании заказа. Попробуйте, пожалуйста, обновить страницу и повторить попытку.</p>}
    </div>
  );
}

export default OrderDetails;

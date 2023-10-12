import orderDetailsStyles from "./orderDetails.module.css";
import image from "../../images/done.png";

function OrderDetails() {
  return (
    <div className={orderDetailsStyles.wrapper}>
      <h2
        className={`text text_type_digits-large ${orderDetailsStyles.orderNumber}`}
      >
        034536
      </h2>
      <p
        className={`text text_type_main-medium ${orderDetailsStyles.description}`}
      >
        идентификатор заказа
      </p>
      <img src={image} alt="done" className={orderDetailsStyles.image} />
      <p className={`text text_type_main-default ${orderDetailsStyles.status}`}>
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
